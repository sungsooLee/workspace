import type { TreeNode, TreeProps } from './type';
import { useMemo, useState } from 'react';
import { Button } from '../button/button';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import styles from './tree.module.css'; // Tree module CSS
import { cn } from '@learnway/shared';
import { TreeView } from './tree';
import { IcoXclose, IcoNarrowRight } from '@learnway/icons';
import { TreeBox } from './tree-box';
import { Checkbox } from '../checkbox/checkbox';
import { CountText } from '../elements/count-text/count-text';
import { t } from 'i18next';

type Props = Pick<TreeProps, 'onCustomNodeClick' | 'treeId' | 'searchKeyword'> & {
  sourceTitle?: string;
  targetTitle?: string;
  title?: string;
  showConditionSettings?: boolean;
  selectedItems: any[]; // 추후 수정 필요 현재 key, FullPath만 받아서 필요한 정보 못 갖고옴.
  sourceData: any;
  initLevel?: number; // 처음 펼쳐지는 Depth
  displayKey?: string; // 칩에서 보여줄 키명(속성)
  renderChipContent?: (item: any) => React.ReactNode; // 커스텀 렌더링 함수
  onItemsChange: (newItems: { key: string; fullPath: string }[]) => void;
  isSelectableNode?: (node: TreeNode) => boolean;
  selectableNodeType?: string;
};

export const ShuttleTreeToChips = ({
  sourceTitle,
  targetTitle,
  title,
  showConditionSettings = false,
  sourceData,
  selectedItems,
  onItemsChange,
  searchKeyword,
  onCustomNodeClick,
  initLevel,
  displayKey = 'fullPath', // 기본값 설정
  renderChipContent,
  isSelectableNode,
  selectableNodeType,
  ...otherProps
}: Props) => {
  // 내부 상태 관리 (필요한 경우)
  const [internalSelectedItems, setInternalSelectedItems] = useState(selectedItems || []);
  const [expandSource, setExpandSource] = useState<boolean>(true);

  const [isConditionSettingsMode, setIsConditionSettingsMode] = useState<boolean>(false);

  const handleSetIsConditionSettingsMode = (value: boolean) => {
    setIsConditionSettingsMode(value);
  };

  // 실제 사용할 선택 항목들 (외부 제어 또는 내부 상태)
  const actualSelectedItems = selectedItems || internalSelectedItems;

  // 항목 제거 핸들러
  const handleRemoveItem = (item: TreeNode) => {
    const newItems = actualSelectedItems.filter((i) => i.key !== item.key);
    setInternalSelectedItems(newItems);
    onItemsChange?.(newItems);
  };

  const handleRemoveAllItem = () => {
    setInternalSelectedItems([]);
    onItemsChange?.([]);
  };

  const canSelectNode = (node: TreeNode): boolean => {
    if (isSelectableNode) {
      return isSelectableNode(node);
    }

    return true;
  };

  const flattenNodeWithChildren = (node: TreeNode) => {
    let nodes = [node];

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        nodes = [...nodes, ...flattenNodeWithChildren(child)];
      });
    }

    return nodes;
  };

  // 선택 핸들러에서 사용
  const handleSelectItem = (node: TreeNode, includeChildren = true) => {
    let nodesToAdd = [node];

    // 하위 항목 포함 옵션이 켜져 있으면 모든 하위 항목 추가
    if (includeChildren && node.children && node.children.length > 0) {
      nodesToAdd = flattenNodeWithChildren(node);
    }

    const selectableNodes = nodesToAdd.filter(canSelectNode);

    // 이미 선택된 항목 필터링
    const filteredNodesToAdd = selectableNodes.filter(
      (n) => !actualSelectedItems.some((item) => item.key === n.key),
    );

    const newItems = [...actualSelectedItems, ...filteredNodesToAdd];
    setInternalSelectedItems(newItems);
    onItemsChange?.(newItems);
  };

  const renderChipText = (item: any) => {
    if (renderChipContent) {
      return renderChipContent(item);
    }

    return item[displayKey] || item.key;
  };

  const selectedItemKeys = useMemo(() => {
    return actualSelectedItems.map((item) => item.key);
  }, [actualSelectedItems]);

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.pop_layout)}>
      <div className={layoutStyles.inner}>
        <TreeBox
          data={sourceData}
          type="SHUTTLE_LIST"
          title={sourceTitle || title}
          searchKeyword={searchKeyword}
          expandTrigger={expandSource}
          onCustomNodeClick={onCustomNodeClick}
          showSearchKeyword={true}
          initLevel={initLevel}
          selectedItems={selectedItemKeys}
          renderNodeButtons={(node: any) => {
            const isAlreadySelected = actualSelectedItems.some((item) => item.key === node.key);
            return (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectItem(node);
                }}
                // disabled={isAlreadySelected}
                variant={isAlreadySelected ? 'primary' : 'gray2'}
                size={'ts'}
                type={'button'}
                className={styles.btn_select}
              >
                {t('LABEL.button.select')}
              </Button>
            );
          }}
          shouldDisableClick={(node: TreeNode, level: number) => node.apiNodeType === 'FOLDER'}
          showTotalCount={true}
          {...otherProps}
        />
      </div>
      <div className={layoutStyles.transfer_arrow}>
        <IcoNarrowRight width={24} height={24} stroke={'#C8d2e5'} />
      </div>
      <div className={layoutStyles.inner}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{targetTitle || title}</h3>
          <div className={layoutStyles.btn_wrap}>
            {showConditionSettings &&
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
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={handleRemoveAllItem}
            >
              {t('LABEL.button.deleteAll')}
            </Button>
          </div>
        </div>
        <div className={styles.data_wrap}>
          {actualSelectedItems.length === 0 ? (
            <div className={styles.no_data}>{t('LABEL.noData', { type: t('LABEL.selected') })}</div>
          ) : (
            actualSelectedItems.map((item) => (
              <div key={item.key} className={styles.selected_item}>
                <div className="flex items-center gap-2">
                  {isConditionSettingsMode && (
                    <Checkbox
                      checked={false}
                      onCheckedChange={(checked) => {
                        console.log();
                      }}
                    />
                  )}
                  {/* fullPath 대신 특정 속성? 값을 갖고오는 로직 추가 필요한 것 같음. */}
                  <span className={styles.selected_text}>{renderChipText(item)}</span>
                </div>
                <Button onClick={() => handleRemoveItem(item)} className={styles.btn_close}>
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
