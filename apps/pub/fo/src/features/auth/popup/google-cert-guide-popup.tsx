import { memo } from 'react';
import { cn } from '@learnway/shared';
import { isMobile } from 'react-device-detect';
import { Button, ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui';
import styles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide.module.css';

import imgGuide2 from '@learnway/styles/fo/assets/images/popup/google_guide_img2.png';
import imgGuide3 from '../../../assets/images/popup/google_guide_img3.png';
import imgGuide4 from '../../../assets/images/popup/google_guide_img4.png';
import imgGuide5 from '../../../assets/images/popup/google_guide_img5.png';
import imgGuide6 from '../../../assets/images/popup/google_guide_img6.png';
import imgGuideM2 from '../../../assets/images/popup/google_guide_img2_m.png';
import imgGuideM3 from '../../../assets/images/popup/google_guide_img3_m.png';
import imgGuideM4 from '../../../assets/images/popup/google_guide_img4_m.png';
import imgGuideM5 from '../../../assets/images/popup/google_guide_img5_m.png';
import imgGuideM6 from '../../../assets/images/popup/google_guide_img6_m.png';

const GoogleCertGuidePopupCompoment = () => {
  //const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'FIDO 인증'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.google_cert_guide_popup}`}>
          <div className={styles.guide_list}>
            <div className={styles.list_box}>
              <h3>1.구글 OTP(Google Authenticator) 앱을 휴대폰에 설치해 주세요.</h3>
              <ul className={styles.info_list}>
                <li>구글 OTP 앱 소개 PC 화면(휴대폰에 앱 설치 필수)</li>
              </ul>
              <div className={styles.btn_box}>
                <Button variant="gray" size="sm" className={styles.btn_download}>
                  AOS 다운로드
                </Button>{' '}
                <Button variant="gray" size="sm" className={styles.btn_download}>
                  IOS 다운로드
                </Button>
              </div>
            </div>

            <div className={styles.list_box}>
              <h3>2.러닝웨이 구글 OTP 계정을 생성해 주세요.</h3>
              <ul className={styles.info_list}>
                <li>PC에서 QR코드로 인증키 생성 버튼을 클릭하면 QR 코드가 생성됩니다.</li>
              </ul>
              <div className={styles.guide_img_box}>
                <figure>
                  {/* 퍼블수정 20250325 : 이미지 모바일 분기처리 */}
                  <img src={isMobile ? imgGuideM2 : imgGuide2} alt="" />
                </figure>
              </div>
            </div>

            <div className={styles.list_box}>
              <h3>3.구글 OTP 앱으로 QR 코드를 스캔해 주세요.</h3>
              <ul className={styles.info_list}>
                <li>
                  앱에서 + 버튼을 탭하고 QR코드를 스캔 후에 PC QR코드 화면의 다음 버튼을 클릭해
                  주세요.
                </li>
                <li>QR코드를 스캔하면 앱에서 인증번호를 확인할 수 있습니다. </li>
              </ul>
              <div className={styles.guide_img_box}>
                <figure>
                  {/* 퍼블수정 20250325 : 이미지 모바일 분기처리 */}
                  <img src={isMobile ? imgGuideM3 : imgGuide3} alt="" />
                </figure>
              </div>
            </div>

            <div className={styles.list_box}>
              <h3>4.구글 앱 OTP 번호를 PC에 입력해주세요.</h3>
              <ul className={styles.info_list}>
                <li>앱에서 러닝웨이 OTP 번호를 PC화면에 입력하고 다음 버튼을 클릭해 주세요.</li>
                <li>OTP 번호가 맞으면 인증키 생성이 완료됩니다. </li>
              </ul>
              <div className={styles.guide_img_box}>
                <figure>
                  {/* 퍼블수정 20250325 : 이미지 모바일 분기처리 */}
                  <img src={isMobile ? imgGuideM4 : imgGuide4} alt="" />
                </figure>
              </div>
            </div>

            <div className={styles.list_box}>
              <h3>5.인증키 생성 완료 후에 구글 OTP 2차 인증을 진행해 주세요. </h3>
              <ul className={styles.info_list}>
                <li>앱에서 러닝웨이 인증번호를 입력하고 구글 OTP 인증 버튼을 클릭해 주세요.</li>
                <li>OTP 번호가 맞으면 2차 인증이 완료됩니다. </li>
              </ul>
              <div className={styles.guide_img_box}>
                <figure>
                  {/* 퍼블수정 20250325 : 이미지 모바일 분기처리 */}
                  <img src={isMobile ? imgGuideM5 : imgGuide5} alt="" />
                </figure>
              </div>
            </div>

            <div className={styles.list_box}>
              <h3>※ QR코드를 스캔이 되지 않는 경우 설정키를 입력해 주세요. </h3>
              <ul className={styles.info_list}>
                <li>PC화면의 설정키를 앱 실행 후 내 키에 입력해 주세요.</li>
                <li>계정 이름은 직접 입력해 주세요.(러닝웨이 입력)</li>
                <li>정보 입력 후 추가 버튼을 탭 해주세요. </li>
              </ul>
              <div className={styles.guide_img_box}>
                <figure>
                  {/* 퍼블수정 20250325 : 이미지 모바일 분기처리 */}
                  <img src={isMobile ? imgGuideM6 : imgGuide6} alt="" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const GoogleCertGuidePopup = memo(GoogleCertGuidePopupCompoment);
