import React, { FC } from 'react';
import { Button, ExcelConfig, useModal } from '@learnway/ui';
import { UseFormReturn } from 'react-hook-form';
import { fileDownload } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import styles from '../grid-box.module.css';
import { t } from 'i18next';
import { IcoDownload, IcoUploadCloud } from '@learnway/icons';

export const ExcelButtons: FC<{ config?: ExcelConfig; getParams?: UseFormReturn['getValues'] }> = ({
  config,
  getParams,
}) => {
  if (!config) return <></>;
  const { open: openModal } = useModal();
  const { upload, download, form } = config;

  const handleExcelDownload = async () => {
    const params = getParams ? getParams() : {};
    // await fileDownload(`${PMSApiPrefix()}/multilingual/exportExcel`, params);
  };

  const handleExcelUpload = async () => {
    //excelUpload || excelUpload();
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
          icon={
            <IcoUploadCloud width={16} height={16} stroke={'#4C515E'} onClick={handleExcelUpload} />
          }
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
