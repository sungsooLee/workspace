import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import styles from './page-content.module.css';
import movieInfoStyles from './movie-info.module.css';
import formStyles from '../../../assets/styles/modules/form.module.css'; // form css
import popContStyles from './popContStyles.module.css'; // popup contents css
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
} from '@learnway/ui';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import {
  IcoFormRequired,
  IcoStatusFail,
  IcoAlertCircle,
  IcoSearch,
  IcoRefresh02,
} from '@learnway/icons';
import { useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { ImageOption } from '@/libs/ui/src/lib/thumbnail/type';

export const Route = createFileRoute('/_layout/learning/mediaRegister')({
  component: RouteComponent,
});

function RouteComponent() {
  // Modal : 채널 검색
  const { open: openModal } = useModal();
  const ModalChannelContent = () => {
    return (
      <div className={popContStyles.contents}>
        <strong className={popContStyles.title}>{'등록 채널을 선택하세요.'}</strong>
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
        <div className={popContStyles.channel_wrap}>추후 컴포넌트 작업 예정</div>
      </div>
    );
  };

  // Modal : 담당자 검색
  const ModalManagerContent = () => {
    return (
      <div className={popContStyles.contents}>
        <strong className={popContStyles.title}>{'담당자를 선택하세요.'}</strong>
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
        <div className={popContStyles.channel_wrap}>추후 컴포넌트 작업 예정</div>
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
                  showCounter
                />
                {/* <span className={formStyles.count}>
                <em className={formStyles.num}>7</em>/150
              </span> */}
              </div>
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
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-thumbnail" className={formStyles.form_label}>
                썸네일{/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <ThumbnailImageUpload
                  options={[
                    { id: '1', path: 'https://lodash.com/assets/img/lodash.svg' },
                    { id: '2', path: 'https://lodash.com/assets/img/lodash.svg' },
                    { id: '3', path: 'https://lodash.com/assets/img/lodash.svg' },
                    { id: '4', path: 'https://lodash.com/assets/img/lodash.svg' },
                    { id: '5', path: 'https://lodash.com/assets/img/lodash.svg' },
                    { id: '6', path: 'https://lodash.com/assets/img/lodash.svg' },
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
          {/* row */}
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
                  side="right"
                  align="start"
                  content={'tooltip content'}>
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </label>
              <div className={formStyles.input_box}>
                <ChipList
                  className={formStyles.chips_wrap}
                  options={options}
                  placeholder="한글, 영문, 숫자 포함 9자 이하"
                  showInput
                  prefixCharacter="#"
                />
              </div>
              <p className={formStyles.text_limit}>
                <em className={formStyles.num}>14개</em>/200개
              </p>
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
        </div>
      </PageContainer>
    </form>
  );
}
