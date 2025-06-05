import { CODE_GROUP, useSearchBox } from '@learnway/hooks';
import { cn } from '@learnway/shared';
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

  function handleSearch(data: Record<string, any>) {
    gridFetch(data, { page: pagination.pageNumber, size: pagination.pageSize });
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
            data={[
              // mock -> api로 변경 필요
              {
                contentType: 'VIDEO',
                contentName: '학습자원명',
                tenantName: '테넌트',
                channelName: '채널',
                coordinatorName: '담당자',
                isCourseUsed: true,
                isUseEnabled: true,
                localization: 'ko',
              },
              {
                contentType: 'VIDEO',
                contentName: '학습자원명',
                tenantName: '테넌트',
                channelName: '채널',
                coordinatorName: '담당자',
                isCourseUsed: false,
                isUseEnabled: true,
                localization: 'ko',
              },
              {
                contentType: 'IMAGE',
                contentName: '학습자원명',
                tenantName: '테넌트',
                channelName: '채널',
                coordinatorName: '담당자',
                isCourseUsed: true,
                isUseEnabled: false,
                localization: 'ko',
              },
            ]}
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

const searchConfig: any = {
  builders: [
    [
      {
        name: 'tenant',
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
        name: 'channel',
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
        name: 'contentType',
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
            { value: 'Y', label: 'Y' },
            { value: 'N', label: 'N' },
          ],
        },
      },
      {
        name: 'isUseEnabled',
        type: 'dropdown',
        label: t('사용가능'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'available', label: t('사용가능') },
          { value: 'expired', label: t('사용기한 만료') },
          { value: 'unavailable', label: t('사용불가') },
        ],
      },
      {
        name: 'isCourseUsed',
        type: 'dropdown',
        label: t('LABEL.content.learning-resource.isCourseUsed'),
        value: '',
        optionsConfig: {
          options: [
            { value: '', label: t('전체') },
            { value: 'Y', label: 'Y' },
            { value: 'N', label: 'N' },
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
    tenant: true,
    channel: true,
  },
};

const gridConfig: useGridBoxConfig = {
  excel: {
    download: '/learning-resource/exportExcel',
    form: {
      xlsx: '',
      csv: '',
    },
  },
  query: (data: any) => {
    console.log('🚀 gridConfig.query ~ data:', data);
    return leaningResourceQueryOptions.getContents({ ...data, isMockUp: true });
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
      name: 'detailInfo',
      label: t('LABEL.content.learning-resource.detailInfo'),
      meta: {
        size: 'auto',
      },
      render: (_: any) => (
        <span className="flex">
          <IcoClock01 width={16} height={16} stroke="#131C30" /> 02:00:00
          {/* 컨텐츠 타입 별로 다르게 나오는듯 - 비디오 러닝타임 */}
        </span>
      ),
    },
    {
      size: 137,
      name: 'util',
      label: t('LABEL.content.learning-resource.util'),
      render: () => '미리보기',
    },
    {
      size: 95,
      name: 'isUseEnabled',
      label: t('LABEL.content.learning-resource.isUseEnabled'),
      render: (_: any) => (_.getValue() ? 'Y' : 'N'),
    },
    {
      size: 100,
      name: 'localization',
      label: t('LABEL.content.learning-resource.localization'),
      render: (_: any) => t(`CODE.LANGUAGE_CODE.${_.getValue()}`),
    },
    {
      size: 79,
      name: 'updatedInfo',
      label: t('LABEL.content.learning-resource.updatedInfo'),
      render: () => '보기',
    },
  ],
};
