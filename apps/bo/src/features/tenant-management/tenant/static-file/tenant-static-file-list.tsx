import React, { FC } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { useCreation } from 'ahooks';
import { t } from 'i18next';
import { Button } from '@learnway/ui/button';
import { EnGlobalConst } from '@shared/types/enums';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Divider } from '@learnway/ui/elements';
import { staticFileQueryOptions } from '@entities/static-file';
import { SearchBoxForm } from '@shared/ui/search-box';
import { DropdownFormField, FormItem, FormRow2, InputFormField, PeriodPickerFormField } from '@shared/ui/form';

const _global = {
  linkClick: (fileUuid: string) => {
    return;
  }
};

const TenantStaticFileListComponent: FC<any> = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  _global.linkClick = (fileUuid: string) => {
    router.navigate({
      to: `/tenant/static-file/detail`,
      state: {
        fileUuid,
        listParam: getValues()
      }
    });
  };

  const gridInitConfig = useCreation<useGridBoxConfig>(
    () => ({
      query: staticFileQueryOptions.list,
      columns: [
        {
          name: 'no',
          label: t('NO.'),
          type: 'numbering',
          enableSorting: false,
        },
        {
          name: 'tenantName',
          label: t('테넌트명'),
          size: 132,
        },
        {
          name: 'originalFileName',
          label: t('파일명'),
          render: (info: any) => {
            return (
              <Button className="link" onClick={() => _global.linkClick(info.row.original.fileUuid)}>
                {info.getValue()}
              </Button>
            );
          },
          size: 132,
        },
        {
          name: 'fileType',
          label: t('파일 유형'),
          render: (info: any) => {
            return t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.file.FileType.${info.getValue()}`);
          },
          size: 132,
        },
        {
          name: 'opt1',
          label: t('파일 접속 URL'),
          render: (info: any) => {
            return <Button>URL {t('생성')}</Button>;
          },
          size: 88,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'expiryStartDate',
          label: t('파일 접속 유효기간'),
          render: (info: any) => {
            const startDate = getDateToString(new Date(info.row.original.expiryStartDate), DATE_TIME_FORMAT.DATE);
            const endDate = getDateToString(new Date(info.row.original.expiryEndDate), DATE_TIME_FORMAT.DATE);
            if( startDate === endDate ){
              return `${startDate}`;
            } else {
              return `${startDate} ~ ${endDate}`;
            }
          },
          size: 194,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'isLoginRequired',
          label: t('로그인 체크 여부'),
          render: (info: any) => {
            return info.row.original.isLoginRequired ? t('사용') : t('미사용');
          },
          size: 132,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'isUsed',
          label: t('사용여부'),
          render: (info: any) => {
            return info.row.original.isUsed ? t('사용') : t('미사용');
          },
          meta: {
            cellAlign: 'center',
          },
          size: 88,
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
            cellAlign: 'center',
          },
          size: 194,
        },
      ],
      data: [],

      gridState: {
        page: 0,
        size: 20,
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
    setValue,
    onSubmit,
  } = useDynamicForm2();
  const handleOnSearchParam = () => {
    const data = getValues();
    console.log('### ', data)
    const payload = {
      ...data,
      expiryStartDate: (data.dateRange && data.dateRange.from) && getDateToString(new Date(data.dateRange.from), DATE_TIME_FORMAT.DATE),
      expiryEndDate: (data.dateRange && data.dateRange.to) && getDateToString(new Date(data.dateRange.to), DATE_TIME_FORMAT.DATE),
    }
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== null && value !== undefined && value !== '',
      ),
    );
    return filteredPayload
  };
  const handleOnSearch = () => {
    const payload = handleOnSearchParam();
    gridFetch(payload);
  }
  const { config: gConfig, gridFetch, data } = useGridBox(gridInitConfig, handleOnSearchParam);

  return (
    <>
      <SearchBoxForm onSearch={onSubmit(handleOnSearch)}>
        <ContentsRow>
          <FormRow2
            provider={searchProvider}
            name="originalFileName"
            type="text"
            label={t('파일명')}
            value=""
            format="string"
            element={<InputFormField />}
          />
          <FormRow2
            provider={searchProvider}
            name="fileType"
            type="dropdown"
            label={t('파일 유형')}
            value=""
            format="string"
            element={
              <DropdownFormField
                optionsConfig={
                  {codeGroup: CODE_GROUP['pms.file.FileType']}
                }
                presetOptionLabel={t('LABEL.form.label.all')}
              />
            }
          />
          <FormRow2
            provider={searchProvider}
            name="isLoginRequired"
            label={t('로그인 체크 여부')}
            format={'boolean'}
            value={''}
            element={
              <DropdownFormField
                presetOptionLabel={t('LABEL.form.label.all')}
                options={[
                  {label: '로그인', value: true},
                  {label: '비로그인', value: false}
                ]}
              />
            }
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={searchProvider}
            name="isUsed"
            label={t('LABEL.form.label.useYn')}
            format={'boolean'}
            value={''}
            element={
              <DropdownFormField
                presetOptionLabel={t('LABEL.form.label.all')}
                options={[
                  {label: '사용', value: true},
                  {label: '미사용', value: false}
                ]}
              />
            }
          />
          <FormRow2
            provider={searchProvider}
            name={'dateRange'}
            label={'수정 기간'}
            format={'object'}
            element={<PeriodPickerFormField datePickerConfig={{ displayType: 'day' }} />}
          />
          <FormItem />
        </ContentsRow>
      </SearchBoxForm>
      <Divider />
      <GridBox config={gConfig} />
    </>
  )
}

export const TenantStaticFileList = TenantStaticFileListComponent;
