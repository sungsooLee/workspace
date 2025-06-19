import { Button, useModal } from '@learnway/ui';
import { usePersonalInfoCheck } from '@learnway/auth/entities';
import { ExcelUploadModal } from '@features/shared';
import { fileDownload } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { IcoDownload, IcoUploadCloud } from '@learnway/icons';
import { t } from 'i18next';
import { ExcelDownloadReasonModal } from '../modal/excel-download-reason-modal';
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
  const { open: openModal, confirm } = useModal();
  const { hasPersonalInfo, currentMenu } = usePersonalInfoCheck();

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

  // 다운로드  (개인정보 체크 포함)
  const handleDownload = async () => {
    if (!downloadUrl) return;

    const executeDownload = async () => {
      await fileDownload({
        url: downloadUrl,
        params: { ...downloadParams, menuId: currentMenu?.menuId },
        method: downloadMethod,
      });
    };

    try {
      if (hasPersonalInfo) {
        // const isConfirmed = await confirm({
        //   title: '개인정보 포함 데이터 다운로드',
        //   content: '개인정보가 포함된 데이터를 다운로드하시겠습니까?',
        // });

        // if (!isConfirmed) {
        //   return;
        // }
        const modalResult = await openModal({
          width: 'md',
          content: (
            <ExcelDownloadReasonModal dataCount={dataCount} paramLabels={downloadParamLabels} />
          ),
        });
        console.log('🚀 ~ handleDownload ~ modalResult:', modalResult);
        return;
      }

      if (onBeforeDownload) {
        await onBeforeDownload();
      }

      await executeDownload();
    } catch (error) {
      console.error('다운로드 중 오류 발생:', error);
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
        <Button
          variant="text"
          size="xs"
          className={className}
          label={t('LABEL.grid.header.excelDownload', '엑셀다운로드')}
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
          onClick={handleDownload}
          disabled={disabled}
        />
      )}
    </>
  );
};

export const GridExcelButtons = GridExcelButtonsComponent;
