import { FC, useState, useEffect, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

import { Button, GridBox, useGridBox } from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { SearchBox } from '@shared/ui/search-box';

import { tenantQueryOptions } from '@entities/tenant';

const _global = {
  linkClick: (tenantId: number, tenantName: string) => {
    return;
  },
};

/**
 * 화면번호 : NLP_BO_TMS_1111_15 테넌트-유저관리 (회원 가입 신청)
 * @param param0
 * @returns
 */
const TenantUserRegistApplicationListComponent: FC<any> = ({ rootPath }) => {
  const router = useRouter();
  const routerState = useRouterState();

  const { data: loginUser } = useFetchAuthUser();
  const queryClient = useQueryClient();

  const [companyCodes, setCompanyCodes] = useState<string[]>([]);

  _global.linkClick = (tenantId: number, tenantName: string) => {
    router.navigate({
      to: `${rootPath}/tenant/management/user-group/handmade-detail`,
      state: {
        tenantId: tenantId,
        tenantName: tenantName,
        listParam: getValues(),
      },
    });
  };

  const {
    provider: searchProvider,
    setValue,
    setOptions,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

  const tenantIdWatch = useWatch({ control: searchProvider.control, name: 'tenantId' });

  const handleOnSearch = (data: any) => {
    console.log('search', data);
    gridFetch(data);
  };
  useEffect(() => {
    const init = async () => {
      const listParam = routerState.location.state.listParam;
      if (listParam) {
        onFormChange(listParam);
        if (await onFormValid()) {
          handleOnSearch(getValues());
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!loginUser) return;

    const tenantIdOptions = loginUser.tenants.map((tenant) => ({
      value: tenant.tenantId,
      label: tenant.tenantName,
    }));
    const tenantIds = tenantIdOptions.map((item) => item.value);
    setOptions('tenantId', tenantIdOptions);
    if (loginUser.activeTenant) setValue('tenantId', loginUser.activeTenant.tenantId ?? '');

    (async () => {
      const companys = await queryClient.fetchQuery(tenantQueryOptions.tenantCompanys(tenantIds));
      const companyCodes = companys.map((item) => item.companyCode);
      setCompanyCodes(companyCodes);
    })();
  }, [loginUser]);

  useEffect(() => {
    if (tenantIdWatch) {
      (async () => {
        const companys = await queryClient.fetchQuery(
          tenantQueryOptions.tenantCompanys([tenantIdWatch]),
        );
        console.log(companys);
        const companyIdOptions = companys.map((item) => ({
          label: item.name,
          value: item.companyId,
        }));
        console.log(companyIdOptions);
        setOptions('companyId', companyIdOptions);
      })();
    } else {
      setValue('companyId', '');
      setOptions('companyId', []);
    }
  }, [tenantIdWatch]);

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox config={gConfig} columns={columns} multiple />
        </div>
      </div>
    </>
  );
};

export const TenantUserRegistApplicationList = TenantUserRegistApplicationListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('테넌트'),
        format: 'number',
        value: '',
        presetOptionLabel: t('LABEL.form.label.select'),
        options: [],
      },
      {
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        format: 'number',
        value: '',
        presetOptionLabel: t('LABEL.form.label.select'),
        options: [],
      },
      {
        name: 'email',
        type: 'text',
        label: t('이메일'),
        value: '',
      },
      {
        name: 'tenantManagerName',
        type: 'text',
        label: t('사번'),
        value: '',
      },
    ],
    [
      {
        name: 'companyManagerName',
        type: 'text',
        label: t('재직여부'),
        value: '',
      },
      {
        name: 'opt2',
        type: 'text',
        label: t('승인상태'),
        value: '',
      },
      {
        name: 'dateRange',
        type: 'date-range',
        label: t('신청기간'),
        format: 'object',
        value: { from: undefined, to: undefined },
      },
    ],
  ],
  validator: {
    tenantId: true,
  },
};

const gridConfig = {
  query: '',
  columns: [],
  data: [],

  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('tenantName', {
    cell: (info) => info.getValue(),
    header: t('테넌트'),
    size: 114,
  }),
  columnHelper.accessor('opt1', {
    cell: (info) => info.getValue(),
    header: t('그룹'),
    size: 114,
  }),
  columnHelper.accessor('opt2', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 114,
  }),
  columnHelper.accessor('opt3-1', {
    cell: (info) => info.getValue(),
    header: t('실'),
    size: 114,
  }),
  columnHelper.accessor('opt3', {
    cell: (info) => info.getValue(),
    header: t('소속'),
    size: 114,
  }),
  columnHelper.accessor('opt4', {
    cell: (info) => (
      <Link to={info.row.original.tenantSite} className="link">
        {info.row.original.tenantId}
      </Link>
    ),
    header: t('호칭(지위)'),
    size: 114,
  }),
  columnHelper.accessor('opt8', {
    cell: (info) => info.getValue(),
    header: t('이메일'),
    size: 114,
  }),
  columnHelper.accessor('opt5', {
    cell: (info) => info.getValue(),
    header: t('사번'),
    size: 114,
  }),
  columnHelper.accessor('opt6', {
    cell: (info) => info.getValue(),
    header: t('이름'),
    size: 114,
  }),
  columnHelper.accessor('opt7', {
    cell: (info) => info.getValue(),
    header: t('신청일'),
    size: 114,
  }),

  columnHelper.accessor('opt9', {
    cell: (info) => info.getValue(),
    header: t('재직여부'),
    size: 88,
  }),
  columnHelper.accessor('opt10', {
    cell: (info) => info.getValue(),
    header: t('승인상태'),
    size: 88,
  }),
  columnHelper.accessor('opt11', {
    cell: (info) => info.getValue(),
    header: t('승인일'),
    size: 114,
  }),
] as ColumnDef<any, unknown>[];
