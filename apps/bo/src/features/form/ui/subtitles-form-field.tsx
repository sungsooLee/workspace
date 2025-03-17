import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-select';
import { BaseFormFieldProps } from '@learnway/hooks';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Button, DropdownList, Input } from '@learnway/ui';
import { LOCALES } from '@learnway/config';
import { t } from 'i18next';
import { IcoCloseCircle } from '@learnway/icons';
import style from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
type Field = {
  locale: string;
  subtitles: string;
};
const SubTitlesFormFieldComponent = forwardRef<HTMLDivElement, BaseFormFieldProps>(
  ({ control, name, value, onChange, options, optionsConfig }, ref) => {
    const { fields } = useFieldArray({ control, name });
    const localeOptions = Object.entries(LOCALES).map(([_, value]) => ({
      value: value,
      label: t(value),
    }));
    return (
      <div ref={ref}>
        {fields.map((field: Record<'id', string>, index) => (
          <div className={'flex gap-10'} key={field.id}>
            <DropdownList options={localeOptions} value={{ value: '', label: '' }} />
            <Input
              id="name-1-14"
              type="text"
              placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
              value="영어자막.smi"
            />
            <Button variant="gray" size="sm" className={style.btn_edit}>
              자막 변경
            </Button>
            <Button onlyIcon className={style.btn_delete}>
              <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
            </Button>
          </div>
        ))}
        <div className={'flex gap-10'}>
          <DropdownList options={localeOptions} value={{ value: '', label: '언어선택' }} />
          <Input
            id="name-1-14"
            type="text"
            placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
            value="영어자막.smi"
          />
          <Button variant="gray" size="sm" className={style.btn_edit}>
            자막 추가
          </Button>
          <Button onlyIcon className={style.btn_delete}>
            <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
          </Button>
        </div>
      </div>
    );
  },
);

export const SubTitlesFormField = SubTitlesFormFieldComponent;
