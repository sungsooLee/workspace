import React, { FC, useMemo, useState } from 'react';
import { Dropdown } from '../../dropdown/dropdown';
import { Input } from '../../input/input';

/**
 * 검색 조건을 정의하는 인터페이스
 */
export interface GridBoxSearchInputCondition {
  /**
   * 검색 기준이 되는 키 (예: 'id', 'name', 'title' 등 컬럼의 accessorKey)
   */
  key?: string;
  /**
   * 실제 검색어 입력 값
   */
  value?: string;
}

/**
 * GridBoxSearchInput 컴포넌트의 props 인터페이스
 */
export interface GridBoxSearchInputProps {
  /**
   * 검색 가능한 컬럼 정보를 포함하는 배열
   * 각 컬럼 객체는 `searchable` 속성(boolean), `header` (표시될 이름), `accessorKey` (실제 검색 키)를 포함해야 합니다.
   */
  columns: any[]; // columns 배열의 타입은 더 구체적인 인터페이스로 정의하는 것이 좋습니다.
  /**
   * 사용자가 엔터 키를 누르거나 검색 아이콘을 클릭했을 때 호출되는 콜백 함수
   * @param condition - 현재 선택된 검색 조건 ({ key: string, value: string }) 객체
   */
  onEnterKeyDown?: (condition: GridBoxSearchInputCondition) => void;
}

/**
 * 검색 입력 컴포넌트
 * 컬럼 드롭다운(선택 사항)과 검색 입력 필드를 포함하여 다양한 기준으로 검색할 수 있도록 합니다.
 */
export const GridBoxSearchInput: FC<GridBoxSearchInputProps> = ({ columns, onEnterKeyDown }) => {
  const options = useMemo(
    () =>
      columns
        ?.filter((column: any) => column.searchable)
        .map((column: any) => ({
          label: column.header,
          value: column.accessorKey,
        })),
    [columns],
  );

  // 검색 조건(key, value)을 관리하는 상태.
  // `useState`의 초기값으로 콜백 함수를 사용하여 `options`가 준비된 후에 초기 `key`를 설정합니다.
  const [condition, setCondition] = useState<GridBoxSearchInputCondition>(() => ({
    // 검색 가능한 컬럼이 있다면 첫 번째 컬럼의 value를 기본 key로 설정
    key: options.length > 0 ? options[0].value : undefined,
    value: undefined, // 검색어는 초기에는 비어 있습니다.
  }));

  /**
   * Input 컴포넌트에서 엔터 키를 누르거나 검색 아이콘을 클릭했을 때 호출되는 핸들러.
   * 현재 `condition` 상태를 `onEnterKeyDown` 콜백을 통해 부모 컴포넌트로 전달합니다.
   */
  const handleOnEnterKeyDown = () => {
    // `condition`이 유효한 경우 (즉, undefined가 아닐 때) `onEnterKeyDown` 콜백 호출
    // 또한, `key`와 `value`가 모두 유효한 경우에만 검색을 수행하도록 로직을 더 강화할 수 있습니다.
    // 예: if (condition?.key && condition?.value !== undefined && onEnterKeyDown) { onEnterKeyDown(condition); }
    if (onEnterKeyDown) {
      onEnterKeyDown(condition || {}); // `condition`이 undefined일 경우 빈 객체를 전달
    }
  };

  return (
    <>
      {/* dropdown */}
      {options?.length > 1 && (
        <Dropdown
          options={options}
          value={condition?.key}
          placeholder={'검색할 컬럼을 선택하세요'}
          className={'w-[50px]'}
          onChange={(newValue: any) => setCondition({ key: newValue, value: condition?.value })}
        />
      )}
      {/* input */}
      {options?.length > 0 && (
        <Input
          value={condition?.value}
          className={'w-[50px]'}
          showSearchIcon
          searchIconType={'search'}
          onChange={(e) => setCondition({ key: condition?.key, value: e.target.value })}
          onEnterKeyDown={handleOnEnterKeyDown}
        />
      )}
    </>
  );
};
