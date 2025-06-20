import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';

interface DuplicateCheckInputFormFieldProps extends BaseFormFieldProps {
  idKey: string;
  query: any;
  duplicationCheckFn: () => Promise<boolean>;
  onSuccess?: (isValid: boolean, checkValue: string) => void;
}

export const DuplicateCheckInputFormField = forwardRef<
  HTMLDivElement,
  DuplicateCheckInputFormFieldProps
>(
  (
    {
      idKey,
      name,
      value,
      onChange,
      getValues,
      clearFormError,
      disabled,
      onSuccess,
      label,
      duplicationCheckFn,
      placeholder,
      inputType,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { onChangeGuideText } = useDynamicFormContext();
    const [lastDuplicateText, setLastDuplicateText] = useState(value);

    useEffect(() => {
      if (value !== lastDuplicateText) {
        onChangeGuideText('');
      }
    }, [value, lastDuplicateText, onChangeGuideText]);

    useEffect(() => {
      return () => {
        onChangeGuideText('');
      };
    }, [onChangeGuideText, idKey]);

    /**
     * 중복 확인 버튼 클릭 시 호출되는 비동기 함수입니다.
     * 입력된 값을 가져와 `duplicationCheckFn` prop으로 전달된 함수를 실행하고,
     * 결과를 바탕으로 안내 메시지를 업데이트하고 `onSuccess` 콜백 함수를 호출합니다.
     * @async
     * @function handleCheckClick
     * @returns {void}
     */
    const handleCheckClick = async () => {
      const checkValue = getValues()?.[name];

      clearFormError(name);

      // const isValid = await checkDuplicate(idValue, checkValue);
      const isValid = await duplicationCheckFn();

      changeGuideText(isValid);
      onSuccess?.(isValid, checkValue);
      setLastDuplicateText(checkValue);
    };

    /**
     * 중복 확인 결과에 따라 안내 메시지를 업데이트하는 함수입니다.
     * @function changeGuideText
     * @param {boolean} isValid - 중복 여부 (true: 중복 없음, false: 중복 있음)
     * @returns {void}
     */
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
        <Input
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          type={inputType}
          {...props}
        />
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
