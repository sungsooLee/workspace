import React, { forwardRef } from 'react';
import { GridBox } from './grid-box';
import { GridBoxProps } from './types';

/**
 * 표 컴포넌트 (GridBox) 와 동일한 기능의 컴포넌트
 * GridBox 와 TableBox 를 명시적으로 구분해서 사용하기 위해 사용
 *
 * @template T - 테이블 row 데이터 타입
 * @param props - GridBoxProps<T>
 * @returns React component
 */
export const TableBox = forwardRef(<T extends object>(props: GridBoxProps<T>, ref: any) => {
  return <GridBox {...props} ref={ref} disabledSelectionToggle tableMode />;
});
