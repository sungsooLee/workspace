import { ALL_OPTION, CODE_GROUP, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, duration } from '@learnway/shared';
import { SearchBox } from '@shared/ui/search-box';
import {
  Button,
  Divider,
  GridBox,
  Tooltip,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import { IcoClock01, IcoCopy, IcoDownload, IcoAlertCircle } from '@learnway/icons';
import { t } from 'i18next';
import { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { ModifierInfoModal } from './learning-resource-modifier-info-modal';
import { ProgramGuideModal } from './learning-resource-program-guide-modal';
import { BatchSettingModal } from './learning-resource-batch-setting-modal';
import { first, get, map, some, uniq } from 'lodash';
import { CopyModal } from './learning-resource-copy-modal';
import { useRouter } from '@tanstack/react-router';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { useWatch } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

function LearningResourceTableComponent() {
  const router = useRouter();
  const { open: openModal, alert } = useModal();

  const queryClient = useQueryClient();
  const { data: user } = useFetchAuthUser();

  const searchConfig: any = {
    builders: [
      [
        {
          name: 'tenantUuid',
          type: 'dropdown',
          label: t('LABEL.form.label.tenant', '테넌트'),
          value: '',
          format: 'number',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'channelUuid',
          type: 'dropdown',
          label: t('LABEL.form.label.channel', '채널'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
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
          name: 'isVendored',
          type: 'dropdown',
          label: t('LABEL.form.label.isVendored', '외주여부'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.all', '전체'),
          optionsConfig: {
            options: [
              { value: 'true', label: 'Y' },
              { value: 'false', label: 'N' },
            ],
          },
        },
        {
          name: 'isContentEnabled',
          type: 'dropdown',
          label: t('LABEL.form.label.isContentEnabled', '사용가능'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.all', '전체'),
          optionsConfig: {
            options: [
              { value: 'true', label: 'Y' },
              { value: 'false', label: 'N' },
            ],
          },
        },
        {
          name: 'isCourseUsed',
          type: 'dropdown',
          label: t('LABEL.form.label.isCourseUsed', '교육활용'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.all', '전체'),
          optionsConfig: {
            options: [
              { value: 'true', label: 'Y' },
              { value: 'false', label: 'N' },
            ],
          },
        },
        {
          name: 'coordinatorName',
          type: 'text',
          label: t('LABEL.form.label.coordinator', '담당자'),
          value: '',
        },
      ],
      [
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
          name: 'createdBy',
          type: 'text',
          label: t('LABEL.form.label.createdBy', '등록자'),
          value: '',
        },
        {
          type: 'empty',
        },
        {
          type: 'empty',
        },
      ],
    ],
    validator: {
      tenantUuid: true,
      channelUuid: true,
    },
  };

  const gridConfig: useGridBoxConfig = {
    query: (data: any) => {
      return learningResourceQueryOptions.getContents({
        ...data,
        isMockUp: true,
      });
    },
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
          <Button
            className="link"
            onClick={(e) => {
              e.stopPropagation();
              // 유형별 상세 화면으로 이동해야 함
              router.navigate({ to: '/learning_test/resource/view/video' });
            }}
          >
            {_.getValue()}
          </Button>
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
        size: 104,
        name: 'coordinatorName',
        label: t('LABEL.grid.column.coordinator', '담당자'),
      },
      {
        size: 125,
        name: 'contentAddInfo',
        label: t('LABEL.grid.column.contentAddInfo', '세부정보'),
        render: (_: any) => {
          if (_.row.original.contentAddInfoType !== 'VIDEO_ADD_INFO')
            // enum code 사용하도록 변경해야 함
            return `${_.getValue()}${t('개')}`;

          return (
            <span className="flex">
              <IcoClock01 width={16} height={16} stroke="#131C30" />{' '}
              {duration(_.getValue(), DATE_TIME_FORMAT.HOUR_MIN_SEC)}
            </span>
          );
        },
      },
      {
        size: 137,
        name: 'util',
        label: t('LABEL.grid.column.util', '기능'),
        render: (_: any) => (
          <span>
            <Button
              className="link"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {t('LABEL.grid.column.preview', '미리보기')}
            </Button>
            {
              /* 시험지, 문제은행, 설문지 */
              ['EXAM', 'EXAM_POOL', 'SURVEY'].includes(_.row.original.contentType) && (
                <Button
                  className="link"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {t('LABEL.grid.column.questionManage', '문항관리')}
                </Button>
              )
            }
          </span>
        ),
      },
      {
        size: 95,
        name: 'isContentEnabled',
        label: t('LABEL.grid.column.isContentEnabled', '사용가능'),
        render: (_: any) => (_.getValue() ? 'Y' : 'N'),
      },
      {
        size: 83,
        name: 'langCountryCode',
        label: t('LABEL.grid.column.translation', '번역'),
        render: (_: any) => t(`pms.multilingual.LangCountryCode.${_.getValue()}`),
      },
      {
        size: 79,
        name: 'modifiedDate',
        label: t('LABEL.grid.column.updatedInfo', '수정정보'),
        render: (_: any) => (
          <Button
            className="link"
            onClick={(e) => {
              e.stopPropagation();
              openModal({
                width: 'sm',
                content: (
                  <ModifierInfoModal
                    lastModifiedBy={_.row.original.lastModifiedBy}
                    modifiedDate={_.getValue()}
                  />
                ),
              });
            }}
          >
            {t('LABEL.form.label.view', '보기')}
          </Button>
        ),
      },
    ],
    // gridState: {
    //   sort: ['modifiedDate,desc'], // 버그 발생함 state가 꼬여있음. sort를 지정하면 row 선택이 되지 않음.
    // },
  };

  const { provider: searchProvider, getValues, setOptions, setValue } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [tableInstance, setTableInstance] = useState<Table<any>>(); // Grid 로부터 받을 table 인스턴스를 저장할 상태

  //user정보로 tenant 설정
  useEffect(() => {
    if (!user) return;

    if (user.activeTenant) setValue('tenantUuid', user.activeTenant.tenantId ?? '');
    setOptions(
      'tenantUuid',
      user.tenants.map((tenant) => ({ value: tenant.tenantId, label: tenant.tenantName })),
    );
  }, [user]);

  // tenant 정보로 channel 설정
  const tenantUuid = useWatch({ control: searchProvider.control, name: 'tenantUuid' });
  useEffect(() => {
    console.log('🚀 ~ LearningResourceTableComponent ~ tenantUuid:', tenantUuid);
    if (!tenantUuid && tenantUuid !== 0) return;

    (async () => {
      const { content } = await queryClient.fetchQuery(
        learningResourceQueryOptions.getChannelsByTenantId(tenantUuid),
      );
      setValue('channelUuid', '');
      if (content)
        setOptions(
          'channelUuid',
          content.map((_: any) => ({ value: _.channelUuid, label: _.channelName })),
        );
    })();
  }, [tenantUuid]);

  function handleSearch(query: Record<string, any>) {
    gridFetch(query);
  }

  function handleShare() {
    console.log('🚀 ~ handleShare ~ getValues():', getValues());
    console.log('🚀 ~ handleShare ~ data:', data);
  }

  function openProgramGuide() {
    openModal({
      width: 'md',
      content: <ProgramGuideModal />,
    });
  }

  function openBatchSetting() {
    const selectedContentTypes = map(selectedRows, 'contentType');
    if (uniq(selectedContentTypes).length !== 1) {
      return alert({
        title: t('LABEL.alert.contentTypeNotMatched.title', '같은 유형의 학습자원들을 선택하세요.'),
        content: t(
          'LABEL.alert.contentTypeNotMatched.content',
          '일괄설정은 같은 유형의 학습자원들에서만 적용됩니다.',
        ),
      });
    }

    const selectedIsCourseUsed = map(selectedRows, 'isCourseUsed');
    if (some(selectedIsCourseUsed)) {
      // API로 체크하도록 변경해야 함
      return alert({
        title: t('LABEL.alert.isCourseUsed.title', '교육과정에서 사용 중입니다.'),
        content: t('LABEL.alert.isCourseUsed.content', '사용 중인 학습자원은 일괄설정 불가합니다.'),
      });
    }

    openModal({
      width: 'xl',
      content: <BatchSettingModal />,
    });
  }

  function handleCopy() {
    if (selectedRows.length !== 1) {
      return alert({
        title: t('LABEL.alert.canNotCopy.title', '1개의 학습자원을 선택하세요'),
        content: t('LABEL.alert.canNotCopy.content', '복사기능은 1개의 학습자원들서만 적용됩니다.'),
      });
    }

    openModal({
      width: 's',
      hideCloseButton: true,
      content: <CopyModal />,
    });
  }

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        showNumberingColumn
        multiple
        showExpandColumn
        onRowsSelect={setSelectedRows}
        customButtonNode={
          <>
            <Button
              variant="text"
              label={t('LABEL.grid.header.share', '공유')}
              disabled={
                selectedRows.length !== 1 ||
                !data?.content?.find(
                  (_: any) => _.contentUuid === get(first(selectedRows), 'contentUuid'),
                ) // child
              }
              onClick={handleShare}
            />
            <Button
              variant="text"
              label={t('LABEL.grid.header.guideDownload', '프로그램/가이드 다운로드')}
              icon={<IcoDownload width={16} height={16} stroke="#4C515E" />}
              onClick={openProgramGuide}
            />
            <span className="type_tooltip">
              <Button
                variant="text"
                label={t('LABEL.grid.header.batchSetting', '일괄설정')}
                disabled={selectedRows.length === 0}
                onClick={openBatchSetting}
              />
              <Tooltip
                side="bottom"
                align="start"
                content={
                  <pre>
                    {t(
                      'LABEL.grid.tooltip.batchSetting',
                      '학습자원의 담당자, 사용기한, 공유채널설정, \n교육자원활용, 보안콘텐츠 적용, 검수진행을 \n한번에 할 수 있어요.',
                    )}
                  </pre>
                }
              >
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Tooltip>
            </span>
            <Button
              variant="text"
              label={t('LABEL.grid.header.excelDownload', '엑셀 다운로드')}
              icon={<IcoDownload width={16} height={16} stroke="#4C515E" />}
            />
            <Button
              variant="text"
              label={t('LABEL.grid.header.copy', '복사')}
              icon={<IcoCopy width={16} height={16} stroke="#4C515E" />}
              disabled={
                selectedRows.length !== 1 ||
                !data?.content?.find(
                  (_: any) => _.contentUuid === get(first(selectedRows), 'contentUuid'),
                ) // child
              }
              onClick={handleCopy}
            />
          </>
        }
        onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
      />
    </>
  );
}

export const LearningResourceTable = LearningResourceTableComponent;
