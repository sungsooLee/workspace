import React, { ChangeEvent } from 'react';
import {
  Input,
  Textarea,
  RadioGroupFormField,
  CheckboxGroupFormField,
  DatePicker,
  RangeDatePicker,
  StarRating,
} from '@learnway/ui';
import {
  FieldConfig,
  InputFieldConfig,
  SelectFieldConfig,
  DateFieldConfig,
  FileFieldConfig,
  CustomFieldConfig,
  RatingFieldConfig,
} from '../types/form-field.types';
import { AddressField } from './custom-fields/address-field';
import { ExperienceField } from './custom-fields/experience-field';
import { SkillRatingField } from './custom-fields/skill-rating-field';
import { FormFieldWrapper } from './form-field-wrapper';

// 커스텀 컴포넌트들 import

// 필드 렌더러 Props 인터페이스
interface FieldRendererProps {
  config: FieldConfig;
  fieldKey: string;
  value?: unknown;
  onChange?: (value: unknown) => void;
  error?: string;
  disabled?: boolean;
  preview?: boolean; // 미리보기 모드
}

// 컴포넌트 매핑
const CUSTOM_COMPONENTS = {
  AddressField,
  ExperienceField,
  SkillRatingField,
} as const;

// Input 타입 필드 렌더러
const renderInputField = ({
  config,
  fieldKey,
  value,
  onChange,
  error,
  disabled,
  preview,
}: FieldRendererProps & { config: InputFieldConfig }) => {
  const commonProps = {
    placeholder: config.placeholder,
    maxLength: config.maxLength,
    minLength: config.minLength,
    disabled: disabled || preview,
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  switch (config.type) {
    case 'textarea':
      return (
        <Textarea
          {...commonProps}
          value={(value as string) || ''}
          onChange={handleInputChange}
          rows={4}
        />
      );

    case 'email':
    case 'phone':
    case 'number':
    case 'input':
    default:
      return (
        <Input {...commonProps} value={(value as string) || ''} onChange={handleInputChange} />
      );
  }
};

// Select 타입 필드 렌더러 (간단한 구현)
const renderSelectField = ({
  config,
  fieldKey,
  value,
  onChange,
  error,
  disabled,
  preview,
}: FieldRendererProps & { config: SelectFieldConfig }) => {
  switch (config.type) {
    case 'radio':
      return (
        <RadioGroupFormField
          options={config.options}
          value={(value as string) || ''}
          onChange={onChange}
          disabled={disabled || preview}
        />
      );

    case 'checkbox':
      return (
        <CheckboxGroupFormField
          options={config.options}
          value={(value as string[]) || []}
          onChange={onChange}
          disabled={disabled || preview}
        />
      );

    default:
      return null;
  }
};

// Date 타입 필드 렌더러 (간단한 구현)
const renderDateField = ({
  config,
  fieldKey,
  value,
  onChange,
  error,
  disabled,
  preview,
}: FieldRendererProps & { config: DateFieldConfig }) => {
  switch (config.type) {
    case 'date':
      return (
        <DatePicker
          selected={value ? new Date(value as string) : undefined}
          onChange={(date) => onChange?.(date?.toISOString())}
          disabled={disabled || preview}
          minDate={config.minDate ? new Date(config.minDate) : undefined}
          maxDate={config.maxDate ? new Date(config.maxDate) : undefined}
          placeholder={config.placeholder}
        />
      );

    case 'dateRange': {
      const dateRange = (value as { from?: string; to?: string }) || { from: '', to: '' };
      return (
        <RangeDatePicker
          value={{
            from: dateRange.from ? new Date(dateRange.from) : undefined,
            to: dateRange.to ? new Date(dateRange.to) : undefined,
          }}
          onChange={(range) =>
            onChange?.({
              from: range.from?.toISOString(),
              to: range.to?.toISOString(),
            })
          }
          disabled={disabled || preview}
          placeholderStart={config.placeholder || '시작일 선택'}
          placeholderEnd="종료일 선택"
        />
      );
    }

    default:
      return null;
  }
};

// File 타입 필드 렌더러 (간단한 구현)
const renderFileField = ({
  config,
  fieldKey,
  value,
  onChange,
  error,
  disabled,
  preview,
}: FieldRendererProps & { config: FileFieldConfig }) => {
  return (
    //파일 업로드 컴포넌트
    <>파일 업로드 컴포넌트</>
  );
};

const renderRatingField = ({
  config,
  fieldKey,
  value,
  onChange,
  error,
  disabled,
  preview,
}: FieldRendererProps & { config: RatingFieldConfig }) => {
  return (
    // 별점 컴포넌트
    <StarRating
      value={value as number}
      onChange={onChange}
      maxRating={config.maxRating}
      animated={config.animated}
      size={config.size || 'md'}
    />
  );
};

// Custom 타입 필드 렌더러
const renderCustomField = ({
  config,
  fieldKey,
  value,
  onChange,
  error,
  disabled,
  preview,
}: FieldRendererProps & { config: CustomFieldConfig }) => {
  const Component = CUSTOM_COMPONENTS[config.componentName as keyof typeof CUSTOM_COMPONENTS];

  if (!Component) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4">
        <p className="text-red-600">커스텀 컴포넌트를 찾을 수 없습니다: {config.componentName}</p>
      </div>
    );
  }

  // 안전한 value 전달 - 컴포넌트별로 분기 처리
  const renderComponent = () => {
    const commonProps = {
      onChange,
      error,
      disabled: disabled || preview,
      description: config.description,
      ...config.props,
    };

    switch (config.componentName) {
      case 'AddressField': {
        const addressValue = (value as {
          zipCode: string;
          address: string;
          detailAddress: string;
        }) ?? { zipCode: '', address: '', detailAddress: '' };
        return <AddressField {...commonProps} value={addressValue} />;
      }
      case 'ExperienceField': {
        const experienceValue =
          (value as {
            id: string;
            company: string;
            position: string;
            duration: string;
            description: string;
          }[]) ?? [];
        return <ExperienceField {...commonProps} value={experienceValue} />;
      }
      case 'SkillRatingField': {
        const skillValue =
          (value as { category: string; skills: { skill: string; rating: number }[] }[]) ?? [];
        return <SkillRatingField {...commonProps} value={skillValue} />;
      }
      default:
        // 알 수 없는 컴포넌트인 경우 에러 메시지 표시
        return (
          <div className="rounded border border-yellow-300 bg-yellow-50 p-4">
            <p className="text-yellow-700">알 수 없는 커스텀 컴포넌트: {config.componentName}</p>
          </div>
        );
    }
  };

  return renderComponent();
};

