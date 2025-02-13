import { FC } from 'react';
import { dialogConfig } from './config';
import styles from './form.module.css';
import { cn } from '@learnway/shared';
import { IcoFormRequired } from '@learnway/icons';
import { Controller } from 'react-hook-form';
import { clsx } from 'clsx';
import { FormCheckbox, FormRadioGroup, Input, InputButton, InputLimit } from '@learnway/ui';
import { FormCheckboxGroup } from '@/libs/ui/src/lib/checkbox/form-checkbox-group';
import { FormSelect } from './dialogs/form-select';
import { FormCategorySelector } from './dialogs/form-category-selector';
import { FormContentsThumbnail } from './dialogs/form-contents-thumbnail';

const DynamicFormField: FC<any> = ({ provider, name, type, disabled = false, ...props }) => {
  const { control, builders, fieldRefs, watch } = provider;
  const names = name.split('.');

  const {
    type: configType,
    label,
    ...buildProps
  } = names.length === 1
    ? builders.find((builder: any) => builder.name === name)
    : builders
        .find((builder: any) => builder.name === names[0])
        ['fields'].find((builder: any) => builder.name === names[2]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref }, formState: { errors } }) => {
        const isRequired = control.isFieldRequired(name);
        const errorClass = clsx({
          error: errors && errors[name],
        });
        const FormComponant = dialogConfig[(type || configType) as keyof typeof dialogConfig];
        const formParams = {
          watch,
          ref,
          type: configType || type,
          name,
          onChange,
          onBlur,
          value,
          disabled,
          errorClass,
          fieldRefs,
          ...buildProps,
        };
        const handleOnChagne = (obj: any) => {
          console.log('dynamic on change = >', obj);
        };
        return (
          <div className={styles.form_item}>
            {label && (
              <label htmlFor={name} className={styles.form_label}>
                {label}
                {isRequired && (
                  <span
                    className={cn(styles.status, {
                      [styles.error]: errorClass === 'error', // 에러가 있는 경우 styles.error 추가
                      [styles.required]: errorClass !== 'error', // 에러가 없는 경우 styles.required 추가
                    })}>
                    <IcoFormRequired width={8} height={8} />
                  </span>
                )}
              </label>
            )}
            <div className={styles.input_box} ref={(ref) => (fieldRefs.current[name] = ref)}>
              {configType === 'text' && <Input {...formParams} />}
              {configType === 'radio-group' && <FormRadioGroup {...formParams} />}
              {configType === 'checkbox' && <FormCheckbox {...formParams} />}
              {configType === 'check-group' && <FormCheckboxGroup {...formParams} />}
              {configType === 'category-selector' && <FormCategorySelector {...formParams} />}
              {configType === 'contents-thumbnail' && <FormContentsThumbnail {...formParams} />}
              {configType === 'dropdown' && <FormSelect {...formParams} />}
              {configType === 'text-popup-button' && <InputButton {...formParams} />}
              {configType === 'text-limit' && (
                <InputLimit {...formParams} onChange={handleOnChagne} />
              )}
            </div>
            {errorClass !== 'error' && formParams?.description && (
              <p className={cn(styles.guide_text)}>{formParams.description}</p>
            )}
            {errorClass === 'error' && (
              <p className={cn(styles.guide_text, styles.error)}>
                {String(errors[name]?.message || '')}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default DynamicFormField;
