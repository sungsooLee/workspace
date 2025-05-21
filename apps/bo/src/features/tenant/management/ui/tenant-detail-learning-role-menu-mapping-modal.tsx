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
  transformRoleMenuApiDataToTreeData,
  transformMenuApiDataToTreeData,
} from '../service/tenant-detail-tree.service';
import {
  useFetchRoleMenus,
  useModifyMenusAndApiToRole,
} from '@entities/role/service/role-manage.hook';

const TenantDetailLearningRoleMenuMappingModalComponent: FC<any> = ({
  siteScope,
  tenantId,
  roleCode,
}) => {
  const [tenantMenuTree, setTenantMenuTree] = useState([]);
  const [tenantMenuTreeExpandedKeys, setTenantMenuTreeExpandedKeys] = useState<string[]>([]);
  const [tenantMenuTreeAllKeys, setTenantMenuTreeAllKeys] = useState<string[]>([]);

  const [roleMenuTree, setRoleMenuTree] = useState([]);
  const [roleMenuTreeExpandedKeys, setRoleMenuTreeExpandedKeys] = useState<string[]>([]);
  const [roleMenuTreeAllKeys, setRoleMenuTreeAllKeys] = useState<string[]>([]);

  const { open: openModal, confirm: openConfirm, close: closeModal } = useModal();

  const { data: tenantMenuData } = useFetchMenuTenantMappingTree(tenantId, siteScope);
  const { data: roleMenuData, refetch } = useFetchRoleMenus(tenantId, siteScope, roleCode);
  const { create } = useModifyMenusAndApiToRole({
    onSuccess: () => {
      refetch();
    },
  });

  const handleTenantMenuTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setTenantMenuTreeExpandedKeys(keys);
    }
  };
  const handleRoleMenuTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setRoleMenuTreeExpandedKeys(keys);
    }
  };

  const handleTargetAction = async (event: any) => {
    switch (event.type) {
      case 'NODE_COPY':
        console.log('copy ', event);
        if (event.sourceTreeId === 'mapping-menu-tree') {
          const sourceMenuId = event.sourceNode.key;
          if (roleMenuTreeAllKeys.includes(sourceMenuId)) {
            alert('이미 있음');
            return false;
          }
          const allPostMenus = getAllParentAndAllChildById(tenantMenuTree, sourceMenuId);
          const contents = [];
          for (const item of allPostMenus) {
            if (!roleMenuTreeAllKeys.includes(item.key)) {
              contents.push(item.menuId);
            }
          }
          const payload = {
            roleCode: roleCode,
            body: {
              addMenuIds: [...contents],
              removeMenuIds: [],
              addApis: [],
              removeApis: [],
            },
          };
          console.log('save', payload);
          create(payload);
        }
        break;

      default:
        break;
    }
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
          if (tenantMenuTreeExpandedKeys.includes(node.key)) {
            const expandedKeys = [
              ...tenantMenuTreeExpandedKeys.filter((value) => value !== node.key),
            ];
            setRoleMenuTreeExpandedKeys(expandedKeys);
          }
          //deleteMenuTenent(payload);
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
    console.log('roleCode', roleCode);
    if (roleMenuData) {
      console.log(roleMenuData);
      const transformedData = transformRoleMenuApiDataToTreeData(roleMenuData);
      setRoleMenuTree(transformedData);
      if (transformedData && transformedData.length > 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setRoleMenuTreeExpandedKeys(firstLevelKeys);
        const allKeys = getAllTreeKeys(transformedData);
        setRoleMenuTreeAllKeys(allKeys);
      }
    }
  }, [roleMenuData]);

  useEffect(() => {
    if (tenantMenuData) {
      const transformedData = transformMenuApiDataToTreeData(tenantMenuData);
      console.log(transformedData);
      setTenantMenuTree(transformedData);
      if (transformedData && transformedData.length > 0 && tenantMenuTreeExpandedKeys.length == 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setTenantMenuTreeExpandedKeys(firstLevelKeys);
      }
      const allKeys = getAllTreeKeys(transformedData);
      setTenantMenuTreeAllKeys(allKeys);
    }
  }, [tenantMenuData]);

  return (
    <ModalContainer>
      <ModalTitle>{t('메뉴선택')}</ModalTitle>
      <ModalBody>
        <TreeContainer>
          <div className={cn(popContentsStyles.start, popContentsStyles.wrap)}>
            <div className={popContentsStyles.inner}>
              <div className={popContentsStyles.inner_contents}>
                {/* 시작 */}
                <div className={titleStyles.title_wrap}>
                  <div className={titleStyles.title_area}>
                    <h3 className={titleStyles.title}>{t('메뉴 목록')}</h3>
                    <strong className={titleStyles.sub_title}>{t('전체')}</strong>
                    <span className={titleStyles.num}>{tenantMenuTreeAllKeys?.length - 1}</span>
                  </div>
                  <div className={layoutStyles.btn_wrap}>
                    <Button
                      variant="text"
                      size="sm"
                      className={layoutStyles.btn_text}
                      onClick={() => {
                        if (roleMenuTree) {
                          const allKeys = getAllTreeKeys(roleMenuTree);
                          handleTenantMenuTreeExpandChange(allKeys);
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
                        const firstKeys = getFirstExpandKeys(tenantMenuTree);
                        handleTenantMenuTreeExpandChange(firstKeys || []);
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
                    data={tenantMenuTree}
                    // nodeButtons={renderBaseSelectButtons}
                    // selectedNode={selectedNode}
                    expandedKeys={tenantMenuTreeExpandedKeys}
                    onExpandedKeysChange={handleTenantMenuTreeExpandChange}
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
                    <span className={titleStyles.num}>{roleMenuTreeAllKeys?.length - 1}</span>
                  </div>
                  <div className={layoutStyles.btn_wrap}>
                    <Button
                      variant="text"
                      size="sm"
                      className={layoutStyles.btn_text}
                      onClick={() => {
                        if (tenantMenuTree) {
                          const allKeys = getAllTreeKeys(tenantMenuTree);
                          handleRoleMenuTreeExpandChange(allKeys);
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
                        const firstKeys = getFirstExpandKeys(tenantMenuTree);
                        handleRoleMenuTreeExpandChange(firstKeys || []);
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
                    data={roleMenuTree}
                    nodeButtons={renderMenuDeleteButtons}
                    onAction={handleTargetAction}
                    expandedKeys={roleMenuTreeExpandedKeys}
                    onExpandedKeysChange={handleRoleMenuTreeExpandChange}
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

export const TenantDetailLearningRoleMenuMappingModal =
  TenantDetailLearningRoleMenuMappingModalComponent;
