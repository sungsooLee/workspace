import { useFetchTenantCategoryTreePopup } from '@entities/tenant';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ShuttleTreeToChipsV2,
  useModal,
  useShuttleTreeToChips,
} from '@learnway/ui';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './category-choice-modal.module.css';

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
    const { data } = useFetchTenantCategoryTreePopup(tenantIds);
    const { selectedItems, handleSelectItem, cancelSelectItem, cancelAll } =
      useShuttleTreeToChips();

    console.log('Category ChoiceModalComponent', { tenantIds, data });

    return (
      <ModalContainer>
        <ModalTitle>{t('카테고리 선택')}</ModalTitle>
        <ModalBody>
          <div className={styles.wrap}>
            <ShuttleTreeToChipsV2
              sourceTitle="공통 카테고리 선택"
              targetTitle="선택 카테고리 목록"
              apiData={[data || {}]}
              fullNameKey={'name'}
              selectedItems={selectedItems}
              handleSelectItem={handleSelectItem}
              cancelSelectItem={cancelSelectItem}
              cancelAll={cancelAll}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button
            label={t('확인')}
            variant={'primary'}
            size={'lg'}
            onClick={() => closeModal(selectedItems)}
          />
        </ModalFooter>
      </ModalContainer>
    );
  },
);
export const CategoryChoiceModal = CategoryChoiceModalComponent;
