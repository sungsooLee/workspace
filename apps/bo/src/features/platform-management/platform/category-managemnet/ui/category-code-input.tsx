import { forwardRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';

export const DuplicateCodeGuideText = forwardRef<HTMLDivElement, BaseFormFieldProps<string>>(
  (
    {
      name,
      value,
      onChange,
      getValues,
      clearFormError,
      onFormChange,
      checkExists,
      isSuccess,
      disabled,
      codeCheckState,
      handleCodeChange,
      setFormError,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { onChangeGuideText } = useDynamicFormContext();
    useEffect(() => {
      switch (codeCheckState) {
        case 'success':
          onChangeGuideText(
            <span style={{ color: 'blue' }}>
              {t('LABEL.form.validation.ok', { code: t('LABEL.common.code.category') })}
            </span>,
          ); //사용할 수 있는 메뉴 코드입니다.
          break;
        case 'duplicate':
          onChangeGuideText(
            <span style={{ color: 'red' }}>
              {t('LABEL.form.validation.duplicated', { code: t('LABEL.common.code.category') })}
            </span>,
          ); //이미 사용 중인 메뉴 코드입니다.
          break;
        case 'error':
          onChangeGuideText(
            <span style={{ color: 'red' }}>
              {t('LABEL.form.validation.reCheck', { code: t('LABEL.common.code.category') })}
            </span>,
          ); //중복 확인 중 오류가 발생했습니다
          break;
        // case 'none':
        // default:
        //   onChangeGuideText('코드 입력 후 중복 버튼을 눌러 중복 확인을 해주세요.');
      }
    }, [codeCheckState, onChangeGuideText]);

    useEffect(() => {
      return () => {
        onChangeGuideText('');
      };
    }, [onChangeGuideText]);

    return (
      <div className="flex w-full gap-x-2" ref={ref}>
        <Input
          value={value}
          onChange={(e: any) => {
            onChange(e.target.value);
            handleCodeChange(e.target.value);
          }}
          disabled={disabled}
        />
        <Button
          type="button"
          variant="gray"
          size="sm"
          disabled={disabled}
          onClick={() => {
            const { code } = getValues();
            // Validate code before checking
            if (!code) {
              clearFormError(name);
              setFormError?.(
                'code',
                t('LABEL.form.validation.needInput', { code: t('LABEL.form.input.categoryCode') }),
              ); //'카테고리 코드를 입력해주세요.'
              return;
            }
            // Clear any existing errors and perform the check
            clearFormError && clearFormError(name);
            checkExists?.(code);
          }}
        >
          {t('LABEL.button.duplication')}
        </Button>
      </div>
    );
  },
);
