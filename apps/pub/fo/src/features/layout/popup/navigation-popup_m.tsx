import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { PasswordVerifyPopup } from '../../layout';
import { cn } from '@learnway/shared';
import { ModalBody, ModalContainer, ModalTitle, useModal, Avatar, Button } from '@learnway/ui';

import { IcoHome03, IcoSetting01, IcoMybook, IcoReview } from '@learnway/icons';

import styles from './navigate-modal.module.css';

const NavigationPopupMComponent = () => {
  const { open: openModal } = useModal();
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle> </ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          <div className={styles.profile_info}>
            <div className={styles.profile}>
              <span className={styles.name}>김현대</span>
              <span className={styles.tenant}>현대오토에버</span>
              <span className={styles.team}>팀명</span>
              <Button
                className={styles.link}
                onClick={() =>
                  openModal({
                    width: 'm_full',
                    content: <PasswordVerifyPopup />,
                  })
                }
              >
                개인정보변경
              </Button>
            </div>
            <div className={styles.avata_img}>
              <span className={styles.info_avata}>
                <em className={styles.text}>{'김'}</em>
              </span>
              <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
            </div>
          </div>
          <ul className={styles.gnb}>
            <li>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={''}>
                    <IcoReview width={20} height={20} stroke="#131c30"></IcoReview>
                    H-Sence
                  </Link>
                </li>
                <li>
                  <Link to={''}>
                    <IcoMybook width={20} height={20} stroke="#131c30"></IcoMybook>법정필수교육
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div className={styles.gnb_title}>
                <strong>기술인증</strong>
              </div>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={''}>H-Sence</Link>
                </li>
                <li>
                  <Link to={''}>법정필수교육</Link>
                </li>
              </ul>
            </li>
            <li>
              <div className={styles.gnb_title}>
                <strong>학습계획</strong>
              </div>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={''}>금융자격지원제도</Link>
                </li>
                <li>
                  <Link to={''}>SPA 승진제도</Link>
                </li>
              </ul>
            </li>
            <li>
              <div className={styles.gnb_title}>
                <strong>HMCP</strong>
              </div>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={''}>안내</Link>
                </li>
                <li>
                  <Link to={''}>시험일정</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const NavigationPopupM = memo(NavigationPopupMComponent);
