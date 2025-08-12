import { useDynamicForm2 } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { FormRow2, FormSubTitle } from '@learnway/ui/base-form';
import { SplitPanel } from '@learnway/ui/elements';
import { RadioGroupFormField } from '@learnway/ui/form-field';
import { GridBox } from '@learnway/ui/grid';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  DateRangePickerFormField,
  FormDisplay,
  InputFormField,
  SwitchFormField,
} from '@shared/ui/form';

import { useBulkUpdateSequence } from '@entities/learning-sequence/service/learning-sequence.hook';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { GridImperative } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';

export interface SequenceBatchModalComponentProps {
  courseId?: number;
  selectedItems?: object[];
}

/**
 * 화면 번호 NLP_BO_LMS0032 : 차수관리 > 일괄관리(팝업)
 */
const SequenceBatchModalComponent = ({
  courseId: courseIdProps,
  selectedItems,
}: SequenceBatchModalComponentProps) => {
  const { closeModal, confirm: openConfirm, alert: openAlert, showSaveComplete } = useModal();
  const [columns, setColumns] = useState() as any;
  const [gridData, setGridData] = useState<any[]>([]);
  const [selectedRowsKey, setSelectedRowsKey] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const listGridRef = useRef<GridImperative>(null);
  const { bulkUpdateSequence } = useBulkUpdateSequence({});

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
      { key: 'isUsed', name: t('차수 사용 여부') },
      { key: 'enrollRange', name: t('수강신청 기간') },
      { key: 'learningStartType', name: t('학습 기간') },
      { key: 'isMaxEnrollQuotaRestricted', name: t('정원') },
    ];

    setGridData(data);
    setTimeout(() => {
      listGridRef.current?.toggleAllRowsSelected(true);
    }, 300);
  }, []);

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
  } = useDynamicForm2();

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

    const selected = (key: string) => selectedRowsKey.includes(key);

    const payload = {
      courseId: courseIdProps,
      sequenceIds: selectedItems?.map((x: any) => x.courseSequenceId),

      isCheckUsed: selected('isUsed'),
      isCheckEnrollDateTime: selected('enrollRange'),
      isCheckLearningDateTime: selected('learningStartType'),
      isCheckMaxEnrollQuota: selected('isMaxEnrollQuotaRestricted'),

      isUsed: selected('isUsed') ? formData.isUsed : undefined,

      enrollStartDateTime: selected('enrollRange')
        ? (formData.enrollRange?.from ?? null)
        : undefined,
      enrollEndDateTime: selected('enrollRange') ? (formData.enrollRange?.to ?? null) : undefined,

      learningStartType: selected('learningStartType')
        ? formData.learningStartType
          ? 'DAYS_AFTER_ENROLL'
          : 'FIXED_DATE'
        : undefined,
      learningStartDays: selected('learningStartType')
        ? formData.learningStartType
          ? parseInt(formData.learningStartDays)
          : null
        : undefined,
      learningStartDateTime: selected('learningStartType')
        ? formData.learningStartType
          ? null
          : (formData.learningRange?.from ?? null)
        : undefined,
      learningEndDateTime: selected('learningStartType')
        ? formData.learningStartType
          ? null
          : (formData.learningRange?.to ?? null)
        : undefined,

      isMaxEnrollQuotaRestricted: selected('isMaxEnrollQuotaRestricted')
        ? formData.isMaxEnrollQuotaRestricted
        : undefined,
      maxEnrollQuota: selected('isMaxEnrollQuotaRestricted')
        ? formData.isMaxEnrollQuotaRestricted
          ? parseInt(formData.maxEnrollQuota)
          : null
        : undefined,
    };

    console.log('## payload=>', payload);

    await bulkUpdateSequence(payload, {
      onSuccess: async (data: any, variables: any, context: any) => {
        console.log('onSuccess:', data);
        await showSaveComplete();
        closeModal(true);
      },
      onError: (data: any, variables: any, context: any) => {
        console.log('onError:', data);
      },
    });
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
              <FormDisplay provider={provider} onDisplay={() => selectedRowsKey.includes('isUsed')}>
                <ContentsRow type="horizontal">
                  <FormRow2
                    provider={provider}
                    name={'isUsed'}
                    type={'switch'}
                    format={'boolean'}
                    label={t('차수 사용 여부')}
                    value={true}
                    switchConfig={{
                      label: (value: boolean) => (value ? t('사용') : t('미사용')),
                    }}
                    element={<SwitchFormField />}
                    validation={{ required: true }}
                  />
                </ContentsRow>
              </FormDisplay>
              <FormDisplay
                provider={provider}
                onDisplay={() => selectedRowsKey.includes('enrollRange')}
              >
                <ContentsRow>
                  <FormRow2
                    provider={provider}
                    name="enrollRange"
                    type={'date-range'}
                    format={'object'}
                    label={t('수강신청 기간')}
                    // value{ from: undefined, to: undefined },
                    element={<DateRangePickerFormField />}
                    validation={{
                      required: true,
                      conditions: [
                        {
                          fn: (values: any) => {
                            console.log('values.enrollRange=>', values.enrollRange);
                            return !values.enrollRange.from || !values.enrollRange.to;
                          },
                          message: t('시작 및 종료 날짜를 선택하세요'),
                        },
                        {
                          fn: (values: any) => {
                            return values.enrollRange.from > values.enrollRange.to;
                          },
                          message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
                        },
                      ],
                    }}
                  />
                </ContentsRow>
              </FormDisplay>
              <FormDisplay
                provider={provider}
                onDisplay={() => selectedRowsKey.includes('learningStartType')}
              >
                <ContentsRow>
                  <FormRow2
                    provider={provider}
                    name={'learningStartType'}
                    label={t('학습 기간')}
                    type={'object'}
                    format={'object'}
                    value={false}
                    element={
                      <RadioGroupFormField
                        options={[
                          {
                            value: false,
                            label: t('시작일 기준'),
                            node: (
                              <FormRow2
                                provider={provider}
                                name={'learningRange'}
                                format={'object'}
                                value={''}
                                element={<DateRangePickerFormField />}
                              />
                            ),
                          },
                          {
                            value: true,
                            label: t('기간 지정'),
                            node: (
                              <FormRow2
                                provider={provider}
                                name={'learningStartDays'}
                                value={''}
                                element={
                                  <InputFormField
                                    type="number"
                                    prefixText={t('학습 가능일로부터')}
                                    suffixText={t('일')}
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
              </FormDisplay>
              <FormDisplay
                provider={provider}
                onDisplay={() => selectedRowsKey.includes('isMaxEnrollQuotaRestricted')}
              >
                <ContentsRow>
                  <FormRow2
                    provider={provider}
                    name={'isMaxEnrollQuotaRestricted'}
                    label={t('정원')}
                    type={'boolean'}
                    format={'object'}
                    value={false}
                    validation={{
                      required: true,
                      conditions: [
                        {
                          fn: (values: any) => {
                            if (values.isMaxEnrollQuotaRestricted) {
                              if (!values.maxEnrollQuota) return true;
                            }
                            return false;
                          },
                          message: t('정원을 입력해주세요.'),
                        },
                      ],
                    }}
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
                                  name={'maxEnrollQuota'}
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
              </FormDisplay>
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
