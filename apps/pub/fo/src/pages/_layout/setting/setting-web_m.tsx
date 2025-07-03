import { createFileRoute, Link } from '@tanstack/react-router';
import { IcoArrowForward } from '@learnway/icons';
import { useModal, Button } from '@learnway/ui';

//import styles from '@learnway/styles/fo/pages/_layout/setting/setting-web_m.module.css';
import styles from '@learnway/styles/fo/pages/_layout/setting.module.css';

export const Route = createFileRoute('/_layout/setting/setting-web_m')({
  component: RouteComponent,
});

function RouteComponent() {
  const { confirm: openConfirm } = useModal();

  const logout = () => {
    openConfirm({
      content: <>로그아웃 하시겠습니까?</>,
      cancelButtonLabel: '취소',
      okButtonLabel: '로그아웃',
    });
  };

  const loginTime = () => {
    openConfirm({
      title: <>로그인 시간을 연장하시겠습니까?</>,
      content: (
        <>
          로그인 후 2시간이 남은 시간 경과 후 로그아웃 됩니다.
          <br />
          로그인 시간을 연장하시겠습니까?
          <div className="time">
            남은시간 : <strong>4분 59초</strong>
          </div>
        </>
      ),
      cancelButtonLabel: '취소',
      okButtonLabel: '로그인연장',
    });
  };

  return (
    <div className={`${styles.start} ${styles.setting_wrap}`}>
      <ul className={styles.list}>
        <li>
          <Link to={''}>
            <strong>언어 설정</strong>
            <span>
              Korean
              <IcoArrowForward width={16} height={16} stroke="#131c30"></IcoArrowForward>
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
        <li>
          <Link to={''}>
            <strong>SNS 로그인 설정</strong>
            <span>
              네이버<IcoArrowForward width={16} height={16} stroke="#131c30"></IcoArrowForward>
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
