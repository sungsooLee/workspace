import { CODE_GROUP, useSearchBox } from '@learnway/hooks';
import { cn, DATE_TIME_FORMAT, duration } from '@learnway/shared';
import { SearchBox } from '@shared/ui/search-box';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import {
  Button,
  Checkbox,
  GridBox,
  GridBoxPagination,
  useGridBox,
  useGridBoxConfig,
} from '@learnway/ui';
import { IcoClock01, IcoDownload, IcoFile01 } from '@learnway/icons';
import { t } from 'i18next';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { leaningResourceQueryOptions } from '../../../../entities/leaning-resource';
import { useQueryClient } from '@tanstack/react-query';

function LearningResourceTableComponent() {
  const queryClient = useQueryClient();

  const searchConfig: any = {
    builders: [
      [
        {
          name: 'tenantUuid',
          type: 'dropdown',
          label: t('LABEL.content.learning-resource.tenantName'),
          value: '',
          format: 'number',
          optionsConfig: {
            options: [{ value: '', label: t('선택') }],
            codeGroup: CODE_GROUP['manual.tenant.tenantId'],
          },
        },
        {
          name: 'channelUuid',
          type: 'dropdown',
          label: t('LABEL.content.learning-resource.channelName'),
          value: '',
          optionsConfig: {
            options: [
              { value: '', label: t('선택') },
              { value: 'channelA', label: t('채널A') },
              { value: 'channelB', label: t('채널B') },
              { value: 'channelC', label: t('채널C') },
              { value: 'channelD', label: t('채널D') },
              { value: 'channelE', label: t('채널E') },
              { value: 'channelF', label: t('채널F') },
            ],
          },
        },
        {
          name: 'contentTypes',
          type: 'dropdown',
          label: t('LABEL.content.learning-resource.contentType'),
          value: '',
          optionsConfig: {
            options: [{ value: '', label: t('전체') }],
            codeGroup: CODE_GROUP['cms.content.ContentType'],
          },
        },
        {
          name: 'contentName',
          type: 'text',
          label: t('학습자원명'),
          value: '',
        },
      ],
      [
        {
          name: 'isVendored',
          type: 'dropdown',
          label: t('외주여부'),
          value: '',
          optionsConfig: {
            options: [
              { value: '', label: t('전체') },
              { value: 'true', label: 'Y' },
              { value: 'false', label: 'N' },
            ],
          },
        },
        {
          name: 'useEnabledType',
          type: 'dropdown',
          label: t('LABEL.content.learning-resource.useEnabledType'),
          value: '',
          optionsConfig: {
            options: [{ value: '', label: t('전체') }],
            codeGroup: CODE_GROUP['cms.content.ContentUseEnabledType'],
          },
        },
        {
          name: 'isCourseUsed',
          type: 'dropdown',
          label: t('LABEL.content.learning-resource.isCourseUsed'),
          value: '',
          optionsConfig: {
            options: [
              { value: '', label: t('전체') },
              { value: 'true', label: 'Y' },
              { value: 'false', label: 'N' },
            ],
          },
        },
        {
          name: 'coordinatorName',
          type: 'text',
          label: t('LABEL.content.learning-resource.coordinatorName'),
          value: '',
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
      return leaningResourceQueryOptions.getContents({
        ...data,
        sort: 'contentUuid,desc',
        isMockUp: true,
      });
    },
    columns: [
      {
        size: 79,
        name: 'contentType',
        label: t('LABEL.content.learning-resource.contentType'),
        render: (_: any) => t(`cms.content.ContentType.${_.getValue()}`),
        meta: {
          size: 'auto',
        },
      },
      {
        size: 338,
        meta: { size: 'auto' },
        name: 'contentName',
        label: t('LABEL.content.learning-resource.contentName'),
      },
      {
        name: 'tenantName',
        label: t('LABEL.content.learning-resource.tenantName'),
        meta: {
          size: 'auto',
        },
      },
      {
        name: 'channelName',
        label: t('LABEL.content.learning-resource.channelName'),
        meta: {
          size: 'auto',
        },
      },
      {
        name: 'coordinatorName',
        label: t('LABEL.content.learning-resource.coordinatorName'),
        meta: {
          size: 'auto',
        },
      },
      {
        name: 'contentAddInfo',
        label: t('LABEL.content.learning-resource.detailInfo'),
        meta: {
          size: 'auto',
        },
        render: (_: any) => {
          console.log(_.row.original['contentAddInfoType']);
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
        label: t('LABEL.content.learning-resource.util'),
        render: () => '미리보기',
      },
      {
        size: 95,
        name: 'contentUseEnabledType',
        label: t('LABEL.content.learning-resource.useEnabledType'),
        render: (_: any) => t(`cms.content.ContentUseEnabledType.${_.getValue()}`),
      },
      {
        size: 100,
        name: 'langCountryCode',
        label: t('LABEL.content.learning-resource.localization'),
        render: (_: any) => t(`pms.multilingual.LangCountryCode.${_.getValue()}`),
      },
      {
        size: 79,
        name: 'updatedInfo',
        label: t('LABEL.content.learning-resource.updatedInfo'),
        render: () => '보기',
      },
    ],
  };

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const [tableInstance, setTableInstance] = useState<Table<any>>(); // Grid 로부터 받을 table 인스턴스를 저장할 상태
  const [pagination, setPagination] = useState<GridBoxPagination>({
    pageNumber: 0,
    pageSize: 20,
    totalPages: 1,
    onPageChange: (pageNumber: number) => setPagination((prev) => ({ ...prev, pageNumber })),
    onPageSizeChange: (pageSize: number) =>
      setPagination((prev) => ({ ...prev, pageSize, pageNumber: 0 })),
  });

  function handleSearch(query: Record<string, any>) {
    gridFetch(query, {
      page: pagination.pageNumber,
      size: pagination.pageSize,
    });
  }

  const handleFileDownload = (key: string, fileName: string) => {
    queryClient.fetchQuery(leaningResourceQueryOptions.getS3FileDownload(key, fileName));
  };

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox
            config={gConfig}
            data={data}
            showNumberingColumn
            multiple
            customButtonNode={
              <>
                <Checkbox size="sm" label={t('나의 학습자원')} />{' '}
                {/* 필터기능인듯? 글씨 크기가 혼자 작게 나옴 */}
                <Button
                  variant="outline"
                  size="sm"
                  label={t('프로그램/가이드 다운로드')}
                  icon={<IcoDownload width={16} height={16} stroke="#131C30" />}
                  onClick={() => handleFileDownload('public/logo.png', 'download.png')} // 가이드 파일 하드코딩?
                />
                <Button variant="outline" size="sm" label={t('일괄설정')} />
                <Button
                  variant="outline"
                  size="sm"
                  label={t('엑셀다운로드')}
                  icon={<IcoDownload width={16} height={16} stroke="#131C30" />}
                />
                <Button
                  variant="outline"
                  size="sm"
                  label={t('복사')}
                  icon={<IcoFile01 width={16} height={16} stroke="#131C30" />}
                />
                {/* 디자인과 다른 아이콘 - 변경 필요 */}
              </>
            }
            onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
            pagination={pagination}
          />
        </div>
      </div>
    </>
  );
}

export const LearningResourceTable = LearningResourceTableComponent;
