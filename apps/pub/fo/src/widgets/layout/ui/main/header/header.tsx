import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  Logo,
  UserAvatar,
  Notification,
  Language,
  UserName,
  Navigate,
  NavigateHover,
  Category,
  Tenant,
  Search,
} from '../../../../../features/layout';
import styles from './header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  const handleMouseEnter = () => {
    setIsHoverNavigate(true);
  };
  const handleMouseLeave = () => {
    setIsHoverNavigate(false);
  };
  const handleCategoryOpen = (isOpen: boolean) => {
    if (isOpen && isHoverNavigate) {
      setIsHoverNavigate(false);
    }
    setIsCategoryOpen(isOpen);
  };

  const [isHoverNavigate, setIsHoverNavigate] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className={`${styles.start} ${styles.header}`}>
      <header className={styles.header_area}>
        <div className={styles.top_area}>
          <div className={styles.logo_inner}>
            <h1>
              <Logo />
            </h1>
            <Tenant />
          </div>

          <div className={styles.search_form}>
            <Search />
          </div>

          <div className={styles.util}>
            <UserName />
            <Language />
            <Notification />
            <UserAvatar />
          </div>
        </div>

        <div className={styles.nav_container} onMouseLeave={handleMouseLeave}>
          <div className={styles.nav_area}>
            <Category onOpenChange={handleCategoryOpen} isOpen={isCategoryOpen} />
            <Navigate onMouseEnter={handleMouseEnter} />
          </div>
          {isHoverNavigate && <NavigateHover isOpen={isHoverNavigate} />}
        </div>
      </header>
    </div>
  );
}

export const Header = memo(HeaderComponent);
