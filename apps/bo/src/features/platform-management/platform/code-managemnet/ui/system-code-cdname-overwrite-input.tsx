import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';

interface CdNameOverwriteInputProps extends BaseFormFieldProps<string> {
  onOverwrite?: (cdNameOver: string) => void;
  isSubmitting?: boolean;
  selectedCdId?: string;
}

export const CdNameOverwriteInput = forwardRef<HTMLDivElement, CdNameOverwriteInputProps>(
  (
    {
      name,
      value,
      onChange,
      getValues,
      clearFormError,
      onFormChange,
      onOverwrite,
      isSubmitting = false,
      selectedCdId,
      disabled,
      setFormError,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { onChangeGuideText } = useDynamicFormContext();
    const [overwriteState, setOverwriteState] = useState<'none' | 'success' | 'error'>('none');

    useEffect(() => {
      switch (overwriteState) {
        case 'success':
          onChangeGuideText(
            <span style={{ color: 'blue' }}>
              {t('LABEL.cdName')} {t('LABEL.button.overwrite')} {t('LABEL.success')}
            </span>,
          ); // cdName이 성공적으로 덮어쓰기 되었습니다.
          break;
        case 'error':
          onChangeGuideText(
            <span style={{ color: 'red' }}>
              {t('LABEL.cdName')} {t('LABEL.button.overwrite')} {t('LABEL.error')}
            </span>,
          ); // cdName 덮어쓰기 중 오류가 발생했습니다.
          break;
        default:
          onChangeGuideText('');
      }
    }, [overwriteState, onChangeGuideText, t]);

    useEffect(() => {
      return () => {
        onChangeGuideText('');
      };
    }, [onChangeGuideText]);

    const handleOverwrite = async () => {
      const { translationTextContent } = getValues();
      await onOverwrite?.(translationTextContent);

      //   try {
      //     setOverwriteState('none');
      //     await onOverwrite?.(cdNameOver);
      //     setOverwriteState('success');
      //   } catch {
      //     setOverwriteState('error');
      //     setFormError?.(
      //       'cdName',
      //       `${t('LABEL.cdName')} ${t('LABEL.button.overwrite')} ${t('LABEL.error')}`,
      //     );
      //   }
    };

    return (
      <div className="flex w-full gap-x-2" ref={ref}>
        <Input
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
            setOverwriteState('none');
          }}
          disabled={disabled}
          placeholder={t('LABEL.cdName')}
        />
        <Button
          type="button"
          variant="primary"
          size="sm"
          disabled={disabled || isSubmitting || !selectedCdId}
          onClick={handleOverwrite}
        >
          {isSubmitting ? t('LABEL.processing') : '덮어쓰기'}
        </Button>
      </div>
    );
  },
);

CdNameOverwriteInput.displayName = 'CdNameOverwriteInput';
