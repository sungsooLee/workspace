import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { CombineUserGroup } from '@shared/types/user-group';
import { UserGroupOrganization } from '@shared/ui';
import { t } from 'i18next';
import { useState } from 'react';

type Props = {
  tenantIds: number[];
  option?: CombineUserGroup[];
};

const UserGroupOrganizationShuttleModalComponent = ({ tenantIds, option: optionProp }: Props) => {
  const { closeModal } = useModal();

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
