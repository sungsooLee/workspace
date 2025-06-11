/* eslint-disable @nx/enforce-module-boundaries */
import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
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

import styles from './admin-auth-step4.module.css';

export const Route = createFileRoute('/_auth/popup-role-select')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  useEffect(() => {
    openModal({
      width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
      content: <Contents />,
    });
  }, [openModal]);
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap}`}>
        <div className={cn(styles.auth_box, 'auth--box')}></div>
      </div>
    </form>
  );
}

const Contents = () => {
  const { close: closeModal } = useModal();
  const [tenantvalues, setTenantValues] = useState<string>('a');
  const [rolevalues, setRolevalues] = useState<string>('a');
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
            setTenantValues(option.value);
          }}
        />
        <FormSubTitle label={'역할 선택'} size={'sm'} />
        <OptionCard
          value={rolevalues}
          cols={2}
          size="md"
          options={roleOptions}
          onOptionSelect={(option: OptionCardItem) => {
            setRolevalues(option.value);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};
