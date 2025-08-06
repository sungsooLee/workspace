// IA104 / NLP_BO_CMS_1045 학습자원 현지화-공유함
import {
  ContentExportRes,
  learningResourceQueryOptions,
  SharedBoxContent,
  usePostContentExport,
} from '@entities/learning-resource';
import {
  getDetailPathByContentType,
  getDetailRouterState,
  LearingResourceSharedInfoModal,
} from '@features/learning-resource';
import { useFetchAuthUser } from '@learnway/auth/entities';
import {
  ALL_OPTION,
  CODE_GROUP,
  compactValues,
  useCurrentRoute,
  useSearchBox,
} from '@learnway/hooks';
import { IcoDownArrow, IcoImport } from '@learnway/icons';
import { formatDate } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { ContentCreateType } from '@shared/types/enums';
import { PreviewLearningWindow } from '@shared/ui/modal';
import { SearchBox } from '@shared/ui/search-box';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

function LearningResourceSharedTableComponent() {
  const { data: authUser } = useFetchAuthUser();
  const {
    state: { listParam },
  } = useCurrentRoute();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal, confirm: openConfirm, alert: openAlert } = useModal();

  const { exportContent } = usePostContentExport({
    onSuccess: (result: ContentExportRes) => {
      if (result.destContentUuid) {
        router.navigate({
          to: '/learning/learning-resource',
          state: {
            listParam: {
              tenantId: result.destTenantId,
              channelUuid: result.destChannelUuid,
            },
          },
        });
      }
    },
    onError: async (error: any) => {
      console.error(error);
      await openAlert({
        title: t('가져갈 수 없는 교육자원입니다.'),
        content:
          //CMS_INAVLID_EXPORT_ENABLE_STATUS(400, "B234", 콘텐츠 사용가능상태가 아닌 콘텐츠는 내보내기가 허용되지 않습니다.
          error.code === 'B234'
            ? t('사용기한이 만료된 교육자원은 공유할 수 없습니다.')
            : // CMS_EXPORT_CONTENT_NOT_FOUND(404, "B235", 공유함에서 콘텐츠 데이터를 찾을 수 없습니다.
              error.code === 'B235'
              ? t(
                  "공유 해제한 교육자원은 가져갈 수 없습니다.\n'확인'선택시 공유함 목록에서 삭제됩니다.",
                )
              : error.message,
      });
      onFormChange(params);
      if (await onFormValid()) {
        handleSearch(getValues());
      }
    },
  });

  const handleShareButton = async (row: SharedBoxContent) => {
    const confirmed = await openConfirm({
      title: t('가져가시겠습니까?'),
      content: t("'확인' 선택 시 교육자원 목록으로 이동합니다."),
    });
    if (confirmed)
      exportContent({
        tenantId: row.destTenantId,
        contentUuid: row.sourceContentUuid,
        destChannelUuid: row.destChannelUuid,
        languageCountryCode: row.languageCountryCode,
      });
  };

  const searchConfig: any = {
    builders: [
      [
        {
          name: 'sourceTenantId',
          type: 'dropdown',
          label: t('발신 테넌트'),
          format: 'object',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          value: authUser?.activeTenant?.tenantId,
        },
        {
          name: 'sourceChannelUuid',
          type: 'dropdown',
          label: t('발신 채널'),
          format: 'object',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          value: '',
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
          label: t('LABEL.form.label.contentName', '교육자원명'),
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
          name: 'languageCountryCode',
          type: 'dropdown',
          label: t('LABEL.form.label.langCountryCode', '언어'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.all', '전체'),
          optionsConfig: {
            codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
          },
        },
        {
          name: 'sharedDate',
          type: 'date-range',
          label: t('공유된 기간'),
          value: { from: undefined, to: undefined },
          format: 'object',
        },
      ],
    ],
    validator: {
      sourceTenantId: true,
      sourceChannelUuid: true,
    },
  };

  const gridConfig: useGridBoxConfig = {
    query: ({ sharedDate, ...rawQuery }: Record<string, any>) => {
      const processedQuery = {
        ...compactValues(rawQuery),
        ...(sharedDate?.from && { sharedDateStart: formatDate(sharedDate.from) }),
        ...(sharedDate?.to && { sharedDateEnd: formatDate(sharedDate.to) }),
        lastVisitedBoRoleId: authUser?.activeRole?.roleId,
      };
      return learningResourceQueryOptions.getSharedBoxContents(processedQuery);
    },
    columns: [
      {
        size: 79,
        name: 'sourceContentType',
        label: t('LABEL.grid.column.contentType', '유형'),
        render: (_: any) => t(`cms.content.ContentType.${_.getValue()}`),
      },
      {
        size: 338,
        name: 'sourceContentName',
        label: t('LABEL.grid.column.contentName', '교육자원명'),
        meta: {
          size: 'auto',
        },
        render: (_: any) => (
          <span className="flex items-center">
            {_.row.original.contentCreateType === ContentCreateType.TRANSLATE && (
              <span className="mr-2">
                <IcoDownArrow width={16} height={16} stroke="#4C515E" />
              </span>
            )}
            {_.row.original.createType === ContentCreateType.SHARED && (
              <span className="mr-2">
                <IcoImport width={16} height={16} stroke="#4C515E" />
              </span>
            )}
            <Button
              className="link"
              onClick={(e) => {
                e.stopPropagation();
                router.navigate({
                  to: getDetailPathByContentType(_.row.original.sourceContentType),
                  state: {
                    ...getDetailRouterState(
                      _.row.original.sourceContentUuid,
                      _.row.original.sourceContentType,
                    ),
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
        name: 'destTenantName',
        label: t('수신 테넌트'),
        meta: {
          size: 'auto',
        },
      },
      {
        size: 153,
        name: 'destChannelName',
        label: t('수신 채널'),
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
                content: <PreviewLearningWindow contentUuid={_.row.original.sourceContentUuid} />,
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
        name: 'sharedCount',
        label: t('수신상태'),
        render: (_: any) =>
          _.getValue() ? (
            <Button
              className="link"
              onClick={(e) => {
                e.stopPropagation();
                openModal({
                  content: <LearingResourceSharedInfoModal data={_.row.original} />,
                });
              }}
            >
              {t('수신완료')}
            </Button>
          ) : (
            t('수신대기')
          ),
      },
      {
        size: 100,
        name: 'shareButtonUtil',
        label: t('LABEL.grid.column.util', '기능'),
        render: (_: any) => (
          <Button
            variant="gray2"
            onClick={() => handleShareButton(_.row.original)}
            disabled={!_.row.original.isContentEnabled}
          >
            {t('가져가기')}
          </Button>
        ),
      },
    ],
  };

  const {
    provider: searchProvider,
    getValues,
    setValue,
    onFormChange,
    onFormValid,
    watch,
    setOptions,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox<SharedBoxContent>(gridConfig, getValues);
  const [params, setParams] = useState<Record<string, any>>({});

  function handleSearch(data: Record<string, any>) {
    setParams(data);
    gridFetch(data);
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

  useEffect(() => {
    if (authUser && authUser.activeRole?.roleId)
      (async () => {
        const tenantOptions = await queryClient.fetchQuery(
          learningResourceQueryOptions.getSharedBoxTenantCodes(authUser.activeRole!.roleId),
        );
        const foundOption = tenantOptions.find((_) => _.tenantId === authUser.activeRole?.tenantId);
        setValue('sourceTenantId', foundOption ? authUser?.activeTenant?.tenantId : '');
        setOptions(
          'sourceTenantId',
          tenantOptions.map(({ tenantId: value, tenantName: label }) => ({ value, label })),
        );
      })();
  }, [authUser]);

  const sourceTenantId = watch('sourceTenantId');

  useEffect(() => {
    setValue('sourceChannelUuid', '');
    if (sourceTenantId === '') {
      setOptions('sourceChannelUuid', []);
      return;
    }
    (async () => {
      const channelOptions = await queryClient.fetchQuery(
        learningResourceQueryOptions.getSharedBoxChannelCodes(sourceTenantId),
      );
      setOptions(
        'sourceChannelUuid',
        channelOptions.map(({ channelUuid: value, channelName: label }) => ({ value, label })),
      );
    })();
  }, [sourceTenantId]);

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleSearch} />
      <Divider />
      <GridBox<SharedBoxContent>
        config={gConfig}
        showNumberingColumn
        getRowClassName={(row) => {
          if (row.contentCreateType === ContentCreateType.TRANSLATE) return 'bg-[--secondary9]';
          return '';
        }}
      />
    </>
  );
}

export const LearningResourceSharedTable = LearningResourceSharedTableComponent;
