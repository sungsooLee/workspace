import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import Select, { ActionMeta, components, MultiValue, SingleValue } from 'react-select';
import { useCreation } from 'ahooks';
import { difference, filter, find, map } from 'lodash';

import { cn, getRandomId } from '@learnway/shared';
import { IcoArrowDown, IcoDelete03 } from '@learnway/icons';

import { Checkbox } from '../checkbox/checkbox';
import { DropdownOption } from '../type';

import styles from './dropdown.module.css';
import { Button } from '../button/button';
import { t } from 'i18next';
import { ALL_OPTION } from '@learnway/hooks';

export interface ReactSelectComponentProps {
  options: DropdownOption[];
  value?: DropdownOption | readonly DropdownOption[] | null;
  defaultValue?: SingleValue<DropdownOption> | MultiValue<DropdownOption>;
  onChange?: (
    newValue: SingleValue<DropdownOption> | MultiValue<DropdownOption>,
    actionMeta: ActionMeta<DropdownOption>,
  ) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isReadonly?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  presetOptionLabel?: string;
  label?: string;
  hideLabel?: boolean;
  hideArrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'chip' | 'text';
  backgroundType?: 'blue' | 'white';
  className?: string;
  name?: string;
  onBlur?: () => void;
  noOptionsMessage?: string;
}

// error, readonly, disabled
export interface DropdownComponentProps
  extends Omit<ReactSelectComponentProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: any;
  defaultValue?: any;
  onChange?: (newValue?: any, actionMeta?: ActionMeta<any>) => void;
  error?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

const CustomValueContainer = ({ children, ...props }: any) => {
  const { getValue, hasValue, selectProps } = props;

  const values = getValue();
  const isTextVariant = selectProps['data-variant'] === 'text';
  // isMulti가 아니거나 text 변형이 아닌 경우 기본 컴포넌트 사용
  if (!selectProps.isMulti || !isTextVariant) {
    return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
  }

  // 선택된 값이 없는 경우
  if (!hasValue || values.length === 0) {
    return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
  }

  const selectedAllOption = find(values, (_) => _.value === ALL_OPTION);

  const valueText = selectedAllOption
    ? selectedAllOption.label
    : `${values[0].label} ${values.length > 1 ? `외 ${values.length - 1}` : ''}`;

  return (
    <components.ValueContainer {...props}>
      <div className={styles.container}>
        {values.length > 0 && <span className={styles.result_text}>{valueText}</span>}
      </div>
      {/* 중요: 숨겨진 입력 필드 등을 유지하기 위한 원래 children 렌더링 */}
      {React.Children.map(children, (child) =>
        child && child.type !== components.MultiValue ? child : null,
      )}
    </components.ValueContainer>
  );
};

// 체크박스가 있는 옵션 컴포넌트
const Option = (props: any) => {
  const { data, isSelected, innerRef, innerProps, selectProps } = props;

  // 현재 입력된 검색어 가져오기
  const inputValue = selectProps.inputValue || '';

  return (
    <components.Option {...props}>
      <div className={styles.select_item}>
        {props.isMulti && <Checkbox size="md" checked={props.isSelected} />}
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
};

// 화살표
const dropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <IcoArrowDown width={16} height={16} stroke="#131C30" className={styles.icon_arrow} />
    </components.DropdownIndicator>
  );
};

// clear 버튼
const clearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <Button onlyIcon className={styles.btn_clear}>
        <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
      </Button>
    </components.ClearIndicator>
  );
};

