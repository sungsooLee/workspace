import { useFetchCourseCounts } from '@entities/course';
import { StatsSummary, StatsSummaryData } from '@learnway/ui';
import { CourseCounts } from '@types';
import { HTMLAttributes } from 'react';
import { t } from 'i18next';

export interface CourseStatsSummaryComponentProps extends HTMLAttributes<HTMLDivElement> {
  courseId: number;
}

export const CourseStatsSummary = ({ courseId, ...props }: CourseStatsSummaryComponentProps) => {
  const { data } = useFetchCourseCounts(courseId);
  const summaryData = getSummaryData(data);
  return <StatsSummary data={summaryData} />;
};

const getSummaryData = (data?: CourseCounts): Array<StatsSummaryData> => {
  if (!data) return [];

  return [
    {
      label: t('조회'),
      value: data.viewCount,
    },
    {
      label: t('찜'),
      value: data.bookmarkCount,
    },
    {
      label: t('공유'),
      value: data.shareCount,
    },
    {
      label: t('후기'),
      value: data.reviewCount,
    },
    {
      label: t('수강신청'),
      value: data.enrollmentCount,
    },
    {
      label: t('수강생'),
      value: data.studentCount,
    },
    {
      label: t('이수'),
      value: data.completeCount,
    },
  ];
};
