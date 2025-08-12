// IA102 / NLP_BO_CMS_1060

import { cn } from '@learnway/shared';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle } from '@learnway/ui/modal';
import { Spinner } from '@learnway/ui/spinner';
import { useTranslation } from 'react-i18next';
import styles from './copy.module.css';

const CreateModalComponent = () => {
  const { t } = useTranslation();

  return (
    <ModalContainer className={styles.copy}>
      <ModalTitle>{t('교육자원 생성 중입니다.')}</ModalTitle>
      <ModalBody>
        <pre>{t('잠시 기다려주세요.')}</pre>
      </ModalBody>
      <ModalFooter>
        <div className={cn('w-full', 'flex', 'items-center', 'justify-center')}>
          <Spinner isLoading />
        </div>
      </ModalFooter>
    </ModalContainer>
  );
};

export const CreateModal = CreateModalComponent;
