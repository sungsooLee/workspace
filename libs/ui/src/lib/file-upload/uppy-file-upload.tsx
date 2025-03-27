import React, { useEffect, useRef, useState } from 'react';
import Uppy, { type Meta, type Body, type UIPluginOptions, type State } from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { httpService, cn } from '@learnway/shared';
import {
  IcoDownload,
  IcoRefresh,
  IcoTrash03,
  IcoFileImg,
  IcoPause,
  IcoFileMp4,
} from '@learnway/icons';
import { Button } from '../button/button';
import { Progress } from '../progress/progress';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import styles from './uppy-file-upload.module.css';
import { Input } from '../input/input';

// 파일 아이템 인터페이스 확장 - 파트 정보 추가
export interface FileItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'waiting' | 'uploading' | 'complete' | 'error' | 'paused';
  errorMessage?: string;
  parts?: {
    partNumber: number;
    progress: number;
    status: 'waiting' | 'uploading' | 'complete' | 'error';
  }[];
  retryCount?: number;
  uploadId?: string;
  key?: string;
  response?: any;
}

// const DEFAULT_STATUS_LABELS = {
//   waiting: '유효성 검토 중',
//   uploading: '진행중',
//   complete: '완료',
//   error: '업로드 불가',
//   paused: '대기중',
// };

// const DEFAULT_STATUS_COLORS = {
//   waiting: 'text-gray-500',
//   uploading: 'text-blue-500',
//   complete: 'text-green-500',
//   error: 'text-red-500',
//   paused: 'text-gray-500',
// };

export interface UppyUploadProps {
  uploadType?: 'List' | 'Thumbnail' | 'Table' | 'Single';
  apiBaseUrl?: string;
  depthUrl?: string; // 파일 저장을 위한 Depth 지정
  allowedFileTypes?: string[];
  maxFileSize?: number;
  folderPath?: string;
  maxFiles?: number;
  maxRetries?: number;
  retryDelay?: number;
  chunkSize?: number;

  wrapSize?: 'sm' | 'md' | 'lg';
  className?: string;
  showProgressBar?: boolean;
  showFileList?: boolean;
  hideUploadButton?: boolean;
  label?: string;

  onUploadStart?: (files: FileItem[]) => void;
  onUploadProgress?: (fileId: string, progress: number) => void;
  onUploadSuccess?: (fileId: string, response: any) => void;
  onUploadError?: (fileId: string, error: Error | string) => void;
  onUploadComplete?: (successfulFiles: FileItem[], failedFiles: FileItem[]) => void;
  onFileAdded?: (file: FileItem) => void;
  onFileRemoved?: (fileId: string) => void;
  onAllComplete?: (result: { successful: FileItem[]; failed: FileItem[] }) => void;
}

