import {
  PACKAGE_FORM_MODE,
  PACKAGE_ITEM_TYPE,
  useCoursePackageDetailPackageInfo,
} from '@features/learning-operate/course-package/hooks/use-course-package-detail-package-info';
import { IcoMinus } from '@learnway/icons';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { SplitPanel } from '@learnway/ui/elements';
import { useModal } from '@learnway/ui/modal';
import { TreeBox, TreeContainer, TreeNode } from '@learnway/ui/tree-view';
import { useTranslation } from 'react-i18next';
import { PackageCourseForm } from './package-course-form';
import { PackageSubPkgForm } from './package-subpkg-form';

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
    clickedNode,
    renderNodeButtons,
    handleExpandChange,
    handleSelectedNodeChange,
    handleTreeAction,
    handleAddCourseNode,
    handleAddSubPkgNode,
    formMode,
    itemType,
    onSubmit,
    handleOnSubmit,
  } = useCoursePackageDetailPackageInfo();
  console.log('#################treeData=>', treeData);
  console.log('expandedKeys=>', expandedKeys);

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
              onAction={handleTreeAction}
              type={'DRAG_DROP'}
              selectedNode={selectedNode}
              initLevel={1}
              handleSelectedNodeChange={handleSelectedNodeChange}
              maxDepth={3}
              isSelectableNode={(node: TreeNode) => {
                return node && node.level !== 0;
              }}
              isLoading={isLoading}
              clientTree={true}
              disableOptimisticUpdate={false} // 클라이언트 트리에서는 낙관적 업데이트 사용
            />
          </TreeContainer>
        </div>
        <div className={layoutStyles.inner}>
          <form onSubmit={onSubmit(handleOnSubmit)}>
            <div className={titleStyles.title_wrap}>
              <h3 className={titleStyles.title}>{'상세정보'}</h3>
              <div className={layoutStyles.btn_wrap}>
                <Button
                  variant="text"
                  size="sm"
                  // disabled={formMode === FORM_MODE.NONE || formMode === FORM_MODE.ADD}
                  // onClick={handleDelete}
                  className={layoutStyles.btn_text}
                  icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
                >
                  {t('LABEL.button.delete')}
                </Button>
                <Button
                  type="submit"
                  variant="save"
                  size="sm"
                  disabled={formMode === PACKAGE_FORM_MODE.NONE}
                >
                  {t('LABEL.button.save')}
                </Button>
              </div>
            </div>
            {/* 폼 필드 - location (비활성화 상태) */}
            {itemType === PACKAGE_ITEM_TYPE.COURSE ? <PackageCourseForm /> : <PackageSubPkgForm />}
          </form>
        </div>
      </SplitPanel>
    </form>
  );
};

export const PackageInfo = PackageInfoComponent;
