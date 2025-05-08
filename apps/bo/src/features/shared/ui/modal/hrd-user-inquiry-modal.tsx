import React, { FC, useEffect, useState, useCallback } from 'react';
import { t } from 'i18next';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  TreeContainer,
  TreeView,
  TreeNode,
  TreeEventPayload,
  GridBox,
  useGridBox,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

import { usersQueryOptions } from '@entities/users/service/users.queries';

const UserInquiryModalComponent: FC<any> = ({ children }) => {
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const { open: openModal, close: closeModal, confirm: openConfirm } = useModal();

  const handleOnSearch = useCallback((searchParam: any) => {
    const pageParam = {
      size: 5,
    };
    gridFetch(pageParam, 1);
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>{t('타이틀')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />

          <div className={popupStyles.container}>
            <GridBox
              config={gConfig}
              height={310}
              showColumnSettings={false}
              multiple
              hideRowSelectionCheckBox={false}
              title={t('타이틀')}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={t('적용')} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const UserInquiryModal = UserInquiryModalComponent;

const gridConfig = {
  query: usersQueryOptions.all,
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
  ],
  columns: [
    { name: 'tenantName', label: '테넌트명' },
    { name: 'channelName', label: '채널명' },
    { name: 'company', label: '회사' },
    { name: 'affiliation', label: '소속' },
    { name: 'hrdOwner', label: 'HRD 담당자 역할' },
    { name: 'companyNumber', label: '사번' },
    { name: 'name', label: '이름' },
    {
      name: 'roleTerm',
      label: '역할 기간',
      render: (info: any) => {
        return `${info.row.original.startday} ~ ${info.row.original.endday}`;
      },
    },
    { name: 'tenure', label: '재직 여부' },
    { name: 'roleStatus', label: '역할 상태' },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};

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
