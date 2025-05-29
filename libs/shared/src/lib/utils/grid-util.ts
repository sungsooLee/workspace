import { HeaderGroup, RowSelectionState, Table } from '@tanstack/react-table';

/**
 * 주어진 데이터 목록(list)에 해당하는 행들을 TanStack Table에서 선택하기 위한
 * RowSelectionState 객체를 생성합니다.
 *
 * @param {Table<any>} tableInstance - useReactTable 훅으로 생성된 TanStack Table 인스턴스.
 * @param {any[]} list - 선택 상태로 만들고자 하는 데이터 객체들의 목록.
 * @param {string} [key='id'] - 데이터 객체에서 고유 식별자로 사용될 속성 이름.
 * TanStack Table의 getRowId와 일치해야 합니다.
 * @returns {RowSelectionState} TanStack Table의 setRowSelection 메서드에 전달할 수 있는 RowSelectionState 객체.
 * 유효한 tableInstance, list가 없으면 빈 객체를 반환합니다.
 */
export const getRowSelectionByList = (tableInstance: Table<any>, list: any[], key = 'id') => {
  // 유효한 tableInstance, list가 없으면 빈 선택 상태 객체 반환
  if (!tableInstance || !list) {
    return {};
  }

  // 선택하려는 데이터 목록(list)의 고유 키 값들을 Set으로 만들어 빠른 조회를 준비합니다.
  // Set을 사용하면 Array.prototype.find보다 평균적으로 훨씬 빠르게 요소 존재 여부를 확인할 수 있습니다.
  const listKeySet = new Set(list.map((item) => item[key]));

  // TanStack Table 인스턴스에서 현재 테이블에 표시된 모든 행을 가져옵니다.
  const allRows = tableInstance.getRowModel().rows;

  // 전체 행 중에서 listKeySet에 키 값이 존재하는 데이터 객체에 해당하는 행들만 필터링합니다.
  // original은 행의 원본 데이터 객체를 나타냅니다.
  const matchingRows = allRows.filter(({ original }: { original: any }) =>
    // listKeySet.has(original[key])를 사용하여 효율적으로 존재 여부 확인
    listKeySet.has(original[key]),
  );

  // 필터링된 'matchingRows'를 기반으로 RowSelectionState 객체를 생성합니다.
  // RowSelectionState는 { [rowId: string]: boolean } 형태이며,
  // 선택하려는 행의 row.id를 true로 설정합니다.
  const newSelectionState: RowSelectionState = {};
  matchingRows.forEach((row) => {
    // 각 매칭되는 행의 고유 ID (TanStack Table 내부에서 생성된 ID)를 키로 사용하여 true 설정
    newSelectionState[row.id] = true;
  });

  // 생성된 선택 상태 객체를 반환합니다.
  return newSelectionState;
};

export const getMaxDepthHeaderGroup = (headerGroup: HeaderGroup<any>): number => {
  // let depth = 0;
  // let currentGroup: HeaderGroup<any> | undefined = headerGroup;
  //
  // while (currentGroup?.parent) {
  //   depth++;
  //   currentGroup = currentGroup.parent;
  // }
  //
  // return depth;
  return 0;
};
