import {
  Button,
  findNodesByKeys,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ShuttleTreeToChips,
  TreeNode,
  useModal,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { useEffect, useState } from 'react';
import { useFetchPrograms } from '../../../../entities/program/service/program-manage.hook';
import { cn } from '@learnway/shared';
import { transformApiDataToApiTreeData } from '@features/platform/menu/service/menu.service';
import { t } from 'i18next';

const UserGroupOrganizationShuttleModalComponent = ({ menuScopeCode, selectedApiKeys }: any) => {
  const { close: closeModal } = useModal();
  const [treeData, setTreeData] = useState([]);
  const { data, isLoading } = useFetchPrograms(menuScopeCode);
  const [selectedRow, setSelectedRow] = useState();

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
  };

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
      if (selectedApiKeys && selectedApiKeys.length > 0) {
        console.log(selectedApiKeys);
        const selectedNodes = findNodesByKeys(transformedData, selectedApiKeys);
        setSelectedItems(selectedNodes);
      }
    }
  }, [data, selectedApiKeys]);

  const handleSelectedItemsChange = (items: { key: string; fullPath: string }[]) => {
    setSelectedItems(items);
  };

  const handleOnClose = () => {
    closeModal();
  };
  const handleOnConfirm = () => {
    if (!selectedRow) closeModal();
    closeModal(selectedRow);
  };

  return (
    <ModalContainer>
      <ModalTitle>유저 그룹 조회</ModalTitle>
      <ModalBody>
        <div className={styles.wrap}>
          <div className={cn(styles.pop_contents, 'h-full')}>
            <ShuttleTreeToChips
              showConditionSettings
              treeId="user-group-list-tree"
              sourceTitle="유저그룹 - 조직"
              targetTitle="선택 유저그룹 목록"
              sourceData={treeData as TreeNode[]}
              selectedItems={selectedItems}
              onItemsChange={handleSelectedItemsChange}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
};

export const UserGroupOrganizationShuttleModal = UserGroupOrganizationShuttleModalComponent;