export const UppyUpload: React.FC<UppyUploadProps> = ({
  uploadType = 'List',
  apiBaseUrl = 'http://localhost:8072/pms-module/admin/api/v1/file', // 현재는 로컬 테스트, 추후 서버 주소로 변경 필요
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
  maxFiles = 10,

  // Upload behavior
  maxRetries = 3,
  retryDelay = 2000,
  chunkSize = 5 * 1024 * 1024, // 5MB

  // UI customization
  wrapSize = 'md',
  className,
  showProgressBar = true,
  showFileList = true,
  hideUploadButton = false,
  label,
  // Callbacks
  onUploadStart,
  onUploadProgress,
  onUploadSuccess,
  onUploadError,
  onUploadComplete,
  onFileAdded,
  onFileRemoved,
  onAllComplete,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const uppyRef = useRef<Uppy | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 진행중인 업로드 파일 ID를 추적
  const [activeUploads, setActiveUploads] = useState<Record<string, boolean>>({});

  // API 엔드포인트 기본 URL
  const API_BASE_URL = apiBaseUrl;
  // 'http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/pms-module/admin/api/v1/file';

  // 청크 사이즈
  const PART_SIZE = chunkSize;

  useEffect(() => {
    const uppy = new Uppy({
      debug: true,
      autoProceed: true,
      allowMultipleUploadBatches: true,
      restrictions: {
        maxFileSize: maxFileSize,
      },
    }).use(AwsS3, {
      // 파일 크기가 10MB 이상인 경우 멀티파트 업로드 사용
      shouldUseMultipart: (file: any) => file.size > 10 * 1024 * 1024,

      // 1. 멀티파트 업로드 초기화
      createMultipartUpload: async (file) => {
        // 파일명에 폴더 경로 추가
        console.log(file);
        try {
          const filename = `${file.name}`;
          console.log(filename);
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
          if (onUploadError) onUploadError(file.id, error);
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
          if (onUploadError)
            onUploadError(file.id, `Part ${partNumber} 업로드 실패: ${error.message}`);
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

          const response = await httpService.post(
            `${API_BASE_URL}/s3/multipart/${uploadId}/complete?key=${encodedKey}`,
            JSON.stringify({ parts: formattedParts }),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

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
          if (onUploadError) onUploadError(file.id, error);
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
          // (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
          const filename = `${file.name}`;
          const encodedFilename = `upload/` + encodeURIComponent(filename);

          const response = await httpService.get(
            `${API_BASE_URL}/s3/uploader?key=${encodedFilename}`,
            null,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

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
          if (onUploadError) onUploadError(file.id, error);
          throw error;
        }
      },
    });

    uppy.on('upload', (data: any) => {
      console.log('업로드 시작 데이터 타입:', typeof data, data);
      setIsUploading(true);
      setError(null);

      // 업로드 시작 시 activeUploads에 추가
      const newActiveUploads = { ...activeUploads };

      // 예전 방식으로 처리 (배열로 가정)
      try {
        const tmpData = Array.isArray(data) ? [...data] : typeof data === 'string' ? [data] : [];
        console.log('처리된 파일 ID 목록:', tmpData);

        tmpData.forEach((id) => {
          newActiveUploads[id] = true;
        });
        setActiveUploads(newActiveUploads);
      } catch (e) {
        console.error('업로드 데이터 처리 중 오류:', e);
      }
    });

    uppy.on('complete', (result) => {
      console.log('Upload complete:', result.successful);
      setIsUploading(false);

      const successfulFiles: any = result.successful ? [...result.successful] : [];

      const failedFiles: any = result.failed ? [...result.failed] : [];

      if (onUploadComplete) {
        onUploadComplete(successfulFiles, failedFiles);
      }

      if (onAllComplete) {
        onAllComplete({ successful: successfulFiles, failed: failedFiles });
      }
    });

    uppy.on('error', (error) => {
      setError(error.message);
      setIsUploading(false);
    });

    uppy.on('file-added', (file) => {
      console.log(file);
      const newFile = {
        id: file.id,
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'waiting' as const,
      } as FileItem;

      setFiles((prev: any) => [...prev, newFile]);

      if (onFileAdded) {
        onFileAdded(newFile);
      }
    });

    uppy.on('upload-progress', (file: any, progress) => {
      const { bytesUploaded, bytesTotal } = progress;
      const progressPercentage = (bytesUploaded / bytesTotal!) * 100;

      setFiles((prev: any) =>
        prev.map((f: any) =>
          f.id === file.id ? { ...f, progress: progressPercentage, status: 'uploading' } : f,
        ),
      );

      if (onUploadProgress) {
        onUploadProgress(file.id, progressPercentage);
      }
    });

    uppy.on('upload-success', (file: any, response) => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: 'complete', progress: 100, response: response } : f,
        ),
      );

      // 완료된 파일 activeUploads에서 제거
      setActiveUploads((prev) => {
        const updated = { ...prev };
        delete updated[file.id];
        return updated;
      });

      if (onUploadSuccess) {
        onUploadSuccess(file.id, response);
      }
    });

    uppy.on('upload-error', (file: any, error) => {
      // 파일 상태 업데이트
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== file.id) return f;

          const retryCount = f.retryCount || 0;
          const errorMsg = error || '알 수 없는 오류';

          // 최대 재시도 횟수에 도달하면 에러 상태로 표시
          return {
            ...f,
            status: 'error',
            errorMessage: `업로드 실패: ${errorMsg} (재시도 ${retryCount}/${maxRetries} 실패)`,
          };
        }),
      );
      if (onUploadError) {
        onUploadError(file.id, error);
      }
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

    uppyRef.current = uppy;

    // 컴포넌트 언마운트 시 정리
    return () => {
      // 진행 중인 모든 업로드 취소
      if (uppy) {
        uppy.cancelAll();
        uppy.destroy();
      }
    };
  }, [
    allowedFileTypes,
    maxFileSize,
    folderPath,
    maxRetries,
    retryDelay,
    maxFiles,
    chunkSize,
    onUploadStart,
    onUploadProgress,
    onUploadSuccess,
    onUploadError,
    onUploadComplete,
    onFileAdded,
    onFileRemoved,
    onAllComplete,
  ]);

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

    if (fileList && fileList.length > 0) {
      // Single 타입일 경우 기존 파일 모두 제거
      if (uploadType === 'Single' && files.length > 0) {
        files.forEach((file) => {
          uppyRef.current?.removeFile(file.id);
        });
        setFiles([]);
      }

      Array.from(fileList).forEach((file) => {
        try {
          const fileSizeMB = file.size / (1024 * 1024);
          console.log(`파일 정보: ${file.name}, 크기: ${fileSizeMB.toFixed(2)}MB`);

          // Single 타입인 경우 첫 번째 파일만 업로드
          if (uploadType === 'Single' && fileList.length > 1 && files.length > 0) {
            return;
          }
          uppyRef.current?.addFile({
            name: file.name,
            type: file.type,
            data: file,
          });
        } catch (error: any) {
          console.error('파일 추가 중 오류:', error);
          setError(`파일 추가 오류: ${error.message}`);
        }
      });
    } else {
      console.log('선택된 파일이 없음');
    }

    // 파일 선택 후 input 값 초기화 (같은 파일 재선택 가능하도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

    // 활성 업로드 목록에서 제거
    setActiveUploads((prev) => {
      const updated = { ...prev };
      delete updated[fileId];
      return updated;
    });

    // 파일 목록에서 제거
    setFiles((prev) => prev.filter((f) => f.id !== fileId));

    if (onFileRemoved) {
      onFileRemoved(fileId);
    }
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
      {uploadType === 'List' && (
        <div className={styles.contents} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
          {files.length === 0 ? (
            <div className={styles.upload_area}>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                multiple
                /*accept={allowedFileTypes?.map((type) => `.${type}`).join(',')}*/
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
              {showFileList &&
                files.map((file) => (
                  <div key={file.id} className={styles.file_item}>
                    <div className={styles.file_info}>
                      <span className={styles.file_icon}>
                        {<IcoFileMp4 width={24} height={24} className={styles.icon_file} />}
                      </span>
                      <span className={styles.file_name}>{file.name}</span>
                      <span className={styles.file_size}>{formatFileSize(file.size)}</span>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-center justify-between"></div>
                      <Progress value={file.progress} />
                    </div>

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
                      </div>
                    )}

                    {/* Error message */}
                    {file.errorMessage && (
                      <div className="mt-1 text-sm text-red-500">{file.errorMessage}</div>
                    )}

                    {/* File action buttons */}
                    <div className={styles.btn_status}>
                      {/* Pause/Resume button */}
                      {(file.status === 'uploading' || file.status === 'paused') && (
                        <Button
                          className={styles.btn}
                          onlyIcon
                          onClick={() => togglePauseResume(file.id)}>
                          {file.status === 'uploading' ? (
                            <IcoPause width={20} height={20} fill="#A9AFB8" />
                          ) : (
                            <IcoRefresh width={20} height={20} fill="#00AFD5" />
                          )}
                        </Button>
                      )}

                      {/* Retry button */}
                      {file.status === 'error' && (
                        <Button
                          className={styles.btn}
                          onlyIcon
                          onClick={() => uppyRef.current?.retryUpload(file.id)}>
                          <IcoRefresh width={20} height={20} fill="#00AFD5" />
                        </Button>
                      )}

                      {/* Delete button */}
                      <Button
                        className={styles.btn_delete}
                        onClick={() => removeFile(file.id)}
                        onlyIcon>
                        <IcoTrash03 width={20} height={20} stroke="#131C30" />
                      </Button>
                    </div>
                  </div>
                ))}
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
      )}
      {uploadType === 'Single' && (
        <div className="single-uploader">
          <span className="mb-1 block text-sm">{label}</span>
          <div className="flex items-center">
            <div className="relative mr-2 flex-grow">
              <input
                value={files.length > 0 ? files[0].name : ''}
                readOnly
                placeholder="파일을 선택해주세요"
                onClick={() => fileInputRef.current?.click()}
                className="w-full cursor-pointer"
              />
              {files.length > 0 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                  onClick={(e) => {
                    e.stopPropagation(); // Input 클릭 이벤트가 발생하지 않도록 방지
                    removeFile(files[0].id);
                  }}>
                  <IcoTrash03 width={16} height={16} stroke="#9CA3AF" />
                </button>
              )}
            </div>
            <Button onClick={() => fileInputRef.current?.click()} type="button">
              파일 첨부
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept={allowedFileTypes?.map((type) => `.${type}`).join(',')}
            />
          </div>

          {files.length > 0 && files[0].status === 'error' && (
            <div className="mt-1 text-sm text-red-500">
              {files[0].errorMessage || '업로드 중 오류가 발생했습니다.'}
            </div>
          )}
        </div>
      )}

      {/* Upload summary */}
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
