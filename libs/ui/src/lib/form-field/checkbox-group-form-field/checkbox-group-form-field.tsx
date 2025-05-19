import { forwardRef, Fragment, useEffect, useState } from 'react';
import { Checkbox, CheckboxComponentProps } from '../../checkbox/checkbox';
import { cn } from '@learnway/shared';
import styles from './checkbox-group-form-field.module.css';
import { BaseFormFieldProps, OptionsConfig, SelectOption, useFormOptions } from '@learnway/hooks';
import { t } from 'i18next';

export interface CheckboxGroupFormFieldProps extends BaseFormFieldProps<string[]> {
  /** 한 줄에 표시할 체크박스 수 */
  cols?: number;
  /** 전체 사용 여부 */
  showSelectAll?: boolean;
  /** checkbox props */
  checkboxConfig?: CheckboxComponentProps;
  options?: SelectOption[];
  optionsConfig?: OptionsConfig;
}

const CheckboxGroupFormFieldComponent = forwardRef<HTMLDivElement, CheckboxGroupFormFieldProps>(
  (
    {
      value = [],
      onChange,
      options: initOptions,
      optionsConfig,
      cols,
      disabled,
      showSelectAll,
      checkGroupConfig,
      checkboxConfig,
    },
    ref,
  ) => {
    /** 전체 체크 상태를 관리하는 state */
    const [allCheck, setAllCheck] = useState(false);
    const options = useFormOptions(initOptions, optionsConfig);
    const disabledCheckBox = checkGroupConfig?.disabledCheckBox
      ? checkGroupConfig?.disabledCheckBox
      : [];

    /**
     * 개별 체크박스의 체크 상태가 변경될 때 호출되는 함수입니다.
     * 체크된 경우 `value` 배열에 값을 추가하고, 해제된 경우 값을 제거합니다.
     * @function handleCheckChange
     * @param {boolean} checked - 체크 여부
     * @param {string} checkedValue - 체크된/해제된 체크박스의 값
     * @returns {void}
     */
    const handleCheckChange = (checked: boolean, checkedValue: string) => {
      const checkOptions = [...value, checkedValue];
      const unCheckOptions = value?.filter((d: string) => d !== checkedValue);
      onChange(checked ? checkOptions : unCheckOptions);

      // let checkedValues = [...value];
      // if (checked && !checkedValues.includes(checkedValue)) {
      //   checkedValues.push(checkedValue);
      // }
      // if (!checked) {
      //   checkedValues = checkedValues.filter((item: string) => item !== checkedValue);
      // }
      // onChange(checkedValues);
    };

    /**
     * "전체" 체크박스의 체크 상태가 변경될 때 호출되는 함수입니다.
     * 체크된 경우 모든 옵션의 값을 `value` 배열에 추가하고, 해제된 경우 비활성화된 옵션의 값만 남깁니다.
     * @function handleAllCheckChange
     * @param {boolean} checked - "전체" 체크 여부
     * @returns {void}
     */
    const handleAllCheckChange = (checked: boolean) => {
      const checkOptions = options.map((d: any) => d.value);
      const unCheckOptions = options.filter((d: any) => d.disabled).map((d: any) => d.value);
      onChange(checked ? checkOptions : unCheckOptions);
      // if (checked) {
      //   onChange(options.map((option: any) => option.value));
      // } else {
      //   onChange(disabledCheckBox);
      // }
    };

    /**
     * `value` 배열이 변경될 때마다 "전체" 체크박스의 상태를 업데이트하는 useEffect 훅입니다.
     * 모든 옵션이 선택되었을 때 "전체" 체크박스를 체크합니다.
     */
    useEffect(() => {
      setAllCheck(value.length === options.length);
    }, [value]);
    useEffect(() => {
      setAllCheck(value.length === options.length);
    }, [options]);

    return (
      <div
        ref={ref}
        className={cn(styles.start, styles.checkbox_list, !cols && styles.type_flex)}
        style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
      >
        {showSelectAll && (
          <Checkbox
            {...checkboxConfig}
            checked={allCheck}
            label={'전체'}
            onCheckedChange={handleAllCheckChange}
            disabled={disabled}
          />
        )}
        {options?.map((item: any) => (
          <Fragment key={item.value}>
            <Checkbox
              {...checkboxConfig}
              onCheckedChange={(checked: boolean) => handleCheckChange(checked, item.value)}
              checked={value.indexOf(item.value) >= 0}
              label={t(item.label)}
              hideLabel={!item.label}
              disabled={disabled || item.disabled}
            />
          </Fragment>
        ))}
      </div>
    );
  },
);
export const CheckboxGroupFormField = CheckboxGroupFormFieldComponent;
