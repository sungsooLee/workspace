import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { FileItem, UppyUpload } from '@learnway/ui';

export default {
  title: 'Components/UppyUpload',
  component: UppyUpload,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    onCheckedChange: { action: 'onCheckedChange' },
  },
  includeStories: [''],
} as Meta;

// ImageUpload
export const Template: any = (args: any) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  // Handle upload start
  const handleUploadStart = (files: FileItem[]) => {
    console.log('Upload started for files:', files.map((f) => f.name).join(', '));
    setIsUploading(true);

    // 상위 컴포넌트에서 필요한 상태 업데이트나 API 호출
    // 예: 업로드 시작 시 백엔드에 알림
  };

  // Handle upload progress
  const handleUploadProgress = (fileId: string, progress: number) => {
    setUploadProgress((prev) => ({
      ...prev,
      [fileId]: progress,
    }));

    // 프로그레스를 특정 UI에 표시하거나 상위 컴포넌트에 전달
  };

  const handleUploadSuccess = (fileId: string, response: any) => {
    console.log(`File ${fileId} uploaded successfully:`, response);

    // 업로드 성공 시 필요한 작업 수행
    // 예: 업로드된 파일 URL을 다른 폼에 연결
    console.log(`파일 업로드 완료: ${response.location || '업로드 완료'}`);

    // 특정 파일의 성공 상태 업데이트
    setUploadedFiles((prev: any) => [
      ...prev,
      {
        id: fileId,
        url: response.location,
        // 기타 필요한 정보
      },
    ]);
  };

  const handleUploadError = (fileId: string, error: Error | string) => {
    console.error(`Error uploading file ${fileId}:`, error);

    // 에러 처리 및 사용자에게 알림
    const errorMessage = typeof error === 'string' ? error : error.message;
    console.error(`업로드 실패: ${errorMessage}`);
  };

  const handleAllComplete = (result: { successful: FileItem[]; failed: FileItem[] }) => {
    console.log('All uploads completed:', {
      successful: result.successful.length,
      failed: result.failed.length,
    });

    setIsUploading(false);

    // 모든 업로드 완료 후 다음 단계로 진행
    if (result.failed.length === 0 && result.successful.length > 0) {
      console.log(`모든 파일 업로드 완료: 총 ${result.successful.length}개 파일`);

      // 예: 폼 제출 활성화 또는 다음 단계로 이동
    } else if (result.failed.length > 0) {
      console.error(
        `일부 파일 업로드 실패: ${result.failed.length}개 실패, ${result.successful.length}개 성공`,
      );
    }
  };

  // Handle file added
  const handleFileAdded = (file: FileItem) => {
    console.log('File added:', file.name);

    // 파일 추가 시 필요한 작업 수행
  };

  // Handle file removed
  const handleFileRemoved = (fileId: string) => {
    console.log('File removed:', fileId);

    // 파일 제거 시 필요한 작업 수행
  };

  const handleUploadComplete = (successful: any, failed: any) => {
    console.log(successful, failed);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">파일 업로드</h1>

      {/* 기본 설정의 UppyUpload 컴포넌트 */}
      <div className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">mp4 업로드</h2>
        <UppyUpload
          allowedFileTypes={['mp4']}
          showProgressBar={true}
          onUploadComplete={handleUploadComplete}
          onUploadStart={handleUploadStart}
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          onAllComplete={handleAllComplete}
        />
      </div>

      {/* 사용자 정의 설정의 UppyUpload 컴포넌트 */}
      <div className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">사용자 정의 업로드</h2>
        <UppyUpload
          allowedFileTypes={['pdf', 'docx', 'xlsx']}
          maxFileSize={50 * 1024 * 1024} // 50MB
          folderPath="documents/"
          maxFiles={5}
          maxRetries={5}
          retryDelay={3000}
          wrapSize="lg"
          showProgressBar={true}
          onUploadStart={handleUploadStart}
          onUploadProgress={handleUploadProgress}
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          onFileAdded={handleFileAdded}
          onFileRemoved={handleFileRemoved}
          onAllComplete={handleAllComplete}
        />
      </div>

      {/* 이미지 전용 업로드 */}
      <div className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">이미지 업로드</h2>
        <UppyUpload
          allowedFileTypes={['jpg', 'jpeg', 'png', 'gif', 'webp']}
          maxFileSize={10 * 1024 * 1024} // 10MB
          folderPath="upload/community/board/2025/03/24/"
          onUploadSuccess={(fileId, response) => {
            console.log(`Image uploaded: ${response.location}`);
            // 이미지 업로드 후 미리보기 표시 등의 작업
          }}
        />
      </div>

      <div className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">싱글 업로드</h2>
        <UppyUpload uploadType="Single" allowedFileTypes={['mp4', 'ts', 'jpeg', 'png']} />
      </div>

      {/* 업로드된 파일 목록 표시 */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-2 text-lg font-medium">업로드된 파일</h3>
          <ul className="divide-y rounded-lg border">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-4">
                <span>{file.name || `파일 ${index + 1}`}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 업로드 중 상태 표시 */}
      {isUploading && (
        <div className="fixed bottom-4 right-4 max-w-md rounded-lg bg-white p-4 shadow-lg">
          <p className="font-medium">파일 업로드 중...</p>
          <p className="text-sm text-gray-500">업로드가 완료될 때까지 페이지를 닫지 마세요.</p>
        </div>
      )}
    </div>
  );
};
