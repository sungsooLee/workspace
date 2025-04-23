import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { useRouter } from '@tanstack/react-router';
import { cn, DATE_TIME_FORMAT, formatISODateString } from '@learnway/shared';
import { createColumnHelper } from '@tanstack/react-table';
import {
  Button,
  ContentsRow,
  DynamicFormField,
  GridBox,
  GridImperative,
  GridState,
  useModal,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';

import { ContentsHistoryInfoFormField, FormRow } from '../../../shared/ui/form';
import {
  useCommonCodeGroupDetail,
  useCreateCommonCodeGroup,
  useUpdateCommonCodGroup,
} from '../../../entities/common-code/service/common-code-group.hook';
import { CommonCodeGroup } from '../../../types/entities/common-code';

// 폼 관련 필드 목록
const FORM_FIELDS = [
  'cdGroupId',
  'cdGroupName',
  'cdGroupAbbreviatonEnglishName',
  'cdGroupContent',
  'isUsed',
];

const columnHelper = createColumnHelper<any>();

const initCdGroup = {
  cdGroupId: '',
  cdGroupName: '',
  cdGroupAbbreviatonEnglishName: '',
  cdGroupContent: '',
  isUsed: true,
};

// 폼 모드를 상수로 정의
const FORM_MODE = {
  NONE: 'NONE', // 아무것도 선택되지 않은 상태
  VIEW: 'VIEW', // 기존 항목 보기 상태
  ADD: 'ADD', // 추가 모드
};
const CommonCodeGroupGridComponent = ({
  data,
  page,
  size,
  onPageChange,
  onPageSizeChange,
  totalRows,
  state,
  onStateChange,
}: any) => {
  const gridRef = useRef<GridImperative>(null);
  const router = useRouter();

  const [formMode, setFormMode] = useState(FORM_MODE.NONE);
  const [selectedRow, setSelectedRow] = useState<CommonCodeGroup | null>(null);
  const [dataProcessed, setDataProcessed] = useState(false);

  const { alert: openAlert, confirm: openConfirm } = useModal();

  const { provider, onSubmit, fetchData, clearFormError, onFormChange, getValues, formState } =
    useDynamicForm(formConfig);
  const { create: createCodeGroup } = useCreateCommonCodeGroup({
    onSuccess: (data: any) => {
      openAlert({
        title: '완료되었습니다.',
        content: '요청하신 작업이 정상적으로 완료되었습니다.',
      });
    },
    queryParams: {
      page,
      size,
      sort: state.sort,
      cdGroupId: state.cdGroupId,
      cdGroupName: state.cdGroupName,
      isUsed: state.isUsed,
      // cdName: state.cdName,
    },
  });
  const { update: updateCodeGroup } = useUpdateCommonCodGroup({
    onSuccess: (data: any) => {
      openAlert({
        title: '완료되었습니다.',
        content: '요청하신 작업이 정상적으로 완료되었습니다.',
      });
    },
    queryParams: {
      page,
      size,
      sort: state.sort,
      cdGroupId: state.cdGroupId,
      cdGroupName: state.cdGroupName,
      isUsed: state.isUsed,
    },
  });

  const afterCreateOrUpdateCommonCodeGroup = (data: any) => {
    const newItem = {
      cdGroupId: data.cdGroupId,
      cdGroupName: data.cdGroupName,
      cdGroupAbbreviatonEnglishName: data.cdGroupAbbreviatonEnglishName,
      cdGroupContent: data.cdGroupContent,
      isUsed: data.isUsed,
    };

    // 데이터 새로고침 후 행 선택 시도를 위해 타이머 설정
    setTimeout(() => {
      // 적절한 시간 후에 행 선택 시도 (데이터 새로고침 완료 후)
      const selected = gridRef.current?.selectRowById('cdGroupId', data.cdGroupId);
      if (selected) {
        setFormMode(FORM_MODE.VIEW);
        setSelectedRow(newItem);
      } else {
        setSelectedRow(null);
        setFormMode(FORM_MODE.NONE);
        onFormChange(initCdGroup);
      }
    }, 300);
  };

  const clearAllFormErrors = () => {
    FORM_FIELDS.forEach((field) => clearFormError(field));
  };

  const { data: detailData, isLoading } = useCommonCodeGroupDetail(selectedRow?.cdGroupId || '');

  // 추가 버튼 핸들러
  const handleAddMode = () => {
    // 현재 작업 중인 내용이 있을 경우 확인 (실제 구현시 사용자에게 확인)
    const currentFormData = getValues();
    const isFormDirty = Object.keys(currentFormData).some(
      (key) =>
        currentFormData[key] !==
        (selectedRow
          ? selectedRow[key as keyof CommonCodeGroup]
          : initCdGroup[key as keyof typeof initCdGroup]),
    );

    setFormMode(FORM_MODE.ADD);
    setSelectedRow(null);
    onFormChange({
      ...initCdGroup,
    });
    // 데이터 처리 플래그 초기화
    setDataProcessed(false);
    // 모든 필드의 에러를 지웁니다
    clearAllFormErrors();
  };

  // 행 선택 핸들러
  const handleRowSelect = (row: CommonCodeGroup) => {
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
      setDataProcessed(false);
    } else {
      setFormMode(FORM_MODE.NONE);
      setSelectedRow(null);
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
        title: '요청하신 정보 추가하시겠습니까?',
        content: '요청하신 정보를 정확히 확인 후 등록하세요',
      });
      if (isAdd) {
        const createPayload = {
          ...formData,
        };
        createCodeGroup(createPayload, {
          onSuccess: async (data) => {
            if (data) {
              afterCreateOrUpdateCommonCodeGroup(data);
            }
          },
        });
      }
    } else if (formMode === FORM_MODE.VIEW) {
      const isUpdate = await openConfirm({
        title: '적용하시겠습니까?',
        content: '요청하신 정보를 정확히 확인 후 저장하세요.',
      });

      if (isUpdate) {
        const updatePayload = {
          ...formData,
        };
        updateCodeGroup(updatePayload, {
          onSuccess: async (data) => {
            if (data) {
              afterCreateOrUpdateCommonCodeGroup(data);
            }
          },
        });
      }
    }
  };

  // 데이터가 로드되면 폼에 채우기
  useEffect(() => {
    if (detailData && !isLoading && formMode === FORM_MODE.VIEW && !dataProcessed) {
      fetchData(detailData);
      setDataProcessed(true);
    }
  }, [detailData, isLoading, formMode, dataProcessed]);

  // 선택된 행이 변경되면 데이터 처리 플래그 초기화
  useEffect(() => {
    if (selectedRow) {
      setDataProcessed(false);
    }
  }, [selectedRow?.cdGroupId]);

  // 폼 필드 활성화 여부 결정
  const isFormDisabled = formMode === FORM_MODE.NONE;

  const handleStateChange = (newState: GridState) => {
    if (onStateChange) {
      onStateChange(newState);
    }
  };

  return (
    <div className={cn(boxStyles.start, boxStyles.inner)}>
      <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.ratio_third)}>
        <div className={cn(layoutStyles.inner, layoutStyles.scrollHidden)}>
          <div className={layoutStyles.inner_contents}>
            <GridBox
              ref={gridRef}
              data={data || []}
              columns={columns(router)}
              height={350}
              showTotalCount={true}
              title={t('공통코드그룹목록')}
              showColumnSettings={false}
              pagination={{
                pageIndex: page,
                pageSize: size,
                totalRows: totalRows || 0,
                onPageChange: onPageChange,
                onPageSizeChange: onPageSizeChange,
              }}
              columnPinning={{ columns: ['numbering', 'cdGroupId', 'cdGroupName'] }}
              onRowSelect={handleRowSelect}
              emptyMessage="조회 결과가 없습니다."
              onStateChange={handleStateChange}
              showNumberingColumn={true}
            />
          </div>
        </div>

        <div className={layoutStyles.inner}>
          <form onSubmit={onSubmit(handleOnSubmit)}>
            <div className={titleStyles.title_wrap}>
              <h3 className={titleStyles.title}>{'상세정보'}</h3>
              <div className={layoutStyles.btn_wrap}>
                <Button
                  variant="text"
                  size="sm"
                  className={layoutStyles.btn_text}
                  onClick={handleAddMode}
                >
                  추가
                </Button>
                <Button
                  type="submit"
                  variant="save"
                  size="sm"
                  disabled={formMode === FORM_MODE.NONE}
                >
                  저장
                </Button>
              </div>
            </div>
            <div className={layoutStyles.inner_contents}>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'cdGroupId'} disabled={true} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'cdGroupName'} disabled={isFormDisabled} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField
                    name={'cdGroupAbbreviatonEnglishName'}
                    disabled={isFormDisabled}
                  />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'cdGroupContent'} disabled={isFormDisabled} />
                </FormRow>
              </ContentsRow>
              <ContentsRow type={'horizontal'} className={'inactive'}>
                <FormRow provider={provider}>
                  <DynamicFormField name={'isUsed'} disabled={isFormDisabled} />
                </FormRow>
              </ContentsRow>

              <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
                {formMode === FORM_MODE.VIEW && <ContentsHistoryInfoFormField type={'column'} />}
              </ContentsRow>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const CommonCodeGroupGrid = CommonCodeGroupGridComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'cdGroupId',
      type: 'text',
      label: t('LABEL.cdGroupId'),
      value: '',
      placeholder: '자동 채번',
    },
    {
      name: 'cdGroupName',
      type: 'text',
      label: t('LABEL.cdGroupName'),
      value: '',
    },
    {
      name: 'cdGroupAbbreviatonEnglishName',
      type: 'text',
      label: t('LABEL.cdGroupAbbreviatonEnglishName'),
      value: '',
    },
    {
      name: 'cdGroupContent',
      type: 'text',
      label: t('LABEL.cdGroupContent'),
      value: '',
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('LABEL.isUsed'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
      value: false,
    },
  ],
  validator: {
    cdGroupName: {
      required: true,
    },
    cdGroupAbbreviatonEnglishName: {
      required: true,
    },
  },
};

