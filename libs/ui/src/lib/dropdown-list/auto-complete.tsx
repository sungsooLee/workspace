import { forwardRef } from 'react';
import { ActionMeta, MultiValue, SingleValue, components } from 'react-select';
import { AutoCompleteProps, DropdownOption } from './type';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { IcoDelete03 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Button } from '../button/button';
import './auto-complete.css';

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

const AutoCompleteComponent = forwardRef<any, AutoCompleteProps>(
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
      className = '',
      name,
      onBlur,
      defaultOptions = true,
      cacheOptions = true,
      ...props
    },
    ref,
  ) => {
    const uuid =
      typeof window !== 'undefined' ? `dropdown-${Math.random().toString(36).substring(2, 9)}` : '';
    const dropdownClass = cn(
      `nlp--dropdown nlp--dropdown-${size} nlp--dropdown-${variant} ${className} w-full`,
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

const FormAutoCompleteComponent = forwardRef<any, any>(
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
      const singleValue = newValue as SingleValue<DropdownOption>;
      onChange(singleValue ? singleValue.value : null);
    };

    // 비동기로 옵션을 가져오므로 선택된 값이 옵션 목록에 없을 수 있음
    const getFormattedValue = () => {
      if (value === null || value === undefined) return null;
      if (isMulti && Array.isArray(value)) {
        // 다중 선택의 경우 값 배열을 DropdownOption 배열로 변환
        return value.map((val) => ({ value: val, label: val.toString() }));
      }
      // 단일 선택의 경우 value를 DropdownOption으로 변환
      return { value, label: value.toString() };
    };

    return (
      <AutoCompleteComponent
        ref={ref}
        value={getFormattedValue()}
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

export const AutoComplete = AutoCompleteComponent;
export const FormAutoComplete = FormAutoCompleteComponent;
