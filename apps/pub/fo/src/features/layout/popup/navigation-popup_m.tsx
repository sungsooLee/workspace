import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { ModalBody, ModalContainer, ModalTitle, useModal, Avatar } from '@learnway/ui';

import { IcoHome03, IcoSetting01, IcoMybook, IcoReview } from '@learnway/icons';

import styles from '@learnway/styles/fo/features/layout/popup/navigation-popover_m.module.css';

const NavigationPopupMComponent = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>
        <div className={styles.header}>
          <Link to={''}>
            <IcoHome03 width={24} height={24} stroke="#131c30"></IcoHome03>
          </Link>
          <Link to={''}>
            <IcoSetting01 width={24} height={24} stroke="#131c30" fill="none"></IcoSetting01>
          </Link>
        </div>
      </ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          <div className={styles.profile_info}>
            <div className={styles.profile}>
              <span className={styles.name}>김현대</span>
              <span className={styles.tenant}>현대오토에버</span>
              <span className={styles.team}>팀명</span>
              <Link to={''} className={styles.link}>
                개인정보변경
              </Link>
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
