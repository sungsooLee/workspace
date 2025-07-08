import { useEffect, useCallback, useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useWatch } from 'react-hook-form';
import { t } from 'i18next';
import { Link, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Button, Divider, GridBox, useGridBox, useGridBoxConfig, useModal } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import {
  useSearchBox,
  SearchBoxConfig,
  CODE_GROUP,
  SelectOption,
  compactValues,
} from '@learnway/hooks';
import { queryOptions } from '@entities/instructor/service/instructor.queries';
import { useQueryClient } from '@tanstack/react-query';
import { GridExcelDownloadButton } from '@features/shared';
import { LMSApiPrefix } from '@learnway/config';

const _global = {
  linkClick: (payload: any) => {
    return;
  },
};

/**
 * NLP_BO_LMS_0027 : 강사 목록 조회
 * @returns
 */
const InstructorListComponent = () => {
  const router = useRouter();
  const { open: openModal, alert } = useModal();

  const queryClient = useQueryClient();

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'tenantId',
          type: 'dropdown',
          label: t('LABEL.form.label.tenant', '테넌트'),
          value: '',
          format: 'number',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.bo.my.tenant.tenantId'],
          },
        },
        {
          name: 'instructorType',
          type: 'dropdown',
          label: t('LABEL.form.label.instructorType', '강사 타입'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [
            { label: '사내', value: 'INTERNAL_INSTRUCTOR' },
            { label: '사외', value: 'EXTERNAL_INSTRUCTOR' },
          ],
        },
        {
          name: 'instructorName',
          type: 'text',
          label: t('강사명'),
          value: '',
        },
        {
          name: 'employeeIdOrEmail',
          type: 'text',
          label: t('이메일'),
          value: '',
        },
      ],
    ],
    validator: {},
  };

  const gridConfig: useGridBoxConfig = {
    query: queryOptions.all,
    columns: [
      {
        name: 'no1',
        label: 'NO.',
        type: 'numbering',
      },
    ],
    data: [],
    gridState: {
      page: 0,
      size: 10,
      sort: [],
    },
  };

  const location = useLocation();

  _global.linkClick = (payload: any) => {
    router.navigate({
      to: '/platform/instructor/management/instructor-regist',
      state: {
        instructorId: payload.instructorId,
        instructorType: payload.instructorType,
      },
    });
  };

  const {
    provider: searchProvider,
    getValues,
    getValuesWithLabel,
    setOptions,
    setValue,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const [params, setParams] = useState<Record<string, any>>({});
  const [valuesWithLabel, setValuesWithLabel] = useState<Record<string, SelectOption>>({});

  useEffect(() => {
    gridFetch();
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    const searchData = {
      tenantId: data.tenantId === 0 ? null : data.tenantId,
      instructorType: data.instructorType,
      instructorName: data.instructorName,
      employeeIdOrEmail: data.employeeIdOrEmail,
    };

    setParams(compactValues(searchData));
    setValuesWithLabel(getValuesWithLabel());
    gridFetch(searchData);
  }, []);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('tenantName', {
      header: t('테넌트'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
    columnHelper.accessor('instructorType', {
      header: t('강사 타입'),
      cell: (info) => (info.getValue() === 'INTERNAL_INSTRUCTOR' ? '사내 강사' : '사외 강사'),
      enableGrouping: false,
    }),
    columnHelper.accessor('instructorName', {
      header: t('강사명'),
      cell: (info) => (
        <Button
          className="link"
          onClick={() => {
            _global.linkClick(info.row.original as any);
          }}
          label={info.getValue() as string}
        />
      ),
    }),
    columnHelper.accessor('employeeIdOrEmail', {
      header: t('이메일'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
    columnHelper.accessor('telNo', {
      header: t('연락처'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
    columnHelper.accessor('mappedCourseCount', {
      header: t('배정된 과정수'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
    columnHelper.accessor('satisfactionScore', {
      header: t('만족도'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        columns={columns}
        title="강사 목록"
        customButtonNode={
          <>
            <GridExcelDownloadButton
              method="post"
              url={`${LMSApiPrefix()}/instructor/excel`}
              params={params}
              paramLabels={valuesWithLabel}
              dataCount={data?.totalElements}
              disabled={!data?.totalElements}
            />
          </>
        }
      />
    </>
  );
};

export const InstructorList = InstructorListComponent;
