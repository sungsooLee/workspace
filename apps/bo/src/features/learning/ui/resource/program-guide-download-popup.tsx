import { leaningResourceQueryOptions } from '../../../../entities/leaning-resource';
import { t } from 'i18next';
import { GridBox, useGridBox } from '../../../../shared/ui/grid-box';
import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';

const ProgramGuideDownloadPopupComponent = () => {
  const { config, gridFetch } = useGridBox(gridConfig);

  useEffect(() => {
    gridFetch({});
  }, []);

  return (
    <div>
      <GridBox config={config} />
    </div>
  );
};

export const ProgramGuideDownloadPopup = ProgramGuideDownloadPopupComponent;

const gridConfig = {
  query: leaningResourceQueryOptions.getProgramGuideDownload,
  columns: [
    {
      name: 'fileName',
      label: '파일명',
    },
    {
      name: 'download',
      label: t('다운로드'),
      render: (info: any) => (
        <button type={'button'} className={'text-blue-600 underline'}>
          다운로드
        </button>
      ),
    },
  ],
  data: [],
};
