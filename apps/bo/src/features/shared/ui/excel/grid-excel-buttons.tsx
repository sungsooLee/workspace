import { GridExcelUploadButton } from './grid-excel-upload-button';
import { GridExcelDownloadButton } from './grid-excel-download-button';
import { SelectOption } from '@learnway/hooks';

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
  return (
    <>
      {/* 업로드 버튼 */}
      {showUpload && (
        <GridExcelUploadButton
          url={uploadUrl}
          validateUrl={validateUrl}
          onUpload={onUpload}
          disabled={disabled}
          className={className}
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