const columns = (router: any) => {
  return [
    columnHelper.accessor('cdGroupId', {
      cell: (info) => info.getValue(),
      enablePinning: true,
      header: '그룹코드',
    }),
    columnHelper.accessor('cdGroupName', {
      cell: (info) => info.getValue(),
      enablePinning: true,
      header: '그룹 명',
    }),
    columnHelper.accessor('cdGroupAbbreviatonEnglishName', {
      cell: (info) => info.getValue(),
      header: '그룹 명 약어 영문',
    }),
    columnHelper.accessor('isUsed', {
      cell: (info) => {
        return <p>{info.getValue() === true ? 'Y' : 'N'}</p>;
      },
      header: '사용',
    }),
    // columnHelper.accessor('cdGroupContent', {
    //   cell: (info) => info.getValue(),
    //   header: '내용',
    // }),
    columnHelper.accessor('cmCd', {
      cell: (info) => {
        return (
          <p
            onClick={(e) => {
              e.stopPropagation();
              const cdGroupId = info.row.getValue('cdGroupId');
              const cdGroupName = info.row.getValue('cdGroupName');
              if (router) {
                router.navigate({
                  to: '/platform/common-code',
                  state: {
                    cdGroupId: cdGroupId,
                    cdGroupName: cdGroupName,
                  },
                });
              }
            }}
            className="cursor-pointer select-none underline"
          >
            코드관리
          </p>
        );
      },
      header: '공통코드',
      enableSorting: false,
    }),

    // columnHelper.accessor('createdDate', {
    //   cell: (info) => formatISODateString(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
    //   header: '최초등록 일자',
    // }),
    // columnHelper.accessor('createdBy', {
    //   cell: (info) => info.getValue(),
    //   header: '최초등록자',
    // }),
    columnHelper.accessor('modifiedDate', {
      cell: (info) => formatISODateString(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
      header: '최종수정 일자',
    }),
    // columnHelper.accessor('lastModifiedBy', {
    //   cell: (info) => info.getValue(),
    //   header: '최종수정자',
    // }),
  ];
};
