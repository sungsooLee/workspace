import { useEffect, useMemo, useState } from 'react';
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
import { useFetchAuthUser } from '@learnway/auth/entities';

const TenantRoleModalComponent = () => {
  const { close: closeModal } = useModal();
  const { data: authUser } = useFetchAuthUser();

  const [tenantvalues, setTenantValues] = useState<{ label: string; value: string }>();
  const [rolevalues, setRolevalues] = useState<{ label: string; value: string }>();

  // 테넌트 목록
  const tenantOptions = useMemo(() => {
    if (!authUser?.tenants) return [];

    return authUser?.tenants?.map?.((tenant) => ({
      label: tenant.tenantName,
      value: String(tenant.tenantId),
    }));
  }, [authUser?.tenants]);

  // 역할 목록 ( 테넌트의 역할이기 때문에 필터링 처리 )
  const roleOptions = useMemo(() => {
    if (!authUser?.tenants) return [];
    if (!authUser?.roles) return [];

    return authUser?.roles
      ?.map?.((role) => ({
        ...role,
        label: role.roleName,
        value: String(role.roleId),
      }))
      .filter((role) => role.value === tenantvalues?.value);
  }, [authUser?.roles, tenantvalues]);

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
          disabled={!tenantvalues}
          // disabled={!tenantvalues || !rolevalues}
          onClick={() => closeModal({ tenant: tenantvalues, role: rolevalues })}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantRoleModal = TenantRoleModalComponent;
