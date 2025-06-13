import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Input, Dropdown, Button, GridBox, Divider } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch, IcoFormRequired, IcoStar } from '@learnway/icons';
import { cn } from '@learnway/shared';

/** style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

export const Route = createFileRoute('/_layout/lms/procedure-management')({
  component: RouteComponent,
});

function RouteComponent() {
  // dropdown
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const [selectedValues3, setSelectedValues3] = useState<string[]>([]);
  const [selectedValues4, setSelectedValues4] = useState<string[]>([]);
  const [selectedValues5, setSelectedValues5] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  // grid
  const [pageNumber, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      title1: '현대차',
      title2: '인재원채널',
      title3: '111116',
      title4: '2025',
      title5: '이러닝 II',
      title6: (
        <Button
          onlyIcon
          icon={<IcoStar width={16} height={16} stroke="#FFB902" fill="#FFB902" />}
        />
      ),
      title7: (
        <Button className="link" label={'(사본)법정교육 성희롱 방지법정교육 성희롱 방지법정교'} />
      ),
      title8: '사용',
      title9: '10',
      title10: '10000',
      title11: '10',
      title12: '10',
      title13: '1000',
      title14: '100',
      title15: '홍길동',
      title16: '김현대',
      title17: <Button className="link" label={'미리보기'} />,
      title18: <Button variant={'gray'} label={'URL 생성'} />,
    },
    {
      title1: '현대차',
      title2: '인재원채널',
      title3: '111116',
      title4: '2025',
      title5: '이러닝 II',
      title6: (
        <Button onlyIcon icon={<IcoStar width={16} height={16} stroke="#A9AFB8" fill="none" />} />
      ),
      title7: (
        <Button className="link" label={'(사본)법정교육 성희롱 방지법정교육 성희롱 방지법정교'} />
      ),
      title8: '사용',
      title9: '10',
      title10: '10',
      title11: '10',
      title12: '10',
      title13: '10',
      title14: '10',
      title15: '홍길동',
      title16: '김현대',
      title17: <Button className="link" label={'미리보기'} />,
      title18: <Button variant={'gray'} label={'URL 생성'} />,
    },
    {
      title1: '현대차',
      title2: '인재원채널',
      title3: '111116',
      title4: '2025',
      title5: '이러닝 II',
      title6: (
        <Button
          onlyIcon
          icon={<IcoStar width={16} height={16} stroke="#FFB902" fill="#FFB902" />}
        />
      ),
      title7: (
        <Button className="link" label={'(사본)법정교육 성희롱 방지법정교육 성희롱 방지법정교'} />
      ),
      title8: '사용',
      title9: '10',
      title10: '10',
      title11: '10',
      title12: '10',
      title13: '10',
      title14: '10',
      title15: '홍길동',
      title16: '김현대',
      title17: <Button className="link" label={'미리보기'} />,
      title18: <Button variant={'gray'} label={'URL 생성'} />,
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '테넌트',
      enableGrouping: false,
      size: 90,
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '채널',
      enableGrouping: false,
      size: 90,
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '과정코드',
      enableGrouping: false,
      size: 90,
      meta: {
        cellAlign: 'right',
      },
    }),
    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '개설연도',
      enableGrouping: false,
      size: 90,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '과정유형',
      enableGrouping: false,
      size: 90,
    }),
    columnHelper.accessor('title6', {
      cell: (info) => info.getValue(),
      header: '찜',
      enableGrouping: false,
      size: 40,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title7', {
      cell: (info) => info.getValue(),
      header: '과정명',
      enableGrouping: false,
      size: 324,
    }),
    columnHelper.accessor('title8', {
      cell: (info) => info.getValue(),
      header: '사용',
      enableGrouping: false,
      size: 60,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title9', {
      cell: (info) => info.getValue(),
      header: '차수',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'right',
      },
    }),
    columnHelper.accessor('title10', {
      cell: (info) => info.getValue(),
      header: '조회',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'right',
      },
    }),
    columnHelper.accessor('title11', {
      cell: (info) => info.getValue(),
      header: '좋아요',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'right',
      },
    }),
    columnHelper.accessor('title12', {
      cell: (info) => info.getValue(),
      header: '공유',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'right',
      },
    }),
    columnHelper.accessor('title13', {
      cell: (info) => info.getValue(),
      header: '후기',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'right',
      },
    }),
    columnHelper.accessor('title14', {
      cell: (info) => info.getValue(),
      header: '수강생',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'right',
      },
    }),
    columnHelper.accessor('title15', {
      cell: (info) => info.getValue(),
      header: '담당자',
      enableGrouping: false,
      size: 80,
    }),
    columnHelper.accessor('title16', {
      cell: (info) => info.getValue(),
      header: '운영자',
      enableGrouping: false,
      size: 80,
    }),
    columnHelper.accessor('title17', {
      cell: (info) => info.getValue(),
      header: '미리보기',
      enableGrouping: false,
      size: 72,
    }),
    columnHelper.accessor('title18', {
      cell: (info) => info.getValue(),
      header: 'URL',
      enableGrouping: false,
      size: 80,
      meta: {
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <PageContainer>
      {/* main_contents */}
      <div className={styles.main_contents}>
        {/* search box */}
        <div className={cn(searchStyles.start, searchStyles.wrap)}>
          <div className={searchStyles.contents}>
            <div className={searchStyles.item_row}>
              <div className={searchStyles.item_wrap}>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-select1" className={searchStyles.label}>
                      <span className={searchStyles.text}>테넌트</span>
                      {/* 필수 케이스 */}
                      <span className={cn(searchStyles.status, searchStyles.required)}>
                        <IcoFormRequired width={8} height={8} />
                      </span>
                    </label>
                    <div className={searchStyles.box}>
                      <Dropdown
                        options={options}
                        value={selectedValues}
                        onChange={(selected) => setSelectedValues(selected)}
                        variant="default"
                        size={'sm'}
                      />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-select2" className={searchStyles.label}>
                      <span className={searchStyles.text}>채널</span>
                      {/* 필수 케이스 */}
                      <span className={cn(searchStyles.status, searchStyles.required)}>
                        <IcoFormRequired width={8} height={8} />
                      </span>
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
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-select3" className={searchStyles.label}>
                      <span className={searchStyles.text}>개설연도</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Dropdown
                        options={options}
                        value={selectedValues3}
                        onChange={(selected) => setSelectedValues3(selected)}
                        variant="default"
                        size={'sm'}
                      />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-select4" className={searchStyles.label}>
                      <span className={searchStyles.text}>과정유형</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Dropdown
                        options={options}
                        value={selectedValues4}
                        onChange={(selected) => setSelectedValues4(selected)}
                        variant="default"
                        size={'sm'}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={searchStyles.item_wrap}>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-select5" className={searchStyles.label}>
                      <span className={searchStyles.text}>사용여부</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Dropdown
                        options={options}
                        value={selectedValues5}
                        onChange={(selected) => setSelectedValues5(selected)}
                        variant="default"
                        size={'sm'}
                      />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-select6" className={searchStyles.label}>
                      <span className={searchStyles.text}>담당자/운영자</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Input id={'name-select6'} type={'text'} placeholder={'입력'} value={''} />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-select7" className={searchStyles.label}>
                      <span className={searchStyles.text}>과정코드</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Input id={'name-select7'} type={'text'} placeholder={'입력'} value={''} />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-select8" className={searchStyles.label}>
                      <span className={searchStyles.text}>과정명</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Input id={'name-select8'} type={'text'} placeholder={'입력'} value={''} />
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
        <Divider />
        <GridBox
          data={data}
          columns={columns}
          multiple={true}
          showNumberingColumn={true}
          showSelectedCount={true}
          pagination={{
            pageSize,
            pageNumber,
            totalPages: 100,
            onPageChange: setPageIndex,
            onPageSizeChange: setPageSize,
          }}
          title={'과정 목록'}
        />
      </div>
    </PageContainer>
  );
}
