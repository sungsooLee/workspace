import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { isEmpty } from 'lodash';

import { pageRouteConfig } from '../../../features/auth';

import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';

import { ProccessResult } from '../../../widgets/auth';
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
          <ProccessResult title={'입력하신 정보로 가입된 아이디는 \n아래와 같습니다.'} className="">
            <div className={styles.result_message}>{state.email}</div>
          </ProccessResult>
        ) : (
          <ProccessResult
            isSuccess={false}
            title={'입력하신 정보로 가입된 아이디를 \n찾을 수 없습니다.'}></ProccessResult>
        )}

        <div className={styles.btn_txt}>
          {isEmpty(state.email) ? (
            <Link to="/search-account">아아디 찾기</Link>
          ) : (
            <Link to="/progress-status">비밀번호 찾기</Link>
          )}
        </div>

        <div className={`${styles.btn_wrap}`}>
          <Button variant="primary" size="xl" onClick={() => handleGoLogin()}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
