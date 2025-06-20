import { Button, useModal } from '@learnway/ui';
import { ExcelUploadModal } from '@features/shared';
import { IcoUploadCloud } from '@learnway/icons';
import { t } from 'i18next';

interface ExcelButtonsProps {
  url?: string;
  validateUrl?: string;
  onUpload?: () => Promise<void>;
  disabled?: boolean;
  className?: string;
}

const GridExcelUploadButtonComponent: React.FC<ExcelButtonsProps> = ({
  url,
  validateUrl,
  onUpload,
  disabled = false,
  className,
}) => {
  const { open: openModal } = useModal();

  // 업로드
  const handleUpload = async () => {
    if (onUpload) await onUpload();
    if (url && validateUrl) {
      console.log('?');
      await openModal({
        content: <ExcelUploadModal validateUrl={validateUrl} uploadUrl={url} />,
        width: 'lg',
      });
    }
  };

  return (
    <Button
      variant="text"
      size="xs"
      className={className}
      label={t('LABEL.grid.header.excelUpload', '엑셀업로드')}
      icon={<IcoUploadCloud width={16} height={16} stroke={'#4C515E'} />}
      onClick={handleUpload}
      disabled={disabled}
    />
  );
};

export const GridExcelUploadButton = GridExcelUploadButtonComponent;
