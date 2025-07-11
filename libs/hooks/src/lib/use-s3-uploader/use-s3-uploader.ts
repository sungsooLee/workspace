import { useCallback, useEffect, useMemo, useState } from 'react';
import { UploadFile, S3UploaderConfig, UploadType, DEFAULT_MULTIPART_THRESHOLD } from './types';
import { acceptFilesToAccept, formatDate, getDefaultLang, getRandomId } from '@learnway/shared';
import { formatFileSize, normalizePath, updateFile } from './utils';
import {
  createFileGroup,
  saveTempFileInfo,
  issuePresignedUrlBySingle,
  completeFileUpload,
  initMultiPartUpload,
  issuePresignedUrlByPart,
  completedMultiPartUpload,
  abortMultiPartUpload,
  deleteFileInfo,
} from './api';
import { FileInfo } from '../use-file-manager/type';
import { first, uniq } from 'lodash';

/**
 * 새로운 S3 업로더 훅 - 단순화된 구조
 * UploadFile[] 상태만 관리하고 직접 API 호출
 */
const useS3UploaderHook = (config: S3UploaderConfig) => {
  const {
    s3Path,
    // groupConfig,
    affairsType,
    languageCode = getDefaultLang().toUpperCase(),
    groupUuid = '',
    groupMode = 'batch',
    auto = true,
    async = true,
    multipartThreshold = DEFAULT_MULTIPART_THRESHOLD,
    acceptFiles = [],
    maxFileCount = 10,
    maxFileSize = 5 * 1024 * 1024,
  } = config;

  // 파일 상태 관리
  const [files, setFiles] = useState<UploadFile[]>([]);

  // 배치 모드에서 그룹 UUID 저장 (한 번 생성 후 재사용)
  const [batchGroupUuid, setBatchGroupUuid] = useState<string>(groupUuid);

  // 업로드 통계 계산
  const stats = useMemo(() => {
    const statusCount = files.reduce(
      (acc, file) => {
        acc[file.status] = (acc[file.status] || 0) + 1;
        return acc;
      },
      {
        validating: 0,
        'group-needed': 0,
        idle: 0,
        uploading: 0,
        paused: 0,
        completed: 0,
        fetched: 0,
        failed: 0,
        aborted: 0,
        'validating-error': 0,
        grouping: 0,
      },
    );

    let status: string = 'idle';
    if (files.length > 0) {
      if (statusCount.uploading > 0) {
        status = 'uploading';
      } else if (
        statusCount.completed +
          statusCount.aborted +
          statusCount['validating-error'] +
          statusCount.failed ===
        files.length
      ) {
        if (statusCount.failed === files.length) {
          status = 'failed';
        } else if (statusCount['validating-error'] === files.length) {
          status = 'validating-error';
        } else {
          status = 'completed';
        }
      }
    }

    return {
      status,
      maxFileCount,
      total: files.length,
      uploading: statusCount.uploading,
      paused: statusCount.paused,
      failed: statusCount.failed,
      completed: statusCount.completed,
      aborted: statusCount.aborted,
      'validating-error': statusCount['validating-error'],
      'group-needed': statusCount['group-needed'],
      grouping: statusCount.grouping,
    };
  }, [files, maxFileCount]);

  // input accept 계산
  const inputAccept = useMemo(() => acceptFilesToAccept(acceptFiles), [acceptFiles]);

  // 파일 추가
  const addFiles = useCallback(
    async (newFiles: File[]) => {
      if (!newFiles || newFiles.length === 0) return;

      // TODO: 단일 파일 모드일 때 기존 파일 제거 로직 구현
      if (maxFileCount === 1 && newFiles.length > 0) {
        setFiles([]);
      }

      // TODO: 파일을 UploadFile 형태로 변환하는 로직 구현
      const uploadFiles: UploadFile[] = newFiles.map((file) => {
        const detailPath = formatDate(new Date(), '/YYYY/MM/DD');
        const id = getRandomId();
        const fileName = file.name;
        const extension = fileName.split('.').pop() || '';
        const s3FileName = id + '.' + extension.toLowerCase();
        const key = normalizePath(s3Path) + detailPath + '/' + s3FileName;
        const size = file.size;
        const uploadType =
          size > multipartThreshold ? UploadType.MULTI_PART : UploadType.SINGLE_PART;

        return {
          id,
          file,
          uploadType,
          extension,
          s3FileName,
          fileName,
          size,
          displaySize: formatFileSize(size),
          progress: 0,
          status: 'validating',
          key,
          parts: [],
          basicPath: normalizePath(s3Path),
          detailPath: detailPath,
        };
      });

      setFiles((prev) => [...prev, ...uploadFiles]);
    },
    [s3Path, multipartThreshold, maxFileCount],
  );

  const validateFiles = (validatingFiles: UploadFile[]) => {
    // 한 번의 setFiles 호출로 모든 파일 업데이트
    setFiles((prev) => {
      let updatedFiles = prev;

      validatingFiles.forEach((file) => {
        if (!file.file) {
          return updateFile(updatedFiles, file.id, {
            status: 'fetched',
            message: '',
          });
        }

        let isError = false;
        let message = '';

        if (maxFileSize > 0 && file.file.size > maxFileSize) {
          isError = true;
          message = 'size error';
        }

        if (
          acceptFiles.length > 0 &&
          !acceptFiles.map((accept) => accept.toUpperCase()).includes(file.extension.toUpperCase())
        ) {
          isError = true;
          message = 'extension error';
        }

        if (isError) {
          updatedFiles = updateFile(updatedFiles, file.id, {
            status: 'validating-error',
            message,
          });
        } else {
          // groupConfig가 있으면 'grouping', 없으면 'idle' 상태로 설정
          const nextStatus = 'grouping'; //groupConfig ? 'grouping' : 'idle';
          updatedFiles = updateFile(updatedFiles, file.id, {
            status: nextStatus,
            message,
          });
        }
      });

      return updatedFiles;
    });
  };

  // 그룹 생성 (공통 로직)
  const executeCreateFileGroup = async (basicPath: string) => {
    // if (!groupConfig) {
    //   throw new Error('Group config is required');
    // }

    const groupResponse = await createFileGroup({
      affairsType,
      reposType: 'S3',
      basicPath,
      languageCode,
    });

    if (!groupResponse?.groupUuid) {
      throw new Error('Failed to create file group');
    }

    return groupResponse.groupUuid;
  };

  // 그룹 생성 및 파일 정보 저장
  const createGroup = async (
    groupNeededFiles: UploadFile[],
    // groupConfig: S3UploaderConfig['groupConfig'],
    groupMode: 'individual' | 'batch',
  ) => {
    // if (!groupConfig || groupNeededFiles.length === 0) return;
    if (groupNeededFiles.length === 0) return;

    try {
      if (groupMode === 'batch') {
        // 배치 모드: 하나의 그룹에 모든 파일 추가
        let groupUuid = batchGroupUuid;

        // groupUuid가 없으면 새로 생성
        if (!groupUuid) {
          groupUuid = await executeCreateFileGroup(groupNeededFiles[0].basicPath);
          setBatchGroupUuid(groupUuid); // 배치 그룹 UUID 저장
        }

        // 모든 파일을 idle 상태로 변경하고 groupUuid 저장
        setFiles((prev) => {
          let updatedFiles = prev;
          groupNeededFiles.forEach((file) => {
            updatedFiles = updateFile(updatedFiles, file.id, {
              status: 'idle',
              groupUuid, // groupUuid 저장
            });
          });
          return updatedFiles;
        });
      } else {
        // 개별 모드: 각 파일별로 개별 그룹 생성
        const updatePromises = groupNeededFiles.map(async (file) => {
          try {
            const groupUuid = await executeCreateFileGroup(file.basicPath);

            return {
              id: file.id,
              updates: {
                status: 'idle',
                groupUuid, // groupUuid 저장
              },
            };
          } catch (error) {
            console.error('🚀 createGroupAndSaveFiles ~ error:', error);
            return {
              id: file.id,
              updates: {
                status: 'failed',
                message: 'Group creation failed',
              },
            };
          }
        });

        const updates = await Promise.all(updatePromises);
        const validUpdates = updates.filter((update) => update !== undefined);

        if (validUpdates.length > 0) {
          // 모든 업데이트를 한 번의 setFiles 호출로 처리
          setFiles((prev) => {
            let updatedFiles = prev;
            validUpdates.forEach((update) => {
              if (update) {
                updatedFiles = updateFile(
                  updatedFiles,
                  update.id,
                  update.updates as Partial<UploadFile>,
                );
              }
            });
            return updatedFiles;
          });
        }
      }
    } catch (error) {
      console.error('🚀 createGroupAndSaveFiles ~ error:', error);
      // 에러 시 파일 상태를 failed로 변경
      setFiles((prev) => {
        let updatedFiles = prev;
        groupNeededFiles.forEach((file) => {
          updatedFiles = updateFile(updatedFiles, file.id, {
            status: 'failed',
            message: 'Group creation failed',
          });
        });
        return updatedFiles;
      });
    }
  };

  // 파일 유효성 검사 실행
  useEffect(() => {
    const validatingFiles = files.filter((f) => f.status === 'validating');
    if (validatingFiles.length === 0) return;

    validateFiles(validatingFiles);
  }, [files.filter((f) => f.status === 'validating').length, maxFileSize, acceptFiles]);

  // 그룹 생성 처리 실행
  useEffect(() => {
    const groupNeededFiles = files.filter((f) => f.status === 'grouping');
    if (groupNeededFiles.length === 0) return;

    createGroup(groupNeededFiles, groupMode);
  }, [files.filter((f) => f.status === 'grouping').length, groupMode]);

  // Single-part 업로드
  const singlePartUpload = async (file: UploadFile) => {
    if (!file.file) return;
    // AbortController 생성 및 저장
    const controller = new AbortController();
    setFiles((prev) => updateFile(prev, file.id, { controller }));

    try {
      // 1. Presigned URL 요청
      const presignedRes = await issuePresignedUrlBySingle(file.key);
      if (!presignedRes?.url) {
        throw new Error('Failed to get presigned URL');
      }

      // 2. 파일 업로드 (AbortController 사용)
      const uploadRes = await fetch(presignedRes.url, {
        method: 'PUT',
        body: file.file,
        headers: {
          'Content-Type': file.file.type,
        },
        signal: controller.signal,
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.status}`);
      }

      // 3. 업로드 완료 처리
      // if (groupConfig && file.fileUuid) {
      if (file.fileUuid) {
        const completeRes = await completeFileUpload(file.fileUuid);
        if (!completeRes) {
          throw new Error('Failed to complete upload');
        }
      }

      // 4. 상태를 completed로 변경
      setFiles((prev) =>
        updateFile(prev, file.id, {
          status: 'completed',
          progress: 100,
        }),
      );
    } catch (error) {
      // AbortError 처리 - 현재 상태에 따라 구분
      if (error instanceof Error && error.name === 'AbortError') {
        // 현재 상태가 paused면 pause로 처리, 아니면 abort로 처리 (상태 변경 없음)
        const currentFile = files.find((f) => f.id === file.id);
        if (currentFile?.status === 'paused') {
          console.log('singlePartUpload ~ paused (no status change):', file.id);
        } else {
          console.log('singlePartUpload ~ aborted (no status change):', file.id);
        }
        return;
      }

      console.error('singlePartUpload ~ error:', error);

      // 에러 시 상태를 failed로 변경
      setFiles((prev) =>
        updateFile(prev, file.id, {
          status: 'failed',
          message: error instanceof Error ? error.message : 'Upload failed',
        }),
      );
    } finally {
      // controller 정리
      setFiles((prev) => updateFile(prev, file.id, { controller: undefined }));
    }
  };

  // Multi-part 업로드
  const multiPartUpload = async (file: UploadFile) => {
    if (!file.file) return;
    // AbortController 생성 또는 기존 것 사용
    const controller = file.controller || new AbortController();
    if (!file.controller) {
      setFiles((prev) => updateFile(prev, file.id, { controller }));
    }

    try {
      let uploadId = file.uploadId;
      let existingParts: { ETag: string; PartNumber: number }[] = file.parts || [];

      // 1. 멀티파트 업로드 초기화 (uploadId가 없으면)
      if (!uploadId) {
        const initRes = await initMultiPartUpload(file.key);
        if (!initRes?.uploadId) {
          throw new Error('Failed to initialize multipart upload');
        }
        uploadId = initRes.uploadId;
        setFiles((prev) => updateFile(prev, file.id, { uploadId }));
      }

      // 2. 파일을 청크로 분할 (5MB 기준)
      const chunkSize = 5 * 1024 * 1024; // 5MB
      const chunks: Blob[] = [];
      for (let i = 0; i < file.file.size; i += chunkSize) {
        chunks.push(file.file.slice(i, i + chunkSize));
      }

      // 3. 각 청크 업로드 (이미 업로드된 부분은 건너뛰기)
      for (let i = 0; i < chunks.length; i++) {
        const partNumber = i + 1;

        // 이미 업로드된 part는 건너뛰기
        if (existingParts.some((part) => part.PartNumber === partNumber)) {
          continue;
        }

        // 중단 체크
        if (controller.signal.aborted) {
          const abortError = new Error('Upload aborted');
          abortError.name = 'AbortError';
          throw abortError;
        }

        const chunk = chunks[i];

        // Part presigned URL 요청
        const presignedRes = await issuePresignedUrlByPart({
          uploadId,
          partNumber,
          key: file.key,
        });

        if (!presignedRes?.url) {
          throw new Error(`Failed to get presigned URL for part ${partNumber}`);
        }

        // 청크 업로드 (AbortController 사용)
        const uploadRes = await fetch(presignedRes.url, {
          method: 'PUT',
          body: chunk,
          signal: controller.signal,
        });

        if (!uploadRes.ok) {
          throw new Error(`Failed to upload part ${partNumber}: ${uploadRes.status}`);
        }

        const etag = uploadRes.headers.get('ETag');
        if (!etag) {
          throw new Error(`No ETag received for part ${partNumber}`);
        }

        const newPart = {
          ETag: etag.replace(/"/g, ''), // 따옴표 제거
          PartNumber: partNumber,
        };

        existingParts.push(newPart);

        // parts 정보 업데이트
        setFiles((prev) => updateFile(prev, file.id, { parts: [...existingParts] }));

        // 진행률 업데이트
        const progress = Math.round(((i + 1) / chunks.length) * 100);
        setFiles((prev) => updateFile(prev, file.id, { progress }));
      }

      // 4. 멀티파트 업로드 완료
      const completeRes = await completedMultiPartUpload({
        uploadId,
        key: file.key,
        parts: existingParts,
      });

      if (!completeRes) {
        throw new Error('Failed to complete multipart upload');
      }

      // 5. 업로드 완료 처리 (groupConfig가 있는 경우에만)
      // if (groupConfig && file.fileUuid) {
      if (file.fileUuid) {
        const fileCompleteRes = await completeFileUpload(file.fileUuid, {
          key: file.key,
          uploadId,
          parts: existingParts,
        });
        if (!fileCompleteRes) {
          throw new Error('Failed to complete file upload');
        }
      }

      // 6. 상태를 completed로 변경
      setFiles((prev) =>
        updateFile(prev, file.id, {
          status: 'completed',
          progress: 100,
          parts: existingParts,
        }),
      );
    } catch (error) {
      // AbortError 처리 - 현재 상태에 따라 구분
      if (error instanceof Error && error.name === 'AbortError') {
        // 현재 상태가 paused면 pause로 처리, 아니면 abort로 처리 (상태 변경 없음)
        const currentFile = files.find((f) => f.id === file.id);
        if (currentFile?.status === 'paused') {
          console.log('multiPartUpload ~ paused (no status change):', file.id);
        } else {
          console.log('multiPartUpload ~ aborted (no status change):', file.id);
        }
        return;
      }

      console.error('multiPartUpload ~ error:', error);

      // 에러 시 상태를 failed로 변경
      setFiles((prev) =>
        updateFile(prev, file.id, {
          status: 'failed',
          message: error instanceof Error ? error.message : 'Upload failed',
        }),
      );
    } finally {
      // controller 정리
      setFiles((prev) => updateFile(prev, file.id, { controller: undefined }));
    }
  };

  // 임시 파일 정보 저장 (공통 로직)
  const executeSaveTempFileInfo = async (file: UploadFile) => {
    if (!file.groupUuid) {
      throw new Error('Group UUID is required');
    }

    try {
      const tempFileInfo = await saveTempFileInfo(file.groupUuid, {
        detailPath: file.detailPath,
        files: [
          {
            s3UploadType: file.uploadType,
            originalFileName: file.fileName,
            serverFileName: file.s3FileName,
            fileSize: file.size,
          },
        ],
      });

      if (!tempFileInfo) {
        throw new Error('Failed to save temp file info');
      }

      // fileUuid를 파일에 주입
      return {
        ...file,
        fileUuid: tempFileInfo.fileUuid,
      };
    } catch (error) {
      console.error('saveTempFileInfoWithConfig ~ error:', error);
      throw error;
    }
  };

  // 파일 업로드 시작
  const startUpload = async (id: string) => {
    // 파일 찾기
    let file = files.find((f) => f.id === id);
    if (!file) {
      console.error('startUpload ~ file not found:', id);
      return;
    }

    // 이미 업로드 중이면 중복 실행 방지
    if (file.status === 'uploading') {
      return;
    }

    // 상태를 uploading으로 변경
    setFiles((prev) => updateFile(prev, id, { status: 'uploading' }));

    // fileUuid가 없으면 임시 파일 정보 저장
    // if (!file.fileUuid && groupConfig && file.groupUuid) {
    if (!file.fileUuid && file.groupUuid) {
      try {
        file = await executeSaveTempFileInfo(file);
        setFiles((prev) =>
          updateFile(prev, id, {
            fileUuid: file?.fileUuid,
          }),
        );
      } catch (error) {
        console.error('startUpload ~ temp file info save error:', error);
        setFiles((prev) =>
          updateFile(prev, id, {
            status: 'failed',
            message: 'Failed to save temp file info',
          }),
        );
        return;
      }
    }

    if (file.uploadType === UploadType.SINGLE_PART) {
      await singlePartUpload(file);
    } else {
      await multiPartUpload(file);
    }
  };

  // 업로드 시작 처리 실행
  useEffect(() => {
    // auto가 false이면 자동 업로드하지 않음
    if (!auto) {
      return;
    }

    const idleFiles = files.filter((f) => f.status === 'idle');
    if (idleFiles.length === 0) return;

    if (async) {
      // 순차 업로드
      idleFiles.forEach((file) => {
        startUpload(file.id);
      });
    } else {
      // 병렬 업로드
      Promise.all(idleFiles.map((file) => startUpload(file.id)));
    }
  }, [files.filter((f) => f.status === 'idle').length, async, auto]);

  // 파일 제거
  const onRemove = useCallback(
    async (id?: string) => {
      if (!id) {
        // id가 없으면 모든 파일 제거
        // fileUuid가 있는 파일들 먼저 백엔드에서 삭제
        const filesWithUuid = files.filter((f) => f.fileUuid);
        if (filesWithUuid.length > 0) {
          try {
            await Promise.all(filesWithUuid.map((file) => deleteFileInfo(file.fileUuid!)));
          } catch (error) {
            console.error('onRemove ~ backend delete error:', error);
          }
        }
        setFiles([]);
        return;
      }

      // 파일 찾기
      const file = files.find((f) => f.id === id);
      if (!file) {
        console.error('onRemove ~ file not found:', id);
        return;
      }

      // 업로드 중인 경우 중단 처리
      if (file.status === 'uploading') {
        // 상태를 aborted로 변경
        setFiles((prev) => updateFile(prev, id, { status: 'aborted' }));

        // AbortController가 있으면 중단
        if (file.controller) {
          file.controller.abort();
        }

        // 멀티파트 업로드 중이면 S3에서도 중단
        if (file.uploadType === UploadType.MULTI_PART && file.uploadId) {
          try {
            await abortMultiPartUpload(file.uploadId, file.key);
          } catch (error) {
            console.error('onRemove ~ abort error:', error);
          }
        }
      }

      // fileUuid가 있으면 백엔드에서도 삭제
      if (file.fileUuid) {
        try {
          await deleteFileInfo(file.fileUuid);
        } catch (error) {
          console.error('onRemove ~ backend delete error:', error);
        }
      }

      // 파일 목록에서 제거
      setFiles((prev) => prev.filter((f) => f.id !== id));
    },
    [files],
  );

  // 파일 일시정지
  const onPause = useCallback(
    (id: string) => {
      const file = files.find((f) => f.id === id);
      if (!file) {
        console.error('onPause ~ file not found:', id);
        return;
      }

      // 업로드 중인 경우 일시정지 가능
      if (file.status === 'uploading') {
        // 상태를 paused로 먼저 변경
        setFiles((prev) => updateFile(prev, id, { status: 'paused' }));

        // AbortController로 현재 요청만 중단
        if (file.controller) {
          file.controller.abort();
        }
      }
    },
    [files],
  );

  // 파일 재시도
  const onRetry = useCallback(
    async (id: string) => {
      const file = files.find((f) => f.id === id);
      if (!file) {
        console.error('onRetry ~ file not found:', id);
        return;
      }

      // 실패, 중단, 일시정지된 파일만 재시도 가능
      if (file.status === 'failed' || file.status === 'aborted' || file.status === 'paused') {
        // 상태를 uploading으로 변경
        setFiles((prev) =>
          updateFile(prev, id, {
            status: 'uploading',
            progress: 0,
            message: undefined,
            controller: new AbortController(),
          }),
        );

        // 업로드 타입에 따라 재시도
        if (file.uploadType === UploadType.SINGLE_PART) {
          await singlePartUpload(file);
        } else if (file.uploadType === UploadType.MULTI_PART) {
          await multiPartUpload(file);
        }
      } else {
        console.log('onRetry ~ cannot retry (not failed/aborted/paused):', id);
      }
    },
    [files],
  );

  // 파일 재개 (retry로 bypass)
  const onResume = useCallback(
    async (id: string) => {
      await onRetry(id);
    },
    [onRetry],
  );

  // fetch된 파일 설정
  const onFetch = (files: FileInfo[]) => {
    setFiles((prev) => {
      const fetchedFiles: UploadFile[] = files.map((file) => ({
        id: file.fileUuid,
        fileUuid: file.fileUuid,
        detailPath: file.detailPath,
        fileName: file.originalFileName,
        extension: file.originalFileName.split('.').pop() || '',
        s3FileName: file.serverFileName,
        key: file.filePath,
        size: file.fileSize,
        uploadType:
          file.fileSize > multipartThreshold ? UploadType.MULTI_PART : UploadType.SINGLE_PART,
        status: 'fetched',
        displaySize: formatFileSize(file.fileSize),
        progress: 0,
        fileUrl: file.fileUrl,
        parts: [],
        basicPath: file.group.basicPath,
        groupUuid: file.group.groupUuid,
      }));
      return [...prev, ...fetchedFiles];
    });
    const groupUuids = uniq(files.map((file) => file.group.groupUuid));
    if (groupUuids.length === 1) setBatchGroupUuid(first(groupUuids) || '');
  };

  return {
    // 상태
    files,
    stats,
    inputAccept,
    groupUuid: batchGroupUuid,
    setGroupUuid: setBatchGroupUuid,

    // 파일 관리
    addFiles,
    onRemove,
    onRetry,
    onPause,
    onResume,
    onStart: startUpload,
    onFetch,
  };
};

export const useS3Uploader = useS3UploaderHook;
