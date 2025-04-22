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
  getGroupedRowModel,
  GroupingState,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'; // paging Icons
import { isEmpty } from 'lodash';

import {
  IcoChevronLeft,
  IcoChevronLeftDouble,
  IcoChevronRight,
  IcoChevronRightDouble,
  IcoGridFilter,
  IcoGridOrder,
} from '@learnway/icons';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { cn, isFirefox } from '@learnway/shared';

import { GridProps } from './types/grid';
import { ColumnSetting } from './components/column-setting';
import { FilterContent } from './components/filter-content';

import { useModal } from '../modal/modal.hook';
import { Button } from '../button/button';
import { Checkbox } from '../checkbox/checkbox';
import { Dropdown } from '../dropdown/dropdown';
import { DropdownOption } from '../type';

import styles from './grid.module.css'; // grid module CSS

const Grid = forwardRef(
  <T extends object>(
    {
      data,
      columns,
      height = 240,
      multiple,
      disabledSelectionToggle,
      hideRowSelectionCheckBox,
      hideHeader,
      showNumberingColumn,
      pagination,
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
    }: GridProps<T>,
    ref: any,
  ) => {
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const { open } = useModal();
    const [expanded, setExpanded] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

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
    }));

    /**
     * 테이블 columns
     */
    const tableColumns = useMemo(() => {
      // 넘버링 컬럼 생성
      const createNumberingColumn = (): ColumnDef<T> => ({
        id: 'numbering',
        size: 50,
        header: 'NO.',
        cell: ({ row }: any) =>
          pagination ? pagination.pageIndex * pagination.pageSize + row.index + 1 : row.index + 1,
      });

      // 체크박스 컬럼 생성
      const createMultipleCheckColumn = (): ColumnDef<T> => ({
        id: 'select',
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
      // 다중 선택 모드 && 체크박스 컬럼이 숨겨지지 않은 경우 체크박스 컬럼 포함
      if (multiple && !hideRowSelectionCheckBox) {
        finalColumns = [createMultipleCheckColumn(), ...finalColumns];
      }
      // numbering 컬럼
      if (showNumberingColumn) {
        finalColumns = [createNumberingColumn(), ...finalColumns];
      }
      return finalColumns;
    }, [columns, multiple, hideRowSelectionCheckBox]);

    /**
     * Row Select handle - 단일 선택 모드
     * @param updaterOrValue
     */
    const handleRowSelectionChangeForSingle: OnChangeFn<RowSelectionState> = (updaterOrValue) => {
      const newSelection =
        typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;

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
      // getFilteredRowModel: getFilteredRowModel(), // 클라이언트 사이드 필터링 (api로만 필터링하려면 제외)
      // getSortedRowModel: getSortedRowModel(), // 클라이언트 사이드 소팅 (소팅 서버 로직일 경우에 제외)
      //// 서버 사이드 처리 //////
      manualSorting: true, // 서버 소팅일 경우 포함.
      manualFiltering: true, // 서버 필터일 경우 포함.
      manualPagination: true, //서버 페이지네이션 처리
      // manualGrouping: true,  // 서버 그루핑. 그루핑 데이터 자체를 서버에서 내려줘야됨.
      // manualExpanding: true,
      pageCount: pagination ? Math.ceil(pagination.totalRows / pagination.pageSize) : undefined,
      //고유 ID 부여, 페이지네이션에서 selected row를 위해서
      getRowId: (row: T, index: number) => {
        return `${pagination?.pageIndex ?? 0}-${index}`;
      },
      meta: {
        updateData,
        removeData,
      },
      // defaultColumn,
    });

    // 가상 스크롤 관련 설정
    const { rows } = table.getRowModel();
    const rowVirtualizer = useVirtualizer({
      count: rows.length,
      estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
      getScrollElement: () => tableContainerRef.current,
      measureElement: !isFirefox()
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
      overscan: 5,
    });

    // 그리드 상태 변화(e.g. 필터, 소팅, 순서, visibility)에 따른 콜백 전달
    useEffect(() => {
      if (!onStateChange) return;

      onStateChange({
        filters: columnFilters,
        sorting,
        columnVisibility,
        columnOrder,
      });
    }, [columnFilters, sorting, columnVisibility, columnOrder]);

    // 그리드 row 선택 변경시 onRowSelect(단건), onRowsSelect(다건) callback 실행
    useEffect(() => {
      if (isEmpty(data)) {
        // 최초 로딩 인경우 수행하지 않음
        return;
      }
      const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
      const selectedRow = selectedRows?.[0];
      onRowSelect?.(selectedRow);
      onRowsSelect?.(selectedRows);
    }, [rowSelection]);

    // 컬럼 팝업에서 컬럼에 대한 항목 설정
    const handleColumnSettingsChange = (settings: ColumnSetting[]) => {
      // 숨기기 설정
      const visibility = settings.reduce((acc, setting) => {
        acc[setting.id] = setting.isVisible;
        return acc;
      }, {} as VisibilityState);
      // 순서 설정
      const order = settings.map((setting) => setting.id);

      setColumnVisibility(visibility);
      setColumnOrder(order);
    };

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
              if (onStateChange) {
                onStateChange({
                  filters: columnFilters,
                  sorting,
                  columnVisibility,
                  columnOrder,
                });
              }
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

                  return (
                    <th
                      key={header.id}
                      style={{
                        // width: paginationGrid ? undefined : header.getSize(),
                        // display: paginationGrid ? 'table-cell' : 'flex',
                        // 정렬 속성 추가
                        textAlign: columnDef.meta?.headerAlign || columnDef.meta?.align || 'left',
                        // justifyContent:
                        //   columnDef.meta?.headerAlign ||
                        //   columnDef.meta?.align ||
                        //   'justify-start',
                        display: 'block',
                        width: !tableMode ? header.getSize() : '',
                        // 고정 헤더 스타일 추가
                        position: isPinnedLeft ? 'sticky' : undefined,
                        left: isPinnedLeft ? `${column.getStart('left')}px` : undefined,
                        zIndex: isPinnedLeft ? 3 : undefined, // 헤더는 더 높은 z-index
                      }}
                      className={cn(
                        styles.thead_th,
                        isPinnedLeft && styles.th_pinned_left,
                        isLastPinnedColumn && styles.th_pinned_last,
                      )}
                    >
                      <div className={styles.th_wrap}>
                        <div
                          className={cn(
                            styles.th_cell,
                            column.getCanSort() ? 'cursor-pointer select-none' : '',
                          )}
                          style={{
                            justifyContent:
                              columnDef.meta?.headerAlign ||
                              columnDef.meta?.align ||
                              'justify-start',
                            // width: header.getSize(),
                            width: !tableMode ? header.getSize() : '',
                          }}
                          onClick={column.getToggleSortingHandler()}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(columnDef.header, header.getContext())}
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
                          {/* 필터 */}
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
        const bodyStyle = {
          // display: paginationGrid ? 'table-row-group' : 'grid',
          position: 'relative',
          height: !tableMode ? `${rowVirtualizer.getTotalSize()}px` : '',
        } as CSSProperties;

        return (
          <tbody style={bodyStyle}>
            {rowVirtualizer.getVirtualItems()?.map((item: VirtualItem) => {
              const row = rows[item.index] as Row<T>;
              return renderRow(row, item);
            })}
          </tbody>
        );
      };

      // table > tbody > tr
      const renderRow = (row: Row<T>, item: VirtualItem) => {
        const { index, size, start } = item;
        const rowStyle = {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: !tableMode ? `${size}px` : '',
          transform: !tableMode ? `translateY(${start}px)` : '',
          display: !tableMode ? 'flex' : '',
        } as CSSProperties;

        return (
          <tr
            key={row.id}
            data-index={index}
            ref={(node) => rowVirtualizer.measureElement(node)}
            className={cn(
              row.getIsSelected() && styles.selected,
              row.getIsSelected() && 'bg-[#edfcff]',
            )}
            style={rowStyle}
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
          width: !tableMode ? cell.column.getSize() : '',
          display: 'block',
          textAlign:
            cell.column.columnDef.meta?.cellAlign || cell.column.columnDef.meta?.align || 'left',
          verticalAlign: 'center',

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
            <p className={styles.empty_message}>{emptyMessage || '조회 결과가 없습니다.'}</p>
          </div>
        );
      };

      return (
        <div
          ref={tableContainerRef}
          className={cn(
            tableMode ? styles.table : styles.grid,
            className,
            multiple && !hideRowSelectionCheckBox && styles.has_select_all_checkbox, // 멀티모드 && 체크박스사용 = 체크박스 가운데 정렬시 사용
            tableMode ? 'table' : 'grid',
            tableMode && styles[variant],
            tableMode && variant,
          )}
          style={{
            height: tableMode ? 'auto' : `${height}px`,
            width: '100%',
            overflow: data.length === 0 ? 'hidden' : 'auto', // 데이터 있을때만 스크롤 가능
          }}
        >
          <table>
            {/* thead */}
            {renderHead()}
            {/* tbody */}
            {isLoading ? renderLoading() : renderBody()}
          </table>
          {/* 데이터 없을 때 메세지 */}
          {data.length === 0 && renderEmptyMessage()}
        </div>
      );
    };

    //// 페이지네이션 렌더링
    const renderPagination = () => {
      if (!pagination) return null;

      const {
        pageSize,
        pageIndex,
        totalRows,
        onPageChange,
        onPageSizeChange,
        pageSizeOptions = [10, 20, 50, 100],
      } = pagination;

      const options: DropdownOption[] = pageSizeOptions.map((size) => ({
        value: size.toString(),
        label: `${size}개씩 보기`,
      }));

      const handleChange = (value?: DropdownOption) => {
        if (value) {
          onPageSizeChange(Number(value));
        }
      };
      const totalPages = Math.ceil(totalRows / pageSize);

      return (
        <div className={styles.paging_wrap} onClick={(e) => e.stopPropagation()}>
          <Dropdown
            value={pageSize.toString()}
            onChange={handleChange}
            options={options}
            className={styles.select_item}
          />
          <div className={styles.btn_wrap}>
            <Button
              onClick={() => onPageChange(0)}
              disabled={pageIndex === 0}
              className={styles.btn_first}
              onlyIcon
            >
              {<IcoChevronLeftDouble width={32} height={32} fill="#4C515E" />}
            </Button>
            <Button
              onClick={() => onPageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
              className={styles.btn_prev}
            >
              {<IcoChevronLeft width={32} height={32} fill="#4C515E" />}
            </Button>

            {/* 페이지 번호들 */}
            <div className={styles.num_wrap}>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => onPageChange(i)}
                  className={cn(styles.btn_num, pageIndex === i ? styles.active : '')}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => onPageChange(pageIndex + 1)}
              disabled={pageIndex >= totalPages - 1}
              className={styles.btn_next}
            >
              {<IcoChevronRight width={32} height={32} fill="#4C515E" />}
            </Button>
            <Button
              onClick={() => onPageChange(totalPages - 1)}
              disabled={pageIndex >= totalPages - 1}
              className={styles.btn_last}
            >
              {<IcoChevronRightDouble width={32} height={32} fill="#4C515E" />}
            </Button>
          </div>
          <span className={styles.count_wrap}>
            {pageIndex + 1} / {totalPages} Page
          </span>
        </div>
      );
    };

    return (
      <>
        {renderTable()}
        {renderPagination()}
      </>
    );
  },
);

//

const TableComponent = forwardRef(<T extends object>(props: GridProps<T>, ref: any) => {
  return <Grid {...props} disabledSelectionToggle tableMode />;
});

export { Grid, TableComponent as Table };
