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
  TreeView2,
  TreeNode,
} from '@learnway/ui';
import { cn } from '@learnway/shared';
import { IcoNarrowRight } from '@learnway/icons';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import popContentsStyles from './pop-contents-layout.module.css';
import { findMenuPathById, transformApiDataToTreeData } from '@features/menu/service/menu.service';
import { useMenuManageFetchTree } from '@entities/menu/service/menu-manage.hook';
import { useMenuTenantMangeFetchTrees } from '@entities/menu/service/menu-tenant-manage.hook';
import { getFirstExpandKeys, handleExpandAll } from '../service/tenant-detail-tree.service';

const TenantDetailMenuMappingModalComponent: FC<any> = ({ menuScopeCode, tenantId }) => {
  const [baseMenuTreeData, setBaseMenuTreeData] = useState([]);
  const [baseMenuTreeExpandedKeys, setBaseMenuTreeExpandedKeys] = useState<string[]>([]);
  const [baseMenuTreeSelectedNode, setBaseMenuTreeSelectedNode] = useState<TreeNode | null>(null);
  const [menuTreeData, setMenuTreeData] = useState([]);
  const [menuTreeExpandedKeys, setMenuTreeExpandedKeys] = useState<string[]>([]);

  const { open: openModal, close: closeModal } = useModal();

  console.log('menu Scope = ' + menuScopeCode);
  const { data: baseMenuDB } = useMenuManageFetchTree(menuScopeCode, 'ko');

  const { data: menuDB, refetch } = useMenuTenantMangeFetchTrees(tenantId, menuScopeCode);

  const handleBaseMenuTreeExpandChange = (keys: string[]) => {
    if (keys && keys.length > 0) {
      setBaseMenuTreeExpandedKeys(keys);
    }
  };
  const handleMenuTreeExpandChange = (keys: string[]) => {
    setMenuTreeExpandedKeys(keys);
  };

  const renderNodeButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'flex items-center'}>
        {level == 0 ? (
          ''
        ) : (
          <Button variant="gray2" size={'xs'} type={'button'}>
            {t('삭제')}
          </Button>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    if (baseMenuDB) {
      console.log(baseMenuDB);
      const transformedData = transformApiDataToTreeData(baseMenuDB);
      setBaseMenuTreeData(transformedData);
      if (transformedData && transformedData.length > 0 && menuTreeExpandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setBaseMenuTreeExpandedKeys(firstLevelKeys);
      }
    }
  }, [baseMenuDB]);

  useEffect(() => {
    if (menuDB) {
      const transformedData = transformApiDataToTreeData(menuDB);
      console.log(transformedData);
      setMenuTreeData(transformedData);
      if (transformedData && transformedData.length > 0 && menuTreeExpandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setMenuTreeExpandedKeys(firstLevelKeys);
      }
    }
  }, [menuDB]);

  return (
    <ModalContainer>
      <ModalTitle>
        {menuScopeCode === 'FO' ? t('학습자 메뉴추가') : t('HRD센터 메뉴추가')}
      </ModalTitle>
      <ModalBody>
        <div className={cn(popContentsStyles.start, popContentsStyles.wrap)}>
          <div className={popContentsStyles.inner}>
            <div className={popContentsStyles.inner_contents}>
              {/* 시작 */}
              <div className={titleStyles.title_wrap}>
                <h3 className={titleStyles.title}>{t('테넌트 메뉴 목록')}</h3>
                <div className={layoutStyles.btn_wrap}>
                  <Button
                    variant="text"
                    size="sm"
                    className={layoutStyles.btn_text}
                    onClick={() => {
                      if (baseMenuTreeData) {
                        const allKeys = handleExpandAll(baseMenuTreeData);
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
                <TreeContainer>
                  <TreeView2
                    treeId="mapping-menu-tree"
                    type={'DRAG_DROP'}
                    data={baseMenuTreeData}
                    // selectedNode={selectedNode}
                    expandedKeys={baseMenuTreeExpandedKeys}
                    onExpandedKeysChange={handleBaseMenuTreeExpandChange}
                    //onSelectedNodeChange={handleSelectedNodeChange}
                  />
                </TreeContainer>
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
                <h3 className={titleStyles.title}>{t('테넌트 메뉴 목록')}</h3>
                <div className={layoutStyles.btn_wrap}>
                  <Button
                    variant="text"
                    size="sm"
                    className={layoutStyles.btn_text}
                    onClick={() => {
                      if (menuTreeData) {
                        const allKeys = handleExpandAll(menuTreeData);
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
                <TreeContainer>
                  <TreeView2
                    treeId="mapping-tenant-menu-tree"
                    type={'DRAG_DROP'}
                    data={menuTreeData}
                    nodeButtons={renderNodeButtons}
                    // selectedNode={selectedNode}
                    expandedKeys={menuTreeExpandedKeys}
                    onExpandedKeysChange={handleMenuTreeExpandChange}
                    // onSelectedNodeChange={handleSelectedNodeChange}
                  />
                </TreeContainer>
              </div>

              {/* 종료 */}
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={'적용'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantDetailMenuMappingModal = TenantDetailMenuMappingModalComponent;
