import { FileRejection, useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
const VideoUploadPopupComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles.length === 1) {
      setFile(acceptedFiles[0]);
      setError('');
    } else if (acceptedFiles.length > 1) {
      setFile(null);
      setError('한 번에 하나의 파일만 업로드할 수 있습니다.');
    } else if (fileRejections.length > 0) {
      // 예를 들어, 파일 포맷이 맞지 않거나 기타 조건에 맞지 않는 경우
      setFile(null);
      setError('유효하지 않은 파일입니다.');
    }
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
  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>여기에 동영상 파일을 드롭하세요...</p>
      ) : (
        <p>동영상 파일을 드래그 앤 드롭하거나 클릭하여 선택하세요.</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {file && (
        <div style={{ marginTop: '10px' }}>
          <strong>선택된 파일:</strong> {file.name}
        </div>
      )}
    </div>
  );
};

export const VideoUploadPopup = VideoUploadPopupComponent;
