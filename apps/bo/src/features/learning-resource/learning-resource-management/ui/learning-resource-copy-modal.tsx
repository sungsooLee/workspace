import styles from './copy.module.css';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Spinner,
  useModal,
} from '@learnway/ui';
import { useEffect, useState } from 'react';
import { cn } from '@learnway/shared';

const CopyModalComponent = () => {
  const { t } = useTranslation();
  const { close: closeModal } = useModal();
  const [query, setQuery] = useState({ isLoading: true, error: false });
  useEffect(() => {
    setTimeout(() => {
      setQuery({ isLoading: false, error: true });
    }, 1000);
  }, []);

  const handleClose = (confirmed: boolean) => {
    closeModal(confirmed);
  };

  const defaultFooter = query.isLoading ? (
    <div className={cn('w-full', 'flex', 'items-center', 'justify-center')}>
      <Spinner isLoading />
    </div>
  ) : (
    <div>
      <Button variant="primary" size="lg" onClick={() => handleClose(true)}>
        확인
      </Button>
    </div>
  );

  const title = query.isLoading
    ? t('동영상 학습자원을 복사 중입니다.')
    : query.error
      ? t('동영상 학습자원 복사가 실패되었습니다')
      : '';

  const content = query.isLoading
    ? t('학습자원 복사가 완료되면, \n학습자원 상세화면으로 이동합니다.')
    : query.error
      ? t('‘확인’ 선택 시 학습자원 조회화면으로 이동합니다.')
      : '';

  return (
    <ModalContainer className={styles.copy}>
      <ModalTitle>{title}</ModalTitle>
      <ModalBody>
        <pre>{content}</pre>
      </ModalBody>
      <ModalFooter>{defaultFooter}</ModalFooter>
    </ModalContainer>
  );
};

export const CopyModal = CopyModalComponent;
