import { useEffect, useCallback, useState } from 'react';
import { t } from 'i18next';
import { Link, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  Divider,
  Dropdown,
  GridBox,
  Input,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import { queryOptions } from '@entities/instructor/service/instructor.queries';

/**
 * NLP_BO_LMS_0028_1 : 강사이력 조회
 * @returns
 */
const InstructorHistoryComponent = (props: any) => {
  const router = useRouter();
  const { openModal, alert } = useModal();
  const options = [
    { value: 0, label: t('선택') },
    { value: 1, label: t('과정명') },
    { value: 2, label: t('차수명') },
  ];
  const [selectedValue, setSelectedValue] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const onChangeSearchOption = async (param: number) => {
    setSelectedValue(param);
  };

  const onChangeInputValue = async (param: string) => {
    setInputValue(param);
  };

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'instructorId',
          type: 'text',
          value: props.instructorId,
          placeholder: '',
        },
        {
          name: 'searchKey',
          type: 'text',
          value: selectedValue === 0 ? '' : selectedValue === 1 ? 'courseName' : 'sequenceName',
          placeholder: '',
        },
        {
          name: 'keyword',
          type: 'text',
          value: inputValue,
          placeholder: '',
        },
      ],
    ],
  };

  const gridConfig: useGridBoxConfig = {
    query: queryOptions.history,
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

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);

  useEffect(() => {
    handleOnSearch();
  }, []);

  const handleOnSearch = useCallback(() => {
    const searchData = {
      ...getValues,
      instructorId: props.instructorId,
      searchKey: selectedValue === 0 ? '' : selectedValue === 1 ? 'courseName' : 'sequenceName',
      keyword: inputValue,
    };
    gridFetch(searchData);
  }, [selectedValue, inputValue]);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('courseType', {
      header: t('과정 타입'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
    columnHelper.accessor('courseName', {
      header: t('과정명'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
    columnHelper.accessor('sequenceName', {
      header: t('차수명'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
    columnHelper.accessor('learningStartDate', {
      header: t('교육 시작일'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
    columnHelper.accessor('learningEndDate', {
      header: t('교육 종료일'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
    columnHelper.accessor('score', {
      header: t('점수'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
    columnHelper.accessor('creditMin', {
      header: t('인정시간(분)'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <>
      <Divider />
      <GridBox
        config={gConfig}
        columns={columns}
        gridData={data}
        title={t('강사이력 목록')}
        customButtonNode={
          <>
            <Dropdown
              options={options}
              value={selectedValue}
              onChange={onChangeSearchOption}
              variant="default"
              placeholder={t('선택')}
              size={'sm'}
            />
            <Input
              type="text"
              placeholder={t('검색')}
              showSearchIcon={true}
              searchIconType={'search'}
              value={inputValue}
              onChange={(e: any) => onChangeInputValue(e.target.value)}
              onEnterKeyDown={handleOnSearch}
            />
          </>
        }
      />
    </>
  );
};

export const InstructorHistory = InstructorHistoryComponent;
