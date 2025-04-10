import React, { forwardRef, InputHTMLAttributes, useRef, useState } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { useFieldArray } from 'react-hook-form';
import { Button, ContentsRow, Dropdown, DropdownOption, Input } from '@learnway/ui';
import { LOCALES } from '@learnway/config';
import { t } from 'i18next';
import { IcoCloseCircle } from '@learnway/icons';
import style from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { ActionMeta, MultiValue, SingleValue } from 'react-select';

type Field = {
  locale: string;
  subtitles: string;
};
const initBase: Field = {
  locale: 'ko',
  subtitles: '',
};
const SubTitlesFormFieldComponent = forwardRef<HTMLDivElement, BaseFormFieldProps<Field[]>>(
  ({ control, name, value, onChange, options, optionsConfig }, ref) => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [base, setBase] = useState<Field>(initBase);

    const { fields, append, update } = useFieldArray({ control, name });
    const localeOptions = Object.entries(LOCALES).map(([_, value]) => ({
      value: value,
      label: t(value),
    }));

    const handleBaseLocalChange = (newValue: string) => {
      if (newValue) {
        setBase({ ...base, locale: newValue });
      }
    };

    const handleFileChangeClick = () => {
      if (!fileRef.current) return;
      fileRef.current.onchange = handleFileChange;
      fileRef.current.click();
    };

    const handleFileChange = () => {
      const file = fileRef.current?.files?.[0];
      if (file) {
        append({ locale: base.locale, subtitles: file.name });
        setBase(initBase);
        if (fileRef.current) {
          fileRef.current.value = '';
        }
      }
    };

    const handleFieldLocaleChange = (
      index: number,
      field: Record<string, any>,
      newValue: SingleValue<DropdownOption> | MultiValue<DropdownOption>,
    ) => {
      const singleValue = newValue as SingleValue<DropdownOption>;
      if (singleValue) {
        update(index, { ...field, locale: singleValue.value });
      }
    };

    const handleFieldSubtitleChange = () => {
      if (!fileRef.current) return;
      fileRef.current.onchange = handleFileChange;
    };

    return (
      <div className={dynamicFormStyles.multiple_row}>
        <div ref={ref}>
          {fields.map((field: Record<string, any>, index: number) => (
            <ContentsRow className={dynamicFormStyles.row_inner} key={field.id}>
              <Dropdown
                className={dynamicFormStyles.short}
                options={localeOptions}
                value={{ value: field.locale, label: field.locale }}
                onChange={(newValue) => handleFieldLocaleChange(index, field, newValue)}
              />
              <Input
                id="name-1-14"
                type="text"
                placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                value={field.subtitles}
              />
              <Button
                variant="gray"
                size="sm"
                className={dynamicFormStyles.btn_edit}
                /*onClick={() => handleFieldSubtitleChange(index, field)}*/
              >
                자막 변경
              </Button>
              <Button onlyIcon className={dynamicFormStyles.btn_delete}>
                <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
              </Button>
            </ContentsRow>
          ))}
          <ContentsRow className={dynamicFormStyles.row_inner}>
            <Dropdown
              className={dynamicFormStyles.short}
              options={localeOptions}
              value={{ value: base.locale, label: base.locale }}
              onChange={handleBaseLocalChange}
            />
            <Input
              id="name-1-14"
              type="text"
              placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
              value={base.subtitles}
            />
            <Button
              variant="gray"
              size="sm"
              className={dynamicFormStyles.btn_edit}
              onClick={handleFileChangeClick}
            >
              자막 추가
            </Button>
            <input type="file" className={'hidden'} ref={fileRef} />
          </ContentsRow>
        </div>
      </div>
    );
  },
);

export const SubTitlesFormField = SubTitlesFormFieldComponent;
