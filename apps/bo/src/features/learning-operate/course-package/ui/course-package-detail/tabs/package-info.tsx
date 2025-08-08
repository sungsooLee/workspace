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

  const {
    provider,
    getValues,
    onFormChange,
    treeData,
    isLoading,
    expandedKeys,
    selectedNode,
    handleExpandChange,
    handleSelectedNodeChange,
    handleAddCourseNode,
  } = useCoursePackageDetailPackageInfo();
  console.log('#################treeData=>', treeData);
  console.log('expandedKeys=>', expandedKeys);

  const renderNodeButtons = (node: TreeNode, level: number) => {
    console.log('node=>', node);
    console.log('level=>', level);
    if (level === 0) {
      return (
        <div className={'gap-10px flex'}>
          <div className={'flex items-center'}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                // handleAddSubMenu(node);
              }}
              variant="gray2"
              size={'xs'}
              type={'button'}
              disabled={level !== 0}
              label={t('서브 패키지 추가')}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddCourseNode(node, level);
              }}
              variant="gray2"
              size={'xs'}
              type={'button'}
              disabled={level !== 0}
              label={t('과정 추가')}
            />
          </div>
        </div>
      );
    } else if (node.itemType === 'SUB_PKG') {
      return (
        <div className={'gap-10px flex'}>
          <div className={'flex items-center'}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddCourseNode(node, level);
              }}
              variant="gray2"
              size={'xs'}
              type={'button'}
              label={t('과정 추가')}
            />
          </div>
        </div>
      );
    }
  };

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
              expandedKeys={expandedKeys}
              onExpandedKeysChange={handleExpandChange}
              renderNodeButtons={renderNodeButtons}
              // onAction={handleTreeAction}
              type={'DRAG_DROP'}
              selectedNode={selectedNode}
              initLevel={1}
              handleSelectedNodeChange={handleSelectedNodeChange}
              //   customDropValidator={customDropValidator}
              maxDepth={5}
              isSelectableNode={(node: TreeNode) => {
                return node && node.level !== 0;
              }}
              isLoading={isLoading}
              clientTree={true}
              disableOptimisticUpdate={false} // 클라이언트 트리에서는 낙관적 업데이트 사용
            />
          </TreeContainer>
        </div>
        <div>
          {/*상세정보*/}
          <FormSubTitle label={t('상세정보')} />
          {/* <form onSubmit={onSubmit(handleOnSubmit)}> */}
          <form></form>
        </div>
      </SplitPanel>
    </form>
  );
};

export const PackageInfo = PackageInfoComponent;
