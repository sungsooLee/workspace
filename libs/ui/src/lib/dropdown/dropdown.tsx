import React, { forwardRef, useState } from 'react';
import Select, { ActionMeta, components, MultiValue, SingleValue } from 'react-select';
import { useCreation } from 'ahooks';
import { map } from 'lodash';

import { cn, getRandomId } from '@learnway/shared';
import { IcoArrowDown, IcoDelete03 } from '@learnway/icons';

import { Checkbox } from '../checkbox/checkbox';
import { DropdownOption } from '../type';

import styles from './dropdown.module.css';
import { Button } from '../button/button';

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
  label?: string;
  hideLabel?: boolean;
  hideArrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'chip' | 'text';
  className?: string;
  name?: string;
  onBlur?: () => void;
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

  return (
    <components.ValueContainer {...props}>
      <div className={styles.container}>
        {values.length > 0 && (
          <span className={styles.result_text}>
            {values[0].label} {values.length > 1 ? `외 ${values.length - 1}` : ''}
          </span>
        )}
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
  return (
    <components.Option {...props}>
      <div className={styles.select_item}>
        {props.isMulti && <Checkbox size={'md'} checked={props.isSelected} onChange={() => null} />}
        <span>{props.label}</span>
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
  console.log(variant);
  const className = cn(
    'menu-portal',
    variant && `menu-portal-${variant}`, // ex) menu-portal-chip, menu-portal-text
  );
  return (
    <components.MenuPortal {...props}>
      <div className={className}>{props.children}</div>
    </components.MenuPortal>
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
      <div className={cn(dropdownClass.trim(), styles.select_wrap, 'dropdown', className)}>
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
          }}
          menuPortalTarget={document.body}
          closeMenuOnSelect={!isMulti}
          hideSelectedOptions={false}
          // menuIsOpen={true}
          {...customProps}
        />
      </div>
    );
  },
);

const DropdownComponent = forwardRef<any, DropdownComponentProps>(
  (
    { value, onChange, onBlur, options = [], isMulti = false, disabled, readOnly, ...props },
    ref,
  ) => {
    console.log('----------------', props);
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

    // value를 react-select 형식으로 변환
    const selectedOptions = useCreation(() => {
      if (!value) {
        return null;
      }
      const safeOptions = Array.isArray(options) ? options : [options];

      if (isMulti) {
        return (Array.isArray(value) ? value : [value])
          .map((val) => safeOptions.find((option) => option.value === val))
          .filter(Boolean); // undefined 값 제거
      }

      return (
        safeOptions.find((option: DropdownOption) => option.value === value) ||
        (typeof value === 'string' ? { value, label: value } : null)
      );
    }, [value, options]);

    return (
      <PrimitiveComponent
        ref={ref}
        value={selectedOptions as DropdownOption | DropdownOption[]}
        onChange={handleChange}
        onBlur={onBlur}
        options={Array.isArray(options) ? options : []}
        isMulti={isMulti}
        isReadonly={readOnly}
        isDisabled={disabled}
        {...props}
      />
    );
  },
);

DropdownComponent.displayName = 'Dropdown';

export const Dropdown = DropdownComponent;
