import React, { createContext, useContext, useState, useCallback } from 'react';
import { Upload } from 'tus-js-client';

// Tus 업로드 상태 타입
type UploadStatus = 'idle' | 'uploading' | 'completed' | 'error' | 'cancelled';

// 개별 업로드 상태를 나타내는 인터페이스
interface TusUpload {
  id: string; // 고유 업로드 ID
  file: File; // 업로드할 파일
  progress: number; // 업로드 진행률 (%)
  status: UploadStatus; // 현재 업로드 상태
  tusUpload?: Upload; // tus-js-client 업로드 객체 (필요한 경우)
  videoKey?: string;
  error?: string; // 에러 메시지 (옵션)
}

// Tus Context 인터페이스
interface UploadContextProps {
  uploads: TusUpload[]; // 전체 업로드 목록
  startUpload: (file: File, endpoint: string) => void; // 업로드 시작 함수
  cancelUpload: (id: string) => void; // 업로드 취소 함수
  resumeUpload: (id: string, endpoint: string) => void; // 중단된 업로드 재개 함수
}

// 업로드 상태를 위한 Context 생성
const UploadContext = createContext<UploadContextProps | null>(null);

// Provider Component: 자식 컴포넌트에 업로드 관련 상태와 함수를 제공
export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uploads, setUploads] = useState<TusUpload[]>([]);

  /**
   * 지정한 업로드 ID에 해당하는 업로드 상태를 업데이트하는 헬퍼 함수.
   * @param uploadId 업데이트할 업로드의 ID
   * @param updater 업로드 객체에 적용할 업데이트 함수
   */
  const updateUpload = (uploadId: string, updater: (upload: TusUpload) => TusUpload) => {
    setUploads((prevUploads) =>
      prevUploads.map((upload) => (upload.id === uploadId ? updater(upload) : upload)),
    );
  };

  /**
   * 파일 업로드를 시작하는 함수.
   * @param file 업로드할 파일 객체
   * @param endpoint TUS 서버 엔드포인트 URL
   */
  const startUpload = useCallback((file: File, endpoint: string) => {
    // 파일 이름과 현재 시간을 조합하여 고유 업로드 ID 생성
    const uploadId = `${file.name}-${Date.now()}`;
    // 초기 업로드 상태 생성
    const newUpload: TusUpload = {
      id: uploadId,
      file,
      progress: 0,
      status: 'uploading',
    };

    // tus-js-client 업로드 객체 생성
    // chunkSize는 5MB (5 * 1024 * 1024 바이트)로 설정
    const tusUpload = new Upload(file, {
      endpoint,
      chunkSize: 5 * 1024 * 1024,
      metadata: { filename: file.name },
      // 업로드 진행률 업데이트 콜백
      onProgress: (bytesUploaded, bytesTotal) => {
        const progress = (bytesUploaded / bytesTotal) * 100;
        updateUpload(uploadId, (upload) => ({ ...upload, progress }));
      },
      // 업로드 성공 시 상태 업데이트 콜백
      onSuccess: (payload) => {
        const videoKey = payload.lastResponse?.getHeader('X-Video-Key') as string;
        updateUpload(uploadId, (upload) => ({
          ...upload,
          status: 'completed',
          progress: 100,
          videoKey,
        }));
      },
      // 에러 발생 시 상태 업데이트 콜백
      onError: (error) => {
        updateUpload(uploadId, (upload) => ({
          ...upload,
          status: 'error',
          error: error.message,
        }));
      },
    });

    // 업로드 시작
    tusUpload.start();

    // 새로운 업로드를 상태 배열에 추가
    setUploads((prevUploads) => [...prevUploads, { ...newUpload, tusUpload }]);
  }, []);

  /**
   * 진행 중인 업로드를 취소하는 함수.
   * @param id 취소할 업로드의 ID
   */
  const cancelUpload = useCallback((id: string) => {
    setUploads((prevUploads) => {
      // 취소할 업로드 객체를 찾음
      const uploadToCancel = prevUploads.find((upload) => upload.id === id);
      // tus 업로드 객체가 있으면 업로드 중단
      if (uploadToCancel?.tusUpload) {
        uploadToCancel.tusUpload.abort();
      }
      // 해당 업로드의 상태를 "cancelled"로 변경
      return prevUploads.map((upload) =>
        upload.id === id ? { ...upload, status: 'cancelled' } : upload,
      );
    });
  }, []);

  /**
   * 중단된 업로드를 재개하는 함수.
   * @param id 재개할 업로드의 ID
   * @param endpoint TUS 서버 엔드포인트 URL
   */
  const resumeUpload = useCallback(
    (id: string, endpoint: string) => {
      // 재개할 업로드 객체 검색
      const uploadToResume = uploads.find((upload) => upload.id === id);
      if (uploadToResume?.tusUpload) {
        // 기존 업로드 URL을 이용해 새로운 tus 업로드 객체 생성
        const tusUpload = new Upload(uploadToResume.file, {
          endpoint,
          metadata: { filename: uploadToResume.file.name },
          uploadUrl: uploadToResume.tusUpload.url,
          onProgress: (bytesUploaded, bytesTotal) => {
            const progress = (bytesUploaded / bytesTotal) * 100;
            updateUpload(id, (upload) => ({ ...upload, progress }));
          },
          onSuccess: () => {
            updateUpload(id, (upload) => ({ ...upload, status: 'completed', progress: 100 }));
          },
          onError: (error) => {
            updateUpload(id, (upload) => ({ ...upload, status: 'error', error: error.message }));
          },
        });
        // 재개된 업로드 시작
        tusUpload.start();
        // 업로드 상태를 업데이트하여 새 tus 업로드 객체를 저장
        updateUpload(id, (upload) => ({ ...upload, tusUpload }));
      }
    },
    [uploads],
  );

  return (
    <UploadContext.Provider value={{ uploads, startUpload, cancelUpload, resumeUpload }}>
      {children}
    </UploadContext.Provider>
  );
};

// UploadContext를 사용하기 위한 커스텀 훅
export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};
