import { memo } from 'react';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, Button } from '@learnway/ui';
import styles from './course-information-popup.module.css';

const CourseInformationPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>수강신청 불가 팝업창들 타이틀</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.course_information}`}>
          <strong>수강신청 불가 팝업창들 내용</strong>
          <p>수강신청 불가 팝업창들 내용</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'아니요'} variant="gray" size="lg"></Button>
        <Button label={'수강 신청'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const CourseInformationPopup = memo(CourseInformationPopupComponent);
