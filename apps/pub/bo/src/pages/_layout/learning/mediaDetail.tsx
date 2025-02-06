import { createFileRoute } from '@tanstack/react-router';
import { Input, Button, Textarea } from '@learnway/ui';
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

  // media info_list
  const infoList = [
    { title: '파일명', text: '파일명이 들어갑니다' },
    { title: '재생시간', text: '1시간' },
    { title: '원본용량', text: '2GB' },
    { title: '720P  용량', text: '1.6GB', title2: '480P 용량', text2: '900MB' },
    { title: '해상도', text: '1902 X 968' },
    { title: '파일형식', text: 'MOV' },
    { title: '비디오 코덱', text: 'H264' },
    { title: '비디오 프레임레이트', text: '59.99fps' },
    { title: '비디오 비트레이트', text: '58MB' },
    { title: '오디오 코덱', text: '' },
    { title: '오디오 샘플레이트', text: '' },
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
              콘텐츠명
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
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-3" className={styles.form_label}>
              카테고리
            </label>
            <div className={styles.input_box}>
              <Input
                id="name-1-3"
                type="text"
                placeholder="학습자원을 분류할 카테고리를 선택하세요."
              />
              <Button variant="gray" size="sm">
                선택
              </Button>
            </div>
          </div>
          {/* Textarea type */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-4" className={styles.form_label}>
              콘텐츠 설명
            </label>
            <div className={cn(styles.input_box, styles.line)}>
              <Textarea
                rows={5}
                cols={33}
                className="bd_none resize_none"
                placeholder="콘텐츠에 대한 설명을 입력하세요."
              />
              <span className={cn(styles.count, styles.full)}>
                <em className={styles.num}>7</em>/150
              </span>
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
          {/* info_list */}
          <ul className={styles.info_list}>
            {infoList.map((item, index) => (
              <li key={index}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.text}>{item.text}</span>
                {item.title2 && <span className={styles.title}>{item.title2}</span>}
                {item.text2 && <span className={styles.text}>{item.text2}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
