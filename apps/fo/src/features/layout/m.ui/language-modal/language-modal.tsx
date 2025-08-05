import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui/modal';

import { UserAvatarContentsLanguage } from '@features/layout/ui/user-avatar/user-avatar-contents-language';
import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/gnb-popup-m.module.css';
import { useTranslation } from 'react-i18next';

const LanguageModalComponent = () => {
  const { t } = useTranslation();

  return (
    <ModalContainer>
      <ModalTitle>{t('언어')}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.user_modal}`}>
          <UserAvatarContentsLanguage
            contentType={'lang'}
            setContentType={() => {
              //
            }}
          />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const LanguageModal = LanguageModalComponent;
