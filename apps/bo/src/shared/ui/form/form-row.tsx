import React, { FC, memo } from 'react';
import { BaseFormRow } from '@learnway/ui';
import { FormRowProps as BaseFormRowProps } from '@learnway/hooks';
import { formFieldConfig } from './form-field-config';

/**
 * FormRowComponent
 * -------------------------------------------------------------------
 * - provider와 builder 설정을 기반으로 DynamicFormField들을 감싸며,
 *   레이블, 에러 메시지, 안내 텍스트 등 폼의 공통 레이아웃을 구성.
 * - 내부에서 children을 재귀적으로 순회하면서 DynamicFormField에 추가 props
 *   (control, component 등)를 주입.
 *
 * @param className - 추가 CSS 클래스
 * @param provider - react-hook-form 및 빌더 관련 프로바이더 객체
 * @param children - 폼 필드들 (DynamicFormField 포함)
 * @param name - 명시적으로 지정한 name (없으면 내부의 첫번째 DynamicFormField의 name 사용)
 */
type FormRowProps = Omit<BaseFormRowProps, 'formFieldConfig'>;
const FormRowComponent: FC<FormRowProps> = ({ className, provider, children, name, element }) => {
  return (
    <BaseFormRow
      provider={provider}
      name={name}
      formFieldConfig={formFieldConfig}
      className={className}
      children={children}
      element={element}
    />
  );
};

export const FormRow = memo(FormRowComponent);
