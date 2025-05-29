import { FC, useEffect, useState, useCallback } from 'react';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { NoticeBox } from '@shared/ui';
import { TreeBox, TreeNode, Button } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CompanyDetailHRUsergroup } from './company-detail-hr-usergroup';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import { combine } from 'zustand/middleware';

const CompanyDetailHRPositionComponent: FC<any> = () => {
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const { t } = useTranslation();

  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

  useEffect(() => {
    //
  }, []);

  return (
    <SectionLayout contentsRatio={'half'}>
      <div className="grid_wrap">
        <GridBox config={gConfig} columns={columns} title={t('유저그룹 - 보직')} height={766} />
      </div>

      <div className={cn(styles.start, styles.wrap)}>
        <div className={cn(layoutStyles.inner)}>
          <CompanyDetailHRUsergroup />
        </div>
      </div>
    </SectionLayout>
  );
};

export const CompanyDetailHRPosition = CompanyDetailHRPositionComponent;

const columns = [
  { name: 'company', accessorKey: 'company', header: '회사', size: 115, searchable: true },
  { name: 'affiliation', accessorKey: 'affiliation', header: '소속', size: 115, searchable: true },
  { name: 'position', accessorKey: 'position', header: '보직', size: 115, searchable: true },
  { name: 'memberCount', accessorKey: 'memberCount', header: '대상자', size: 115 },
  {
    name: 'select',
    header: '선택',
    size: 95,
    render: (info: any) => <Button className="link">{t('선택')}</Button>,
  },
];

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [],
  data: [
    { company: '현대자동차', affiliation: '소속1팀', position: '조직장', memberCount: '100명' },
  ],
};
