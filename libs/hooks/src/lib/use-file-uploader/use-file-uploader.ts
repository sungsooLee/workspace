import { useEffect, useReducer, useRef } from 'react';
import { getUniqueId, httpService } from '@learnway/shared';
import Uppy, { UppyFile } from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { uppyFileReducer } from './uppy-reducer';
import {
  FileBody,
  FileItem,
  FileMeta,
  FileProgressStarted,
  FileUploaderConfig,
  MultiFilePartRes,
} from './types';
import {
  abortMultiPartUpload,
  completedMultiPartUpload,
  getMultiFileParts,
  initMultiPartUpload,
  issuePresigendUrlByPart,
  issuePresigendUrlBySingle,
} from './api/s3';

const isDebug = process.env.NODE_ENV !== 'production';
const API_BASE_URL = 'http://localhost:8072/pms-module/admin/api/v1/file';
const IS_MULTIPART_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * 파일 업로드 공통 hook
 */
const useFileUploaderHook = (config: FileUploaderConfig) => {
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
        const data = await initMultiPartUpload(encodeURIComponent(file.meta.key));
        console.log('initMultiPartUpload', data);
        if (data) {
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
        }
        return { uploadId: data?.uploadId || '', key: data?.key || '' };
      },

      // 청크별 presigned URL 요청
      signPart: async (file, { uploadId, key, partNumber }) => {
        console.log('signPart', file, { uploadId, key, partNumber });
        const data = await issuePresigendUrlByPart({
          uploadId,
          partNumber,
          key: encodeURIComponent(key),
        });
        console.log('data => ', data);
        console.log('data?.url => ', data?.url);
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
      listParts: async (_, { uploadId, key }) => {
        console.log('parts');
        const encodedKey = encodeURIComponent(key);
        const parts = (await getMultiFileParts(uploadId || '', encodedKey)) as any[] | undefined;
        return parts || [];
      },
      getUploadParameters: async (file?: UppyFile<FileMeta, FileBody>) => {
        if (!file) {
          throw new Error('file is undefined');
        }
        const response = await issuePresigendUrlBySingle(encodeURIComponent(file.meta.key));
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
      // 업로드 실패 시 중단
      abortMultipartUpload: async (_, { uploadId, key }) => {
        const encodedKey = encodeURIComponent(key);
        //const response = abortMultiPartUpload(uploadId || '', encodedKey);
      },
      // 멀티파트 업로드 완료
      completeMultipartUpload: async (_, { uploadId, key, parts }) => {
        console.log('key =>', key);
        const uploadParts = parts as any;
        const data = await completedMultiPartUpload({
          uploadId,
          parts: uploadParts,
          key: encodeURIComponent(key),
        });
        if (data) {
          return data as any;
        }
        throw new Error('get upload parameters failed');
      },
    });

    // Uppy 이벤트 설정
    uppy.on('file-added', (file: UppyFile<FileMeta, FileBody>) => {
      const addFile: FileItem = {
        id: file.id,
        filename: file.name || '',
        s3FileName: file.meta.s3FileName || '',
        extension: file.extension,
        key: file.meta.key || '',
        size: file.size || 0,
        progress: 0,
        status: 'waiting',
      };
      dispatch({ type: 'ADD_FILE', file: addFile });
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
      console.error(`[ERROR] 파일 업로드 실패: ${file.name}`);
      console.error(`[ERROR] 에러 메시지: ${error.message}`);

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
    const filesArray = Array.from(files);

    uppyRef.current.addFiles(
      filesArray.map((file) => {
        const s3FileName = getUniqueId() + '.' + file.name.split('.').pop() || '';
        return {
          name: file.name,
          type: file.type,
          data: file,
          meta: {
            s3FileName,
            key: '/upload' + config.s3Path + '/' + s3FileName,
          },
        };
      }),
    );
  };

  const removeFile = (fileId: string) => {
    if (!uppyRef || !uppyRef.current) return;
    uppyRef.current.removeFile(fileId);
  };

  return { files, addFiles, removeFile };
};

export const useFileUploader = useFileUploaderHook;
