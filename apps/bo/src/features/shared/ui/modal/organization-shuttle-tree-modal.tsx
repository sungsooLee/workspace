import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';

import { cn } from '@learnway/shared';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
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
  ChipList,
  ChipsForTreeShuttle,
} from '@learnway/ui';

import { IcoXclose, IcoRefresh02, IcoNarrowRight } from '@learnway/icons';

import { ContentsHistoryInfoFormField, FormRow, FormSubTitle, SwitchFormField } from '@shared/ui';

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
} from '@features/tenant';
import { findOrganizationPathById } from '@features/platform/company';

/**
 * 화면번호: NLP_BO_TMS_1111_09 (회사조직조회 팝업(공통))
 * @param param0
 * @returns
 */
const OrganizationShuttleTreeModalComponent = ({
  companyCodes,
  originList,
}: {
  companyCodes: string[];
  originList: any[];
}) => {
  const [organizationTree, setOrganizationTree] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedChips, setSelectedChips] = useState<any[]>([]);

  const { open: openModal, close: closeModal, confirm: openConfirm, alert: openAlert } = useModal();

  const { data: organizationData } = useGetCompanyDepartmentTree(companyCodes);

  const handlerApppendNodeClick = (node: any) => {
    if (!selectedItems?.includes(node.key)) {
      setSelectedItems([...selectedItems, node.key]);
    }
  };
  const handleRemveAll = () => {
    setSelectedChips([]);
    setSelectedItems([]);
  };

  const handleRemoveItem = (node: any) => {
    setSelectedItems(selectedItems.filter((item) => item !== node.key));
  };
  useEffect(() => {
    if (organizationData) {
      const transformedData = transformDepartmentApiDataToTreeData(organizationData);
      setOrganizationTree(transformedData);
      if (transformedData && transformedData.length > 0) {
        const root = { ...transformedData[0] };
        root.children = [];
      }
    }
  }, [organizationData]);

  useEffect(() => {
    console.log(organizationTree, originList);
    if (organizationTree && organizationTree.length > 0 && originList && originList.length > 0) {
      const selectedKeys = originList.map((item) => {
        return item.deptId.toString();
      });
      console.log(selectedKeys);
      setSelectedItems(selectedKeys);
    }
  }, [originList, organizationTree]);

  useEffect(() => {
    if (organizationTree && selectedItems) {
      const treeMap = genMap(organizationTree);
      const chips = [];
      for (const i of selectedItems) {
        const node = treeMap.get(i);
        if (node) {
          chips.push({ ...node, label: findOrganizationPathById(organizationTree, i) });
        }
      }
      setSelectedChips(chips);
    }
  }, [selectedItems]);

  return (
    <ModalContainer>
      <ModalTitle>{t('회사 조직 조회')}</ModalTitle>
      <ModalBody>
        <div className={cn(popContentsStyles.start, popContentsStyles.wrap)}>
          <div className={popContentsStyles.inner}>
            <div className={popContentsStyles.inner_contents}>
              <TreeBox
                treeId="common-tree"
                type="SHUTTLE_LIST"
                data={organizationTree}
                title={t('조직-플랫폼')}
                initLevel={2}
                selectedNode={null}
                selectedItems={selectedItems}
                renderNodeButtons={(node: any, index: number) => {
                  if (node.key !== 'root' && node.parentKey !== 'root')
                    return (
                      <Button
                        stopPropagation
                        variant="gray2"
                        size="ts"
                        type="button"
                        label={t('LABEL.button.select')}
                        onClick={() => {
                          handlerApppendNodeClick(node);
                        }}
                        disabled={selectedItems.includes(node.key)}
                      />
                    );
                }}
              />
            </div>
            {/* 종료 */}
          </div>
          <div className={popContentsStyles.guide_line}>
            <p className={popContentsStyles.guide_text}>
              <IcoNarrowRight width={24} height={24} stroke={'#C8d2e5'} />
            </p>
          </div>
          <div className={popContentsStyles.inner}>
            <FormSubTitle
              label={t('선택목록')}
              titleNode={
                <>
                  <strong>{t('전체')}</strong>
                  <span className={titleStyles.num}>0</span>
                </>
              }
              actionNode={
                <Button
                  label={t('전체삭제')}
                  variant="text"
                  size="sm"
                  className="btn_text"
                  preventDefault
                  onClick={handleRemveAll}
                />
              }
              lineType="dark"
            />
            <div className={popContentsStyles.inner_contents}>
              <div className={layoutStyles.inner_contents}>
                <ChipsForTreeShuttle
                  title={t('선택목록')}
                  selectedItems={selectedChips}
                  handleRemoveItem={handleRemoveItem}
                />
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          label={t('초기화')}
          variant="gray"
          size="lg"
          icon={<IcoRefresh02 width={16} height={16} className="icon_refresh" />}
        />
        <Button label={t('취소')} variant="gray" size="lg" onClick={() => closeModal()} />
        <Button
          label={t('적용')}
          variant="primary"
          size="lg"
          onClick={() => closeModal(selectedChips)}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const OrganizationShuttleTreeModal = OrganizationShuttleTreeModalComponent;

const flattenNodeWithChildren = (node: TreeNode) => {
  let nodes = [node];

  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      nodes = [...nodes, ...flattenNodeWithChildren(child)];
    });
  }

  return nodes;
};
