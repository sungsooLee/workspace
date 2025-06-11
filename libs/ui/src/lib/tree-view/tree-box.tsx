import { useEffect, useState } from 'react';
import { cn } from '@learnway/shared';
import { t } from 'i18next';
import { TreeView } from './tree';
import { getAllKeysByTree, getKeysByLevel } from './tree.service';
import { TreeContainer } from './tree.context';

import { Button } from '../button/button';
import { Input } from '../input/input';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import subTitleStyles from '@learnway/styles/bo/assets/styles/modules/form-sub-title.module.css';
import { CountText } from '../elements/count-text/count-text';

const TreeBoxComponent = <T extends object>(
  {
    treeId,
    data,
    showSearchKeyword,
    initLevel = 1,
    onAction,
    closeLevel,
    clientTree,
    title,
    renderNodeButtons,
    handleSelectedNodeChange,
    type,
    customButtonNode,
    selectedNode,
    expandedKeys: externalExpandedKeys, //외부에서 전달받은 expandedKeys
    onExpandedKeysChange,
    onCustomNodeClick,
    shouldDisableClick,
    showTotalCount,
    selectedItems,
    sourceTreeId,
    maxDepth,
    isSelectableNode,
    ...props
  }: any,
  // ref: React.Ref
) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>([]);

  const hasExternalKeys = externalExpandedKeys !== undefined && externalExpandedKeys !== null;
  const treeDataLength = getAllKeysByTree(data);

  // 실제 사용할 expandedKeys 결정
  const expandedKeys = hasExternalKeys ? externalExpandedKeys : internalExpandedKeys;

  const handleExpandedKeysChange = (keys: string[]) => {
    if (onExpandedKeysChange && hasExternalKeys) {
      // 외부 제어 모드
      onExpandedKeysChange(keys);
    } else {
      // 내부 제어 모드
      setInternalExpandedKeys(keys);
    }
  };

  const [isInitialized, setIsInitialized] = useState(false);

  // 컴포넌트 마운트 시 초기 한 번만 initLevel prop으로 내려준 레벨로 펼침 상태 설정
  useEffect(() => {
    // 이미 초기화되었거나 외부 키가 제공된 경우 초기화 건너뛰기
    if (isInitialized) {
      return;
    }

    if (data && Array.isArray(data) && data.length > 0 && initLevel !== undefined) {
      const initialExpandedKeys = getKeysByLevel(data, initLevel);
      console.log(initialExpandedKeys);
      if (initialExpandedKeys && initialExpandedKeys.length > 0) {
        // 외부 제어 모드
        if (hasExternalKeys) {
          if (!externalExpandedKeys || externalExpandedKeys.length === 0) {
            onExpandedKeysChange?.(initialExpandedKeys);
          }
        } else {
          // 내부 제어 모드
          setInternalExpandedKeys(initialExpandedKeys);
        }

        setIsInitialized(true);
      }
    }
  }, [data, initLevel, isInitialized, hasExternalKeys]);

  // 버튼 핸들러
  const handleExpandAll = () => {
    if (data) {
      const allKeys = getAllKeysByTree(data);
      handleExpandedKeysChange(allKeys);
    }
  };

  const handleCollapseToLevel = () => {
    const closeLevelKeys = getKeysByLevel(data, closeLevel ?? 1);
    handleExpandedKeysChange(closeLevelKeys || []);
  };

  return (
    <div className={cn(styles.auth_wrap)}>
      <div
        className={cn(
          subTitleStyles.root,
          subTitleStyles.title_wrap,
          'title_wrap',
          subTitleStyles.line,
        )}
      >
        <div className={subTitleStyles.title_area}>
          <strong className={subTitleStyles.title}>{title}</strong>
          {/* {showTotalCount && (
            <CountText
              label={t('LABEL.grid.header.all', '전체')}
              count={treeDataLength.length - 1 || 0}
            />
          )} */}
        </div>
        <div className={subTitleStyles.input_area}>
          {customButtonNode ? (
            <>{customButtonNode}</>
          ) : (
            <>
              {showSearchKeyword && (
                <Input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="검색"
                  showSearchIcon={true}
                  searchIconType={'search'}
                />
              )}
              <Button
                variant="text"
                size="sm"
                className={'btn_text'}
                onClick={() => {
                  if (data) {
                    handleExpandAll();
                  }
                }}
              >
                {t('LABEL.tree.expand')}
              </Button>
              <Button
                variant="text"
                size="sm"
                className={'btn_text'}
                onClick={() => {
                  handleCollapseToLevel();
                }}
              >
                {t('LABEL.tree.closed')}
              </Button>
            </>
          )}
        </div>
      </div>
      <div className={layoutStyles.inner_contents}>
        <TreeContainer>
          <TreeView
            data={data ?? []}
            treeId={treeId}
            searchKeyword={searchKeyword}
            expandedKeys={expandedKeys}
            onExpandedKeysChange={handleExpandedKeysChange}
            nodeButtons={renderNodeButtons}
            onAction={onAction}
            type={type}
            clientTree={clientTree}
            onSelectedNodeChange={handleSelectedNodeChange}
            selectedNode={selectedNode}
            onCustomNodeClick={onCustomNodeClick}
            shouldDisableClick={shouldDisableClick}
            selectedItems={selectedItems}
            sourceTreeId={sourceTreeId}
            maxDepth={maxDepth}
            isSelectableNode={isSelectableNode}
            // {...props}
          />
        </TreeContainer>
      </div>
    </div>
  );
};

export const TreeBox = TreeBoxComponent;
