import { forwardRef, useMemo } from 'react';
import { RadioGroup } from '../../radio-group/radio-group';
import { cn } from '@learnway/shared';
import styles from './radio-group-form-field.module.css';
import { BaseFormFieldProps, OptionsConfig, useFormOptions } from '@learnway/hooks';
import { RadioGroupOption } from '../../radio-group/type';

/**
 * RadioGroup 폼 필드 컴포넌트의 Props 인터페이스
 * BaseFormFieldProps를 확장하여 라디오 그룹에 필요한 속성들을 추가
 */
export interface RadioGroupFormFieldProps extends BaseFormFieldProps<string> {
  /** 정적 라디오 옵션 배열 */
  options?: RadioGroupOption[];
  /** 동적 옵션 설정 (API, 코드 그룹 등) */
  optionsConfig?: OptionsConfig;
}

/**
 * 라디오 그룹 폼 필드 컴포넌트
 * 동적/정적 옵션을 지원하며, 커스텀 노드와 그리드 레이아웃을 제공
 */
const RadioGroupFormFieldComponent = forwardRef<HTMLDivElement, RadioGroupFormFieldProps>(
  ({ value, name, onChange, options: initOptions, optionsConfig, cols, ...props }, ref) => {
    // useFormOptions 훅을 사용하여 동적/정적 옵션을 처리
    const options = useFormOptions(initOptions, optionsConfig, undefined);

    // 옵션을 라디오 그룹 형식으로 변환하는 메모이제이션된 함수
    const radioOptions = useMemo(() => {
      return options.map((option) => {
        const findItem = optionsConfig?.optionsNode?.find((node) => node.value === option.value);
        return findItem
          ? {
              ...option,
              node: findItem.node,
            }
          : option;
      });
    }, [options, optionsConfig]);

    return (
      <RadioGroup
        ref={ref}
        value={value}
        // CSS 클래스 조합: 기본 스타일 + 라디오 리스트 + cols가 없으면 flex 타입
        className={cn(styles.start, styles.radio_list, !cols && styles.type_flex)}
        // cols가 설정된 경우 그리드 템플릿 컬럼 스타일 적용
        style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
        name={name}
        defaultValue={value}
        options={radioOptions}
        cols={cols}
        onValueChange={onChange}
        {...props}
      />
    );
  },
);

export const RadioGroupFormField = RadioGroupFormFieldComponent;
