import { GridBox, useGridBox } from '../../../../shared/ui/grid-box';
import { t } from 'i18next';
import { leaningResourceQueryOptions } from '../../../../entities/leaning-resource';
import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../../shared/ui/search-box';

const MappingCoursePopupComponent = () => {
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    gridFetch({});
  }, []);

  return (
    <div>
      <SearchBox provider={sProvider} onSearch={handleOnSearch} />
      <GridBox config={gConfig} />
    </div>
  );
};

export const MappingCoursePopup = MappingCoursePopupComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenant',
        type: 'dropdown',
        label: t('테넌트'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'channel',
        type: 'dropdown',
        label: t('채널'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'channelA', label: t('채널A') },
          { value: 'channelB', label: t('채널B') },
          { value: 'channelC', label: t('채널C') },
          { value: 'channelD', label: t('채널D') },
          { value: 'channelE', label: t('채널E') },
          { value: 'channelF', label: t('채널F') },
        ],
      },
      {
        name: 'type',
        type: 'dropdown',
        label: t('유형'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'video', label: t('동영상') },
          { value: 'ebook', label: t('이북') },
          { value: 'class', label: t('클래스') },
          { value: 'web', label: t('웹') },
        ],
      },
      {
        name: 'courseName',
        type: 'text',
        label: t('과정'),
        placeholder: t('과정명으로 조회하세요.'),
        value: '',
      },
    ],
  ],
};
const gridConfig = {
  query: leaningResourceQueryOptions.getLearningResources,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    {
      name: 'tenant',
      label: '테넌트',
    },
    { name: 'channel', label: t('채널') },
    { name: 'type', label: t('유형') },
    {
      name: 'leaningResourceName',
      label: t('과정명'),
      render: (info: any) => (
        <Link className={'text-blue-600'} to={'/menu/translation-detail'}>
          학습자원명
        </Link>
      ),
    },
    { name: 'learningPeriod', label: t('학습기간') },
    { name: 'courseDetail', label: t('과정상세보기') },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
