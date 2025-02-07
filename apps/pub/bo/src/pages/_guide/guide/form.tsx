import { createFileRoute } from '@tanstack/react-router';
import { Input, Button, Textarea, Select, Tooltip } from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';
import { cn } from '@learnway/shared';
import styles from './form.module.css';

export const Route = createFileRoute('/_guide/guide/form')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Form Component Guide</h2>
      <h3 className="guide_tit3">
        Form 사용 케이스(row는 정렬할때 사용- form요소가 아니더라도 사용 가능)
      </h3>
      {/* row */}
      <div className="row">
        {/* form_item */}
        <div className={styles.form_item}>
          <label htmlFor="name" className={styles.form_label}>
            <span className={styles.form_text}>채널</span>
            {/* 필수 케이스 */}
            <span className={cn(styles.status, styles.required)}>
              <IcoFormRequired width={8} height={8} />
            </span>
          </label>
          <div className={styles.input_box}>
            <Input
              id="name"
              type="text"
              placeholder="입력"
              disabled
              value="최근 콘테츠 등록한 채널명 또는 최근 생성된 채널명"
            />
            <Button variant="gray" size="sm">
              선택
            </Button>
          </div>
          <p className={cn(styles.guide_text)}>기본 메시지</p>
        </div>
      </div>
      {/* row */}
      <div className="row">
        {/* form_item */}
        <div className={styles.form_item}>
          <label htmlFor="name-1-2" className={styles.form_label}>
            <span className={styles.form_text}>학습자원명</span>
            {/* 필수 케이스 */}
            <span className={cn(styles.status, styles.required)}>
              <IcoFormRequired width={8} height={8} />
            </span>
          </label>
          {/* file upload case */}
          <div className={cn(styles.input_box, styles.line)}>
            <Input id="name-1-2" type="text" value="업로드 파일명" className="bd_none" />
            <span className={styles.count}>
              <em className={styles.num}>7</em>/150
            </span>
          </div>
        </div>
      </div>
      {/* row */}
      <div className="row">
        {/* form_item */}
        <div className={styles.form_item}>
          <label htmlFor="name-1-3" className={styles.form_label}>
            <span className={styles.form_text}>카테고리</span>
          </label>
          <div className={styles.input_box}>
            <Input
              id="name-1-3"
              type="text"
              disabled
              placeholder="학습자원을 분류할 카테고리를 선택하세요."
            />
            <Button variant="gray" size="sm">
              선택
            </Button>
          </div>
        </div>
      </div>
      {/* row */}
      <div className="row">
        {/* Textarea type */}
        <div className={styles.form_item}>
          <label htmlFor="name-1-4" className={styles.form_label}>
            <span className={styles.form_text}>콘텐츠 설명</span>
          </label>
          <div className={styles.input_box}>
            <Textarea
              id="name-1-4"
              rows={5}
              cols={33}
              className="resize_none"
              placeholder="한글,영문,숫자 포함 2500자 이하"
            />
          </div>
          <p className={styles.text_limit}>
            <em className={styles.num}>7</em>/2500
          </p>
        </div>
      </div>
      {/* row */}
      <div className="row">
        {/* form_item */}
        <div className={styles.form_item}>
          <label htmlFor="name-1-5" className={styles.form_label}>
            <span className={styles.form_text}>담당자</span>
            {/* 필수 케이스 */}
            <span className={cn(styles.status, styles.required)}>
              <IcoFormRequired width={8} height={8} />
            </span>
          </label>
          <div className={styles.input_box}>
            <Input id="name-1-5" type="text" disabled value="김현대" placeholder="" />
            <Button variant="gray" size="sm">
              선택
            </Button>
          </div>
        </div>
        {/* form_item */}
        <div className={styles.form_item}>
          <label htmlFor="name-1-6" className={styles.form_label}>
            <span className={styles.form_text}>연락처</span>
            {/* 필수 케이스 */}
            <span className={cn(styles.status, styles.required)}>
              <IcoFormRequired width={8} height={8} />
            </span>
          </label>
          <div className={styles.input_box}>
            <Select
              className={styles.select_option}
              options={[
                { value: 'type1', label: '+82' },
                { value: 'type2', label: '+83' },
              ]}
            />
            <Input id="name-1-6" type="text" placeholder="- 제외한 숫자만 입력" />
          </div>
        </div>
      </div>
      {/* row */}
      <div className="row">
        {/* form_item */}
        <div className={styles.form_item}>
          <label htmlFor="name-1-7" className={styles.form_label}>
            <span className={styles.form_text}>사용기한</span>
            {/* 필수 케이스 */}
            <span className={cn(styles.status, styles.required)}>
              <IcoFormRequired width={8} height={8} />
            </span>
            <Tooltip side="right" content={'사용기한'}>
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </label>
          <div className={styles.input_box}>
            <Input id="name2" type="text" placeholder="입력" value="홍길동" disabled />
          </div>
        </div>
      </div>
      {/* row */}
      <div className="row">
        {/* form_item */}
        <div className={styles.form_item}>
          <label htmlFor="name3" className={styles.form_label}>
            <span className={styles.form_text}>error</span>
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
      </div>
      {/* row */}
      <div className="row">
        {/* form_item */}
        <div className={styles.form_item}>
          <label htmlFor="name4" className={styles.form_label}>
            <span className={styles.form_text}>Password</span>
          </label>
          <div className={styles.input_box}>
            <Input id="name4" type="password" placeholder="" value="●●●●" />
          </div>
        </div>
      </div>
      {/* row */}
      <div className="row">
        {/* form_item */}
        <div className={styles.form_item}>
          <label htmlFor="name5" className={styles.form_label}>
            <span className={styles.form_text}>readonly</span>
          </label>
          <div className={styles.input_box}>
            <Input id="name5" type="text" placeholder="입력" readOnly />
          </div>
        </div>
      </div>
      {/* row */}
      <div className="row">
        {/* form_item */}
        <div className={styles.form_item}>
          <label htmlFor="name5" className={styles.form_label}>
            <span className={styles.form_text}>로그인 Case</span>
          </label>
          <div className={styles.input_box}>
            <Input id="name5" type="text" value="text" placeholder="입력" className="lg" />
          </div>
          <p className={cn(styles.guide_text)}>기본 메시지</p>
        </div>
      </div>
    </div>
  );
}
