import { t } from 'i18next';
import {
  Button,
  Checkbox,
  ContentsRow,
  DatePicker,
  FormSubTitle,
  GridBox,
  GridImperative,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  RadioCard,
  RadioGroup,
  RadioGroupFormField,
  SplitPanel,
  Textarea,
  ToggleButtonGroup,
  useModal,
} from '@learnway/ui';
import { EnPageMode } from '@types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DateRangeFormField, FormRow, FormRow2, SwitchFormField } from '@shared/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css

import { cn, SelectOption } from '@learnway/shared';

import { DateTimeRangePickerFormField } from '@features/form';

export interface SequenceBatchModalComponentProps {
  selectedItems: object[];
}

/**
 * 화면 번호 NLP_BO_LMS0032 : 차수관리 > 일괄관리(팝업)
 */
const SequenceBatchModalComponent = ({ selectedItems }: SequenceBatchModalComponentProps) => {
  const { close: closeModal, confirm: openConfirm, alert: openAlert } = useModal();
  const [columns, setColumns] = useState() as any;
  const [gridData, setGridData] = useState<any[]>([]);
  const [selectedRowsKey, setSelectedRowsKey] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const listGridRef = useRef<GridImperative>(null);

  useEffect(() => {
    console.log('##selectedItems=>', selectedItems);
    const columns = [
      columnHelper.accessor('name', {
        header: t('전체'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 58,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
    handleOnSearch();
  }, []);

  const handleOnSearch = useCallback(() => {
    const data = [
      { key: 'isUsed', name: '차수 사용 여부' },
      { key: 'regDate', name: '수강신청 기간' },
      { key: 'eduDate', name: '학습 기간' },
      { key: 'capacity', name: '정원' },
    ];

    setGridData(data);
    setTimeout(() => {
      listGridRef.current?.toggleAllRowsSelected(true);
    }, 300);
  }, []);

  const formConfig: DynamicFormConfig = {
    builders: [
      {
        name: 'isUsed',
        type: 'switch',
        format: 'boolean',
        label: () => t('차수 사용 여부'),
        value: true,
        switchConfig: {
          label: (value: boolean) => (value ? t('사용') : t('미사용')),
        },
      },
      {
        name: 'regDate',
        type: 'date-range',
        format: 'object',
        label: () => t('수강신청 기간'),
        value: { from: undefined, to: undefined },
      },
      {
        name: 'eduDate',
        type: 'object',
        format: 'object',
        label: () => t('학습 기간'),
        value: false,
      },
      {
        name: 'eduDate1',
        type: 'date-range',
        format: 'object',
        value: { from: undefined, to: undefined },
      },
      {
        name: 'eduDate2',
        type: 'number',
        value: undefined,
      },
      {
        name: 'capacity',
        type: 'boolean',
        format: 'object',
        label: () => t('정원'),
        value: false,
      },
      {
        name: 'capacity1',
        type: 'number',
        value: undefined,
      },
    ],
    validator: {
      isUsed: true,
      regDate: {
        required: true,
        conditions: [
          {
            fn: (values) => {
              return !values.regDate[0] || !values.regDate[1];
            },
            message: t('시작 및 종료 날짜를 선택하세요'),
          },
          {
            fn: (values) => {
              return values.regDate[0] > values.regDate[1];
            },
            message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
          },
        ],
      },
      capacity: {
        required: true,
        conditions: [
          {
            fn: (values) => {
              if (values.capacity) {
                if (!values.capacity1) return true;
              }
              return false;
            },
            message: t('정원을 입력해주세요.'),
          },
        ],
      },
    },
  };
  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    onFormValid,
    getValues,
    setValue,
    formState,
    control,
  } = useDynamicForm(formConfig);

  const handleOnSave = () => {
    const form = formRef.current;
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const handleOnSubmit = async (formData: any) => {
    console.log('form :', formData);
    if (selectedRowsKey.length === 0) {
      await openAlert({
        title: t('항목을 선택해주세요.'),
      });
      return;
    }

    const confirm = await openConfirm(t('일괄설정 하시겠습니까?'));
    if (!confirm) return;

    const payload = {
      isUsed: formData.isUsed,
    };

    // TODO: API연결
    // const payload = {
    //   isUsed: selectedRowsKey.includes('isUsed'),
    // };
    // selectedRowsKey.includes;

    await openAlert(t('완료 되었습니다.'));
    closeModal();
  };

  const columnHelper = createColumnHelper<any>();
  return (
    <ModalContainer>
      <ModalTitle>{t('일괄설정')}</ModalTitle>
      <ModalBody>
        <SplitPanel size={['auto', '75%']} divider>
          <SplitPanel size={['100%', 'auto']} gap={12}>
            <GridBox
              ref={listGridRef}
              data={gridData}
              columns={columns}
              multiple
              // hideRowSelectionCheckBox
              showNumberingColumn={false}
              clientSideSorting={true}
              title={t('항목')}
              onRowsSelect={(values: any) => {
                setSelectedRowsKey(values.map((v: any) => v.key));
                console.log('##selected:', selectedRowsKey);
              }}
              //   showTotalCount={false}
            />
          </SplitPanel>
          <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
            <FormSubTitle label={t('설정')} lineType={'dark'} />
            <div className={layoutStyles.inner_contents}>
              {selectedRowsKey.includes('isUsed') && (
                <ContentsRow type="horizontal">
                  <FormRow provider={provider} name={'isUsed'} element={<SwitchFormField />} />
                </ContentsRow>
              )}
              {selectedRowsKey.includes('regDate') && (
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name="regDate"
                    element={<DateTimeRangePickerFormField />}
                  />
                </ContentsRow>
              )}
              {selectedRowsKey.includes('eduDate') && (
                <ContentsRow>
                  <FormRow2
                    provider={provider}
                    name={'eduDate'}
                    label={t('학습 기간')}
                    element={
                      <RadioGroupFormField
                        options={[
                          {
                            value: false,
                            label: t('시작일 기준'),
                            node: (
                              <FormRow2
                                provider={provider}
                                name={'eduDate1'}
                                value={''}
                                element={<DateTimeRangePickerFormField />}
                              />
                            ),
                          },
                          {
                            value: true,
                            label: t('기간 지정'),
                            node: (
                              <FormRow2
                                provider={provider}
                                name={'eduDate2'}
                                value={''}
                                element={
                                  <Input
                                    type="number"
                                    prefixText="학습 가능일로부터"
                                    suffixText="일"
                                  />
                                }
                              />
                            ),
                          },
                        ]}
                      />
                    }
                  />
                </ContentsRow>
              )}
              {selectedRowsKey.includes('capacity') && (
                <ContentsRow>
                  <FormRow2
                    provider={provider}
                    name={'capacity'}
                    label={t('정원')}
                    element={
                      <RadioGroupFormField
                        optionsConfig={{
                          codeGroup: 'mock.options.use',
                          optionsNode: [
                            {
                              value: false,
                            },
                            {
                              value: true,
                              node: (
                                <FormRow2
                                  provider={provider}
                                  name={'capacity1'}
                                  value={''}
                                  element={
                                    <Input
                                      type="number"
                                      prefixText={t('정원')}
                                      suffixText={t('명')}
                                    />
                                  }
                                />
                              ),
                            },
                          ],
                        }}
                      />
                    }
                  />
                </ContentsRow>
              )}
            </div>
          </form>
        </SplitPanel>
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={closeModal} />
        <Button label={t('적용')} variant={'primary'} size={'lg'} onClick={handleOnSave} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const SequenceBatchModal = SequenceBatchModalComponent;
