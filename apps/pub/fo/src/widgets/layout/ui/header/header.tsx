import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Logo, UserAvatar, Notification, Language, UserName } from '../../../../features/layout';
import { Navigate } from './navigate/navigate';
import { IcoMenu01 } from '@learnway/icons';
import { Button } from '@learnway/ui';
import styles from './header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <header className={`${styles.start} ${styles.header}`}>
        <h1>
          <Logo />
        </h1>

        <div className="_nav_area">
          {/* 카테고리 영역 */}
          <div className="_category">
            <Button onlyIcon="true" className="btn_catagory">
              <IcoMenu01 width={24} height={24} stroke="#131C30" />
            </Button>

            {/* 카테고리 전체 메뉴 */}
            <div className="catagory_area"></div>
          </div>

          <Navigate />

          <div className="util">
            <UserName />
            <Language />
            <Notification />
            <UserAvatar />
          </div>
        </div>
      </header>
    </div>
  );
}

export const Header = memo(HeaderComponent);
