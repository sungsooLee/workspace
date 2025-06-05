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
import { UserGroupOrganization } from '../components/user-group-organization';
import { UserGroupPosition } from '../components/user-group-position';
import { UserGroupOccupation } from '../components/user-group-occupation';
import { UserGroupJobTitle } from '../components/user-group-job-title';
import { UserGroupTenant } from '../components/user-group-tenant';
import { UserGroupCustom } from '../components/user-group-custom';

const UserGroupTabModalComponent = forwardRef((props) => {
  const { close: closeModal } = useModal();

  const [selectedTabKey, setSelectedTabKey] = useState<string>('ORGANIZATION');

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
      <ModalTitle>{t('유저 그룹 조회')}</ModalTitle>
      <ModalBody>
        <Tabs
          items={[
            {
              title: '조직',
              key: 'ORGANIZATION',
              content: <UserGroupOrganization handleRowSelect={handleRowSelect} />,
            },
            {
              title: t('보직'),
              key: 'POSITION',
              content: <UserGroupPosition handleRowSelect={handleRowSelect} />,
            },
            {
              title: t('직군'),
              key: 'OCCUPATION',
              content: <UserGroupOccupation handleRowSelect={handleRowSelect} />,
            },
            {
              title: t('호칭'),
              key: 'JOB_TITLE',
              content: <UserGroupJobTitle handleRowSelect={handleRowSelect} />,
            },
            {
              title: t('테넌트'),
              key: 'TENANT',
              content: <UserGroupTenant handleRowSelect={handleRowSelect} />,
            },
            {
              title: '사용자 정의',
              key: 'CUSTOM',
              content: <UserGroupCustom handleRowSelect={handleRowSelect} />,
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

export const UserGroupTabsChoiceModal = UserGroupTabModalComponent;
