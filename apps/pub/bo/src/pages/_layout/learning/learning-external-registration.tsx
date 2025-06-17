/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import {
  Button,
  ContentsRow,
  Dropdown,
  Input,
  InputModalSelectorFormField,
  List,
  ModalBody,
  ModalContainer,
  ModalFooter,
  PhoneNumber,
  DatePicker,
  Checkbox,
  SelectOption,
  Switch,
  Textarea,
  Tooltip,
  useModal,
  ThumbnailImageUpload,
  ImageOption,
  ChipList,
} from '@learnway/ui';

import { IcoAlertCircle, IcoFormRequired, IcoRefresh02, IcoSearch } from '@learnway/icons';

// style
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import movieInfoStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import popSearchStyles from '@learnway/styles/bo/assets/styles/modules/popup-search.module.css';

/* images */
import previewImg from '../../../assets/images/temp/img_exam_basic.jpg';
import selectedImg from '../../../assets/images/thumb/img_thumb_hyundai.jpg';

export const Route = createFileRoute('/_layout/learning/learning-external-registration')({
  component: RouteComponent,
});

function RouteComponent() {
  const { close: closeModal } = useModal();

  const ModalChannelContent = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const options = [
      { value: 'type1', label: '전체' },
      { value: 'type2', label: '항목' },
    ];
    const [value, setValue] = useState<any>();

    return (
      <ModalContainer>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={popupStyles.title_wrap}>
              <h2 className={popupStyles.title}>{'등록 채널을 선택하세요.'}</h2>
            </div>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-select1" className={searchStyles.label}>
                          <span className={searchStyles.text}>테넌트</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options}
                            value={selectedValues}
                            onChange={(selected) => setSelectedValues(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-channel" className={searchStyles.label}>
                          <span className={searchStyles.text}>채널</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options}
                            value={selectedValues}
                            onChange={(selected) => setSelectedValues(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-owner" className={searchStyles.label}>
                          <span className={searchStyles.text}>담당자</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input
                            id="name-owner"
                            type="text"
                            placeholder="담당자명으로 조회하세요."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.btn_box}>
                  <Button
                    type="button"
                    className={searchStyles.btn_refresh}
                    variant="search"
                    size="sm"
                    onlyIcon
                  >
                    <IcoRefresh02 className={searchStyles.icon_refresh} />
                  </Button>
                  <Button
                    type="button"
                    variant="search"
                    size="sm"
                    className={searchStyles.btn_search}
                  >
                    <IcoSearch className={searchStyles.icon_sm_search} />
                    조회
                  </Button>
                </div>
              </div>
            </div>
            {/* 채널 리스트 */}
            <div className={popSearchStyles.channel_wrap}>
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
                value={value}
                onOptionSelect={(option) => setValue(option)}
                hideBorder
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };

  // Modal : 담당자 검색
  const ModalManagerContent = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const options = [
      { value: 'type1', label: '전체' },
      { value: 'type2', label: '항목' },
      { value: 'type3', label: '항목3' },
    ];
    const [value, setValue] = useState<any>();
    return (
      <ModalContainer>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={popupStyles.title_wrap}>
              <h2 className={popupStyles.title}>{'담당자를 선택하세요.'}</h2>
            </div>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-channelName" className={searchStyles.label}>
                          <span className={searchStyles.text}>채널</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options}
                            value={selectedValues}
                            onChange={(selected) => setSelectedValues(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-managerName" className={searchStyles.label}>
                          <span className={searchStyles.text}>담당자명</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input
                            id="name-managerName"
                            type="text"
                            placeholder="담당자명으로 조회하세요."
                            value=""
                            className={searchStyles.input}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.btn_box}>
                  <Button
                    type="button"
                    className={searchStyles.btn_refresh}
                    variant="search"
                    size="sm"
                    onlyIcon
                  >
                    <IcoRefresh02 className={searchStyles.icon_refresh} />
                  </Button>
                  <Button
                    type="button"
                    variant="search"
                    size="sm"
                    className={searchStyles.btn_search}
                  >
                    <IcoSearch className={searchStyles.icon_sm_search} />
                    조회
                  </Button>
                </div>
              </div>
            </div>
            {/* 채널 리스트 */}
            <div className={popSearchStyles.channel_wrap}>
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
                  {
                    value: 'type10',
                    label: '선택한 채널의 소속 채널 소유자명10 (사번 또는 이메일)',
                  },
                ]}
                value={value}
                onOptionSelect={(option) => setValue(option)}
                hideBorder
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };

  const [selectedValues2, setSelectedValues2] = useState<string[]>(['한국어']);
  const options2 = [
    { value: 'option1', label: '한국어' },
    { value: 'option2', label: '외국어' },
  ];

  const buttons = [
    {
      label: '미리보기',
      onClick: () => console.log('btn 1'),
    },
  ];

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  // switch : 사용기한
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });

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
                <span className={formStyles.form_text}>채널명</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <InputModalSelectorFormField
                  modalConfig={{
                    width: 'md',
                    content: <ModalChannelContent />,
                  }}
                />
              </div>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-channel" className={formStyles.form_label}>
                <span className={formStyles.form_text}>언어</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Dropdown
                  options={options2}
                  value={selectedValues2}
                  onChange={(selected) => setSelectedValues2(selected)}
                  variant="default"
                  placeholder="선택"
                  size={'sm'}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-markText" className={formStyles.form_label}>
                <span className={formStyles.form_text}>학습자원명</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} placeholder={'입력'} maxLength={150} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-explain" className={formStyles.form_label}>
                <span className={formStyles.form_text}>학습자원 설명</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-explain"
                  rows={5}
                  cols={33}
                  resize="none"
                  value=""
                  placeholder="콘텐츠에 대한 설명을 입력해주세요."
                  maxLength={2000}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-manager" className={formStyles.form_label}>
                <span className={cn(formStyles.form_text)}>담당자</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <InputModalSelectorFormField
                  modalConfig={{
                    width: 'md',
                    content: <ModalManagerContent />,
                  }}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor="name-managerNum" className={formStyles.form_label}>
                <span className={cn(formStyles.form_text)}>연락처</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <PhoneNumber
                  options={[
                    { value: 'type1', label: '+82' },
                    { value: 'type2', label: '+83' },
                  ]}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow type="horizontal">
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
                  content={'사용기한 내 콘텐츠 공유/교육자원활용이 가능합니다.'}
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </label>
              <div className={formStyles.input_box}>
                {/* Switch 텍스트 : '무기한' : '기간 설정' */}
                <Switch
                  id="switch01"
                  className={formStyles.btn_switch}
                  label={checked[1] ? '기간 설정' : '무기한'}
                  checked={checked[1]}
                  onCheckedChange={handleCheckedChange(1)}
                />
              </div>
            </div>
          </ContentsRow>
          {checked[1] && (
            <div className={dynamicFormStyles.form_display}>
              <ContentsRow>
                <div className={formStyles.form_item}>
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
              </ContentsRow>
            </div>
          )}
          {/* 외주개발업체 정보 */}
          <ContentsRow type="horizontal" className={!checked[2] ? 'inactive' : ''}>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-term" className={formStyles.form_label}>
                <span className={formStyles.form_text}>외주개발업체 정보</span>
              </label>
              <div className={formStyles.input_box}>
                {/* Switch 텍스트 : '있음' : '없음' */}
                <Switch
                  id="switch02"
                  className={formStyles.btn_switch}
                  label={checked[2] ? '있음' : '없음'}
                  checked={checked[2]}
                  onCheckedChange={handleCheckedChange(2)}
                />
              </div>
            </div>
          </ContentsRow>
          {checked[2] && (
            <div className={dynamicFormStyles.form_display}>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-company" className={formStyles.form_label}>
                    <span className={cn(formStyles.form_text, formStyles.sm)}>개발업체</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <InputModalSelectorFormField
                      modalConfig={{
                        title: '',
                        width: 'md',
                        content: <ModalChannelContent />,
                      }}
                    />
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
                    <PhoneNumber
                      options={[
                        { value: 'type1', label: '+82' },
                        { value: 'type2', label: '+83' },
                      ]}
                    />
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
                <div className={formStyles.form_item}>
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
          )}
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-time" className={formStyles.form_label}>
                <span className={formStyles.form_text}>학습 시간</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={formStyles.form_item}>
                  <div className={dynamicFormStyles.form_auto}>
                    <Input
                      type="text"
                      suffixText={'시간'}
                      value={'5'}
                      className={formStyles.input_time}
                    />
                    <Input
                      type="text"
                      suffixText={'분'}
                      value={'15'}
                      className={formStyles.input_time}
                    />
                    <Input
                      type="text"
                      suffixText={'초'}
                      value={'30'}
                      className={formStyles.input_time}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-markText" className={formStyles.form_label}>
                <span className={formStyles.form_text}>출처</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} placeholder={'출처를 입력하세요.'} maxLength={150} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-markText" className={formStyles.form_label}>
                <span className={formStyles.form_text}>URL</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} placeholder={'출처를 입력하세요.'} maxLength={150} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-tenantLog" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'썸네일'}</span>
                {/* 필수 케이스 */}
                <span className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <ThumbnailImageUpload
                  options={[{ id: '1', path: selectedImg }]}
                  onChange={(options: ImageOption[]) => console.log('onChange', options)}
                  onCheckedChange={(options: ImageOption[]) =>
                    console.log('onCheckedChange', options)
                  }
                />
              </div>
              <p className={cn(formStyles.guide_text)}>
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
                  content={'태그는 학습자원 검색 시 활용되고, 학습자에게는 10개까지만 보여집니다.'}
                >
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
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-auto"
                  rows={5}
                  cols={33}
                  placeholder="키워드는 AI 자동 추출되어 표기됩니다.   "
                  resize="none"
                  size="md"
                  readOnly
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* Textarea type */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-auto2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>키워드 (AI 자동 추출)</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-auto2"
                  rows={5}
                  cols={33}
                  placeholder="키워드는 AI 자동 추출되어 표기됩니다."
                  resize="none"
                  size="md"
                  readOnly
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow type="horizontal">
            {/* Textarea type */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-conjugation" className={formStyles.form_label}>
                <span className={formStyles.form_text}>교육자원 활용여부</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-use"
                  className={dynamicFormStyles.btn_switch}
                  label={checked[3] ? '활용 가능' : '활용 불가'}
                  checked={checked[3]}
                  onCheckedChange={handleCheckedChange(3)}
                />
              </div>
              <p className={formStyles.guide_text}>
                해당 학습자원으로 교육 과정을 개설할 수 {checked[3] ? '있습니다.' : '없습니다.'}
              </p>
            </div>
          </ContentsRow>
          <ContentsRow type="horizontal">
            <div className={formStyles.form_item}>
              <label htmlFor="name-share" className={formStyles.form_label}>
                <span className={formStyles.form_text}>공유채널 설정</span>
                <Tooltip
                  className={formStyles.tooltip}
                  side="bottom"
                  align="start"
                  content={'설정된 채널에 해당 학습자원이 공유됩니다.'}
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </label>
              <div className={formStyles.input_box}>
                <span className={formStyles.info_area}>
                  <span className={formStyles.info_text}>
                    채널<em>10</em>개
                  </span>
                  <Button variant="search" size="sm">
                    채널선택
                  </Button>
                </span>
              </div>
            </div>
          </ContentsRow>
          <div className={formStyles.form_contents_wrap}>
            <strong className={formStyles.tit_sub}>
              최종 확인{/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </strong>
            <div className={formStyles.form_contents}>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-confirm" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>검수 확인</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Checkbox className={formStyles.checkbox} />
                    <p className={formStyles.sub_text}>
                      등록하고자 한 동영상이며, 처음부터 끝까지 정상적으로 재생됨이 확인되었습니다.
                    </p>
                  </div>
                  <p className={cn(formStyles.guide_text, formStyles.error)}>
                    ‘검수 확인’ 체크하세요.
                  </p>
                </div>
              </ContentsRow>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-confirm2" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>보안 확인</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Checkbox className={formStyles.checkbox} />
                    <p className={formStyles.sub_text}>
                      보안콘텐츠 미 설정 시, 불법복제, 무단사용,저작권 침해 위험에 노출되고, 이에
                      따른 피해를 입을 수 있음에 인지합니다.
                    </p>
                  </div>
                  <p className={cn(formStyles.guide_text, formStyles.error)}>
                    ‘보안 확인’ 체크하세요.
                  </p>
                </div>
              </ContentsRow>
            </div>
          </div>
        </div>
        <hr className={styles.vertical_line} />
        {/* sub_contents */}
        <div className={styles.sub_contents}>
          <FormSubTitle label={'시험지'} />
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
          {/* 이미지 영역 */}
          <div className={movieInfoStyles.media}>
            <img src={previewImg} width="416" alt="" />
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
