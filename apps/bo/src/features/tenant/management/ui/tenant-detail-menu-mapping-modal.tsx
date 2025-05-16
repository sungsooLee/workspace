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
import { transformMenuApiDataToTreeData } from '@features/tenant/management/service/tenant-detail-tree.service';
import { useMenuManageFetchTree } from '@entities/menu/service/menu-manage.hook';
import {
  useFetchMenuTenantMappingTree,
  useCreateMenuTenant,
  useDeleteMenuTenent,
  useChangeMenuTenentDnd,
} from '@entities/tenant/service/tenant-menu-manage.hook';
import {
  getAllParentAndAllChildById,
  getFirstExpandKeys,
  getAllTreeKeys,
  moveNodeCheck,
} from '../service/tenant-detail-tree.service';

const TenantDetailMenuMappingModalComponent: FC<any> = ({ menuScopeCode, tenantId }) => {
  const [baseMenuTreeData, setBaseMenuTreeData] = useState([]);
  const [baseMenuTreeExpandedKeys, setBaseMenuTreeExpandedKeys] = useState<string[]>([]);
  const [baseMenuAllKeys, setBaseMenuAllKeys] = useState<string[]>([]);
  const [menuTreeData, setMenuTreeData] = useState([]);
  const [menuTreeExpandedKeys, setMenuTreeExpandedKeys] = useState<string[]>([]);
  const [menuTreeAllKeys, setMenuTreeAllKeys] = useState<string[]>([]);

  const { open: openModal, confirm: openConfirm, close: closeModal } = useModal();

  const { data: baseMenuDB } = useMenuManageFetchTree(menuScopeCode, 'ko');

  const { data: menuDB, refetch } = useFetchMenuTenantMappingTree(tenantId, menuScopeCode);

  const { create: tentantMenuCreate } = useCreateMenuTenant(tenantId, menuScopeCode, {
    onSuccess: () => {
      refetch();
    },
  });
  const { change: changeMenuPosition } = useChangeMenuTenentDnd(tenantId, menuScopeCode, {
    onSuccess: () => {
      refetch();
    },
  });
  const { delete: deleteMenuTenent } = useDeleteMenuTenent(tenantId, menuScopeCode, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleBaseMenuTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setBaseMenuTreeExpandedKeys(keys);
    }
  };
  const handleMenuTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setMenuTreeExpandedKeys(keys);
    }
  };

  const handleTargetAction = async (event: any) => {
    switch (event.type) {
      case 'NODE_COPY':
        console.log(event);
        if (event.sourceTreeId === 'mapping-menu-tree') {
          const sourceMenuId = event.sourceNode.key;
          if (menuTreeAllKeys.includes(sourceMenuId)) {
            alert('이미 있음');
            return false;
          }
          const allPostMenus = getAllParentAndAllChildById(baseMenuTreeData, sourceMenuId);
          const contents = [];
          for (const item of allPostMenus) {
            if (!menuTreeAllKeys.includes(item.key)) {
              const reqMenu: any = JSON.parse(JSON.stringify(item));
              reqMenu.tenantId = tenantId;
              reqMenu.menuScope = menuScopeCode;
              reqMenu.parentMenuId = item.parentId;
              contents.push(reqMenu);
            }
          }

          const payload = { tenantId: tenantId, contents: [...contents] };
          console.log(payload);
          tentantMenuCreate(payload);
        }
        break;
      case 'NODE_MOVE':
        if (event.treeId === 'mapping-tenant-menu-tree') {
          const payload = moveNodeCheck(event);
          if (payload) {
            payload.menuScopeCode = menuScopeCode;
            changeMenuPosition(payload);
          }
        }

        break;
      default:
        break;
      //     onNodeClick(event.node);
      //     break;
      //   case 'NODE_MOVE': {
      //     const nodeInfo = event;
      //     if (nodeInfo.position === 'INSIDE') {
      //       onNodeMove(
      //         nodeInfo.sourceNode.menuId,
      //         nodeInfo.targetNode?.menuId,
      //         nodeInfo.targetIndex ? nodeInfo.targetIndex : 1,
      //       );
      //     } else {
      //       const targetIndex = nodeInfo.targetIndex || 1;
      //       onNodeMove(nodeInfo.sourceNode.menuId, nodeInfo.targetNode?.parentKey, targetIndex);
      //     }

      //     break;
    }

    // useCreateMenuTenant(payload.sourceNode, {});
  };

  const handleDeleteButtonClick = (node: TreeNode, level: number) => {
    openConfirm({
      title: t('삭제 하시겠습니까?'),
      content: (
        <>
          <p>{t('하위 메뉴 존재 시 모두 삭제되며,')}</p>
          <p>{t('삭제 후 복구할 수 없습니다.')}</p>
        </>
      ),
      onClose: (value: boolean) => {
        if (value) {
          const payload = { ...node };
          if (menuTreeExpandedKeys.includes(node.key)) {
            const expandedKeys = [...menuTreeExpandedKeys.filter((value) => value !== node.key)];
            setMenuTreeExpandedKeys(expandedKeys);
          }
          deleteMenuTenent(payload);
        }
      },
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
      console.log(baseMenuDB);
      const transformedData = transformMenuApiDataToTreeData(baseMenuDB);
      setBaseMenuTreeData(transformedData);
      if (transformedData && transformedData.length > 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setBaseMenuTreeExpandedKeys(firstLevelKeys);
        const allKeys = getAllTreeKeys(transformedData);
        setBaseMenuAllKeys(allKeys);
      }
    }
  }, [baseMenuDB]);

  useEffect(() => {
    if (menuDB) {
      const transformedData = transformMenuApiDataToTreeData(menuDB);
      console.log(transformedData);
      setMenuTreeData(transformedData);
      if (transformedData && transformedData.length > 0 && menuTreeExpandedKeys.length == 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setMenuTreeExpandedKeys(firstLevelKeys);
      }
      const allKeys = getAllTreeKeys(transformedData);
      setMenuTreeAllKeys(allKeys);
    }
  }, [menuDB]);

  return (
    <ModalContainer>
      <ModalTitle>
        {menuScopeCode === 'FO' ? t('학습자 메뉴추가') : t('HRD센터 메뉴추가')}
      </ModalTitle>
      <ModalBody>
        <TreeContainer>
          <div className={cn(popContentsStyles.start, popContentsStyles.wrap)}>
            <div className={popContentsStyles.inner}>
              <div className={popContentsStyles.inner_contents}>
                {/* 시작 */}
                <div className={titleStyles.title_wrap}>
                  <div className={titleStyles.title_area}>
                    <h3 className={titleStyles.title}>{t('메뉴매핑 목록')}</h3>
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
                        const firstKeys = getFirstExpandKeys(menuTreeData);
                        handleBaseMenuTreeExpandChange(firstKeys || []);
                      }}
                    >
                      {t('전체닫기')}
                    </Button>
                  </div>
                </div>
                <div className={layoutStyles.inner_contents}>
                  <TreeView
                    treeId="mapping-menu-tree"
                    type={'DRAG_DROP'}
                    data={baseMenuTreeData}
                    // nodeButtons={renderBaseSelectButtons}
                    // selectedNode={selectedNode}
                    expandedKeys={baseMenuTreeExpandedKeys}
                    onExpandedKeysChange={handleBaseMenuTreeExpandChange}
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
                    <h3 className={titleStyles.title}>{t('메뉴매핑 선택')}</h3>
                    <strong className={titleStyles.sub_title}>{t('전체')}</strong>
                    <span className={titleStyles.num}>{menuTreeAllKeys?.length - 1}</span>
                  </div>
                  <div className={layoutStyles.btn_wrap}>
                    <Button
                      variant="text"
                      size="sm"
                      className={layoutStyles.btn_text}
                      onClick={() => {
                        if (menuTreeData) {
                          const allKeys = getAllTreeKeys(menuTreeData);
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
                        const firstKeys = getFirstExpandKeys(menuTreeData);
                        handleMenuTreeExpandChange(firstKeys || []);
                      }}
                    >
                      {t('전체닫기')}
                    </Button>
                  </div>
                </div>
                <div className={layoutStyles.inner_contents}>
                  <TreeView
                    treeId="mapping-tenant-menu-tree"
                    type={'SAME_LEVEL_ONLY'}
                    data={menuTreeData}
                    nodeButtons={renderMenuDeleteButtons}
                    onAction={handleTargetAction}
                    expandedKeys={menuTreeExpandedKeys}
                    onExpandedKeysChange={handleMenuTreeExpandChange}
                    // onSelectedNodeChange={handleSelectedNodeChange}
                  />
                </div>

                {/* 종료 */}
              </div>
            </div>
          </div>
        </TreeContainer>
      </ModalBody>
      {/* <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter> */}
    </ModalContainer>
  );
};

export const TenantDetailMenuMappingModal = TenantDetailMenuMappingModalComponent;
