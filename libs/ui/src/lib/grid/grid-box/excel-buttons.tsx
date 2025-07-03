import React, { FC } from 'react';
import { Button, ExcelConfig, useModal } from '../../../index';
import { UseFormReturn } from 'react-hook-form';
import { fileDownload } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import styles from './grid-box.module.css';
import { t } from 'i18next';
import { IcoDownload, IcoUploadCloud } from '@learnway/icons';

export const ExcelButtons: FC<{ config?: ExcelConfig; getParams?: UseFormReturn['getValues'] }> = ({
  config,
  getParams,
}) => {
  const { open: openModal } = useModal();

  if (!config) return <></>;
  const { upload, download, form, onBeforeDownload, onBeforeUpload } = config;

  const handleExcelDownload = async () => {
    const params = getParams ? getParams() : {};

    const executeDownload = async () => {
      await fileDownload({ url: `${PMSApiPrefix()}` + download, params });
    };

    if (onBeforeDownload) await onBeforeDownload(executeDownload);
    else await executeDownload();
  };

  const handleExcelUpload = async () => {
    console.log('업로드는 시작하자');
    const executeUpload = async () => {
      // 업로드 로직
      console.log('Excel upload logic');
    };

    // onBeforeUpload 콜백이 있으면 사용, 없으면 바로 실행
    if (onBeforeUpload) {
      await onBeforeUpload(executeUpload);
    } else {
      await executeUpload();
    }
  };

  return (
    <>
      {/* 업로드 */}
      {upload && (
        <Button
          variant="text"
          size="xs"
          className={styles.btn_upload}
          label={t('LABEL.grid.header.excelUpload', '엑셀업로드')}
          onClick={handleExcelUpload}
          icon={<IcoUploadCloud width={16} height={16} stroke={'#4C515E'} />}
        />
      )}
      {/* 엑셀다운로드 */}
      {download && (
        <Button
          variant="text"
          size="xs"
          className={styles.btn_excel}
          label={t('LABEL.grid.header.excelDownload', '엑셀다운로드')}
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
          onClick={handleExcelDownload}
        />
      )}
    </>
  );
};
