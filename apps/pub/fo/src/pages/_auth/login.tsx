import { createFileRoute } from '@tanstack/react-router';
import { Input, Checkbox, Button } from '@learnway/ui';
import { cn } from '@learnway/shared';
import styles from './login.module.css';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className="form_row">
        <div className="form_item">
          <label htmlFor="name5" className="form_label">
            <span className="form_text">아이디/이메일</span>
          </label>
          <div className="input_box">
            <Input
              id="name5"
              type="text"
              value=""
              placeholder="아이디 또는 회사 이메일을 입력하세요."
              className="lg"
            />
          </div>
        </div>
      </div>

      <div className="form_row">
        <div className="form_item">
          <label htmlFor="name5" className="form_label">
            <span className="form_text">비밀번호</span>
          </label>
          <div className="input_box">
            <Input
              id="name5"
              type="password"
              value=""
              placeholder="비밀번호를 입력하세요."
              className="lg"
            />
          </div>
        </div>
      </div>

      <div className={styles.login_info}>
        <Checkbox label="아이디 저장" className={styles.id_save} />
        <div className={styles.info}>
          <Button>진행현황</Button>
          <Button>아이디/비밀번호찾기</Button>
        </div>
      </div>
    </div>
  );
}
