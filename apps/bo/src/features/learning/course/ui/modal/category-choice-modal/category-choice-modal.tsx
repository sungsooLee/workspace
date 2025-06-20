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

export interface CategoryChoiceModalProps {
  dummy?: boolean;
  channelId?: string; // parameter test
}

/**
 * 강사 리스트
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const CategoryChoiceModalComponent = forwardRef<HTMLDivElement, CategoryChoiceModalProps>(
  ({ channelId, ...props }, ref) => {
    const { t } = useTranslation();
    const { close: closeModal } = useModal();
    const { data: gridData }: any = getMockData();
    const [selectedRows, setSelectedRows] = useState();
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const columns = [{ header: t('강사명'), accessorKey: 'name' }];

    const handleRowsSelect = (rows: any) => {
      setSelectedRows(rows);
    };

    const handleItemsChange = (items: any[]) => {
      setSelectedItems(items);
    };

    return (
      <ModalContainer>
        <ModalTitle>{t('카테고리 조회')}</ModalTitle>
        <ModalBody>
          <div className={styles.wrap}>
            <ShuttleTreeToChips
              title="source"
              displayKey="title"
              targetTitle="카테고리 목록"
              sourceTitle="카테고리 선택"
              treeId="category-tree"
              sourceData={[]}
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
