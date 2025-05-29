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
import { transformMenuApiDataToTreeData } from '@features/tenant/management/service/tenant-detail-tree.service';
import { useMenuManageFetchTree } from '@entities/menu/service/menu-manage.hook';
import {
  useFetchMenuTenantMappingTree,
  useCreateMenuTenant,
  useDeleteMenuTenent,
  useChangeMenuTenentDnd,
} from '@entities/menu/service/tenant-menu-manage.hook';
import {
  getAllParentAndChildrenByKey,
  getAllParentAndAllChildById,
  getFirstExpandKeys,
  getAllTreeKeys,
  getAllParent,
  getNodeByKey,
  genMap,
  deleteNodeByNode,
} from '@features/tenant';

import { isEqual } from 'lodash';

/**
 * 화면번호: NLP_BO_PMS_1100_02_07 메뉴 조회 팝업(공통)
 * @param param0
 * @returns
 */
const MenuChoiceTreeModalComponent = ({ menuScopeCode }: { menuScopeCode: 'FO' | 'BO' }) => {
  const [baseMenuTreeData, setBaseMenuTreeData] = useState<any[]>([]);
  const [baseMenuTreeExpandedKeys, setBaseMenuTreeExpandedKeys] = useState<string[]>([]);
  const [baseMenuAllKeys, setBaseMenuAllKeys] = useState<string[]>([]);
  const [selectedTreeData, setSelectedTreeData] = useState<any[]>([]);
  const [selectedTreeExpandedKeys, setSelectedTreeExpandedKeys] = useState<string[]>([]);
  const [selectedTreeAllKeys, setSelectedTreeAllKeys] = useState<string[]>([]);

  const { open: openModal, confirm: openConfirm, close: closeModal } = useModal();

  const { data: baseMenuDB } = useMenuManageFetchTree(menuScopeCode, 'ko');

  const handleBaseMenuTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setBaseMenuTreeExpandedKeys(keys);
    }
  };
  const handleMenuTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setSelectedTreeExpandedKeys(keys);
    }
  };

  const handleTargetAction = async (event: any) => {
    switch (event.type) {
      case 'NODE_COPY':
        if (event.sourceTreeId === 'menu-tree') {
          const sourceKey = event.sourceNode.key;
          if (getNodeByKey(selectedTreeData, sourceKey)) {
            alert('이미 있습니다.');
            return;
          }
          const allParents = getAllParent(baseMenuTreeData, sourceKey);
          const oldCopyMenu: TreeNode[] = [...JSON.parse(JSON.stringify(selectedTreeData))];
          const oldMap = genMap(oldCopyMenu);

          for (const item of allParents) {
            const newMenu = oldMap.get(item.key);
            if (!newMenu) {
              const parentMenu: any = oldMap.get(item.parentKey);
              if (parentMenu) {
                const newItem = JSON.parse(JSON.stringify(item));
                newItem.children = new Array<any>();
                parentMenu?.children.push(newItem);
                oldMap.set(newItem.key, newItem);
              }
            }
          }

          const copyMenu = oldMap.get(sourceKey);
          if (copyMenu) {
            copyMenu.children = JSON.parse(JSON.stringify(event.sourceNode.children));
          }

          const firstLevelKeys = oldCopyMenu.map((node: TreeNode) => node.key);
          setSelectedTreeExpandedKeys(firstLevelKeys);

          setSelectedTreeData(oldCopyMenu);
        }
        break;
      case 'NODE_MOVE':
        console.log(event);
        setSelectedTreeData((predata) => {
          const map = genMap(predata);
          switch (event.position) {
            case 'INSIDE':
              {
                deleteNodeByNode(predata, event.sourceNode);
                const parent = map.get(event.targetNode.key);
                parent.children.splice(event.targetIndex, 0, event.sourceNode);
              }
              break;
            case 'BEFORE':
            case 'AFTER':
              {
                deleteNodeByNode(predata, event.sourceNode);
                const parent = map.get(event.targetNode.parentKey);
                parent.children.splice(event.targetIndex, 0, event.sourceNode);
              }
              break;
          }

          return [...predata];
        });
    }
  };

  const handleDeleteButtonClick = (node: TreeNode, level: number) => {
    setSelectedTreeData((predata) => {
      const recervice = (d: any[]) => {
        const index = d.findIndex((item) => item.key === node.key);
        console.log('index', index);
        if (index !== -1) {
          d.splice(index, 1);
          return;
        }
        for (const i of d) {
          if (i.children && i.children.length > 0) {
            recervice(i.children);
          }
        }
      };

      recervice(predata);
      return [...predata];
    });
  };

  const renderMenuDeleteButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'flex items-center'}>
        {level == 0 ? (
          ''
        ) : (
          <Button
            variant="gray2"
            size={'xs'}
            type={'button'}
            onClick={() => {
              handleDeleteButtonClick(node, level);
            }}
          >
            {t('삭제')}
          </Button>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    if (baseMenuDB) {
      console.log('baseMenuDB', baseMenuDB);
      const transformedData = transformMenuApiDataToTreeData(baseMenuDB);
      console.log('transformedData', transformedData);
      setBaseMenuTreeData(transformedData);
      if (transformedData && transformedData.length > 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setBaseMenuTreeExpandedKeys(firstLevelKeys);
        const allKeys = getAllTreeKeys(transformedData);
        setBaseMenuAllKeys(allKeys);
        const root = { ...transformedData[0] };

        root.children = [];
        setSelectedTreeData([root]);
      }
    }
  }, [baseMenuDB]);
  useEffect(() => {
    if (selectedTreeData) {
      const allKeys = getAllTreeKeys(selectedTreeData);
      setSelectedTreeAllKeys(allKeys);
    }
  }, [selectedTreeData]);

  return (
    <ModalContainer>
      <ModalTitle>{menuScopeCode === 'FO' ? t('학습자 메뉴') : t('HRD센터 메뉴')}</ModalTitle>
      <ModalBody>
        <TreeContainer>
          <div className={cn(popContentsStyles.start, popContentsStyles.wrap)}>
            <div className={popContentsStyles.inner}>
              <div className={popContentsStyles.inner_contents}>
                {/* 시작 */}
                <div className={titleStyles.title_wrap}>
                  <div className={titleStyles.title_area}>
                    <h3 className={titleStyles.title}>{t('메뉴 목록')}</h3>
                    <strong className={titleStyles.sub_title}>전체</strong>
                    <span className={titleStyles.num}>{baseMenuAllKeys?.length - 1}</span>
                  </div>
                  <div className={layoutStyles.btn_wrap}>
                    <Button
                      variant="text"
                      size="sm"
                      className={layoutStyles.btn_text}
                      onClick={() => {
                        if (baseMenuTreeData) {
                          const allKeys = getAllTreeKeys(baseMenuTreeData);
                          handleBaseMenuTreeExpandChange(allKeys);
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
                        const firstKeys = getFirstExpandKeys(selectedTreeData);
                        handleBaseMenuTreeExpandChange(firstKeys || []);
                      }}
                    >
                      {t('전체닫기')}
                    </Button>
                  </div>
                </div>
                <div className={layoutStyles.inner_contents}>
                  <TreeView
                    treeId="menu-tree"
                    type={'SAME_LEVEL_ONLY'}
                    data={baseMenuTreeData}
                    expandedKeys={baseMenuTreeExpandedKeys}
                    onExpandedKeysChange={handleBaseMenuTreeExpandChange}
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
                    <h3 className={titleStyles.title}>{t('메뉴 선택')}</h3>
                    <strong className={titleStyles.sub_title}>{t('전체')}</strong>
                    <span className={titleStyles.num}>{selectedTreeAllKeys?.length - 1}</span>
                  </div>
                  <div className={layoutStyles.btn_wrap}>
                    <Button
                      variant="text"
                      size="sm"
                      className={layoutStyles.btn_text}
                      onClick={() => {
                        if (selectedTreeData) {
                          const allKeys = getAllTreeKeys(selectedTreeData);
                          handleMenuTreeExpandChange(allKeys);
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
                        const firstKeys = getFirstExpandKeys(selectedTreeData);
                        handleMenuTreeExpandChange(firstKeys || []);
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
                    data={selectedTreeData}
                    nodeButtons={renderMenuDeleteButtons}
                    onAction={handleTargetAction}
                    expandedKeys={selectedTreeExpandedKeys}
                    onExpandedKeysChange={handleMenuTreeExpandChange}
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
          label={t('확인')}
          variant={'primary'}
          size={'lg'}
          onClick={() => closeModal(selectedTreeData)}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const MenuChoiceTreeModal = MenuChoiceTreeModalComponent;
