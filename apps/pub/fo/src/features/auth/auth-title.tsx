import styles from '@learnway/styles/fo/pages/_auth/auth-title.module.css';
import { useLocation } from '@tanstack/react-router';
import { memo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { PAGE_META_BY_PATH, isSigninPageInfo } from '../../features/platform';

const AuthTitleCompoment = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const meta = PAGE_META_BY_PATH[pathname] ?? { title: '', info: '' };
  return (
    <div className={styles.start}>
      <BrowserView>
        <h2 className={isSigninPageInfo(location.pathname) ? styles.title_login : ''}>
          <span className={styles.title}>{meta.title}</span>
          <span className={styles.info}>{meta.info}</span>
        </h2>
      </BrowserView>

      <MobileView>
        {isSigninPageInfo(location.pathname) ? (
          <h2 className={isSigninPageInfo(location.pathname) ? styles.title_login : ''}>
            <span className={styles.title}>{meta.title}</span>
            <span className={styles.info}>{meta.info}</span>
          </h2>
        ) : (
          ''
        )}
      </MobileView>
    </div>
  );
};
export const AuthTitle = memo(AuthTitleCompoment);
