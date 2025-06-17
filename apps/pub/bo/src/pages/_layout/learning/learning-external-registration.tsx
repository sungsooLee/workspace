/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import {
  Button,
  CheckboxGroupFormField,
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
  RadioGroupFormField,
  Switch,
  Tabs,
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
            // 퍼블수정 20250317 : form_display 구조 수정 S
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
            // 퍼블수정 20250317 : form_display 구조 수정 E
          )}
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
            <img src={previewImg} width="100%" alt="" />
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
