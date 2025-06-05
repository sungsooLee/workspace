import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Button, Input, GridBox, Dropdown, DatePicker } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';

/** style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css';

export const Route = createFileRoute('/_layout/pms/terms_management')({
  component: RouteComponent,
});

function RouteComponent() {
  // dropdown
  const [selectedValues, setSelectedValues] = useState<null>(null);
  const [selectedValues2, setSelectedValues2] = useState<null>(null);
  const [selectedValues3, setSelectedValues3] = useState<null>(null);
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
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
    {
      code: 'A1000001',
      name: '국내용 약관',
      tenant: '테넌트1 외 2',
      type: '이용약관',
      termsName: <Button className="link" label={'서비스 이용'} />,
      version: '2025-01-02 v1.0',
      firstDate: '2025-01-02',
      essential: '필수',
      status: '게재',
      changeTerms: '재동의',
      lastChangeDate: '2025-01-02',
      register: '김현대',
      registrationDate: '2025-01-02',
      modifier: '김현대',
      modificationDate: '2025-01-02',
    },
  ];

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('code', {
      cell: (info) => info.getValue(),
      header: '매핑 코드',
      size: 96,
      enableGrouping: false,
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: '매장명',
      size: 96,
      enableGrouping: false,
    }),
    columnHelper.accessor('tenant', {
      cell: (info) => info.getValue(),
      header: '테넌트',
      enableGrouping: false,
      size: 96,
    }),
    columnHelper.accessor('type', {
      cell: (info) => info.getValue(),
      header: '약관 유형',
      size: 96,
      enableGrouping: false,
    }),
    columnHelper.accessor('termsName', {
      cell: (info) => info.getValue(),
      header: '약관명',
      size: 96,
      enableGrouping: false,
    }),

    columnHelper.accessor('version', {
      cell: (info) => info.getValue(),
      header: '버전',
      size: 96,
      enableGrouping: false,
    }),
    columnHelper.accessor('firstDate', {
      cell: (info) => info.getValue(),
      header: '최초 게재일',
      enableGrouping: false,
      size: 96,
    }),
    columnHelper.accessor('essential', {
      cell: (info) => info.getValue(),
      header: '필수 동의 여부',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
      header: '상태',
      enableGrouping: false,
      size: 96,
    }),
    columnHelper.accessor('changeTerms', {
      cell: (info) => info.getValue(),
      header: '변경 약관 동의 여부',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('lastChangeDate', {
      cell: (info) => info.getValue(),
      header: '최종 변경 게재일',
      enableGrouping: false,
      size: 96,
    }),
    columnHelper.accessor('register', {
      cell: (info) => info.getValue(),
      header: '등록자',
      enableGrouping: false,
      size: 96,
    }),
    columnHelper.accessor('registrationDate', {
      cell: (info) => info.getValue(),
      header: '등록일',
      enableGrouping: false,
      size: 96,
    }),
    columnHelper.accessor('modifier', {
      cell: (info) => info.getValue(),
      header: '수정자',
      enableGrouping: false,
      size: 96,
    }),
    columnHelper.accessor('modificationDate', {
      cell: (info) => info.getValue(),
      header: '수정일',
      enableGrouping: false,
      size: 96,
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <PageContainer>
      {/* main_contents */}
      <div className={cn(styles.main_contents)}>
        <div className={cn(searchStyles.start, searchStyles.wrap)}>
          <div className={searchStyles.contents}>
            <div className={searchStyles.item_row}>
              <div className={searchStyles.item_wrap}>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-1" className={searchStyles.label}>
                      <span className={searchStyles.text}>매핑 코드</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Input id={'name-1'} type={'text'} placeholder={'입력'} value={''} />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-2" className={searchStyles.label}>
                      <span className={searchStyles.text}>매핑명</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Input id={'name-2'} type={'text'} placeholder={'입력'} value={''} />
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-3" className={searchStyles.label}>
                      <span className={searchStyles.text}>약관 유형</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Dropdown
                        options={options}
                        value={selectedValues}
                        onChange={(selected) => setSelectedValues(selected)}
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
                      <span className={searchStyles.text}>약관명</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Input id={'name-4'} type={'text'} placeholder={'입력'} value={''} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={searchStyles.item_wrap}>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-5" className={searchStyles.label}>
                      <span className={searchStyles.text}>상태</span>
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
                    <label htmlFor="name-6" className={searchStyles.label}>
                      <span className={searchStyles.text}>변경 약관 동의 여부</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Dropdown
                        options={options}
                        value={selectedValues3}
                        onChange={(selected) => setSelectedValues3(selected)}
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
                      <span className={searchStyles.text}>등록 기간</span>
                    </label>
                    <div className={searchStyles.box}>
                      <div className={searchStyles.datepicker_wrap}>
                        <DatePicker displayType={'day'} size={'md'} placeholder={'0000-00-00'} />
                        <span className={searchStyles.hyphen}>-</span>
                        <DatePicker displayType={'day'} size={'md'} placeholder={'0000-00-00'} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.inner}>
                  <div className={searchStyles.item}>
                    <label htmlFor="name-8" className={searchStyles.label}>
                      <span className={searchStyles.text}>수령 기간</span>
                    </label>
                    <div className={searchStyles.box}>
                      <div className={searchStyles.datepicker_wrap}>
                        <DatePicker displayType={'day'} size={'md'} placeholder={'0000-00-00'} />
                        <span className={searchStyles.hyphen}>-</span>
                        <DatePicker displayType={'day'} size={'md'} placeholder={'0000-00-00'} />
                      </div>
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
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
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
              title={'약관 목록'}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
