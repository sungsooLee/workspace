import { createFileRoute } from '@tanstack/react-router';
import { CODE_GROUP, useCodeStore, useS3Uploader } from '@learnway/hooks';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, ContentsRow, useModal } from '@learnway/ui';
import { LearningTypeChoiceModal } from '@features/learning';
import { ExcelUploadModal } from '@features/shared';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { httpService } from '@learnway/shared';
import { fileDownload } from '@/libs/shared/src/lib/utils/file-util';

export const Route = createFileRoute('/_layout/menu/type6')({
  component: RouteComponent,
});

function RouteComponent() {
  const { getCode } = useCodeStore();
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addFiles, files, stats } = useS3Uploader({ s3Path: 'upload/leaning/resource/video' });
  const {
    addFiles: thumbnailAddFiles,
    files: thumbnailFiles,
    stats: thumbnailStats,
  } = useS3Uploader({
    s3Path: 'public/thumbnail',
  });
  const { open: openModal } = useModal();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('change', e.target.files);
    if (e.target.files?.length) {
      console.log('Array.from(e.target.files) =>', Array.from(e.target.files));
      addFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      console.log('Array.from(e.target.files) =>', Array.from(e.target.files));
      thumbnailAddFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  useEffect(() => {
    console.log('stats => ', thumbnailStats);
    if (thumbnailStats.status === 'completed') {
      console.log('thumbnailFiles =>', thumbnailFiles);
      const file = thumbnailFiles[0];
      if (file) {
        setImageUrl(
          'http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/' +
            file.key,
        );
      }
    }
  }, [thumbnailStats]);

  const handleExcelUploadModal = async () => {
    await openModal({
      content: <ExcelUploadModal />,
      width: 'lg',
    });
  };

  const handleExcelDownLoad = async () => {
    await fileDownload(
      'http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/pms-module/admin/api/v1/multilingual/exportExcel',
      { keyTypeCode: 'LABEL', locale: 'en' },
    );
  };

  const codeStore = async () => {
    console.log(
      'cms.content.ContentsTypeCode => ',
      await getCode(CODE_GROUP['cms.content.ContentsTypeCode']),
    );
  };

  useEffect(() => {
    codeStore();
  }, []);
  return (
    <PageContainer>
      <MainContents>
        <ContentsRow>
          <Button onClick={handleExcelDownLoad}>엑셀 다운로드</Button>
        </ContentsRow>
        <ContentsRow>
          <Button onClick={handleExcelUploadModal}>엑셀 업로드</Button>
        </ContentsRow>
        <ContentsRow>
          <Button onClick={codeStore}>코드 조회</Button>
        </ContentsRow>
        <ContentsRow>
          <input
            ref={thumbnailRef}
            type={'file'}
            accept={'image/*'}
            style={{ display: 'none' }}
            onChange={handleThumbnailChange}
          />
          <Button onClick={() => thumbnailRef?.current?.click()}>썸네일 업로드</Button>
          <p>이미지를 업로드 해주세요.</p>
          {imageUrl && <img src={imageUrl} alt={''} />}
        </ContentsRow>
      </MainContents>
    </PageContainer>
  );
}
