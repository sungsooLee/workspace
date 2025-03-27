import { createFileRoute } from '@tanstack/react-router';
import { Button, Checkbox } from '@learnway/ui';
import { IcoSucess02 } from '@learnway/icons';

import styles from '@learnway/styles/fo/pages/_layout/my/membership-secession.module.css';

export const Route = createFileRoute('/_layout/my/membership-secession')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.secession}`}>
      <h2>회원탈퇴</h2>
      <div className={styles.box}>
        <div className={styles.confirm}>
          <IcoSucess02 width={32} height={32} stroke="#a9afb8"></IcoSucess02>
          <p>
            개인정보를 변경 하시려면
            <br />
            비밀번호를 확인해주세요.
          </p>
        </div>

        <div className={styles.bullet_notice}>
          <dl>
            <dt>회원탈퇴</dt>
            <dd>사용하고 계신 아이디는 탈퇴할 경우 재사용 및 복구가 불가능합니다.</dd>
            <dd>탈퇴 후에도 게시판형 서비스에 등록한 게시물은 그대로 남아 있습니다.</dd>
            <dd>
              삭제를 원하는 게시글이 있다면 반드시 탈퇴 전 비공개 처리하거나 삭제하시기 바랍니다.
              <Button variant="gray" size="sm">
                회원탈퇴
              </Button>
            </dd>
          </dl>
          <Checkbox size="lg" label="default" />
        </div>
      </div>
    </div>
  );
}
