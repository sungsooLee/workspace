import { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { cn } from '@learnway/shared';
import { GridBox } from '@learnway/ui';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CompanyDetailHRUsergroup } from './company-detail-hr-usergroup';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import { EnCompanyHrLinkType } from '@types';

const CompanyDetailHRLinkComponent: FC<any> = ({ type }) => {
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const { t } = useTranslation();

  const [linkTitle, setLinkTitle] = useState('');
  const [linkColumns, setLinkColumns] = useState<any[]>([]);

  useEffect(() => {
    switch (type) {
      case EnCompanyHrLinkType.GROUP:
        setLinkTitle(t('직군'));
        setLinkColumns([...columnsPrev, ...linkColumnsForGroup, ...columnsNext]);
        break;
      case EnCompanyHrLinkType.ROLE:
        setLinkTitle(t('직무'));
        setLinkColumns([...columnsPrev, ...linkColumnsForRole, ...columnsNext]);
        break;
      case EnCompanyHrLinkType.DESIGNATION:
        setLinkTitle(t('호칭'));
        setLinkColumns([...columnsPrev, ...linkColumnsForDesignation, ...columnsNext]);
        break;
      case EnCompanyHrLinkType.POSITION:
        setLinkTitle(t('보직'));
        setLinkColumns([...columnsPrev, ...linkColumnsForPosition, ...columnsNext]);
        break;
    }
  }, []);

  return (
    <SectionLayout contentsRatio={'half'}>
      <div className="grid_wrap">
        <GridBox
          data={sampleData}
          columns={linkColumns}
          title={t('유저그룹') + ' - ' + linkTitle}
          height={766}
        />
      </div>

      <div className={cn(styles.start, styles.wrap)}>
        <div className={cn(layoutStyles.inner)}>
          <CompanyDetailHRUsergroup />
        </div>
      </div>
    </SectionLayout>
  );
};

export const CompanyDetailHRLink = CompanyDetailHRLinkComponent;

// 공통 컬럼
const columnsPrev = [
  { name: 'company', accessorKey: 'company', header: '회사', size: 115, searchable: true },
];
const columnsNext = [
  {
    name: 'memberCount',
    accessorKey: 'memberCount',
    header: t('대상자'),
    size: 115,
  },
  {
    name: 'select',
    header: t('선택'),
    size: 95,
  },
];

const sampleData = [
  {
    company: '현대자동차',
    affiliation: '소속1팀',
    position: '조직장',
    designation: '책임연구원',
    group: '판매직',
    role: '스텝',
    memberCount: '100명',
  },
];

const linkColumnsForGroup = [
  {
    name: 'group',
    accessorKey: 'group',
    header: t('직군'),
    size: 115,
    searchable: true,
  },
];
const linkColumnsForRole = [
  {
    name: 'group',
    accessorKey: 'group',
    header: t('직군'),
    size: 115,
    searchable: true,
  },
  {
    name: 'role',
    accessorKey: 'role',
    header: t('직무'),
    size: 115,
    searchable: true,
  },
];
const linkColumnsForDesignation = [
  {
    name: 'designation',
    accessorKey: 'designation',
    header: t('호칭'),
    size: 115,
    searchable: true,
  },
];
const linkColumnsForPosition = [
  {
    name: 'affiliation',
    accessorKey: 'affiliation',
    header: t('소속'),
    size: 115,
    searchable: true,
  },
  {
    name: 'position',
    accessorKey: 'position',
    header: t('보직'),
    size: 115,
    searchable: true,
  },
];
