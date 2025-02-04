import { createFileRoute } from '@tanstack/react-router';
import { Input, Button } from '@learnway/ui';
import styles from './form.module.css';

export const Route = createFileRoute('/_guide/guide/form')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.page_wrap}>
      {/* title_wrap */}
      <div className={styles.title_wrap}>
        <h3 className={styles.title}>Form</h3>
        <div className={styles.btn_wrap}>
          <Button variant="point" size="sm">
            취소
          </Button>
          <Button variant="primary" size="sm">
            저장
          </Button>
        </div>
      </div>
      {/* contents_wrap */}
      <div className={styles.contents_wrap}>
        {/* form_wrap */}
        <div className={styles.form_wrap}>
          <div className={styles.form_item}>
            <label htmlFor="name" className={styles.form_label}>
              이름
            </label>
            <Input id="name" type="text" value="text" placeholder="입력" className="lg" />
          </div>
          <div className={styles.form_item}>
            <label htmlFor="name2" className={styles.form_label}>
              이름
            </label>
            <Input
              id="name2"
              type="text"
              placeholder="입력"
              value="홍길동"
              className="lg"
              disabled
            />
          </div>
          <div className={styles.form_item}>
            <label htmlFor="name3" className={styles.form_label}>
              이름
            </label>
            <Input id="name3" type="text" value="text" placeholder="입력" className="error" />
          </div>
          <div className={styles.form_item}>
            <label htmlFor="name4" className={styles.form_label}>
              비밀번호
            </label>
            <Input id="name4" type="password" placeholder="" value="●●●●" />
          </div>
        </div>
      </div>
    </div>
  );
}
