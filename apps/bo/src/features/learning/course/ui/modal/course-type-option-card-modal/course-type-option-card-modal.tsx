import React, { forwardRef } from 'react';
import {
  Button,
  CommonReactElementProps,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  OptionCard,
  useModal,
} from '@learnway/ui';
import { IcoVideo01 } from '@learnway/icons';
import styles from './course-type-option-card-modal.module.css';
import { useTranslation } from 'react-i18next';

export interface CourseTypeOptionCardModalProps extends CommonReactElementProps {
  dummy?: boolean;
}

/**
 * 과정 유형 모달
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const CourseTypeOptionCardModalComponent = forwardRef<
  HTMLDivElement,
  CourseTypeOptionCardModalProps
>(({ ...props }, ref) => {
  const { t } = useTranslation();
  const { close: closeModal } = useModal();
  const { data: optionsData }: any = getMockData();

  const handleCardSelect = (option: any) => {
    closeModal?.(option);
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('과정 유형 선택')}</ModalTitle>
      <ModalBody>
        <div className={styles.wrap}>
          <h2 className={styles.title}>{t('등록할 과정 유형을 선택하세요.')}</h2>
          <OptionCard
            cols={3}
            size="lg"
            className={styles.select_wrap}
            options={optionsData}
            onOptionSelect={handleCardSelect}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
});
export const CourseTypeOptionCardModal = CourseTypeOptionCardModalComponent;

const getMockData = () => {
  return {
    data: [
      {
        label: '이러닝',
        value: '이러닝',
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '클래스',
        value: '클래스',
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '라이브',
        value: '라이브',
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '시험',
        value: '시험',
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '설문',
        value: '설문',
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
      {
        label: '페키지',
        value: '페키지',
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼.컨퍼런스/라이브/교수자/운영자가 존재하는 유형',
      },
    ],
  };
};
