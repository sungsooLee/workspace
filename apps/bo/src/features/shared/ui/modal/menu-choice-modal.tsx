import { FC, forwardRef, useEffect, useState } from 'react';
import { t } from 'i18next';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ShuttleTreeToChips,
  TreeNode,
  useModal,
} from '@learnway/ui';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { useMenuManageFetchTree } from '@entities/menu';
import { transformMenuApiDataToTreeData } from '@features/tenant/management/service/tenant-detail-tree.service';

const MenuModalComponent: FC<any> = forwardRef(({ menuScopeCode }, ref) => {
  const { close } = useModal();
  const [treeData, setTreeData] = useState([]);
  // const { data, isLoading } = useFetchPrograms(menuScopeCode);
  const { data } = useMenuManageFetchTree(menuScopeCode, 'ko');

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const transformedData = transformMenuApiDataToTreeData(data);
      setTreeData(transformedData);

      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: any) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
      // if (selectedApiKeys && selectedApiKeys.length > 0) {
      //   const selectedNodes = findNodesByKeys(transformedData, selectedApiKeys);
      //   // console.log(selectedNodes);
      //   setSelectedItems(selectedNodes);
      // }
    }
  }, [data]);

  const handleSelectedItemsChange = (items: { key: string; fullPath: string }[]) => {
    setSelectedItems(items);
  };

  return (
    <ModalContainer>
      <ModalTitle>메뉴 선택</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={popupStyles.container}>
            <ShuttleTreeToChips
              treeId="api-list-tree"
              sourceTitle="메뉴 목록"
              targetTitle="선택 카테고리"
              sourceData={treeData as TreeNode[]}
              selectedItems={selectedItems}
              onItemsChange={handleSelectedItemsChange}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={close} />
          <Button
            label={t('적용')}
            variant={'primary'}
            size={'lg'}
            onClick={() => close(selectedItems)}
          />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
});

export const MenuChoiceModal = MenuModalComponent;
