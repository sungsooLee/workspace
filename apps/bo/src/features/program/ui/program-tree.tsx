import { Button, TreeContainer, TreeNode, TreeView2 } from '@learnway/ui';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { cn } from '@learnway/shared';

const handleExpandAll = (treeData: TreeNode[]) => {
  const getAllKeys = (nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllKeys(node.children));
      }

      return keys;
    }, []);
  };
  return getAllKeys(treeData);
};

const ProgramTreeComponent = ({ treeData, expandedKeys, onExpandChange, menuScope }: any) => {
  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      <div className={layoutStyles.inner}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'목록'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => {
                const allKeys = handleExpandAll(treeData);
                onExpandChange(allKeys);
              }}
            >
              {'전체펼침'}
            </Button>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => onExpandChange([])}
            >
              {'전체닫기'}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <TreeContainer>
            <TreeView2
              data={treeData}
              treeId={'1'}
              // expandedKeys={expandedKeys} // 외부에서 제어되는 확장된 키
              // onExpandedKeysChange={onExpandChange} // 확장된 키 변경 콜백
              // nodeButtons={renderNodeButtons}
              // onAction={handleTreeAction}
              // type={'SAME_LEVEL_ONLY'}
              // selectedNode={selectedNode}
              // onSelectedNodeChange={handleSelectedNodeChange}
            />
          </TreeContainer>
        </div>
      </div>
      <div className={layoutStyles.inner}>
        <form>
          <div className={titleStyles.title_wrap}>
            <h3 className={titleStyles.title}>dd</h3>
            <div className={layoutStyles.btn_wrap}>
              <Button type="button" variant="text" size="sm" className={layoutStyles.btn_text}>
                초기화
              </Button>
              <Button variant="text" size="sm" className={layoutStyles.btn_text}>
                삭제
              </Button>
              <Button type="submit" variant="save" size="sm">
                저장
              </Button>
            </div>
          </div>
          <div className={layoutStyles.inner_contents}>sdfsdf</div>
        </form>
      </div>
    </div>
  );
};

export const ProgramTree = ProgramTreeComponent;
