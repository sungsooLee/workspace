import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';
import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';

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
  dupConfig?: {
    langCode: {
      ok: string; // 언어 코드
      duplicated: string;
      reCheck: string;
      needInput: string;
    };
  };
}

export const DuplicateCheckInputFormField = forwardRef<
  HTMLDivElement,
  DuplicateCheckInputFormFieldPros<DuplicateField>
>(
  (
    {
      control,
      label,
      value,
      name,
      onChange,
      onDuplicationCheck,
      maxLength,
      dupConfig = {
        langCode: {
          ok: 'LABEL.form.validation.ok',
          duplicated: 'LABEL.form.validation.duplicated',
          reCheck: 'LABEL.form.validation.reCheck',
          needInput: 'LABEL.form.validation.needInput',
        },
      },
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { guideText, onChangeGuideText } = useDynamicFormContext();
    const [editionValue, setEditionValue] = useState<DuplicateField>(value);

    //console.log('control', control);
    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        editionValue.checkState === DuplicateState.ok ||
        editionValue.checkState === DuplicateState.okStart
      ) {
        if (control.getFieldState(name).error?.message) {
          control.setError(name, {});
        }
        onChangeGuideText(
          <span style={{ color: 'red' }}>{t(dupConfig.langCode.reCheck, { code: label })}</span>,
        );
        setEditionValue({ checkState: DuplicateState.check, fieldValue: e.target.value });
      } else {
        setEditionValue({ ...editionValue, fieldValue: e.target.value });
      }
    };

    const handleButtonClick = () => {
      if (!editionValue.fieldValue) {
        control.setError(name, { message: t(dupConfig.langCode.needInput, { code: label }) });
        return;
      }
      if (onDuplicationCheck) {
        const prom = onDuplicationCheck(editionValue.fieldValue);
        prom
          .then((state) => {
            switch (state) {
              case DuplicateState.ok:
                if (control.getFieldState(name).error?.message) {
                  control.setError(name, {});
                }
                onChangeGuideText(
                  <span style={{ color: 'blue' }}>
                    {t(dupConfig.langCode.ok, { code: label })}
                  </span>,
                );
                break;
              case DuplicateState.duplicated:
                control.setError(name, {
                  message: t(dupConfig.langCode.duplicated, { code: label }),
                });
                break;
              default:
                break;
            }
            setEditionValue({ ...editionValue, checkState: state });
          })
          .catch((error) => {
            control.setError(name, { message: t(dupConfig.langCode.reCheck, { code: label }) });
            setEditionValue({ ...editionValue, checkState: DuplicateState.check });
          });
      }
    };

    useEffect(() => {
      if (isEqual(value, editionValue)) {
        return;
      }
      onChange?.(editionValue);
    }, [editionValue]);

    useEffect(() => {
      if (!value || isEqual(value, editionValue)) {
        if (guideText && !control.getFieldState(name).isDirty) {
          onChangeGuideText('');
        }
        return;
      }

      setEditionValue(!value.checkState ? value : { ...value, checkState: DuplicateState.check });
    }, [value]);

    return (
      <div className="flex w-full gap-x-2">
        <Input value={editionValue.fieldValue} onChange={handleChangeField} maxLength={maxLength} />
        <Button
          type="button"
          variant="gray"
          size="sm"
          label={t('LABEL.button.duplication')}
          onClick={handleButtonClick}
          disabled={
            editionValue.checkState === DuplicateState.ok ||
            editionValue.checkState === DuplicateState.okStart
          }
        />
      </div>
    );
  },
);
