import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { Input, Dropdown, Button, GridBox, Divider } from '@learnway/ui';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

/* style */
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

const TestListsComponent: FC<{}> = ({}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  //grid
  const [pageNumber, setpageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      title1: '영어',
      title2: <Button className="link" label={'TOEIC'} />,
      title3: '점수/등급형',
      title4: '754',
      title5: 'ETS',
      title6: '2025-01-01',
      title7: '2025-01-01',
    },
    {
      title1: '영어',
      title2: <Button className="link" label={'TOEIC'} />,
      title3: '점수/등급형',
      title4: '754',
      title5: 'ETS',
      title6: '2025-01-01',
      title7: '2025-01-01',
    },
    {
      title1: '영어',
      title2: <Button className="link" label={'TOEIC'} />,
      title3: '점수/등급형',
      title4: '754',
      title5: 'ETS',
      title6: '2025-01-01',
      title7: '2025-01-01',
    },
    {
      title1: '영어',
      title2: <Button className="link" label={'TOEIC'} />,
      title3: '점수/등급형',
      title4: '754',
      title5: 'ETS',
      title6: '2025-01-01',
      title7: '2025-01-01',
    },
    {
      title1: '영어',
      title2: <Button className="link" label={'TOEIC'} />,
      title3: '점수/등급형',
      title4: '754',
      title5: 'ETS',
      title6: '2025-01-01',
      title7: '2025-01-01',
    },
    {
      title1: '영어',
      title2: <Button className="link" label={'TOEIC'} />,
      title3: '점수/등급형',
      title4: '754',
      title5: 'ETS',
      title6: '2025-01-01',
      title7: '2025-01-01',
    },
    {
      title1: '영어',
      title2: <Button className="link" label={'TOEIC'} />,
      title3: '점수/등급형',
      title4: '754',
      title5: 'ETS',
      title6: '2025-01-01',
      title7: '2025-01-01',
    },
    {
      title1: '영어',
      title2: <Button className="link" label={'TOEIC'} />,
      title3: '점수/등급형',
      title4: '754',
      title5: 'ETS',
      title6: '2025-01-01',
      title7: '2025-01-01',
    },
    {
      title1: '영어',
      title2: <Button className="link" label={'TOEIC'} />,
      title3: '점수/등급형',
      title4: '754',
      title5: 'ETS',
      title6: '2025-01-01',
      title7: '2025-01-01',
    },
    {
      title1: '영어',
      title2: <Button className="link" label={'TOEIC'} />,
      title3: '점수/등급형',
      title4: '754',
      title5: 'ETS',
      title6: '2025-01-01',
      title7: '2025-01-01',
    },
  ];

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '언어 분류',
      enableGrouping: false,
      size: 150,
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '어학시험 과목',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '어학시험 결과유형',
      size: 170,
      enableGrouping: false,
    }),

    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '사용 이력 수',
      size: 180,
      enableGrouping: false,
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '시행기관',
      enableGrouping: false,
      size: 140,
    }),
    columnHelper.accessor('title6', {
      cell: (info) => info.getValue(),
      header: '최초등록일',
      enableGrouping: false,
      size: 190,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title7', {
      cell: (info) => info.getValue(),
      header: '최종수정일',
      enableGrouping: false,
      size: 190,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <div>
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select1" className={searchStyles.label}>
                    <span className={searchStyles.text}>테넌트</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
                      variant="default"
                      size={'sm'}
                      isReadonly
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select2" className={searchStyles.label}>
                    <span className={searchStyles.text}>언어 분류</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id={'name-select2'} type={'text'} placeholder={'입력'} value={''} />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select3" className={searchStyles.label}>
                    <span className={searchStyles.text}>어학시험 과목</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Dropdown
                      options={options}
                      value={selectedValues2}
                      onChange={(selected) => setSelectedValues2(selected)}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
        </div>
      </div>
      <Divider spacing={'full'} />
      <GridBox
        data={data}
        columns={columns}
        showNumberingColumn={true}
        showSelectedCount={true}
        pagination={{
          pageSize,
          pageNumber,
          totalPages: 100,
          onPageChange: setpageNumber,
          onPageSizeChange: setPageSize,
        }}
        title={'어학시험 과목'}
      />
    </div>
  );
};

TestListsComponent.displayName = 'TestLists';
export const TestLists = TestListsComponent;
