import { createFileRoute, Link, useRouter } from '@tanstack/react-router';

import { IcoComplete, IcoCaution02 } from '@learnway/icons';
import { pageRouteConfig } from '../../../features/auth';

import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import styles from '@learnway/styles/fo/pages/_auth/search-account/result.module.css';

export const Route = createFileRoute('/_auth/search-account/result')({
  component: RouteComponent,
  ...pageRouteConfig({
    // error 인 경우 throw message
    validate: ({ params, search, state }) => {
      if (!state?.email) {
        //throw '잘못된 접근';
      }
      return;
    },
  }),
});

function RouteComponent() {
  const router = useRouter();

  const { state } = Route.useRouteContext();

  const handleGoLogin = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_auth}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        {state.email ? (
          <div className={styles.success_info}>
            <i className={styles.ico}>
              <IcoComplete className={styles.ico1} />
            </i>
            <h3 className={styles.title}>
              입력하신 정보로 가입된 아이디는
              <br />
              아래와 같습니다.
            </h3>
            <div className={styles.noti_box}>{state.email}</div>
            <div className={styles.btn_txt}>
              <Link to="/progress-status">비밀번호 찾기</Link>
            </div>
          </div>
        ) : (
          <div className={styles.success_info}>
            <i className={styles.ico}>
              <IcoCaution02 className={styles.ico2} />
            </i>
            <h3 className={styles.title}>
              입력하신 정보로 가입된 아이디를
              <br />
              찾을 수 없습니다.
            </h3>
            <div className={styles.btn_txt}>
              <Link to="/search-account">아아디 찾기</Link>
            </div>
          </div>
        )}

        <div className={`${styles.btn_wrap}`}>
          <Button variant="primary" size="xl" onClick={() => handleGoLogin()}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
