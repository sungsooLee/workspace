import { SelectOption } from '../type';
import { BaseFieldProps, FieldType } from '../type';

/**
 * 라디오 그룹 옵션 인터페이스
 * SelectOption을 확장하여 라디오 그룹에 필요한 추가 속성들을 정의합니다.
 */
export interface RadioGroupOption extends SelectOption {
  /** 옵션에 대한 추가 설명 텍스트 */
  description?: string;
  /** 옵션에 표시할 커스텀 React 노드 */
  node?: React.ReactNode;
}

/**
 * 라디오 필드 속성 인터페이스
 * BaseFieldProps를 확장하여 라디오 그룹 컴포넌트에 필요한 속성들을 정의합니다.
 */
export interface RadioFieldProps extends BaseFieldProps {
  /** 필드 타입 - 라디오 그룹으로 고정 */
  type: FieldType.RADIO;
  /** 라디오 그룹에서 선택할 수 있는 옵션들의 배열 */
  options: RadioGroupOption[];
  /** 라디오 버튼들의 배치 방향 */
  orientation?: 'vertical' | 'horizontal';
  /** 기본 선택값 */
  defaultValue?: string;
  /** 값이 변경될 때 호출되는 콜백 함수 */
  onValueChange?: (value: string) => void;
}
