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
import popContentsStyles from '@features/tenant/management/ui/pop-contents-layout.module.css';
import { transformApiDataToTreeData } from '@features/platform/category';

import { useFetchCategory } from '@entities/category';
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
 * 화면번호: NLP_BO_TMS_1002_02 (카테고리 테넌트 매핑)
 * @param param0
 * @returns
 */
const CategoryChoiceTreeModalModalComponent = () => {
  const [commonCategoryTreeData, setCommonCategoryTreeData] = useState<any>([]);
  const [commonCategoryTreeExpandedKeys, setCommonCategoryTreeExpandedKeys] = useState<string[]>(
    [],
  );
  const [commonCategoryTreeAllKeys, setCommonCategoryAllKeys] = useState<string[]>([]);

  const [selectedCategoryTreeData, setSelectedCategoryTreeData] = useState<any[]>([]);
  const [selectedCategoryTreeAllKeys, setSelectedCategoryTreeAllKeys] = useState<string[]>([]);
  const [selectedCategoryTreeExpandedKeys, setSelectedCategoryTreeExpandedKeys] = useState<
    string[]
  >([]);

  const { open: openModal, close: closeModal, confirm: openConfirm, alert: openAlert } = useModal();

  const { data: commonCategories } = useFetchCategory();

  const handleCommonCategoryTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setCommonCategoryTreeExpandedKeys(keys);
    }
  };

  const handleTenantCategoryTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setSelectedCategoryTreeExpandedKeys(keys);
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
          console.log(value);
        }
      },
    });
  };

  const handleTargetAction = async (event: any) => {
    console.log(event);

    switch (event.type) {
      case 'NODE_COPY':
        if (event.sourceTreeId === 'common-tree') {
          if (selectedCategoryTreeAllKeys.includes(event.sourceNode.key)) {
            alert('이미 매핑된 카테고리입니다.');
            return false;
          }
          const oldCopyMenu = copyTreeNode(event, commonCategoryTreeData, selectedCategoryTreeData);
          const firstLevelKeys = oldCopyMenu.map((node: TreeNode) => node.key);
          setSelectedCategoryTreeExpandedKeys(firstLevelKeys);

          setSelectedCategoryTreeData(oldCopyMenu);
        }
        break;
      case 'NODE_MOVE':
        setSelectedCategoryTreeData((predata) => {
          moveNodePosition(event, predata);
          return [...predata];
        });
        break;
    }
  };

  useEffect(() => {
    if (commonCategories) {
      const transformedData = transformApiDataToTreeData(commonCategories);
      setCommonCategoryTreeData(transformedData);
      if (transformedData && transformedData.length > 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setCommonCategoryTreeExpandedKeys(firstLevelKeys);
        const allKeys = getAllTreeKeys(transformedData);
        setCommonCategoryAllKeys(allKeys);
        const root = { ...transformedData[0] };
        root.children = [];
        setSelectedCategoryTreeAllKeys([root.key]);
        setSelectedCategoryTreeData([root]);
      }
    }
  }, [commonCategories]);

  useEffect(() => {
    if (selectedCategoryTreeData) {
      const allKeys = getAllTreeKeys(selectedCategoryTreeData);
      setSelectedCategoryTreeAllKeys(allKeys);
    }
  }, [selectedCategoryTreeData]);

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
                    treeId="common-tree"
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
                    <span className={titleStyles.num}>
                      {selectedCategoryTreeAllKeys?.length - 1}
                    </span>
                  </div>
                  <div className={layoutStyles.btn_wrap}>
                    <Button
                      variant="text"
                      size="sm"
                      className={layoutStyles.btn_text}
                      onClick={() => {
                        if (selectedCategoryTreeData) {
                          const allKeys = getAllTreeKeys(selectedCategoryTreeData);
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
                        const firstKeys = getFirstExpandKeys(selectedCategoryTreeData);
                        handleTenantCategoryTreeExpandChange(firstKeys || []);
                      }}
                    >
                      {t('전체닫기')}
                    </Button>
                  </div>
                </div>
                <div className={layoutStyles.inner_contents}>
                  <TreeView
                    treeId="selected-tree"
                    type={'SAME_LEVEL_ONLY'}
                    data={selectedCategoryTreeData}
                    nodeButtons={renderTenantCategoryDeleteButtons}
                    onAction={handleTargetAction}
                    expandedKeys={selectedCategoryTreeExpandedKeys}
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
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button
          label={t('적용')}
          variant={'primary'}
          size={'lg'}
          onClick={() => closeModal(selectedCategoryTreeData)}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const CategoryChoiceTreeModal = CategoryChoiceTreeModalModalComponent;
