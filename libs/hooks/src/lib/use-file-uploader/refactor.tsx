import React, { useReducer, useEffect, useRef } from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';

const API_BASE_URL = apiBaseUrl; // API 기본 URL
const PART_SIZE = chunkSize; // 청크 사이즈

// 파일 상태 타입
interface FileItem {
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

// useReducer 액션 타입
type Action =
  | { type: 'ADD_FILE'; file: FileItem }
  | { type: 'UPDATE_FILE'; fileId: string; updates: Partial<FileItem> }
  | { type: 'REMOVE_FILE'; fileId: string }
  | { type: 'CLEAR_ERROR' };

// 리듀서 함수 (상태 업데이트)
export const filesReducer = (state: FileItem[], action: Action): FileItem[] => {
  switch (action.type) {
    case 'ADD_FILE':
      return [...state, action.file];
    case 'UPDATE_FILE':
      return state.map((file) =>
        file.id === action.fileId ? { ...file, ...action.updates } : file,
      );
    case 'REMOVE_FILE':
      return state.filter((file) => file.id !== action.fileId);
    case 'CLEAR_ERROR':
      return state.map((file) => ({ ...file, errorMessage: undefined }));
    default:
      return state;
  }
};

const FileUploadComponent = () => {
  const [files, dispatch] = useReducer(filesReducer, []); // useReducer로 파일 상태 관리
  const uppyRef = useRef<Uppy | null>(null);

  // 파일 추가
  const handleAddFile = (file: any) => {
    const newFile: FileItem = {
      id: file.id,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'waiting',
    };
    dispatch({ type: 'ADD_FILE', file: newFile });
  };

  // 파일 업로드 업데이트
  const updateFileProgress = (fileId: string, progress: number, status: FileItem['status']) => {
    dispatch({ type: 'UPDATE_FILE', fileId, updates: { progress, status } });
  };

  // 파일 제거
  const handleRemoveFile = (fileId: string) => {
    uppyRef.current?.removeFile(fileId);
    dispatch({ type: 'REMOVE_FILE', fileId });
  };

  useEffect(() => {
    const uppy = new Uppy({
      debug: true,
      autoProceed: true,
      allowMultipleUploadBatches: true,
      restrictions: {
        maxFileSize: maxFileSize,
      },
    }).use(AwsS3, {
      shouldUseMultipart: (file: any) => file.size > 10 * 1024 * 1024,

      // 멀티파트 업로드 초기화
      createMultipartUpload: async (file: any) => {
        try {
          const response = await fetch(`${API_BASE_URL}/s3/multipart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: file.name }),
          });
          const data = await response.json();

          dispatch({
            type: 'UPDATE_FILE',
            fileId: file.id,
            updates: {
              uploadId: data.uploadId,
              key: data.key,
              parts: calculateParts(file.size).map((partNumber) => ({
                partNumber,
                progress: 0,
                status: 'waiting',
              })),
            },
          });

          return { uploadId: data.uploadId, key: data.key };
        } catch (error) {
          console.error('Multipart upload initialization failed:', error);
        }
      },

      // 청크별 presigned URL 요청
      signPart: async (file, { uploadId, key, partNumber }) => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/s3/multipart/${uploadId}/${partNumber}?key=${encodeURIComponent(key)}`,
          );
          const data = await response.json();
          return { url: data.url, headers: { 'Content-Type': file.type } };
        } catch (error) {
          console.error(`Part ${partNumber} signing failed for file ${file.id}:`, error);
        }
      },

      // 멀티파트 업로드 완료
      completeMultipartUpload: async (file, { uploadId, key, parts }) => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/s3/multipart/${uploadId}/complete?key=${encodeURIComponent(key)}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ parts }),
            },
          );
          return await response.json();
        } catch (error) {
          console.error('Multipart upload completion failed:', error);
        }
      },
    });

    // Uppy 이벤트 설정
    uppy.on('file-added', (file) => handleAddFile(file));
    uppy.on('upload-progress', (file, progress) => {
      const percentage = (progress.bytesUploaded / progress.bytesTotal) * 100;
      updateFileProgress(file.id, percentage, 'uploading');
    });
    uppy.on('upload-success', (file) => updateFileProgress(file.id, 100, 'complete'));
    uppy.on('upload-error', (file, error) => {
      dispatch({
        type: 'UPDATE_FILE',
        fileId: file.id,
        updates: { status: 'error', errorMessage: error.message },
      });
    });

    uppyRef.current = uppy;

    return () => {
      uppy.cancelAll();
      uppy.close();
    };
  }, []);

  // 청크 수 계산
  const calculateParts = (fileSize: number) => {
    const partCount = Math.ceil(fileSize / PART_SIZE);
    return Array.from({ length: partCount }, (_, i) => i + 1);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => {
          Array.from(e.target.files || []).forEach((file) => {
            uppyRef.current?.addFile({ name: file.name, type: file.type, data: file });
          });
        }}
      />
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name} - {file.progress.toFixed(2)}% - {file.status}
            <button onClick={() => handleRemoveFile(file.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
