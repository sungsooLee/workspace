import React, { useEffect, useRef, useState } from 'react';
import Uppy, { type Meta, type Body, type UIPluginOptions, type State } from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { httpService, cn } from '@learnway/shared';
import { IcoDownload, IcoRefresh, IcoTrash03 } from '@learnway/icons';
import { Button } from '../button/button';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import styles from './uppy-file-upload.module.css';

// 파일 아이템 인터페이스 확장 - 파트 정보 추가
interface FileItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'waiting' | 'uploading' | 'complete' | 'error' | 'paused';
  extension: 'svg' | 'png';
  errorMessage?: string;
  parts?: {
    partNumber: number;
    progress: number;
    status: 'waiting' | 'uploading' | 'complete' | 'error';
  }[];
  retryCount?: number;
  uploadId?: string;
  key?: string;
}

const StatusLabel = {
  waiting: '유효성 검토 중',
  uploading: '진행중',
  complete: '완료',
  error: '업로드 불가',
  paused: '대기중',
};

const StatusColors = {
  waiting: 'text-gray-500',
  uploading: 'text-blue-500',
  complete: 'text-green-500',
  error: 'text-red-500',
  paused: 'text-gray-500',
};

interface SimpleUploadProps {
  allowedFileTypes?: string[];
  maxFileSize?: number;
  folderPath?: string;
  maxRetries?: number;
  retryDelay?: number;
  wrapSize?: 'sm' | 'md';
  className?: string;
}

