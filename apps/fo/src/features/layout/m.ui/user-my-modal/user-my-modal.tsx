import { useState } from 'react';

import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';

import { UserAvatarContents } from '@features/layout/ui/user-avatar/user-avatar-contents';
import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/gnb-popup-m.module.css';

const UserMyModalComponent = ({ contentTypeProps = 'profile' }: any) => {
  const [contentType, setContentType] = useState(contentTypeProps);
  const { closeModal } = useModal();

  return (
    <ModalContainer>
      <ModalTitle>{contentType === 'profile' ? ' ' : '언어'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.user_modal}`}>
          <UserAvatarContents contentType={contentType} setContentType={setContentType} />
        </div>
      </ModalBody>
      {contentType === 'profile' ? (
        <ModalFooter>
          <Button variant={'primary'} size={'lx'} onClick={() => closeModal()} label={'로그아웃'} />
        </ModalFooter>
      ) : (
        ''
      )}
    </ModalContainer>
  );
};

export const UserMyModal = UserMyModalComponent;
