import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

function GNBComponent() {
  const { t } = useTranslation();

  return (
    <div className="">
      <header className="">
        <h1></h1>
        <div className="_nav">
          <nav className="">
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

        <div className=""></div>

        <div className=""></div>
      </header>
    </div>
  );
}

export const GNB = memo(GNBComponent);
