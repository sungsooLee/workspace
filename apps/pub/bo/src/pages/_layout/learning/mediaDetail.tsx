import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Input,
  Button,
  Textarea,
  Select,
  Tooltip,
  ChipList,
  SelectOption,
  Switch,
} from '@learnway/ui';
import { IcoFormRequired, IcoArrowDown, IcoAlertCircle, IcoCloseCircle } from '@learnway/icons';
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

  // form toggle
  const [toggleSections, setToggleSections] = useState<{ [key: number]: boolean }>({
    1: true, // toggleSections[1] 열려 있음
    2: true, // toggleSections[2] 열려 있음
    3: true, // toggleSections[3] 열려 있음
    4: true, // toggleSections[4] 열려 있음
  });

  const toggleContent = (index: number) => {
    setToggleSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 해당 index만 토글
    }));
  };

  // chip List
  const options: SelectOption[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
  ];
  const handleChange = (event: SelectOption[]) => {
    console.log(event);
  };

  return (
    <>
      <div className={styles.main_contents}>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name" className={styles.form_label}>
              <span className={styles.form_text}>채널</span>
              {/* 필수 케이스 */}
              <span className={cn(styles.status, styles.required)}>
                <IcoFormRequired width={12} height={12} />
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
                <IcoFormRequired width={12} height={12} />
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
                resize="none"
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
                <IcoFormRequired width={12} height={12} />
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
                <IcoFormRequired width={12} height={12} />
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
              <span className={styles.dash}></span>
              <Input
                id="name-1-6"
                type="text"
                placeholder="- 제외한 숫자만 입력"
                className={styles.dash}
              />
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-7" className={styles.form_label}>
              <span className={styles.form_text}>외주개발업체 정보</span>
              <Button
                className={styles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(1)}
                aria-expanded={toggleSections[1] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div className={`${styles.input_box_wrap} ${toggleSections[1] ? styles.open : ''}`}>
              <div className={styles.input_box}>
                <Input id="name-1-7" type="text" disabled value="김현대" placeholder="" />
                <Button variant="gray" size="sm">
                  선택
                </Button>
              </div>
              <div className="row">
                <div className={styles.form_item}>
                  <label htmlFor="name-1-7-1" className={styles.form_label}>
                    <span className={cn(styles.form_text, styles.sm)}>외주개발업체 담당자</span>
                    {/* 필수 케이스 */}
                    <span className={cn(styles.status, styles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={styles.input_box}>
                    <Input id="name-1-7-1" type="text" disabled value="김현대" placeholder="" />
                    <Button variant="gray" size="sm">
                      선택
                    </Button>
                  </div>
                </div>
                <div className={styles.form_item}>
                  <label htmlFor="name-1-7-2" className={styles.form_label}>
                    <span className={cn(styles.form_text, styles.sm)}>연락처</span>
                    {/* 필수 케이스 */}
                    <span className={cn(styles.status, styles.required)}>
                      <IcoFormRequired width={12} height={12} />
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
                    <span className={styles.dash}></span>
                    <Input
                      id="name-1-7-2"
                      type="text"
                      placeholder="- 제외한 숫자만 입력"
                      className={styles.dash}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-8" className={styles.form_label}>
              <span className={styles.form_text}>태그</span>
              {/* 필수 케이스 */}
              <span className={cn(styles.status, styles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <Tooltip
                className={styles.tooltip}
                side="right"
                align="start"
                content={'tooltip content'}>
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
                </Button>
              </Tooltip>
              <span className={styles.sub_test}>
                {'동영상을 표현하는 썸네일을 선택하거나 업로드 하세요. (미선택 시 자동 선택)'}
              </span>
            </label>
            <div className={styles.input_box}>
              <ChipList
                className={styles.chips_wrap}
                options={options}
                placeholder="한글, 영문, 숫자 포함 9자 이하"
                showInput
                prefixCharacter="#"
                onChange={handleChange}
              />
            </div>
            <p className={styles.text_limit}>
              <em className={styles.num}>14개</em>/200개
            </p>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* Textarea type */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-9" className={styles.form_label}>
              <span className={styles.form_text}>학습자원 개요 (AI 자동 추출)</span>
              <Button
                className={styles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(2)}
                aria-expanded={toggleSections[2] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div className={`${styles.input_box_wrap} ${toggleSections[2] ? styles.open : ''}`}>
              <div className={styles.input_box}>
                <Textarea
                  id="name-1-9"
                  rows={5}
                  cols={33}
                  placeholder="컨텐츠 개요는 AI 자동 추출되어 표기됩니다."
                  resize="none"
                  size="sm"
                />
              </div>
              <p className={styles.text_limit}>
                <em className={styles.num}>0</em>/2500
              </p>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* Textarea type */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-10" className={styles.form_label}>
              <span className={styles.form_text}>키워드 (AI 자동 추출)</span>
              <Button
                className={styles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(3)}
                aria-expanded={toggleSections[3] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div className={`${styles.input_box_wrap} ${toggleSections[3] ? styles.open : ''}`}>
              <div className={styles.input_box}>
                <Textarea
                  id="name-1-10"
                  rows={5}
                  cols={33}
                  placeholder="키워드는 AI 자동 추출되어 표기됩니다."
                  resize="none"
                  size="sm"
                />
              </div>
              <p className={styles.text_limit}>
                <em className={styles.num}>0</em>/2500
              </p>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* Textarea type */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-11" className={styles.form_label}>
              <span className={styles.form_text}>교육자원 활용여부</span>
              {/* 필수 케이스 */}
              <span className={cn(styles.status, styles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={styles.sub_test}>
                {'해당 동영상으로 교육 과정을 개설할 수 있습니다.'}
              </span>
            </label>
            <div className={cn(styles.input_box, styles.type2)}>
              <Switch id="name-1-11" className={styles.btn_switch} />
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* Textarea type */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-12" className={styles.form_label}>
              <span className={styles.form_text}>보안콘텐츠 여부</span>
              {/* 필수 케이스 */}
              <span className={cn(styles.status, styles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={styles.sub_test}>
                {
                  '동영상에 워터마크가 제공되고, DRM 솔루션 적용 및 화면캡쳐 방지 기능이 적용되어 동영상 보안을 강화할수 있어요.'
                }
              </span>
            </label>
            <div className={cn(styles.input_box, styles.type2)}>
              <Switch id="name-1-12" className={styles.btn_switch} />
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          <div className={styles.form_item}>
            <label htmlFor="name-1-13" className={styles.form_label}>
              <span className={styles.form_text}>자막변경</span>
              <span className={styles.comment}>
                자막<em className={styles.num}>3</em>개
              </span>
              <Button
                className={styles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(4)}
                aria-expanded={toggleSections[4] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div className={`${styles.input_box_wrap} ${toggleSections[4] ? styles.open : ''}`}>
              <div className={styles.input_box}>
                <Select
                  className={cn(styles.select_option, styles.lg)}
                  options={[
                    { value: 'language1', label: '영어' },
                    { value: 'language2', label: '한국어' },
                  ]}
                />
                <Input
                  id="name-1-14"
                  type="text"
                  readOnly
                  placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                  value="영어자막.smi"
                />
                <Button variant="gray" size="sm" className={styles.btn_edit}>
                  자막 변경
                </Button>
                <Button onlyIcon className={styles.btn_delete}>
                  <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                </Button>
              </div>
              <div className={styles.input_box}>
                <Select
                  className={cn(styles.select_option, styles.lg)}
                  options={[
                    { value: 'language1', label: '영어' },
                    { value: 'language2', label: '한국어' },
                  ]}
                />
                <Input
                  type="text"
                  readOnly
                  placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                  value="영어자막2.smi"
                />
                <Button variant="gray" size="sm" className={styles.btn_edit}>
                  자막 변경
                </Button>
                <Button onlyIcon className={styles.btn_delete}>
                  <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                </Button>
              </div>
              <div className={styles.input_box}>
                <Select
                  className={cn(styles.select_option, styles.lg)}
                  options={[
                    { value: 'language1', label: '영어' },
                    { value: 'language2', label: '한국어' },
                  ]}
                />
                <Input
                  type="text"
                  readOnly
                  placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                />
                <Button variant="gray" size="sm" className={styles.btn_edit}>
                  자막 추가
                </Button>
                <Button onlyIcon className={styles.btn_delete}>
                  <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={styles.form_item}>
            <label htmlFor="name-1-14" className={styles.form_label}>
              <span className={styles.form_text}>마켓플레이스 공개설정</span>
              <Tooltip
                className={styles.tooltip}
                side="right"
                align="start"
                content={'마켓플레이스 공개설정111111'}>
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
                </Button>
              </Tooltip>
            </label>
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
                <IcoFormRequired width={12} height={12} />
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
      {/* media_wrap */}
      <div className={styles.sub_contents}>
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
    </>
  );
}
