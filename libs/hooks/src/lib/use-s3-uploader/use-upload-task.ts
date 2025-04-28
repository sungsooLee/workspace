import { useRef } from 'react';
import { UploadCommand, UseUploadQueueConfig } from './types';

/**
 * 업로드 대기열을 관리하기 위한 커스텀 훅
 * @param files 작업에 사용될 파일 목록
 * @param executeTask 특정 작업을 실행하는 함수 (예 : 새 업로드 작업 )
 * @param resumeTask 중단된 작업을 다시 실행하는 함수
 * @returns 작업 추가 및 제거를 수행하는 메서드
 */
export const useUploadTask = ({ files, executeTask, resumeTask }: UseUploadQueueConfig) => {
  /**
   * 업로드 대기 큐 (업로드 명령들을 순서대로 저장, 중복 방지)
   */
  const uploadQueue = useRef<UploadCommand[]>([]);

  /**
   * 현재 업로드 중인지 여부를 체크 (한 번에 하나의 작업만 처리하기 위해 사용)
   */
  const isUploading = useRef(false);

  /**
   * 업로드 큐에 작업 추가 (중복 방지)
   * @param id 파일 ID
   * @param action start | resume (기본값: start)
   */
  const addTask = async (id: string, action: 'start' | 'resume' = 'start') => {
    // 중복된 작업은 큐에 넣지 않음
    if (uploadQueue.current.find((cmd) => cmd.id === id)) return;
    uploadQueue.current.push({ id, action });
    await processQueue();
  };

  /**
   * 대기열에 있는 작업을 처리 (순차적으로 실행)
   */
  const processQueue = async () => {
    if (isUploading.current || uploadQueue.current.length === 0) return;
    isUploading.current = true;

    const command = uploadQueue.current.shift();
    if (!command) {
      isUploading.current = false;
      return;
    }

    const { id, action } = command;
    const file = files.find((f) => f.id === id);
    if (!file) {
      isUploading.current = false;
      await processQueue();
      return;
    }

    // 작업 타입에 따라 업로드 실행
    if (action === 'resume') {
      await resumeTask(id);
    } else {
      await executeTask(id);
    }

    isUploading.current = false;
    await processQueue();
  };

  /**
   * 업로드 대기열에서 특정 작업을 삭제
   * @param id 삭제할 파일의 ID
   */
  const removeTask = async (id: string) => {
    uploadQueue.current = uploadQueue.current.filter((cmd) => cmd.id !== id);
    await processQueue(); // 큐를 처리하여 남은 작업을 실행
  };

  return {
    addTask,
    removeTask,
  };
};
