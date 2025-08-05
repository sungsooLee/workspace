import { useState } from 'react';

import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';

import { UserAvatarContents } from '@features/layout/ui/user-avatar/user-avatar-contents';
import { useLogoutUser } from '@learnway/auth/entities';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/gnb-popup-m.module.css';
import { isMobile } from 'react-device-detect';

const UserMyModalComponent = () => {
  const [contentType, setContentType] = useState('profile');
  const { closeModal } = useModal();
  const { logout } = useLogoutUser();

  console.log('@@@ modal', isMobile);
  return (
    <ModalContainer>
      <ModalTitle> </ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.user_modal}`}>
          <UserAvatarContents
            contentType={'profile'}
            setContentType={() => {
              //
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant={'primary'} size={'lx'} onClick={() => closeModal()} label={'로그아웃'} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const UserMyModal = UserMyModalComponent;
