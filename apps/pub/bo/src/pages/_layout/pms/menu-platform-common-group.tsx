/* eslint-disable @nx/enforce-module-boundaries */
import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { ContentsHistoryInfoFormField } from '../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import titleStyles from './title.module.css'; // 타이틀 css
import { cn } from '@learnway/shared';
import { IcoFormRequired } from '@learnway/icons';

import {
  Button,
  GridBox,
  DatePicker,
  Switch,
  // ThumbnailImageUpload,
  // ChipList,
  // SelectOption,
  Input,
  Dropdown,
  ContentsRow,
} from '@learnway/ui';

export const Route = createFileRoute('/_layout/pms/menu-platform-common-group')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  // switch
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false, // 사용여부
  });
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      order: '1',
      groupCode: '7000',
      groupCodeName: '그룹코드명',
      groupCodeNameEng: 'Cell Text',
      useable: 'N',
      contents: '예시코드',
      commonCode: <Button className="link">코드관리</Button>,
      registerDate: '2025-01-01 07:12',
      lastRegister: '김현대',
      lastModificationDate: '2025-01-01 07:12',
      lastModifier: '김현대',
    },
    {
      order: '2',
      groupCode: '7000',
      groupCodeName: '그룹코드명',
      groupCodeNameEng: 'Cell Text',
      useable: 'Y',
      contents: '예시코드',
      commonCode: <Button className="link">코드관리</Button>,
      registerDate: '2025-01-01 07:12',
      lastRegister: '김현대',
      lastModificationDate: '2025-01-01 07:12',
      lastModifier: '김현대',
    },
    {
      order: '3',
      groupCode: '7000',
      groupCodeName: '그룹코드명',
      groupCodeNameEng: 'Cell Text',
      useable: 'Y',
      contents: '예시코드',
      commonCode: <Button className="link">코드관리</Button>,
      registerDate: '2025-01-01 07:12',
      lastRegister: '김현대',
      lastModificationDate: '2025-01-01 07:12',
      lastModifier: '김현대',
    },
    {
      order: '4',
      groupCode: '7000',
      groupCodeName: '그룹코드명',
      groupCodeNameEng: 'Cell Text',
      useable: 'Y',
      contents: '예시코드',
      commonCode: <Button className="link">코드관리</Button>,
      registerDate: '2025-01-01 07:12',
      lastRegister: '김현대',
      lastModificationDate: '2025-01-01 07:12',
      lastModifier: '김현대',
    },
    {
      order: '5',
      groupCode: '7000',
      groupCodeName: '그룹코드명',
      groupCodeNameEng: 'Cell Text',
      useable: 'Y',
      contents: '예시코드',
      commonCode: <Button className="link">코드관리</Button>,
      registerDate: '2025-01-01 07:12',
      lastRegister: '김현대',
      lastModificationDate: '2025-01-01 07:12',
      lastModifier: '김현대',
    },
    {
      order: '6',
      groupCode: '7000',
      groupCodeName: '그룹코드명',
      groupCodeNameEng: 'Cell Text',
      useable: 'Y',
      contents: '예시코드',
      commonCode: <Button className="link">코드관리</Button>,
      registerDate: '2025-01-01 07:12',
      lastRegister: '김현대',
      lastModificationDate: '2025-01-01 07:12',
      lastModifier: '김현대',
    },
    {
      order: '7',
      groupCode: '7000',
      groupCodeName: '그룹코드명',
      groupCodeNameEng: 'Cell Text',
      useable: 'Y',
      contents: '예시코드',
      commonCode: <Button className="link">코드관리</Button>,
      registerDate: '2025-01-01 07:12',
      lastRegister: '김현대',
      lastModificationDate: '2025-01-01 07:12',
      lastModifier: '김현대',
    },
    {
      order: '8',
      groupCode: '7000',
      groupCodeName: '그룹코드명',
      groupCodeNameEng: 'Cell Text',
      useable: 'Y',
      contents: '예시코드',
      commonCode: <Button className="link">코드관리</Button>,
      registerDate: '2025-01-01 07:12',
      lastRegister: '김현대',
      lastModificationDate: '2025-01-01 07:12',
      lastModifier: '김현대',
    },
    {
      order: '9',
      groupCode: '7000',
      groupCodeName: '그룹코드명',
      groupCodeNameEng: 'Cell Text',
      useable: 'Y',
      contents: '예시코드',
      commonCode: <Button className="link">코드관리</Button>,
      registerDate: '2025-01-01 07:12',
      lastRegister: '김현대',
      lastModificationDate: '2025-01-01 07:12',
      lastModifier: '김현대',
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('order', {
      cell: (info) => info.getValue(),
      header: 'NO.',
      size: 64,
      meta: {
        headerAlign: 'left',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('groupCode', {
      cell: (info) => info.getValue(),
      header: '그룹코드',
      enableGrouping: false,
      size: 88,
    }),
    columnHelper.accessor('groupCodeName', {
      cell: (info) => info.getValue(),
      header: '그룹코드 명',
      size: 160,
      enableGrouping: false,
    }),
    columnHelper.accessor('groupCodeNameEng', {
      cell: (info) => info.getValue(),
      header: '그룹코드 약어영문',
      size: 190,
      enableGrouping: false,
    }),
    columnHelper.accessor('useable', {
      cell: (info) => info.getValue(),
      header: '사용',
      size: 50,
      enableGrouping: false,
    }),
    columnHelper.accessor('contents', {
      cell: (info) => info.getValue(),
      header: '내용',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('commonCode', {
      cell: (info) => info.getValue(),
      header: '공통코드',
      size: 104,
      enableGrouping: false,
    }),
    columnHelper.accessor('registerDate', {
      cell: (info) => info.getValue(),
      header: '최초등록 일자',
      enableGrouping: false,
      size: 130,
    }),
    columnHelper.accessor('lastRegister', {
      cell: (info) => info.getValue(),
      header: '최종등록자',
      enableGrouping: false,
      size: 85,
    }),
    columnHelper.accessor('lastModificationDate', {
      cell: (info) => info.getValue(),
      header: '최종수정일',
      enableGrouping: false,
      size: 130,
    }),
    columnHelper.accessor('lastModifier', {
      cell: (info) => info.getValue(),
      header: '최종수정자',
      enableGrouping: false,
      size: 75,
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <form className="form_row">
      <PageContainer scrollHidden={true}>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-codeGroupNum" className={searchStyles.label}>
                        <span className={searchStyles.text}>코드그룹 Key</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-codeGroupNum" type="text" placeholder="입력" />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-codeGroupName" className={searchStyles.label}>
                        <span className={searchStyles.text}>코드그룹명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-codeGroupName" type="text" placeholder="입력" />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-use" className={searchStyles.label}>
                        <span className={searchStyles.text}>사용</span>
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
                      <label htmlFor="name-codeName" className={searchStyles.label}>
                        <span className={searchStyles.text}>코드명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-codeName" type="text" placeholder="입력" />
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
            <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.ratio_third)}>
              <div className={cn(layoutStyles.inner, layoutStyles.scrollHidden)}>
                <div className={layoutStyles.inner_contents}>
                  <GridBox
                    data={data}
                    columns={columns}
                    height={350}
                    hideColumnSettings={true}
                    pagination={{
                      pageSize,
                      pageIndex,
                      totalRows: 100,
                      onPageChange: setPageIndex,
                      onPageSizeChange: setPageSize,
                    }}
                    title="공통코드그룹목록"
                  />
                </div>
              </div>
              <div className={layoutStyles.inner}>
                <form className="form">
                  <div className={titleStyles.title_wrap}>
                    <h3 className={titleStyles.title}>{'상세정보'}</h3>
                    <div className={layoutStyles.btn_wrap}>
                      <Button variant="text" size="sm" className={layoutStyles.btn_text}>
                        {'추가'}
                      </Button>
                      <Button variant="save" size="sm">
                        {'저장'}
                      </Button>
                    </div>
                  </div>
                  <div className={layoutStyles.inner_contents}>
                    <ContentsRow>
                      {/* form_item */}
                      <div className={formStyles.form_item}>
                        <label htmlFor="name-codeKey" className={formStyles.form_label}>
                          <span className={formStyles.form_text}>{'코드그룹 Key'}</span>
                          {/* 필수 케이스 */}
                          <span
                            className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}
                          >
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={formStyles.input_box}>
                          <Input
                            id="name-codeKey"
                            type="text"
                            placeholder="입력"
                            value="등록 정보 출력(자동채번)"
                            readOnly
                            className={formStyles.input}
                          />
                        </div>
                      </div>
                    </ContentsRow>
                    <ContentsRow>
                      {/* form_item */}
                      <div className={formStyles.form_item}>
                        <label htmlFor="name-codeName" className={formStyles.form_label}>
                          <span className={formStyles.form_text}>{'코드그룹 명'}</span>
                          {/* 필수 케이스 */}
                          <span
                            className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}
                          >
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={formStyles.input_box}>
                          <Input
                            id="name-codeName"
                            type="text"
                            placeholder="입력"
                            value="등록 정보 출력"
                            readOnly
                            className={formStyles.input}
                          />
                        </div>
                      </div>
                    </ContentsRow>
                    <ContentsRow>
                      {/* form_item */}
                      <div className={formStyles.form_item}>
                        <label htmlFor="name-codeAbbEng" className={formStyles.form_label}>
                          <span className={formStyles.form_text}>{'코드그룹 약어영문'}</span>
                          {/* 필수 케이스 */}
                          <span
                            className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}
                          >
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={formStyles.input_box}>
                          <Input
                            id="name-codeAbbEng"
                            type="text"
                            placeholder="입력"
                            value="Country Code"
                            className={formStyles.input}
                          />
                        </div>
                      </div>
                    </ContentsRow>
                    <ContentsRow>
                      {/* form_item */}
                      <div className={formStyles.form_item}>
                        <label htmlFor="name-codeAbbEng" className={formStyles.form_label}>
                          <span className={formStyles.form_text}>{'내용'}</span>
                        </label>
                        <div className={formStyles.input_box}>
                          <Input
                            id="name-codeAbbEng"
                            type="text"
                            placeholder="입력"
                            value="국가 코드 그룹"
                            className={formStyles.input}
                          />
                        </div>
                      </div>
                    </ContentsRow>
                    <ContentsRow>
                      <div className={dynamicFormStyles.switch_wrap}>
                        <p className={dynamicFormStyles.title}>
                          {'사용'}
                          {/* 필수 케이스 */}
                          <span
                            className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}
                          >
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </p>
                        <Switch
                          id="name-useabled"
                          className={dynamicFormStyles.btn_switch}
                          label={checked[1] ? '사용' : '미사용'}
                          checked={checked[1]}
                          onCheckedChange={handleCheckedChange(1)}
                        />
                      </div>
                    </ContentsRow>
                    <ContentsRow>
                      {/* form_item */}
                      <div className={formStyles.form_item}>
                        <label htmlFor="name-Date" className={formStyles.form_label}>
                          <span className={formStyles.form_text}>{'적용일시'}</span>
                        </label>
                        <div className={formStyles.input_box}>
                          <DatePicker displayType={'day-time'} size={'md'} />
                        </div>
                      </div>
                    </ContentsRow>
                    <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
                      <ContentsHistoryInfoFormField type={'column'} />
                    </ContentsRow>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
