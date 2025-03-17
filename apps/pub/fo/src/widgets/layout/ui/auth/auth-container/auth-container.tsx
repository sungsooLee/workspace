import { ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';

import {
  PAGE_TITLE_BY_PATH,
  isSigninPage,
  isSigninPageNone,
} from '../../../../../features/platform';
import { AuthFooter } from './auth-footer/auth-footer';
import { Footer } from '../../../../../widgets/layout/ui/main/footer/footer';

import styles from './auth-container.module.css';

interface AuthContainerComponentProps {
  children: ReactNode;
}

function AuthContainerComponent({ children }: AuthContainerComponentProps) {
  const location = useLocation();
  const pageTitle = PAGE_TITLE_BY_PATH[location.pathname];

  return (
    <div
      className={`${styles.start} ${styles.auth_container} ${isSigninPage(location.pathname) ? styles.login : ''}`}>
      {/* 퍼블수정 20250317 : className 분기 */}
      <div
        className={`${styles.auth_area} ${isSigninPageNone(location.pathname) ? styles.none : ''}`}>
        {/* 퍼블수정 20250317 : 타이틀 분기 */}
        {!isSigninPageNone(location.pathname) ? (
          <h2 className={isSigninPage(location.pathname) ? styles.title_login : ''}>{pageTitle}</h2>
        ) : (
          ''
        )}
        <div
          className={`${styles.auth_inner} ${isSigninPage(location.pathname) ? styles.login : ''}`}>
          {children}
        </div>
      </div>
      {/* 퍼블수정 20250317 : 푸터위치수정 및 케이스추가 */}
      {isSigninPageNone(location.pathname) ? <Footer /> : <AuthFooter />}
    </div>
  );
}

export const AuthContainer = AuthContainerComponent;
