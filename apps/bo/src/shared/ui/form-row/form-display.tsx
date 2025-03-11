import { FC, isValidElement, ReactNode, useEffect, useRef, useState } from 'react';
import { DynamicFormField } from '../dynamic-form-field';
import { FormDisplayProps } from './type';
import { useWatch } from 'react-hook-form';

const FormDisplayComponent: FC<FormDisplayProps> = ({
  values,
  provider,
  children,
  dependencies,
}) => {
  // provider에서 control, onFormChange, originalValues 추출
  const { control, onFormChange, originalValues } = provider;

  // 상태 관리: 폼이 보이는지 여부 상태 관리
  const [show, setShow] = useState(false);

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

      // DynamicFormField인 경우 필드 이름 저장
      if (child.type === DynamicFormField) {
        // 이미 추가된 이름이 아니면 저장 (중복 방지)
        setUsedNames((prev) => [...new Set([...prev, child.props.name])]);
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

  /**
   * 🔎 useWatch로 상태 변화 감지
   * - control 객체를 기반으로 dependencies 값 변경 감지
   * - useWatch는 react-hook-form에서 제공하는 훅으로 상태 관찰 가능
   */
  const watchedValue = useWatch({
    control,
    name: dependencies, // 의존성 값 설정
  });

  // 상태 변경 방지용 ref (무한 루프 방지)
  const isResettingRef = useRef(false);

  useEffect(() => {
    // reset()이 실행된 후 상태 변경 시에는 아무 작업도 하지 않고 종료
    if (isResettingRef.current) {
      isResettingRef.current = false; // 다음 상태 변경 허용
      return;
    }

    /**
     * 🔎 watchedValue와 values의 값이 일치하는지 확인
     * - 값이 완전히 일치하면 true → show 상태 활성화
     * - 값이 일치하지 않으면 false → reset()으로 상태 재설정 필요
     */
    const isShow =
      watchedValue.length === values.length &&
      watchedValue.every((value: any, index: number) => value === values[index]);

    // 상태 업데이트 (값이 일치하면 true, 일치하지 않으면 false)
    setShow(isShow);

    // 값이 일치하지 않는 경우에만 상태를 초기화
    if (!isShow) {
      // 초기값 설정용 객체
      const oriValues: any = {};

      // usedNames에 저장된 필드 이름을 기반으로 originalValues에서 값 추출
      usedNames.forEach((dep: string) => {
        oriValues[dep] = originalValues[dep];
      });

      // 상태 변경 트리거를 방지하기 위해 ref 값 설정
      isResettingRef.current = true;

      // reset 호출 → 상태 변경 발생 → useWatch에서 다시 감지됨
      onFormChange(oriValues);
    }
  }, [watchedValue]); // watchedValue가 변경될 때마다 실행됨

  // 상태가 true일 때 children을 렌더링
  return show && children;
};

export const FormDisplay = FormDisplayComponent;
