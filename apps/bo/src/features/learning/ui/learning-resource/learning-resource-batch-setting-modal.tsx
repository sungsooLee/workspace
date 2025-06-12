import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import popLayoutstyles from './contents-layout.module.css';
import styles from './setting-item.module.css';
import { useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  Button,
  Checkbox,
  ContentsRow,
  DatePicker,
  GridBox,
  InputModalSelectorFormField,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  PhoneNumber,
  Switch,
  Tooltip,
  useModal,
} from '@learnway/ui';
import { IcoAlertCircle, IcoFormRequired, IcoRefresh02, IcoSearch } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '@shared/ui';
import { SelectCoordinatorModal } from './learning-resource-select-coordinator-modal';

function BatchSettingModalComponent() {
  const { close: closeModal } = useModal();
  // grid
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('item', {
      cell: (info) => info.getValue(),
      header: '전체',
      size: 220,
      enableGrouping: false,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const handleDate = (value: any) => {
    setDate(value);
  };

  const handleDate2 = (value: any) => {
    setDate2(value);
  };

  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };
  return (
    <ModalContainer>
      <ModalTitle>{'학습자원 일괄설정'}</ModalTitle>
      <ModalBody>
        <div className={cn(popLayoutstyles.start, popLayoutstyles.wrap)}>
          <div className={popLayoutstyles.contents}>
            <div className={popLayoutstyles.left_contents}>
              <div className={styles.start}>
                <GridBox
                  data={[
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
                  ]}
                  columns={columns}
                  title="일괄설정 항목"
                  showColumnSettings={false}
                  multiple={true}
                  showTotalCount={false}
                  className={styles.grid}
                  customButtonNode={
                    <p className="grid_info">
                      대상동영상 <span className="num">10</span>건
                    </p>
                  }
                />
              </div>
            </div>
            <div className={popLayoutstyles.main_contents}>
              <FormSubTitle label={'타이틀'} />
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-manager" className={formStyles.form_label}>
                    <span className={cn(formStyles.form_text)}>담당자</span>
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <InputModalSelectorFormField
                      modalConfig={{
                        width: 'md',
                        content: <SelectCoordinatorModal />,
                      }}
                      placeholder={'담당자를 선택하세요.'}
                    />
                  </div>
                </div>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-managerNum" className={formStyles.form_label}>
                    <span className={cn(formStyles.form_text)}>연락처</span>
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
                <div className={formStyles.form_item}>
                  <label htmlFor="name-term" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>사용기한</span>
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
              <ContentsRow type="horizontal">
                <div className={formStyles.form_item}>
                  <label htmlFor="name-conjugation" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>교육자원 활용여부</span>
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Switch
                      id="name-use"
                      className={dynamicFormStyles.btn_switch}
                      label={checked[2] ? '활용 가능' : '활용 불가'}
                      checked={checked[2]}
                      onCheckedChange={handleCheckedChange(2)}
                    />
                  </div>
                  <p className={formStyles.guide_text}>
                    해당 학습자원으로 교육 과정을 개설할 수
                    {checked[2] ? ' 있습니다.' : ' 없습니다.'}
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
                        {/* 채널<em>10</em>개 */}
                        채널 없음
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
                  최종 확인
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </strong>
                <div className={formStyles.form_contents}>
                  <ContentsRow>
                    <div className={formStyles.form_item}>
                      <label htmlFor="name-confirm" className={formStyles.form_label}>
                        <span className={formStyles.form_text}>검수 확인</span>
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
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
}

export const BatchSettingModal = BatchSettingModalComponent;
