import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import popContentsStyles from '@features/tenant/management/ui/pop-contents-layout.module.css';

import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  TreeContainer,
  TreeView,
  TreeNode,
  TreeEventPayload,
  TreeBox,
} from '@learnway/ui';

import { transformDepartmentApiDataToTreeData } from '@features/platform/company/service/company-detail-tree';

import { useGetCompanyDepartmentTree } from '@entities/department';
import {
  getAllParentAndChildrenByKey,
  getAllParentAndAllChildById,
  getFirstExpandKeys,
  getAllTreeKeys,
  getAllParent,
  getNodeByKey,
  genMap,
  deleteNodeByNode,
  copyTreeNode,
  moveNodePosition,
} from '@features/tenant';

/**
 * 화면번호: NLP_BO_TMS_1111_09 (회사조직조회 팝업(공통))
 * @param param0
 * @returns
 */
const OrganizationChoiceTreeModalComponent = ({ companyCodes }: { companyCodes: string[] }) => {
  const [organizationTree, setCommonCategoryTree] = useState<any>([]);

  const { open: openModal, close: closeModal, confirm: openConfirm, alert: openAlert } = useModal();

  const { data: organizationData } = useGetCompanyDepartmentTree(companyCodes);

  useEffect(() => {
    if (organizationData) {
      const transformedData = transformDepartmentApiDataToTreeData(organizationData);
      setCommonCategoryTree(transformedData);
      if (transformedData && transformedData.length > 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);

        const allKeys = getAllTreeKeys(transformedData);

        const root = { ...transformedData[0] };
        root.children = [];
      }
    }
  }, [organizationData]);

  return (
    <ModalContainer>
      <ModalTitle>{t('회사 조직 조회')}</ModalTitle>
      <ModalBody>
        <TreeContainer>
          <div className={popContentsStyles.inner}>
            <div className={popContentsStyles.inner_contents}>
              <div className={layoutStyles.inner_contents}>
                <TreeBox
                  treeId="common-tree"
                  type="SHUTTLE_LIST"
                  data={organizationTree}
                  title={t('조직-플랫폼')}
                  initLevel={2}
                  showSearchKeyword
                  renderNodeButtons={(node: any, index: number) => {
                    if (node.key !== 'root' && node.parentKey !== 'root')
                      return (
                        <Button
                          onClick={(e) => {
                            closeModal(node);
                          }}
                          stopPropagation
                          variant="gray2"
                          size="ts"
                          type="button"
                          label={t('LABEL.button.select')}
                        />
                      );
                  }}
                />
              </div>
              {/* 종료 */}
            </div>
          </div>
        </TreeContainer>
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const OrganizationChoiceTreeModal = OrganizationChoiceTreeModalComponent;
