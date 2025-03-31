import { useEffect, useReducer, useRef } from 'react';
import { getUniqueId, httpService } from '@learnway/shared';
import Uppy, { UppyFile } from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { uppyFileReducer } from './uppy-reducer';
import { FileBody, FileMeta, FileProgressStarted, UseFileUploaderProps } from './types';
import { completedMultiPartUpload, initMultiPartUpload, issuePresigendUrlByPart } from './api/s3';

const isDebug = process.env.NODE_ENV !== 'production';
const API_BASE_URL = 'http://localhost:8072/pms-module/admin/api/v1/file';
const IS_MULTIPART_SIZE = 10 * 1024 * 1024; // 1MB

/**
 * 파일 업로드 공통 hook
 */
const useFileUploaderHook = (config: UseFileUploaderProps) => {
  const uppyRef = useRef<Uppy>();
  // useReducer로 파일 상태 관리
  const [files, dispatch] = useReducer(uppyFileReducer, []);
  // uppy 객체
  useEffect(() => {
    const uppy = new Uppy({
      debug: isDebug,
      autoProceed: true,
      allowMultipleUploadBatches: true,
      restrictions: {
        maxFileSize: config.maxFileSize,
      },
    }).use(AwsS3, {
      shouldUseMultipart: (file: any) => file.size > IS_MULTIPART_SIZE,

      // 멀티파트 업로드 초기화
      createMultipartUpload: async (file: any) => {
        const data = await initMultiPartUpload(`${config.s3Path}/${file.name}`);
        if (data) {
          dispatch({
            type: 'UPDATE_FILE',
            fileId: file.id,
            updates: {
              uploadId: data.uploadId,
              key: data.key,
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
        }
        return { uploadId: data?.uploadId || '', key: data?.key || '' };
      },

      // 청크별 presigned URL 요청
      signPart: async (file, { uploadId, key, partNumber }) => {
        const data = await issuePresigendUrlByPart({
          uploadId,
          partNumber,
          filename: `${config.s3Path}/${file.name}`,
        });

        if (!data?.url) {
          dispatch({
            type: 'UPDATE_FILE',
            fileId: file.id,
            updates: {
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
      listParts: async () => {
        // 백엔드에서 parts 목록 API를 제공하지 않아 빈 배열 반환
        return [];
      },
      getUploadParameters: () => {
        throw new Error('Non-multipart uploads are not supported');
      },
      // 업로드 실패 시 중단
      abortMultipartUpload: async (file, { uploadId, key }) => {
        try {
          const encodedKey = encodeURIComponent(key);
          const response = await httpService.delete(
            `${API_BASE_URL}/s3/multipart/${uploadId}?key=${encodedKey}`,
          );
        } catch (error: any) {
          console.error('멀티파트 업로드 중단 실패:', error);
        }
      },
      // 멀티파트 업로드 완료
      completeMultipartUpload: async (file, { uploadId, key, parts }) => {
        const uploadParts = parts as any;
        const data = await completedMultiPartUpload({ uploadId, parts: uploadParts });
        if (data) {
          return data;
        }
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
    uppy.on('file-added', (file: any) => {
      dispatch({ type: 'ADD_FILE', file });
    });
    uppy.on(
      'upload-progress',
      (file?: UppyFile<FileMeta, FileBody>, progress?: FileProgressStarted) => {
        if (!file || !progress) return;
        const percentage = (progress.bytesUploaded / (progress.bytesTotal || 0)) * 100;
        dispatch({
          type: 'UPDATE_FILE',
          fileId: file.id,
          updates: {
            progress: percentage,
          },
        });
      },
    );
    uppy.on('upload-success', (file?: UppyFile<FileMeta, FileBody>) => {
      if (!file) return;
      dispatch({
        type: 'UPDATE_FILE',
        fileId: file.id,
        updates: {
          progress: 100,
        },
      });
    });
    uppy.on('upload-error', (file?: UppyFile<FileMeta, FileBody>, error?: Error) => {
      if (!file || !error) return;
      dispatch({
        type: 'UPDATE_FILE',
        fileId: file.id,
        updates: { status: 'error', errorMessage: error.message },
      });
    });

    uppy.on('file-removed', (file?: UppyFile<FileMeta, FileBody>) => {
      if (!file) return;
      dispatch({
        type: 'REMOVE_FILE',
        fileId: file.id,
      });
    });

    uppyRef.current = uppy;

    return () => {
      uppy.cancelAll();
      uppy.clear();
    };
  }, []);
  /**
   *
   * @param files
   */
  const addFiles = (files: File[]) => {
    if (!uppyRef || !uppyRef.current) return;
    uppyRef.current.addFiles(
      files.map((file) => ({
        id: getUniqueId(),
        name: file.name,
        type: file.type,
        data: file,
      })),
    );
  };

  const removeFile = (fileId: string) => {
    if (!uppyRef || !uppyRef.current) return;
    uppyRef.current.removeFile(fileId);
  };

  return { files, addFiles, removeFile };
};

export const useFileUploader = useFileUploaderHook;
