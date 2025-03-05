import React, { forwardRef } from 'react';
import Select, { components, MultiValue, SingleValue, ActionMeta } from 'react-select';
import { getRandomId } from '@learnway/shared';
import { DropdownComponentProps, DropdownOption } from './type';
  
const CustomValueContainer = ({ children, ...props }: any) => {
    const { getValue, hasValue, selectProps } = props;
    console.log(props);
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
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {values.length > 0 && (
            <span>
              {values[0].label} {values.length > 1 ? `외 ${values.length - 1}` : ''}
            </span>
          )}
        </div>
        {/* 중요: 숨겨진 입력 필드 등을 유지하기 위한 원래 children 렌더링 */}
        {React.Children.map(children, child =>
          child && child.type !== components.MultiValue ? child : null
        )}
      </components.ValueContainer>
    );
  };
  

// 체크박스가 있는 옵션 컴포넌트
const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.isMulti && (
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
            style={{ marginRight: '8px' }}
          />
        )}
        <span>{props.label}</span>
      </div>
    </components.Option>
  );
};

const DropdownComponent = forwardRef<any, DropdownComponentProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = '선택하세요',
      isDisabled = false,
      isMulti = false,
      isSearchable = false,
      isClearable = false,
      label,
      hideLabel = false,
      size = 'sm',
      variant = 'default',
      className = '',
      name,
      onBlur,
      ...props
    },
    ref
  ) => {
    const uuid = getRandomId();
    const dropdownClass = `nlp--dropdown nlp--dropdown-${size} nlp--dropdown-${variant} ${className} w-full`;
    const customProps = {
      'data-variant': variant,
      ...props
    };
    return (
      <div className={dropdownClass.trim()}>
        <Select
          id={uuid}
          ref={ref}
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isClearable={isClearable}
          name={name}
          onBlur={onBlur}
          className='w-full'
          classNamePrefix="nlp-select"
          components={{
            Option,
            // ValueContainer : CustomValueContainer
            // ValueContainer:  (props) => <CustomValueContainer {...props} variant={variant}/>,
          }}
          closeMenuOnSelect={!isMulti}
          hideSelectedOptions={false}
          {...customProps}
        />
      </div>
    );
  }
);

// FormDropdown 컴포넌트 - DynamicFormField와 함께 사용하기 위한 wrapper
const FormDropdownComponent = forwardRef<any, any>(
  ({ value, onChange, onBlur, options = [], isMulti = false, ...props }, ref) => {
    // react-hook-form의 value와 react-select의 value 형식을 맞추기 위한 처리
    const handleChange = (
      newValue: SingleValue<DropdownOption> | MultiValue<DropdownOption>,
      actionMeta: ActionMeta<DropdownOption>
    ) => {
      if (isMulti) {
        const multiValues = newValue as MultiValue<DropdownOption>;
        onChange(multiValues ? multiValues.map((option) => option.value) : []);
      } else {
        const singleValue = newValue as SingleValue<DropdownOption>;
        onChange(singleValue ? singleValue.value : null);
      }
    };

    // value를 react-select 형식으로 변환
    const getFormattedValue = () => {
      if (value === null || value === undefined) return null;
      
      const safeOptions = Array.isArray(options) ? options : [];
      
      if (isMulti && Array.isArray(value)) {
        return value
          .map((val) => safeOptions.find((option) => option.value === val))
          .filter(Boolean); // undefined 값 제거
      }
      
      return safeOptions.find((option: DropdownOption) => option.value === value) || 
        (typeof value === 'string' ? { value, label: value } : null);
    };

    return (
      <DropdownComponent
        ref={ref}
        value={getFormattedValue()}
        onChange={handleChange}
        onBlur={onBlur}
        options={Array.isArray(options) ? options : []}
        isMulti={isMulti}
        {...props}
      />
    );
  }
);


DropdownComponent.displayName = 'Dropdown';
FormDropdownComponent.displayName = 'FormDropdown';

export const DropdownList = DropdownComponent;
export const FormDropdown = FormDropdownComponent;