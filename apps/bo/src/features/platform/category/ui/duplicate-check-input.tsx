import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';

interface DuplicateCheckInputProps extends BaseFormFieldProps {
  idKey: string;
  query: any;
  duplicationCheckFn: () => Promise<boolean>;
  onSuccess?: (isValid: boolean, checkValue: string) => void;
}

export const DuplicateCheckInput = forwardRef<HTMLDivElement, DuplicateCheckInputProps>(
  (
    {
      name,
      value,
      onChange,
      getValues,
      clearFormError,
      disabled,
      onSuccess,
      label,
      duplicationCheckFn,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { onChangeGuideText } = useDynamicFormContext();

    const handleCheckClick = async () => {
      const checkValue = getValues()?.[name];

      clearFormError(name);

      // const isValid = await checkDuplicate(idValue, checkValue);
      const isValid = await duplicationCheckFn();

      changeGuideText(isValid);
      onSuccess?.(isValid, checkValue);
    };

    const changeGuideText = (isValid: boolean) => {
      if (isValid) {
        // 사용할 수 있는 **입니다.
        onChangeGuideText(
          <span style={{ color: 'blue' }}>{t('LABEL.form.validation.ok', { code: label })}</span>,
        );
      } else {
        // 이미 사용 중인 **입니다.
        onChangeGuideText(
          <span style={{ color: 'red' }}>
            {t('LABEL.form.validation.duplicated', {
              code: label,
            })}
          </span>,
        );
      }
    };

    return (
      <div className="flex w-full gap-x-2" ref={ref}>
        <Input value={value} onChange={onChange} disabled={disabled} />
        <Button
          type="button"
          variant="gray"
          size="sm"
          disabled={!value || disabled}
          label={t('LABEL.button.duplication')}
          onClick={handleCheckClick}
        />
      </div>
    );
  },
);
