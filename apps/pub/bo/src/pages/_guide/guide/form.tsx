import { createFileRoute } from '@tanstack/react-router';
import { Input, Button } from '@learnway/ui';
import { IcoFormRequired } from '@learnway/icons';
import { cn } from '@learnway/shared';
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
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name" className={styles.form_label}>
              Default
            </label>
            <div className={styles.input_box}>
              <Input id="name" type="text" value="text" placeholder="입력" />
            </div>
            <p className={cn(styles.guide_text)}>기본 메시지</p>
          </div>
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-2" className={styles.form_label}>
              Default(버튼케이스)
              {/* 필수 케이스 */}
              <span className={cn(styles.status, styles.required)}>
                <IcoFormRequired width={8} height={8} />
              </span>
            </label>
            <div className={styles.input_box}>
              <Input id="name-1-2" type="text" value="text" placeholder="입력" />
              <Button variant="gray" size="sm">
                선택
              </Button>
            </div>
          </div>
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-3" className={styles.form_label}>
              Default(텍스트 케이스)
              {/* 필수 케이스 */}
              <span className={cn(styles.status, styles.required)}>
                <IcoFormRequired width={8} height={8} />
              </span>
            </label>
            <div className={styles.input_box}>
              <Input id="name-1-3" type="text" value="text" placeholder="입력" />
              <span className={styles.text}>안내메세지 안내메세지</span>
            </div>
          </div>
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-4" className={styles.form_label}>
              Default(텍스트 케이스2)
              {/* 필수 케이스 */}
              <span className={cn(styles.status, styles.required)}>
                <IcoFormRequired width={8} height={8} />
              </span>
            </label>
            <div className={styles.input_box}>
              <span className={styles.text}>메세지</span>
              <Input id="name-1-4" type="text" value="text" placeholder="입력" />
              <span className={styles.text}>안내메세지 안내메세지</span>
            </div>
          </div>
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name2" className={styles.form_label}>
              Disabled
            </label>
            <div className={styles.input_box}>
              <Input id="name2" type="text" placeholder="입력" value="홍길동" disabled />
            </div>
          </div>
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name3" className={styles.form_label}>
              error
              {/* error 케이스 */}
              <span className={cn(styles.status, styles.error)}>
                <IcoFormRequired width={8} height={8} />
              </span>
            </label>
            <div className={styles.input_box}>
              <Input id="name3" type="text" value="text" placeholder="입력" className="error" />
            </div>
            {/* 에러인경우 : error 클래스 추가 */}
            <p className={cn(styles.guide_text, styles.error)}>에러메시지</p>
          </div>
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name4" className={styles.form_label}>
              Password
            </label>
            <div className={styles.input_box}>
              <Input id="name4" type="password" placeholder="" value="●●●●" />
            </div>
          </div>
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name5" className={styles.form_label}>
              readonly
            </label>
            <div className={styles.input_box}>
              <Input id="name5" type="text" placeholder="입력" readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
