import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
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
import { Checkbox } from '../checkbox/checkbox';

interface ShuttleGridToChipsProps {
  columns: ColumnDef<any, unknown>[];
  gridData: any[];
  selectedItems: SelectedChip[];
  handleSelectItem: (node: SelectedChip) => void;
  cancelSelectItem: (deleteKey: string) => void;
  cancelAll: () => void;
  sourceTitle: string;
  targetTitle: string;
  isShowConditionSettingsMode?: boolean;
}
const COMBINED_KEY = '&&';
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
    isShowConditionSettingsMode: isShowConditionSettingsModeProp = false,
  }: ShuttleGridToChipsProps,
  ref: React.Ref<ShuttleGridToChipsImperative>,
) => {
  const isShowConditionSettingsMode = useMemo<boolean>(() => {
    if (!isShowConditionSettingsModeProp) return false;
    return (
      selectedItems.reduce((acc, { key }) => acc + (key.includes(COMBINED_KEY) ? 0 : 1), 0) > 1
    );
  }, [selectedItems, isShowConditionSettingsModeProp]);
  const [isConditionSettingsMode, setIsConditionSettingsMode] = useState<boolean>(false);
  const [checkedValues, setCheckedValues] = useState<SelectedChip[]>([]);
  const isCombinedNodeKeys = useMemo<string[]>(
    () =>
      selectedItems
        .filter(({ key }) => key.includes(COMBINED_KEY))
        .reduce((acc, { key }) => acc.concat(key.split(COMBINED_KEY)), [] as string[]),
    [selectedItems],
  );

  const on = (newValue: SelectedChip) => {
    setCheckedValues((prev) =>
      prev.some(({ key }) => key === newValue.key) ? prev : [...prev, newValue],
    );
  };

  const off = (deleteKey: string) => {
    setCheckedValues((prev) => prev.filter(({ key }) => key !== deleteKey));
  };

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
              disabled={isCombinedNodeKeys.some((combinedKey) => combinedKey === key)}
              size={'xs'}
              onClick={() => handleSelectItem({ id, key, fullPath })}
            />
          </div>
        );
      },
    },
  ];

  const handleRemoveItem = (deleteKey: string) => {
    cancelSelectItem(deleteKey);
  };

  const removeAll = () => {
    cancelAll();
  };

  const applyConditionSetting = () => {
    if (checkedValues.length > 1) {
      const newKey: SelectedChip = {
        key: checkedValues.map(({ key }) => key).join(COMBINED_KEY),
        fullPath: checkedValues.map(({ fullPath }) => fullPath).join(' & '),
        ids: checkedValues.map(({ id }) => id!),
      };
      handleSelectItem(newKey);
      checkedValues.forEach(({ key: deleteKey }) => cancelSelectItem(deleteKey));
    }
    handleSetIsConditionSettingsMode(false);
  };

  const handleSetIsConditionSettingsMode = (value: boolean) => {
    if (!value) {
      setIsConditionSettingsMode(false);
      setCheckedValues([]);
    }
    setIsConditionSettingsMode(value);
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
            {isShowConditionSettingsMode &&
              (isConditionSettingsMode ? (
                <Button
                  variant="text"
                  size="sm"
                  className={layoutStyles.btn_text}
                  onClick={applyConditionSetting}
                >
                  {'조건적용'}
                </Button>
              ) : (
                <Button
                  variant="text"
                  size="sm"
                  className={layoutStyles.btn_text}
                  onClick={() => handleSetIsConditionSettingsMode(true)}
                >
                  {'조건설정'}
                </Button>
              ))}
            <Button variant="text" size="sm" className={layoutStyles.btn_text} onClick={removeAll}>
              {'전체삭제'}
            </Button>
          </div>
        </div>
        <div className={styles.data_wrap}>
          {selectedItems.length === 0 ? (
            <div className={styles.no_data}>{'선택한 데이터가 없습니다.'}</div>
          ) : (
            selectedItems.map((item) => (
              <div key={item.key} className={styles.selected_item}>
                <div className="flex items-center gap-2">
                  {isConditionSettingsMode && (
                    <Checkbox
                      checked={checkedValues.some(({ key }) => key === item.key)}
                      onCheckedChange={(checked) => {
                        checked ? on(item) : off(item.key);
                      }}
                      disabled={item?.key.includes(COMBINED_KEY)}
                    />
                  )}
                  <HighlightAmpersand text={item.fullPath} />
                </div>
                <Button className={styles.btn_close}>
                  <IcoXclose
                    width={20}
                    height={20}
                    stroke="#131C30"
                    onClick={() => handleRemoveItem(item.key)}
                  />
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

interface HighlightAmpersandProps {
  text: string;
}

const HighlightAmpersand: React.FC<HighlightAmpersandProps> = ({ text }) => {
  return (
    <span>
      {text.split('').map((char, index) =>
        char === '&' ? (
          <span key={index} className="text-[#00AFD5]">
            {char}
          </span>
        ) : (
          <span key={index}>{char}</span>
        ),
      )}
    </span>
  );
};
