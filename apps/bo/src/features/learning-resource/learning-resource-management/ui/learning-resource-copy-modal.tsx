// IA102 / NLP_BO_CMS_1001_2_FUNCTION 컨텐트 복사 팝업 - 기획 확인 필요

import { usePostContentCopy } from '@entities/learning-resource';
import { getDetailPathByContentType } from '@features/learning-resource';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { Spinner } from '@learnway/ui/spinner';
import { useRouter } from '@tanstack/react-router';
import { ContentInformation } from '@types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './copy.module.css';

const CopyModalComponent = ({ contentUuid }: { contentUuid: string }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { closeModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const { create: postContentCopy } = usePostContentCopy({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (result: ContentInformation) => {
      setIsLoading(false);
      closeModal();
      router.navigate({
        to: getDetailPathByContentType(result.contentType),
        state: {
          contentUuid: result.contentUuid,
        },
      });
    },
    onError: (error: any) => {
      setIsLoading(false);
      setError(error);
      console.error(error);
      // 에러 얼럿?
    },
  });

  useEffect(() => {
    postContentCopy(contentUuid);
  }, []);

  const defaultFooter = isLoading ? (
    <div className={cn('w-full', 'flex', 'items-center', 'justify-center')}>
      <Spinner isLoading />
    </div>
  ) : (
    <div>
      <Button variant="primary" size="lg" onClick={() => closeModal()}>
        t('확인')
      </Button>
    </div>
  );

  const title = isLoading
    ? t('동영상 학습자원을 복사 중입니다.')
    : error
      ? t('동영상 학습자원 복사가 실패되었습니다')
      : '';

  const content = isLoading
    ? t('학습자원 복사가 완료되면, \n학습자원 상세화면으로 이동합니다.')
    : error
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
