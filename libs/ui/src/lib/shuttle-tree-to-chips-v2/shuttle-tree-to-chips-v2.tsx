import { useEffect, useMemo, useState } from 'react';
import { Button } from '../button/button';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import styles from './tree.module.css'; // Tree module CSS
import { cn } from '@learnway/shared';
import { IcoXclose, IcoNarrowRight } from '@learnway/icons';
import { Checkbox } from '../checkbox/checkbox';
import { t } from 'i18next';
import { FormSubTitle } from '../base-form/form-sub-title';
import { TreeBox } from '../tree-view/tree-box';
import { TreeNode } from '../tree-view/type';

type ShuttleTreeToChipsV2Props = {
  treeData: TreeNode[];
  selectedKey: string;
  selectedItems: TreeNode[];
  handleSelectItem: (node: TreeNode) => void;
  sourceTitle: string;
  targetTitle: string;
};

export const ShuttleTreeToChipsV2 = ({
  treeData,
  selectedKey,
  selectedItems,
  handleSelectItem,
  sourceTitle,
  targetTitle,
}: ShuttleTreeToChipsV2Props) => {
  const isShowConditionSettingsMode = useMemo(() => selectedItems.length > 1, [selectedItems]);

  const treeBoxSelectedItems = useMemo(() => selectedItems.map(({ key }) => key), [selectedItems]);

  const [isConditionSettingsMode, setIsConditionSettingsMode] = useState<boolean>(false);

  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const on = (value: string) => {
    setCheckedValues((prev) => (prev.includes(value) ? prev : [...prev, value]));
  };

  const off = (value: string) => {
    setCheckedValues((prev) => prev.filter((v) => v !== value));
  };

  const handleSetIsConditionSettingsMode = (value: boolean) => {
    setIsConditionSettingsMode(value);
  };

  useEffect(() => {
    if (!isShowConditionSettingsMode) {
      setIsConditionSettingsMode(false);
    }
  }, [isShowConditionSettingsMode]);

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.pop_layout)}>
      <div className={layoutStyles.inner}>
        <TreeBox
          data={treeData}
          type="SHUTTLE_LIST"
          title={sourceTitle}
          initLevel={2}
          selectedNode={null}
          showSearchKeyword={true}
          selectedItems={treeBoxSelectedItems}
          renderNodeButtons={(node: TreeNode) => {
            const isAlreadySelected = selectedItems.some((item) => item.key === node.key);
            return (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectItem(node);
                }}
                variant={isAlreadySelected ? 'primary' : 'gray2'}
                size={'ts'}
                type={'button'}
                className={styles.btn_select}
              >
                {t('LABEL.button.select')}
              </Button>
            );
          }}
        />
      </div>
      <div className={layoutStyles.transfer_arrow}>
        <IcoNarrowRight width={24} height={24} stroke={'#C8d2e5'} />
      </div>
      <div className={layoutStyles.inner}>
        <FormSubTitle
          label={targetTitle}
          actionNode={
            <>
              {isShowConditionSettingsMode &&
                (isConditionSettingsMode ? (
                  <Button
                    variant="text"
                    size="sm"
                    className={layoutStyles.btn_text}
                    onClick={() => handleSetIsConditionSettingsMode(false)}
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
              <Button variant="text" size="sm" className={layoutStyles.btn_text}>
                {t('LABEL.button.deleteAll')}
              </Button>
            </>
          }
          underLine={true}
        />
        <div className={styles.data_wrap}>
          {selectedItems.length === 0 ? (
            <div className={styles.no_data}>{t('LABEL.noData', { type: t('LABEL.selected') })}</div>
          ) : (
            selectedItems.map((item) => (
              <div key={item.key} className={styles.selected_item}>
                <div className="flex items-center gap-2">
                  {isConditionSettingsMode && (
                    <Checkbox
                      checked={checkedValues.includes(item.key)}
                      onCheckedChange={(checked) => {
                        checked ? on(item.key) : off(item.key);
                      }}
                    />
                  )}
                  {/* fullPath 대신 특정 속성? 값을 갖고오는 로직 추가 필요한 것 같음. */}
                  <span className={styles.selected_text}>{item[selectedKey]}</span>
                </div>
                <Button className={styles.btn_close}>
                  <IcoXclose
                    width={20}
                    height={20}
                    stroke="#131C30"
                    onClick={() => handleSelectItem(item)}
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
