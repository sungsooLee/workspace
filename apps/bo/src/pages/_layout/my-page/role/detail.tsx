import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';

import {
  DynamicFormConfig,
  SearchBoxConfig,
  useCurrentRoute,
  useDynamicForm,
  useSearchBox,
} from '@/libs/hooks/src';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { pageRouteConfig } from '@features/auth';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { Button, ContentsRow, GridBox, useGridBox } from '@/libs/ui/src';
import { SearchBox } from '@shared/ui/search-box';
import { ContentsHistoryInfoFormField, FormRow, FormSubTitle } from '@shared/ui';
import { cn } from '@learnway/shared';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

export const Route = createFileRoute('/_layout/my-page/role/detail')({
  component: RouteComponent,
  ...pageRouteConfig({ meta: { title: '나의 권한' } }),
});

function RouteComponent() {
  const { state } = useCurrentRoute(Route);
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const { provider, fetchData, onSubmit, onFormChange, clearFormError, control } =
    useDynamicForm(formConfig);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNumber: 0,
    totalRows: 20,
    totalPages: 10,
  });
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    console.log('handleOnSearch:: ', data);
  };

  console.log(' PAGE STATE :', state);
  return (
    <PageContainer>
      <ContentsButtons>
        <Link to="/my-page/role">
          <Button type="button" variant="point" size="sm">
            목록
          </Button>
        </Link>
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <GridBox
          // hideRowSelectionRadioBox={false}
          onRowSelect={(row: any) => {
            console.log('row::', row);
            setSelectedRow(row);
          }}
          config={gConfig}
          pagination={{
            ...pagination,
            onPageChange: (pageIndex) => {
              console.log('pageIndex :: ', pageIndex);
              setPagination((prev) => ({ ...prev, pageIndex }));
            },
            onPageSizeChange: (pageSize) => {
              console.log('pageSize :: ', pageSize);
              setPagination((prev) => ({ ...prev, pageSize }));
            },
          }}
        />
        <form style={{ marginTop: 20 }}>
          <FormSubTitle label={t('역할 정보')} />
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'roleId'}
              // element={<DateRangePickerFormField />}
            />
            <FormRow
              provider={provider}
              name={'roleCd'}
              // element={<DateRangePickerFormField />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'roleName'}
              // element={<DateRangePickerFormField />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'roleDescription'}
              // element={<DateRangePickerFormField />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'tenant'}
              // element={<DateRangePickerFormField />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'channel'}
              // element={<DateRangePickerFormField />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'company'}
              // element={<DateRangePickerFormField />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'team'}
              // element={<DateRangePickerFormField />}
            />
          </ContentsRow>
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </form>
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'requestStatus',
        type: 'dropdown',
        label: t('신청상태'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: '승인', label: t('승인') },
          { value: '반려', label: t('반려') },
        ],
      },
      {
        name: 'requestDate',
        type: 'date-range',
        label: t('신청일'),
        value: {
          from: undefined,
          to: undefined,
        },
      },
    ],
  ],
};

const gridConfig = {
  query: '',
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    {
      name: 'role',
      label: t('HRD 담당자 역할'),
    },
    {
      name: 'rolePeriod',
      label: t('권한 기간'),
    },
    { name: 'approveStatus', label: t('신청 상태') },
    { name: 'createDate', label: t('신청일') },
    { name: 'approveDate', label: t('승인/반려일') },
    { name: 'approveUser', label: t('승인/반려자') },
  ],
  data: [
    {
      role: '태넌트 관리자',
      rolePeriod: '2025-10-10 ~ 2025-11-10',
      approveStatus: '승인',
      createDate: '2025-10-10',
      approveDate: '2025-10-10',
      approveUser: '김현대',
    },
    {
      role: '채널 관리자',
      rolePeriod: '2025-10-10 ~ 2025-11-10',
      approveStatus: '반려',
      createDate: '2025-10-10',
      approveDate: '2025-10-10',
      approveUser: '김현대',
    },
  ],
};

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'roleId',
      type: 'text',
      label: t('역할ID'),
      value: '',
      disabled: true,
    },
    {
      name: 'roleCd',
      type: 'text',
      label: t('역할코드'),
      value: '',
      disabled: true,
    },
    {
      name: 'roleName',
      type: 'text',
      label: t('역할명'),
      value: '',
      disabled: true,
    },
    {
      name: 'roleDescription',
      type: 'textarea',
      label: t('역할명'),
      value: '설명입니다',
      disabled: true,
    },
    {
      name: 'tenant',
      type: 'text',
      label: t('테넌트 적용 범위'),
      value: '',
      disabled: true,
    },
    {
      name: 'channel',
      type: 'text',
      label: t('채널 적용 범위'),
      value: '',
    },
    {
      name: 'company',
      type: 'text',
      label: t('회사 적용 범위'),
      value: '',
    },
    {
      name: 'team',
      type: 'text',
      label: t('팀 적용 범위'),
      value: '',
    },
  ],
  // validator: {
  //   approveRolePeriod: {
  //     required: true,
  //   },
  //   reson: {
  //     required: true,
  //   },
  // },
};
