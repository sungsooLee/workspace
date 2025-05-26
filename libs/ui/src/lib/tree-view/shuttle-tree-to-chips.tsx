import type { TreeNode, TreeProps } from './type';
import { useState } from 'react';
import { Button } from '../button/button';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import styles from './tree.module.css'; // Tree module CSS
import { cn } from '@learnway/shared';
import { TreeView } from './tree';
import { IcoXclose, IcoNarrowRight } from '@learnway/icons';
import { TreeBox } from './tree-box';

type Props = Pick<TreeProps, 'onCustomNodeClick' | 'treeId' | 'searchKeyword'> & {
  sourceTitle?: string;
  targetTitle?: string;
  title?: string;
  selectedItems: any[]; // 추후 수정 필요 현재 key, FullPath만 받아서 필요한 정보 못 갖고옴.
  sourceData: any;
  onItemsChange: (newItems: { key: string; fullPath: string }[]) => void;
};

export const ShuttleTreeToChips = ({
  title,
  sourceData,
  selectedItems,
  onItemsChange,
  searchKeyword,
  onCustomNodeClick,
  sourceTitle,
  targetTitle,
  ...otherProps
}: Props) => {
  // 내부 상태 관리 (필요한 경우)
  const [internalSelectedItems, setInternalSelectedItems] = useState(selectedItems || []);
  const [expandSource, setExpandSource] = useState<boolean>(true);

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

    // 이미 선택된 항목 필터링
    const filteredNodesToAdd = nodesToAdd.filter(
      (n) => !actualSelectedItems.some((item) => item.key === n.key),
    );

    // 새 항목 추가
    const newItems = [...actualSelectedItems, ...filteredNodesToAdd];
    setInternalSelectedItems(newItems);
    onItemsChange?.(newItems);
  };

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
          renderNodeButtons={(node: any) => {
            const isAlreadySelected = actualSelectedItems.some((item) => item.key === node.key);
            return (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectItem(node);
                }}
                disabled={isAlreadySelected}
                variant="gray2"
                size={'ts'}
                type={'button'}
                className={styles.btn_select}
              >
                선택
              </Button>
            );
          }}
          shouldDisableClick={(node: TreeNode, level: number) => node.apiNodeType === 'FOLDER'}
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
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={handleRemoveAllItem}
            >
              {'전체삭제'}
            </Button>
          </div>
        </div>
        <div className={styles.data_wrap}>
          {actualSelectedItems.length === 0 ? (
            <div className={styles.no_data}>{'선택한 데이터가 없습니다.'}</div>
          ) : (
            actualSelectedItems.map((item) => (
              <div key={item.key} className={styles.selected_item}>
                <span className={styles.selected_text}>{item.fullPath}</span>
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
