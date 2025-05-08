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

const TreeBoxComponent = <T extends object>(
  {
    treeId,
    data,
    showSearchKeyword,
    initLevel,
    onAction,
    closeLevel,
    clientTree,
    title,
    renderNodeButtons,
    handleSelectedNodeChange,
    type,
    customButtonNode,
    selectedNode,
    ...props
  }: any,
  // ref: React.Ref
) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const [isInitialized, setIsInitialized] = useState(false);

  // 컴포넌트 마운트 시 초기 한 번만 initLevel prop으로 내려준 레벨로 펼침 상태 설정
  useEffect(() => {
    if (
      data &&
      Array.isArray(data) &&
      data.length > 0 &&
      initLevel !== undefined &&
      !isInitialized
    ) {
      const initialExpandedKeys = getKeysByLevel(data, initLevel);

      if (initialExpandedKeys && initialExpandedKeys.length > 0) {
        setExpandedKeys(initialExpandedKeys);
        setIsInitialized(true);
      }
    }
  }, [data, initLevel, isInitialized]);

  return (
    <div className={cn(styles.start, styles.wrap)}>
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
                  iconType={'tree'}
                />
              )}
              <Button
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                onClick={() => {
                  if (data) {
                    const allKeys = getAllKeysByTree(data);
                    setExpandedKeys(allKeys);
                  }
                }}
              >
                {t('LABEL.tree.expand')}
              </Button>
              <Button
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                onClick={() => {
                  const closeLevelKeys = getKeysByLevel(data, closeLevel ?? 1);
                  setExpandedKeys(closeLevelKeys || []);
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
            onExpandedKeysChange={setExpandedKeys}
            nodeButtons={renderNodeButtons}
            onAction={onAction}
            type={type}
            clientTree={clientTree}
            onSelectedNodeChange={handleSelectedNodeChange}
            selectedNode={selectedNode}
          />
        </TreeContainer>
      </div>
    </div>
  );
};

export const TreeBox = TreeBoxComponent;
