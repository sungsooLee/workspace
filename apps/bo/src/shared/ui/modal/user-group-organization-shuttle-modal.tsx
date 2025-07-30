import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import { UserGroupOrganization } from '@shared/ui';
import { CombineUserGroup } from '@types';
import { t } from 'i18next';
import { useState } from 'react';

type Props = {
  tenantIds: number[];
  roleIds?: number[];
  option?: CombineUserGroup[];
};

const UserGroupOrganizationShuttleModalComponent = ({
  tenantIds,
  roleIds = [],
  option: optionProp,
}: Props) => {
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
        <UserGroupOrganization
          tenantIds={tenantIds}
          roleIds={roleIds}
          option={option}
          handleSetOption={setOption}
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
};

export const UserGroupOrganizationShuttleModal = UserGroupOrganizationShuttleModalComponent;
