import { useFetchLabelMessages } from '@entities/label-messages-mock';
import { t } from 'i18next';
import { DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GridBox, GridBoxSearchInputCondition, GridBoxState } from '@learnway/ui';

interface RightPanelProps {
  /** 초기 테이블 파라미터 (검색 조건, 페이지 정보 등) */
  params: Record<string, any>;
  /** GridBox 인스턴스를 상위로 전달하고 싶을 때 사용 */
  setTableInstance?: (table: any) => void;
}

/**
 * 라벨/메시지 데이터를 조회하고 그리드 형태로 보여주는 우측 패널 컴포넌트
 *
 * @component
 * @param {RightPanelProps} props - 컴포넌트 props
 */
const RightPanelComponent2 = ({ params, setTableInstance }: RightPanelProps) => {
  const [gridState, setGridState] = useState<GridBoxState>();
  /** 서버에 요청할 파라미터 상태 */
  const [fetchParams, setFetchParams] = useState<any>(params);

  /** 라벨/메시지 목록 데이터 fetch */
  const { data } = useFetchLabelMessages(fetchParams);

  /** 외부 params가 변경될 때 내부 fetchParams도 갱신 */
  useEffect(() => {
    // setFetchParams(params);
    if (params) {
      setFetchParams({ ...params, ...DEFAULT_GRID_BOX_STATE });
    }
  }, [params]);

  /**
   * Grid 컬럼 정의
   */
  const columns = useMemo(
    () => [
      {
        accessorKey: 'labelMessageType',
        header: () => t('LABEL.grid.column.type'),
        size: 100,
      },
      {
        accessorKey: 'labelMessageMultilingulKey',
        header: t('LABEL.grid.column.labelMessageCode'),
        size: 200,
        searchable: true,
      },
      {
        accessorKey: 'labelMessageName',
        header: t('LABEL.grid.column.labelMessage'),
        size: 200,
        searchable: true,
      },
      {
        accessorKey: 'isUsed',
        header: t('LABEL.grid.column.useYn'),
        size: 104,
        cell: (info: any) => (info.getValue() ? 'Y' : 'N'),
      },
      {
        accessorKey: 'createdBy',
        size: 139,
        header: t('LABEL.grid.column.createdBy'),
      },
      {
        accessorKey: 'createdDate',
        header: t('LABEL.grid.column.createdDate'),
        size: 200,
        cell: (info: any) => formatDate(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
      },
    ],
    [t],
  );

  /**
   * Grid 상태 변경 핸들러 (페이징, 정렬 등)
   *
   * @param {GridBoxState} newState - 새로운 상태
   */
  const handleStateChange = useCallback(
    (newState: GridBoxState) => {
      console.log('handleStateChange', newState);
      setFetchParams({ ...params, ...newState });
      setGridState(newState);
      // setFetchParams({ ...params, ...newState });
    },
    [params],
  );

  /**
   * Grid 검색 조건 입력 시 호출되는 핸들러
   *
   * @param {GridBoxSearchInputCondition} condition - 검색 키/값
   */
  const handleGridSearchClick = useCallback(
    (condition: GridBoxSearchInputCondition) => {
      console.log('handleGridSearchClick', condition);
      setFetchParams({ ...params, ...{ [condition.key]: condition.value } });
    },
    [params],
  );

  return (
    <GridBox
      columns={columns}
      showNumberingColumn
      gridData={data}
      gridState={DEFAULT_GRID_BOX_STATE}
      rowId={'labelMessageName'}
      onStateChange={handleStateChange}
      onSearchClick={handleGridSearchClick}
    />
  );
};

/**
 * 라벨 메시지 관리용 테이블을 포함한 우측 패널
 */
export const RightPanel2 = RightPanelComponent2;

export const DEFAULT_GRID_BOX_STATE: GridBoxState = { page: 0, size: 10, sort: [] };
