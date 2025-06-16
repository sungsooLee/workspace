import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Button, ModalContainer, ModalBody, ModalTitle, GridBox } from '@learnway/ui';
import { useQueryClient } from '@tanstack/react-query';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { UIEvent } from 'react';
import { t } from 'i18next';

function ProgramGuideModalComponent() {
  const queryClient = useQueryClient();

  const handleFileDownload = (e: UIEvent, key: string, fileName: string) => {
    e.stopPropagation();
    queryClient.fetchQuery(learningResourceQueryOptions.getS3FileDownload(key, fileName));
  };

  const data = [
    {
      fileName: t('TOAST 프로그램 설치파일'),
      download: (
        <Button
          className="link"
          label={t('다운로드')}
          onClick={(e) => handleFileDownload(e, 'public/logo.png', 'download.png')} // 가이드 파일 하드코딩? 코드화?
        />
      ),
    },
    {
      fileName: t('TOAST 이북 제작 가이드'),
      download: (
        <Button
          className="link"
          label={t('다운로드')}
          onClick={(e) => handleFileDownload(e, 'public/logo.png', 'download.png')} // 가이드 파일 하드코딩? 코드화?
        />
      ),
    },
    {
      fileName: t('스콤 제작 가이드'),
      download: (
        <Button
          className="link"
          label={t('다운로드')}
          onClick={(e) => handleFileDownload(e, 'public/logo.png', 'download.png')} // 가이드 파일 하드코딩? 코드화?
        />
      ),
    },
    {
      fileName: t('이러닝 개발 표준 가이드'),
      download: (
        <Button
          className="link"
          label={t('다운로드')}
          onClick={(e) => handleFileDownload(e, 'public/logo.png', 'download.png')} // 가이드 파일 하드코딩? 코드화?
        />
      ),
    },
    {
      fileName: t('이러닝 개발 필수 스크립트'),
      download: (
        <Button
          className="link"
          label={t('다운로드')}
          onClick={(e) => handleFileDownload(e, 'public/logo.png', 'download.png')} // 가이드 파일 하드코딩? 코드화?
        />
      ),
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('fileName', {
      cell: (info) => info.getValue(),
      header: '파일명',
      size: 510,
      enableGrouping: false,
    }),
    columnHelper.accessor('download', {
      cell: (info) => info.getValue(),
      header: '다운로드',
      size: 220,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <ModalContainer>
      <ModalTitle>{t('프로그램/가이드 다운로드')}</ModalTitle>
      <ModalBody>
        <div className="grid_wrap">
          <GridBox
            title={t('공유현황')}
            disabledSelectionToggle
            columns={columns}
            data={data}
            showColumnSettings={false}
          />
        </div>
      </ModalBody>
    </ModalContainer>
  );
}

export const ProgramGuideModal = ProgramGuideModalComponent;
