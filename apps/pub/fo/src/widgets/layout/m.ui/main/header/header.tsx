import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Logo, NavigationM, Tenant } from '../../../../../features/layout';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/header/header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={styles.start}>
      <header className={styles.header}>
        <h1>
          <Logo />
        </h1>

        <div className={styles.tenant}>
          <Tenant />
        </div>

        <div className={styles.util}>
          {/* 퍼블수정 20250731 모바일 알림 삭제 */}
          <NavigationM />
        </div>
      </header>
    </div>
  );
}

export const MobileHeader = memo(HeaderComponent);
