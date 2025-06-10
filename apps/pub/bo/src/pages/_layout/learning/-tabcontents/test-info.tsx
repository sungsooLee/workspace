/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { NoticeBox } from '../../../../../../../bo/src/shared/ui';
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
  RadioGroupFormField,
  Switch,
  Tabs,
  Textarea,
  Tooltip,
  useModal,
} from '@learnway/ui';
import { IcoAlertCircle, IcoFormRequired, IcoRefresh02, IcoSearch } from '@learnway/icons';

/* style */
import styles from './test-detail.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import movieInfoStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import popSearchStyles from '@learnway/styles/bo/assets/styles/modules/popup-search.module.css';

/* images */
import previewImg from '../../../../assets/images/temp/img_exam_basic.jpg';

const TestInfoComponent: FC<{}> = ({}) => {
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
  const items = [
    {
      title: '일반 시험지',
      key: 'option01',
      content: '',
    },
    {
      title: 'OMR 시험지',
      key: 'option02',
      content: '',
    },
    {
      title: 'OX 퀴즈',
      key: 'option03',
      content: '',
    },
  ];
  const buttons = [
    {
      label: '미리보기',
      onClick: () => console.log('btn 1'),
    },
  ];
  // switch
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

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };
  return (
    <div className={styles.wrap}>
      <NoticeBox
        iconVisible={false}
        descriptions={[
          '해당 시험지는 과정에서 사용 중입니다. 일부 정보만 변경할 수 있고, 삭제는 할 수 없습니다.',
        ]}
      />
      <div className={styles.row_wrap}>
        <div className={styles.main_container}>
          <FormSubTitle label={'기본 정보'} />
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-type" className={formStyles.form_label}>
                <span className={formStyles.form_text}>시험지 유형</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.segment_wrap}>
                  <Tabs items={items} type="segment" size="sm" selectedTabKey={'option01'} />
                </div>
              </div>
            </div>
          </ContentsRow>
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
              {/* 퍼블수정 20240317 : Modal 수정 S  */}
              <div className={formStyles.input_box}>
                <InputModalSelectorFormField
                  modalConfig={{
                    width: 'md',
                    content: <ModalChannelContent />,
                  }}
                />
              </div>
              {/* 퍼블수정 20240317 : Modal 수정 E  */}
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-1-2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>학습자원명</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required, formStyles.error)}>
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
              <p className={cn(formStyles.guide_text, formStyles.error)}>에러 메시지</p>
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
                />
              </div>
              <p className={cn(formStyles.guide_text)}>기본 메시지</p>
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
          <ContentsRow type={'horizontal'}>
            <div className={formStyles.form_item}>
              <label htmlFor="name-outsourcingInfo" className={formStyles.form_label}>
                <span className={cn(formStyles.form_text)}>외주개발업체 정보</span>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="switch01"
                  className={formStyles.btn_switch}
                  label={checked[1] ? '있음' : '없음'}
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
            </div>
          )}
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
          <FormSubTitle label={'시험지 상세 설정'} />
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-exam01" className={formStyles.form_label}>
                <span className={formStyles.form_text}>시험문항</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-exam01"
                  type="text"
                  suffixText={'개'}
                  value={'5'}
                  className={formStyles.input_time}
                />
              </div>
              <p className={cn(formStyles.guide_text, formStyles.error)}>입력하세요.</p>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor="name-exam02" className={formStyles.form_label}>
                <span className={formStyles.form_text}>페이지별 문항수</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-exam02"
                  type="text"
                  suffixText={'개'}
                  value={'5'}
                  className={formStyles.input_time}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor="name-exam03" className={formStyles.form_label}>
                <span className={formStyles.form_text}>시험시간</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-exam03"
                  type="text"
                  suffixText={'개'}
                  value={'5'}
                  className={formStyles.input_time}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor="name-exam04" className={formStyles.form_label}>
                <span className={formStyles.form_text}>시험응시 회수</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-exam04"
                  type="text"
                  suffixText={'회'}
                  value={'5'}
                  className={formStyles.input_time}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow type="horizontal">
            <div className={formStyles.form_item}>
              <label htmlFor="name-examSort" className={formStyles.form_label}>
                <span className={formStyles.form_text}>시험분류</span>
                <Tooltip
                  className={formStyles.tooltip}
                  side="bottom"
                  align="start"
                  content={
                    '시험을 사전 평가, 진행단계 평가, 사후 평가로 세분화하여 분류할 수 있습니다.'
                  }
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-title"
                  className={formStyles.btn_switch}
                  label={checked[2] ? '사전평가' : '분류안함'}
                  checked={checked[2]}
                  onCheckedChange={handleCheckedChange(2)}
                />
              </div>
            </div>
          </ContentsRow>
          {checked[2] && (
            <div className={dynamicFormStyles.form_display}>
              <ContentsRow>
                <RadioGroupFormField
                  options={[
                    { value: 'option01', label: '사전평가' },
                    { value: 'option02', label: '진행단계평가' },
                    { value: 'option03', label: '사후(최종)평가' },
                  ]}
                />
              </ContentsRow>
            </div>
          )}
          <ContentsRow type="horizontal">
            <div className={formStyles.form_item}>
              <label htmlFor="name-examControl" className={formStyles.form_label}>
                <span className={formStyles.form_text}>문항이동 제어</span>
                <Tooltip
                  className={formStyles.tooltip}
                  side="bottom"
                  align="start"
                  content={'시험 문항을 순차적으로 풀어야된다면 문항이동 제어기능을 사용하세요. '}
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-examControl"
                  className={formStyles.btn_switch}
                  label={checked[3] ? '제어함' : '제어안함'}
                  checked={checked[3]}
                  onCheckedChange={handleCheckedChange(3)}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow type="horizontal">
            <div className={formStyles.form_item}>
              <label htmlFor="name-examResult" className={formStyles.form_label}>
                <span className={formStyles.form_text}>시험응시 후 결과 공개</span>
                <Tooltip
                  className={formStyles.tooltip}
                  side="bottom"
                  align="start"
                  content={
                    '결과 공개는 시험 응시 후 총점, 시험문항, 문항별 채점(정답을 맞췄는지 여부), 문항별 정답, 정답의 해설을 학습자에게 공개할지, 공개한다면 언제공개할지 설정합니다. '
                  }
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-examResult"
                  className={formStyles.btn_switch}
                  label={checked[4] ? '공개' : '비공개'}
                  checked={checked[4]}
                  onCheckedChange={handleCheckedChange(4)}
                />
              </div>
            </div>
          </ContentsRow>
          {checked[4] && (
            <div className={dynamicFormStyles.form_display}>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-resultOpenRange" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>결과 공개 범위</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <CheckboxGroupFormField
                      options={[
                        { value: 'check01', label: '총점' },
                        { value: 'check02', label: '시험 문항' },
                        { value: 'check03', label: '문항별 채점' },
                        { value: 'check04', label: '문항별 정답' },
                        { value: 'check05', label: '정답의 해설' },
                      ]}
                      value={['check01', 'check02']}
                    />
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow className={'no_line'}>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-resultViewPoint" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>결과보기 가능 시점</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <RadioGroupFormField
                      options={[
                        { value: 'option01', label: '시험 종료 후' },
                        { value: 'option02', label: '시험제출 후' },
                      ]}
                    />
                  </div>
                </div>
              </ContentsRow>
            </div>
          )}
          <ContentsRow type="horizontal">
            <div className={formStyles.form_item}>
              <label htmlFor="name-examDisabled" className={formStyles.form_label}>
                <span className={formStyles.form_text}>재응시 시 이전 선택 오답 비활성화</span>
                <Tooltip
                  className={formStyles.tooltip}
                  side="bottom"
                  align="start"
                  content={
                    '비활성화 적용 시  이전 응시 때 선택한 오답 보기들은 재응시 시 선택을 할수 없는 상태로 보여집니다. '
                  }
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-examDisabled"
                  className={formStyles.btn_switch}
                  label={checked[5] ? '적용' : '미적용'}
                  checked={checked[5]}
                  onCheckedChange={handleCheckedChange(5)}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow type="horizontal">
            <div className={formStyles.form_item}>
              <label htmlFor="name-examTimeover" className={formStyles.form_label}>
                <span className={formStyles.form_text}>시험제한시간 초과 시 자동제출</span>
                <Tooltip
                  className={formStyles.tooltip}
                  side="bottom"
                  align="start"
                  content={
                    ' 자동제출 설정 시 시험 제한시간이 지나면 시험지가 자동제출됩니다. 직접제출 설정 시 시험 제한시간이 지나더라도 ‘제출’버튼을 클릭해야 시험지가 제출됩니다.    '
                  }
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-examTimeover"
                  className={formStyles.btn_switch}
                  label={checked[6] ? '자동제출' : '직접제출'}
                  checked={checked[6]}
                  onCheckedChange={handleCheckedChange(6)}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow type="horizontal">
            <div className={formStyles.form_item}>
              <label htmlFor="name-examGuide" className={formStyles.form_label}>
                <span className={formStyles.form_text}>시험 종료 안내</span>
                <Tooltip
                  className={formStyles.tooltip}
                  side="bottom"
                  align="start"
                  content={'시험 문항을 순차적으로 풀어야된다면 문항이동 제어기능을 사용하세요. '}
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-examGuide"
                  className={formStyles.btn_switch}
                  label={checked[7] ? '종료안내' : '안내안함'}
                  checked={checked[7]}
                  onCheckedChange={handleCheckedChange(7)}
                />
              </div>
            </div>
          </ContentsRow>
          {checked[7] && (
            <div className={dynamicFormStyles.form_display}>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-examEnd" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>시험시간 종료</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <div className={dynamicFormStyles.w_half}>
                      <Input
                        id="name-exam04"
                        type="text"
                        suffixText={'분전'}
                        placeholder={'입력'}
                        className={formStyles.input_time}
                      />
                    </div>
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow className="no_line">
                <div className={formStyles.form_item}>
                  <label htmlFor="name-examMsg" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>종료메세지</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Textarea
                      id={'name-examMsg'}
                      rows={5}
                      cols={5}
                      maxLength={500}
                      resize={'none'}
                      placeholder={'입력'}
                      size={'sm'}
                    />
                  </div>
                </div>
              </ContentsRow>
            </div>
          )}
        </div>
        <div className={styles.sub_container}>
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
      </div>
    </div>
  );
};

TestInfoComponent.displayName = 'TestInfo';
export const TestInfo = TestInfoComponent;
