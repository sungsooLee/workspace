import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';
import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';

export enum DuplicateState {
  success = 'success',
  duplicated = 'duplicated',
  notcheck = 'notcheck',
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
}

export const DuplicateCheckInputFormField = forwardRef<
  HTMLDivElement,
  DuplicateCheckInputFormFieldPros<DuplicateField>
>(
  (
    { label, value, name, onChange, onDuplicationCheck, setFormError, maxLength, ...props },
    ref,
  ) => {
    const { t } = useTranslation();
    const { onChangeGuideText } = useDynamicFormContext();
    const [editionValue, setEditionValue] = useState<DuplicateField>(value);

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditionValue({ ...editionValue, fieldValue: e.target.value });
    };

    const handleButtonClick = () => {
      if (onDuplicationCheck) {
        const prom = onDuplicationCheck(editionValue.fieldValue);
        prom
          .then((state) => {
            switch (state) {
              case DuplicateState.success:
                onChangeGuideText(
                  <span style={{ color: 'red' }}>
                    {t('LABEL.form.validation.duplicated', { code: label })}
                  </span>,
                ); //이미 사용 중인 메뉴 코드입니다.
                break;
              case DuplicateState.duplicated:
                onChangeGuideText(
                  <span style={{ color: 'red' }}>
                    {t('LABEL.form.validation.duplicated', { code: label })}
                  </span>,
                ); //이미 사용 중인 메뉴 코드입니다.
                break;
              default:
                break;
            }
            setEditionValue({ ...editionValue, checkState: state });
          })
          .catch((error) => {
            onChangeGuideText(
              <span style={{ color: 'red' }}>
                {t('LABEL.form.validation.reCheck', { code: label })}
              </span>,
            );
            setEditionValue({ ...editionValue, checkState: DuplicateState.notcheck });
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
        return;
      }
      setEditionValue(value);
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
          disabled={editionValue.checkState === DuplicateState.success}
        />
      </div>
    );
  },
);
