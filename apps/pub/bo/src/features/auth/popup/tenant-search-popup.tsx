import { memo, useState } from 'react';
import { cn } from '@learnway/shared';
import styles from './tenant-search-popup.module.css';
import {
  Button,
  ContentsRow,
  Dropdown,
  DropdownOption,
  GridBox,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  RadioGroup,
  useModal,
} from '@learnway/ui';
import { IcoSearch } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const TenantSearchPopupCompoment = () => {
  const { close: closeModal } = useModal();

  // drop down
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '테넌트명' },
    { value: 'option2', label: '테넌트명 2' },
    { value: 'option3', label: '테넌트명 3' },
  ];
  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const data: any[] = [
    {
      select: <RadioGroup options={[{ value: 'type1', label: '' }]} />,
      tenantName: '테넌트명1',
      companyName: '회사명1',
      registerNumber: '123-12-12345',
      tenantAdmin: '김현대',
    },
    {
      select: <RadioGroup options={[{ value: 'type2', label: '' }]} />,
      tenantName: '테넌트명2',
      companyName: '회사명2',
      registerNumber: '123-12-12345',
      tenantAdmin: '김현대',
    },
  ];
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('select', {
      cell: (info) => info.getValue(),
      header: '',
      size: 64,
      enableGrouping: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('tenantName', {
      cell: (info) => info.getValue(),
      header: '테넌트명',
      size: 220,
      enableGrouping: false,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    }),
    columnHelper.accessor('companyName', {
      cell: (info) => info.getValue(),
      header: '회사명',
      size: 220,
      enableGrouping: false,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    }),
    columnHelper.accessor('registerNumber', {
      cell: (info) => info.getValue(),
      header: '사업자 등록 번호',
      size: 220,
      enableGrouping: false,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    }),
    columnHelper.accessor('tenantAdmin', {
      cell: (info) => info.getValue(),
      header: '테넌트 관리자',
      size: 220,
      enableGrouping: false,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <ModalContainer>
      <ModalTitle>{'업무 담당 회사 정보'}</ModalTitle>
      <ModalBody>
        <div className={cn(styles.start, styles.wrap)}>
          <ContentsRow className={styles.search_box}>
            <Dropdown
              options={options}
              value={selectedValues}
              onChange={(selected) => setSelectedValues(selected)}
              placeholder="테넌트명"
              variant="default"
              isMulti={false}
              size={'sm'}
              className={styles.select_area}
            />
            <Input type="text" placeholder="입력" className={styles.input_area} />
            <Button className={styles.btn_area} variant={'search'} size={'sm'}>
              <IcoSearch width={16} height={16} stroke={'#131C30'} />
              {'조회'}
            </Button>
          </ContentsRow>
          <GridBox
            data={data}
            columns={columns}
            title="업무 담당 회사 정보"
            showColumnSettings={false}
            disabledSelectionToggle
            pagination={{
              pageSize,
              pageIndex,
              totalRows: 10,
              onPageChange: setPageIndex,
              onPageSizeChange: setPageSize,
            }}
          />
        </div>
      </ModalBody>

      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={'확인'} variant={'primary'} size={'lg'} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantSearchPopup = memo(TenantSearchPopupCompoment);
