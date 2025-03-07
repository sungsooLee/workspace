import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import styles from './page-content.module.css';
import movieInfoStyles from './movie-info.module.css';
import formStyles from '../../../assets/styles/modules/form.module.css'; // form css
import searchContStyles from './searchContStyles.module.css'; // popup contents css
import defaultImg from '../../../assets/images/thumb/img_thumb_default.jpg';
import {
  Spinner,
  Input,
  Textarea,
  Button,
  Tooltip,
  DatePicker,
  Switch,
  Select,
  ThumbnailImageUpload,
  ChipList,
  SelectOption,
  ContentsRow,
  List,
  Checkbox,
  RadioGroup,
} from '@learnway/ui';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import {
  IcoFormRequired,
  IcoStatusFail,
  IcoAlertCircle,
  IcoSearch,
  IcoRefresh02,
  IcoCloseCircle,
} from '@learnway/icons';
import { useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { ImageOption } from '@/libs/ui/src/lib/thumbnail/type';

/* images */
import mediaImg from '../../../assets/images/temp/img_temp_media.jpg';

export const Route = createFileRoute('/_layout/learning/mediaRegister')({
  component: RouteComponent,
});

function RouteComponent() {
  // Modal : 채널 검색
  const { open: openModal } = useModal();
  const ModalChannelContent = () => {
    return (
      <div className={searchContStyles.contents}>
        <strong className={searchContStyles.title}>{'등록 채널을 선택하세요.'}</strong>
        {/* form */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <label htmlFor="name-search" className={formStyles.form_label}>
              <span className={formStyles.form_text}>테넌트</span>
            </label>
            <div className={formStyles.input_box}>
              <Select
                className={formStyles.select_option}
                options={[
                  { value: 'type1', label: '선택' },
                  { value: 'type2', label: '선택2' },
                ]}
              />
            </div>
          </div>
          <div className={formStyles.form_item}>
            <label htmlFor="name-channel2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>채널명</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-channel2"
                type="text"
                placeholder="채널명으로 조회하세요."
                value=""
                className={formStyles.input}
              />
            </div>
          </div>
          <div className={cn(formStyles.form_item, formStyles.form_auto)}>
            <div className={formStyles.btn_box}>
              <Button
                type="button"
                className={formStyles.btn_refresh}
                variant="search"
                size="sm"
                onlyIcon>
                <IcoRefresh02 className={formStyles.icon_refresh} />
              </Button>
              <Button type="button" variant="search" size="sm" className={formStyles.btn_search}>
                <IcoSearch className={formStyles.icon_sm_search} />
                조회
              </Button>
            </div>
          </div>
        </ContentsRow>
        {/* 채널 리스트 */}
        <div className={searchContStyles.channel_wrap}>
          <List
            options={[
              { value: 'type1', label: '경영지원시스템 채널 01' },
              { value: 'type2', label: '경영지원시스템 채널 02' },
              { value: 'type3', label: '경영지원시스템 채널 03' },
              { value: 'type4', label: '경영지원시스템 채널 04' },
              { value: 'type5', label: '경영지원시스템 채널 05' },
              { value: 'type6', label: '경영지원시스템 채널 06' },
              { value: 'type7', label: '경영지원시스템 채널 07' },
              { value: 'type8', label: '경영지원시스템 채널 08' },
              { value: 'type9', label: '경영지원시스템 채널 09' },
              { value: 'type10', label: '경영지원시스템 채널 10' },
            ]}
            onOptionsSelect={(options) => console.log(options)}
          />
        </div>
      </div>
    );
  };

  // Modal : 담당자 검색
  const ModalManagerContent = () => {
    return (
      <div className={searchContStyles.contents}>
        <strong className={searchContStyles.title}>{'담당자를 선택하세요.'}</strong>
        {/* form */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <label htmlFor="name-channelName" className={formStyles.form_label}>
              <span className={formStyles.form_text}>채널</span>
            </label>
            <div className={formStyles.input_box}>
              <Select
                className={formStyles.select_option}
                options={[
                  { value: 'type1', label: '선택' },
                  { value: 'type2', label: '선택2' },
                ]}
              />
            </div>
          </div>
          <div className={formStyles.form_item}>
            <label htmlFor="name-managerName" className={formStyles.form_label}>
              <span className={formStyles.form_text}>담당자명</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-managerName"
                type="text"
                placeholder="담당자명으로 조회하세요."
                value=""
                className={formStyles.input}
              />
            </div>
          </div>
          <div className={cn(formStyles.form_item, formStyles.form_auto)}>
            <div className={formStyles.btn_box}>
              <Button
                type="button"
                className={formStyles.btn_refresh}
                variant="search"
                size="sm"
                onlyIcon>
                <IcoRefresh02 className={formStyles.icon_refresh} />
              </Button>
              <Button type="button" variant="search" size="sm" className={formStyles.btn_search}>
                <IcoSearch className={formStyles.icon_sm_search} />
                조회
              </Button>
            </div>
          </div>
        </ContentsRow>
        {/* 채널 리스트 */}
        <div className={searchContStyles.channel_wrap}>
          <List
            options={[
              { value: 'type1', label: '선택한 채널의 소속 채널 소유자명 (사번 또는 이메일)' },
              { value: 'type2', label: '선택한 채널의 소속 채널 소유자명2 (사번 또는 이메일)' },
              { value: 'type3', label: '선택한 채널의 소속 채널 소유자명3 (사번 또는 이메일)' },
              { value: 'type4', label: '선택한 채널의 소속 채널 소유자명4 (사번 또는 이메일)' },
              { value: 'type5', label: '선택한 채널의 소속 채널 소유자명5 (사번 또는 이메일)' },
              { value: 'type6', label: '선택한 채널의 소속 채널 소유자명6 (사번 또는 이메일)' },
              { value: 'type7', label: '선택한 채널의 소속 채널 소유자명7 (사번 또는 이메일)' },
              { value: 'type8', label: '선택한 채널의 소속 채널 소유자명8 (사번 또는 이메일)' },
              { value: 'type9', label: '선택한 채널의 소속 채널 소유자명9 (사번 또는 이메일)' },
              { value: 'type10', label: '선택한 채널의 소속 채널 소유자명10 (사번 또는 이메일)' },
            ]}
            onOptionsSelect={(options) => console.log(options)}
          />
        </div>
      </div>
    );
  };

  // 출처
  const ModalSourceContent = () => {
    return (
      <div className={searchContStyles.contents}>
        <strong className={searchContStyles.title}>{'출처를 선택하세요.'}</strong>
        {/* 출처 리스트 */}
        <div className={searchContStyles.channel_wrap}>
          <List
            options={[
              { value: 'type1', label: '경영지원시스템 채널 01' },
              { value: 'type2', label: '경영지원시스템 채널 02' },
              { value: 'type3', label: '경영지원시스템 채널 03' },
              { value: 'type4', label: '경영지원시스템 채널 04' },
              { value: 'type5', label: '경영지원시스템 채널 05' },
              { value: 'type6', label: '경영지원시스템 채널 06' },
              { value: 'type7', label: '경영지원시스템 채널 07' },
              { value: 'type8', label: '경영지원시스템 채널 08' },
              { value: 'type9', label: '경영지원시스템 채널 09' },
              { value: 'type10', label: '경영지원시스템 채널 10' },
            ]}
            onOptionSelect={(option) => console.log(option)}
          />
        </div>
      </div>
    );
  };

  // Date picker : 2025-02-17
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate = (value: any) => {
    setDate(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate2 = (value: any) => {
    setDate2(value);
  };

  // chip List
  const options: SelectOption[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
  ];

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
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-channel" className={formStyles.form_label}>
                <span className={formStyles.form_text}>채널</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              {/* file upload case */}
              <div className={formStyles.input_box}>
                <div className={formStyles.search_wrap}>
                  <Input
                    id="name-channel"
                    type="text"
                    placeholder="채널명을 선택하세요."
                    value="채널명노출"
                    borderNone
                    className={formStyles.input}
                  />
                  <Button
                    className={formStyles.btn_search}
                    onClick={() =>
                      openModal({
                        title: '',
                        width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
                        content: <ModalChannelContent />,
                        footer: true,
                      })
                    }>
                    <IcoSearch className={formStyles.icon_search} />
                  </Button>
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
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
              <div className={formStyles.input_box}>
                <Input
                  id="name-1-2"
                  type="text"
                  placeholder="학습명을 입력하세요."
                  value=""
                  className={formStyles.input}
                />
                {/* <span className={formStyles.count}>
                <em className={formStyles.num}>7</em>/150
              </span> */}
              </div>
              <p className={cn(formStyles.guide_text)}>기본 메시지</p>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-explain" className={formStyles.form_label}>
                <span className={formStyles.form_text}>학습자원 설명</span>
              </label>
              {/* file upload case */}
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-explain"
                  rows={5}
                  cols={33}
                  resize="none"
                  value=""
                  placeholder="콘텐츠에 대한 설명을 입력해주세요."
                />
              </div>
              <p className={cn(formStyles.guide_text)}>기본 메시지</p>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-manager" className={formStyles.form_label}>
                <span className={cn(formStyles.form_text, formStyles.sm)}>담당자</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={formStyles.search_wrap}>
                  <Input
                    id="name-manager"
                    type="text"
                    placeholder="담당자를 선택하세요."
                    value="담당자명"
                    borderNone
                    className={formStyles.input}
                  />
                  <Button
                    className={formStyles.btn_search}
                    onClick={() =>
                      openModal({
                        title: '',
                        width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
                        content: <ModalManagerContent />,
                        footer: true,
                      })
                    }>
                    <IcoSearch className={formStyles.icon_search} />
                  </Button>
                </div>
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor="name-managerNum" className={formStyles.form_label}>
                <span className={cn(formStyles.form_text, formStyles.sm)}>연락처</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Select
                  className={formStyles.short}
                  options={[
                    { value: 'type1', label: '+82' },
                    { value: 'type2', label: '+83' },
                  ]}
                />
                {/* <span className={formStyles.dash}></span> 25-02-20 : 삭제 */}
                <Input id="name-managerNum" type="text" placeholder="- 제외한 숫자만 입력" />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-term" className={formStyles.form_label}>
                <span className={formStyles.form_text}>사용기한</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
                <Tooltip
                  className={formStyles.tooltip}
                  side="bottom"
                  align="start"
                  content={'사용기한 내 콘텐츠 공유/교육자원활용이  가능합니다.'}>
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
                {/* Switch 텍스트 : '무기한' : '기간 설정' , input_box_wrap 영역 hide / show */}
                {/* <Switch id="switch01" className={formStyles.btn_switch} label={'무기한'} /> */}
                <Switch id="switch01" className={formStyles.btn_switch} label={'무기한'} />
              </label>
              <div className={cn('input_box_wrap', formStyles.input_box_wrap)}>
                <div className={formStyles.input_box}>
                  <DatePicker
                    onChange={handleDate}
                    value={date}
                    className={formStyles.datepicker_item}
                  />
                  <span className={formStyles.dash}></span>
                  <DatePicker
                    onChange={handleDate2}
                    value={date2}
                    className={formStyles.datepicker_item}
                  />
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-term" className={formStyles.form_label}>
                <span className={formStyles.form_text}>외주개발업체 정보</span>
                {/* Switch 텍스트 : '있음' : '없음' , input_box_wrap 영역 hide / show */}
                <Switch id="switch02" className={formStyles.btn_switch} label={'없음'} />
              </label>
              <div className={cn('input_box_wrap', formStyles.input_box_wrap)}>
                <ContentsRow>
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-company" className={formStyles.form_label}>
                      <span className={cn(formStyles.form_text, formStyles.sm)}>개발업체</span>
                    </label>
                    <div className={formStyles.input_box}>
                      <div className={formStyles.search_wrap}>
                        <Button className={formStyles.btn_search}>
                          <IcoSearch className={formStyles.icon_search} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </ContentsRow>
                <ContentsRow>
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
                      <Input id="name-1-7-1" type="text" value="김현대" placeholder="" />
                    </div>
                  </div>
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-1-7-2" className={formStyles.form_label}>
                      <span className={cn(formStyles.form_text, formStyles.sm)}>
                        외주개발업체 연락처
                      </span>
                      {/* 필수 케이스 */}
                      <span className={cn(formStyles.status, formStyles.required)}>
                        <IcoFormRequired width={12} height={12} />
                      </span>
                    </label>
                    <div className={formStyles.input_box}>
                      <Select
                        className={formStyles.short}
                        options={[
                          { value: 'type1', label: '+82' },
                          { value: 'type2', label: '+83' },
                        ]}
                      />
                      {/* <span className={formStyles.dash}></span> 25-02-20 : 삭제 */}
                      <Input id="name-1-7-2" type="text" placeholder="- 제외한 숫자만 입력" />
                    </div>
                  </div>
                </ContentsRow>
                <ContentsRow>
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-owner2" className={formStyles.form_label}>
                      <span className={cn(formStyles.form_text, formStyles.sm)}>
                        외주업체 과정코드
                      </span>
                      {/* 필수 케이스 */}
                      <span className={cn(formStyles.status, formStyles.required)}>
                        <IcoFormRequired width={12} height={12} />
                      </span>
                    </label>
                    <div className={formStyles.input_box}>
                      <Input id="name-owner2" type="text" placeholder="개발코스를 입력하세요." />
                    </div>
                    <p className={formStyles.guide_text}>
                      개발업체 선택시 불러오는 외주업체 과정코드를 입력하세요.
                    </p>
                  </div>
                </ContentsRow>
                <ContentsRow>
                  <div className={formStyles.form_item}>
                    <label htmlFor="name-url" className={formStyles.form_label}>
                      <span className={cn(formStyles.form_text, formStyles.sm)}>
                        외부학습시작 URL(비표준)
                      </span>
                      {/* 필수 케이스 */}
                      <span className={cn(formStyles.status, formStyles.required)}>
                        <IcoFormRequired width={12} height={12} />
                      </span>
                    </label>
                    <div className={formStyles.input_box}>
                      <Input id="name-url" type="text" placeholder="URL을 입력하세요." />
                    </div>
                    <p className={formStyles.guide_text}>
                      개발업체 선택 시 불러오는 외주업체 URL을 입력하세요. (안내문으로 노출하거나
                      아이콘을 통해 노출)
                    </p>
                  </div>
                </ContentsRow>
                <ContentsRow>
                  {/* 인풋 컴포넌트가 풀로 나란히 배치되는 경우 : col 클래스 추가*/}
                  <div className={cn(formStyles.form_item, formStyles.col)}>
                    <label htmlFor="name-parameter" className={formStyles.form_label}>
                      <span className={cn(formStyles.form_text, formStyles.sm)}>
                        외부학습시작 파라미터
                      </span>
                      {/* 필수 케이스 */}
                      <span className={cn(formStyles.status, formStyles.required)}>
                        <IcoFormRequired width={12} height={12} />
                      </span>
                    </label>
                    <div className={formStyles.input_box}>
                      <Input
                        id="name-parameter"
                        type="text"
                        placeholder="Param Value 값을 입력하세요."
                      />
                      <Input type="text" placeholder="Param Value 값을 입력하세요." />
                    </div>
                    <p className={formStyles.guide_text}>
                      개발업체 선택시 불러오는 Value 값을 각각 입력하세요.
                    </p>
                  </div>
                </ContentsRow>
              </div>
            </div>
          </ContentsRow>
          {/* 2025-03-06 추가 S */}
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-source" className={formStyles.form_label}>
                <span className={formStyles.form_text}>출처</span>
              </label>
              <div className={formStyles.input_box}>
                <div className={formStyles.search_wrap}>
                  <Input
                    id="name-source"
                    type="text"
                    placeholder="출처를 선택하세요."
                    value="유투브"
                    borderNone
                    className={formStyles.input}
                  />
                  <Button
                    className={formStyles.btn_search}
                    onClick={() =>
                      openModal({
                        title: '',
                        width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
                        content: <ModalSourceContent />,
                        footer: true,
                      })
                    }>
                    <IcoSearch className={formStyles.icon_search} />
                  </Button>
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-url" className={formStyles.form_label}>
                <span className={formStyles.form_text}>URL 구분</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <RadioGroup
                  options={[
                    { value: 'type1', label: '웹' },
                    { value: 'type2', label: '앱' },
                  ]}
                  className={formStyles.radio_box}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-contUrl" className={formStyles.form_label}>
                <span className={formStyles.form_text}>외부 콘텐츠 URL</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  type="text"
                  placeholder="http://, https:// 를 포함한 URL정보를 입력하세요."
                  value=""
                />
                <Button size="sm" variant="gray">
                  적용
                </Button>
              </div>
            </div>
          </ContentsRow>
          {/* 2025-03-06 추가 E */}
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-time" className={formStyles.form_label}>
                <span className={formStyles.form_text}>동영상 재생 시간</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={cn(formStyles.form_item, formStyles.form_auto)}>
                  <Input
                    type="text"
                    unitText={'시간'}
                    value={'5'}
                    className={formStyles.input_time}
                  />
                </div>
                <div className={cn(formStyles.form_item, formStyles.form_auto)}>
                  <Input
                    type="text"
                    unitText={'분'}
                    value={'15'}
                    className={formStyles.input_time}
                  />
                </div>
                <div className={cn(formStyles.form_item, formStyles.form_auto)}>
                  <Input
                    type="text"
                    unitText={'초'}
                    value={'30'}
                    className={formStyles.input_time}
                  />
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-thumbnail" className={formStyles.form_label}>
                <span className={formStyles.form_text}>썸네일</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <ThumbnailImageUpload
                  options={[
                    /* 동영상 추출 전 */
                    { id: '1', path: defaultImg },
                    /* 동영상 추출 후 */
                    // { id: '1', path: 'https://lodash.com/assets/img/lodash.svg' },
                    // { id: '2', path: 'https://lodash.com/assets/img/lodash.svg' },
                    // { id: '3', path: 'https://lodash.com/assets/img/lodash.svg' },
                    // { id: '4', path: 'https://lodash.com/assets/img/lodash.svg' },
                    // { id: '5', path: 'https://lodash.com/assets/img/lodash.svg' },
                    // { id: '6', path: defaultImg,} /* default 추천 썸네일 */,
                  ]}
                  onChange={(options: ImageOption[]) => console.log('onChange', options)}
                  onCheckedChange={(options: ImageOption[]) =>
                    console.log('onCheckedChange', options)
                  }
                />
              </div>
              <p className={formStyles.guide_text}>
                학습자원을 표현하는 썸네일을 선택하거나 업로드 하세요. (미선택 시 자동 선택)
              </p>
            </div>
          </ContentsRow>
          <ContentsRow>
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
                  side="bottom"
                  align="start"
                  content={'태그는 학습자원 검색 시 활용되고, 학습자에게는 10개까지만 보여집니다.'}>
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </label>
              <div className={formStyles.input_box}>
                <div className={formStyles.tag_wrap}>
                  <ChipList
                    className={formStyles.chips_wrap}
                    options={options}
                    placeholder="한글, 영문, 숫자 포함 9자 이하 태그를 입력하세요. (9자 초과할 경우 얼럿)"
                    showInput
                    prefixCharacter="#"
                    hideBorder
                  />
                  <p className={formStyles.text_limit}>
                    여러 개의 태그는 쉼표로 구분,<em className={formStyles.num}>1개</em>
                    /200개
                  </p>
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* Textarea type */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-auto" className={formStyles.form_label}>
                <span className={formStyles.form_text}>학습자원 개요 (AI 자동 추출)</span>
              </label>
              <div className={formStyles.input_box_wrap}>
                <div className={formStyles.input_box}>
                  <Textarea
                    id="name-auto"
                    rows={5}
                    cols={33}
                    placeholder="키워드는 AI 자동 추출되어 표기됩니다.   "
                    resize="none"
                    size="sm"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* Textarea type */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-auto2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>키워드 (AI 자동 추출)</span>
              </label>
              <div className={formStyles.input_box_wrap}>
                <div className={formStyles.input_box}>
                  <Textarea
                    id="name-auto2"
                    rows={5}
                    cols={33}
                    placeholder="키워드는 AI 자동 추출되어 표기됩니다."
                    resize="none"
                    size="sm"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* Textarea type */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-conjugation" className={formStyles.form_label}>
                <span className={formStyles.form_text}>교육자원 활용여부</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
                <span className={formStyles.sub_text}>
                  {'해당 학습자원으로 교육 과정을 개설할 수 없습니다.'}
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-use"
                  className={formStyles.btn_switch}
                  reversed
                  label="활용 불가"
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* Textarea type */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-conjugation2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>보안콘텐츠 여부</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
                <span className={formStyles.sub_text}>
                  {'보안콘텐츠 미 설정 시 학습자원의 불법 배포와 보안 위협에 취약합니다.'}
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-use2"
                  className={formStyles.btn_switch}
                  reversed
                  label="보안 미적용"
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* Textarea type */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-add" className={formStyles.form_label}>
                <span className={formStyles.form_text}>자막 추가</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
                <Switch id="name-title" className={formStyles.btn_switch} label="자막 없음" />
              </label>
              <div className={cn('input_box_wrap', formStyles.input_box_wrap)}>
                <div className={formStyles.input_box}>
                  <Select
                    className={formStyles.short}
                    options={[
                      { value: 'language1', label: '영어' },
                      { value: 'language2', label: '한국어' },
                    ]}
                  />
                  <Input
                    id="name-1-14"
                    type="text"
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
                    className={formStyles.short}
                    options={[
                      { value: 'language1', label: '영어' },
                      { value: 'language2', label: '한국어' },
                    ]}
                  />
                  <Input
                    type="text"
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
                    className={formStyles.short}
                    options={[
                      { value: 'language1', label: '영어' },
                      { value: 'language2', label: '한국어' },
                    ]}
                  />
                  <Input
                    type="text"
                    placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
                  />
                  <Button variant="gray" size="sm" className={formStyles.btn_edit}>
                    자막 추가
                  </Button>
                  <Button onlyIcon className={formStyles.btn_delete}>
                    <IcoCloseCircle width={24} height={24} fill="#D6DAE1" stroke="#ffffff" />
                  </Button>
                </div>
                <div className={formStyles.input_box}>
                  <Select
                    className={formStyles.short}
                    options={[
                      { value: 'language1', label: '언어선택' },
                      { value: 'language2', label: '한국어' },
                      { value: 'language3', label: '영어' },
                    ]}
                  />
                  <Input
                    type="text"
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
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-share" className={formStyles.form_label}>
                <span className={formStyles.form_text}>공유채널 설정</span>
                <Tooltip
                  className={formStyles.tooltip}
                  side="bottom"
                  align="start"
                  content={'설정된 채널에 해당 학습자원이 공유됩니다.'}>
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
                <span className={formStyles.info_area}>
                  <span className={formStyles.info_text}>
                    채널<em>10</em>개
                  </span>
                  <Button variant="search" size="sm">
                    채널선택
                  </Button>
                </span>
              </label>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-confirm" className={formStyles.form_label}>
                <span className={formStyles.form_text}>최종 확인</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={cn(formStyles.input_box_wrap, formStyles.line)}>
                <div className={formStyles.input_box}>
                  <div className={formStyles.form_item}>
                    <label className={formStyles.form_label}>
                      <Checkbox label="검수 확인" />
                      {/* 필수 케이스 */}
                      <span className={cn(formStyles.status, formStyles.required)}>
                        <IcoFormRequired width={12} height={12} />
                      </span>
                    </label>
                    <div className={formStyles.input_box}>
                      <p className={formStyles.sub_text}>
                        등록하고자 한 동영상이며, 처음부터 끝까지 정상적으로 재생됨이
                        확인되었습니다.
                      </p>
                    </div>
                    <p className={cn(formStyles.guide_text, formStyles.error)}>
                      ‘검수 확인’ 체크하세요.
                    </p>
                  </div>
                </div>
                <div className={formStyles.input_box}>
                  <div className={formStyles.form_item}>
                    <label className={formStyles.form_label}>
                      <Checkbox label="저작권 확인" />
                      {/* 필수 케이스 */}
                      <span className={cn(formStyles.status, formStyles.required)}>
                        <IcoFormRequired width={12} height={12} />
                      </span>
                    </label>
                    <div className={formStyles.input_box}>
                      <p className={formStyles.sub_text}>
                        저작권법(제25조2항)에 따라 학습자원(동영상,이미지등)은 해당 학습플랫폼에서만
                        이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법
                        위반에 해당될 수 있음에 동의합니다.
                      </p>
                    </div>
                    <p className={cn(formStyles.guide_text, formStyles.error)}>
                      ‘저작권 확인’ 체크하세요.
                    </p>
                  </div>
                </div>
                <div className={formStyles.input_box}>
                  <div className={formStyles.form_item}>
                    <label className={formStyles.form_label}>
                      <Checkbox label="보안 확인" />
                      {/* 필수 케이스 */}
                      <span className={cn(formStyles.status, formStyles.required)}>
                        <IcoFormRequired width={12} height={12} />
                      </span>
                    </label>
                    <div className={formStyles.input_box}>
                      <p className={formStyles.sub_text}>
                        보안콘텐츠 미 설정 시, 불법복제, 무단사용,저작권 침해 위험에 노출되고, 이에
                        따른 피해를 입을 수 있음에 인지합니다.
                      </p>
                    </div>
                    <p className={cn(formStyles.guide_text, formStyles.error)}>
                      ‘보안 확인’ 체크하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ContentsRow>
        </div>
        <hr className={styles.vertical_line} />
        {/* sub_contents */}
        <div className={styles.sub_contents}>
          <strong className={movieInfoStyles.title}>업로드 파일</strong>
          {/* 인코딩 진행 중 */}
          <div className={movieInfoStyles.status_wrap}>
            <Spinner isLoading={true} showBackdrop className={movieInfoStyles.loading} />
            <p className={movieInfoStyles.text}>
              <strong>인코딩 진행 중입니다.</strong>
              인코딩 대기 및 영상 길이에 따라 인코딩 시간이 오래 걸릴수도 있습니다.
            </p>
          </div>
          {/* 인코딩 실패 */}
          <div className={movieInfoStyles.status_wrap}>
            <IcoStatusFail className={movieInfoStyles.fail} />
            <p className={movieInfoStyles.text}>
              <strong>인코딩이 실패되었습니다.</strong>
              다시 시도해 주세요.
            </p>
            <div className={movieInfoStyles.btn_box}>
              <Button className={movieInfoStyles.btn} variant="gray" size="sm">
                재시도
              </Button>
              <Button className={movieInfoStyles.btn} variant="primary" size="sm">
                동영상 변경
              </Button>
            </div>
          </div>
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
      </PageContainer>
    </form>
  );
}
