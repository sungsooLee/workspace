/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  TreeBox,
  TreeContainer,
  TreeNode,
  Tabs,
  Dropdown,
  Input,
  Button,
  Divider,
  GridBox,
} from '@learnway/ui';
import { SectionLayout } from '../../-components/section-layout';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';

/* style */
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

const CompanyGroupConfirmComponent: FC<{}> = ({}) => {
  const sampleData: TreeNode[] = [
    {
      key: '1',
      title: 'Root Node 1',
      isUsed: false,
      children: [
        {
          key: '1-1',
          title: 'Child 1',
          isUsed: true,
          children: [
            { key: '1-1-1', title: 'Grandchild 1', isUsed: true },
            { key: '1-1-2', title: 'Grandchild 2', isUsed: false },
          ],
        },
        {
          key: '1-2',
          title: 'Child 2',
          isUsed: true,
          children: [
            { key: '2-1', title: 'Child 3', isUsed: false },
            { key: '2-2', title: 'Child 4', isUsed: false },
          ],
        },
      ],
    },
  ];
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  const [pageNumber, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const columnHelper = createColumnHelper<any>();
  const data: any[] = [
    {
      name1: '자동 등록',
      name2: 'C100001',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
    },
    {
      name1: '자동 등록',
      name2: 'C100001',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
    },
    {
      name1: '자동 등록',
      name2: 'C100001',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
    },
    {
      name1: '자동 등록',
      name2: 'C100001',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
    },
    {
      name1: '자동 등록',
      name2: 'C100001',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
    },
    {
      name1: '자동 등록',
      name2: 'C100001',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
    },
    {
      name1: '자동 등록',
      name2: 'C100001',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
    },
    {
      name1: '자동 등록',
      name2: 'C100001',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
    },
    {
      name1: '자동 등록',
      name2: 'C100001',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
    },
    {
      name1: '자동 등록',
      name2: 'C100001',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
    },
  ];
  const columns = [
    columnHelper.accessor('name1', {
      cell: (info) => info.getValue(),
      header: '조직 등록 유형',
      meta: {
        size: 'auto',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name2', {
      cell: (info) => info.getValue(),
      header: '조직코드',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name3', {
      cell: (info) => info.getValue(),
      header: '조직명',
      meta: {
        size: 'auto',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name4', {
      cell: (info) => info.getValue(),
      header: '조직장 사번',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name5', {
      cell: (info) => info.getValue(),
      header: '조직장 이름',
      meta: {
        size: 'auto',
      },
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  const data2: any[] = [
    {
      name1: '자동 등록',
      name2: '회사명',
      name3: '소속팀',
      name4: '조직원',
      name5: '1234567',
      name6: '김현대',
      name7: '재직',
      name8: '정상',
    },
    {
      name1: '자동 등록',
      name2: '회사명',
      name3: '소속팀',
      name4: '조직원',
      name5: '1234567',
      name6: '김현대',
      name7: '재직',
      name8: '정상',
    },
    {
      name1: '자동 등록',
      name2: '회사명',
      name3: '소속팀',
      name4: '조직원',
      name5: '1234567',
      name6: '김현대',
      name7: '재직',
      name8: '정상',
    },
    {
      name1: '자동 등록',
      name2: '회사명',
      name3: '소속팀',
      name4: '조직원',
      name5: '1234567',
      name6: '김현대',
      name7: '재직',
      name8: '정상',
    },
    {
      name1: '자동 등록',
      name2: '회사명',
      name3: '소속팀',
      name4: '조직원',
      name5: '1234567',
      name6: '김현대',
      name7: '재직',
      name8: '정상',
    },
    {
      name1: '자동 등록',
      name2: '회사명',
      name3: '소속팀',
      name4: '조직원',
      name5: '1234567',
      name6: '김현대',
      name7: '재직',
      name8: '정상',
    },
    {
      name1: '자동 등록',
      name2: '회사명',
      name3: '소속팀',
      name4: '조직원',
      name5: '1234567',
      name6: '김현대',
      name7: '재직',
      name8: '정상',
    },
    {
      name1: '자동 등록',
      name2: '회사명',
      name3: '소속팀',
      name4: '조직원',
      name5: '1234567',
      name6: '김현대',
      name7: '재직',
      name8: '정상',
    },
    {
      name1: '자동 등록',
      name2: '회사명',
      name3: '소속팀',
      name4: '조직원',
      name5: '1234567',
      name6: '김현대',
      name7: '재직',
      name8: '정상',
    },
    {
      name1: '자동 등록',
      name2: '회사명',
      name3: '소속팀',
      name4: '조직원',
      name5: '1234567',
      name6: '김현대',
      name7: '재직',
      name8: '정상',
    },
  ];
  const columns2 = [
    columnHelper.accessor('name1', {
      cell: (info) => info.getValue(),
      header: '유저 등록 유형',
      meta: {
        size: 'auto',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name2', {
      cell: (info) => info.getValue(),
      header: '회사',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name3', {
      cell: (info) => info.getValue(),
      header: '소속',
      meta: {
        size: 'auto',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name4', {
      cell: (info) => info.getValue(),
      header: '학습자 역할',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name5', {
      cell: (info) => info.getValue(),
      header: '사번',
      meta: {
        size: 'auto',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name6', {
      cell: (info) => info.getValue(),
      header: '이름',
      meta: {
        size: 'auto',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name7', {
      cell: (info) => info.getValue(),
      header: '재직여부',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name8', {
      cell: (info) => info.getValue(),
      header: '계정상태',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];
  const tabsItems = [
    {
      title: '조직',
      key: 'tab01',
      content: (
        <>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select1" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직 등록 유형</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues}
                          onChange={(selected) => setSelectedValues(selected)}
                          variant="default"
                          size={'sm'}
                          presetOptionLabel={'전체'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select2" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} value={''} />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select3" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직장 이름</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id={'name-select3'} type={'text'} placeholder={'입력'} value={''} />
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
                <Button
                  type="button"
                  variant="search"
                  size="sm"
                  className={searchStyles.btn_search}
                >
                  <IcoSearch className={searchStyles.icon_sm_search} />
                  조회
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <GridBox
            data={data}
            columns={columns}
            multiple
            pagination={{
              pageSize,
              pageNumber,
              totalPages: 100,
              onPageChange: setPageIndex,
              onPageSizeChange: setPageSize,
            }}
            title="조직 목록"
          />
        </>
      ),
    },
    {
      title: '유저',
      key: 'tab02',
      content: (
        <>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select1" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직 등록 유형</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues}
                          onChange={(selected) => setSelectedValues(selected)}
                          variant="default"
                          size={'sm'}
                          presetOptionLabel={'전체'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select2" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} value={''} />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select3" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직장 이름</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id={'name-select3'} type={'text'} placeholder={'입력'} value={''} />
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
                <Button
                  type="button"
                  variant="search"
                  size="sm"
                  className={searchStyles.btn_search}
                >
                  <IcoSearch className={searchStyles.icon_sm_search} />
                  조회
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <GridBox
            data={data2}
            columns={columns2}
            multiple
            pagination={{
              pageSize,
              pageNumber,
              totalPages: 100,
              onPageChange: setPageIndex,
              onPageSizeChange: setPageSize,
            }}
            title="조직 목록"
          />
        </>
      ),
    },
  ];
  return (
    <SectionLayout contentsRatio={'forty'}>
      <TreeContainer>
        <TreeBox data={sampleData} treeId={'menu-tree'} title={'조직-원본'} />
      </TreeContainer>
      <div>
        <FormSubTitle
          label={'조직 대상자'}
          titleNode={<p>{'현대자동차 > 경영지원본부'}</p>}
          lineType={'dark'}
        />
        <Tabs items={tabsItems} type="round" selectedTabKey={'tab01'} size={'sm'} />
      </div>
    </SectionLayout>
  );
};

CompanyGroupConfirmComponent.displayName = 'CompanyGroupConfirm';
export const CompanyGroupConfirm = CompanyGroupConfirmComponent;
