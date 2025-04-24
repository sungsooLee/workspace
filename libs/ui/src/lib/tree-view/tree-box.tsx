import { TreeView } from './tree';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { TreeContainer } from './tree.context';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { useEffect, useState } from 'react';
import { TreeNode } from './type';
import { cn } from '@learnway/shared';
import { getAllKeysByTree, getKeysByLevel } from './tree.service';
import { random } from 'lodash';

const TreeBoxComponent = <T extends object>(
  { treeId, data, showSearchKeyword, initLevel, onAction, closeLevel, clientTree, ...props }: any,
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
    // <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
    <div className={layoutStyles.inner}>
      <div className={titleStyles.title_wrap}>
        <h3 className={titleStyles.title}>{'목록'}</h3>
        <div className={layoutStyles.btn_wrap}>
          {showSearchKeyword && (
            <Input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="트리 검색..."
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
            // nodeButtons={renderNodeButtons}
            onAction={onAction}
            type={'DRAG_DROP'}
            clientTree={clientTree}
            // selectedNode={selectedNode}
            // onSelectedNodeChange={handleSelectedNodeChange}
          />
        </TreeContainer>
      </div>
      {/* </div> */}
    </div>
  );
};

export const TreeBox = TreeBoxComponent;
