import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch, IcoFormRequired } from '@learnway/icons';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ContentsHistoryInfoFormField } from '../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import {
  Button,
  Input,
  Dropdown,
  ContentsRow,
  InputModalSelectorFormField,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Grid,
} from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export const Route = createFileRoute('/_layout/pms/menu-education-register-detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  const { close: closeModal } = useModal();
  const ModalHistoryInfoContent = () => {
    // 이력 구분
    const [recordSelectedValues, setRecordSelectedValues] = useState<string[]>([]);
    const recordOptions = [
      { value: 'type1', label: '전체' },
      { value: 'type2', label: '항목' },
    ];

    // grid
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const data: any[] = [
      {
        order: '1',
        record: '수정',
        name: '테넌트명1',
        owner: '김현대',
        id: '123457@hyundai.com',
        date: '2025-01-01 15:15:11',
      },
      {
        order: '2',
        record: '등록',
        name: '테넌트명1',
        owner: '김현대',
        id: '123457@hyundai.com',
        date: '2025-01-01 15:15:11',
      },
      {
        order: '3',
        record: '삭제',
        name: '테넌트명2',
        owner: '김현대',
        id: '123457@hyundai.com',
        date: '2025-01-01 15:15:11',
      },
    ];

    const columnHelper = createColumnHelper<any>();

    const columns = [
      columnHelper.accessor('order', {
        cell: (info) => info.getValue(),
        header: 'NO.',
        footer: (props) => `Total: ${props.table.getRowModel().rows.length}`,
        size: 64,
        meta: {
          headerAlign: 'left',
          cellAlign: 'center',
        },
        enableGrouping: false,
      }),
      columnHelper.accessor('record', {
        cell: (info) => info.getValue(),
        header: '이력 구분',
        enableGrouping: false,
        size: 120,
      }),
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
        header: '테넌트명',
        size: 520,
        enableGrouping: false,
      }),
      columnHelper.accessor('owner', {
        cell: (info) => info.getValue(),
        header: '담당자',
        size: 160,
        enableGrouping: false,
      }),
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: '아이디(이메일)',
        size: 240,
        enableGrouping: false,
      }),
      columnHelper.accessor('date', {
        cell: (info) => info.getValue(),
        header: '일시',
        size: 210,
        enableGrouping: false,
      }),
    ] as ColumnDef<any, unknown>[];

    return (
      <ModalContainer>
        <ModalTitle>{'이력 정보'}</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-select1" className={searchStyles.label}>
                          <span className={searchStyles.text}>테넌트명</span>
                          {/* 필수 케이스 */}
                          <span className={cn(searchStyles.status, searchStyles.required)}>
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input id="name-select1" type="text" placeholder="입력" />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-owner" className={searchStyles.label}>
                          <span className={searchStyles.text}>담당자</span>
                          {/* 필수 케이스 */}
                          <span className={cn(searchStyles.status, searchStyles.required)}>
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input id="name-owner" type="text" placeholder="입력" />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-id" className={searchStyles.label}>
                          <span className={searchStyles.text}>아이디(이메일)</span>
                          {/* 필수 케이스 */}
                          <span className={cn(searchStyles.status, searchStyles.required)}>
                            <IcoFormRequired width={12} height={12} />
                          </span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input id="name-id" type="text" placeholder="입력" />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-record" className={searchStyles.label}>
                          <span className={searchStyles.text}>이력 구분</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={recordOptions}
                            value={recordSelectedValues}
                            onChange={(selected) => setRecordSelectedValues(selected)}
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
            <div className="grid_wrap line">
              <Grid
                data={data}
                columns={columns}
                height={280}
                hideColumnSettings={true}
                pagination={{
                  pageSize,
                  pageIndex,
                  totalRows: 100,
                  onPageChange: setPageIndex,
                  onPageSizeChange: setPageSize,
                }}
                title="타이틀"
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
          <FormSubTitle label={'교육장소 정보 '} />
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-channel" className={formStyles.form_label}>
                <span className={formStyles.form_text}>채널</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              {/* 퍼블수정 20240317 : Modal 수정 S  */}
              <div className={formStyles.input_box}>
                <InputModalSelectorFormField
                  modalConfig={{
                    width: 'xl',
                    content: <ModalHistoryInfoContent />,
                  }}
                />
              </div>
              {/* 퍼블수정 20240317 : Modal 수정 E  */}
            </div>
          </ContentsRow>
          <ContentsHistoryInfoFormField />
        </div>
      </PageContainer>
    </form>
  );
}
