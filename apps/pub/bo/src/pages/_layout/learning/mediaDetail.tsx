import { createFileRoute } from '@tanstack/react-router';
import { Input, Button, Textarea, Select, Tooltip } from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';
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
    { title: '720P  용량', text: '1.6GB' },
    { title: '480P 용량', text: '900MB' },
    { title: '해상도', text: '1902 X 968' },
    { title: '파일형식', text: 'MOV' },
    { title: '비디오 코덱', text: 'H264' },
    { title: '비디오 프레임레이트', text: '' },
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
        {/* contents */}
        <div className={styles.contents}>
          <div className={styles.contents_inner}>
            {/* form_wrap */}
            <div className={styles.form_wrap}>
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
            {/* form_wrap */}
            <div className={styles.form_wrap}>
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
            {/* form_wrap */}
            <div className={styles.form_wrap}>
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
            {/* form_wrap */}
            <div className={styles.form_wrap}>
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
            {/* form_wrap */}
            <div className={styles.form_wrap}>
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
            {/* form_wrap */}
            <div className={styles.form_wrap}>
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
            {/* form_wrap */}
            <div className={styles.form_wrap}>
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
            {/* form_wrap */}
            <div className={styles.form_wrap}>
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
            {/* form_wrap */}
            <div className={styles.form_wrap}>
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
            {/* form_wrap */}
            <div className={styles.form_wrap}>
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
              <img src={mediaImg} width="100%" alt="" />
            </div>
            {/* info_list */}
            <ul className={styles.info_list}>
              {infoList.map((item, index) => (
                <li key={index}>
                  <span className={styles.title}>{item.title}</span>
                  <span className={styles.text}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
