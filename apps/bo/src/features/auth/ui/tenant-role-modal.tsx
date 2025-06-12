import { useEffect, useState } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../bo/src/shared/ui/form';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  useModal,
  ModalTitle,
  OptionCard,
  OptionCardItem,
} from '@learnway/ui';

const TenantRoleModalComponent = () => {
  const { close: closeModal } = useModal();
  const [tenantvalues, setTenantValues] = useState<{ label: string; value: string }>();
  const [rolevalues, setRolevalues] = useState<{ label: string; value: string }>();
  const tenantOptions = [
    { label: '플랫폼 테넌트', value: 'a' },
    { label: '완성차 테넌트', value: 'b' },
  ];
  const roleOptions = [
    { label: '플랫폼 담당자', value: 'a' },
    { label: '테넌트 담당자', value: 'b' },
    { label: `${'채널명'} 채널 소유자`, value: 'c' },
    { label: `${'채널명'} 채널 구성원`, value: 'd' },
    { label: `${'채널명'} 채널 게스트`, value: 'e' },
  ];
  return (
    <ModalContainer>
      <ModalTitle>{'테넌트&역할 선택'}</ModalTitle>
      <ModalBody>
        <FormSubTitle label={'테넌트 선택'} size={'sm'} />
        <OptionCard
          value={tenantvalues}
          cols={2}
          size="md"
          options={tenantOptions}
          onOptionSelect={(option: OptionCardItem) => {
            setTenantValues(option);
          }}
        />
        <FormSubTitle label={'역할 선택'} size={'sm'} />
        <OptionCard
          value={rolevalues}
          cols={2}
          size="md"
          options={roleOptions}
          onOptionSelect={(option: OptionCardItem) => {
            setRolevalues(option);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          label={'확인'}
          variant={'primary'}
          size={'lg'}
          disabled={!tenantvalues || !rolevalues}
          onClick={() => closeModal({ tenant: tenantvalues, role: rolevalues })}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantRoleModal = TenantRoleModalComponent;
