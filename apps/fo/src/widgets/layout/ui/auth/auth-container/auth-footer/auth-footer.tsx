import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { TermsButton } from '../../../../../../features/auth';

import styles from './auth-footer.module.css';

function AuthFooterComponent() {
  return (
    <div className={`${styles.start} ${styles.footer_auth}`}>
      <div className={styles.footer_area}>
        <ul className={styles.menu_list}>
          <li>
            <TermsButton termsType="TERMS_OF_SERVICE" />
          </li>
          <li>
            <TermsButton termsType="PRIVACY_POLICY" />
          </li>
          <li>
            <Link to={''}>고객지원</Link>
          </li>
        </ul>
        <div className={styles.copyright}>
          copyright © 2023 Hyundai-Autoever. All rights reserved.{' '}
        </div>
        {/**
        <ul className={styles.menu_list}>
          <li>
            <Link to={'/search-account'}>아이디/비밀번호찾기</Link>
          </li>
          <li>
            <Link
              to={'/search-account/result'}
              state={{
                email: 'email@email.com',
                meta: { title: 'result' },
              }}>
              아이디/비밀번호찾기 - 아이디찾기 결과
            </Link>
          </li>
          <li>
            <Link
              to={'/search-account/result'}
              state={{
                email: '',
              }}>
              아이디/비밀번호찾기 - 아이디찾기 결과 찾을수 없음
            </Link>
          </li>
          <li>
            <Link
              to={'/search-account/change-password'}
              state={{
                authToolType: 'PHONE',
                name: '아무개',
                birthday: '19781223',
                phoneNumber: '01093432161',
              }}>
              아이디/비밀번호찾기 - 비밀번호 변경
            </Link>
          </li>
          <li>
            <Link
              to={'/change-password'}
              state={{
                authToolType: 'PHONE',
                name: '아무개',
                birthday: '19781223',
                phoneNumber: '01093432161',
              }}>
              비밀번호 변경 180일
            </Link>
          </li>
          <li>
            <Link
              to={'/identity-verification'}
              state={{
                authToolType: 'PHONE',
                name: '아무개',
                birthday: '19781223',
                phoneNumber: '01093432161',
              }}>
              개인 인증
            </Link>
          </li>
          <li>
            <Link
              to={'/signup-progress'}
              state={{
                authToolType: 'PHONE',
                name: '아무개',
                birthday: '19781223',
                phoneNumber: '01093432161',
              }}>
              회원 가입 현황
            </Link>
          </li>
        </ul>
         */}
      </div>
    </div>
  );
}

export const AuthFooter = memo(AuthFooterComponent);
