import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import { useState } from 'react';
import { t } from 'i18next';
import { UserGroupOrganization } from '@features/shared';
import { IcoRefresh02 } from '@learnway/icons';
import { Group } from '@types';

type Props = {
  tenantIds: number[];
  option?: Group[];
};

const UserGroupOrganizationShuttleModalComponent = ({
  tenantIds,
  option: optionProp = [],
}: Props) => {
  const { close: closeModal } = useModal();

  const [option, setOption] = useState<Group[]>(optionProp);

  const handleOnClose = () => {
    closeModal();
  };

  const handleOnConfirm = () => {
    closeModal(option);
  };
  return (
    <ModalContainer>
      <ModalTitle>유저 그룹 조회</ModalTitle>
      <ModalBody>
        <UserGroupOrganization tenantIds={tenantIds} option={option} handleSetOption={setOption} />
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
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
};

export const UserGroupOrganizationShuttleModal = UserGroupOrganizationShuttleModalComponent;
