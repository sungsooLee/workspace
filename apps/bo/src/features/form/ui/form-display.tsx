import { FC, isValidElement, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { FormDisplayProps } from './type';
import { useWatch } from 'react-hook-form';
import { DynamicFormField } from '@/libs/ui/src/lib/dynamic-form-field';

/**
 * 특정 Value 에 의존해 특정 내용들에 대한 Display 을 처리 하는 컴포넌트.
 * dependencies 는 form 내에 값들에 대한 AND 조건을 처리 합니다.
 * onDisplay 함수는 외부값에 대한 Display 에 대한 처리를 지원 합니다.
 * 아래는 onDisplay 함수에 대한 사용 예제 입니다. onDisplay 함수에는 반드시 useCallback 을 사용해주셔야 하고
 * dependency 를 걸어주셔야 정상 적동 합니다.
 *
 * 가급 적이면 dependencies 를 활용해 주세요

 const { provider, onSubmit, control } = useDynamicForm(formConfig);
 const [manager] = useWatch({
   control,
   name: ['manager'],
 });
 const [isTest, setIsTest] = useState(false);

 const handleOnDisplay = useCallback((values: any) => {
    return values['manager'] === '10' && isTest;
 },[manager, isTest]);

 * @param provider
 * @param children
 * @param dependencies
 * @param onDisplay
 * @constructor
 */
const FormDisplayComponent: FC<FormDisplayProps> = ({
  provider,
  children,
  dependencies,
  onDisplay,
}) => {
  // provider에서 control, onFormChange, originalValues 추출
  const { control, onFormChange, originalValues, getValues } = provider;

  /**
   * 🔎 useWatch로 상태 변화 감지
   * - control 객체를 기반으로 dependencies 값 변경 감지
   * - useWatch는 react-hook-form에서 제공하는 훅으로 상태 관찰 가능
   */
  const watchedValue = useWatch({
    control,
    name: dependencies ? dependencies.map((dep) => dep.name) : [], // 의존성 값 설정
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (dependencies) {
      const isDependenciesMet =
        watchedValue.length === dependencies.length &&
        watchedValue.every((value: any, index: number) => value === dependencies[index].value);

      const isDisplayMet = onDisplay ? onDisplay(getValues()) : true;

      // 상태가 실제로 변경될 때만 상태 업데이트 → 불필요한 렌더링 방지
      const newValue = isDependenciesMet && isDisplayMet;
      if (isVisible !== newValue) {
        setIsVisible(newValue);
      }
    } else {
      const newValue = onDisplay ? onDisplay(getValues()) : true;
      if (isVisible !== newValue) {
        setIsVisible(newValue);
      }
    }
  }, [watchedValue, dependencies, onDisplay, getValues]);
  // 사용된 필드 이름 저장 (동적 필드 추적용)
  const [usedNames, setUsedNames] = useState<string[]>([]);

  /**
   * 🔎 렌더링 시 사용된 필드 이름 추출
   * - 재귀적으로 children을 탐색하면서 사용된 필드 이름 저장
   * - DynamicFormField에 name이 있으면 추적 대상에 포함
   */
  useEffect(() => {
    // 재귀 함수로 children 순회
    const renderChild = (child: ReactNode): ReactNode => {
      if (!isValidElement(child)) return child; // 유효한 React 엘리먼트인지 확인

      if (child.type === DynamicFormField) {
        setUsedNames((prev) =>
          prev.includes(child.props.name) ? prev : [...prev, child.props.name],
        );
      }

      // 자식 엘리먼트가 존재하면 재귀적으로 탐색
      if (child.props.children) {
        renderChild(child.props.children);
      }

      return child;
    };

    // 초기 렌더링 시 children 순회
    renderChild(children);
  }, []); // 처음 마운트될 때만 실행

  useEffect(() => {
    if (!isVisible) {
      const oriValues: any = {};
      usedNames.forEach((dep: string) => {
        oriValues[dep] = originalValues[dep];
      });
      onFormChange(oriValues);
    }
  }, [isVisible]);

  return isVisible ? children : null;
};

export const FormDisplay = FormDisplayComponent;
