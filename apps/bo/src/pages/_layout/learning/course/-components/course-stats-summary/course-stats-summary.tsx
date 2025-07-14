import { StatsSummary, StatsSummaryData } from '@learnway/ui';
import { HTMLAttributes } from 'react';

export interface CourseStatsSummaryComponentProps extends HTMLAttributes<HTMLDivElement> {
  courseId?: number;
}

export const CourseStatsSummary = ({ courseId, ...props }: CourseStatsSummaryComponentProps) => {
  const data = getStats(courseId);
  return <StatsSummary data={data} />;
};

const getStats = (courseId?: number): Array<StatsSummaryData> => [
  {
    label: '조회',
    value: 1000,
  },
  {
    label: '찜',
    value: 1000,
  },
  {
    label: '공유',
    value: 1000,
  },
  {
    label: '후기',
    value: 1000,
  },
  {
    label: '수강신청',
    value: 1000,
  },
  {
    label: '수강생',
    value: 1000,
  },
  {
    label: '이수',
    value: 1000,
  },
];
