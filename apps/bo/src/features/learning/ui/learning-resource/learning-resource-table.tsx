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
  useModal,
} from '@learnway/ui';
import { IcoClock01, IcoCopy, IcoDownload } from '@learnway/icons';
import { t } from 'i18next';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { leaningResourceQueryOptions } from '@entities/leaning-resource';
import { ModifierInfoModal } from './learning-resource-modifier-info-modal';
import { ProgramGuideModal } from './learning-resource-program-guide-modal';

function LearningResourceTableComponent() {
  const { open: openModal } = useModal();

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
      },
      {
        size: 338,
        name: 'contentName',
        label: t('LABEL.content.learning-resource.contentName'),
        meta: {
          size: 'auto',
        },
      },
      {
        size: 127,
        name: 'tenantName',
        label: t('LABEL.content.learning-resource.tenantName'),
        meta: {
          size: 'auto',
        },
      },
      {
        size: 153,
        name: 'channelName',
        label: t('LABEL.content.learning-resource.channelName'),
        meta: {
          size: 'auto',
        },
      },
      {
        size: 104,
        name: 'coordinatorName',
        label: t('LABEL.content.learning-resource.coordinatorName'),
      },
      {
        size: 125,
        name: 'contentAddInfo',
        label: t('LABEL.content.learning-resource.detailInfo'),
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
        size: 83,
        name: 'langCountryCode',
        label: t('LABEL.content.learning-resource.localization'),
        render: (_: any) => t(`pms.multilingual.LangCountryCode.${_.getValue()}`),
      },
      {
        size: 79,
        name: 'updatedInfo',
        label: t('LABEL.content.learning-resource.updatedInfo'),
        render: () => (
          <Button
            className="link"
            label={t('보기')}
            onClick={(e) => {
              e.stopPropagation();
              openModal({ width: 'sm', content: <ModifierInfoModal /> }); //lastModifierBy로 받아온 user uuid를 props로 넘겨야 함
            }}
          />
        ),
      },
    ],
  };

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [tableInstance, setTableInstance] = useState<Table<any>>(); // Grid 로부터 받을 table 인스턴스를 저장할 상태

  function handleSearch(query: Record<string, any>) {
    gridFetch(query);
  }

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox
            config={gConfig}
            showNumberingColumn
            multiple
            customButtonNode={
              <>
                <Checkbox size="md" label={t('나의 학습자원')} />
                {/* 필터기능인듯? 글씨 크기가 혼자 작게 나옴 */}
                <Button
                  label={t('프로그램/가이드 다운로드')}
                  icon={<IcoDownload width={16} height={16} stroke="#4C515E" />}
                  onClick={() =>
                    openModal({
                      width: 'md',
                      content: <ProgramGuideModal />,
                    })
                  }
                />
                <Button variant="text" label={t('일괄설정')} />
                <Button
                  label={t('엑셀다운로드')}
                  icon={<IcoDownload width={16} height={16} stroke="#4C515E" />}
                />
                <Button
                  label={t('복사')}
                  icon={<IcoCopy width={16} height={16} stroke="#131c30" />}
                />
              </>
            }
            onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
          />
        </div>
      </div>
    </>
  );
}

export const LearningResourceTable = LearningResourceTableComponent;
