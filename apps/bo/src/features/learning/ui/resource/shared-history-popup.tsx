import { leaningResourceQueryOptions } from '../../../../entities/leaning-resource';
import { t } from 'i18next';
import { GridBox, useGridBox } from '../../../../shared/ui/grid-box';
import { useEffect } from 'react';

const SharedHistoryPopupComponent = () => {
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

  useEffect(() => {
    gridFetch({});
  }, []);

  return (
    <div>
      <GridBox config={gConfig} />
    </div>
  );
};

export const SharedHistoryPopup = SharedHistoryPopupComponent;

const gridConfig = {
  query: leaningResourceQueryOptions.getSharedHistories,
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
    { name: 'sharedDt', label: t('공유일') },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
