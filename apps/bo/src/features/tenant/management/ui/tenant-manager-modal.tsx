import React, { FC, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import {
  Button,
  ContentsRow,
  DynamicFormField,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  GridBox,
  useModal,
  useGridBox,
} from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle, IcoRefresh02, IcoSearch } from '@learnway/icons';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { cn } from '@learnway/shared';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@/libs/hooks/src';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';

const TenantManagerModalComponent = () => {
  const { close: closeModal } = useModal();
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config, gridFetch } = useGridBox(gridConfig, getValues);

  const handleOnSearch = (data: any) => {
    console.log(data);
  };

  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('tenantName', {
      cell: (info) => info.getValue(),
      header: '테넌트명',
      enableGrouping: false,
      size: 180,
    }),
    columnHelper.accessor('channelName', {
      cell: (info) => info.getValue(),
      header: '채널명',
      size: 150,
      enableGrouping: false,
    }),
    columnHelper.accessor('company', {
      cell: (info) => info.getValue(),
      header: '회사',
      size: 150,
      enableGrouping: false,
    }),
    columnHelper.accessor('affiliation', {
      cell: (info) => info.getValue(),
      header: '소속',
      size: 100,
      enableGrouping: false,
    }),
    columnHelper.accessor('hrdOwner', {
      cell: (info) => info.getValue(),
      header: 'HRD 담당자 역할',
      size: 130,
      enableGrouping: false,
    }),
    columnHelper.accessor('companyNumber', {
      cell: (info) => info.getValue(),
      header: '사번',
      size: 100,
      enableGrouping: false,
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: '이름',
      size: 100,
      enableGrouping: false,
    }),
    columnHelper.accessor('roleTerm', {
      cell: (info) => info.getValue(),
      header: '역할 기간',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('tenure', {
      cell: (info) => info.getValue(),
      header: '재직여부',
      size: 100,
      enableGrouping: false,
    }),
    columnHelper.accessor('roleStatus', {
      cell: (info) => info.getValue(),
      header: '역할 상태',
      size: 100,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <ModalContainer>
      <ModalTitle>HRD 담당자 역할 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />

          <div className={popupStyles.container}>
            <GridBox
              config={config}
              columns={columns}
              height={310}
              showColumnSettings={false}
              multiple
              hideRowSelectionCheckBox={false}
              title="타이틀"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant={'gray'} size={'lg'} onClick={() => closeModal()}>
          <IcoRefresh02 width={16} height={16} className="icon_refresh" />
          {'초기화'}
        </Button>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={'적용'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantManagerModal = TenantManagerModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenant',
        type: 'dropdown',
        label: t('테넌트'),
        value: '',
        options: [
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
        dropdownConfig: {
          onChange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 선택1',
        },
      },
      {
        name: 'company',
        type: 'dropdown',
        label: t('회사명'),
        value: '',
        options: [
          { value: 'companyA', label: t('회사A') },
          { value: 'companyB', label: t('회사B') },
          { value: 'companyC', label: t('회사C') },
          { value: 'companyD', label: t('회사D') },
          { value: 'companyE', label: t('회사E') },
          { value: 'companyF', label: t('회사F') },
        ],
        dropdownConfig: {
          onChange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
      {
        name: 'managerRole',
        type: 'dropdown',
        label: t('관리자 역할'),
        value: 'roleA',
        options: [
          { value: 'roleA', label: t('역할A') },
          { value: 'roleB', label: t('역할B') },
          { value: 'roleC', label: t('역할C') },
          { value: 'roleD', label: t('역할D') },
          { value: 'roleE', label: t('역할E') },
        ],
      },
    ],
    [
      {
        name: 'name',
        type: 'text',
        label: t('이름'),
        placeholder: t('이름을 입력하세요.'),
        value: '',
      },
      {
        name: 'memnerNo',
        type: 'text',
        label: t('사번'),
        placeholder: t('사번을 입력하세요.'),
        value: '',
      },
      {
        name: 'roleStatus',
        type: 'dropdown',
        label: t('역할 상태'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'normal', label: t('정상') },
        ],
      },
    ],
  ],
};

const gridConfig = {
  query: '',
  data: [
    {
      managerId: 1,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 2,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 1,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 2,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 1,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 2,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 1,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 2,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 1,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 2,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 1,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 2,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 1,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 2,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 1,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 2,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
  ],
  columns: [
    { name: 'tenantName', label: '테넌트명' },
    { name: 'channelName', label: '채널명' },
    { name: 'company', label: '회사' },
    { name: 'affiliation', label: '소속' },
    { name: 'hrdOwner', label: 'HRD 담당자 역할' },
    { name: 'companyNumber', label: '사번' },
    { name: 'name', label: '이름' },
    { name: 'roleTerm', label: '역할 기간' },
    { name: 'tenure', label: '재직 여부' },
    { name: 'roleStatus', label: '역할 상태' },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
