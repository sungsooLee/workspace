import React, { forwardRef } from 'react';
import {
  Button,
  CommonReactElementProps,
  ModalBody,
  ModalContainer,
  ModalFooter,
  OptionCard,
  useModal,
} from '@learnway/ui';
import { getRandomId } from '@learnway/shared';
import { IcoVideo01 } from '@learnway/icons';
import { useRouter } from '@tanstack/react-router';
import styles from './course-type-option-card-modal.module.css';
import { useTranslation } from 'react-i18next';

export interface CourseTypeOptionCardModalProps extends CommonReactElementProps {
  dummy?: boolean;
}

/**
 * 강사 리스트
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const CourseTypeOptionCardModalComponent = forwardRef<
  HTMLDivElement,
  CourseTypeOptionCardModalProps
>(({ ...props }, ref) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { close: closeModal } = useModal();
  const { data: optionsData }: any = getMockData();

  const handleCardSelect = (option: any) => {
    console.log('----', option);
    closeModal?.(); //router-config 에서 처리되면 삭제 예정
    router.navigate({ to: '/operation_detail_test' });
  };

  return (
    <ModalContainer>
      <ModalBody>
        <div className={styles.wrap}>
          <h2 className={styles.title}>{t('등록할 학습자원의 유형을 선택하세요.')}</h2>
          <p className={styles.text}>
            {t(
              ' 과정 유형별로 학습 기간, 수강신청 여부, 차수 생성 등의 세부 내용을 설 정할 수 있습니다.',
            )}
          </p>
          <OptionCard
            cols={4}
            size="lg"
            className={styles.select_wrap}
            options={optionsData}
            onOptionSelect={handleCardSelect}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'point'} size={'sm'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
});
export const CourseTypeOptionCardModal = CourseTypeOptionCardModalComponent;

const getMockData = () => {
  return {
    data: [
      {
        label: '클래스',
        value: getRandomId(),
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '동영상',
        value: getRandomId(),
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '이북',
        value: getRandomId(),
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '링크',
        value: getRandomId(),
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '웹',
        value: getRandomId(),
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '라이브',
        value: getRandomId(),
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '시험',
        value: getRandomId(),
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '페키지',
        value: getRandomId(),
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
    ],
  };
};
