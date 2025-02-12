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
  Radio,
  Checkbox,
} from '@learnway/ui';
import { IcoFormRequired, IcoArrowDown, IcoAlertCircle, IcoCloseCircle } from '@learnway/icons';
import { cn } from '@learnway/shared';

import styles from './page-content.module.css';
import movieInfoStyles from './movie-info.module.css';
import formStyles from '../../../assets/styles/modules/form.module.css'; // form css
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
      {/* main_contents */}
      <div className={styles.main_contents}>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name" className={formStyles.form_label}>
              <span className={formStyles.form_text}>채널</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
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
            <p className={formStyles.guide_text}>기본 메시지</p>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>학습자원명</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            {/* file upload case */}
            <div className={cn(formStyles.input_box, formStyles.line)}>
              <Input id="name-1-2" type="text" value="업로드 파일명" className="bd_none" />
              <span className={formStyles.count}>
                <em className={formStyles.num}>7</em>/150
              </span>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-3" className={formStyles.form_label}>
              <span className={formStyles.form_text}>카테고리</span>
            </label>
            <div className={formStyles.input_box}>
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
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-4" className={formStyles.form_label}>
              <span className={formStyles.form_text}>콘텐츠 설명</span>
            </label>
            <div className={formStyles.input_box}>
              <Textarea
                id="name-1-4"
                rows={5}
                cols={33}
                resize="none"
                placeholder="한글,영문,숫자 포함 2500자 이하"
              />
            </div>
            <p className={formStyles.text_limit}>
              <em className={formStyles.num}>7</em>/2500
            </p>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-5" className={formStyles.form_label}>
              <span className={formStyles.form_text}>담당자</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name-1-5" type="text" disabled value="김현대" placeholder="" />
              <Button variant="gray" size="sm">
                선택
              </Button>
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-6" className={formStyles.form_label}>
              <span className={formStyles.form_text}>연락처</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Select
                className={formStyles.select_option}
                options={[
                  { value: 'type1', label: '+82' },
                  { value: 'type2', label: '+83' },
                ]}
              />
              <span className={formStyles.dash}></span>
              <Input
                id="name-1-6"
                type="text"
                placeholder="- 제외한 숫자만 입력"
                className={formStyles.dash}
              />
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-7" className={formStyles.form_label}>
              <span className={formStyles.form_text}>외주개발업체 정보</span>
              <Button
                className={formStyles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(1)}
                aria-expanded={toggleSections[1] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div
              className={`${formStyles.input_box_wrap} ${toggleSections[1] ? formStyles.open : ''}`}>
              <div className={formStyles.input_box}>
                <Input id="name-1-7" type="text" disabled value="김현대" placeholder="" />
                <Button variant="gray" size="sm">
                  선택
                </Button>
              </div>
              <div className="row">
                <div className={formStyles.form_item}>
                  <label htmlFor="name-1-7-1" className={formStyles.form_label}>
                    <span className={cn(formStyles.form_text, formStyles.sm)}>
                      외주개발업체 담당자
                    </span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input id="name-1-7-1" type="text" disabled value="김현대" placeholder="" />
                    <Button variant="gray" size="sm">
                      선택
                    </Button>
                  </div>
                </div>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-1-7-2" className={formStyles.form_label}>
                    <span className={cn(formStyles.form_text, formStyles.sm)}>연락처</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Select
                      className={formStyles.select_option}
                      options={[
                        { value: 'type1', label: '+82' },
                        { value: 'type2', label: '+83' },
                      ]}
                    />
                    <span className={formStyles.dash}></span>
                    <Input
                      id="name-1-7-2"
                      type="text"
                      placeholder="- 제외한 숫자만 입력"
                      className={formStyles.dash}
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
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-8" className={formStyles.form_label}>
              <span className={formStyles.form_text}>태그</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={'tooltip content'}>
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
                </Button>
              </Tooltip>
              <span className={formStyles.sub_text}>
                {'동영상을 표현하는 썸네일을 선택하거나 업로드 하세요. (미선택 시 자동 선택)'}
              </span>
            </label>
            <div className={formStyles.input_box}>
              <ChipList
                className={formStyles.chips_wrap}
                options={options}
                placeholder="한글, 영문, 숫자 포함 9자 이하"
                showInput
                prefixCharacter="#"
                onChange={handleChange}
              />
            </div>
            <p className={formStyles.text_limit}>
              <em className={formStyles.num}>14개</em>/200개
            </p>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-9" className={formStyles.form_label}>
              <span className={formStyles.form_text}>학습자원 개요 (AI 자동 추출)</span>
              <Button
                className={formStyles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(2)}
                aria-expanded={toggleSections[2] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div className={`${formStyles.input_box_wrap} ${toggleSections[2] ? styles.open : ''}`}>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-1-9"
                  rows={5}
                  cols={33}
                  placeholder="컨텐츠 개요는 AI 자동 추출되어 표기됩니다."
                  resize="none"
                  size="sm"
                />
              </div>
              <p className={formStyles.text_limit}>
                <em className={formStyles.num}>0</em>/2500
              </p>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* Textarea type */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-10" className={formStyles.form_label}>
              <span className={formStyles.form_text}>키워드 (AI 자동 추출)</span>
              <Button
                className={formStyles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(3)}
                aria-expanded={toggleSections[3] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div
              className={`${formStyles.input_box_wrap} ${toggleSections[3] ? formStyles.open : ''}`}>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-1-10"
                  rows={5}
                  cols={33}
                  placeholder="키워드는 AI 자동 추출되어 표기됩니다."
                  resize="none"
                  size="sm"
                />
              </div>
              <p className={formStyles.text_limit}>
                <em className={formStyles.num}>0</em>/2500
              </p>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* Textarea type */}
          <div className={cn(formStyles.form_item, formStyles.type2)}>
            <label htmlFor="name-1-11" className={formStyles.form_label}>
              <span className={formStyles.form_text}>교육자원 활용여부</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={formStyles.sub_text}>
                {'해당 동영상으로 교육 과정을 개설할 수 있습니다.'}
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Switch id="name-1-11" className={formStyles.btn_switch} />
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* Textarea type */}
          <div className={cn(formStyles.form_item, formStyles.type2)}>
            <label htmlFor="name-1-12" className={formStyles.form_label}>
              <span className={formStyles.form_text}>보안콘텐츠 여부</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={formStyles.sub_text}>
                {
                  '동영상에 워터마크가 제공되고, DRM 솔루션 적용 및 화면캡쳐 방지 기능이 적용되어 동영상 보안을 강화할수 있어요.'
                }
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Switch id="name-1-12" className={formStyles.btn_switch} />
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-13" className={formStyles.form_label}>
              <span className={formStyles.form_text}>자막변경</span>
              <span className={formStyles.comment}>
                자막<em className={formStyles.num}>3</em>개
              </span>
              <Button
                className={formStyles.btn_toggle}
                onlyIcon
                onClick={() => toggleContent(4)}
                aria-expanded={toggleSections[4] || false}>
                <IcoArrowDown width={20} height={20} stroke="#4C515E" />
              </Button>
            </label>
            <div
              className={`${formStyles.input_box_wrap} ${toggleSections[4] ? formStyles.open : ''}`}>
              <div className={formStyles.input_box}>
                <Select
                  className={cn(formStyles.select_option, formStyles.lg)}
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
                <Button variant="gray" size="sm" className={formStyles.btn_edit}>
                  자막 변경
                </Button>
                <Button onlyIcon className={formStyles.btn_delete}>
                  <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                </Button>
              </div>
              <div className={formStyles.input_box}>
                <Select
                  className={cn(formStyles.select_option, formStyles.lg)}
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
                <Button variant="gray" size="sm" className={formStyles.btn_edit}>
                  자막 변경
                </Button>
                <Button onlyIcon className={formStyles.btn_delete}>
                  <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                </Button>
              </div>
              <div className={formStyles.input_box}>
                <Select
                  className={cn(formStyles.select_option, formStyles.lg)}
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
                <Button variant="gray" size="sm" className={formStyles.btn_edit}>
                  자막 추가
                </Button>
                <Button onlyIcon className={formStyles.btn_delete}>
                  <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-14" className={formStyles.form_label}>
              <span className={formStyles.form_text}>마켓플레이스 공개설정</span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={'마켓플레이스 공개설정111111'}>
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
                </Button>
              </Tooltip>
            </label>
            <div className={formStyles.input_box}>
              <Radio
                className={formStyles.radio_wrap}
                options={[
                  { value: 'type1', label: '비공개' },
                  { value: 'type2', label: '전체공개' },
                  { value: 'type3', label: '일부공개' },
                ]}
              />
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-1-15" className={formStyles.form_label}>
              <span className={formStyles.form_text}>공유채널 설정</span>
              <Tooltip
                className={formStyles.tooltip}
                side="right"
                align="start"
                content={'공유채널 설정2222222'}>
                <Button onlyIcon>
                  <IcoAlertCircle width={16} height={17} fill="#A9AFB8" stroke="white" />
                </Button>
              </Tooltip>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name-1-15" type="text" readOnly value="채널명" placeholder="" />
              <Button variant="gray" size="sm">
                선택
              </Button>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* form_item */}
          <div className={cn(formStyles.form_item, formStyles.type2)}>
            <label htmlFor="name-1-16" className={formStyles.form_label}>
              <span className={formStyles.form_text}>검수 확인</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={formStyles.sub_text}>
                {'등록하고자 한 동영상이며, 처음부터 끝까지 정상적으로 재생됨이 확인되었습니다.'}
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Checkbox className={formStyles.check} />
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row no_line">
          {/* form_item */}
          <div className={cn(formStyles.form_item, formStyles.type2)}>
            <label htmlFor="name-1-17" className={formStyles.form_label}>
              <span className={formStyles.form_text}>저작권 확인</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={formStyles.sub_text}>
                {
                  '저작권법(제25조2항)에 따라 학습자원(동영상,이미지등)은 해당 학습플랫폼에서만 이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법 위반에 해당될 수 있음에  동의합니다.'
                }
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Checkbox className={formStyles.check} />
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row no_line">
          {/* form_item */}
          <div className={cn(formStyles.form_item, formStyles.type2)}>
            <label htmlFor="name-1-18" className={formStyles.form_label}>
              <span className={formStyles.form_text}>보안 확인</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
              <span className={formStyles.sub_text}>
                {
                  '보안콘텐츠 미 설정 시, 불법복제, 무단사용,저작권 침해 위험에 노출되고, 이에 따른 피해를 입을 수 있음에 인지합니다.'
                }
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Checkbox className={formStyles.check} />
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.vertical_line} />
      {/* sub_contents */}
      <div className={styles.sub_contents}>
        {/* btn_list */}
        <ul className={movieInfoStyles.btn_list}>
          {buttons.map((btn, index) => (
            <li>
              <Button key={index} onClick={btn.onClick} className={movieInfoStyles.btn_text}>
                {btn.label}
              </Button>
            </li>
          ))}
        </ul>
        {/* media(비디오 영역) */}
        <div className={movieInfoStyles.media}>
          <img src={mediaImg} width="100%" alt="" />
        </div>
        {/* info_list */}
        <ul className={movieInfoStyles.info_list}>
          {infoList.map((item, index) => (
            <li key={index}>
              <span className={movieInfoStyles.title}>{item.title}</span>
              <span className={movieInfoStyles.text}>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
