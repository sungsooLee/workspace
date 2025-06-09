import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { trim } from 'lodash';

import { cn, DATE_TIME_FORMAT, formatISODateString } from '@learnway/shared';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from '@tanstack/react-router';
import { IcoPlus } from '@learnway/icons';
import {
  Button,
  ContentsRow,
  GridBox,
  GridImperative,
  GridState,
  Input,
  Textarea,
  useModal,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import {
  useCommonCodeDetail,
  useCreateCommonCode,
  useUpdateCommonCode,
} from '../../../../entities/common-code/service/common-code.hook';
import { CommonCode } from '../../../../types/entities/common-code';
import { ContentsHistoryInfoFormField, FormRow, SwitchFormField } from '../../../../shared/ui';

// 폼 관련 필드 목록
const FORM_FIELDS = [
  'cdGroupId',
  'cdGroupName',
  'cdName',
  'cdSeq',
  'cdContent',
  'referenceVal1',
  'referenceVal2',
  'referenceVal3',
  'referenceVal4',
  'isUsed',
];

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('cdGroupId', {
    cell: (info) => info.getValue(),
    enablePinning: true,
    header: t('LABEL.common.cdGroupId'),
  }),
  columnHelper.accessor('cdGroupName', {
    cell: (info) => info.getValue(),
    enablePinning: true,
    header: t('LABEL.common.cdGroupName'),
  }),
  columnHelper.accessor('cdId', {
    cell: (info) => info.getValue(),
    header: t('LABEL.common.cdId'),
  }),
  columnHelper.accessor('cdName', {
    cell: (info) => info.getValue(),
    header: t('LABEL.common.cdName'),
  }),
  columnHelper.accessor('cdSeq', {
    cell: (info) => info.getValue(),
    header: t('LABEL.common.cdSeq'),
  }),
  columnHelper.accessor('isUsed', {
    cell: (info) => {
      return <p>{info.getValue() === true ? 'Y' : 'N'}</p>;
    },
    header: t('LABEL.common.isUsed'),
  }),
  columnHelper.accessor('cdContent', {
    cell: (info) => info.getValue(),
    header: t('LABEL.common.cdContent'),
  }),
  columnHelper.accessor('modifiedDate', {
    cell: (info) => formatISODateString(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
    header: t('LABEL.grid.column.modifiedDate'),
  }),
];

const initCdGroup = {
  cdId: '',
  cdName: '',
  cdSeq: '',
  cdContent: '',
  referenceVal1: '',
  referenceVal2: '',
  referenceVal3: '',
  referenceVal4: '',
  isUsed: true,
};

// 폼 모드를 상수로 정의
const FORM_MODE = {
  NONE: 'NONE', // 아무것도 선택되지 않은 상태
  VIEW: 'VIEW', // 기존 항목 보기 상태
  ADD: 'ADD', // 추가 모드
};

const CommonCodeGridComponent = ({
  data,
  page,
  size,
  onPageChange,
  onPageSizeChange,
  state,
  totalRows,
  onStateChange,
}: any) => {
  const gridRef = useRef<GridImperative>(null);
  const router = useRouter();
  const [formMode, setFormMode] = useState(FORM_MODE.NONE);
  const [selectedRow, setSelectedRow] = useState<CommonCode | null>(null);
  const [dataProcessed, setDataProcessed] = useState(false);
  const { alert: openAlert, confirm: openConfirm } = useModal();
  const { showSaveComplete, showDeleteComplete, showUpdateComplete } = useModal();

  const { provider, onSubmit, fetchData, clearFormError, onFormChange, getValues, formState } =
    useDynamicForm(formConfig);
  const { create: createCode } = useCreateCommonCode({
    page,
    size,
    sort: state.sort,
    cdGroupId: state.cdGroupId,
    cdGroupName: state.cdGroupName,
    isUsed: state.isUsed,
    cdName: state.cdName,
  });
  const { mutate: updateCode } = useUpdateCommonCode({
    page,
    size,
    sort: state.sort,
    cdGroupId: state.cdGroupId,
    cdGroupName: state.cdGroupName,
    isUsed: state.isUsed,
    cdName: state.cdName,
  });

  const afterCreateOrUpdateCommonCodeGroup = (data: any) => {
    const newItem = {
      cdGroupId: data.cdGroupId,
      cdGroupName: data.cdGroupName,
      cdId: data.cdId,
      cdName: data.cdName,
      cdContent: data.cdContent,
      referenceVal1: data.referenceVal1,
      referenceVal2: data.referenceVal2,
      referenceVal3: data.referenceVal3,
      referenceVal4: data.referenceVal4,
      isUsed: data.isUsed,
    };

    // 데이터 새로고침 후 행 선택 시도를 위해 타이머 설정
    setTimeout(() => {
      // 적절한 시간 후에 행 선택 시도 (데이터 새로고침 완료 후)
      const selected = gridRef.current?.selectRowById('cdId', data.cdId);
      if (selected) {
        setFormMode(FORM_MODE.VIEW);
        setSelectedRow(newItem);
      } else {
        setSelectedRow(null);
        setFormMode(FORM_MODE.NONE);
        onFormChange(initCdGroup);
      }
    }, 500);
  };

  const clearAllFormErrors = () => {
    FORM_FIELDS.forEach((field) => clearFormError(field));
  };

  const { data: detailData, isLoading } = useCommonCodeDetail(
    {
      cdGroupId: selectedRow?.cdGroupId || '',
      cdId: selectedRow?.cdId || '',
    },
    { enabled: Boolean(selectedRow?.cdGroupId) && Boolean(selectedRow?.cdId) },
  );

  // 추가 버튼 핸들러
  const handleAddMode = () => {
    setFormMode(FORM_MODE.ADD);
    setSelectedRow(null);
    onFormChange({
      ...initCdGroup,
      cdGroupId: state.cdGroupId,
      cdGroupName: state.cdGroupName,
    });
    // 데이터 처리 플래그 초기화
    setDataProcessed(false);
    clearAllFormErrors();
  };

  // 행 선택 핸들러
  const handleRowSelect = (row: CommonCode) => {
    // 현재 추가 모드이거나 폼이 변경되었을 때 사용자에게 확인
    if (formMode === FORM_MODE.ADD) {
      const currentValues = getValues();
      const hasChanges = Object.keys(initCdGroup).some(
        (key) => currentValues[key] !== initCdGroup[key as keyof typeof initCdGroup],
      );
    }

    if (row) {
      setFormMode(FORM_MODE.VIEW);
      setSelectedRow(row);
      // 새로운 행이 선택되면 데이터 처리 플래그 초기화
      setDataProcessed(false);
    } else {
      setFormMode(FORM_MODE.NONE);
      setSelectedRow(null);
      // 선택 해제 시 폼 초기화
      onFormChange({
        ...initCdGroup,
      });
      clearAllFormErrors();
    }
  };

  // 폼 제출 핸들러
  const handleOnSubmit = async (formData: any) => {
    console.log('Form submitted:', formData);

    if (formMode === FORM_MODE.ADD) {
      const isAdd = await openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message'),
      });
      if (isAdd) {
        const createPayload = {
          ...formData,
          cdSeq: formData.cdSeq === '' ? null : Number(formData.cdSeq),
        };
        createCode(createPayload, {
          onSuccess: (data: any) => {
            showSaveComplete();
            if (data) {
              afterCreateOrUpdateCommonCodeGroup(data);
            }
          },
        });
      }
    } else if (formMode === FORM_MODE.VIEW) {
      const isUpdate = await openConfirm({
        title: t('LABEL.confirm.modify.title'),
        content: t('LABEL.confirm.modify.message'),
      });

      if (isUpdate) {
        const updatePayload = {
          ...formData,
          cdSeq: formData.cdSeq === '' ? null : Number(formData.cdSeq),
        };
        updateCode(updatePayload, {
          onSuccess: (data: any) => {
            showUpdateComplete();
            if (data) {
              afterCreateOrUpdateCommonCodeGroup(data);
            }
          },
        });
      }
    }

    // 여기에 API 호출 로직 추가
  };

  // 데이터가 로드되면 폼에 채우기
  useEffect(() => {
    if (detailData && !isLoading && formMode === FORM_MODE.VIEW && !dataProcessed) {
      console.log(detailData);
      const data = detailData as any;
      fetchData({ ...data, cdSeq: data.cdSeq ? data.cdSeq + '' : '' });
      // 데이터 처리 완료 표시
      setDataProcessed(true);
    }
  }, [detailData, isLoading, formMode, dataProcessed]);

  // 선택된 행이 변경되면 데이터 처리 플래그 초기화
  useEffect(() => {
    if (selectedRow) {
      setDataProcessed(false);
    }
  }, [selectedRow?.cdId]);

  // 폼 필드 활성화 여부 결정
  const isFormDisabled = formMode === FORM_MODE.NONE;

  const handleStateChange = (newState: GridState) => {
    if (onStateChange) {
      onStateChange(newState);
    }
  };

  return (
    <div className={cn(boxStyles.start, boxStyles.inner)}>
      <div
        className={cn(
          layoutStyles.start,
          layoutStyles.wrap,
          layoutStyles.ratio_third,
          layoutStyles.common_code,
        )}
      >
        <div className={cn(layoutStyles.inner)}>
          <div className={layoutStyles.inner_contents}>
            <GridBox
              ref={gridRef}
              data={data || []}
              columns={columns}
              showTotalCount={true}
              title={t('LABEL.grid.title.commonCdList')}
              pagination={{
                pageNumber: page,
                totalPages: totalRows || 0,
                onPageChange: onPageChange,
                onPageSizeChange: onPageSizeChange,
              }}
              columnPinning={{ columns: ['numbering', 'cdGroupId', 'cdGroupName'] }}
              onRowSelect={handleRowSelect}
              emptyMessage={
                state.cdGroupId === ''
                  ? t('LABEL.grid.searchFirst', { list: t('LABEL.common.cdGroup') })
                  : t('LABEL.grid.emptyText')
              }
              // onStateChange={handleStateChange}
              showNumberingColumn={true}
              customButtonNode={
                <Button
                  variant="text"
                  size="sm"
                  className={layoutStyles.btn_text}
                  onClick={handleAddMode}
                  disabled={trim(state.cdGroupId) === ''}
                >
                  <IcoPlus width={16} height={16} stroke="#131C30" />
                  {t('LABEL.button.add')}
                </Button>
              }
            />
          </div>
        </div>

        <div className={layoutStyles.inner}>
          <form onSubmit={onSubmit(handleOnSubmit)}>
            <div className={titleStyles.title_wrap}>
              <h3 className={titleStyles.title}>{t('LABEL.form.label.detailInfo')}</h3>
              <div className={layoutStyles.btn_wrap}>
                <Button
                  type="submit"
                  variant="save"
                  size="sm"
                  disabled={formMode === FORM_MODE.NONE}
                >
                  {t('LABEL.button.save')}
                </Button>
              </div>
            </div>
            <div className={layoutStyles.inner_contents}>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'cdGroupId'}
                  element={<Input disabled={true} />}
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'cdGroupName'}
                  element={<Input disabled={true} />}
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'cdId'}
                  element={<Input disabled={isFormDisabled || FORM_MODE.VIEW === formMode} />}
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'cdName'}
                  element={<Input disabled={isFormDisabled} />}
                >
                  <Button
                    type="button"
                    variant="point"
                    size="sm"
                    className="p-[10px]"
                    onClick={() => {
                      const cdId = getValues('cdId');
                      const cdName = getValues('cdName');
                      router.navigate({
                        to: '/platform/system/multilingual',
                        state: {
                          keyType: 'COMMON_CODE', // 다국어 분류 - 공통코드
                          multilinguaKey: cdId,
                        },
                      });
                    }}
                    disabled={isFormDisabled}
                  >
                    {t('LABEL.button.multilingualManage')}
                  </Button>
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'cdSeq'}
                  element={<Input disabled={isFormDisabled} />}
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'cdContent'}
                  element={<Textarea disabled={isFormDisabled} />}
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'referenceVal1'}
                  element={<Input disabled={isFormDisabled} />}
                />
                <FormRow
                  provider={provider}
                  name={'referenceVal2'}
                  element={<Input disabled={isFormDisabled} />}
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'referenceVal3'}
                  element={<Input disabled={isFormDisabled} />}
                />
                <FormRow
                  provider={provider}
                  name={'referenceVal4'}
                  element={<Input disabled={isFormDisabled} />}
                />
              </ContentsRow>
              <ContentsRow type={'horizontal'} className={'inactive'}>
                <FormRow
                  provider={provider}
                  name={'isUsed'}
                  element={<SwitchFormField disabled={isFormDisabled} />}
                />
              </ContentsRow>
              {formMode === FORM_MODE.VIEW && (
                <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
                  <ContentsHistoryInfoFormField type={'column'} />
                </ContentsRow>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const CommonCodeGrid = CommonCodeGridComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'cdGroupId',
      type: 'text',
      label: t('LABEL.cdGroupId'),
      value: '',
    },
    {
      name: 'cdGroupName',
      type: 'text',
      label: t('LABEL.cdGroupName'),
      value: '',
    },
    {
      name: 'cdId',
      type: 'text',
      label: t('LABEL.cdId'),
      value: '',
    },
    {
      name: 'cdName',
      type: 'text',
      label: t('LABEL.cdName'),
      value: '',
    },
    {
      name: 'cdSeq',
      type: 'number',
      label: t('LABEL.cdSeq'),
      value: '',
    },
    {
      name: 'cdContent',
      type: 'text',
      label: t('LABEL.cdContent'),
      value: '',
    },
    {
      name: 'referenceVal1',
      type: 'text',
      label: t('LABEL.referenceVal1'),
      value: '',
    },
    {
      name: 'referenceVal2',
      type: 'text',
      label: t('LABEL.referenceVal2'),
      value: '',
    },
    {
      name: 'referenceVal3',
      type: 'text',
      label: t('LABEL.referenceVal3'),
      value: '',
    },
    {
      name: 'referenceVal4',
      type: 'text',
      label: t('LABEL.referenceVal4'),
      value: '',
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
      value: false,
    },
  ],
  validator: {
    cdId: {
      required: true,
    },
    cdName: {
      required: true,
    },
  },
};
