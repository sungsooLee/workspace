import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWatch } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';

type DuplicateField = {
  checkState: string;
  fieldValue: string;
};

export const DuplicateCheckInputFormField = forwardRef<HTMLDivElement, BaseFormFieldProps>(
  (
    {
      name,
      value,
      control,
      onChange,
      onFormChange,
      fields = { checkState: 'checkState', fieldValue: 'fieldValue' },
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const [fieldValue, setFieldValue] = useState<string>('');
    const [checkState, setCheckState] = useState('');
    const checkStateField = useWatch({ control, name: 'managerName' });

    console.log('watch', fields.checkState, checkStateField);
    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(e.target.value);
    };

    const handleButtonClick = () => {
      setCheckState('click');
    };

    useEffect(() => {
      if (isEqual(value, fieldValue)) {
        return;
      }
      //onFormChange({ tenantName: { a: fieldValue } });
      onChange(fieldValue);
    }, [fieldValue]);
    useEffect(() => {
      onFormChange({ [fields.checkState]: checkState });
    }, [checkState]);

    useEffect(() => {
      if (typeof value === 'string') {
        if (!value || value === fieldValue) {
          return;
        }
        setFieldValue(value);
      } else {
        if (!value.kkk || value.kkk === fieldValue) {
          return;
        }
        setFieldValue(value.kkk);
      }
    }, [value]);

    return (
      <div className="flex w-full gap-x-2" ref={ref}>
        <Input value={fieldValue} onChange={handleChangeField} />
        <Button
          type="button"
          variant="gray"
          size="sm"
          label={t('LABEL.button.duplication')}
          onClick={handleButtonClick}
        />
      </div>
    );
  },
);
