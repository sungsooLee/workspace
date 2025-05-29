import { useState, forwardRef } from 'react';
import { t } from 'i18next';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Tabs,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { UserChoice } from '../components/user-choice';
import { ExternalUserChoice } from '../components/external-user-choice';

const UserAndExternalUserTabsModalComponent = forwardRef((props) => {
  const { close: closeModal } = useModal();

  const [selectedTabKey, setSelectedTabKey] = useState<string>('USER');

  const [selectedRow, setSelectedRow] = useState();

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
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
      <ModalTitle>{t('유저 조회')}</ModalTitle>
      <ModalBody>
        <Tabs
          items={[
            {
              title: '유저',
              key: 'USER',
              content: <UserChoice handleRowSelect={handleRowSelect} />,
            },
            {
              title: '사외 이용자',
              key: 'EXTERNAL_USER',
              content: <ExternalUserChoice handleRowSelect={handleRowSelect} />,
            },
          ]}
          type="line"
          size={'sm'}
          className={styles.tab_wrap}
          selectedTabKey={selectedTabKey}
          onTabChange={(tabKey) => {
            if (tabKey !== selectedTabKey) {
              setSelectedRow(undefined);
              setSelectedTabKey(tabKey);
            }
          }}
        />
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
});

export const UserAndExternalUserTabsChoiceModal = UserAndExternalUserTabsModalComponent;
