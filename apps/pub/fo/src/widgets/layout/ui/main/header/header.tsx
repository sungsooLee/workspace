import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Logo,
  UserAvatar,
  Notification,
  Navigate,
  NavigateHover,
  Category,
  Tenant,
  Search,
  History,
} from '../../../../../features/layout';
import styles from './header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleMouseEnter = (index: number | null) => {
    setHoverIndex(index);
  };

  const handleMouseLeaveAll = () => {
    setHoverIndex(null);
  };

  const handleCategoryOpen = (isOpen: boolean) => {
    if (isOpen) {
      setHoverIndex(null);
    }
    setIsCategoryOpen(isOpen);
  };

  return (
    <div className={`${styles.start} ${styles.header}`}>
      <header className={styles.header_area}>
        <div className={styles.top_area}>
          <div className={styles.logo_inner}>
            <h1>
              <Logo />
            </h1>
            <div className={styles.tenant}>
              <Tenant />
            </div>
          </div>

          <div className={styles.nav_container} onMouseLeave={handleMouseLeaveAll}>
            <div className={styles.nav_area}>
              <Category isOpen={isCategoryOpen} />
              <Navigate onHoverIndexChange={handleMouseEnter} hoverIndex={hoverIndex} />
            </div>

            {hoverIndex !== null && (
              <NavigateHover hoverIndex={hoverIndex} onMouseLeave={handleMouseLeaveAll} />
            )}
          </div>

          <div className={styles.search_form}>
            <Search />
          </div>

          <div className={styles.util}>
            <Notification />
            <History />
            <UserAvatar />
          </div>
        </div>
      </header>
    </div>
  );
}

export const Header = memo(HeaderComponent);
