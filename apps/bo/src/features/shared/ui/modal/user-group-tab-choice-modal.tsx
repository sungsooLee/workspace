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
import { IcoRefresh02 } from '@learnway/icons';

const UserGroupTabModalComponent = forwardRef((props) => {
  const { close: closeModal } = useModal();

  const [selectedTabKey, setSelectedTabKey] = useState<string>('ORGANIZATION');

  const [option, setOption] = useState<any>();

  const handleSetOption = (data: any) => {
    setOption(data);
  };

  const handleOnClose = () => {
    closeModal();
  };

  const handleOnConfirm = () => {
    closeModal(option);
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
              content: <UserGroupOrganization handleSetOption={handleSetOption} />,
            },
            {
              title: t('보직'),
              key: 'POSITION',
              content: <UserGroupPosition />,
            },
            {
              title: t('직군'),
              key: 'OCCUPATION',
              content: <UserGroupOccupation />,
            },
            {
              title: t('호칭'),
              key: 'JOB_TITLE',
              content: <UserGroupJobTitle />,
            },
            {
              title: t('테넌트'),
              key: 'TENANT',
              content: <UserGroupTenant />,
            },
            {
              title: '사용자 정의',
              key: 'CUSTOM',
              content: <UserGroupCustom />,
            },
          ]}
          type="line"
          size={'sm'}
          className={styles.tab_wrap}
          selectedTabKey={selectedTabKey}
          onTabChange={(tabKey) => {
            if (tabKey !== selectedTabKey) {
              setOption(undefined);
              setSelectedTabKey(tabKey);
            }
          }}
        />
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button
            icon={<IcoRefresh02 width={16} height={16} className="icon_refresh" />}
            variant={'gray'}
            size={'lg'}
          >
            {t('초기화')}
          </Button>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
          <Button label={t('적용')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
});

export const UserGroupTabsChoiceModal = UserGroupTabModalComponent;