/**
 * react-select 라이브러리의 기본 MenuPortal 컴포넌트를 대체하는 커스텀 컴포넌트입니다.
 * react-select의 'components' prop을 통해 이 커스텀 컴포넌트를 전달하여 사용합니다.
 *
 * MenuPortal은 드롭다운 메뉴 목록을 DOM의 다른 위치(기본적으로 document.body)에 렌더링하여
 * z-index 및 overflow 문제를 해결하는 역할을 합니다.
 * 이 커스텀 컴포넌트는 기본 기능에 더해, selectProps로 전달된 'data-variant' 값에 따라
 * 포털 주변에 추가적인 스타일링을 적용하는 것을 목표로 합니다.
 *
 * @param {CustomMenuPortalProps} props - react-select로부터 전달받는 props 객체입니다.
 * MenuPortalProps 타입을 확장하여 selectProps 내의 커스텀 타입 ('data-variant')을 포함할 수 있습니다.
 */
const MenuPortal = (props: any) => {
  const variant = props.selectProps?.['data-variant'] || 'default';
  const size = props.selectProps?.['size'] || 'default';
  const optionsCount = props.options.length;

  const className = cn(
    'menu-portal',
    variant && `menu-portal-variant-${variant}`, // 퍼블에서 필요 ex) menu-portal-chip, menu-portal-text
    size && `menu-portal-size-${size}`, // 퍼블에서 필요 ex) menu-portal-chip, menu-portal-text
    optionsCount >= 10 && 'menu-portal-large', // 옵션이 10개 이상이면 사이즈가 커야됨. 스타일 추가 필요.
  );
  return (
    <components.MenuPortal {...props}>
      <div className={className}>{props.children}</div>
    </components.MenuPortal>
  );
};

const NoOptionsMessage = (props: any) => {
  return (
    <components.NoOptionsMessage {...props}>
      <div style={{ padding: '8px 12px', textAlign: 'center', color: 'black' }}>
        {props.children}
      </div>
    </components.NoOptionsMessage>
  );
};

const PrimitiveComponent = forwardRef<any, ReactSelectComponentProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = '선택하세요',
      isDisabled = false,
      isReadonly = false,
      isMulti = false,
      isSearchable = false,
      isClearable = false,
      label,
      hideLabel = false,
      hideArrow = false,
      size = 'sm',
      variant = 'default',
      className = '',
      name,
      noOptionsMessage,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const uuid = useCreation(() => getRandomId(), []);

    // const dropdownClass = `nlp--dropdown nlp--dropdown-${size} nlp--dropdown-${variant} ${className} w-full`;
    const dropdownClass = `select_wrap nlp--dropdown-${size} nlp--dropdown-${variant} ${className} `;
    const customProps = {
      'data-variant': variant,
      ...props,
    };

    const [isFocused, setIsFocused] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleFocus = () => {
      setIsFocused(true);
    };
    const handleBlur = () => {
      setIsFocused(false);
      setIsMenuOpen(false);
    };
    // 드롭다운이 닫힐 때 상태 처리
    const handleMenuClose = () => {
      setIsMenuOpen(false);
      setIsFocused(false); // 드롭다운 닫힐 때 포커스 상태도 해제
    };

    // 드롭다운이 열릴 때 상태 처리
    const handleMenuOpen = () => {
      setIsMenuOpen(true);
    };

    return (
      <div
        className={cn(
          dropdownClass.trim(),
          styles.select_wrap,
          isDisabled && styles.disabled,
          isReadonly && styles.readonly,
          'dropdown',
          className,
        )}
      >
        <Select
          id={uuid}
          ref={ref}
          options={options}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isClearable={isClearable}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
          menuPlacement="auto"
          className={cn(isFocused || isMenuOpen ? 'focused' : '', isReadonly ? 'readonly' : '')}
          classNamePrefix="nlp-select"
          components={{
            Option,
            DropdownIndicator: dropdownIndicator,
            ClearIndicator: clearIndicator,
            MenuPortal,
            ValueContainer: CustomValueContainer,
            NoOptionsMessage: NoOptionsMessage,
          }}
          noOptionsMessage={() => noOptionsMessage || '데이터가 없습니다.'}
          menuPortalTarget={document.body}
          closeMenuOnSelect={!isMulti}
          hideSelectedOptions={false}
          {...customProps}
        />
      </div>
    );
  },
);

