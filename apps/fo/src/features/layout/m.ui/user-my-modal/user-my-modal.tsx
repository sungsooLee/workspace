import { useLogoutUser } from '@learnway/auth/entities';
import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/gnb-popup-m.module.css';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { UserAvatarContents } from '../../ui/user-avatar/user-avatar-contents';

const UserMyModalComponent = () => {
  const { t } = useTranslation();
  const { closeModal, confirm: openConfirm, alert: openAlert, closeAllModal } = useModal();
  const { logout } = useLogoutUser();
  const router = useRouter();
  const handleLogout = async () => {
    const result = await openConfirm({
      content: <>{t('로그아웃 하시겠습니까?')}</>,
      cancelButtonLabel: t('취소'),
      okButtonLabel: t('로그아웃'),
    });

    if (result) {
      logout(
        {},
        {
          onSuccess: async () => {
            closeAllModal();
            router.navigate({ to: '/login' });
            await openAlert({ content: <>{t('로그아웃 되었습니다.')}</> });
          },
        },
      );
    }
  };

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
        <Button variant={'primary'} size={'lx'} onClick={() => handleLogout()} label={'로그아웃'} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const UserMyModal = UserMyModalComponent;
