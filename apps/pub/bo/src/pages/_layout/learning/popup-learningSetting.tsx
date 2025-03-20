/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  Button,
  useModal,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Grid,
  Input,
  List,
  InputModalSelectorFormField,
  ContentsRow,
  PhoneNumber,
  DropdownList,
  DropdownOption,
  Checkbox,
  Tooltip,
} from '@learnway/ui';
import { IcoFormRequired, IcoRefresh02, IcoSearch, IcoAlertCircle } from '@learnway/icons';
import { cn } from '@learnway/shared';

/* CSS */
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form module css
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popSearchStyles from '@learnway/styles/bo/assets/styles/modules/popup-search.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import popLayoutstyles from './contents-layout.module.css'; // 팝업 컨텐츠 레이아웃
import styles from './settimg-item.module.css'; // 화면 css

export const Route = createFileRoute('/_layout/learning/popup-learningSetting')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const data: any[] = [
    {
      item: '담당자',
    },
    {
      item: '사용기한',
    },
    {
      item: '교육자원 활용여부',
    },
    {
      item: '보안콘텐츠  여부',
    },
    {
      item: '공유채널 설정',
    },
    {
      item: '검수',
    },
  ];
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('item', {
      cell: (info) => info.getValue(),
      header: '적용 항목',
      size: 224,
      enableGrouping: false,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'left', // 셀은 오른쪽 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];

  // Modal : 담당자 검색
  const ModalManagerContent = () => {
    const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
    const options = [
      { value: 'type1', label: '전체' },
      { value: 'type2', label: '항목' },
      { value: 'type3', label: '항목3' },
    ];
    return (
      <ModalContainer>
        <ModalBody>
          {/* 퍼블수정 20240318 : 수정 S */}
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
                          <DropdownList
                            options={options}
                            value={selectedOptions}
                            onChange={(selected) =>
                              setSelectedOptions(selected as DropdownOption[])
                            }
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
                    onlyIcon>
                    <IcoRefresh02 className={searchStyles.icon_refresh} />
                  </Button>
                  <Button
                    type="button"
                    variant="search"
                    size="sm"
                    className={searchStyles.btn_search}>
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
                onOptionsSelect={(options) => console.log(options)}
                hideBorder
              />
            </div>
          </div>
          {/* 퍼블수정 20240318 : 수정 E */}
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  const SettingItemContent = () => {
    return (
      <ModalContainer>
        <ModalTitle>{'학습자원 일괄설정'}</ModalTitle>
        <ModalBody>
          <div className={cn(popLayoutstyles.start, popLayoutstyles.wrap)}>
            <div className={popLayoutstyles.contents}>
              <div className={popLayoutstyles.left_contents}>
                <strong className={popLayoutstyles.title}>{'일괄설정 항목'}</strong>
                {/* settimg-item.module.css */}
                <div className={styles.start}>
                  <p className={styles.guide}>
                    {'일괄설정 대상 동영상'} <span className={styles.num}>{'10'}</span>
                    {'건'}
                    <IcoFormRequired width={12} height={12} className={styles.icon} />
                  </p>
                  <Grid
                    data={data}
                    columns={columns}
                    title="일괄설정 항목선택"
                    hideColumnSettings={true}
                    multiSelectable={true}
                    className={styles.grid}
                  />
                </div>
              </div>
              <div className={popLayoutstyles.main_contents}>
                <strong className={popLayoutstyles.title}>{'설정'}</strong>
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
                      {/* 퍼블수정 20240313 : PhoneNumber 컴포넌트로 수정 S */}
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
                            등록하고자 한 학습자원이며, 정상적으로 보여짐이 확인되었습니다.
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
                          <span className={formStyles.form_text}>저작권 확인</span>
                          {/* 필수 케이스 */}
                          <span className={cn(formStyles.status, formStyles.required)}>
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={formStyles.input_box}>
                          <Checkbox className={formStyles.checkbox} />
                          <p className={formStyles.sub_text}>
                            저작권법(제25조2항)에 따라 학습자원(동영상,이미지등)은 해당
                            학습플랫폼에서만 이용가능하며, 이 외의 공간에서 저작물을 공유 또는
                            게시하는 행위는 저작권법 위반에 해당될 수 있음에 동의합니다.
                          </p>
                        </div>
                        <p className={cn(formStyles.guide_text, formStyles.error)}>
                          ‘저작권 확인’ 체크하세요.
                        </p>
                      </div>
                    </ContentsRow>
                    <ContentsRow>
                      <div className={formStyles.form_item}>
                        <label htmlFor="name-confirm3" className={formStyles.form_label}>
                          <span className={formStyles.form_text}>보안 확인</span>
                          {/* 필수 케이스 */}
                          <span className={cn(formStyles.status, formStyles.required)}>
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={formStyles.input_box}>
                          <Checkbox className={formStyles.checkbox} />
                          <p className={formStyles.sub_text}>
                            보안콘텐츠 미 설정 시, 불법복제, 무단사용,저작권 침해 위험에 노출되고,
                            이에 따른 피해를 입을 수 있음에 인지합니다.
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
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'적용'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  // 한번만 실행
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        // title: '',
        width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <SettingItemContent />,
      });
      hasRun.current = true;
    }
  }, [openModal]);
  return <div>Hello "/_layout/learning/popup-learningSetting"!</div>;
}
