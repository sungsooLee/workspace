import { memo } from 'react';
import { useLocation } from '@tanstack/react-router';
import { MobileView, BrowserView } from 'react-device-detect';
import { PAGE_META_BY_PATH, isSigninPage } from '../../features/platform';
import { MobileAuthContainerHeader } from '../../widgets/layout/m.ui/auth/auth-container/auth-container-header';
import styles from './auth-title.module.css';

const AuthTitleCompoment = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const meta = PAGE_META_BY_PATH[pathname] ?? { title: '', info: '' };
  return (
    <div className={styles.start}>
      <BrowserView>
        <h2 className={isSigninPage(location.pathname) ? styles.title_login : ''}>
          {/* 퍼블확인용 */}
          <span className={styles.title}>{meta.title}</span>
          <span className={styles.info}>{meta.info}</span>
        </h2>
      </BrowserView>
      <MobileView>
        {isSigninPage(location.pathname) ? (
          <h2 className={styles.title_login}>
            {/* 퍼블확인용 */}
            <span className={styles.title}>{meta.title}</span>
            <span className={styles.info}>{meta.info}</span>
          </h2>
        ) : (
          <MobileAuthContainerHeader />
        )}
      </MobileView>
    </div>
  );
};
export const AuthTitle = memo(AuthTitleCompoment);
