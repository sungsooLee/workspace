import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import { useState } from 'react';
import { t } from 'i18next';
import { UserGroupOrganization } from '@shared/ui';
import { CombineUserGroup } from '@types';

type Props = {
  tenantIds: number[];
  option?: CombineUserGroup[];
};

const UserGroupOrganizationShuttleModalComponent = ({ tenantIds, option: optionProp }: Props) => {
  const { close: closeModal } = useModal();

  const [option, setOption] = useState<CombineUserGroup[]>(optionProp ?? []);

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
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
};

export const UserGroupOrganizationShuttleModal = UserGroupOrganizationShuttleModalComponent;
