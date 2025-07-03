import { createFileRoute, Link } from '@tanstack/react-router';

import { IcoArrowForward } from '@learnway/icons';
import { useModal, Button } from '@learnway/ui';
import { useLogoutUser } from '@learnway/auth/entities';

import { pageRouteConfig } from '../../features/auth';

import styles from '@learnway/styles/fo/pages/_layout/setting.module.css';

export const Route = createFileRoute('/_layout/setting')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '설정',
      mobile: { showHeader: false, showFooter: false, showMainFooter: false },
    },
  }),
});

function RouteComponent() {
  const { logout } = useLogoutUser();

  return (
    <div className={`${styles.start} ${styles.setting_wrap}`}>
      <ul className={styles.list}>
        <li>
          <Link to={''}>
            <strong>언어 설정</strong>
            <span>
              Korean
              <IcoArrowForward width={20} height={20} stroke="#131c30"></IcoArrowForward>
            </span>
          </Link>
        </li>
        <li>
          <Link to={''}>
            <strong>SNS 로그인 설정</strong>
            <span>네이버</span>
          </Link>
        </li>
      </ul>
      <ul className={styles.list}>
        <li>
          <div className={styles.box}>
            <strong>최근접속</strong>
            <span>2026-01-01 18:28</span>
          </div>
        </li>
        <li className={styles.no_line}>
          <Link to={''}>
            <strong>SNS 로그인 설정</strong>
            <span>
              네이버<IcoArrowForward width={20} height={20} stroke="#131c30"></IcoArrowForward>
            </span>
          </Link>
        </li>
        <li>
          <Button onClick={() => logout()}>
            <strong>로그아웃</strong>
          </Button>
        </li>
      </ul>
    </div>
  );
}
