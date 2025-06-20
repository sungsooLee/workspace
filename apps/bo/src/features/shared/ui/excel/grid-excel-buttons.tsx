import { Button, useModal } from '@learnway/ui';
import { ExcelUploadModal } from '@features/shared';
import { IcoUploadCloud } from '@learnway/icons';
import { t } from 'i18next';
import { SelectOption } from '@learnway/hooks';
import { GridExcelDownloadButton } from './grid-excel-download-button';

interface ExcelButtonsProps {
  // 업로드 관련
  showUpload?: boolean;
  uploadUrl?: string;
  validateUrl?: string;
  onUpload?: () => Promise<void>;

  // 다운로드 관련
  showDownload?: boolean;
  downloadMethod?: string;
  downloadUrl?: string;
  downloadParams?: Record<string, any>;
  downloadParamLabels?: Record<string, SelectOption>;
  dataCount?: number;
  onBeforeDownload?: () => Promise<void>;

  // 공통
  disabled?: boolean;
  className?: string;
}

const GridExcelButtonsComponent: React.FC<ExcelButtonsProps> = ({
  showUpload = false,
  uploadUrl,
  validateUrl,
  onUpload,
  showDownload = false,
  downloadMethod = 'get',
  downloadUrl,
  downloadParams = {},
  downloadParamLabels = {},
  dataCount = 0,
  onBeforeDownload,
  disabled = false,
  className,
}) => {
  const { open: openModal } = useModal();

  // 업로드
  const handleUpload = async () => {
    if (onUpload) await onUpload();
    if (uploadUrl && validateUrl) {
      console.log('?');
      await openModal({
        content: <ExcelUploadModal validateUrl={validateUrl} uploadUrl={uploadUrl} />,
        width: 'lg',
      });
    }
  };

  return (
    <>
      {/* 업로드 버튼 */}
      {showUpload && (
        <Button
          variant="text"
          size="xs"
          className={className}
          label={t('LABEL.grid.header.excelUpload', '엑셀업로드')}
          icon={<IcoUploadCloud width={16} height={16} stroke={'#4C515E'} />}
          onClick={handleUpload}
          disabled={disabled}
        />
      )}

      {/* 다운로드 버튼 */}
      {showDownload && downloadUrl && (
        <GridExcelDownloadButton
          method={downloadMethod}
          url={downloadUrl}
          params={downloadParams}
          paramLabels={downloadParamLabels}
          dataCount={dataCount}
          onBeforeDownload={onBeforeDownload}
          disabled={disabled}
          className={className}
        />
      )}
    </>
  );
};

export const GridExcelButtons = GridExcelButtonsComponent;