// 메인 필드 렌더러 (고차 컴포넌트)
export const FieldRenderer: React.FC<FieldRendererProps> = (props) => {
  const { config, fieldKey, preview = false, error } = props;

  const renderField = () => {
    switch (config.type) {
      case 'input':
      case 'textarea':
      case 'email':
      case 'phone':
      case 'number':
        return renderInputField({ ...props, config: config as InputFieldConfig });

      case 'radio':
      case 'checkbox':
      case 'select':
        return renderSelectField({ ...props, config: config as SelectFieldConfig });

      case 'date':
      case 'dateRange':
      case 'time':
        return renderDateField({ ...props, config: config as DateFieldConfig });

      case 'file':
        return renderFileField({ ...props, config: config as FileFieldConfig });

      case 'custom':
        return renderCustomField({ ...props, config: config as CustomFieldConfig });

      default:
        return (
          <div className="rounded border border-yellow-300 bg-yellow-50 p-4">
            <p className="text-yellow-700">지원하지 않는 필드 타입입니다.</p>
          </div>
        );
    }
  };

  return (
    <FormFieldWrapper
      label={config.label}
      required={config.required}
      error={error}
      description={config.description}
      fieldKey={fieldKey}
      preview={preview}
      className={preview ? 'rounded-lg border border-gray-200 bg-gray-50' : ''}
    >
      {preview && <div className="mb-2 text-xs text-blue-600">[{config.type}]</div>}
      {renderField()}
    </FormFieldWrapper>
  );
};

// 여러 필드를 렌더링하는 헬퍼 컴포넌트
interface FormFieldsRendererProps {
  fieldKeys: string[];
  fieldConfigs: Record<string, FieldConfig>;
  values?: Record<string, unknown>;
  onChange?: (fieldKey: string, value: unknown) => void;
  errors?: Record<string, string>;
  disabled?: boolean;
  preview?: boolean;
}

export const FormFieldsRenderer: React.FC<FormFieldsRendererProps> = ({
  fieldKeys,
  fieldConfigs,
  values = {},
  onChange,
  errors = {},
  disabled = false,
  preview = false,
}) => {
  return (
    <div className={`space-y-4 ${preview ? 'space-y-6' : ''}`}>
      {fieldKeys.map((fieldKey) => {
        const config = fieldConfigs[fieldKey];
        if (!config) {
          // 필드 설정을 찾을 수 없음
          return null;
        }

        return (
          <FieldRenderer
            key={fieldKey}
            config={config}
            fieldKey={fieldKey}
            value={values[fieldKey]}
            onChange={(value) => onChange?.(fieldKey, value)}
            error={errors[fieldKey]}
            disabled={disabled}
            preview={preview}
          />
        );
      })}
    </div>
  );
};

export default FieldRenderer;
