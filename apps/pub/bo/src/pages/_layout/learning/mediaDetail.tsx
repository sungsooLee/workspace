import { createFileRoute } from '@tanstack/react-router';
import { Input, Button } from '@learnway/ui';
import { IcoFormRequired } from '@learnway/icons';
import { cn } from '@learnway/shared';

import styles from './mediaDetail.module.css';
import mediaImg from '../../../assets/images/temp/img_temp_media.jpg';

export const Route = createFileRoute('/_layout/learning/mediaDetail')({
  component: RouteComponent,
});

function RouteComponent() {
  // media btn list
  const buttons = [
    {
      label: '원본 다운로드',
      onClick: () => console.log('btn 1'),
    },
    {
      label: '동영상 변경',
      onClick: () => console.log('btn 2'),
    },
    {
      label: '콘텐츠 URL보기',
      onClick: () => console.log('btn 3'),
    },
    {
      label: '미리보기',
      onClick: () => console.log('btn 4'),
    },
  ];

  const list: Item[] = [
    { title: '제목 1', text: '내용 1', title2: '제목 1-2', text2: '내용 1-2' },
    { title: '제목 2', text: '내용 2' },
    { title: '제목 3', text: '내용 3' },
  ];

  return (
    <div className={styles.media_detail}>
      {/* title_wrap */}
      <div className={styles.title_wrap}>
        <h3 className={styles.title}>동영상 상세</h3>
        <div className={styles.btn_wrap}>
          <Button variant="point" size="sm">
            매핑과정 보기
          </Button>
          <Button variant="point" size="sm">
            공유이력 보기
          </Button>
          <Button variant="point" size="sm">
            삭제
          </Button>
          <Button variant="point" size="sm">
            수정
          </Button>
          <Button variant="primary" size="sm">
            목록
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
              채널{/* 필수 케이스 */}
              <span className={cn(styles.status, styles.required)}>
                <IcoFormRequired width={8} height={8} />
              </span>
            </label>
            <div className={styles.input_box}>
              <Input id="name" type="text" placeholder="관리채널이 1개인 경우 관리채널명" />
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
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name5" className={styles.form_label}>
              로그인 Case
            </label>
            <div className={styles.input_box}>
              <Input id="name5" type="text" value="text" placeholder="입력" className="lg" />
            </div>
            <p className={cn(styles.guide_text)}>기본 메시지</p>
          </div>
        </div>
        {/* media_wrap */}
        <div className={styles.media_wrap}>
          {/* btn_list */}
          <ul className={styles.btn_list}>
            {buttons.map((btn, index) => (
              <li>
                <Button key={index} onClick={btn.onClick} className={styles.btn_text}>
                  {btn.label}
                </Button>
              </li>
            ))}
          </ul>
          {/* media */}
          <div className={styles.media}>
            <img src={mediaImg} alt="" />
          </div>
          {/* media_info */}
          <div className={styles.media_info}>
            {list.map((item, index) => (
              <div key={index}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                {item.title2 && <h3>{item.title2}</h3>} {/* title2가 있을 경우만 렌더링 */}
                {item.text2 && <p>{item.text2}</p>} {/* text2가 있을 경우만 렌더링 */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
