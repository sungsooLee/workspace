import { Button, useModal } from '@learnway/ui';
import { usePersonalInfoCheck } from '@learnway/auth/entities';
import { fileDownload } from '@learnway/shared';
import { IcoDownload } from '@learnway/icons';
import { t } from 'i18next';
import { ExcelDownloadReasonModal } from '../modal/excel-download-reason-modal';
import { SelectOption } from '@learnway/hooks';

interface ExcelButtonsProps {
  method?: string;
  url?: string;
  params?: Record<string, any>;
  paramLabels?: Record<string, SelectOption>;
  dataCount?: number;
  onBeforeDownload?: () => Promise<void>;
  disabled?: boolean;
  className?: string;
}

const GridExcelDownloadButtonComponent: React.FC<ExcelButtonsProps> = ({
  method = 'get',
  url,
  params = {},
  paramLabels: downloadParamLabels = {},
  dataCount = 0,
  onBeforeDownload,
  disabled = false,
  className,
}) => {
  const { open: openModal } = useModal();
  const { hasPersonalInfo, currentMenu } = usePersonalInfoCheck();

  // 다운로드  (개인정보 체크 포함)
  const handleDownload = async () => {
    if (!url) return;

    const executeDownload = async (params: Record<string, any>) => {
      await fileDownload({
        url,
        params,
        method,
      });
    };

    try {
      let downloadReason: undefined | Record<string, any>;
      if (hasPersonalInfo) {
        downloadReason = await openModal({
          width: 'md',
          content: (
            <ExcelDownloadReasonModal dataCount={dataCount} paramLabels={downloadParamLabels} />
          ),
        });
        if (!downloadReason) return;
      }

      if (onBeforeDownload) {
        await onBeforeDownload();
      }

      await executeDownload({
        ...params,
        menuId: currentMenu?.menuId,
        ...(downloadReason && { downloadReason }),
      });
    } catch (error) {
      console.error('다운로드 중 오류 발생:', error);
    }
  };

  return (
    <Button
      variant="text"
      size="xs"
      className={className}
      label={t('LABEL.grid.header.excelDownload', '엑셀다운로드')}
      icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
      onClick={handleDownload}
      disabled={disabled}
    />
  );
};

export const GridExcelDownloadButton = GridExcelDownloadButtonComponent;
