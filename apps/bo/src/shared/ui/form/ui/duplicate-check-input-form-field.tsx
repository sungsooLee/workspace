import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { Input, InputValidationConfig } from '@learnway/ui/input';
import { forwardRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export enum DuplicateState {
  needInput = 'needInput', // 최초 등록 상태인 경우 사용
  okStart = 'okStart', // 수정인 경우 okStart로 되어 있어야 함.
  ok = 'ok',
  duplicated = 'duplicated',
  check = 'check', // 입력이 발생 되면 check 상태로 변경
}
export type DuplicateField = {
  checkState: DuplicateState;
  fieldValue: string;
};
interface DuplicateCheckInputFormFieldPros<T = any> extends BaseFormFieldProps {
  /**
   * string
   * @param value
   * @returns
   */
  onDuplicationCheck: (value: string) => Promise<DuplicateState>;
  onValidationError?: (message: string) => void;
  onValidationSuccess?: () => void;
  clearFormError?: (fieldName: string) => void;
  dupConfig?: {
    langCode: {
      ok: string; // 언어 코드
      duplicated: string;
      reCheck: string;
      needInput: string;
      check: string;
    };
  };
  validation?: InputValidationConfig;
}

export const DuplicateCheckInputFormField = forwardRef<
  HTMLDivElement,
  DuplicateCheckInputFormFieldPros<DuplicateField>
>(
  (
    {
      key,
      control,
      label,
      value,
      name,
      onChange,
      onDuplicationCheck,
      maxLength,
      disabled,
      dupConfig = {
        langCode: {
          ok: 'LABEL.form.validation.ok',
          duplicated: 'LABEL.form.validation.duplicated',
          reCheck: 'LABEL.form.validation.reCheck',
          needInput: 'LABEL.form.validation.needInput',
          check: 'LABEL.form.validation.check',
        },
      },
      validation,
      onValidationError,
      onValidationSuccess,
      clearFormError,
      error,
      type,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { guideText, onChangeGuideText } = useDynamicFormContext();

    // 안전한 기본값 설정
    const currentValue = value || { fieldValue: '', checkState: DuplicateState.needInput };

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFieldValue = e.target.value;
      if (currentValue.checkState === DuplicateState.duplicated) {
        onChangeGuideText(
          <span style={{ color: 'red' }}>{t(dupConfig.langCode.check, { code: label })}</span>,
        );
        // onChange?.({ checkState: DuplicateState.check, fieldValue: newFieldValue });
        onChange?.({ checkState: DuplicateState.check, fieldValue: newFieldValue });
      } else if (
        currentValue.checkState === DuplicateState.ok ||
        currentValue.checkState === DuplicateState.okStart
      ) {
        if (control?.getFieldState(name)?.error?.message) {
          control.setError(name, {});
        }
        // onChangeGuideText(
        //   <span style={{ color: 'red' }}>{t(dupConfig.langCode.check, { code: label })}</span>,
        // );
        // 상태를 check로 변경하고 새 값으로 업데이트
        onChange?.({ checkState: DuplicateState.check, fieldValue: newFieldValue });
      } else {
        // 일반적인 입력 상황에서는 fieldValue만 업데이트
        onChange?.({ ...currentValue, fieldValue: newFieldValue });
      }
    };

    const handleDuplicationCheckButtonClick = () => {
      if (!currentValue.fieldValue) {
        console.log('needInput 메시지 생성 - label:', label);
        control?.setError(name, {
          type: 'duplicate',
          message: t(dupConfig.langCode.needInput, { code: label }),
        });
        return;
      }
      if (onDuplicationCheck) {
        const prom = onDuplicationCheck(currentValue.fieldValue);
        prom
          .then((state) => {
            switch (state) {
              case DuplicateState.ok:
                if (control?.getFieldState(name)?.error?.message) {
                  control.setError(name, {});
                }
                onValidationSuccess?.();
                onChangeGuideText(
                  <span style={{ color: 'blue' }}>
                    {t(dupConfig.langCode.ok, { code: label })}
                  </span>,
                );
                break;
              case DuplicateState.duplicated:
                control?.setError(name, {
                  type: 'duplicate',
                  message: t(dupConfig.langCode.duplicated, { code: label }),
                });
                break;
              default:
                break;
            }
            onChange?.({ ...currentValue, checkState: state });
          })
          .catch((error) => {
            control?.setError(name, {
              type: 'duplicate',
              message: t(dupConfig.langCode.reCheck, { code: label }),
            });
            onChange?.({ ...currentValue, checkState: DuplicateState.check });
          });
      }
    };

    // guideText 정리 로직
    useEffect(() => {
      const fieldState = control?.getFieldState(name);
      if (!fieldState?.isDirty && guideText) {
        onChangeGuideText('');
      }
    }, [control, name, guideText, onChangeGuideText, value]);

    return (
      <div className="flex w-full gap-x-2">
        <Input
          {...props}
          value={currentValue.fieldValue}
          onChange={handleChangeField}
          maxLength={maxLength}
          disabled={disabled}
          type={type}
          validation={validation}
          label={label}
          error={error}
        />
        <Button
          type="button"
          variant="gray"
          size="sm"
          label={t('LABEL.button.duplication')}
          onClick={handleDuplicationCheckButtonClick}
          disabled={
            disabled ||
            currentValue.checkState === DuplicateState.ok ||
            currentValue.checkState === DuplicateState.okStart
          }
        />
      </div>
    );
  },
);
