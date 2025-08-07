import { queryOptions } from '@entities/course-package/service/course-package.queries';
import { CODE_GROUP, getCodeLabel } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { useLocation } from '@tanstack/react-router';
import { t } from 'i18next';
import { CoursePackageListGridColumn } from '../types/type';

export const useCoursePackageListGridConfig = () => {
  const { pathname } = useLocation();
  const { alert } = useModal();

  const columns: CoursePackageListGridColumn[] = [
    // 테넌트
    {
      name: 'tenantName',
      label: () => t('LABEL.grid.column.tenant'),
      size: 120,
    },
    // 채널
    {
      name: 'channelName',
      label: () => t('LABEL.grid.column.channel'),
      size: 120,
    },
    // 패키지명
    {
      name: 'packageName',
      label: () => t('LABEL.grid.column.packageName'),
      size: 700,
    },
    // 사용
    {
      name: 'isUsed',
      label: () => t('LABEL.grid.column.use'),
      size: 60,
      render: (info: any) => getCodeLabel(CODE_GROUP['mock.options.use'], info.getValue()),
      meta: {
        cellAlign: 'center',
      },
    },
    // 미리보기
    {
      name: 'preview',
      label: () => t('LABEL.grid.column.preview'),
      size: 100,
      render: (info: any) => (
        <Button
          variant="text"
          size="sm"
          className="link"
          label={t('LABEL.grid.column.preview')}
          disabled={!info?.original?.isUsed}
          stopPropagation
          onClick={() => {
            alert('패키지 상세 페이지 이동');
          }}
        />
      ),
      meta: {
        cellAlign: 'center',
      },
    },
  ];

  return {
    title: t('LABEL.grid.title.packageList'),
    query: queryOptions.coursePackages,
    columns,
  };
};
