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
import { UserGroupJobPosition } from '../components/user-group-job-position';
import { UserGroupJobGroup } from '../components/user-group-job-group';
import { UserGroupJobTitle } from '../components/user-group-job-title';
import { UserGroupJob } from '../components/user-group-job';
import { UserGroupCustom } from '../components/user-group-custom';
import { CombineUserGroup, UserGroupType } from '@types';

type UserGroupTabModalProps = {
  initialTab?: UserGroupType;
  tenantIds: number[];
  option?: CombineUserGroup[];
};

const UserGroupTabModalComponent = forwardRef(
  ({ initialTab = 'ORGANIZATION', tenantIds, option: optionProp = [] }: UserGroupTabModalProps) => {
    const { close: closeModal } = useModal();

    const [selectedTabKey, setSelectedTabKey] = useState<UserGroupType>(initialTab);

    const [option, setOption] = useState<CombineUserGroup[]>(optionProp);

    const handleOnClose = () => {
      closeModal();
    };

    const handleOnConfirm = () => {
      console.log(option, 'option::');
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
                content: (
                  <UserGroupOrganization
                    tenantIds={tenantIds}
                    option={option}
                    handleSetOption={setOption}
                  />
                ),
              },
              {
                title: t('직군'),
                key: 'JOB_GROUP',
                content: (
                  <UserGroupJobGroup
                    tenantIds={tenantIds}
                    option={option}
                    handleSetOption={setOption}
                  />
                ),
              },
              {
                title: t('직무'),
                key: 'JOB',
                content: <UserGroupJob tenantIds={tenantIds} handleSetOption={setOption} />,
              },
              {
                title: t('호칭'),
                key: 'JOB_TITLE',
                content: <UserGroupJobTitle tenantIds={tenantIds} handleSetOption={setOption} />,
              },
              {
                title: t('보직'),
                key: 'JOB_POSITION',
                content: <UserGroupJobPosition tenantIds={tenantIds} handleSetOption={setOption} />,
              },
              // {
              //   title: '사용자 정의',
              //   key: 'CUSTOM',
              //   content: (
              //     <UserGroupCustom
              //       tenantIds={tenantIds}
              //       option={option}
              //       handleSetOption={setOption}
              //     />
              //   ),
              // },
            ]}
            type="line"
            size={'sm'}
            className={styles.tab_wrap}
            selectedTabKey={selectedTabKey}
            onTabChange={(tabKey) => {
              if (tabKey !== selectedTabKey) {
                setSelectedTabKey(tabKey as UserGroupType);
              }
            }}
          />
        </ModalBody>
        <ModalFooter>
          <ModalFooter>
            <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
            <Button label={t('적용')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
          </ModalFooter>
        </ModalFooter>
      </ModalContainer>
    );
  },
);

export const UserGroupTabsChoiceModal = UserGroupTabModalComponent;
