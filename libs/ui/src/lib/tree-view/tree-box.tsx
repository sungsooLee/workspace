import { useEffect, useState } from 'react';
import { cn } from '@learnway/shared';

import { TreeView } from './tree';
import { getAllKeysByTree, getKeysByLevel } from './tree.service';
import { TreeContainer } from './tree.context';

import { Button } from '../button/button';
import { Input } from '../input/input';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
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
    ...props
  }: any,
  // ref: React.Ref
) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  // 컴포넌트 마운트 시 initLevel prop으로 내려준 레벨로 펼침 상태 설정
  useEffect(() => {
    if (data && initLevel) {
      const initialExpandedKeys = getKeysByLevel(data, initLevel);
      setExpandedKeys(initialExpandedKeys);
    }
  }, [data, initLevel]);
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
                    // handleExpandChange(allKeys);
                  }
                }}
              >
                {'전체펼침'}
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
                {'전체닫기'}
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
          />
        </TreeContainer>
      </div>
    </div>
  );
};

export const TreeBox = TreeBoxComponent;
