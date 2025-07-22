import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '@learnway/shared';
import styles from './shuttle-grid-to-chips.module.css';
import { Button } from '../button/button';
import { ColumnDef, Table } from '@tanstack/react-table';
import { IcoNarrowRight, IcoXclose } from '@learnway/icons';
import { GridBox } from '../grid/grid-box/grid-box';
import { GridImperative } from '../grid/types';
import { useTranslation } from 'react-i18next';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { SelectedChip } from '../type';

interface ShuttleGridToChipsProps {
  columns: ColumnDef<any, unknown>[];
  gridData: any[];
  selectedItems: SelectedChip[];
  handleSelectItem: (node: SelectedChip) => void;
  cancelSelectItem: (node: SelectedChip) => void;
  cancelAll: () => void;
  sourceTitle: string;
  targetTitle: string;
}

export interface ShuttleGridToChipsImperative {
  resetSelection: () => void;
}

const ShuttleGridToChipsComponent = (
  {
    columns,
    gridData,
    selectedItems,
    handleSelectItem,
    cancelSelectItem,
    cancelAll,
    sourceTitle,
    targetTitle,
  }: ShuttleGridToChipsProps,
  ref: React.Ref<ShuttleGridToChipsImperative>,
) => {
  const { t } = useTranslation();
  const leftGridRef = useRef<GridImperative>(null);

  const [leftTableInstance, setLeftTableInstance] = useState<Table<any>>();

  useImperativeHandle(ref, () => ({
    resetSelection: () => {
      leftTableInstance?.setRowSelection({});
    },
  }));

  const leftGridColumns: ColumnDef<any, unknown>[] = [
    ...columns,
    {
      accessorKey: 'select-col',
      header: () => t('선택'),
      size: 94,
      meta: {
        headerAlign: 'left',
        cellAlign: 'center',
      },
      cell: ({ row }) => {
        const { id, key, fullPath } = row?.original || {};
        return (
          <div className={styles.btn_select}>
            <Button
              label={t('선택')}
              variant={
                selectedItems.find(({ key: selectedKey }) => selectedKey === key)
                  ? 'primary'
                  : 'gray2'
              }
              className={
                selectedItems.find(({ key: selectedKey }) => selectedKey === key)
                  ? styles.active
                  : ''
              }
              size={'xs'}
              onClick={() => handleSelectItem({ id, key, fullPath })}
            />
          </div>
        );
      },
    },
  ];

  const handleRemoveItem = (node: SelectedChip) => {
    cancelSelectItem(node);
    leftTableInstance?.setRowSelection({});
  };

  const removeAll = () => {
    leftTableInstance?.setRowSelection({});
    cancelAll();
  };

  return (
    <div className={cn(styles.start, styles.transfer_grid, 'nlp--shuttle-grid-to-grid')}>
      <div className={styles.grid_wrap}>
        <GridBox
          ref={leftGridRef}
          title={sourceTitle}
          data={gridData}
          columns={leftGridColumns}
          multiple
          disabledSelectionToggle
          hideRowSelectionCheckBox={true}
          onTableInstanceChange={(table) => setLeftTableInstance(table)}
        />
      </div>
      <div className={styles.icon_arrow}>
        <IcoNarrowRight width={24} height={24} stroke={'#B5C2D7'} />
      </div>
      <div className={styles.grid_wrap}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{targetTitle}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} onClick={removeAll}>
              {'전체삭제'}
            </Button>
          </div>
        </div>
        <div className={styles.data_wrap}>
          {selectedItems.length === 0 ? (
            <div className={styles.no_data}>{'선택한 데이터가 없습니다.'}</div>
          ) : (
            selectedItems.map((selectedItem) => (
              <div key={selectedItem.key} className={styles.selected_item}>
                <div>
                  <span className={styles.selected_text}>{selectedItem.fullPath}</span>
                </div>
                <Button onClick={() => handleRemoveItem(selectedItem)} className={styles.btn_close}>
                  <IcoXclose width={20} height={20} stroke="#131C30" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const ShuttleGridToChips = forwardRef(ShuttleGridToChipsComponent);
