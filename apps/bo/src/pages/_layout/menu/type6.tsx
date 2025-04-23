import { createFileRoute } from '@tanstack/react-router';
import { useS3Uploader } from '@learnway/hooks';
import { ChangeEvent, useRef } from 'react';
import { Button, ContentsRow, useModal } from '@learnway/ui';
import { LearningTypeChoiceModal } from '@features/learning';
import { ExcelUploadModal } from '@features/shared';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';

export const Route = createFileRoute('/_layout/menu/type6')({
  component: RouteComponent,
});

function RouteComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addFiles } = useS3Uploader({ s3Path: 'upload/leaning/resource/video' });
  const { open: openModal } = useModal();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('change', e.target.files);
    if (e.target.files?.length) {
      console.log('Array.from(e.target.files) =>', Array.from(e.target.files));
      addFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleExcelUploadModal = async () => {
    await openModal({
      content: <ExcelUploadModal />,
      width: 'lg',
    });
  };
  return (
    <PageContainer>
      <MainContents>
        <ContentsRow>
          <Button variant={'primary'} onClick={handleExcelUploadModal}>
            엑셀 업로드
          </Button>
        </ContentsRow>
      </MainContents>
    </PageContainer>
  );
}
