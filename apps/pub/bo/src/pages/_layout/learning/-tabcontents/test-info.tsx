/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { NoticeBox } from '../../../../../../../bo/src/shared/ui';
import {
  Button,
  ContentsRow,
  Tabs,
  InputModalSelectorFormField,
  List,
  ModalBody,
  ModalContainer,
  ModalFooter,
  useModal,
  Dropdown,
  Input,
  Textarea,
  PhoneNumber,
} from '@learnway/ui';
import { IcoFormRequired, IcoRefresh02, IcoSearch } from '@learnway/icons';

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
          <FormSubTitle label={' 기본 정보'} />
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
              {/* 퍼블수정 20240317 : Modal 수정 S  */}
              <div className={formStyles.input_box}>
                <InputModalSelectorFormField
                  modalConfig={{
                    width: 'md',
                    content: <ModalManagerContent />,
                  }}
                />
              </div>
              {/* 퍼블수정 20240317 : Modal 수정 E  */}
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
                {/* 퍼블수정 20240313 : PhoneNumber 컴포넌트로 수정 E */}
              </div>
            </div>
          </ContentsRow>
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
