import React, { forwardRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { ActionMeta, GroupBase, MultiValue, SingleValue } from 'react-select';
import { AutoCompleteProps, DropdownOption } from './type';

const sampleOptions: DropdownOption[] = [
  { value: '서울', label: '서울특별시' },
  { value: '부산', label: '부산광역시' },
  { value: '대구', label: '대구광역시' },
  { value: '인천', label: '인천광역시' },
  { value: '광주', label: '광주광역시' },
  { value: '대전', label: '대전광역시' },
  { value: '울산', label: '울산광역시' },
  { value: '세종', label: '세종특별자치시' },
  { value: '경기', label: '경기도' },
  { value: '강원', label: '강원도' },
];

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
    const dropdownClass = `nlp--dropdown nlp--dropdown-${size} nlp--dropdown-${variant} ${className} w-full`;
    const customProps = {
      'data-variant': variant,
      ...props,
    };

    // DropdownList와 동일한 컴포넌트 구조 사용, Select 대신 AsyncSelect 사용
    return (
      <div className={dropdownClass.trim()}>
        <AsyncSelect
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
          // components={DropdownList.components}
          closeMenuOnSelect={!isMulti}
          hideSelectedOptions={false}
          defaultOptions={defaultOptions}
          cacheOptions={cacheOptions}
          noOptionsMessage={() => '결과가 없습니다'}
          loadingMessage={() => '검색 중...'}
          {...customProps}
        />
      </div>
    );
  },
);

// FormAutoComplete 컴포넌트 - FormDropdown과 동일한 로직 사용
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
    // FormDropdown과 동일한 로직 사용
    // react-hook-form의 value와 react-select의 value 형식을 맞추기 위한 처리
    const handleChange = (
      newValue: SingleValue<DropdownOption> | MultiValue<DropdownOption>,
      actionMeta: ActionMeta<DropdownOption>,
    ) => {
      const singleValue = newValue as SingleValue<DropdownOption>;
      onChange(singleValue ? singleValue.value : null);
    };

    // FormDropdown의 getFormattedValue 함수와 유사하게 처리
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
