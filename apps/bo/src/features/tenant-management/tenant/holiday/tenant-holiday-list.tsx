import React, { FC, useEffect, useState } from 'react';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { useFetchAuthUser, usePersonalInfoCheck } from '@learnway/auth/entities';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { t } from 'i18next';
import { DATE_TIME_FORMAT, fileDownload, getDateToString } from '@learnway/shared';
import { GridBox, useGridBox } from '@learnway/ui/grid';
import { GridExcelDownloadButton, GridExcelUploadButton, SearchBox } from '@shared/ui';
import { Divider } from '@learnway/ui/elements';
import { queryOptions as companysQueryOptions } from '@entities/companies';
import { useQueryClient } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
import { holidayQueryOptions } from '@entities/holiday/service/holiday.queries';
import { useCreation } from 'ahooks';
import { Button } from '@learnway/ui/button';
import { EnGlobalConst } from '@shared/types/enums';
import { PMSApiPrefix } from '@learnway/config';
import { IcoDownload } from '@learnway/icons';

const _global = {
  linkClick: (holidayId: number) => {
    return;
  }
};

/**
 * 화면번호 : NLP_BO_TMS_2015 휴일 관리
 * @param rootPath
 * @constructor
 */
const TenantHolidayListComponent: FC<any> = ({rootPath}) => {
  const router = useRouter();
  const routerState = useRouterState();
  const queryClient = useQueryClient();

  const { data: loginUser } = useFetchAuthUser();
  const { hasPersonalInfo, currentMenu } = usePersonalInfoCheck();

  const [params, setParams] = useState<Record<string, any>>({});

  _global.linkClick = (holidayId: number) => {
    router.navigate({
      to: `/tenant/holiday/detail`,
      state: {
        holidayId,
        listParam: getValues()
      }
    });
  };

  const gridInitConfig = useCreation(() => ({
    query: holidayQueryOptions.list,
    columns: [
      {
        name: 'no',
        label: t('NO.'),
        type: 'numbering',
        enableSorting: false
      },
      {
        name: 'tenantName',
        label: t('테넌트명'),
        size: 132
      },
      {
        name: 'companyName',
        label: t('회사'),
        size: 132
      },
      {
        name: 'holidayName',
        label: t('휴일명'),
        render: (info: any) => {
          return (
            <Button
              className="link"
              onClick={() => _global.linkClick(info.row.original.holidayId)}
            >
              {info.getValue()}
            </Button>
          );
        },
        size: 132
      },
      {
        name: 'startDate',
        label: t('휴일 기간'),
        render: (info: any) => {
          const startDate = getDateToString(new Date(info.row.original.startDate), DATE_TIME_FORMAT.DATE);
          const endDate = getDateToString(new Date(info.row.original.endDate), DATE_TIME_FORMAT.DATE);
          if( startDate === endDate ){
            return `${startDate}`;
          } else {
            return `${startDate} ~ ${endDate}`;
          }
        },
        size: 194,
        meta: {
          cellAlign: 'center'
        }
      },
      {
        name: 'holidayType',
        label: t('휴일 유형'),
        render: (info: any) => {
          return t(
            `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.holiday.HolidayType.${info.getValue()}`,
          )
        },
        size: 159,
        meta: {
          cellAlign: 'center'
        }
      },
      {
        name: 'isUsed',
        label: t('사용여부'),
        render: (info: any) => {
          return info.row.original.isUsed ? t('사용') : t('미사용');
        },
        size: 88,
        meta: {
          cellAlign: 'center'
        }
      },
      {
        name: 'createdDate',
        label: t('등록일'),
        render: (info: any) => {
          return getDateToString(
            new Date(info.row.original.createdDate),
            DATE_TIME_FORMAT.DATETIME_SEC,
          );
        },
        meta: {
          cellAlign: 'center'
        },
        size: 194
      },
      {
        name: 'modifiedDate',
        label: t('수정일'),
        render: (info: any) => {
          return getDateToString(
            new Date(info.row.original.modifiedDate),
            DATE_TIME_FORMAT.DATETIME_SEC,
          );
        },
        meta: {
          cellAlign: 'center'
        },
        size: 194
      },
    ],
    data: [],

    gridState: {
      page: 0,
      size: 20,
      sort: []
    },
  }), []);


  const {
    provider: searchProvider,
    getValues,
    setOptions,
    setValue,
    onFormChange,
    onFormValid } = useSearchBox(searchConfig());

  const handleOnSearchParam = () => {
    const data = getValues();
    console.log('### ', data)
    const payload = {
      ...data,
      startDate: data.dateRange.from && getDateToString(new Date(data.dateRange.from), DATE_TIME_FORMAT.DATE),
      endDate: data.dateRange.to && getDateToString(new Date(data.dateRange.to), DATE_TIME_FORMAT.DATE),
    }
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== null && value !== undefined && value !== '',
      ),
    );
    return filteredPayload
  };
  const { config: gConfig, gridFetch, data } = useGridBox(gridInitConfig, handleOnSearchParam);
  const tenantIdWatch = useWatch({ control: searchProvider.control, name: 'tenantId' });

  const handleOnSearch = () => {
    const payload = handleOnSearchParam();
    setParams({
      ...payload
    });
    gridFetch(payload);
  }

  const handleOnExcelUpload = async (data: Record<string, any>[]) => {
    gridFetch();
  }

  const handleOnExcelDownloadLegalHoliday = async () => {
    const payload: Record<string, any> = {
      holidayType: 'LEGAL_HOLIDAY',
      menuId: currentMenu?.menuId,
    }

    await fileDownload({
      url: `${PMSApiPrefix()}/holiday/exceldownload`,
      params: payload,
      method: 'get'
    });
  }

  useEffect(() => {
    if (!loginUser) return;

    const tenantIdOptions = loginUser.tenants.map((tenant) => ({
      value: tenant.tenantId,
      label: tenant.tenantName }));
    setOptions('tenantId', tenantIdOptions);
    if (loginUser.activeTenant) setValue('tenantId', loginUser.activeTenant.tenantId ?? '');
  }, [loginUser]);

  useEffect(() => {
    setValue('companyCode', '');
    if (tenantIdWatch) {
      (async () => {
        const companys = await queryClient.fetchQuery(
          companysQueryOptions.tenantCompany(tenantIdWatch),
        );

        const companyIdOptions = companys.map((item: any) => ({
          label: item.name,
          value: item.companyCode,
        }));
        setOptions('companyCode', companyIdOptions);
      })();
    } else {
      setOptions('companyCode', []);
    }
  }, [tenantIdWatch]);

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        excelButtons={
          <>
            <GridExcelUploadButton
              validateUrl={'/holiday/excelUpload'}
              affairsType="PMS"
              formDataName="multipartFile"
              onUpload={handleOnExcelUpload}
            />
            <GridExcelDownloadButton
              url={`${PMSApiPrefix()}/holiday/exceldownload`}
              method="get"
              params={params}
              dataCount={data?.totalElements}
              disabled={!data?.totalElements}
            />
          </>
        }
        showExcelDownload={true}
        customButtonNode={
          <Button
            variant="text"
            size="xs"
            label={t('휴일 다운로드')}
            icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
            onClick={handleOnExcelDownloadLegalHoliday}
          />
        }
      />
    </>
  );
}

export const TenantHolidayList = TenantHolidayListComponent;

const searchConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('테넌트'),
        format: 'object',
        value: '',
        presetOptionLabel: t('LABEL.form.label.select'),
        options: []
      },
      {
        name: 'companyCode',
        type: 'dropdown',
        label: t('LABEL.grid.column.company'),
        presetOptionLabel: t('LABEL.form.label.select'),
        value: '',
        options: [],
      },
      {
        name: 'holidayName',
        type: 'text',
        label: t('휴일명'),
        value: '',
      },
    ],
    [
      {
        name: 'holidayType',
        type: 'dropdown',
        label: t('휴일 유형'),
        value: '',
        presetOptionLabel: t('전체'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.holiday.HolidayType']
        }
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('사용') },
          { value: 'false', label: t('미사용') },
        ]
      },
      {
        name: 'dateRange',
        type: 'date-range',
        label: t('휴일기간'),
        format: 'object',
        value: { from: undefined, to: undefined }
      },
    ]
  ],
  validator: {
    tenantId: true
  }
});
