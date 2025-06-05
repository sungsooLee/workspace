/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createColumnHelper, Table } from '@tanstack/react-table';
import {
  Button,
  CountText,
  Grid,
  GridBoxProps,
  GridBoxState,
  GridImperative,
  Pagination,
} from '@learnway/ui';
import { IcoMinus, IcoPlus } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { useTranslation } from 'react-i18next';
import { ExcelButtons } from './excel-buttons';
import { GridBoxSearchInput, GridBoxSearchInputCondition } from './grid-box-search-input';
import styles from './grid-box.module.css';

/**
 * 다양한 설정 옵션을 통해 재사용 가능한 표 컴포넌트(Grid)를 구성합니다.
 * - 컬럼 정의, 데이터 페칭, 페이지네이션 등을 포함
 * - 필요에 따라 상단 버튼이나 안내문구, 엑셀/CSV 기능을 표시 가능
 *
 * @template T - 테이블 row 데이터 타입
 * @param props - GridBoxProps<T>
 * @returns React component
 */
const GridBoxComponent = <T extends object>(
  {
    // @ts-ignore
    config = {},
    showTotalCount = true,
    showSelectedCount,
    showColumnSettings,
    showExcelDownload,
    showUpload,
    showSelectAll,
    showRemoveAll,
    showAdd,
    showRemove,
    titleCustomNode,
    customButtonNode,
    guideText,
    onTableInstanceChange,
    onAddClick,
    onRemoveClick,
    onSelectAllClick,
    onRemoveAllClick,
    onSearchClick,
    ...props
  }: GridBoxProps<T>,
  ref: React.Ref<GridImperative>,
) => {
  const { t } = useTranslation();
  const {
    // data,
    gridData = props.gridData,
    rowId = props.rowId,
    page,
    pagination,
    totalRows,
    gridFetch,
    columns,
    title = props.title,
    onStateChange = props.onStateChange,
    onDataChange,
    excel,
    getParams,
    totalElements,
  } = config;
  const columnHelper = createColumnHelper<any>();
  const gridRef = useRef<GridImperative>(null);
  const [tableInstance, setTableInstance] = useState<Table<any>>(); // GridComponent로부터 받을 table 인스턴스를 저장할 상태

  // 마지막으로 페치에 사용된 params를 저장하는 useRef
  const lastFetchedParamsRef = useRef<GridBoxState>({ page: 0, size: 20, sort: [] }); // 초기값 설정

  // const gridData: PaginationResponse<T> =
  //   props.gridData || (config?.gridData as PaginationResponse<T>);

  // 테스트 후 삭제 예정
  const data = gridData?.content || props.data || config?.data || [];

  useImperativeHandle(ref, () => gridRef.current as GridImperative);

  useEffect(() => {
    // tableInstance가 준비되었고, gridData가 유효할 때
    if (tableInstance && gridData) {
      // API 응답에서 'sort' 정보가 없거나 (null/undefined),
      // 'sort' 객체가 존재하지만 'sorted'가 false인 경우를 확인
      // 또는 'sort' 배열이 비어있는 경우 (API 응답 형식에 따라 다름)
      const apiSaysNotSorted = !gridData.sort?.sorted; // 또는 !gridData.pageable?.sort?.length;

      // 현재 TanStack Table의 정렬 상태가 실제로 적용되어 있는지 확인 (UI가 정렬되어 있는지)
      const currentTableSorting = tableInstance.getState().sorting;
      const isTableCurrentlySorted = !!currentTableSorting.length;

      // API가 정렬되지 않았다고 하는데, 테이블 UI는 정렬되어 있다면 초기화
      if (apiSaysNotSorted && isTableCurrentlySorted) {
        console.log('API indicates no sort, but table is sorted. Resetting table sorting.');
        tableInstance.setSorting([]);
      }

      // 그리드 선택 해제
      tableInstance.resetRowSelection();
      const list = tableInstance.getSelectedRowModel();
      console.log(list);
    }
  }, [gridData, tableInstance]); // lastFetchedParamsRef.current는 useEffect 의존성에서 제거

  /**
   * 컬럼 정보를 기반으로 TanStack Table 형식으로 변환
   * TODO: props로 받은 columns로 완전히 대체 예정
   */
  const girdColumns = useMemo(() => {
    return columns
      ?.filter((column: any) => column.type !== 'numbering')
      ?.map((column: any) => {
        return columnHelper.accessor(column.name, {
          cell: (info) => {
            if (column.render) {
              // render 함수 내부에서 필요한 값(page, row 등)은 info 객체나 클로저로 접근
              return column.render(info);
            }
            return info.getValue();
          },
          header: column.label,
          size: column.size,
          // 다른 컬럼 옵션들 (sortingFn, filterFn 등) 필요시 추가
        });
      });
  }, [columns, page, totalRows, columnHelper]);

  /**
   * numbering 컬럼 여부 확인 (props나 config로 전달 가능)
   * TODO: props로 받은 columns로 완전히 대체 후 삭제 예정
   */
  const showNumberingColumn =
    columns?.find((d: any) => d.type === 'numbering') || props.showNumberingColumn;

  /**
   * pagination 설정
   * - props로 직접 전달되면 우선 사용
   * - 없으면 config에서 받아 설정
   */
  const paginationProps = useMemo(() => {
    return {
      pageNumber: gridData?.pageable?.pageNumber ?? 0,
      pageSize: gridData?.pageable?.pageSize ?? 20,
      totalPages: gridData?.totalPages ?? 0,
      disabled: (gridData?.totalPages || 0) === 0,
    };
  }, [gridData]);

  /**
   * 전체선택 버튼 클릭
   */
  const handleSelectAllClick = useCallback(
    () => {
      // 전체 행 선택
      tableInstance?.toggleAllRowsSelected(true);
    },
    [tableInstance], // 의존성 배열: gridFetch와 page 객체 참조
  );

  /**
   * 전체삭제 버튼 클릭
   */
  const handleRemoveAllClick = useCallback(
    () => {
      // 전체 행 선택 삭제
      tableInstance?.toggleAllRowsSelected(false);
      // callback
      onRemoveAllClick?.();
    },
    [tableInstance, onRemoveAllClick], // 의존성 배열: gridFetch와 page 객체 참조
  );

  /**
   * 추가 버튼 클릭
   */
  const handleAddClick = useCallback(
    () => {
      // 그리드 선택 초기화
      gridRef.current?.resetRowSelection();
      // callback
      onAddClick?.();
    },
    [gridRef, onAddClick], // 의존성 배열: gridFetch와 page 객체 참조
  );

  /**
   * 삭제 버튼 클릭
   */
  const handleRemoveClick = useCallback(
    () => {
      // 그리드 선택 초기화
      gridRef.current?.resetRowSelection();
      // callback
      onRemoveClick?.();
    },
    [gridRef, onRemoveClick], // 의존성 배열: gridFetch와 page 객체 참조
  );

  /**
   * 검색영역 조회 버튼 클릭 핸들러 (엔터 눌렀을때도 실행됨)
   */
  const handleSearchClick = useCallback(
    (condition: GridBoxSearchInputCondition) => {
      // callback
      onSearchClick?.(condition);
    },
    [onSearchClick], // 의존성 배열: gridFetch와 page 객체 참조
  );

  // GridComponent로부터 table 인스턴스를 받았을 때 호출될 핸들러
  const handleTableInstanceChange = useCallback((table: Table<any>) => {
    console.log('Table instance received:', table);
    setTableInstance(table);
    // onTableInstanceChange callback prop
    onTableInstanceChange?.(table);
  }, []);

  /**
   * 페이지 사이즈 변경 핸들러
   */
  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      const newState: GridBoxState = {
        size: pageSize,
      };
      dispatchStateChange(newState);
    },
    [props.pagination, onStateChange],
  );

  /**
   * 페이지 번호 변경 핸들러
   */
  const handlePageChange = useCallback(
    (pageNumber: number) => {
      const newState: GridBoxState = {
        page: pageNumber,
      };
      dispatchStateChange(newState);
    },
    [props.pagination, onStateChange],
  );

  /**
   * 정렬 변경 핸들러
   */
  const handleStateChange = useCallback(
    (state: GridBoxState) => {
      if (!data?.length) {
        return;
      }
      const newState: GridBoxState = {
        ...state,
        page: 0, // 페이지 번호 초기화
      };
      dispatchStateChange(newState);
    },
    [onStateChange, data],
  );

  const dispatchStateChange = (state: GridBoxState) => {
    const newParams = {
      ...lastFetchedParamsRef.current,
      ...state, // 새로 받은 정렬 정보
    };
    // params를 업데이트하기 전에 ref에 저장
    lastFetchedParamsRef.current = newParams;
    //
    onStateChange?.(newParams);
    // // for use-grid-box
    // config.onStateChange?.(newParams);
    // // for grid-box
    // props.onStateChange?.(newParams);
  };

  console.log('grid-box ::', {
    paginationProps,
    config,
    props,
    data,
    gridData,
  });

  return (
    <div className={cn(styles.table_box)}>
      <div className={styles.table_info}>
        <div className={styles.title_info}>
          {/* 제목 */}
          <div className={styles.title}>{title || t('LABEL.grid.title.list', '목록')}</div>

          {/* 전체 개수  */}
          {showTotalCount && (
            <CountText
              label={t('LABEL.grid.header.all', '전체')}
              count={totalElements || data?.length || 0}
            />
          )}
          {/* 좌측 타이틀 영역 커스텀 (전체 카운트와 가이드 텍스트 중간 영역) */}
          {titleCustomNode && <div className={styles.custom_node}>{titleCustomNode}</div>}

          {/* 가이드 텍스트 */}
          <p className={styles.guide_text}>{guideText}</p>
        </div>

        <div className={styles.button_info}>
          {/* 검색 인풋 */}
          <GridBoxSearchInput columns={props.columns || []} onEnterKeyDown={handleSearchClick} />
          {/* 외부에서 받은 커스텀 버튼 노드 */}
          {customButtonNode}
          {/* 엑셀 버튼 */}
          <ExcelButtons config={excel} getParams={getParams} />
          {/* 전체 선택 */}
          {showSelectAll && (
            <Button
              variant="text"
              size="xs"
              className={styles.btn_all_select}
              label={t('LABEL.grid.header.selectAll', '전체선택')}
              icon={<IcoPlus width={16} height={16} stroke={'#131C30'} />}
              onClick={handleSelectAllClick}
            />
          )}
          {/* 전체삭제 */}
          {showRemoveAll && (
            <Button
              variant="text"
              size="xs"
              className={styles.btn_all_delete}
              label={t('LABEL.grid.header.removeAll', '전체삭제')}
              icon={<IcoMinus width={16} height={16} stroke={'#131C30'} />}
              onClick={handleRemoveAllClick}
            />
          )}
          {/* 추가 */}
          {showAdd && (
            <Button
              variant="outline"
              size="sm"
              label={t('LABEL.grid.header.add', '추가')}
              onClick={handleAddClick}
            />
          )}
          {/* 삭제 */}
          {showRemove && (
            <Button
              variant="outline"
              size="sm"
              label={t('LABEL.grid.header.remove', '삭제')}
              onClick={handleRemoveClick}
            />
          )}
        </div>
      </div>
      {/* 데이터 테이블 렌더링 */}
      <Grid
        {...props}
        ref={gridRef}
        data={data}
        columns={props.columns ?? girdColumns ?? []}
        rowId={rowId}
        pagination={paginationProps}
        showNumberingColumn={showNumberingColumn}
        onChange={props.onChange || onDataChange}
        onStateChange={handleStateChange}
        // onStateChange={props.onStateChange || handleStateChange}
        onTableInstanceChange={handleTableInstanceChange}
      />
      {/* 페이지네이션 */}
      {!paginationProps.disabled && (
        <Pagination
          totalPages={paginationProps.totalPages}
          pageNumber={paginationProps.pageNumber}
          pageSize={paginationProps.pageSize}
          disabled={paginationProps.disabled}
          onPageSizeChange={handleChangePageSize}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};
export const GridBox = forwardRef(GridBoxComponent);
