import { ReactNode } from 'react';
import { BrowserView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useCurrentRoute } from '@learnway/hooks';

import { AuthFooter } from './auth-footer/auth-footer';

//import styles from './auth-container.module.css';
import styles from '@learnway/styles/fo/widgets/layout/ui/auth/auth-container/auth-container.module.css';

interface AuthContainerComponentProps {
  children: ReactNode;
}

function AuthContainerComponent({ children }: AuthContainerComponentProps) {
  const { t } = useTranslation();

  const { meta } = useCurrentRoute();

  return (
    <div className={`${styles.start} ${styles.auth_container}`}>
      <div className={`${styles.auth_area}`}>
        <BrowserView>
          <h2>{t(meta?.title ?? '')}</h2>
        </BrowserView>
        {/* <MobileView>
          <MobileAuthContainerHeader />
        </MobileView> */}

        <div className={`${styles.auth_inner} `}>{children}</div>
      </div>
      <BrowserView>
        <AuthFooter />
      </BrowserView>
    </div>
  );
}

/**
 * @description FO _auth 전체 컨테이너
 */
export const AuthContainer = AuthContainerComponent;
