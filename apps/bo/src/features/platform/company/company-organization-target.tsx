import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '@shared/ui';
import { Tabs, GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import styles from '@learnway/styles/bo/features/role/role-info.module.css';

const CompanyOrganizationTargetComponent = () => {
  const { t } = useTranslation();

  const [selectedTabKey, setSelectedTabKey] = useState<string>('organization');

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const tabItems = [
    {
      title: '조직',
      key: 'organization',
      content: <OrganizationTabComponent />,
    },
    {
      title: '유저',
      key: 'user',
      content: <UserTabComponent />,
    },
  ];

  return (
    <div className={cn(styles.start, styles.wrap)}>
      <div className={cn(layoutStyles.inner)}>
        <FormSubTitle
          label={t('조직 대상자')}
          lineType={'light'}
          titleNode={<p className={formStyles.guide_text}>현대자동차 &gt; 경영지원본부</p>}
        />
        <Tabs
          items={tabItems}
          type="round"
          size={'sm'}
          className={styles.tab_wrap}
          selectedTabKey={selectedTabKey}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
};

export const CompanyOrganizationTarget = CompanyOrganizationTargetComponent;

const OrganizationTabComponent = () => {
  const { provider: searchProvider, getValues } = useSearchBox(searchOrganizationConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridOrganizationConfig, getValues);
  const handleOnSearch = useCallback((data: any) => {
    console.log('search', data);
    gridFetch(data);
  }, []);
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox config={gConfig} columns={organizationColumns} title="조직 목록" />
        </div>
      </div>
    </>
  );
};

const UserTabComponent = () => {
  const { provider: searchProvider, getValues } = useSearchBox(searchUserConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridUserConfig, getValues);
  const handleOnSearch = useCallback((data: any) => {
    console.log('search', data);
    gridFetch(data);
  }, []);
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox config={gConfig} columns={userColumns} title="유저 목록" />
        </div>
      </div>
    </>
  );
};

const searchOrganizationConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'registerType',
        type: 'dropdown',
        label: t('조직 등록 유형'),
        value: '',
        options: [
          { label: '전체', value: '' },
          { label: '자동 등록', value: 'HR' },
          { label: '수동 등록', value: 'DIRECT' },
        ],
      },
      {
        name: 'name',
        type: 'text',
        label: t('조직명'),
        value: '',
        placeholder: '',
      },
      {
        name: 'managerName',
        type: 'text',
        label: t('조직장 이름'),
        value: '',
        placeholder: '',
      },
    ],
  ],
};

const searchUserConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'registerType',
        type: 'dropdown',
        label: t('조직 등록 유형'),
        value: '',
        options: [
          { label: '전체', value: '' },
          { label: '자동 등록', value: 'HR' },
          { label: '수동 등록', value: 'DIRECT' },
        ],
      },
      {
        name: 'dept',
        type: 'text',
        label: t('소속'),
        value: '',
        placeholder: '',
      },
      {
        name: 'sabun',
        type: 'text',
        label: t('사번'),
        value: '',
        placeholder: '',
      },
    ],
  ],
};

const gridOrganizationConfig: useGridBoxConfig = {
  query: '',
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};

const gridUserConfig: useGridBoxConfig = {
  query: '',
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<any>();

const organizationColumns = [
  columnHelper.accessor('isUseLinkageSystem', {
    cell: (info) => {
      return info.row.original.isUseLinkageSystem ? '자동 등록' : '수동 등록';
    },
    header: '조직 등록 유형',
    enableGrouping: false,
  }),
  columnHelper.accessor('code', {
    header: t('조직 코드'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('name', {
    header: t('조직명'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('managerSabun', {
    header: t('조직장 사번'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('managerName', {
    header: t('조직장 이름'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];

const userColumns = [
  columnHelper.accessor('isUseLinkageSystem', {
    cell: (info) => {
      return info.row.original.isUseLinkageSystem ? '자동 등록' : '수동 등록';
    },
    header: '조직 등록 유형',
    enableGrouping: false,
  }),
  columnHelper.accessor('company', {
    header: t('회사'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('dept', {
    header: t('소속'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('role', {
    header: t('학습자 역할'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('sabun', {
    header: t('사번'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('name', {
    header: t('이름'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('employmentStatus', {
    header: t('재직여부'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('accountStatus', {
    header: t('계정상태'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
