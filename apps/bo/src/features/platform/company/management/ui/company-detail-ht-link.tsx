import { FC, useEffect, useState, useCallback } from 'react';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { cn } from '@learnway/shared';
import { GridBox, Button, SplitPanel } from '@learnway/ui';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CompanyDetailHRUsergroup } from './company-detail-hr-usergroup';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import { EnUserGroupType } from '@types';
import { useGetCompanyUserGroups } from '@entities/user-group/service/user-group-company.hook';

const _global = {
  selectClick: (userGroupId: number) => {
    return;
  },
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

  const { data, refetch } = useGetCompanyUserGroups({ userGroupType: type, companyId: companyId });

  _global.selectClick = (userGroupId: number) => {
    setUserGroupId(userGroupId);
  };

  useEffect(() => {
    switch (type) {
      case EnUserGroupType.JOB_GROUP:
        setLinkTitle(t('직군'));
        setLinkColumns([...columnsPrev, ...linkColumnsForGroup, ...columnsNext]);
        break;
      case EnUserGroupType.JOB:
        setLinkTitle(t('직무'));
        setLinkColumns([...columnsPrev, ...linkColumnsForRole, ...columnsNext]);
        break;
      case EnUserGroupType.JOB_TITLE:
        setLinkTitle(t('호칭'));
        setLinkColumns([...columnsPrev, ...linkColumnsForDesignation, ...columnsNext]);
        break;
      case EnUserGroupType.JOB_POSITION:
        setLinkTitle(t('보직'));
        setLinkColumns([...columnsPrev, ...linkColumnsForPosition, ...columnsNext]);
        break;
    }
  }, []);

  const handleGridSearchClick = useCallback((condition: any) => {
    console.log('handleGridSearchClick', condition);
    //setFetchParams({ ...params, ...{ [condition.key]: condition.value } });
  }, []);

  return (
    <SplitPanel size={['40%', 'auto']} divider>
      <GridBox
        data={data}
        columns={linkColumns}
        title={t('유저그룹') + ' - ' + linkTitle}
        onSearchClick={(data: any) => {
          console.log('####', data);
        }}
      />
      <CompanyDetailHRUsergroup userGroupId={userGroupId} userGroupType={type} />
    </SplitPanel>
  );
};

export const CompanyDetailHRLink = CompanyDetailHRLinkComponent;

// 공통 컬럼
const columnsPrev = [
  { name: 'companyName', accessorKey: 'companyName', header: '회사', size: 115 },
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
        variant="gray"
        label={t('선택')}
        onClick={() => {
          _global.selectClick(info.row.original.userGroupId);
        }}
      />
    ),
    meta: {
      cellAlign: 'center',
    },
  },
];

const linkColumnsForGroup = [
  {
    name: 'userGroupName',
    accessorKey: 'userGroupName',
    header: t('직군'),
    size: 115,
    searchable: true,
  },
];
const linkColumnsForRole = [
  {
    name: 'userGroupName',
    accessorKey: 'userGroupName',
    header: t('직군'),
    size: 115,
    searchable: true,
  },
  {
    name: 'userGroupSubName',
    accessorKey: 'userGroupSubName',
    header: t('직무'),
    size: 115,
    searchable: true,
  },
];
const linkColumnsForDesignation = [
  {
    name: 'userGroupName',
    accessorKey: 'userGroupName',
    header: t('호칭'),
    size: 115,
    searchable: true,
  },
];
const linkColumnsForPosition = [
  {
    name: 'userGroupName',
    accessorKey: 'userGroupName',
    header: t('소속'),
    size: 115,
    searchable: true,
  },
  {
    name: 'userGroupSubName',
    accessorKey: 'userGroupSubName',
    header: t('보직'),
    size: 115,
    searchable: true,
  },
];
