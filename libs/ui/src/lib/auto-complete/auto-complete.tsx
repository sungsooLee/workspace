import { forwardRef } from 'react';
import { ActionMeta, MultiValue, SingleValue, components } from 'react-select';
import { useCreation } from 'ahooks';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { map } from 'lodash';

import { IcoDelete03 } from '@learnway/icons';
import { cn } from '@learnway/shared';

import { DropdownOption } from '../type';
import { ReactSelectComponentProps } from '../dropdown/dropdown';

import { Button } from '../button/button';
import './auto-complete.module.css';

export interface PrimitiveComponentProps extends Omit<ReactSelectComponentProps, 'options'> {
  loadOptions: (inputValue: string) => Promise<DropdownOption[]>;
  defaultOptions?: boolean | DropdownOption[];
  cacheOptions?: boolean;
}

export interface AutoCompleteDropdownComponentProps
  extends Omit<PrimitiveComponentProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: any;
  defaultValue?: any;
  onChange?: (newValue?: any, actionMeta?: ActionMeta<any>) => void;
}

// clear 버튼
const clearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <Button onlyIcon className="btn_clear">
        <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
      </Button>
    </components.ClearIndicator>
  );
};

const PrimitiveComponent = forwardRef<any, PrimitiveComponentProps>(
  (
    {
      loadOptions,
      value,
      onChange,
      placeholder = '검색어를 입력하세요',
      isDisabled = false,
      isMulti = false,
      isSearchable = true,
      isClearable = true,
      label,
      hideLabel = false,
      size = 'sm',
      variant = 'default',
      hideArrow = true,
      className = '',
      name,
      onBlur,
      defaultOptions = true,
      cacheOptions = true,
      ...props
    },
    ref,
  ) => {
    const uuid = useCreation(
      () =>
        typeof window !== 'undefined'
          ? `dropdown-${Math.random().toString(36).substring(2, 9)}`
          : '',
      [],
    );

    const dropdownClass = cn(
      `nlp--dropdown nlp--dropdown-${size} nlp--dropdown-${variant} ${className} w-full`,
      hideArrow && 'hide_arrow',
    );
    const customProps = {
      'data-variant': variant,
      ...props,
    };

    return (
      <div className={dropdownClass.trim()}>
        <AsyncCreatableSelect
          id={uuid}
          ref={ref}
          loadOptions={loadOptions}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isClearable={isClearable}
          name={name}
          onBlur={onBlur}
          className="w-full"
          classNamePrefix="nlp-select"
          closeMenuOnSelect={!isMulti}
          hideSelectedOptions={false}
          defaultOptions={defaultOptions}
          cacheOptions={cacheOptions}
          formatCreateLabel={(inputValue) => `"${inputValue}"`}
          components={{
            ClearIndicator: clearIndicator,
          }}
          noOptionsMessage={() => '검색결과가 없습니다'}
          loadingMessage={() => '검색 중...'}
          {...customProps}
        />
      </div>
    );
  },
);

const AutoCompleteDropdownComponent = forwardRef<any, AutoCompleteDropdownComponentProps>(
  (
    {
      value,
      onChange,
      onBlur,
      loadOptions,
      isMulti = false,
      defaultOptions = true,
      cacheOptions = true,
      ...props
    },
    ref,
  ) => {
    // react-hook-form의 value와 react-select의 value 형식을 맞추기 위한 처리
    const handleChange = (
      newValue: SingleValue<DropdownOption> | MultiValue<DropdownOption>,
      actionMeta: ActionMeta<DropdownOption>,
    ) => {
      if (isMulti) {
        const multiValues = map(newValue as MultiValue<DropdownOption>, 'value'); // ? newValue.map((option) => option.value) : [];
        onChange && onChange(multiValues);
      } else {
        const singleValue = newValue as SingleValue<DropdownOption>;
        onChange && onChange(singleValue?.value ?? null);
      }
    };

    // 비동기로 옵션을 가져오므로 선택된 값이 옵션 목록에 없을 수 있음
    const selectedOptions = useCreation(() => {
      if (!value) {
        return null;
      }

      if (isMulti) {
        return (Array.isArray(value) ? value : [value]).map((val) => ({
          value: val,
          label: val.toString(),
        }));
      }

      return { value, label: value.toString() };
    }, [value]);

    return (
      <PrimitiveComponent
        ref={ref}
        value={selectedOptions}
        onChange={handleChange}
        onBlur={onBlur}
        loadOptions={loadOptions}
        isMulti={isMulti}
        isSearchable={true}
        defaultOptions={defaultOptions}
        cacheOptions={cacheOptions}
        {...props}
      />
    );
  },
);

export const AutoCompleteDropdown = AutoCompleteDropdownComponent;