const DropdownComponent = forwardRef<any, DropdownComponentProps>(
  (
    {
      value,
      onChange,
      onBlur,
      options = [],
      isMulti = false,
      presetOptionLabel,
      disabled,
      readOnly,
      noOptionsMessage,
      ...props
    },
    ref,
  ) => {
    const optionsWithPreset = useMemo(
      () => [
        ...(presetOptionLabel ? [{ value: ALL_OPTION, label: presetOptionLabel }] : []),
        ...options,
      ],
      [options, isMulti, presetOptionLabel],
    );

    useEffect(() => {
      if (
        onChange &&
        isMulti &&
        presetOptionLabel &&
        value.includes(ALL_OPTION) &&
        value.length !== optionsWithPreset.length
      ) {
        onChange(map(optionsWithPreset, 'value'));
      }
    }, [value]);

    // value를 react-select 형식으로 변환
    const selectedOptions = useCreation(() => {
      // 빈 문자열('')도 유효한 값으로 처리
      if (value === undefined || value === null) {
        return null;
      }

      const safeOptions = Array.isArray(optionsWithPreset)
        ? optionsWithPreset
        : [optionsWithPreset];

      if (isMulti) {
        return (Array.isArray(value) ? value : [value])
          .map((val) => safeOptions.find((option) => option.value === val))
          .filter(Boolean); // undefined 값 제거
      }

      // 빈 문자열인 경우에도 해당 옵션을 찾도록 수정
      const selectedOption = safeOptions.find((option: DropdownOption) => option.value === value);

      // 값이 명시적으로 존재하지만 옵션에서 찾을 수 없는 경우에만 대체값 생성
      if (!selectedOption && value !== undefined && value !== null) {
        return { value, label: value.toString() };
      }

      return selectedOption || null;
    }, [value, optionsWithPreset]);

    // react-hook-form의 value와 react-select의 value 형식을 맞추기 위한 처리
    const handleChange = (
      newValue: SingleValue<DropdownOption> | MultiValue<DropdownOption>,
      actionMeta: ActionMeta<DropdownOption>,
    ) => {
      if (!onChange) return;

      if (isMulti) {
        const multiValues = map(newValue as MultiValue<DropdownOption>, 'value'); // ? newValue.map((option) => option.value) : [];

        if (!presetOptionLabel) return onChange(multiValues);

        const addedOptions = difference(multiValues, value);
        if (addedOptions.length) {
          if (addedOptions.includes(ALL_OPTION)) {
            // 전체가 추가된 경우
            return onChange(map(optionsWithPreset, 'value'));
          } else {
            if (multiValues.length === options.length) {
              // 다른 옵션을 추가했는데 모든 옵션이 선택된 된 경우
              return onChange([ALL_OPTION, ...multiValues]);
            } else {
              return onChange(multiValues);
            }
          }
        }

        const removedOptions = difference(value, multiValues);
        if (removedOptions.length) {
          if (removedOptions.includes(ALL_OPTION)) {
            // 전체가 해제된 경우
            return onChange([]);
          } else {
            // 다른 옵션을 해제한 경우 전체옵션을 제거
            return onChange(filter(multiValues, (_) => _ !== ALL_OPTION));
          }
        }

        onChange(multiValues);
      } else {
        const singleValue = newValue as SingleValue<DropdownOption>;
        onChange(singleValue?.value ?? null);
      }
    };

    return (
      <PrimitiveComponent
        ref={ref}
        value={selectedOptions as DropdownOption | DropdownOption[]}
        onChange={handleChange}
        onBlur={onBlur}
        options={Array.isArray(optionsWithPreset) ? optionsWithPreset : []}
        isMulti={isMulti}
        isReadonly={readOnly}
        isDisabled={disabled}
        noOptionsMessage={noOptionsMessage}
        {...props}
      />
    );
  },
);

DropdownComponent.displayName = 'Dropdown';

export const Dropdown = DropdownComponent;
