import { Avatar, Button, ModalBody, ModalContainer, ModalTitle } from '@learnway/ui';
import { Link } from '@tanstack/react-router';
import { memo } from 'react';

import { IcoChart, IcoDocument, IcoPoint } from '@learnway/icons';

import styles from './navigation-popup_m.module.css';

const NavigationPopupMComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle> </ModalTitle>
      <ModalBody>
        {/* 퍼블수정 20250731 전체 수정 */}
        <div className={styles.start}>
          <div className={styles.profile_info}>
            <div className={styles.avatar_img}>
              {/* 이미지일경우 */}
              <Avatar imageUrl="https://github.com/shadcn.png" size="2xl" />
              {/* 텍스트일경우 */}
              {/* <Avatar fallback="AB" size="2xl" /> */}
            </div>
            <div className={styles.profile}>
              <div className={styles.info_box}>
                <span className={styles.name}>김현대</span>
                <Button size="sm" underline={true} label={'개인정보변경'} />
              </div>
              <div className={styles.tenant}>
                <span>현대오토에버</span>
                <span>Sales & Marketing</span>
              </div>
            </div>
          </div>

          <div className={styles.point_box}>
            <IcoPoint className={styles.ico} />
            <span className={styles.txt}>나의 포인트</span>
            <span className={styles.point}>
              <em>243</em>P
            </span>
          </div>

          <div className={styles.recent_visits}>
            <ul className={styles.list}>
              <li>
                <Button className={styles.btn}>
                  <span className={styles.ico}>
                    <IcoDocument />
                  </span>
                  <span className={styles.txt}>Hi-Sence</span>
                </Button>
              </li>
              <li>
                <Button className={styles.btn}>
                  <span className={styles.ico}>
                    <IcoChart />
                  </span>
                  <span className={styles.txt}>법정교육필수</span>
                </Button>
              </li>
            </ul>
          </div>

          <ul className={styles.gnb}>
            <li>
              <div className={styles.gnb_title}>
                <strong>기술인증</strong>
              </div>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={'/'}>금융자격지원제도</Link>
                </li>
                <li>
                  <Link to={'/'}>SPA 승진제도</Link>
                </li>
              </ul>
            </li>

            <li>
              <div className={styles.gnb_title}>
                <strong>학습계획</strong>
              </div>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={'/'}>금융자격지원제도</Link>
                </li>
                <li>
                  <Link to={'/'}>SPA 승진제도</Link>
                </li>
              </ul>
            </li>

            <li>
              <div className={styles.gnb_title}>
                <strong>HMCP</strong>
              </div>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={'/'}>안내</Link>
                </li>
                <li>
                  <Link to={'/'}>시험일정</Link>
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
