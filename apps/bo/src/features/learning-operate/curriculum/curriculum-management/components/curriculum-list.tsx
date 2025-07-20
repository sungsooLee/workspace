import { t } from 'i18next';
import { Divider, GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { CODE_GROUP, SearchBoxConfig, useLanguageMap, useSearchBox } from '@learnway/hooks';
import { queryOptions } from '@entities/curriculum';
import { useEffect, useState } from 'react';
import {
  SearchBox,
  TenantByRoleDropdownFormField,
  TenantChannelDropdownFormField,
} from '@shared/ui';
import { useRouter } from '@tanstack/react-router';
export const CurriculumList = () => {
  const { getLanguageName } = useLanguageMap();
  const [selectedRow, setSelectedRow] = useState();
  const router = useRouter();

  const SearchBoxConfig = (): SearchBoxConfig => ({
    builders: [
      [
        {
          name: 'tenantId',
          type: 'custom',
          label: t('테넌트'),
          format: 'object',
          value: '',
          element: <TenantByRoleDropdownFormField />,
          readOnly: true,
        },
        {
          name: 'channelUuid',
          type: 'custom',
          label: t('채널'),
          format: 'object',
          value: '',
          element: <TenantChannelDropdownFormField />,
        },
        // {
        //   name: 'contentTypes',
        //   type: 'dropdown',
        //   label: t('유형'),
        //   value: initialContentType ?? '',
        //   variant: 'text',
        //   format: 'string',
        //   readOnly: initialContentType ? true : false,
        //   presetOptionLabel: t('LABEL.form.label.all', '전체'),
        //   optionsConfig: {
        //     codeGroup: CODE_GROUP['cms.content.ContentType'],
        //   },
        // },
      ],
      [
        {
          name: 'languageCountryCode',
          type: 'dropdown',
          label: t('언어'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          optionsConfig: {
            codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
          },
        },
        {
          name: 'coordinatorName',
          label: t('담당자'),
          type: 'text',
          value: '',
        },
        {
          name: 'curriculumName',
          label: t('커리큘럼명'),
          type: 'text',
          value: '',
        },
      ],
    ],
    validator: {
      tenantId: true,
      channelUuid: true,
    },
  });

  const gridBoxConfig: useGridBoxConfig = {
    query: (param: any) => queryOptions.list(param),
    columns: [
      {
        name: 'curriculumId',
        label: t('ID'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
      },
      {
        name: 'curriculumType',
        label: t('유형'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
      },
      {
        name: 'curriculumName',
        label: t('커리큘럼명'),
        size: 400,
        render: (info: any) => {
          const curriculumId = info.row.original.curriculumId;
          return (
            <p
              className="underline"
              onClick={() =>
                router.navigate({
                  to: '/learning-operate/curriculum/management',
                  state: { curriculumId },
                })
              }
            >
              {info.getValue()}
            </p>
          );
          // const tenantName = info.getValue();
        },
      },
      {
        name: 'tenantName',
        label: t('테넌트'),
        size: 200,
      },
      { name: 'channelName', label: t('채널'), size: 200 },
      { name: 'coordinatorName', label: t('담당자'), size: 200 },
      {
        name: 'languageCountryCode',
        label: t('언어'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
        render: (info: any) => {
          const locale = info.getValue();
          return getLanguageName(locale);
        },
      },
      {
        name: 'preview',
        label: t('미리보기'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
        render: (info: any) => (
          <p className="underline" onClick={() => console.log(info)}>
            미리보기
          </p>
        ),
      },
      {
        name: 'editInfo',
        label: t('수정정보'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
        render: (info: any) => (
          <p className="underline" onClick={() => console.log(info)}>
            보기
          </p>
        ),
      },
    ],
  };

  const { provider, getValues, onFormChange } = useSearchBox(SearchBoxConfig());
  const { config, gridFetch } = useGridBox(gridBoxConfig, getValues);

  useEffect(() => {
    gridFetch(getValues());
  }, []);

  return (
    <>
      <SearchBox provider={provider} onSearch={gridFetch} />
      <Divider />
      <GridBox config={config} showNumberingColumn onRowSelect={setSelectedRow} />
    </>
  );
};
