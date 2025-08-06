import { FormRowProps as BaseFormRowProps, FormRowFieldConfig } from '@learnway/hooks';
import { cn } from '@learnway/shared';
import { BaseFormRow2 } from '@learnway/ui/base-form';
import { FC, memo } from 'react';
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
 * @param labelKey - 번역 키 (label 대신 사용)
 */
type FormRowProps = Omit<BaseFormRowProps, 'formFieldConfig' | 'fieldConfig'> &
  Partial<Omit<FormRowFieldConfig, 'name'>> & {
    cols?: number;
  };

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
  labelKey, // 새로운 prop
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
  cols,
  ...restProps
}) => {
  // validation prop이 있으면 동적으로 등록
  // useEffect(() => {
  //   if (validation && provider.addValidator && name) {
  //     provider.addValidator(name, validation);
  //   }
  // }, [name, JSON.stringify(validation), provider.addValidator]); // JSON.stringify로 안전한 비교

  // 간단한 fieldConfig 구성
  const fieldConfig: FormRowFieldConfig = {
    name: name || '', // name 필드 추가
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

  // cols에 따른 flex 클래스 결정
  const getFlexClass = (cols?: number) => {
    if (!cols) return undefined;

    // 일반적으로 사용되는 flex 비율들
    const flexClasses: Record<number, string> = {
      1: 'flex-1',
      2: 'flex-[2]',
      3: 'flex-[3]',
      4: 'flex-[4]',
      5: 'flex-[5]',
      6: 'flex-[6]',
      12: 'flex-[12]',
    };

    return flexClasses[cols] || 'flex-1'; // 기본값으로 flex-1 사용
  };

  return (
    <BaseFormRow2
      provider={provider}
      name={name}
      formFieldConfig={formFieldConfig}
      className={cn(className, getFlexClass(cols))}
      children={children}
      element={element}
      infoNode={infoNode}
      fieldConfig={fieldConfig}
    />
  );
};

export const FormRow2 = memo(FormRowComponent);
