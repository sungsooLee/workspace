import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';

import { createColumnHelper } from '@tanstack/react-table';
import {
  Button,
  ContentsRow,
  DynamicFormField,
  Grid,
  GridImperative,
  useModal,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';

import { FormRow } from '../../../shared/ui/form';
import {
  useCommonCodeGroupDetail,
  useCreateCommonCodeGroup,
  useUpdateCommonCodGroup,
} from '../../../entities/common-code/service/common-code-group.hook';
import { CommonCodeGroup } from '../../../types/entities/common-code';
import { useMutation } from '@tanstack/react-query';

// import { mutateOptions } from '../../'

const FORM_FIELDS = [
  'cdGroupNo',
  'cdGroupName',
  'cdGroupAbbreviatonEnglishName',
  'cdGroupContent',
  'useYn',
];

const columnHelper = createColumnHelper<any>();

const columns = [
  // 기존 columns 정의 유지
  columnHelper.accessor('cdGroupNo', {
    cell: (info) => info.getValue(),
    enablePinning: true,
    header: '코드그룹번호',
  }),
  columnHelper.accessor('cdGroupName', {
    cell: (info) => info.getValue(),
    enablePinning: true,
    header: '코드그룹명',
  }),
  columnHelper.accessor('cdGroupAbbreviatonEnglishName', {
    cell: (info) => info.getValue(),
    header: '코드그룹 약어영문',
  }),
  columnHelper.accessor('cdGroupContent', {
    cell: (info) => info.getValue(),
    header: '내용',
  }),
  columnHelper.accessor('useYn', {
    cell: (info) => info.getValue(),
    header: '사용',
  }),
  columnHelper.accessor('cmCd', {
    cell: (info) => {
      return <>보기</>;
    },
  }),
  // columnHelper.accessor('cmCd', {
  //   cell: (info) => {
  //     return <>보기</>;
  //   },
  // }),
  // columnHelper.accessor('cmCd', {
  //   cell: (info) => {
  //     return <>보기</>;
  //   },
  // }),
  // columnHelper.accessor('cmCd', {
  //   cell: (info) => {
  //     return <>보기</>;
  //   },
  // }),
  // columnHelper.accessor('cmCd', {
  //   cell: (info) => {
  //     return <>보기</>;
  //   },
  // }),
  // columnHelper.accessor('cmCd', {
  //   cell: (info) => {
  //     return <>보기</>;
  //   },
  // }),
];

const initCdGroup = {
  cdGroupNo: '',
  cdGroupName: '',
  cdGroupAbbreviatonEnglishName: '',
  cdGroupContent: '',
  useYn: true,
  validityYn: true,
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
}: any) => {
  const gridRef = useRef<GridImperative>(null);

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
        description: '요청하신 작업이 정상적으로 완료되었습니다.',
      });

      if (data) {
        afterCreateOrUpdateCommonCodeGroup(data);
      }
    },
    queryParams: {
      page,
      size,
      //TODO: 검색어 입력값..
    },
  });
  const { update: updateCodeGroup } = useUpdateCommonCodGroup({
    onSuccess: (data: any) => {
      openAlert({
        title: '완료되었습니다.',
        description: '요청하신 작업이 정상적으로 완료되었습니다.',
      });
      if (data) {
        afterCreateOrUpdateCommonCodeGroup(data);
      }
    },
  });

  const afterCreateOrUpdateCommonCodeGroup = (data: any) => {
    const newItem = {
      cdGroupNo: data.cdGroupNo,
      cdGroupName: data.cdGroupName,
      cdGroupAbbreviatonEnglishName: data.cdGroupAbbreviatonEnglishName,
      cdGroupContent: data.cdGroupContent,
      applyDatetime: '',
      useYn: data.useYn,
      validityYn: true,
    };

    // 데이터 새로고침 후 행 선택 시도를 위해 타이머 설정
    setTimeout(() => {
      // 적절한 시간 후에 행 선택 시도 (데이터 새로고침 완료 후)
      const selected = gridRef.current?.selectRowById('cdGroupNo', data.cdGroupNo);
      if (selected) {
        setFormMode(FORM_MODE.VIEW);
        setSelectedRow(newItem);
      } else {
        setSelectedRow(null);
        setFormMode(FORM_MODE.NONE);
        onFormChange(initCdGroup);
      }
    }, 100);
  };

  const clearAllFormErrors = () => {
    FORM_FIELDS.forEach((field) => clearFormError(field));
  };

  const { data: detailData, isLoading } = useCommonCodeGroupDetail(selectedRow?.cdGroupNo || '');

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

    // 실제 구현시 아래 주석을 해제하여 사용자에게 확인
    // if (isFormDirty) {
    //   if (!window.confirm('작성 중인 내용이 있습니다. 정말로 새로운 추가를 시작하시겠습니까?')) {
    //     return;
    //   }
    // }

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

      // // 실제 구현시 아래 주석을 해제하여 사용자에게 확인
      // if (
      //   hasChanges &&
      //   !window.confirm('작성 중인 내용이 있습니다. 변경 내용을 취소하시겠습니까?')
      // ) {
      //   window.confirm('작성 중인 내용이 있습니다. 변경 내용을 취소하시겠습니까?');
      //   return;
      // }
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
        title: '요청하신 정보 추가하시겠습니까?',
        description: '요청하신 정보를 정확히 확인 후 등록하세요',
      });
      if (isAdd) {
        const createPayload = {
          ...formData,
          //TODO: 추후 변경되면 알려주신다고 함.
          informationSystemNo: 'test', //정보시스템번호
          cdRelationSeparationCd: 't', //코드관계구분코드
          cdLength: 0, //코드길이
          cdStandardTypecd: 't', //코드표준유형코드
          applyDatetime: new Date(), //적용일시
          validityYn: true, //유효여부
          languageCd: 't', //언어코드
          sourceInformationSystemNo: 'test', //원천정보시스템번호
          requestorEmployeeNo: 'test', //요청자사원번호
          multilingulCd: 'test', //다국어코드
          deleteYn: false, //삭제여부
        };
        // console.log('추가');
        createCodeGroup(createPayload);
      }
    } else if (formMode === FORM_MODE.VIEW) {
      const isUpdate = await openConfirm({
        title: '적용하시겠습니까?',
        description: '요청하신 정보를 정확히 확인 후 저장하세요.',
      });

      if (isUpdate) {
        const updatePayload = {
          ...formData,
          //TODO: 추후 변경되면 알려주신다고 함.
          informationSystemNo: 'test', //정보시스템번호
          cdRelationSeparationCd: 't', //코드관계구분코드
          cdLength: 0, //코드길이
          cdStandardTypecd: 't', //코드표준유형코드
          applyDatetime: new Date(), //적용일시
          validityYn: true, //유효여부
          languageCd: 't', //언어코드
          sourceInformationSystemNo: 'test', //원천정보시스템번호
          requestorEmployeeNo: 'test', //요청자사원번호
          multilingulCd: 'test', //다국어코드
          deleteYn: false, //삭제여부
        };
        updateCodeGroup(updatePayload);
      }
    }

    // 여기에 API 호출 로직 추가
  };

  // 데이터가 로드되면 폼에 채우기
  useEffect(() => {
    if (detailData && !isLoading && formMode === FORM_MODE.VIEW && !dataProcessed) {
      console.log('Filling form with data:', detailData);
      fetchData(detailData);
      // 데이터 처리 완료 표시
      setDataProcessed(true);
    }
  }, [detailData, isLoading, formMode, dataProcessed]);

  // 선택된 행이 변경되면 데이터 처리 플래그 초기화
  useEffect(() => {
    if (selectedRow) {
      setDataProcessed(false);
    }
  }, [selectedRow?.cdGroupNo]);

  // 폼 필드 활성화 여부 결정
  const isFormDisabled = formMode === FORM_MODE.NONE;

  return (
    <div className="flex flex-row">
      <div>
        <Grid
          ref={gridRef}
          data={data || []}
          columns={columns}
          showTotalCount={true}
          title={t('공통코드그룹목록')}
          hideColumnSettings={true}
          pagination={{
            pageIndex: page,
            pageSize: size,
            totalRows: data?.meta?.totalRows || 0,
            onPageChange: onPageChange,
            onPageSizeChange: onPageSizeChange,
          }}
          columnPinning={{ columns: ['cdGroupNo', 'cdGroupName'] }}
          onRowSelect={handleRowSelect}
        />
      </div>
      <div>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <div className={layoutStyles.inner_contents}>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={handleAddMode}
            >
              추가
            </Button>
            <Button type="submit" variant="save" size="sm" disabled={formMode === FORM_MODE.NONE}>
              저장
            </Button>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'cdGroupNo'} disabled={isFormDisabled} />
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
                <DynamicFormField name={'useYn'} disabled={isFormDisabled} />
              </FormRow>
            </ContentsRow>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CommonCodeGroupGrid = CommonCodeGroupGridComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'cdGroupNo',
      type: 'text',
      label: t('그룹코드'),
      value: '',
    },
    {
      name: 'cdGroupName',
      type: 'text',
      label: t('그룹코드 명'),
      value: '',
    },
    {
      name: 'cdGroupAbbreviatonEnglishName',
      type: 'text',
      label: t('그룹코드 약어영문'),
      value: '',
    },
    {
      name: 'cdGroupContent',
      type: 'text',
      label: t('내용'),
      value: '',
    },
    {
      name: 'useYn',
      type: 'switch',
      label: t('사용'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
      value: false,
    },
  ],
  validator: {
    cdGroupNo: {
      required: true,
    },
    cdGroupName: {
      required: true,
    },
    cdGroupAbbreviatonEnglishName: {
      required: true,
    },
  },
};
