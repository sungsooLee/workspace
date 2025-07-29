// IA104 / NLP_BO_CMS_1045 학습자원 현지화-공유함
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { getDetailPathByContentType, getDetailRouterState } from '@features/learning-resource';
import {
  ALL_OPTION,
  CODE_GROUP,
  compactValues,
  useCurrentRoute,
  useSearchBox,
} from '@learnway/hooks';
import { IcoDownArrow } from '@learnway/icons';
import { Button, Divider, GridBox, useGridBox, useGridBoxConfig, useModal } from '@learnway/ui';
import {
  PreviewLearningWindow,
  TenantByRoleDropdownFormField,
  TenantChannelDropdownFormField,
} from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useRouter } from '@tanstack/react-router';
import { ContentCreateType, ContentInfo } from '@types';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

function LearningResourceSharedTableComponent() {
  const {
    state: { listParam },
  } = useCurrentRoute();

  const router = useRouter();
  const { openModal } = useModal();

  const searchConfig: any = {
    builders: [
      [
        {
          name: 'tenantId',
          type: 'custom',
          label: t('LABEL.form.label.tenant', '테넌트'),
          value: '',
          format: 'object',
          element: <TenantByRoleDropdownFormField />,
        },
        {
          name: 'channelUuid',
          type: 'custom',
          label: t('LABEL.form.label.channel', '채널'),
          value: '',
          format: 'object',
          element: <TenantChannelDropdownFormField enableFilter />,
        },
        {
          name: 'contentTypes',
          type: 'dropdown',
          label: t('LABEL.form.label.contentType', '유형'),
          value: [ALL_OPTION],
          isMulti: true,
          variant: 'text',
          presetOptionLabel: t('LABEL.form.label.all', '전체'),
          optionsConfig: {
            codeGroup: CODE_GROUP['cms.content.ContentType'],
          },
        },
        {
          name: 'contentName',
          type: 'text',
          label: t('LABEL.form.label.contentName', '학습자원명'),
          value: '',
        },
      ],
      [
        {
          name: 'isContentEnabled',
          type: 'dropdown',
          label: t('LABEL.form.label.isContentEnabled', '사용가능'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.all', '전체'),
          optionsConfig: {
            options: [
              { value: 'true', label: t('사용가능') },
              { value: 'false', label: t('사용불가') },
            ],
          },
        },
        {
          name: 'langCountryCode',
          type: 'dropdown',
          label: t('LABEL.form.label.langCountryCode', '언어'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          optionsConfig: {
            codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
          },
        },
        {
          name: 'isReceived',
          type: 'dropdown',
          label: t('수신상태'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.all', '전체'),
          optionsConfig: {
            options: [
              { value: 'false', label: t('수신대기') },
              { value: 'true', label: t('수신완료') },
            ],
          },
        },
        {
          name: 'shared-period',
          type: 'date-range',
          label: t('공유된 기간'),
          value: { from: undefined, to: undefined },
        },
      ],
    ],
    validator: {
      tenantId: true,
      channelUuid: true,
    },
  };

  const gridConfig: useGridBoxConfig = {
    query: learningResourceQueryOptions.getContents,
    columns: [
      {
        size: 79,
        name: 'contentType',
        label: t('LABEL.grid.column.contentType', '유형'),
        render: (_: any) => t(`cms.content.ContentType.${_.getValue()}`),
      },
      {
        size: 338,
        name: 'contentName',
        label: t('LABEL.grid.column.contentName', '학습자원명'),
        meta: {
          size: 'auto',
        },
        render: (_: any) => (
          <span className="flex">
            {_.row.original.createType === ContentCreateType.TRANSLATE && (
              <IcoDownArrow width={16} height={16} stroke="#4C515E" />
            )}
            <Button
              className="link"
              onClick={(e) => {
                e.stopPropagation();
                router.navigate({
                  to: getDetailPathByContentType(_.row.original.contentType),
                  state: {
                    ...getDetailRouterState(_.row.original.contentUuid, _.row.original.contentType),
                    listParam: params,
                  },
                });
              }}
            >
              {_.getValue()}
            </Button>
          </span>
        ),
      },
      {
        size: 127,
        name: 'tenantName',
        label: t('LABEL.grid.column.tenant', '테넌트'),
        meta: {
          size: 'auto',
        },
      },
      {
        size: 153,
        name: 'channelName',
        label: t('LABEL.grid.column.channel', '채널'),
        meta: {
          size: 'auto',
        },
      },
      {
        size: 137,
        name: 'preview',
        label: t('LABEL.grid.column.preview', '미리보기'),
        render: (_: any) => (
          <Button
            className="link"
            onClick={(e) => {
              e.stopPropagation();
              openModal({
                width: 'full',
                content: <PreviewLearningWindow contentUuid={_.row.original.contentUuid} />,
              });
            }}
          >
            {t('LABEL.grid.column.preview', '미리보기')}
          </Button>
        ),
      },
      {
        size: 95,
        name: 'isContentEnabled',
        label: t('LABEL.grid.column.isContentEnabled', '사용가능'),
        render: (_: any) => (_.getValue() ? t('사용가능') : t('사용불가')),
      },
      {
        size: 83,
        name: 'languageCountryCode',
        label: t('언어'),
        render: (_: any) => t(`pms.multilingual.LangCountryCode.${_.getValue()}`),
      },
      {
        size: 104,
        name: 'sharerName',
        label: t('공유자'),
      },
      {
        size: 100,
        name: 'isReceived',
        label: t('수신상태'),
        render: (_: any) => (_.getValue() ? t('수신완료') : t('수신대기')),
      },
      {
        size: 100,
        name: 'isReceived',
        label: t('LABEL.grid.column.util', '기능'),
        render: (_: any) => (
          <Button variant="gray2" disabled={_.getValue()}>
            {t('가져가기')}
          </Button>
        ),
      },
    ],
  };

  const {
    provider: searchProvider,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox<ContentInfo>(gridConfig, getValues);
  const [params, setParams] = useState<Record<string, any>>({});

  function handleSearch(rawQuery: Record<string, any>) {
    const processedQuery = compactValues(rawQuery);

    setParams(processedQuery);
    gridFetch(processedQuery);
  }

  useEffect(() => {
    if (!listParam) return;
    onFormChange(listParam);

    (async () => {
      if (await onFormValid()) {
        handleSearch(getValues());
      }
    })();
  }, [listParam]);

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleSearch} />
      <Divider />
      <GridBox<ContentInfo>
        config={gConfig}
        showNumberingColumn
        getRowClassName={(row) => {
          if (row.createType === ContentCreateType.TRANSLATE) return 'bg-[--secondary9]';
          return '';
        }}
      />
    </>
  );
}

export const LearningResourceSharedTable = LearningResourceSharedTableComponent;
