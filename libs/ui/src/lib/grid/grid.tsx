import React, { CSSProperties, forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { cn } from '@learnway/shared';
import { useTranslation } from 'react-i18next';

import { GridProps } from './types/grid';

import styles from './grid.module.css';

// 새로 분리된 훅 import
import { useGridTable } from './use-grid-table';
import { GridHeader } from './grid-header';
import { GridBody } from './grid-body';

const GridComponent = forwardRef(
  <T extends object>(
    {
      data,
      columns,
      rowId = 'id',
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
      onRowDoubleClick,
      onChange,
      emptyMessage,
      variant = 'line',
      autoSelectFirstRow,
      clientSideFiltering,
      clientSideSorting,
      onTableInstanceChange,
      showExpandColumn,
      flattenSubRows,
    }: GridProps<T>,
    ref: any,
  ) => {
    const tableContainerRef = useRef<HTMLDivElement>(null);

    // flattenSubRows->true ? subrows, children의 배열 flat하게 만들고 스타일 주기 위함.
    const flattenData = useMemo(() => {
      if (!flattenSubRows) return data;

      const flatten = (items: any[], depth = 0): any[] => {
        const result: any[] = [];

        items.forEach((item) => {
          const flatItem = { ...item, _depth: depth };
          result.push(flatItem);

          const children = item.children || item.subRows;
          if (children && Array.isArray(children) && children.length > 0) {
            result.push(...flatten(children, depth + 1));
          }
        });

        return result;
      };

      return flatten(data);
    }, [data, flattenSubRows]);

    // useGridTable 훅 사용
    const { table, lastPinnedColumnId } = useGridTable({
      data: flattenData,
      columns,
      rowId,
      multiple,
      pagination,
      columnGrouping,
      columnPinning,
      clientSideFiltering,
      clientSideSorting,
      onStateChange,
      onRowSelect,
      onRowsSelect,
      onChange,
      autoSelectFirstRow,
      tableMode,
      hideRowSelectionRadioBox, // props로 전달
      hideRowSelectionCheckBox, // props로 전달
      showNumberingColumn, // props로 전달
      onTableInstanceChange, // table 인스턴스 전달 콜백
      showExpandColumn,
    });

    // 부모 컴포넌트에서 grid 특정 기능 수행시 필요
    useImperativeHandle(ref, () => ({
      resetRowSelection: () => {
        table.toggleAllRowsSelected(false); // table 인스턴스 사용
      },
      selectRowById: (idField: string, idValue: string) => {
        const row = table
          .getRowModel()
          .rows.find(({ original }: any) => original?.[idField] === idValue);
        if (row) {
          table.setRowSelection({ [row.id]: true }); // table 인스턴스 사용
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

    const gridClass = useMemo(
      () =>
        cn(
          className,
          tableMode ? styles.table : styles.grid,
          multiple && !hideRowSelectionCheckBox && styles.has_select_all_checkbox,
          tableMode ? 'table' : 'grid',
          tableMode && styles[variant],
          tableMode && variant,
        ),
      [className, tableMode, multiple, hideRowSelectionCheckBox, variant],
    );

    const gridStyle = useMemo(
      () =>
        ({
          maxHeight: visibleRowCount * rowHeight + table.getHeaderGroups().length * 41 + 16,
        }) as CSSProperties,
      [visibleRowCount, rowHeight, table, data?.length],
    );

    const tableStyle = useMemo(
      () =>
        ({
          width: '100%',
          tableLayout: 'fixed',
        }) as CSSProperties,
      [],
    );

    // console.log('grid.tsx', { data });

    return (
      <div
        className={cn(gridClass, !data?.length && styles.no_data)}
        style={gridStyle}
        ref={tableContainerRef}
      >
        <table style={tableStyle}>
          {!hideHeader && <GridHeader table={table} lastPinnedColumnId={lastPinnedColumnId} />}
          {!isLoading && (
            <GridBody
              table={table}
              lastPinnedColumnId={lastPinnedColumnId}
              disabledSelectionToggle={disabledSelectionToggle}
              onRowDoubleClick={onRowDoubleClick}
            />
          )}
          {isLoading && <GridLoading table={table} />}
        </table>
        {!data?.length && <GridEmptyMessage emptyMessage={emptyMessage} />}
      </div>
    );
  },
);

export const Grid = GridComponent;

const GridEmptyMessage = ({ emptyMessage }: any) => {
  const { t } = useTranslation();
  return (
    <div className={styles.empty_message_container}>
      <p className={styles.empty_message}>
        {emptyMessage || t('LABEL.grid.emptyText', '조회 결과가 없습니다.')}
      </p>
    </div>
  );
};

const GridLoading = ({ table }: any) => {
  return (
    <tbody>
      <tr>
        <td colSpan={table.getAllColumns().length} style={{ textAlign: 'center' }}>
          Loading...
        </td>
      </tr>
    </tbody>
  );
};
