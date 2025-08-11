import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { useRouter, createLazyFileRoute } from '@tanstack/react-router';

import { queryOptions } from '@entities/external-education';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { SearchBox } from '@shared/ui/search-box';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

export const Route = createLazyFileRoute('/_layout/external-education/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState([]);

  const SearchBoxConfig = (): SearchBoxConfig => ({
    builders: [
      [
        {
          name: 'tenantId',
          type: 'custom',
          label: t('테넌트'),
          format: 'object',
          value: '1',
          // element: <TenantByRoleDropdownFormField />,
          element: <Input />,
          readOnly: true,
        },
        {
          name: 'channelUuid',
          type: 'custom',
          label: t('신청양식'),
          format: 'object',
          value: '',
          element: <Input />,
        },
        {
          name: 'contentTypes',
          type: 'dropdown',
          label: t('유형'),
          value: '',
          variant: 'text',
          format: 'string',
          presetOptionLabel: t('LABEL.form.label.all', '전체'),
          options: [
            { label: t('사용'), value: 'Y' },
            { label: t('미사용'), value: 'N' },
            { label: t('임시저장'), value: 'S' },
          ],
        },
      ],
    ],
  });

  const gridBoxConfig: useGridBoxConfig = {
    query: (param: any) => queryOptions.list(param),
    columns: [
      {
        name: 'externalCourseFormTitle',
        label: t('신청양식'),
        size: 400,
        render: (info: any) => {
          const { externalCourseFormTitle } = info.row.original;
          return (
            <span
              className="underline"
              onClick={(e) => {
                e.preventDefault();
                router.navigate({
                  to: `/external-education/view`,
                  state: { formId: info.row.original.externalCourseFormId },
                });
              }}
            >
              {externalCourseFormTitle}
            </span>
          );
        },
      },
      {
        name: 'externalFormStatusType',
        label: t('사용여부'),
        size: 100,
        render: (info: any) => {
          const status = info.row.original.externalFormStatusType;
          return status === 'USE' ? t('사용') : status === 'IN_USE' ? t('미사용') : t('임시저장');
        },
      },
    ],
  };

  const { provider, getValues } = useSearchBox(SearchBoxConfig());
  const { config, gridFetch } = useGridBox(gridBoxConfig);

  useEffect(() => {
    gridFetch(getValues());
  }, []);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          label={t('LABEL.button.regist')}
          variant="primary"
          size="sm"
          onClick={() => {
            router.navigate({
              to: '/external-education/view',
              // formId가 없으면 등록 모드
            });
          }}
        />
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={provider} onSearch={gridFetch} />
        <Divider />
        <GridBox
          config={config}
          multiple
          onRowsSelect={(rows: any) => {
            setSelectedRows(rows);
          }}
          customButtonNode={
            <>
              <Button
                // variant="text"
                size="sm"
                onClick={() => console.log(selectedRows)}
                disabled={selectedRows.length === 0}
              >
                미사용
              </Button>
              <Button
                // variant="text"
                size="sm"
                onClick={() => console.log(selectedRows)}
                disabled={selectedRows.length === 0}
              >
                사용
              </Button>
            </>
          }
        />
        {/* <ExternalEducationSimplePage /> */}
      </MainContents>
    </PageContainer>
  );
}
