import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { UserAvatar, Notification, Language } from '../../../../features/layout';
import logoImage from '../../../../assets/images/logo.png';

function GNBComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <header className="_header">
        <h1>
          <img src={logoImage} alt="" />
        </h1>
        <div className="_nav">
          <nav className="menu_list">
            <ul>
              <li>
                <Link to={'/'}>대시보드</Link>
              </li>
              <li>
                <Link to={'/'}>채널관리</Link>
              </li>
              <li>
                <Link to={'/'}>교육운영</Link>
              </li>
              <li>
                <Link to={'/'}>교육자원</Link>
              </li>
              <li>
                <Link to={'/'}>교육제도</Link>
              </li>
              <li>
                <Link to={'/'}>교육통계</Link>
              </li>
              <li>
                <Link to={'/'}>고객사운영</Link>
              </li>
              <li>
                <Link to={'/'}>플랫폼관리</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="util">
          <Language />
          <Notification />
          <UserAvatar />
        </div>
      </header>
    </div>
  );
}

export const GNB = memo(GNBComponent);
