import { useCoursePackageDetailPackageInfo } from '@features/learning-operate/course-package/hooks/use-course-package-detail-package-info';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { SplitPanel } from '@learnway/ui/elements';
import { useModal } from '@learnway/ui/modal';
import { TreeBox, TreeContainer, TreeNode } from '@learnway/ui/tree-view';
import { useTranslation } from 'react-i18next';

const PackageInfoComponent = () => {
  const { t } = useTranslation();
  const { alert, openModal } = useModal();

  const { provider, getValues, onFormChange, treeData } = useCoursePackageDetailPackageInfo();

  return (
    <form>
      {/*패키지 구성*/}
      <FormSubTitle
        label={t('패키지 구성')}
        actionNode={
          <Button
            variant="text"
            size="sm"
            className="link"
            label={t('LABEL.grid.column.preview')}
            stopPropagation
            onClick={() => {
              alert('패키지 상세 페이지 이동');
            }}
          />
        }
      />
      <SplitPanel size={['auto']} divider>
        <div>
          {/*목차*/}
          <TreeContainer>
            <TreeBox
              title={t('목차')}
              data={treeData}
              treeId={'course-package-tree'}
              //   expandedKeys={expandedKeys}
              //   onExpandedKeysChange={handleExpandChange}
              //   renderNodeButtons={renderNodeButtons}
              //   onAction={handleTreeAction}
              type={'DRAG_DROP'}
              //   selectedNode={selectedNode}
              initLevel={2}
              //   handleSelectedNodeChange={handleSelectedNodeChange}
              //   customDropValidator={customDropValidator}
              maxDepth={5}
              isSelectableNode={(node: TreeNode) => {
                return node && node.level !== 0;
              }}
              isLoading={true}
              clientTree={true}
              disableOptimisticUpdate={false} // 클라이언트 트리에서는 낙관적 업데이트 사용
            />
          </TreeContainer>
        </div>
        <div>
          {/*상세정보*/}
          <FormSubTitle label={t('상세정보')} />
        </div>
      </SplitPanel>
    </form>
  );
};

export const PackageInfo = PackageInfoComponent;
