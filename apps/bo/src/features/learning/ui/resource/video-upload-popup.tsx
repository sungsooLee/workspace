import { FileRejection, useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import { useUpload } from './uploader/tus-provider';
import { useRouter } from '@tanstack/react-router';
import { useModal } from '@learnway/ui';

const VideoUploadPopupComponent = () => {
  const { close } = useModal();
  const router = useRouter();
  const { startUpload, uploads } = useUpload();

  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles.length === 1) {
      setError('');
    } else if (acceptedFiles.length > 1) {
      setError('한 번에 하나의 파일만 업로드할 수 있습니다.');
    } else if (fileRejections.length > 0) {
      // 예를 들어, 파일 포맷이 맞지 않거나 기타 조건에 맞지 않는 경우
      setError('유효하지 않은 파일입니다.');
    }
    startUpload(acceptedFiles[0], 'http://localhost:8080/tus/upload');
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['video/mp4', 'video/webm', 'video/ogg'],
    },
    multiple: false,
    maxFiles: 1,
  });

  // 드래그 상태에 따른 스타일 변경
  const dropzoneStyle: React.CSSProperties = {
    border: '2px dashed #ccc',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    cursor: isDragReject ? 'not-allowed' : 'pointer',
    backgroundColor: isDragActive ? '#f0f8ff' : 'transparent',
  };

  useEffect(() => {
    if (uploads && uploads[0]) {
      if (uploads[0].status === 'completed') {
        close();
        router.navigate({
          to: '/learning/resource/view/video',
          state: { ...router.state, videoKey: uploads[0].videoKey } as any,
        });
      }
    }
  }, [uploads]);

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <div>
        {uploads.map(({ id, file, progress, status, error }) => (
          <div key={id} style={{ marginBottom: '1rem' }}>
            <p>
              <strong>{file.name}</strong> - {status} ({progress.toFixed(2)}%)
            </p>
            {status === 'error' && <p style={{ color: 'red' }}>Error: {error}</p>}
          </div>
        ))}
      </div>

      <input {...getInputProps()} />
      {isDragActive ? (
        <p>여기에 동영상 파일을 드롭하세요...</p>
      ) : (
        <p>동영상 파일을 드래그 앤 드롭하거나 클릭하여 선택하세요.</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export const VideoUploadPopup = VideoUploadPopupComponent;
