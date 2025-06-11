/* eslint-disable @nx/enforce-module-boundaries */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import {
  Input,
  Dropdown,
  Button,
  GridBox,
  Divider,
  DatePicker,
  ChipListModalSelectorFormField,
  useModal,
  ModalTitle,
  ModalContainer,
  ModalBody,
  ModalFooter,
} from '@learnway/ui';
import { IcoRefresh02, IcoSearch, IcoArrowDownDouble, IcoDownload } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

export const Route = createFileRoute('/_layout/language/language_history_list')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  const columnHelper = createColumnHelper<any>();

  const data: any[] = [
    {
      title1: '기아',
      title2: '인재개발팀',
      title3: '5648952',
      title4: '김현대',
      title5: '매니저(G2)',
      title6: '매니저(G2)',
      title7: '중국어',
      title8: <Button className="link" label={'HK-SPA'} />,
      title9: '999',
      title10: '1',
      title11: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title12: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title13: '2025-01-01',
      title14: '조직장 승인완료',
      title15: '진행중',
      title16: '2025-07',
    },
    {
      title1: '기아',
      title2: '인재개발팀',
      title3: '5648952',
      title4: '김현대',
      title5: '매니저(G2)',
      title6: '매니저(G2)',
      title7: '중국어',
      title8: <Button className="link" label={'HK-SPA'} />,
      title9: '999',
      title10: '1',
      title11: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
          disabled
        />
      ),
      title12: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title13: '2025-01-01',
      title14: '조직장 승인완료',
      title15: '진행중',
      title16: '2025-07',
    },
    {
      title1: '기아',
      title2: '인재개발팀',
      title3: '5648952',
      title4: '김현대',
      title5: '매니저(G2)',
      title6: '매니저(G2)',
      title7: '중국어',
      title8: <Button className="link" label={'HK-SPA'} />,
      title9: '999',
      title10: '1',
      title11: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title12: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title13: '2025-01-01',
      title14: '조직장 승인완료',
      title15: '진행중',
      title16: '2025-07',
    },
    {
      title1: '기아',
      title2: '인재개발팀',
      title3: '5648952',
      title4: '김현대',
      title5: '매니저(G2)',
      title6: '매니저(G2)',
      title7: '중국어',
      title8: <Button className="link" label={'HK-SPA'} />,
      title9: '999',
      title10: '1',
      title11: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title12: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title13: '2025-01-01',
      title14: '조직장 승인완료',
      title15: '진행중',
      title16: '2025-07',
    },
    {
      title1: '기아',
      title2: '인재개발팀',
      title3: '5648952',
      title4: '김현대',
      title5: '매니저(G2)',
      title6: '매니저(G2)',
      title7: '중국어',
      title8: <Button className="link" label={'HK-SPA'} />,
      title9: '999',
      title10: '1',
      title11: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title12: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title13: '2025-01-01',
      title14: '조직장 승인완료',
      title15: '진행중',
      title16: '2025-07',
    },
    {
      title1: '기아',
      title2: '인재개발팀',
      title3: '5648952',
      title4: '김현대',
      title5: '매니저(G2)',
      title6: '매니저(G2)',
      title7: '중국어',
      title8: <Button className="link" label={'HK-SPA'} />,
      title9: '999',
      title10: '1',
      title11: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title12: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title13: '2025-01-01',
      title14: '조직장 승인완료',
      title15: '진행중',
      title16: '2025-07',
    },
    {
      title1: '기아',
      title2: '인재개발팀',
      title3: '5648952',
      title4: '김현대',
      title5: '매니저(G2)',
      title6: '매니저(G2)',
      title7: '중국어',
      title8: <Button className="link" label={'HK-SPA'} />,
      title9: '999',
      title10: '1',
      title11: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title12: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title13: '2025-01-01',
      title14: '조직장 승인완료',
      title15: '진행중',
      title16: '2025-07',
    },
    {
      title1: '기아',
      title2: '인재개발팀',
      title3: '5648952',
      title4: '김현대',
      title5: '매니저(G2)',
      title6: '매니저(G2)',
      title7: '중국어',
      title8: <Button className="link" label={'HK-SPA'} />,
      title9: '999',
      title10: '1',
      title11: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title12: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title13: '2025-01-01',
      title14: '조직장 승인완료',
      title15: '진행중',
      title16: '2025-07',
    },
    {
      title1: '기아',
      title2: '인재개발팀',
      title3: '5648952',
      title4: '김현대',
      title5: '매니저(G2)',
      title6: '매니저(G2)',
      title7: '중국어',
      title8: <Button className="link" label={'HK-SPA'} />,
      title9: '999',
      title10: '1',
      title11: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title12: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title13: '2025-01-01',
      title14: '조직장 승인완료',
      title15: '진행중',
      title16: '2025-07',
    },
    {
      title1: '기아',
      title2: '인재개발팀',
      title3: '5648952',
      title4: '김현대',
      title5: '매니저(G2)',
      title6: '매니저(G2)',
      title7: '중국어',
      title8: <Button className="link" label={'HK-SPA'} />,
      title9: '999',
      title10: '1',
      title11: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title12: (
        <Button
          className="download"
          onlyIcon
          icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
        />
      ),
      title13: '2025-01-01',
      title14: '조직장 승인완료',
      title15: '진행중',
      title16: '2025-07',
    },
  ];

  const columns = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '회사',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '조직',
      enableGrouping: false,
      size: 140,
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '사번',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '성명',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '직급',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('title6', {
      cell: (info) => info.getValue(),
      header: '취득 시 직급',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('title7', {
      cell: (info) => info.getValue(),
      header: '언어',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('title8', {
      cell: (info) => info.getValue(),
      header: '어학시험 과목',
      enableGrouping: false,
      size: 140,
    }),
    columnHelper.accessor('title9', {
      cell: (info) => info.getValue(),
      header: '총점',
      enableGrouping: false,
      size: 64,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title10', {
      cell: (info) => info.getValue(),
      header: '등급',
      enableGrouping: false,
      size: 64,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title11', {
      cell: (info) => info.getValue(),
      header: '성적표 사본',
      enableGrouping: false,
      size: 100,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title12', {
      cell: (info) => info.getValue(),
      header: '영수증 사본',
      enableGrouping: false,
      size: 100,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title13', {
      cell: (info) => info.getValue(),
      header: '시험일자',
      enableGrouping: false,
      size: 120,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title14', {
      cell: (info) => info.getValue(),
      header: '승인상태',
      enableGrouping: false,
      size: 140,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title15', {
      cell: (info) => info.getValue(),
      header: '지급상태',
      enableGrouping: false,
      size: 100,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title16', {
      cell: (info) => info.getValue(),
      header: '지급예정월',
      enableGrouping: false,
      size: 100,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const ModalOwnerSearchContent = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const { close: closeModal } = useModal();
    const data2: any[] = [
      {
        title1: '영어',
        title2: 'G-TELP',
      },
      {
        title1: '영어',
        title2: 'G-TELP',
      },
      {
        title1: '영어',
        title2: 'G-TELP',
      },
    ];
    const columns2 = [
      columnHelper.accessor('title1', {
        cell: (info) => info.getValue(),
        header: '언어 분류',
        enableGrouping: false,
        size: 140,
      }),
      columnHelper.accessor('title2', {
        cell: (info) => info.getValue(),
        header: '어학시험 과목',
        enableGrouping: false,
        meta: {
          size: 'auto',
        },
      }),
    ] as ColumnDef<any, unknown>[];

    return (
      <ModalContainer>
        <ModalTitle>{'어학시험 과목 조회'}</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-popSelect" className={searchStyles.label}>
                          <span className={searchStyles.text}>언어 분류</span>
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
                      <div className={searchStyles.item}>
                        <label htmlFor="name-popSelect2" className={searchStyles.label}>
                          <span className={searchStyles.text}>어학시험 과목</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input id={'name-popSelect2'} type={'text'} placeholder={'입력'} />
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
            <div className={popupStyles.container}>
              <Divider />
              <GridBox
                data={data2}
                columns={columns2}
                showSelectedCount={true}
                title={'어학시험 과목 목록'}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
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
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select2" className={searchStyles.label}>
                        <span className={searchStyles.text}>회사</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          className={searchStyles.select_option}
                          options={[
                            { value: 'type1', label: '전체' },
                            { value: 'type2', label: '항목' },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select3" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직</span>
                      </label>
                      <div className={searchStyles.box}>
                        <ChipListModalSelectorFormField
                          modalConfig={{ width: 'xl', content: <ModalOwnerSearchContent /> }}
                          chipList={{
                            labelField: 'name',
                            valueField: 'value',
                            hideBorder: true,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select4" className={searchStyles.label}>
                        <span className={searchStyles.text}>성명/사번</span>
                      </label>
                      <div className={searchStyles.box}>
                        <ChipListModalSelectorFormField
                          modalConfig={{ width: 'xl', content: <ModalOwnerSearchContent /> }}
                          chipList={{
                            labelField: 'name',
                            valueField: 'value',
                            hideBorder: true,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-option1" className={searchStyles.label}>
                        <span className={searchStyles.text}>언어</span>
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
                      <label htmlFor="name-option2" className={searchStyles.label}>
                        <span className={searchStyles.text}>어학시험 과목</span>
                      </label>
                      <div className={searchStyles.box}>
                        <ChipListModalSelectorFormField
                          modalConfig={{ width: 'xl', content: <ModalOwnerSearchContent /> }}
                          chipList={{
                            labelField: 'name',
                            valueField: 'value',
                            hideBorder: true,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-option3" className={searchStyles.label}>
                        <span className={searchStyles.text}>승인상태</span>
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
                      <label htmlFor="name-option4" className={searchStyles.label}>
                        <span className={searchStyles.text}>지급상태</span>
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
                </div>
                {/* 확장영역 */}
                {isExpanded && (
                  <div className={cn(searchStyles.form_display, searchStyles.item_wrap)}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-item1" className={searchStyles.label}>
                          <span className={searchStyles.text}>시험일자</span>
                        </label>
                        <div className={searchStyles.box}>
                          <DatePicker className={searchStyles.datepicker_item} />
                          <span className={searchStyles.dash}></span>
                          <DatePicker className={searchStyles.datepicker_item} />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-item2" className={searchStyles.label}>
                          <span className={searchStyles.text}>유효기간</span>
                        </label>
                        <div className={searchStyles.box}>
                          <DatePicker className={searchStyles.datepicker_item} />
                          <span className={searchStyles.dash}></span>
                          <DatePicker className={searchStyles.datepicker_item} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={searchStyles.btn_box}>
                <Button
                  type="button"
                  className={cn(searchStyles.btn_expand, isExpanded ? searchStyles.active : '')}
                  variant="search"
                  size="sm"
                  onlyIcon
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <IcoArrowDownDouble className={searchStyles.ico_expand} />
                </Button>
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
            showSelectedCount={true}
            multiple={true}
            title={'어학성적/지원이력'}
            columnPinning={{
              columns: ['title1', 'title2', 'title3', 'title4', 'title5', 'title6'],
            }}
          />
        </div>
      </PageContainer>
    </form>
  );
}
