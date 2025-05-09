import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
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
} from '@learnway/ui';
import { cn } from '@learnway/shared';
import { IcoNarrowRight } from '@learnway/icons';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import popContentsStyles from './pop-contents-layout.module.css';
//import { transformApiDataToTreeData } from '@features/category/service/category.service';
import { transformApiDataToTreeData } from '@features/platform/category';
import {
  useFetchTenantCategory,
  useMappingTenantCategory,
  useDeleteTenantCategory,
  useMoveTenantCategory,
} from '@entities/tenant/service/tenant-category.hook';
import { useFetchCategory } from '@entities/category';
import { getFirstExpandKeys, getAllTreeKeys } from '../service/tenant-detail-tree.service';

type ActionFunction = (payload: any) => void;

const TenantDetailCategoryMappingModalComponent: FC<any> = ({ tenantId, onNodeChange }) => {
  const [commonCategoryTreeData, setCommonCategoryTreeData] = useState([]);
  const [commonCategoryTreeExpandedKeys, setCommonCategoryTreeExpandedKeys] = useState<string[]>(
    [],
  );
  const [commonCategoryTreeAllKeys, setCommonCategoryAllKeys] = useState<string[]>([]);
  const [commonCategoryTreeSelectedNode, setCommonCategoryTreeSelectedNode] =
    useState<TreeNode | null>(null);
  const [tenantCategoryTreeData, setTenantCategoryTreeData] = useState([]);
  const [tenantCategoryTreeExpandedKeys, setTenantCategoryTreeExpandedKeys] = useState<string[]>(
    [],
  );
  const [tenantCategoryTreeAllKeys, setTenantCategoryTreeAllKeys] = useState<string[]>([]);

  const { open: openModal, close: closeModal, confirm: openConfirm, alert: openAlert } = useModal();

  const { data: commonCategories } = useFetchCategory();
  const { data: tenantCategories, refetch } = useFetchTenantCategory(tenantId);

  const { mapping: mappingTenantCategory } = useMappingTenantCategory(tenantId, {
    onSuccess: async (data: any) => {
      await refetch();
      if (onNodeChange) {
        onNodeChange();
      }
    },
  });
  const { move: moveTenantCategory } = useMoveTenantCategory(tenantId, {
    onSuccess: async (data: any) => {
      await refetch();
      if (onNodeChange) {
        onNodeChange();
      }
    },
  });

  const { delete: deleteTenantCategory } = useDeleteTenantCategory(tenantId, {
    onSuccess: async (data: any) => {
      await refetch();
      if (onNodeChange) {
        onNodeChange();
      }
    },
  });

  const handleCommonCategoryTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setCommonCategoryTreeExpandedKeys(keys);
    }
  };
  const handleTenantCategoryTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setTenantCategoryTreeExpandedKeys(keys);
    }
  };

  const handleDeleteTenantCategory = (node: TreeNode) => {
    if (node.children) {
      openAlert({
        title: '삭제할 수 없습니다.',
        content: '하위 카테고리가 존재 시 삭제할 수 없습니다.',
      });
      return false;
    }
    openConfirm({
      title: '삭제 하시겠습니까?',
      content: <p>삭제 후 복구할 수 없습니다.</p>,
      onClose: (value: boolean) => {
        if (value) {
          const payload: any = {};
          payload.tenantId = tenantId;
          payload.categoryId = node.key;
          deleteTenantCategory(payload);
        }
      },
    });
  };

  const handleTargetAction = async (event: any) => {
    const nodeInfo = event;
    const sourceNode = event.sourceNode;
    const targetNode = event.targetNode;
    if (nodeInfo.type === 'NODE_SELECT') return false;
    console.log('### event', event);
    console.log('### sourceNode', sourceNode);
    console.log('### targetNode', targetNode);

    let excutable: ActionFunction | undefined;

    let parentKey = targetNode.parentKey;
    let sortSeq = 1;
    let targetDepth = targetNode.depth;
    switch (nodeInfo.position) {
      case 'INSIDE':
        parentKey = targetNode.key;
        targetDepth = targetNode.depth + 1;
        break;
      case 'BEFORE':
        sortSeq = targetNode.sortSeq;
        break;
      case 'AFTER':
        sortSeq = targetNode.sortSeq + 1;
        break;
    }
    if (sourceNode.depth !== targetDepth) {
      alert(
        '동일한 레벨 내에서만 매핑 및 이동이 가능합니다. src:' +
          sourceNode.depth +
          '/dest:' +
          targetDepth,
      );
      return false;
    }
    if (sourceNode.parentKey !== parentKey) {
      alert(
        '동일한 부모 카테고리에만 매핑 및 이동이 가능합니다. src:' +
          sourceNode.parentKey +
          '/dest:' +
          parentKey,
      );
      return false;
    }
    const sourceCategoryId = sourceNode.key;
    switch (nodeInfo.type) {
      case 'NODE_COPY':
        if (nodeInfo.sourceTreeId !== 'mapping-common-tree') {
          return false;
        }
        if (tenantCategoryTreeAllKeys.includes(sourceCategoryId)) {
          alert('이미 매핑된 카테고리입니다.');
          return false;
        }
        excutable = mappingTenantCategory;
        break;
      case 'NODE_MOVE':
        excutable = moveTenantCategory;
        break;
    }
    if (excutable) {
      const payload: any = {};
      payload.tenantId = tenantId;
      payload.categoryId = sourceNode.key;
      payload.data = {};
      payload.data.destinationParentId = parentKey;
      payload.data.sortSeq = sortSeq;
      console.log('### payload', payload);
      excutable(payload);
    }
  };

  const renderCommonCategorySelectButtons = (node: TreeNode, level: number) => {
    return (
      <div className={'gap-10px flex'}>
        <div className={'flex items-center'}>
          {level == 0 ? (
            ''
          ) : (
            <Button variant="gray2" size={'xs'} type={'button'}>
              {t('선택')}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderTenantCategoryDeleteButtons = (node: TreeNode, level: number) => {
    if (node.categoryType === 'COMMON')
      return (
        <div className={'gap-10px flex'}>
          <div className={'flex items-center'}>
            {level == 0 ? (
              ''
            ) : (
              <Button
                variant="gray2"
                size={'xs'}
                type={'button'}
                onClick={() => handleDeleteTenantCategory(node)}
              >
                {t('삭제')}
              </Button>
            )}
          </div>
        </div>
      );
  };

  useEffect(() => {
    if (commonCategories) {
      console.log(commonCategories);
      const transformedData = transformApiDataToTreeData(commonCategories);
      setCommonCategoryTreeData(transformedData);
      if (transformedData && transformedData.length > 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setCommonCategoryTreeExpandedKeys(firstLevelKeys);
        const allKeys = getAllTreeKeys(transformedData);
        setCommonCategoryAllKeys(allKeys);
      }
    }
  }, [commonCategories]);

  useEffect(() => {
    if (tenantCategories) {
      console.log('### refetch! TenantCategories', tenantCategories);
      const transformedData = transformApiDataToTreeData(tenantCategories);
      console.log('### transformedData', transformedData);
      setTenantCategoryTreeData(transformedData);
      console.log('### tenantCategoryTreeExpandedKeys', tenantCategoryTreeExpandedKeys);
      if (transformedData && transformedData.length > 0) {
        if (tenantCategoryTreeExpandedKeys.length === 0) {
          const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
          setTenantCategoryTreeExpandedKeys(firstLevelKeys);
        }
        const allKeys = getAllTreeKeys(transformedData);
        console.log('## allKeys', allKeys);
        setTenantCategoryTreeAllKeys(allKeys);
      }
    }
  }, [tenantCategories]);

  return (
    <ModalContainer>
      <ModalTitle>{t('카테고리 매핑')}</ModalTitle>
      <ModalBody>
        <TreeContainer>
          <div className={cn(popContentsStyles.start, popContentsStyles.wrap)}>
            <div className={popContentsStyles.inner}>
              <div className={popContentsStyles.inner_contents}>
                {/* 시작 */}
                <div className={titleStyles.title_wrap}>
                  <div className={titleStyles.title_area}>
                    <h3 className={titleStyles.title}>{t('카테고리 매핑 목록')}</h3>
                    <strong className={titleStyles.sub_title}>전체</strong>
                    <span className={titleStyles.num}>{commonCategoryTreeAllKeys?.length - 1}</span>
                  </div>
                  <div className={layoutStyles.btn_wrap}>
                    <Button
                      variant="text"
                      size="sm"
                      className={layoutStyles.btn_text}
                      onClick={() => {
                        if (commonCategoryTreeData) {
                          const allKeys = getAllTreeKeys(commonCategoryTreeData);
                          handleCommonCategoryTreeExpandChange(allKeys);
                        }
                      }}
                    >
                      {t('전체펼침')}
                    </Button>
                    <Button
                      variant="text"
                      size="sm"
                      className={layoutStyles.btn_text}
                      onClick={() => {
                        const firstKeys = getFirstExpandKeys(commonCategoryTreeData);
                        handleCommonCategoryTreeExpandChange(firstKeys || []);
                      }}
                    >
                      {t('전체닫기')}
                    </Button>
                  </div>
                </div>
                <div className={layoutStyles.inner_contents}>
                  <TreeView
                    treeId="mapping-common-tree"
                    type={'DRAG_DROP'}
                    data={commonCategoryTreeData}
                    // nodeButtons={renderBaseSelectButtons}
                    // selectedNode={selectedNode}
                    expandedKeys={commonCategoryTreeExpandedKeys}
                    onExpandedKeysChange={handleCommonCategoryTreeExpandChange}
                    //onSelectedNodeChange={handleSelectedNodeChange}
                  />
                </div>

                {/* 종료 */}
              </div>
            </div>
            <div className={popContentsStyles.guide_line}>
              <p className={popContentsStyles.guide_text}>
                <IcoNarrowRight width={24} height={24} stroke="#c8d2e5" />
                Drag
                <br />
                &amp; Drop
              </p>
            </div>
            <div className={popContentsStyles.inner}>
              <div className={popContentsStyles.inner_contents}>
                {/* 시작 */}
                <div className={titleStyles.title_wrap}>
                  <div className={titleStyles.title_area}>
                    <h3 className={titleStyles.title}>{t('카테고리 매핑 선택')}</h3>
                    <strong className={titleStyles.sub_title}>{t('전체')}</strong>
                    <span className={titleStyles.num}>{tenantCategoryTreeAllKeys?.length - 1}</span>
                  </div>
                  <div className={layoutStyles.btn_wrap}>
                    <Button
                      variant="text"
                      size="sm"
                      className={layoutStyles.btn_text}
                      onClick={() => {
                        if (tenantCategoryTreeData) {
                          const allKeys = getAllTreeKeys(tenantCategoryTreeData);
                          handleTenantCategoryTreeExpandChange(allKeys);
                        }
                      }}
                    >
                      {t('전체펼침')}
                    </Button>
                    <Button
                      variant="text"
                      size="sm"
                      className={layoutStyles.btn_text}
                      onClick={() => {
                        const firstKeys = getFirstExpandKeys(tenantCategoryTreeData);
                        handleTenantCategoryTreeExpandChange(firstKeys || []);
                      }}
                    >
                      {t('전체닫기')}
                    </Button>
                  </div>
                </div>
                <div className={layoutStyles.inner_contents}>
                  <TreeView
                    treeId="mapping-tenant-tree"
                    type={'SAME_LEVEL_ONLY'}
                    data={tenantCategoryTreeData}
                    nodeButtons={renderTenantCategoryDeleteButtons}
                    onAction={handleTargetAction}
                    expandedKeys={tenantCategoryTreeExpandedKeys}
                    onExpandedKeysChange={handleTenantCategoryTreeExpandChange}
                    // onSelectedNodeChange={handleSelectedNodeChange}
                  />
                </div>

                {/* 종료 */}
              </div>
            </div>
          </div>
        </TreeContainer>
      </ModalBody>
      <ModalFooter>
        {/* <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} /> */}
        <Button label={t('닫기')} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantDetailCategoryMappingModal = TenantDetailCategoryMappingModalComponent;
