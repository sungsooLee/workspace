import { queryOptions } from '@entities/course/service/course.queries';
import { CODE_GROUP, getCodeLabel } from '@learnway/hooks';
import { Link } from '@tanstack/react-router';
import { CoursesQueryParams } from '@types';
import { t } from 'i18next';
import { CourseGridColumn } from './type';

export const createGridConfig = () => {
  const columns: CourseGridColumn[] = [
    // 테넌트
    {
      name: 'tenantName',
      label: () => t('LABEL.grid.column.tenant'),
      size: 140,
    },
    // 채널
    {
      name: 'channelName',
      label: () => t('LABEL.grid.column.channel'),
      size: 90,
    },
    // 과정코드
    {
      name: 'courseId',
      label: () => t('LABEL.grid.column.courseCode'),
      size: 90,
    },
    // 개설연도
    {
      name: 'openingYear',
      label: () => t('LABEL.grid.column.openingDate'),
      size: 90,
    },
    // 과정유형
    {
      name: 'courseType',
      label: () => t('LABEL.grid.column.courseType'),
      size: 90,
      render: (info: any) => getCodeLabel(CODE_GROUP['lms.course.CourseType'], info.getValue()),
    },
    // 찜
    {
      name: 'isBookmarks',
      label: () => t('LABEL.grid.column.favorite'),
      size: 40,
    },
    // 과정명
    {
      name: 'courseName',
      label: () => t('LABEL.grid.column.courseName'),
      size: 300,
      render: ({ row }: any) => {
        const { courseId, wizardStep, courseName } = row.original || {};
        const url =
          wizardStep === 'FULL_UPDATE'
            ? '/learning/course/detail/view' // 상세 페이지 (5단계 저장 이후)
            : '/learning/course/create/view'; // 상세 상세 (5단계 저장 이전)
        return (
          <Link to={url} state={{ courseId }} className="link">
            {courseName}
          </Link>
        );
      },
    },
    // 사용
    {
      name: 'isUsed',
      label: () => t('LABEL.grid.column.use'),
      size: 90,
    },
    // 차수
    {
      name: 'sequenceCount',
      label: () => t('LABEL.grid.column.session'),
      size: 90,
    },
    // 조회
    {
      name: 'viewCount',
      label: () => t('LABEL.grid.column.search'),
      size: 90,
    },
    // 좋아요
    {
      name: 'likesCount',
      label: () => t('LABEL.grid.column.like'),
      size: 90,
    },
    // 공유
    {
      name: 'shareCount',
      label: () => t('LABEL.grid.column.share'),
      size: 90,
    },
    // 후기
    {
      name: 'reviewCount',
      label: () => t('LABEL.grid.column.review'),
      size: 90,
    },
    // 수강생
    {
      name: 'studentCount',
      label: () => t('LABEL.grid.column.student'),
      size: 90,
    },
    // 담당자
    {
      name: 'coordinatorName',
      label: () => t('LABEL.grid.column.manager'),
      size: 90,
    },
    // 운영자
    {
      name: 'operatorName',
      label: () => t('LABEL.grid.column.operator'),
      size: 90,
    },
    // 미리보기
    {
      name: 'preview',
      label: () => t('LABEL.grid.column.preview'),
      size: 90,
    },
    // URL
    {
      name: 'url',
      label: () => t('LABEL.grid.column.url'),
      size: 90,
    },
  ];

  return {
    title: t('LABEL.grid.title.courseList'),
    query: queryOptions.all<CoursesQueryParams>,
    columns,
  };
};
