import { FC, useEffect, useState, useCallback } from 'react';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';
import { GridBox, Button, SplitPanel } from '@learnway/ui';
import { CompanyDetailHRUsergroup } from './company-detail-hr-usergroup';

import { EnUserGroupType } from '@types';
import { useGetCompanyUserGroups } from '@entities/user-group/service/user-group-company.hook';

const _global = {
  selectClick: (row: any) => {
    return;
  },
  selectedUserGroupId: '',
};

interface CompanyDetailHRLinkProps {
  type: EnUserGroupType;
}

const CompanyDetailHRLinkComponent: FC<any> = ({ type }: CompanyDetailHRLinkProps) => {
  const routerState = useRouterState();
  const companyId = routerState.location.state?.companyId;

  const [linkTitle, setLinkTitle] = useState('');
  const [linkColumns, setLinkColumns] = useState<any[]>([]);

  const [userGroupId, setUserGroupId] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const { data, refetch } = useGetCompanyUserGroups({ userGroupType: type, companyId: companyId });

  _global.selectClick = (row: any) => {
    setUserGroupId(row.userGroupId);
  };
  _global.selectedUserGroupId = userGroupId;

  useEffect(() => {
    switch (type) {
      case EnUserGroupType.JOB_GROUP:
        setLinkTitle(t('직군'));
        setLinkColumns([...columnsPrev, ...LinkColumnsForGroup, ...columnsNext]);
        break;
      case EnUserGroupType.JOB:
        setLinkTitle(t('직무'));
        setLinkColumns([...columnsPrev, ...LinkColumnsForRole, ...columnsNext]);
        break;
      case EnUserGroupType.JOB_TITLE:
        setLinkTitle(t('호칭'));
        setLinkColumns([...columnsPrev, ...LinkColumnsForDesignation, ...columnsNext]);
        break;
      case EnUserGroupType.JOB_POSITION:
        setLinkTitle(t('보직'));
        setLinkColumns([...columnsPrev, ...LinkColumnsForPosition, ...columnsNext]);
        break;
    }
  }, [type]);

  useEffect(() => {
    if (data) setFilteredData([...data]);
  }, [data]);

  const handleGridSearchClick = useCallback(
    (condition: any) => {
      console.log('handleGridSearchClick', condition);
      const searchValue = condition.value.trim();
      if (searchValue.length > 0) {
        const filterd = data.filter(
          (row: any) => row[condition.key] && row[condition.key].includes(searchValue),
        );
        setFilteredData(filterd);
      } else setFilteredData(data);
    },
    [data],
  );

  return (
    <SplitPanel size={['40%', 'auto']} divider>
      <GridBox
        data={filteredData}
        columns={linkColumns}
        title={t('유저그룹') + ' - ' + linkTitle}
        disabledSelectionToggle
        onSearchClick={handleGridSearchClick}
      />
      <CompanyDetailHRUsergroup
        userGroupId={userGroupId}
        userGroupType={type}
        enableInquiryAll={false}
      />
    </SplitPanel>
  );
};

export const CompanyDetailHRLink = CompanyDetailHRLinkComponent;

// 공통 컬럼
const columnsPrev = [
  { name: 'companyName', accessorKey: 'companyName', header: t('회사'), size: 115 },
];
const columnsNext = [
  {
    name: 'userCount',
    accessorKey: 'userCount',
    header: t('대상자'),
    cell: (info: any) => t('{{count}}명', { count: info.row.original.userCount.toLocaleString() }),
    size: 115,
  },
  {
    name: 'userGroupId',
    header: t('선택'),
    accessorKey: 'userGroupId',
    size: 95,
    cell: (info: any) => (
      <Button
        variant={
          info.row.original.userGroupId === _global.selectedUserGroupId ? 'primary' : 'gray2'
        }
        label={t('선택')}
        onClick={() => {
          _global.selectClick(info.row.original);
        }}
      />
    ),
    meta: {
      cellAlign: 'center',
    },
  },
];

export const LinkColumnsForGroup = [
  {
    name: 'userGroupName',
    accessorKey: 'userGroupName',
    header: t('직군'),
    size: 115,
    searchable: true,
  },
];
export const LinkColumnsForRole = [
  {
    name: 'userGroupSubName',
    accessorKey: 'userGroupSubName',
    header: t('직군'),
    size: 115,
    searchable: true,
  },
  {
    name: 'userGroupName',
    accessorKey: 'userGroupName',
    header: t('직무'),
    size: 115,
    searchable: true,
  },
];
export const LinkColumnsForDesignation = [
  {
    name: 'userGroupName',
    accessorKey: 'userGroupName',
    header: t('호칭'),
    size: 115,
    searchable: true,
  },
];
export const LinkColumnsForPosition = [
  {
    name: 'userGroupName',
    accessorKey: 'userGroupName',
    header: t('보직'),
    size: 115,
    searchable: true,
  },
];
