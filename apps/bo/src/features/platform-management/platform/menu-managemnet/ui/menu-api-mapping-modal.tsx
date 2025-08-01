import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { findNodesByKeys, ShuttleTreeToChips, TreeNode } from '@learnway/ui/tree-view';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useFetchPrograms } from '../../../../../entities/program/service/program-manage.hook';
import { transformApiDataToApiTreeData } from '../service/menu.service';
import { ApiInfoModal } from './api-info-modal';

const MenuApiMappingModalComponent = ({ menuScopeCode, selectedApiKeys }: any) => {
  const { openModal, closeModal } = useModal();
  const [treeData, setTreeData] = useState([]);
  const { data, isLoading } = useFetchPrograms(menuScopeCode);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      const transformedData = transformApiDataToApiTreeData(data);
      setTreeData(transformedData);

      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: any) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
      console.log(transformedData);
      if (selectedApiKeys && selectedApiKeys.length > 0) {
        console.log(selectedApiKeys);
        const selectedNodes = findNodesByKeys(transformedData, selectedApiKeys);
        // console.log(selectedNodes);
        setSelectedItems(selectedNodes);
      }
    }
  }, [data, selectedApiKeys]);

  const handleSelectedItemsChange = (items: { key: string; fullPath: string }[]) => {
    setSelectedItems(items);
  };

  const handleCustomNodeClick = (node: TreeNode) => {
    if (node && node.apiUuid && node.level && node.level >= 1 && node.apiNodeType === 'API') {
      openModal({
        content: <ApiInfoModal apiId={node.apiUuid} />,
        width: 's',
        closeOnOutsideClick: true,
      });
    }
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('LABEL.add', { type: 'API' })}</ModalTitle>
      <ModalBody>
        <div className={styles.wrap}>
          <div className={cn(styles.pop_contents, 'h-full')}>
            <ShuttleTreeToChips
              treeId="api-list-tree"
              sourceTitle={t('LABEL.list', { type: 'API' })}
              targetTitle={t('LABEL.select', { type: 'API' })}
              sourceData={treeData as TreeNode[]}
              selectedItems={selectedItems}
              onItemsChange={handleSelectedItemsChange}
              onCustomNodeClick={handleCustomNodeClick}
              isSelectableNode={(node) => {
                return node.apiNodeType === 'API';
              }}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant={'gray'} size={'lg'} onClick={closeModal}>
          {t('LABEL.common.cancel')}
        </Button>
        <Button
          variant={'primary'}
          size={'lg'}
          onClick={() => {
            closeModal(selectedItems);
          }}
        >
          {t('LABEL.button.apply')}
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const MenuApiMappingModal = MenuApiMappingModalComponent;
