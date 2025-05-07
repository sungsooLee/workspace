import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';

interface DuplicateCheckInputProps extends BaseFormFieldProps {
  idKey: string;
  query: any;
  onInputChange: (newValue: any) => void;
  errorMessage: string;
  onSuccess?: (isValid: boolean) => void;
  onError?: () => void;
}

export const DuplicateCheckInput = forwardRef<HTMLDivElement, DuplicateCheckInputProps>(
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
      onInputChange,
      setFormError,
      query,
      errorMessage,
      onSuccess,
      onError,
      setValue,
      idKey,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const { onChangeGuideText } = useDynamicFormContext();

    const [lastValidValue, setLastValidValue] = useState<string | undefined>(value); // 마지막 유효했던 값 저장
    const [codeCheckState, setCodeCheckState] = useState<
      'none' | 'success' | 'duplicate' | 'error'
    >('none');

    useEffect(() => {
      switch (codeCheckState) {
        case 'success':
          onChangeGuideText(
            <span style={{ color: 'blue' }}>
              {t('LABEL.form.validation.ok', { code: t('LABEL.common.code.category') })}
            </span>,
          ); //사용할 수 있는 메뉴 코드입니다.
          clearFormError();
          break;
        // case 'duplicate':
        //   onChangeGuideText(
        //     <span style={{ color: 'red' }}>
        //       {t('LABEL.form.validation.duplicated', { code: t('LABEL.common.code.category') })}
        //     </span>,
        //   ); //이미 사용 중인 메뉴 코드입니다.
        //   setFormError(name, t('LABEL.form.validation.duplicated', { code: t('LABEL.common.code.category') }));
        //   break;
        case 'error':
          onChangeGuideText(
            <span style={{ color: 'red' }}>
              {t('LABEL.form.validation.reCheck', { code: t('LABEL.common.code.category') })}
            </span>,
          ); //중복 확인 중 오류가 발생했습니다
          break;
        default:
          onChangeGuideText('');
          return;
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

    const handleCheckClick = async () => {
      console.log('handleCheckDup------', setValue);
      const idValue = getValues()?.[idKey];
      const checkValue = getValues()?.[name];

      // Validate code before checking
      if (!checkValue) {
        // Clear any existing errors and perform the check
        clearFormError(name);
        setFormError?.(name, errorMessage); //'** 입력해주세요.'
        return;
      }

      const isValid = await checkDuplicate(idValue, checkValue);

      if (isValid) {
        clearFormError();
        setLastValidValue(checkValue);
        // setCodeCheckState('success');
        // clearFormError(name);
      } else {
        setFormError(
          name,
          t('LABEL.form.validation.duplicated', { code: t('LABEL.form.label.labelMessageCode') }),
        );
        // onChangeGuideText('');
      }

      onSuccess?.(isValid);
    };

    const checkDuplicate = async (idValue: any, checkValue: string) => {
      const params = {
        [name]: checkValue,
      };
      // const result = (await queryClient.fetchQuery(query(params))) as any;
      const result = checkValue?.length === 1 ? { content: [] } : { content: [1] };
      const content = result?.content;
      const isValid = content?.filter((d: any) => d[idKey] !== idValue)?.length === 0;
      console.log({ params, result, isValid });
      return isValid;
    };

    const handleChange = (e: any) => {
      console.log('handleChange');
    };

    const handleBlur = (e: any) => {
      // console.log('handlerBlur');
      // const newValue = e.target.value;
      // const isChanged = newValue !== lastValidValue;
      // if (isChanged) {
      //   setFormError(name, '중복 체크 필요');
      // }
      // clearFormError(name);
      // setCodeCheckState('none');
    };

    return (
      <div className="flex w-full gap-x-2" ref={ref}>
        <Input value={value} onChange={onChange} onBlur={handleBlur} disabled={disabled} />
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
