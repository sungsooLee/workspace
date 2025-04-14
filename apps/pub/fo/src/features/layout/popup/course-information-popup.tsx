import { memo } from 'react';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, Button } from '@learnway/ui';
import styles from './course-information-popup.module.css';

// 인워마감 안내
const CourseInformationPopupComponent01 = () => {
  return (
    <ModalContainer>
      <ModalTitle>인원마감 안내</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.course_information}`}>
          <strong>수강인원이 마감되었습니다.</strong>
          <p>
            수강신청에 불편을 드려 대단히 죄송합니다.
            <br />본 과정은 수강 취소가 발생 할 경우
            <br />
            수강대기를 해주신 분들에게 먼저 안내를 보내고 있습니다.
            <br />
            수강대기 신청을 하시겠습니까?
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'아니요'} variant="gray" size="lg"></Button>
        <Button label={'수강대기 신청'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

// 수강대기 신청
const CourseInformationPopupComponent02 = () => {
  return (
    <ModalContainer>
      <ModalTitle>수강대기 신청</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.course_information}`}>
          <strong>44번째 수강대기 신청이 되었습니다!</strong>
          <p>
            수강취소 발생시 문자와 이메일로
            <br />
            안내 드리겠습니다. 감사합니다.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

// 인원마감 안내
const CourseInformationPopupComponent03 = () => {
  return (
    <ModalContainer>
      <ModalTitle>인원마감 안내</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.course_information}`}>
          <strong>수강대기 인원까지 모두 마감되었습니다!</strong>
          <p>
            본 과정의 수강대기 인원까지 모두 마감이 되어
            <br />
            더 이상 수강신청을 할 수 없습니다.
            <br />
            다른 과정을 이용해주시기 바랍니다.
            <br />
            수강신청에 불편을 드려 대단히 죄송합니다.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

// 수강제한 안내
const CourseInformationPopupComponent04 = () => {
  return (
    <ModalContainer>
      <ModalTitle>수강제한 안내</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.course_information}`}>
          <strong>수강신청을 하실 수 없습니다.</strong>
          <p>
            본사의 교육제도에 의거 XX 하였기에
            <br />
            본 과정을 수강 하실 수 없습니다.
            <br />
            불편을 드려 대단히 죄송합니다.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

// 수강제한 안내 (n번 수강으로 안내)
const CourseInformationPopupComponent05 = () => {
  return (
    <ModalContainer>
      <ModalTitle>수강제한 안내</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.course_information}`}>
          <strong>더 이상 수강신청을 하실 수 없습니다.</strong>
          <p>
            본사의 교육제도에 의거 XX한 과정을
            <br />
            Y번 수강 하였기에 더 이상 수강 하실 수 없습니다.
            <br />
            불편을 드려 대단히 죄송합니다.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

// 수강중복 안내
const CourseInformationPopupComponent06 = () => {
  return (
    <ModalContainer>
      <ModalTitle>수강중복 안내</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.course_information}`}>
          <strong>동일한 기간에 타 클래스를 수강신청하셨습니다</strong>
          <p>
            [스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축] 클래스 과정이 YYYY-MM-HH에
            있습니다.
            <br />
            그래도 신청 하시겠습니까?
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'아니요'} variant="gray" size="lg"></Button>
        <Button label={'수강 신청'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

// 수강신청 반려
const CourseRevertPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'반려'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.course_revert}`}>
          <div className={styles.information}>
            <strong>김지혜</strong>
            <div className={styles.box}>
              <span>현대오토에버</span>
              <span>L&D플랫폼팀</span>
              <span>2026.07.12</span>
            </div>
          </div>
          <p>반려사유</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const CourseInformationPopup = memo(CourseRevertPopupComponent);
