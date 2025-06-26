import React, { FC, memo } from 'react';
import { BaseFormRow2 } from '@learnway/ui';
import { FormRowFieldConfig, FormRowProps as BaseFormRowProps } from '@learnway/hooks';
import { formFieldConfig } from './form-field-config';

/**
 * FormRowComponent
 * -------------------------------------------------------------------
 * - provider와 builder 설정을 기반으로 DynamicFormField들을 감싸며,
 *   레이블, 에러 메시지, 안내 텍스트 등 폼의 공통 레이아웃을 구성.
 * - fieldConfig의 모든 속성을 개별 props로 받아서 처리
 *
 * @param className - 추가 CSS 클래스
 * @param provider - react-hook-form 및 빌더 관련 프로바이더 객체
 * @param children - 폼 필드들 (DynamicFormField 포함)
 * @param name - 필드 이름 (필수)
 * @param element - 렌더링할 폼 필드 컴포넌트
 */
type FormRowProps = Omit<BaseFormRowProps, 'formFieldConfig' | 'fieldConfig'> &
  Partial<Omit<FormRowFieldConfig, 'name'>>;

const FormRowComponent: FC<FormRowProps> = ({
  className,
  provider,
  children,
  name,
  element,
  infoNode,
  // fieldConfig 속성들을 개별 props로 직접 받음
  type,
  label,
  value,
  description,
  placeholder,
  tooltip,
  guideText,
  subText,
  format,
  validation,
  maxLength,
  options,
  ...restProps
}) => {
  // 개별 props들로 fieldConfig 구성
  const fieldConfig: FormRowFieldConfig = {
    type: type || 'custom',
    label,
    value,
    description,
    placeholder,
    tooltip,
    guideText,
    subText,
    format,
    validation,
    maxLength,
    options,
    ...restProps,
  };

  return (
    <BaseFormRow2
      provider={provider}
      name={name}
      formFieldConfig={formFieldConfig}
      className={className}
      children={children}
      element={element}
      infoNode={infoNode}
      fieldConfig={fieldConfig}
    />
  );
};

export const FormRow2 = memo(FormRowComponent);
