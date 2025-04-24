import { S3UploaderConfig, UploadFile } from './types';
import { useCallback, useEffect, useState } from 'react';
import { useUploadTask } from './use-upload-task';
import { resumeUpload, startUpload } from './upload-manger';
import { getRandomId } from '@learnway/shared';
import { formatFileSize, normalizePath, updateFile } from './utils';
import { abortMultiPartUpload } from './api';
const DEFAULT_MULTIPART_THRESHOLD = 10 * 1204 * 1024;

/**
 * React 커스텀 훅: S3 파일 업로드 관리
 * - AWS S3 업로드를 위한 상태 관리 및 작업 툴을 제공
 * - 단일 파일 및 멀티파트 업로드 지원
 * - 업로드 준비, 진행, 중단, 재시도 등의 전반적인 업로드 라이프사이클 관리
 *
 * @param config S3UploaderConfig
 *               { sync: boolean } - 순차 업로드 여부
 *               { auto: boolean } - 파일 추가 시 자동 업로드
 */
const useS3UploaderHook = (config: S3UploaderConfig) => {
  const {
    auto = true,
    async = false,
    multipartThreshold = DEFAULT_MULTIPART_THRESHOLD,
    s3Path,
  } = config;

  // 현재 업로드 상태를 관리하는 state
  const [files, setFiles] = useState<UploadFile[]>([]);

  // useUploadTask 를 통해 작업 큐 생성
  const { addTask, removeTask } = useUploadTask({
    files,
    executeTask: (id) => startUpload(id, files, setFiles), // 업로드 실행
    resumeTask: (id) => resumeUpload(id, files, setFiles), // 업로드 재개 실행
  });
  /**
   * 파일추가
   * - 유니크 ID 및 S3 Key 를 생성하고 파일을 업로드 대기 상태로 만듬
   * - 파일 크기에 따라 단일 업로드 또는 멀티 파트 업로드 방식 지정
   * @param files 사용자가 추가한 파일 리스트
   */
  const addFiles = (files: File[]) => {
    const newFiles = files.map((file) => {
      const id = getRandomId(); // 각 파일에 고유 ID 생성
      const fileName = file.name;
      const extension = fileName.split('.').pop() || ''; // 파일 확장자 추출
      const s3FileName = id + '.' + extension.toLowerCase(); // S3 파일 이름 생성
      const key = normalizePath(s3Path) + s3FileName; // S3 KEY 경로 설정
      const size = file.size;
      const uploadType = size > multipartThreshold ? 'multi-part' : 'single-part'; // 업로드 방식 결정
      return {
        id,
        file,
        uploadType,
        extension,
        s3FileName,
        fileName,
        size,
        displaySize: formatFileSize(size),
        progress: 0, // 업로드 프로그레스
        status: 'validating', // 업로드 대기 상태
        key,
        parts: [], // 멀티파트 정보
      };
    }) as UploadFile[];
    // files 상태에 파일 추가
    setFiles((prev) => [...prev, ...newFiles]);
  };
  /**
   * 파일 제거
   * 업로드 중단 후 파일 리스트에서 제거
   * @param id 제거할 파일의 ID
   */
  const onRemove = async (id: string) => {
    await onAbort(id); // 업로드 중단
    removeTask(id); // 큐에서 제거
    setFiles((prev) => prev.filter((f) => f.id !== id)); // 파일목록에서 제거
  };

  /**
   * 업로드 중단
   * 진행중인 업로드 중단 및 AWS S3 세션 종료
   * @param id 중단할 파일의 아이디
   */
  const onAbort = async (id: string) => {
    const target = files.find((f) => f.id === id);
    if (!target || !target.uploadId) return;
    target.controller?.abort(); // AbortController로 업로드 중단
    await abortMultiPartUpload(target.uploadId, target.key);

    // 파일 상태를 'aborted'로 갱신
    setFiles((prev) => updateFile(prev, id, { status: 'aborted' }));
  };

  /**
   * 실패한 업로드 재시도
   * - 기존 업로드 세션을 중단한 뒤 새 업로드 진행
   * @param id 재시도할 파일의 아이디
   */
  const onRetry = async (id: string) => {
    await onAbort(id);
    await startUpload(id, files, setFiles);
  };

  const autoUploadProcess = useCallback(async () => {
    const idleFiles = files.filter((f) => f.status === 'idle'); // 대기 상태의 파일만 처리
    if (idleFiles.length === 0) return;
    if (async) {
      // 순차적으로 업로드 (큐 방식)
      idleFiles.forEach((f) => addTask(f.id));
    } else {
      // 병렬로 업로드
      idleFiles.forEach((f) => startUpload(f.id, files, setFiles));
    }
  }, [async, files]);

  const fileValidating = useCallback(() => {
    const validatingFiles = files.filter((f) => f.status === 'validating'); // 유효성 상태의 파일만 처리
    if (validatingFiles.length === 0) return;
    validatingFiles.forEach((file) => {
      const isError = false;
      setFiles((prev) =>
        updateFile(prev, file.id, {
          status: isError ? 'validating-error' : 'idle',
        }),
      );
    });
  }, [files]);

  /**
   * 설정 값 변경시 자동 업로드 활성화
   */
  useEffect(() => {
    if (!auto) return;
    autoUploadProcess();
  }, [auto, files]);

  /**
   * 파일 변경시 유효성 체크
   */
  useEffect(() => {
    fileValidating();
  }, [files]);

  return {
    // 업로드 상태 및 CRUD 기능 반환
    files, // 파일 리스트
    addFiles, // 파일 추가
    onRemove, // 파일 제거
    onStart: (id: string) => startUpload(id, files, setFiles), // 업로드 시작
    onRetry, // 업로드 재시도
    onPause: (id: string) => {
      // 업로드 중단
      const target = files.find((f) => f.id === id);
      if (!target || !target.uploadId) return;
      target?.controller?.abort();
    },
    onResume: (id: string) => addTask(id, 'resume'), // 업로드 재개
  };
};

export const useS3Uploader = useS3UploaderHook;
