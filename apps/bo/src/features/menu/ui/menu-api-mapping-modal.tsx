import {
  Button,
  findNodesByKeys,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ShuttleTreeWithChips,
  TreeNode,
  useModal,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { useFetchPrograms } from '../../../entities/program/service/program-manage.hook';
import { useEffect, useState } from 'react';
import { transformApiDataToApiTreeData, treeExpandAll } from '../service/menu.service';
import { ApiInfoModal } from './api-info-modal';

const MenuApiMappingModalComponent = ({ menuScopeCode, selectedApiKeys }: any) => {
  const { open: openModal, close } = useModal();
  const [treeData, setTreeData] = useState([]);
  const { data, isLoading } = useFetchPrograms('1', menuScopeCode);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<TreeNode[]>([]);
  useEffect(() => {
    if (data) {
      const transformedData = transformApiDataToApiTreeData(data);
      setTreeData(transformedData);

      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: any) => node.key);
        setExpandedKeys(firstLevelKeys);
      }

      if (selectedApiKeys && selectedApiKeys.length > 0) {
        const selectedNodes = findNodesByKeys(transformedData, selectedApiKeys);
        setSelectedItems(selectedNodes);
      }
    }
  }, [data, selectedApiKeys]);

  const handleSelectedItemsChange = (items: TreeNode[]) => {
    setSelectedItems(items);
  };

  const handleCustomNodeClick = (node: TreeNode) => {
    console.log(node);
    if (node && node.apiId && node.level && node.level >= 1) {
      openModal({
        content: <ApiInfoModal apiId={node.apiId} />,
        width: 's',
        closeOnOutsideClick: true,
      });
    }
  };

  return (
    <ModalContainer>
      <ModalTitle>API 추가</ModalTitle>
      <ModalBody>
        <div className={styles.wrap}>
          <div className={styles.pop_contents}>
            <ShuttleTreeWithChips
              sourceData={treeData as TreeNode[]}
              selectedItems={selectedItems}
              onItemsChange={handleSelectedItemsChange}
              onCustomNodeClick={handleCustomNodeClick}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant={'gray'} size={'md'} onClick={close}>
          취소
        </Button>
        <Button
          variant={'primary'}
          size={'md'}
          onClick={() => {
            console.log(selectedItems);
            close(selectedItems);
          }}
        >
          적용
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const MenuApiMappingModal = MenuApiMappingModalComponent;
