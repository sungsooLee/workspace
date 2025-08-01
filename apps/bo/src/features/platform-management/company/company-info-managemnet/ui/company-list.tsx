import { queryOptions } from '@entities/companies';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';
import { SearchBox } from '@shared/ui/search-box';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { EnGlobalConst } from '@types';
import { useCreation } from 'ahooks';
import { t } from 'i18next';
import { useCallback, useEffect } from 'react';

interface CompanyListProps {
  detailPath: string;
}

const CompanyListComponent = ({ detailPath }: CompanyListProps) => {
  const router = useRouter();
  const routerState = useRouterState();

  const linkClick = (companyCode: string, companyId: number) => {
    router.navigate({
      to: detailPath,
      state: {
        companyCode,
        companyId,
        listParam: getValues(),
      },
    });
  };

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'companyType',
          type: 'dropdown',
          label: t('그룹'),
          value: '',
          presetOptionLabel: t('전체'),
          optionsConfig: {
            codeGroup: CODE_GROUP['pms.company.CompanyType'],
          },
        },
        {
          name: 'name',
          type: 'text',
          label: t('회사명'),
          value: '',
          placeholder: '',
        },
        {
          name: 'isUsed',
          type: 'dropdown',
          label: t('사용 여부'),
          value: '',
          options: [
            { value: '', label: t('전체') },
            { value: 'true', label: t('사용') },
            { value: 'false', label: t('미사용') },
          ],
        },
        {
          name: 'modifyDate',
          type: 'date-range',
          label: t('수정 기간'),
          value: {
            from: undefined,
            to: undefined,
          },
        },
      ],
    ],
    validator: {
      modifyDate: {
        conditions: [
          {
            fn: (values: any) => !values.modifyDate?.from && values.modifyDate?.to,
            message: t('시작 날짜를 선택하세요'),
          },
          {
            fn: (values: any) => values.modifyDate?.from && !values.modifyDate?.to,
            message: t('종료 날짜를 선택하세요.'),
          },
          {
            fn: (values: any) => values.modifyDate.from > values.modifyDate.to,
            message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
          },
        ],
      },
    },
  };

  const gridInitConfig = useCreation(
    () => ({
      query: queryOptions.list,
      columns: [
        {
          name: 'companyType',
          label: t('그룹'),
          render: (info: any) => {
            return t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.getValue()}`,
            );
          },
          meta: {
            size: 'auto',
          },
        },
        {
          name: 'name',
          label: t('회사명'),
          render: (info: any) => (
            <Button
              className="link"
              onClick={() => linkClick(info.row.original.companyCode, info.row.original.companyId)}
              label={info.row.original.name}
            />
          ),
          meta: {
            size: 'auto',
          },
        },
        {
          name: 'isUsed',
          label: t('사용여부'),
          render: (info: any) => (info.getValue() ? t('사용') : t('미사용')),
          meta: {
            cellAlign: 'center',
            size: 'auto',
          },
        },
        {
          name: 'lastModifiedBy',
          label: t('수정자'),
          render: (info: any) =>
            info.row.original.isUseLinkageSystem ? t('시스템') : info.row.original.lastModifiedBy,
          meta: {
            size: 'auto',
          },
        },
        {
          name: 'modifiedDate',
          label: t('수정일'),
          render: (info: any) =>
            info.getValue() === null
              ? ''
              : getDateToString(
                  new Date(info.row.original.modifiedDate),
                  DATE_TIME_FORMAT.DATETIME_SEC,
                ),
          meta: {
            cellAlign: 'center',
            size: 'auto',
          },
        },
      ],
      data: [],
      gridState: {
        page: 0,
        size: 10,
        sort: [],
      },
    }),
    [],
  );

  const {
    provider: searchProvider,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    const searchData = {
      companyType: data.companyType,
      name: data.name,
      isUsed: data.isUsed,
      modifyStartDate: data.modifyDate.from
        ? getDateToString(new Date(data.modifyDate.from), 'YYYYMMDD')
        : '',
      modifyEndDate: data.modifyDate.to
        ? getDateToString(new Date(data.modifyDate.to), 'YYYYMMDD')
        : '',
    };
    gridFetch(searchData);
  }, []);

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

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox config={gConfig} title={t('회사 목록')} showNumberingColumn />
    </>
  );
};

export const CompanyList = CompanyListComponent;
