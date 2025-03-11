import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '@learnway/shared';
import styles from './form.module.css';
import { IcoAlertCircle, IcoFormRequired } from '@learnway/icons';
import { Builder, DynamicFormField } from '../dynamic-form-field';
import { dialogConfig } from './config';
import { FormRowProps } from './type';
import { Button, Tooltip } from '@learnway/ui';
import { useWatch } from 'react-hook-form';

const FormDisplayComponent: FC<any> = ({ values, provider, children, dependencies }) => {
  const { control, onFormChange, originalValues } = provider;

  const [show, setShow] = useState(false);
  const [usedNames, setUsedNames] = useState<string[]>([]);

  useEffect(() => {
    const renderChild = (child: ReactNode): ReactNode => {
      if (!isValidElement(child)) return child;

      // DynamicFormField인 경우: 해당 필드의 설정에 따라 추가 props 주입
      if (child.type === DynamicFormField) {
        // 해당 필드의 빌더 설정 조회.
        setUsedNames([...usedNames, child.props.name]);
      }

      // child가 자식 요소(children)를 가지고 있으면 재귀적으로 처리
      if (child.props.children) {
        renderChild(child.props.children);
      }

      // 특별히 처리할 필요가 없으면 그대로 반환
      return child;
    };
    renderChild(children);
  }, []);

  const watchedValue = useWatch({
    control,
    name: dependencies,
  });
  // 상태 변경 방지용 ref (무한 루프 방지)
  const isResettingRef = useRef(false);

  useEffect(() => {
    // reset()이 실행된 후 상태 변경 시에는 아무 작업도 하지 않고 종료
    if (isResettingRef.current) {
      isResettingRef.current = false; // 다음 상태 변경 허용
      return;
    }

    // watchedValue와 values의 값이 일치하는지 확인
    const isShow =
      watchedValue.length === values.length &&
      watchedValue.every((value: any, index: number) => value === values[index]);

    // 상태 업데이트 (값이 일치하면 true, 일치하지 않으면 false)
    setShow(isShow);

    // 값이 일치하지 않는 경우만 reset() 호출
    if (!isShow) {
      const oriValues: any = {};

      // originalValues에서 초기값을 추출해서 oriValues에 설정
      usedNames.forEach((dep: string) => (oriValues[dep] = originalValues[dep]));

      // 상태 변경 트리거를 방지하기 위해 ref 값 설정
      isResettingRef.current = true;

      // reset 호출 → 상태 변경 발생 → useWatch가 상태 변경 감지
      onFormChange(oriValues);
    }
  }, [watchedValue]); // watchedValue 변경 시 useEffect 실행
  return show && children;
};

export const FormDisplay = FormDisplayComponent;
