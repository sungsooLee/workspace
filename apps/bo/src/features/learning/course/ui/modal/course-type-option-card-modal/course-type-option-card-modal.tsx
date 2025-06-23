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
          <OptionCard
            cols={3}
            size="lg"
            className={styles.select_wrap}
            options={optionsData}
            onOptionSelect={handleCardSelect}
          />
        </div>
      </ModalBody>
    </ModalContainer>
  );
});
export const CourseTypeOptionCardModal = CourseTypeOptionCardModalComponent;

const getMockData = () => {
  return {
    data: [
      {
        label: '이러닝 I',
        value: '이러닝 I',
        icon: <IcoVideo01 />,
        description: '동영상(mp4)/이러닝(scorm) 온라인 학습 유형 (상시)',
      },
      {
        label: '이러닝 II',
        value: '이러닝 II',
        icon: <IcoVideo01 />,
        description: '동영상(mp4)/이러닝(scorm) 수강신청 후 온라인 학습 유형 (정규)',
      },
      {
        label: '클래스',
        value: '클래스',
        icon: <IcoVideo01 />,
        description: '집합/워크샵/포럼·컨퍼런스로 교수자/운영자가 존재하는 유형',
      },
      {
        label: '라이브',
        value: '라이브',
        icon: <IcoVideo01 />,
        description: 'Hive/WebEX 등 실시간 스트리밍을 수강신청 없이 개설 가능한 유형',
      },
      {
        label: '평가',
        value: '평가',
        icon: <IcoVideo01 />,
        description: '시험지/퀴즈 등을 단독으로 진행할 때수강신청 여부는 선택이 가능한 유형',
      },
      {
        label: '설문',
        value: '설문',
        icon: <IcoVideo01 />,
        description: '설문을 단독 수행하려고 할 때수강신청 없이 개설이 가능한 유형',
      },
    ],
  };
};
