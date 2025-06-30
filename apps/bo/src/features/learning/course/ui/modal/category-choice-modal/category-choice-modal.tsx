import React, { forwardRef, useState } from 'react';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ShuttleTreeToChips,
  useModal,
} from '@learnway/ui';
import { useTranslation } from 'react-i18next';
import styles from './category-choice-modal.module.css';
import { useFetchTenantCategoryTreePopup } from '@entities/tenant';
import { transformApiDataToApiTreeData } from '@features/platform/menu';

export interface CategoryChoiceModalProps {
  /** 테넌트 아이디 배열 */
  tenantIds: Array<number>;
}

/**
 * 강사 리스트
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const CategoryChoiceModalComponent = forwardRef<HTMLDivElement, CategoryChoiceModalProps>(
  ({ tenantIds, ...props }, ref) => {
    const { t } = useTranslation();
    const { close: closeModal } = useModal();
    const { data: treeData } = useFetchTenantCategoryTreePopup(tenantIds, {select: (response: any) => transformApiDataToApiTreeData(response)});
    const [selectedRows, setSelectedRows] = useState();
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    console.log('Category ChoiceModalComponent', {tenantIds, treeData});

    const handleItemsChange = (items: any[]) => {
      setSelectedItems(items);
    };

    return (
      <ModalContainer>
        <ModalTitle>{t('카테고리 선택')}</ModalTitle>
        <ModalBody>
          <div className={styles.wrap}>
            <ShuttleTreeToChips
              title="source"
              displayKey="title"
              targetTitle="공통 카테고리 선택"
              sourceTitle="선택 카테고리 목록"
              treeId="category-tree"
              sourceData={treeData}
              // selectedItems={selectedItems}
              initLevel={1}
              onItemsChange={handleItemsChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button
            label={t('확인')}
            variant={'primary'}
            size={'lg'}
            onClick={() => closeModal(selectedRows)}
          />
        </ModalFooter>
      </ModalContainer>
    );
  },
);
export const CategoryChoiceModal = CategoryChoiceModalComponent;

const getMockData = () => {
  return {
    data: Array(10)
      .fill(null)
      .map((d, i) => ({ id: `id${i}`, name: `manager${i}` })),
  };
};
