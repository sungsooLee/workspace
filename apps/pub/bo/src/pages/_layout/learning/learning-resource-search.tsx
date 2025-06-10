import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import {
  IcoRefresh02,
  IcoSearch,
  IcoClipboard,
  IcoClock01,
  IcoFormRequired,
  IcoDownload,
  IcoCopy,
} from '@learnway/icons';
import { Button, Input, GridBox, Dropdown, Checkbox, Divider } from '@learnway/ui';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

export const Route = createFileRoute('/_layout/learning/learning-resource-search')({
  component: RouteComponent,
});

function RouteComponent() {
  // grid
  const [pageNumber, setpageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      type: '동영상',
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
      type: '동영상',
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

  // dropdown
  const [selectedValues, setSelectedValues] = useState<null>(null);
  const [selectedValues2, setSelectedValues2] = useState<null>(null);
  const [selectedValues3, setSelectedValues3] = useState<null>(null);
  const [selectedValues4, setSelectedValues4] = useState<null>(null);
  const [selectedValues5, setSelectedValues5] = useState<null>(null);
  const [selectedValues6, setSelectedValues6] = useState<null>(null);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
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
                          placeholder="선택"
                          size={'sm'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-2" className={searchStyles.label}>
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
                          placeholder="선택"
                          size={'sm'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-3" className={searchStyles.label}>
                        <span className={searchStyles.text}>유형</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues3}
                          onChange={(selected) => setSelectedValues3(selected)}
                          variant={'text'}
                          placeholder="선택"
                          size={'sm'}
                          isMulti
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-4" className={searchStyles.label}>
                        <span className={searchStyles.text}>학습자원명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} id={'name-4'} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-5" className={searchStyles.label}>
                        <span className={searchStyles.text}>외주여부</span>
                        {/* 필수 케이스 */}
                        <span className={cn(searchStyles.status, searchStyles.required)}>
                          <IcoFormRequired width={8} height={8} />
                        </span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues4}
                          onChange={(selected) => setSelectedValues4(selected)}
                          variant="default"
                          placeholder="선택"
                          size={'sm'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-6" className={searchStyles.label}>
                        <span className={searchStyles.text}>사용가능</span>
                        {/* 필수 케이스 */}
                        <span className={cn(searchStyles.status, searchStyles.required)}>
                          <IcoFormRequired width={8} height={8} />
                        </span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues5}
                          onChange={(selected) => setSelectedValues5(selected)}
                          variant="default"
                          placeholder="선택"
                          size={'sm'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-7" className={searchStyles.label}>
                        <span className={searchStyles.text}>교육활용</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues6}
                          onChange={(selected) => setSelectedValues6(selected)}
                          variant="default"
                          placeholder="선택"
                          size={'sm'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-8" className={searchStyles.label}>
                        <span className={searchStyles.text}>담당자</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} id={'name-8'} />
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
            showColumnSettings={false}
            showNumberingColumn
            showExcelDownload
            columnPinning={{ columns: ['type', 'name'] }}
            pagination={{
              pageSize,
              pageNumber,
              totalPages: 100,
              onPageChange: setpageNumber,
              onPageSizeChange: setPageSize,
            }}
            title="목록"
            customButtonNode={
              <>
                <Checkbox label={'나의 학습자원'} size={'md'} />
                <Button
                  label={'프로그램/가이드 다운로드'}
                  icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
                />
                <Button label={'일괄설정'} variant={'text'} />
                <Button
                  label={'복사'}
                  icon={<IcoCopy width={16} height={16} stroke={'#131c30'} />}
                />
              </>
            }
          />
        </div>
      </PageContainer>
    </form>
  );
}