export const UppyUpload: React.FC<SimpleUploadProps> = ({
  allowedFileTypes = [
    'mp4',
    'wmv',
    'ts',
    'avi',
    'mkv',
    'mts',
    'mov',
    'mxf',
    'mpeg',
    'mpg',
    'webm',
    'asf',
    'skm',
    'k3g',
    'png',
  ],
  maxFileSize = 1024 * 1024 * 1024, // 1GB
  folderPath = 'uploads/',
  maxRetries = 3, // 최대 재시도 횟수
  retryDelay = 2000, // 재시도 간격 (ms)
  wrapSize = 'md',
  className,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const uppyRef = useRef<Uppy | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const retryTimersRef = useRef<Record<string, NodeJS.Timeout>>({});

  // 진행중인 업로드 파일 ID를 추적
  const [activeUploads, setActiveUploads] = useState<Record<string, boolean>>({});

  // API 엔드포인트 기본 URL
  const API_BASE_URL =
    'http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/pms-module/admin/api/v1/file';

  // 파트 사이즈 계산 (5MB)
  const PART_SIZE = 5 * 1024 * 1024;

  useEffect(() => {
    const uppy = new Uppy({
      debug: true,
      autoProceed: true,
      allowMultipleUploadBatches: true,
      restrictions: {
        maxFileSize: maxFileSize,
        // allowedFileTypes: allowedFileTypes,
      },
    }).use(AwsS3, {
      // 파일 크기가 10MB 이상인 경우 멀티파트 업로드 사용
      shouldUseMultipart: (file: any) => file.size > 10 * 1024 * 1024,

      // 1. 멀티파트 업로드 초기화
      createMultipartUpload: async (file) => {
        // 파일명에 폴더 경로 추가
        try {
          const filename = `${file.name}`;

          const response = await httpService.post(
            `${API_BASE_URL}/s3/multipart`,
            JSON.stringify({
              filename: filename,
            }),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          // if (!response.ok) {
          //   const errorData = await response.json();
          //   const errorMessage = errorData.error || `서버 오류: ${response.status}`;
          //   throw new Error(errorMessage);
          // }
          const data: any = response;
          // 파일 정보 업데이트 - uploadId와 key 저장
          setFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    uploadId: data.uploadId,
                    key: data.key,
                    // 파트 정보 초기화
                    parts: calculateParts(file.size as number).map((partNumber) => ({
                      partNumber,
                      progress: 0,
                      status: 'waiting',
                    })),
                  }
                : f,
            ),
          );

          return {
            uploadId: data.uploadId,
            key: data.key,
          };
        } catch (error: any) {
          updateFileError(file.id, `멀티파트 업로드 초기화 실패: ${error.message}`);
          throw error;
        }
      },

      // 2. 각 파트별 presigned URL 요청
      signPart: async (file, { uploadId, key, partNumber }) => {
        try {
          const encodedKey = encodeURIComponent(key);
          const response = await httpService.get(
            `${API_BASE_URL}/s3/multipart/${uploadId}/${partNumber}?key=${encodedKey}`,
          );

          // if (!response.ok) {
          //   const errorData = await response.json();
          //   const errorMessage = errorData.error || `서버 오류: ${response.status}`;
          //   throw new Error(errorMessage);
          // }

          const data: any = await response;

          // 파트 상태 업데이트
          updatePartStatus(file.id, partNumber, 'uploading');

          return {
            url: data.url,
            headers: {
              'Content-Type': file.type,
            },
          };
        } catch (error: any) {
          updatePartStatus(file.id, partNumber, 'error');
          throw error;
        }
      },

      // 3. 모든 파트 업로드 완료 후 멀티파트 업로드 완료
      completeMultipartUpload: async (file, { uploadId, key, parts }) => {
        try {
          const encodedKey = encodeURIComponent(key);

          // API 요청에 맞는 형태로 parts 변환
          const formattedParts = parts.map((part: any) => ({
            PartNumber: part.PartNumber,
            ETag: part.ETag,
          }));
          console.log(JSON.stringify({ parts: formattedParts }));
          const response = await httpService.post(
            `${API_BASE_URL}/s3/multipart/${uploadId}/complete?key=${encodedKey}`,
            JSON.stringify({ parts: formattedParts }),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          // if (!response.ok) {
          //   const errorData = await response.json();
          //   const errorMessage = errorData.error || `서버 오류: ${response.status}`;
          //   throw new Error(errorMessage);
          // }

          const data: any = response;

          // 업로드 완료된 파일에서 activeUploads 제거
          setActiveUploads((prev) => {
            const updated = { ...prev };
            delete updated[file.id];
            return updated;
          });

          return data;
        } catch (error: any) {
          updateFileError(file.id, `멀티파트 업로드 완료 실패: ${error.message}`);
          throw error;
        }
      },

      listParts: async () => {
        // 백엔드에서 parts 목록 API를 제공하지 않아 빈 배열 반환
        return [];
      },

      // 업로드 실패 시 중단
      abortMultipartUpload: async (file, { uploadId, key }) => {
        try {
          const encodedKey = encodeURIComponent(key);
          const response = await httpService.delete(
            `${API_BASE_URL}/s3/multipart/${uploadId}?key=${encodedKey}`,
          );
          // if (!response.ok) {
          //   console.warn(`멀티파트 업로드 중단 실패: ${response.status}`);
          // }
          // 업로드 취소된 파일에서 activeUploads 제거
          setActiveUploads((prev) => {
            const updated = { ...prev };
            delete updated[file.id];
            return updated;
          });
        } catch (error: any) {
          console.error('멀티파트 업로드 중단 실패:', error);
        }
      },

      // 일반 업로드 (10MB 미만)
      getUploadParameters: async (file) => {
        try {
          const filename = `${folderPath}${file.name}`;
          const encodedFilename = encodeURIComponent(filename);

          const response = await httpService.get(
            `${API_BASE_URL}/s3/uploader?key=${encodedFilename}`,
            null,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          // if (!response.ok) {
          //   const errorData = await response.json();
          //   const errorMessage = errorData.error || `서버 오류: ${response.status}`;
          //   throw new Error(errorMessage);
          // }
          const data: any = response;

          return {
            method: 'PUT',
            url: data.url,
            headers: {
              'Content-Type': file.type,
            },
          };
        } catch (error: any) {
          updateFileError(file.id, `업로드 파라미터 획득 실패: ${error.message}`);
          throw error;
        }
      },
    });

    uppy.on('upload', (data: any) => {
      setIsUploading(true);
      setError(null);

      // 업로드 시작 시 activeUploads에 추가
      const newActiveUploads = { ...activeUploads };
      const tmpData = [...data];
      tmpData.forEach((id: any) => {
        newActiveUploads[id] = true;
      });
      setActiveUploads(newActiveUploads);
    });

    uppy.on('complete', (result) => {
      console.log('Upload complete:', result.successful);
      setIsUploading(false);
    });

    uppy.on('error', (error) => {
      setError(error.message);
      setIsUploading(false);
    });

    uppy.on('file-added', (file) => {
      console.log(file);
      setFiles((prev: any) => [
        ...prev,
        {
          id: file.id,
          name: file.name,
          size: file.size,
          progress: 0,
          status: 'waiting',
        },
      ]);
    });

    uppy.on('upload-progress', (file: any, progress) => {
      const { bytesUploaded, bytesTotal } = progress;
      const progressPercentage = (bytesUploaded / bytesTotal!) * 100;

      setFiles((prev: any) =>
        prev.map((f: any) =>
          f.id === file.id ? { ...f, progress: progressPercentage, status: 'uploading' } : f,
        ),
      );
    });

    uppy.on('upload-success', (file: any) => {
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: 'complete', progress: 100 } : f)),
      );

      // 완료된 파일 activeUploads에서 제거
      setActiveUploads((prev) => {
        const updated = { ...prev };
        delete updated[file.id];
        return updated;
      });

      // 만약 이 파일에 대한 재시도 타이머가 있으면 제거
      // if (retryTimersRef.current[file.id]) {
      //   clearTimeout(retryTimersRef.current[file.id]);
      //   delete retryTimersRef.current[file.id];
      // }
    });

    uppy.on('upload-error', (file: any) => {
      // 파일 상태 업데이트
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== file.id) return f;

          const retryCount = f.retryCount || 0;
          const errorMsg = error || '알 수 없는 오류';

          // 최대 재시도 횟수보다 적게 시도했으면 자동 재시도
          // if (retryCount < maxRetries) {
          //   // 재시도 타이머 설정
          //   if (retryTimersRef.current[file.id]) {
          //     clearTimeout(retryTimersRef.current[file.id]);
          //   }

          //   retryTimersRef.current[file.id] = setTimeout(() => {
          //     console.log(
          //       `Auto-retrying upload for ${file.name}, attempt ${retryCount + 1}/${maxRetries}`,
          //     );
          //     uppyRef.current?.retryUpload(file.id);
          //   }, retryDelay);

          //   return {
          //     ...f,
          //     status: 'error',
          //     errorMessage: `오류: ${errorMsg} (자동 재시도 ${retryCount + 1}/${maxRetries} 예정)`,
          //     retryCount: retryCount + 1,
          //   };
          // }

          // 최대 재시도 횟수에 도달하면 에러 상태로 표시
          return {
            ...f,
            status: 'error',
            errorMessage: `업로드 실패: ${errorMsg} (재시도 ${retryCount}/${maxRetries} 실패)`,
          };
        }),
      );
    });

    // 파일 제한 조건 실패 이벤트 추가
    uppy.on('restriction-failed', (file: any, error) => {
      console.error('파일 제한 조건 실패:', file.name, error);
      setError(`파일 제한 오류: ${error}`);
    });

    // 디버그용 추가 이벤트
    uppy.on('info-visible', () => {
      console.log('Uppy info visible');
    });

    uppy.on('info-hidden', () => {
      console.log('Uppy info hidden');
    });

    uppy.on('progress', (progress) => {
      // 전체 진행 상황 업데이트
      console.log(`Total progress: ${progress}%`);
    });

    uppy.on('upload-retry', (fileId) => {
      // 재시도 시 파일 상태 업데이트
      // setFiles((prev) =>
      //   prev.map((f) =>
      //     f.id === fileId ? { ...f, status: 'uploading', errorMessage: undefined } : f,
      //   ),
      // );
    });

    // uppy.on('cancel-all', () => {
    //   console.log('All uploads cancelled');
    //   setIsUploading(false);

    //   // 진행 중이던 타이머 모두 취소
    //   Object.keys(retryTimersRef.current).forEach((id) => {
    //     clearTimeout(retryTimersRef.current[id]);
    //   });
    //   retryTimersRef.current = {};

    //   setActiveUploads({});
    // });

    uppyRef.current = uppy;

    // 컴포넌트 언마운트 시 정리
    return () => {
      // 모든 타이머 정리
      // Object.keys(retryTimersRef.current).forEach((id) => {
      //   clearTimeout(retryTimersRef.current[id]);
      // });

      // 진행 중인 모든 업로드 취소
      if (uppy) {
        uppy.cancelAll();
        uppy.destroy();
      }
    };
  }, [allowedFileTypes, maxFileSize, folderPath, maxRetries, retryDelay]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => {
      uppyRef.current?.addFile({
        name: file.name,
        type: file.type,
        data: file,
      });
    });
  };

  // 파일 선택 처리 - 디버깅 로그 추가
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    console.log('파일 선택됨:', fileList);

    if (fileList && fileList.length > 0) {
      Array.from(fileList).forEach((file) => {
        console.log('파일 추가 시도:', file.name, file.type, file.size);

        try {
          uppyRef.current?.addFile({
            name: file.name,
            type: file.type,
            data: file,
          });
          console.log('파일 추가 시도 완료:', file.name);
        } catch (error: any) {
          console.error('파일 추가 중 오류:', error);
          setError(`파일 추가 오류: ${error.message}`);
        }
      });
    } else {
      console.log('선택된 파일이 없음');
    }
  };

  // 파일 크기 포맷 변환
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 특정 파일 업로드 일시 중지/재개
  const togglePauseResume = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);

    if (file?.status === 'uploading') {
      // 업로드 중이면 일시 중지
      uppyRef.current?.pauseResume(fileId);
      // 상태 업데이트
      setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: 'paused' } : f)));
    } else if (file?.status === 'paused') {
      // 일시 중지 상태면 재개
      uppyRef.current?.pauseResume(fileId);
      // 상태 업데이트
      setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: 'uploading' } : f)));
    }
  };

  // 파일 제거
  const removeFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);

    // 업로드 중인 파일이면 취소
    if (file && (file.status === 'uploading' || file.status === 'paused')) {
      // 멀티파트 업로드 중이면 서버에 중단 요청 보내기
      if (file.uploadId && file.key) {
        const encodedKey = encodeURIComponent(file.key);
        fetch(`${API_BASE_URL}/s3/multipart/${file.uploadId}?key=${encodedKey}`, {
          method: 'DELETE',
        }).catch((err) => console.error('멀티파트 업로드 중단 오류:', err));
      }

      uppyRef.current?.removeFile(fileId);
    } else {
      uppyRef.current?.removeFile(fileId);
    }

    // 재시도 타이머가 있으면 정리
    // if (retryTimersRef.current[fileId]) {
    //   clearTimeout(retryTimersRef.current[fileId]);
    //   delete retryTimersRef.current[fileId];
    // }

    // 활성 업로드 목록에서 제거
    setActiveUploads((prev) => {
      const updated = { ...prev };
      delete updated[fileId];
      return updated;
    });

    // 파일 목록에서 제거
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // 파일 오류 상태 업데이트
  const updateFileError = (fileId: string, errorMessage: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: 'error', errorMessage } : f)),
    );
  };

  // 파트 수 계산
  const calculateParts = (fileSize: number) => {
    const partCount = Math.ceil(fileSize / PART_SIZE);
    return Array.from({ length: partCount }, (_, i) => i + 1);
  };

  // 모든 업로드 취소
  const cancelAllUploads = () => {
    uppyRef.current?.cancelAll();
  };

  // 파트 상태 업데이트
  const updatePartStatus = (
    fileId: string,
    partNumber: number,
    status: 'waiting' | 'uploading' | 'complete' | 'error',
  ) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.id !== fileId || !f.parts) return f;

        // 해당 파트 업데이트
        const updatedParts = f.parts.map((part) =>
          part.partNumber === partNumber ? { ...part, status } : part,
        );

        return { ...f, parts: updatedParts };
      }),
    );
  };

  return (
    <div className={cn(styles.start, styles.upload_wrap, wrapSize && styles[wrapSize], className)}>
      <div className={styles.contents} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {files.length === 0 ? (
          <div className={styles.upload_area}>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              multiple
              accept={allowedFileTypes?.join(',')}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              role="button"
              className={styles.btn_file}>
              <IcoDownload
                width={40}
                height={40}
                stroke="#131c30"
                className={styles.icon_download}
              />
              <p className={styles.title}>영역을 클릭하거나 파일을 마우스로 끌어놓으세요</p>
              {/* <p className={styles.text}>최대 파일 크기: {formatFileSize(maxFileSize)}</p> */}
              <p className={styles.text}>
                {/*지원 파일 형식:*/} {allowedFileTypes.join(', ')}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.status_wrap}>
            {/* 진행 중인 업로드가 있을 때 모두 취소 버튼 표시 */}
            {/* {Object.keys(activeUploads).length > 0 && (
              <div className="mb-4 flex justify-end">
                <button
                  onClick={cancelAllUploads}
                  className="rounded-md bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600">
                  모든 업로드 취소
                </button>
              </div>
            )} */}

            {files.map((file) => (
              <div key={file.id} className={styles.file_item}>
                <div className={styles.file_info}>
                  <span className={styles.file_info}>{file.name}</span>
                  <span className={styles.file_size}>{formatFileSize(file.size)}</span>
                </div>

                {/* 진행 상태 표시 */}
                {file.status === 'uploading' && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{file.progress.toFixed(1)}%</span>
                      <span className={StatusColors[file.status]}>{StatusLabel[file.status]}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* 파일이 일시 중지 또는 완료 또는 에러 상태인 경우 */}
                {(file.status === 'paused' ||
                  file.status === 'complete' ||
                  file.status === 'error') && (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm">
                      {file.status === 'paused'
                        ? '일시 중지됨'
                        : file.status === 'complete'
                          ? '업로드 완료'
                          : '업로드 실패'}
                    </span>
                    <span className={StatusColors[file.status]}>{StatusLabel[file.status]}</span>
                  </div>
                )}

                {/* 에러 메시지 표시 */}
                {file.errorMessage && (
                  <div className="mt-1 text-sm text-red-500">{file.errorMessage}</div>
                )}

                {/* 파일 작업 버튼 */}
                <div className="mt-2 flex justify-end space-x-2">
                  {/* 일시 중지/재개 버튼 */}
                  {(file.status === 'uploading' || file.status === 'paused') && (
                    <button
                      className="rounded px-2 py-1 text-sm hover:bg-gray-200"
                      onClick={() => togglePauseResume(file.id)}>
                      {file.status === 'uploading' ? '일시 중지' : '재개'}
                    </button>
                  )}

                  {/* 재시도 버튼 */}
                  {file.status === 'error' && (
                    <button
                      className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-700 hover:bg-blue-200"
                      onClick={() => uppyRef.current?.retryUpload(file.id)}>
                      재시도
                    </button>
                  )}

                  {/* 삭제 버튼 */}
                  <Button
                    className={styles.btn_delete}
                    onClick={() => removeFile(file.id)}
                    onlyIcon>
                    <IcoTrash03 width={20} height={20} stroke="#131C30" />
                  </Button>
                </div>
              </div>
            ))}

            {/* 파일 추가 버튼 */}
            <div className="mt-4 flex justify-center space-x-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={isUploading && Object.keys(activeUploads).length > 3}>
                파일 추가
              </button>

              {isUploading && (
                <button
                  onClick={cancelAllUploads}
                  className="rounded-md border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-50">
                  업로드 중단
                </button>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-3 text-red-600">
            <p className="font-medium">업로드 오류</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-700 hover:underline">
              닫기
            </button>
          </div>
        )}
      </div>

      {/* 업로드 상태 요약 */}
      {files.length > 0 && (
        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <h3 className="font-medium">업로드 요약</h3>
          <div className="mt-2 grid grid-cols-4 gap-2 text-sm">
            <div>
              <span className="text-gray-500">총 파일:</span> {files.length}개
            </div>
            <div>
              <span className="text-gray-500">업로드 중:</span>{' '}
              {files.filter((f) => f.status === 'uploading').length}개
            </div>
            <div>
              <span className="text-gray-500">완료:</span>{' '}
              {files.filter((f) => f.status === 'complete').length}개
            </div>
            <div>
              <span className="text-gray-500">오류:</span>{' '}
              {files.filter((f) => f.status === 'error').length}개
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
