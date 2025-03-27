import { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react';
import { getUniqueId, httpService } from '@learnway/shared';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { uppyFileReducer } from './uppy-reducer';
import { UseFileUploaderProps } from './types';
import { completedMultiPartUpload, initMultiPartUpload, issuePresigendUrlByPart } from './api/s3';
const isDebug = process.env.NODE_ENV !== 'production';
const API_BASE_URL = 'http://localhost:8072/pms-module/admin/api/v1/file';
const IS_MULTIPART_SIZE = 10 * 1024 * 1024; // 1MB
/**
 * 파일 업로드 공통 hook
 */
const useFileUploaderHook = (config: UseFileUploaderProps) => {
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
        if (data) {
          return { url: data?.url || '', headers: { 'Content-Type': file.type } };
        } else {
          dispatch({
            type: 'UPDATE_FILE',
            fileId: file.id,
            updates: {
              errorMessage: 'fail to get presigned url',
            },
          });
        }
      },

      // 멀티파트 업로드 완료
      completeMultipartUpload: async (file, { uploadId, key, parts }) => {
        const data = await completedMultiPartUpload({ uploadId, parts });
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
  return { ref: fileRef, status };
};

export const useFileUploader = useFileUploaderHook;
