import { Button, ModalBody, ModalContainer, ModalFooter, useModal } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/e-book.module.css'; // 퍼블수정 20240318 : libs로 경로 수정
const EbookInstallGuideModalComponent = () => {
  const { close } = useModal();
  return (
    <ModalContainer>
      <ModalBody>
        <h2 className={styles.title}>
          이북 등록은
          <br />
          TOAST 프로그램에서 진행합니다.
        </h2>
        <div className={styles.contents}>
          <p className={styles.text}>
            TOAST 프로그램을 미설치 시<br /> 설치파일을 다운로드 후 설치하세요.
          </p>
        </div>
        <div className={styles.btn_box}>
          <Button variant="gray" size="sm">
            {'TOAST 프로그램 설치 파일'}
          </Button>
          <Button variant="gray" size="sm">
            {'TOAST 이북 제작 가이드'}
          </Button>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => close()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const EbookInstallGuideModal = EbookInstallGuideModalComponent;
