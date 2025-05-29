import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Cell,
  Column,
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  GroupingState,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { cn } from '@learnway/shared';

import { GridProps } from './types/grid';
import { FilterContent } from './components/filter-content';

import { useModal } from '../modal/modal.hook';
import { Checkbox } from '../checkbox/checkbox';

import styles from './grid.module.css';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { IcoGridFilter, IcoGridOrder } from '@learnway/icons';
import { Button } from '../button/button';

const GridComponent = forwardRef(
  <T extends object>(
    {
      data,
      columns,
      multiple,
      disabledSelectionToggle,
      hideRowSelectionRadioBox = true,
      hideRowSelectionCheckBox,
      hideHeader,
      showNumberingColumn,
      pagination,
      visibleRowCount = 20,
      rowHeight = 40,
      isLoading,
      columnGrouping,
      columnPinning = { columns: [] },
      className,
      tableMode,
      onStateChange,
      onRowSelect,
      onRowsSelect,
      onChange,
      emptyMessage,
      variant = 'line',
      autoSelectFirstRow,
      clientSideFiltering,
      clientSideSorting,
      onTableInstanceChange,
    }: GridProps<T>,
    ref: any,
  ) => {
    const { t } = useTranslation();
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const { open } = useModal();
    const [expanded, setExpanded] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    // rowSelection useEffect가 첫 번째 실행인지 추적하는 Ref
    const isInitialSelectionEffect = useRef(true);

    const groupingState = useMemo<GroupingState>(
      () => columnGrouping?.columns || [],
      [columnGrouping?.columns],
    );
    const [columnPinningState, setColumnPinningState] = useState<ColumnPinningState>({
      left: multiple ? ['select', ...columnPinning.columns] : columnPinning.columns, // 체크박스가 있으면 'select'를 기본으로 고정
      right: [],
    });
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() =>
      columns.reduce((acc, col) => {
        acc[col.id as string] = true;
        return acc;
      }, {} as VisibilityState),
    );

    // columnOrder 초기화
    const [columnOrder, setColumnOrder] = useState<string[]>(() =>
      columns.map((col) => col.id as string),
    );

    /**
     * 부모 컴포넌트에서 grid 특정 기능 수행시 필요
     */
    useImperativeHandle(ref, () => ({
      resetRowSelection: () => {
        setRowSelection({});
      },
      // 추가: ID로 행을 선택하는 메서드
      selectRowById: (idField: string, idValue: string) => {
        // 해당 ID 값을 가진 행 찾기
        const rowIndex = data.findIndex((row: any) => row[idField] === idValue);
        if (rowIndex >= 0) {
          // 현재 페이지 정보를 포함한 행 ID 생성
          const pageIndex = pagination?.pageIndex || 0;
          const rowId = `${pageIndex}-${rowIndex}`;
          // 행 선택 상태 업데이트
          setRowSelection({ [rowId]: true });
          return true;
        }
        return false;
      },
      toggleRowById: (idField: string, idValue: string) => {
        const selectedRow = table
          .getSelectedRowModel()
          .rows.find(({ original }: any) => original?.[idField] === idValue);
        selectedRow?.toggleSelected();
      },
      toggleAllRowsSelected: (selected: boolean) => {
        table.toggleAllRowsSelected(selected);
      },
    }));

    /**
     * 테이블 columns
     */
    const tableColumns = useMemo(() => {
      // 넘버링 컬럼 생성
      const createNumberingColumn = (): ColumnDef<T> => ({
        id: 'numbering',
        size: 64,
        header: 'NO.',
        meta: {
          cellAlign: 'center',
        },
        enableSorting: true,
        accessorFn: (row, index) => index,
        cell: ({ row }: any) =>
          pagination ? (
            <p>{pagination.pageNumber * pagination.pageSize + row.index + 1}</p>
          ) : (
            <p>{row.index + 1}</p>
          ),
      });

      // 라디오 컬럼 생성
      const createSingleRadioColumn = (): ColumnDef<T> => ({
        id: 'select-radio',
        size: 50,
        maxSize: 50,
        minSize: 50,
        enablePinning: true,
        meta: {
          align: 'center',
          headerAlign: 'center',
          cellAlign: 'center',
        },
        header: t('LABEL.grid.column.selected', '선택'),
        cell: ({ row, table }) => {
          const checked = !!table
            .getSelectedRowModel()
            .rows.find((d) => d.original === row.original);
          return (
            <div className={cn(styles.select_row_radio, checked && styles.checked)}>
              <input
                type="radio"
                name="select-row"
                checked={checked}
                onChange={() => row.getToggleSelectedHandler()}
              />
            </div>
          );
        },
      });

      // 체크박스 컬럼 생성
      const createMultipleCheckColumn = (): ColumnDef<T> => ({
        id: 'select-check',
        size: 50,
        maxSize: 50,
        minSize: 50,
        enablePinning: true,
        meta: {
          align: 'center',
          headerAlign: 'center',
          cellAlign: 'center',
        },
        header: ({ table }: { table: Table<T> }) => (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              onCheckedChange={(checked) => {
                table.toggleAllRowsSelected(!!checked);
              }}
            />
          </div>
        ),
        cell: ({ row }: { row: Row<T> }) => (
          <div style={{ width: '100%', textAlign: 'center', paddingRight: 0 }}>
            <Checkbox
              checked={row.getIsSelected()}
              disabled={row.getIsGrouped()}
              onCheckedChange={() => {
                if (!row.getIsGrouped()) {
                  row.getToggleSelectedHandler();
                }
              }}
            />
          </div>
        ),
      });

      let finalColumns = [...columns];
      // numbering 컬럼
      if (showNumberingColumn) {
        finalColumns = [createNumberingColumn(), ...finalColumns];
      }
      // 싱글 선택 모드 && 라디오 컬럼이 숨겨지지 않은 경우 라디오 컬럼 포함
      if (!multiple && !hideRowSelectionRadioBox) {
        finalColumns = [createSingleRadioColumn(), ...finalColumns];
      }
      // 다중 선택 모드 && 체크박스 컬럼이 숨겨지지 않은 경우 체크박스 컬럼 포함
      if (multiple && !hideRowSelectionCheckBox) {
        finalColumns = [createMultipleCheckColumn(), ...finalColumns];
      }
      return finalColumns;
    }, [columns, multiple, pagination, hideRowSelectionCheckBox]);

    /**
     * Row Select handle - 단일 선택 모드
     * @param updaterOrValue
     */
    const handleRowSelectionChangeForSingle: OnChangeFn<RowSelectionState> = (updaterOrValue) => {
      const newSelection =
        typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;

      // 같은 row 선택 한 경우 deselect 안되게 하기 위해
      if (isEmpty(newSelection)) {
        return;
      }

      // 마지막 선택만 유지
      const selectedRowIds = Object.keys(newSelection);
      const lastId = selectedRowIds?.at(-1);
      const newSelectionState = lastId ? { [lastId]: true } : {};
      setRowSelection(newSelectionState);
    };

    /**
     * Row Select handle - 멀티 선택 모드
     * @param updaterOrValue
     */
    const handleRowSelectionChangeForMultiple: OnChangeFn<RowSelectionState> = (updaterOrValue) => {
      const newSelection =
        typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;
      setRowSelection(newSelection);
    };

    /**
     * 특정 셀의 데이터를 업데이트하는 함수입니다.
     *
     * @param {number} rowIndex 업데이트할 셀이 위치한 행의 인덱스입니다.
     * @param {string} columnId 업데이트할 셀의 컬럼 ID입니다.
     * @param {unknown} value 업데이트할 셀의 새로운 값입니다.
     * @returns {void}
     */
    const updateData = (rowIndex: number, columnId: string, value: unknown) => {
      const newData = table
        .getRowModel()
        .rows.map((row) => row.original)
        .map((row: any, index: number) => {
          if (index === rowIndex) {
            return {
              ...row,
              [columnId]: value,
            };
          }
          return row;
        });
      onChange?.(newData);
    };

    /**
     * 특정 행을 삭제하는 함수입니다.
     *
     * @param {number} rowIndex 업데이트할 셀이 위치한 행의 인덱스입니다.
     * @returns {void}
     */
    const removeData = (rowIndex: number) => {
      const newData = table
        .getRowModel()
        .rows.map((row) => row.original)
        .filter((row: any, index: number) => index !== rowIndex);
      onChange?.(newData);
    };

    const table = useReactTable({
      data,
      columns: tableColumns,
      defaultColumn: {
        minSize: 50,
      },
      state: {
        columnOrder,
        columnVisibility,
        sorting,
        columnFilters,
        rowSelection,
        grouping: groupingState,
        expanded,
        ...(pagination && {
          pagination: {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          } as PaginationState,
        }),
        columnPinning: columnPinningState,
      },
      onColumnVisibilityChange: setColumnVisibility,
      onColumnOrderChange: setColumnOrder,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onExpandedChange: setExpanded,
      onColumnPinningChange: setColumnPinningState,
      onPaginationChange: (updater) => {
        if (!pagination) return;
        const newPagination =
          typeof updater === 'function'
            ? updater({ pageIndex: pagination.pageIndex, pageSize: pagination.pageSize })
            : updater;

        pagination.onPageChange(newPagination.pageIndex);
        pagination.onPageSizeChange(newPagination.pageSize);
      },
      getCoreRowModel: getCoreRowModel(),
      getGroupedRowModel: getGroupedRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      enableRowSelection: true,
      // onRowSelectionChange: setRowSelection,
      onRowSelectionChange: multiple
        ? handleRowSelectionChangeForMultiple
        : handleRowSelectionChangeForSingle,
      enableMultiRowSelection: multiple,
      enableHiding: true,
      enableGrouping: true,
      enableExpanding: true,
      enablePinning: true,
      //// 클라이언트 사이드 처리 ///////
      ...(clientSideFiltering && { getFilteredRowModel: getFilteredRowModel() }),
      ...(clientSideSorting && { getSortedRowModel: getSortedRowModel() }),
      // getSortedRowModel: getSortedRowModel(),
      //// 서버 사이드 처리 //////
      manualSorting: !clientSideSorting, // 클라이언트 사이드 정렬이면 false, 서버 사이드면 true
      manualFiltering: !clientSideFiltering, // 클라이언트 사이드 필터링이면 false, 서버 사이드면 true
      manualPagination: true, //서버 페이지네이션 처리
      // manualGrouping: true,  // 서버 그루핑. 그루핑 데이터 자체를 서버에서 내려줘야됨.
      // manualExpanding: true,
      // pageCount: pagination ? Math.ceil(pagination.totalRows / pagination.pageSize) : undefined,
      //고유 ID 부여, 페이지네이션에서 selected row를 위해서
      getRowId: (row: T, index: number) => {
        return `${pagination?.pageIndex ?? 0}-${index}`;
      },
      meta: {
        updateData,
        removeData,
      },
    });

    // 그리드 상태 변화(e.g. 필터, 소팅, 순서, visibility)에 따른 콜백 전달
    useEffect(() => {
      onStateChange?.({
        filters: columnFilters,
        sorting,
        columnVisibility,
        columnOrder,
      });
    }, [columnFilters, sorting, columnVisibility, columnOrder]);

    // 그리드 row 선택 변경시 onRowSelect(단건), onRowsSelect(다건) callback 실행
    useEffect(() => {
      // 해당 useEffect 최초 실행인 경우 첫 번째 실행을 건너뜁니다.
      if (isInitialSelectionEffect.current) {
        isInitialSelectionEffect.current = false;
        return;
      }

      const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
      const selectedRow = selectedRows?.[0];
      onRowSelect?.(selectedRow);
      onRowsSelect?.(selectedRows);
    }, [rowSelection]);

    // data 변경시 첫번째 행 선택 (데이터가 있고 autoSelectFirstRow 설정된 경우)
    useEffect(() => {
      const firstRowId = table.getRowModel()?.rows?.[0]?.id;
      if (firstRowId && autoSelectFirstRow && !tableMode) {
        setRowSelection({ [firstRowId]: true });
      } else {
        table.toggleAllRowsSelected(false);
      }
    }, [data, table, autoSelectFirstRow]);

    // useReactTable 훅으로 생성된 table 인스턴스를 상위 컴포넌트로 전달
    useEffect(() => {
      if (onTableInstanceChange) {
        onTableInstanceChange(table);
      }
      // table 인스턴스는 컴포넌트 생명주기 동안 변경되지 않으므로 의존성 배열에 포함하지 않아도 됩니다.
    }, [table, onTableInstanceChange]); // table과 콜백 함수를 의존성 배열에 추가

    /// 필터 팝업 오픈
    const openFilterPopup = (e: React.MouseEvent, column: Column<T, unknown>) => {
      e.stopPropagation();

      const filterType = column.columnDef.meta?.filterType;
      const currentValue = column.getFilterValue();
      const filterOptions =
        column.columnDef.meta?.filterType === 'select' ? column.columnDef.meta.filterOptions : [];

      open({
        content: (
          <FilterContent
            column={column.id}
            type={filterType as 'text' | 'range' | 'select'}
            initialValue={currentValue}
            onApply={(value) => {
              column.setFilterValue(value);
              // 필터 변경 시 상위 컴포넌트에 알림
              onStateChange?.({
                filters: columnFilters,
                sorting,
                columnVisibility,
                columnOrder,
              });
            }}
            options={filterOptions}
          />
        ),
        // title: `${column.columnDef.header as string} 필터`,
        width: 'sm',
      });
    };

    /**
     * 테이블 내용 로딩
     */
    const renderLoading = () => <p>Loading...</p>;

    /**
     * 테이블 내용 렌더링
     */
    const renderTable = () => {
      // 고정된 왼쪽 열의 ID들 가져오기
      const pinnedLeftColumns = table.getState().columnPinning.left || [];
      // 마지막 고정 열의 ID
      const lastPinnedColumnId = pinnedLeftColumns[pinnedLeftColumns.length - 1];
      // table > thead
      const renderHead = () => {
        console.log(table.getHeaderGroups());
        if (hideHeader) {
          return <></>;
        }
        return (
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header;
                  const { columnDef } = column;
                  const isPinnedLeft = column.getIsPinned() === 'left';
                  const isLastPinnedColumn = isPinnedLeft && column.id === lastPinnedColumnId;
                  const thStyle = {
                    // width: paginationGrid ? undefined : header.getSize(),
                    // display: paginationGrid ? 'table-cell' : 'flex',
                    // 정렬 속성 추가
                    // textAlign: columnDef.meta?.headerAlign || columnDef.meta?.align || 'left',
                    // display: 'block',
                    width: columnDef.meta?.size || header.getSize(),
                    // width: !tableMode ? (columnDef.meta?.size ? header.getSize() : 'auto') : '',
                    // 고정 헤더 스타일 추가
                    // position: isPinnedLeft ? 'sticky' : 'static', // static (position default value)
                    // left: isPinnedLeft ? `${column.getStart('left')}px` : undefined,
                    // zIndex: isPinnedLeft ? 3 : undefined, // 헤더는 더 높은 z-index
                  } as CSSProperties;
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={thStyle}
                      className={cn(
                        styles.thead_th,
                        isPinnedLeft && styles.th_pinned_left,
                        isLastPinnedColumn && styles.th_pinned_last,
                      )}
                    >
                      <div
                        className={cn(
                          styles.th_wrap,
                          column.getCanSort() ? 'cursor-pointer select-none' : '',
                        )}
                        style={{
                          justifyContent:
                            columnDef.meta?.headerAlign || columnDef.meta?.align || 'justify-start',
                        }}
                        onClick={column.getToggleSortingHandler()}
                      >
                        {/* flexRender */}
                        {header.isPlaceholder
                          ? null
                          : flexRender(columnDef.header, header.getContext())}
                        {/* sort icon */}
                        {{
                          asc: (
                            <IcoGridOrder
                              width={7}
                              height={4}
                              fill={'#00afd5'}
                              stroke={'#00afd5'}
                              className={styles.icon_up}
                            />
                          ),
                          desc: (
                            <IcoGridOrder
                              width={7}
                              height={4}
                              fill={'#00afd5'}
                              stroke={'#00afd5'}
                              className={styles.icon_down}
                            />
                          ),
                        }[column.getIsSorted() as string] ?? null}
                        {/* filter */}
                        {columnDef.meta?.filterType && (
                          <Button
                            type="button"
                            onClick={(e) => openFilterPopup(e, column)}
                            className={styles.btn_filter}
                          >
                            <IcoGridFilter width={16} height={16} />
                          </Button>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
        );
      };

      // table > tbody
      const renderBody = () => {
        return <tbody>{table.getRowModel().rows.map((row) => renderRow(row))}</tbody>;
      };

      // table > tbody > tr
      const renderRow = (row: Row<T>) => {
        return (
          <tr
            key={row.id}
            className={cn(
              row.getIsSelected() && styles.selected,
              row.getIsSelected() && 'bg-[#edfcff]',
            )}
            onClick={() => !row.getIsGrouped() && !disabledSelectionToggle && row.toggleSelected()}
          >
            {row.getVisibleCells().map((cell: Cell<T, unknown>) => renderCell(row, cell))}
          </tr>
        );
      };

      // table > tbody > tr > td
      const renderCell = (row: Row<T>, cell: Cell<T, unknown>) => {
        const isPinnedLeft = cell.column.getIsPinned() === 'left';
        // 마지막 고정 열인지 확인
        const isLastPinnedColumn = isPinnedLeft && cell.column.id === lastPinnedColumnId;

        const cellStyle = {
          background: cell.getIsGrouped()
            ? '#0aff0082'
            : cell.getIsAggregated()
              ? '#ffa50078'
              : cell.getIsPlaceholder()
                ? '#ff000042'
                : '',
          width: cell.column.getSize(),
          // width: cell.column.columnDef.meta?.size || cell.column.getSize(),
          textAlign:
            cell.column.columnDef.meta?.cellAlign || cell.column.columnDef.meta?.align || 'left',

          // 고정열 스타일 추가
          position: isPinnedLeft ? 'sticky' : undefined,
          left: isPinnedLeft ? `${cell.column.getStart('left')}px` : undefined,
          zIndex: isPinnedLeft ? 3 : undefined,
        } as CSSProperties;

        return (
          <td
            key={cell.id}
            className={cn(
              styles.tbody_td,
              isPinnedLeft && styles.td_pinned_left,
              // 마지막 고정 열에 클래스 추가
              isLastPinnedColumn && styles.td_pinned_last,
            )}
            style={cellStyle}
          >
            {cell.getIsGrouped() ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  row.toggleExpanded();
                }}
                style={{
                  cursor: row.getIsGrouped() ? 'default' : 'pointer',
                }}
              >
                {row.getIsExpanded() ? '👇' : '👉'}{' '}
                {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows.length})
              </button>
            ) : cell.getIsAggregated() ? (
              flexRender(
                cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                cell.getContext(),
              )
            ) : cell.getIsPlaceholder() ? null : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </td>
        );
      };

      /**
       * 데이터가 없을 때 표시할 메시지 렌더링
       */
      const renderEmptyMessage = () => {
        return (
          <div className={styles.empty_message_container}>
            <p className={styles.empty_message}>
              {emptyMessage || t('LABEL.grid.emptyText', '조회 결과가 없습니다.')}
            </p>
          </div>
        );
      };

      const gridClass = cn(
        className,
        tableMode ? styles.table : styles.grid,
        multiple && !hideRowSelectionCheckBox && styles.has_select_all_checkbox, // 멀티모드 && 체크박스사용 = 체크박스 가운데 정렬시 사용
        tableMode ? 'table' : 'grid',
        tableMode && styles[variant],
        tableMode && variant,
      );

      const gridStyle = {
        maxHeight: visibleRowCount * rowHeight + table.getHeaderGroups().length * 41 + 16, // (row 개수 * row 높이) + (header 개수 * header 높이) + (가로 스크롤 높이 + 기타 보더 패딩....)
        overflow: !data?.length ? 'hidden' : 'auto', // 데이터 있을때만 스크롤 가능
      };

      const tableStyle = {
        width: '100%',
        tableLayout: 'fixed',
      } as CSSProperties;

      return (
        <div className={gridClass} style={gridStyle}>
          <table style={tableStyle}>
            {renderHead()}
            {isLoading ? renderLoading() : renderBody()}
          </table>
          {/* 데이터 없을 때 메세지 */}
          {!data?.length && renderEmptyMessage()}
        </div>
      );
    };

    return <>{renderTable()}</>;
  },
);

export const Grid2 = GridComponent;
