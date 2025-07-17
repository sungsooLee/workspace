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
import { GridExcelDownloadButton } from '@shared/ui';
import { LMSApiPrefix } from '@learnway/config';
import { EnPageMode } from '@types';
import { IcoPlus } from '@learnway/icons';
import { InstructorRegistPopup } from '../modal/instructor-regist-modal';
import { useActiveMenuDepthState, useFetchAuthUser } from '@learnway/auth/entities';
import { Instructors } from 'src/types/entities/instructor';

const _global = {
  linkClick: (payload: any) => {
    return;
  },
};

type InstructorListProps = {
  viewMode: string;
  setSelectedItem?: (data: any) => any;
};

/**
 * NLP_BO_LMS_0027 : 강사 목록 조회
 * @returns
 */
const InstructorListComponent = ({ viewMode, setSelectedItem }: InstructorListProps) => {
  const router = useRouter();
  const { open: openModal, alert } = useModal();
  const [columns, setColumns] = useState() as any;

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
    columns:
      viewMode === EnPageMode.PAGE
        ? [
            {
              name: 'no1',
              label: 'NO.',
              type: 'numbering',
              size: 48,
            },
          ]
        : [],
    data: [],
    gridState: {
      page: 0,
      size: 10,
      sort: [],
    },
  };

  const location = useLocation();
  const { data: user } = useFetchAuthUser();
  const { activeMenuDepthMenu } = useActiveMenuDepthState((state) => state);

  _global.linkClick = (payload: any) => {
    router.navigate({
      to: '/learning-operate-support/instructor/management/instructor-regist',
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
    let columns = [
      columnHelper.accessor('tenantName', {
        header: t('테넌트'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: viewMode === EnPageMode.PAGE ? 180 : 246,
      }),
      columnHelper.accessor('instructorType', {
        header: t('강사 타입'),
        cell: (info) => (info.getValue() === 'INTERNAL_INSTRUCTOR' ? '사내 강사' : '사외 강사'),
        enableGrouping: false,
        size: viewMode === EnPageMode.PAGE ? 180 : 246,
      }),
      columnHelper.accessor('instructorName', {
        header: t('강사명'),
        cell: (info) =>
          viewMode === EnPageMode.PAGE ? (
            <Button
              className="link"
              onClick={() => {
                _global.linkClick(info.row.original as any);
              }}
              label={info.getValue() as string}
            />
          ) : (
            info.getValue()
          ),
        size: viewMode === EnPageMode.PAGE ? 366 : 246,
      }),
      columnHelper.accessor('employeeIdOrEmail', {
        header: t('이메일'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: viewMode === EnPageMode.PAGE ? 180 : 246,
      }),
      columnHelper.accessor('telNo', {
        header: t('연락처'),
        cell: (info) =>
          info.getValue() === null
            ? ''
            : info.row.original.telNo?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3'),
        enableGrouping: false,
        size: viewMode === EnPageMode.PAGE ? 180 : 246,
      }),
    ] as ColumnDef<any, unknown>[];

    if (viewMode === EnPageMode.PAGE) {
      const pageColumns = [
        columnHelper.accessor('mappedCourseCount', {
          header: t('배정된 과정수'),
          cell: (info) => info.getValue(),
          enableGrouping: false,
          size: 180,
        }),
        columnHelper.accessor('satisfactionScore', {
          header: t('만족도'),
          cell: (info) => info.getValue(),
          enableGrouping: false,
          size: 180,
        }),
      ];
      columns = [...columns, ...pageColumns];
    }

    setColumns(columns);
    gridFetch();
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    const searchData = {
      tenantId: data.tenantId === 0 ? null : data.tenantId,
      instructorType: data.instructorType,
      instructorName: data.instructorName,
      employeeIdOrEmail: data.employeeIdOrEmail,
    };

    const excelParam = {
      downloadReason: {
        userUuid: user?.uuid,
        menuPath: activeMenuDepthMenu?.map((menu) => menu.menuName).join(' > '),
        dataCount: 1500,
        requestParameter: 'string',
        downloadReasonType: 'AFFAIRS',
        downloadDetailReasonType: 'AFFAIRS01',
        downloadDetailReason: 'string',
      },
    };
    setParams({
      ...searchData,
      ...excelParam,
    });
    setValuesWithLabel(getValuesWithLabel());
    gridFetch(searchData);
  }, []);

  const refreshOnSearch = () => {
    handleOnSearch(getValues);
  };

  const columnHelper = createColumnHelper<any>();
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        columns={columns}
        title={viewMode === EnPageMode.PAGE ? t('강사 목록') : t('강사/튜터 목록')}
        hideRowSelectionRadioBox={viewMode === EnPageMode.PAGE ? true : false}
        onRowSelect={(row: Instructors) => {
          if (setSelectedItem) setSelectedItem(row);
        }}
        customButtonNode={
          viewMode === EnPageMode.PAGE ? (
            <GridExcelDownloadButton
              method="post"
              url={`${LMSApiPrefix()}/instructor/excel`}
              params={params}
              paramLabels={valuesWithLabel}
              dataCount={data?.totalElements}
              disabled={!data?.totalElements}
            />
          ) : (
            <Button
              variant="text"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                openModal({
                  width: 'md',
                  content: <InstructorRegistPopup refreshOnSearch={refreshOnSearch} />,
                });
              }}
            >
              <IcoPlus width={16} height={16} stroke="#131C30" />
              {t('LABEL.button.add')}
            </Button>
          )
        }
      />
    </>
  );
};

export const InstructorList = InstructorListComponent;
