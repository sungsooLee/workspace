import { useMemo, useState } from 'react';
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
import { useFetchAuthUser, useUpdateTenantRoleLastSelect } from '@learnway/auth/entities';
import { useTranslation } from 'react-i18next';

const TenantRoleModalComponent = () => {
  const { t } = useTranslation();
  const { close: closeModal } = useModal();
  const { data: authUser } = useFetchAuthUser();
  const { update: updateTenantRole } = useUpdateTenantRoleLastSelect();

  const [tenantvalues, setTenantValues] = useState<OptionCardItem>();
  const [rolevalues, setRolevalues] = useState<OptionCardItem | undefined>();

  // 테넌트 목록
  const tenantOptions = useMemo(() => {
    if (!authUser?.tenants) return [];

    return authUser?.tenants?.map?.((tenant) => ({
      label: tenant.tenantName,
      value: String(tenant.tenantId),
      original: { ...tenant },
    }));
  }, [authUser?.tenants]);

  // 역할 목록 ( 테넌트의 역할이기 때문에 필터링 처리 )
  const roleOptions = useMemo(() => {
    if (!authUser?.tenants) return [];
    if (!authUser?.roles) return [];

    return authUser?.roles
      ?.map?.((role) => ({
        label: role.roleName,
        value: String(role.roleId),
        original: { ...role },
      }))
      .filter((role) => role.original.tenantId === tenantvalues?.original?.tenantId);
  }, [authUser?.roles, tenantvalues]);

  const handleOk = () => {
    if (!tenantvalues) return;
    updateTenantRole(
      {
        lastVisitedBoTenantId: tenantvalues?.original?.tenantId,
        lastVisitedBoRoleId: rolevalues?.original?.roleId,
      },
      {
        onSuccess: (data: any) => {
          closeModal(true);
        },
        onError: (error: any) => {
          closeModal(false);
        },
      },
    );
  };

  console.log('### tenantvalues', tenantvalues);
  console.log('### roleOptions', roleOptions);

  return (
    <ModalContainer>
      <ModalTitle>{t('LABEL.modal.tenantRole.title')}</ModalTitle>
      <ModalBody>
        <FormSubTitle label={t('LABEL.modal.tenantRole.tenantTitle')} size={'sm'} />
        <OptionCard
          value={tenantvalues}
          cols={2}
          size="md"
          options={tenantOptions}
          onOptionSelect={(option: OptionCardItem) => {
            setTenantValues(option);
            setRolevalues(undefined);
          }}
        />
        <FormSubTitle label={t('LABEL.modal.tenantRole.roleTitle')} size={'sm'} />
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
          label={t('LABEL.common.ok')}
          variant={'primary'}
          size={'lg'}
          disabled={!tenantvalues}
          // disabled={!tenantvalues || !rolevalues}
          onClick={handleOk}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantRoleModal = TenantRoleModalComponent;
