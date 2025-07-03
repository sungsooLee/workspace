import { useEffect, useMemo, useReducer, useRef } from 'react';
import { getRandomId } from '@learnway/shared';
import Uppy, { UppyFile } from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { uppyFileReducer } from './uppy-reducer';
import { FileBody, FileItem, FileMeta, FileUploaderConfig } from './types';
import {
  abortMultiPartUpload,
  completedMultiPartUpload,
  getMultiFileParts,
  initMultiPartUpload,
  issuePresigendUrlByPart,
  issuePresigendUrlBySingle,
} from './api/s3';
import { dpSize } from './utils';

const isDebug = process.env.NODE_ENV !== 'production';
const API_BASE_URL = 'http://localhost:8072/pms-module/admin/api/v1/file';
const IS_MULTIPART_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * 파일 업로드 공통 hook
 */
const useFileUploaderHook = (config: FileUploaderConfig) => {
  const uppyRef = useRef<Uppy | null>(null);

  // 파일 상태를 useReducer로 관리
  const [files, dispatch] = useReducer(uppyFileReducer, []);

  // 업로드 상태 카운트 계산
  const { totalCnt, uploadingCnt, pausedCnt, errorCnt, successCnt, waitingCnt } = useMemo(() => {
    return {
      totalCnt: files.length,
      uploadingCnt: files.filter((file) => file.status === 'uploading').length,
      pausedCnt: files.filter((file) => file.status === 'pause').length,
      errorCnt: files.filter((file) => file.status === 'error').length,
      successCnt: files.filter((file) => file.status === 'complete').length,
      waitingCnt: files.filter((file) => file.status === 'waiting').length,
    };
  }, [files]);

  // Uppy 인스턴스 초기화 및 설정
  useEffect(() => {
    const uppy = new Uppy({
      debug: isDebug,
      autoProceed: true, // 파일 추가 즉시 업로드 시작
      allowMultipleUploadBatches: false, // 업로드 중 추가 업로드 금지
      restrictions: {
        maxFileSize: config.maxFileSize,
      },
    }).use(AwsS3, {
      // 파일 크기가 기준보다 크면 멀티파트 사용
      shouldUseMultipart: (file: any) => file.size > IS_MULTIPART_SIZE,

      // 멀티파트 업로드 초기화
      createMultipartUpload: async (file: any) => {
        const data = await initMultiPartUpload(file.meta.key);
        if (data?.uploadId && data?.key) {
          file.meta.uploadId = data.uploadId;
          dispatch({
            type: 'UPDATE_FILE',
            fileId: file.id,
            updates: {
              uploadId: data.uploadId,
              key: file.meta.key,
            },
          });
        } else {
          dispatch({
            type: 'UPDATE_FILE',
            fileId: file.id,
            updates: {
              errorMessage: 'fail to init multipart upload',
            },
          });
          throw new Error('uploadId is undefined');
        }
        return { uploadId: data.uploadId, key: data.key };
      },

      // 각 파트별 presigned URL 요청
      signPart: async (file, { uploadId, key, partNumber }) => {
        const data = await issuePresigendUrlByPart({
          uploadId,
          partNumber,
          key,
        });
        if (!data?.url) {
          dispatch({
            type: 'UPDATE_FILE',
            fileId: file.id,
            updates: {
              status: 'error',
              errorMessage: 'fail to get presigned url',
            },
          });
          throw new Error('Presigned URL is missing');
        }
        return {
          url: data.url,
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
        };
      },

      // 업로드된 파트 조회 (resume 등에 필요)
      listParts: async (_, { uploadId, key }) => {
        const data = await getMultiFileParts(uploadId || '', key);
        if (!data) return [];
        return data.Parts || [];
      },

      // 싱글 presigned URL 요청
      getUploadParameters: async (file?: UppyFile<FileMeta, FileBody>) => {
        if (!file) throw new Error('file is undefined');
        const response = await issuePresigendUrlBySingle(file.meta.key);
        if (response) {
          return {
            method: 'PUT',
            url: response.url || '',
            headers: {
              'Content-Type': file.type,
            },
          };
        }
        throw new Error('get upload parameters failed');
      },

      // 업로드 중단 처리
      abortMultipartUpload: async (file, { uploadId, key }) => {
        await abortMultiPartUpload(uploadId || '', key);
      },

      // 멀티파트 업로드 완료 처리
      completeMultipartUpload: async (file, { uploadId, key, parts }) => {
        const uploadParts = parts as any;
        const data = await completedMultiPartUpload({ uploadId, parts: uploadParts, key });
        if (data) {
          dispatch({
            type: 'UPDATE_FILE',
            fileId: file.id,
            updates: { status: 'complete' },
          });
          return data as any;
        }
        throw new Error('get upload parameters failed');
      },
    });

    // 파일 추가 이벤트 핸들링
    uppy.on('file-added', (file: UppyFile<FileMeta, FileBody>) => {
      if (!file) return;
      const newFile: FileItem = {
        id: file.id,
        filename: file.name || '',
        s3FileName: file.meta.s3FileName,
        extension: file.extension,
        key: file.meta.key,
        size: file.size || 0,
        dpSize: dpSize(file.size || 0),
        progress: 0,
        status: 'waiting',
      };
      dispatch({ type: 'ADD_FILE', file: newFile });
    });

    // 업로드 진행 이벤트
    uppy.on('upload-progress', (file, progress) => {
      if (!file || !progress) return;
      const percentage = (progress.bytesUploaded / (progress.bytesTotal || 0)) * 100;
      dispatch({
        type: 'UPDATE_FILE',
        fileId: file.id,
        updates: {
          status: 'uploading',
          progress: percentage,
        },
      });
    });

    // 업로드 성공 처리
    uppy.on('upload-success', (file) => {
      if (!file) return;
      dispatch({
        type: 'UPDATE_FILE',
        fileId: file.id,
        updates: {
          status: 'complete',
          progress: 100,
        },
      });
    });

    // 업로드 에러 처리
    uppy.on('upload-error', (file, error) => {
      if (!file || !error) return;
      dispatch({
        type: 'UPDATE_FILE',
        fileId: file.id,
        updates: { status: 'error', errorMessage: error.message },
      });
    });

    // 파일 제거 시 처리
    uppy.on('file-removed', async (file) => {
      if (!file) return;
      console.log('file-removed', file);
      if (file.meta.uploadId && file.meta.key) {
        abortMultiPartUpload(file.meta.uploadId as string, file.meta.key as string);
      }
      dispatch({ type: 'REMOVE_FILE', fileId: file.id });
    });

    // 업로드 일시 정지 시 처리
    uppy.on('upload-pause', (file) => {
      if (!file) return;
      dispatch({
        type: 'UPDATE_FILE',
        fileId: file.id,
        updates: { status: 'cancel' },
      });
    });

    uppyRef.current = uppy;

    return () => {
      uppy.cancelAll();
      uppy.clear();
    };
  }, []);

  // 파일 추가
  const addFiles = (files: File[]) => {
    if (!uppyRef || !uppyRef.current) return;
    uppyRef.current.addFiles(
      files.map((file) => {
        const s3FileName = getRandomId() + '.' + file.name.split('.').pop() || '';
        return {
          name: file.name,
          type: file.type,
          data: file,
          meta: {
            s3FileName,
            key: 'upload' + config.s3Path + '/' + s3FileName,
          },
        };
      }),
    );
  };

  // 파일 제거
  const onRemove = (fileId: string) => {
    if (!uppyRef || !uppyRef.current) return;
    uppyRef.current.removeFile(fileId);
  };

  // 업로드 일시 정지/재개 토글
  const onCancel = (fileId: string) => {
    if (!uppyRef || !uppyRef.current) return;
    uppyRef.current.pauseResume(fileId);
  };
  // 업로드 재개
  const onResume = (fileId: string) => {
    if (!uppyRef || !uppyRef.current) return;
    uppyRef.current.pauseResume(fileId);
  };

  // 업로드 재시도
  const onRetry = async (fileId: any) => {
    if (!uppyRef || !uppyRef.current) return;
    await uppyRef.current.retryUpload(fileId);
  };

  // hook에서 사용할 데이터와 함수 리턴
  return {
    files,
    addFiles,
    onRemove,
    onCancel,
    onResume,
    onRetry,
    totalCnt,
    uploadingCnt,
    pausedCnt,
    errorCnt,
    successCnt,
    waitingCnt,
  };
};

export const useFileUploader = useFileUploaderHook;
