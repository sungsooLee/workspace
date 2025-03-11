import React, { useEffect, useRef, useState } from 'react';
import Uppy, { type Meta, type Body, type UIPluginOptions, type State } from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

interface FileItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'waiting' | 'uploading' | 'complete' | 'error' | 'paused';
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
}

export const UppyUpload: React.FC<SimpleUploadProps> = ({
  allowedFileTypes = [
    '.mp4',
    '.wmv',
    '.ts',
    '.avi',
    '.mkv',
    '.mts',
    '.mov',
    '.mxf',
    '.mpeg',
    '.mpg',
    '.webm',
    '.asf',
    '.skm',
    '.k3g',
    '.png',
  ],
  maxFileSize = 1024 * 1024 * 1024, // 1GB
  folderPath = 'uploads/',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const uppyRef = useRef<Uppy | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API 엔드포인트 기본 URL
  const API_BASE_URL = 'http://localhost:8072/pms-module/admin/api/v1/file';

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
        const filename = `${file.name}`;
        console.log(filename);
        const response = await fetch(`${API_BASE_URL}/s3/multipart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: filename,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || '멀티파트 업로드 시작 실패');
        }
        console.log(data);

        return {
          uploadId: data.uploadId,
          key: data.key,
        };
      },

      // 2. 각 파트별 presigned URL 요청
      signPart: async (file, { uploadId, key, partNumber }) => {
        const encodedKey = encodeURIComponent(key);
        const response = await fetch(
          `${API_BASE_URL}/s3/multipart/${uploadId}/${partNumber}?key=${encodedKey}`,
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || '파트 서명 실패');
        }

        return {
          url: data.url,
          headers: {
            'Content-Type': file.type,
          },
        };
      },

      // 3. 모든 파트 업로드 완료 후 멀티파트 업로드 완료
      completeMultipartUpload: async (file, { uploadId, key, parts }) => {
        const encodedKey = encodeURIComponent(key);

        // API 요청에 맞는 형태로 parts 변환
        const formattedParts = parts.map((part: any) => ({
          partNumber: part.partNumber,
          eTag: part.eTag,
        }));

        const response = await fetch(
          `${API_BASE_URL}/s3/multipart/${uploadId}/complete?key=${encodedKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ parts: formattedParts }),
          },
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || '멀티파트 업로드 완료 실패');
        }

        return data;
      },

      listParts: async () => {
        // 백엔드에서 parts 목록 API를 제공하지 않아 빈 배열 반환
        return [];
      },

      // 업로드 실패 시 중단
      abortMultipartUpload: async (file, { uploadId, key }) => {
        const encodedKey = encodeURIComponent(key);
        await fetch(`${API_BASE_URL}/s3/multipart/${uploadId}?key=${encodedKey}`, {
          method: 'DELETE',
        });
      },

      // 일반 업로드 (10MB 미만)
      getUploadParameters: async (file) => {
        const filename = `${folderPath}${file.name}`;
        const encodedFilename = encodeURIComponent(filename);

        const response = await fetch(`${API_BASE_URL}/s3/uploader?key=${encodedFilename}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.error || '업로드 파라미터 획득 실패');
        }

        return {
          method: 'PUT',
          url: data.data.url,
          headers: {
            'Content-Type': file.type,
          },
        };
      },
    });

    uppy.on('upload', () => {
      setIsUploading(true);
      setError(null);
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
    });

    uppy.on('upload-error', (file: any) => {
      console.log(file);
      setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: 'error' } : f)));
    });

    uppyRef.current = uppy;
    return () => uppy.destroy();
  }, [allowedFileTypes, maxFileSize, folderPath]);

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      Array.from(fileList).forEach((file) => {
        uppyRef.current?.addFile({
          name: file.name,
          type: file.type,
          data: file,
        });
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0MB';
    const mb = bytes / (1024 * 1024);
    return `${Math.round(mb)}MB`;
  };

  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      <div
        className="rounded-lg border-2 border-dashed border-gray-300 p-6"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}>
        {files.length === 0 ? (
          <div className="py-10 text-center">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              multiple
              accept={allowedFileTypes?.join(',')}
            />
            <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
              <p className="mb-2 text-lg">영역을 클릭하거나 파일을 마우스로 끌어놓으세요</p>
              <p className="text-sm text-gray-500">최대 파일 크기: {formatFileSize(maxFileSize)}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 rounded-lg bg-gray-50 p-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate font-medium">{file.name}</span>
                    <span className="text-gray-500">{formatFileSize(file.size)}</span>
                  </div>
                  {file.status === 'uploading' && (
                    <div className="mt-2">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <span className={StatusColors[file.status]}>{StatusLabel[file.status]}</span>
                {file.status === 'uploading' && (
                  <button
                    className="rounded p-1 hover:bg-gray-200"
                    onClick={() => uppyRef.current?.pauseResume(file.id)}>
                    ||
                  </button>
                )}
                {file.status === 'error' && (
                  <button
                    className="rounded p-1 hover:bg-gray-200"
                    onClick={() => uppyRef.current?.retryUpload(file.id)}>
                    ↻
                  </button>
                )}
                <button
                  className="rounded p-1 hover:bg-gray-200"
                  onClick={() => {
                    uppyRef.current?.removeFile(file.id);
                    setFiles((prev) => prev.filter((f) => f.id !== file.id));
                  }}>
                  X
                </button>
              </div>
            ))}

            {/* 파일 추가 버튼 */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
                파일 추가
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-3 text-red-600">
            <p className="font-medium">업로드 오류</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
