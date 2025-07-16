import { useMemo, useState } from 'react';
import { Button } from '../button/button';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import styles from './tree.module.css'; // Tree module CSS
import { cn } from '@learnway/shared';
import { IcoXclose, IcoNarrowRight } from '@learnway/icons';
import { Checkbox } from '../checkbox/checkbox';
import { t } from 'i18next';
import { FormSubTitle } from '../base-form/form-sub-title';
import { TreeBox } from '../tree-view/tree-box';
import { TreeData, TreeNode } from '../tree-view/type';
import { SelectedChip } from '../type';

type ShuttleTreeToChipsV2Props = {
  treeData: TreeData[];
  selectedItems: SelectedChip[];
  handleSelectItem: (node: SelectedChip) => void;
  cancelSelectItem: (node: SelectedChip) => void;
  cancelAll: () => void;
  sourceTitle: string;
  targetTitle: string;
  isShowConditionSettingsMode?: boolean;
};

export const ShuttleTreeToChipsV2 = ({
  treeData,
  selectedItems,
  handleSelectItem,
  cancelSelectItem,
  cancelAll,
  sourceTitle,
  targetTitle,
  isShowConditionSettingsMode: isShowConditionSettingsModeProp = false,
}: ShuttleTreeToChipsV2Props) => {
  const isShowConditionSettingsMode = useMemo(() => {
    if (!isShowConditionSettingsModeProp) return false;
    // return selectedItems.filter(({ isCombined }) => !isCombined).length > 1;
  }, [selectedItems, isShowConditionSettingsModeProp]);

  const treeBoxSelectedItems = useMemo(() => selectedItems.map(({ key }) => key), [selectedItems]);

  const [isConditionSettingsMode, setIsConditionSettingsMode] = useState<boolean>(false);

  // const isCombinedNodeKeys = useMemo<string[][]>(
  //   () => selectedItems.filter(({ isCombined }) => isCombined).map(({ keys }) => keys),
  //   [selectedItems],
  // );

  const [checkedValues, setCheckedValues] = useState<TreeNode[]>([]);

  const on = (newValue: TreeNode) => {
    setCheckedValues((prev) =>
      prev.some(({ key }) => key === newValue.key) ? prev : [...prev, newValue],
    );
  };

  const off = (newValue: TreeNode) => {
    setCheckedValues((prev) => prev.filter(({ key }) => key !== newValue.key));
  };

  const handleSetIsConditionSettingsMode = (value: boolean) => {
    if (!value) {
      setIsConditionSettingsMode(false);
      setCheckedValues([]);
    }
    setIsConditionSettingsMode(value);
  };

  const applyConditionSetting = () => {
    // if (checkedValues.length > 1) {
    //   const newKey = {
    //     isCombined: true,
    //     // ids: checkedValues.map(({ id }) => id),
    //     key: checkedValues.map(({ key }) => key).join('&&'),
    //     // keys: checkedValues.map(({ key }) => key),
    //     fullPath: checkedValues.map(({ fullPath }) => fullPath).join(' & '),
    //   };
    //   handleSelectItem(newKey);
    //   checkedValues.forEach((checkedValue) => handleSelectItem(checkedValue));
    // }
    // handleSetIsConditionSettingsMode(false);
  };

  const handleCancel = (deleteItem: TreeData) => {
    off(deleteItem);
    cancelSelectItem(deleteItem);
  };

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.pop_layout)}>
      <div className={layoutStyles.inner}>
        <TreeBox
          treeId={'ShuttleListTree'}
          data={treeData}
          type="SHUTTLE_LIST"
          title={sourceTitle}
          initLevel={2}
          selectedNode={null}
          showSearchKeyword={true}
          selectedItems={treeBoxSelectedItems}
          renderNodeButtons={(node) => {
            const isAlreadySelected = selectedItems.some((item) => item.key === node.key);
            if (node.id)
              return (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectItem(node as TreeData);
                  }}
                  // disabled={isCombinedNodeKeys.some((keys) => keys.includes(node.key))}
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
              <Button
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                onClick={cancelAll}
              >
                {t('LABEL.button.deleteAll')}
              </Button>
            </>
          }
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
                      checked={checkedValues.some(({ key }) => key === item.key)}
                      onCheckedChange={(checked) => {
                        checked ? on(item) : off(item);
                      }}
                      // disabled={item?.isCombined}
                    />
                  )}
                  <HighlightAmpersand text={item.fullPath} />
                </div>
                <Button className={styles.btn_close}>
                  <IcoXclose
                    width={20}
                    height={20}
                    stroke="#131C30"
                    onClick={() => handleCancel(item)}
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
