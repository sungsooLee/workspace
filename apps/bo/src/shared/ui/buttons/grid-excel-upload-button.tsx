import { ExcelUploadModal } from '@shared/ui';
import { IcoUploadCloud } from '@learnway/icons';
import { t } from 'i18next';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

interface ExcelButtonsProps {
  validateUrl?: string;
  onUpload?: (data: Record<string, any>[]) => Promise<void>;
  disabled?: boolean;
  className?: string;
  affairsType?: 'PMS' | 'CMS' | 'LMS';
  formDataName?: string;
  validationResultRequired?: boolean;
}

const GridExcelUploadButtonComponent: React.FC<ExcelButtonsProps> = ({
  validateUrl,
  onUpload,
  disabled = false,
  className,
  affairsType = 'PMS',
  formDataName = 'file',
  validationResultRequired = true,
}) => {
  const { openModal } = useModal();

  // 업로드
  const handleUpload = async () => {
    if (validateUrl) {
      const result = await openModal({
        content: (
          <ExcelUploadModal
            validateUrl={validateUrl}
            affairsType={affairsType}
            formDataName={formDataName}
            validationResultRequired={validationResultRequired}
          />
        ),
        width: 'lg',
      });
      if (result) onUpload?.(result);
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
