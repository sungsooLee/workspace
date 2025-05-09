import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch, IcoClipboard, IcoClock01 } from '@learnway/icons';
import { Button, Input, GridBox } from '@learnway/ui';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

export const Route = createFileRoute('/_layout/learning/learning-resource-search')({
  component: RouteComponent,
});

function RouteComponent() {
  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      type: '동영상    ',
      name: (
        // <Link to={'/'} className="link">
        //   학습자원명
        // </Link>
        <Button className="link" label={'학습자원명'} />
      ),
      tenant: '테넌트',
      channel: '채널',
      owner: '김현대',
      detailInfo: (
        <span className="icon_wrap">
          <IcoClock01 width={'16'} height={'16'} stroke={'#4c515e'} />
          {'02:00:00'}
        </span>
      ),
      function: (
        <>
          <Link to={'/'} className="link">
            미리보기
          </Link>
          <Link to={'/'} className="link">
            문항관리
          </Link>
        </>
      ),
      education: 'Y',
      course: (
        <Link to={'/'} className="link">
          2
        </Link>
      ),
    },
    {
      type: '동영상    ',
      name: (
        // <Link to={'/'} className="link">
        //   학습자원명
        // </Link>
        <Button className="link" label={'학습자원명'} />
      ),
      tenant: '테넌트',
      channel: '채널',
      owner: '김현대',
      detailInfo: (
        <span className="icon_wrap">
          <IcoClipboard width={'16'} height={'16'} />
          {'20개'}
        </span>
      ),
      function: (
        <>
          <Link to={'/'} className="link">
            미리보기
          </Link>
          <Link to={'/'} className="link">
            문항관리
          </Link>
        </>
      ),
      education: 'Y',
      course: (
        <Link to={'/'} className="link">
          2
        </Link>
      ),
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('type', {
      cell: (info) => info.getValue(),
      header: '구분',
      size: 60,
      enableGrouping: false,
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: '학습자원명',
      size: 380,
      enableGrouping: false,
    }),
    columnHelper.accessor('tenant', {
      cell: (info) => info.getValue(),
      header: '테넌트',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('channel', {
      cell: (info) => info.getValue(),
      header: '채널',
      size: 180,
      enableGrouping: false,
    }),

    columnHelper.accessor('owner', {
      cell: (info) => info.getValue(),
      header: '담당자',
      size: 104,
      enableGrouping: false,
    }),
    columnHelper.accessor('detailInfo', {
      cell: (info) => info.getValue(),
      header: '세부정보',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('function', {
      cell: (info) => info.getValue(),
      header: '기능',
      enableGrouping: false,
      size: 150,
    }),
    columnHelper.accessor('education', {
      cell: (info) => info.getValue(),
      header: '교육활용',
      size: 104,
      enableGrouping: false,
    }),
    columnHelper.accessor('course', {
      cell: (info) => info.getValue(),
      header: '과정수',
      enableGrouping: false,
      size: 104,
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-1" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} id={'name-1'} />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-2" className={searchStyles.label}>
                        <span className={searchStyles.text}>접수ID</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} id={'name-2'} />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-3" className={searchStyles.label}>
                        <span className={searchStyles.text}>신청자</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} id={'name-3'} />
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
          <div className={cn(boxStyles.start, boxStyles.inner)}>
            <div className="grid_wrap">
              <GridBox
                data={data}
                columns={columns}
                height={440}
                showColumnSettings={false}
                showNumberingColumn
                columnPinning={{ columns: ['numbering', 'type', 'name'] }}
                pagination={{
                  pageSize,
                  pageIndex,
                  totalRows: 100,
                  onPageChange: setPageIndex,
                  onPageSizeChange: setPageSize,
                }}
                title="접수 목록"
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
