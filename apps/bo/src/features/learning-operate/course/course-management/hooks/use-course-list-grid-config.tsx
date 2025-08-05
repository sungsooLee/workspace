import { CoursesQueryParams } from '@entities/course';
import { queryOptions } from '@entities/course/service/course.queries';
import { CODE_GROUP, getCodeLabel } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { ShortUrlCopyButton } from '@shared/ui';
import { Link, useLocation } from '@tanstack/react-router';
import { t } from 'i18next';
import { CourseGridColumn } from '../types/type';
import { CourseFavoriteIcon } from '../ui/course-favorite-icon/course-favorite-icon';

export const useCourseListGridConfig = () => {
  const { pathname } = useLocation();
  const { alert } = useModal();

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
      meta: {
        cellAlign: 'right',
      },
    },
    // 개설연도
    {
      name: 'openingYear',
      label: () => t('LABEL.grid.column.openingDate'),
      size: 90,
      meta: {
        cellAlign: 'center',
      },
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
      render: ({ row, getValue }) => {
        return <CourseFavoriteIcon courseId={row?.original?.courseId} isFavorite={getValue()} />;
      },
      meta: {
        cellAlign: 'center',
      },
    },
    // 과정명
    {
      name: 'courseName',
      label: () => t('LABEL.grid.column.courseName'),
      size: 300,
      render: ({ row }: any) => {
        const { courseId, courseName } = row.original || {};
        const url = getDetailUrl(row, pathname);
        return (
          <Link
            to={url}
            state={{ courseId, courseName, meta: { title: courseName } }}
            className="link"
          >
            {courseName}
          </Link>
        );
      },
    },
    // 언어
    {
      name: 'language',
      label: () => t('LABEL.grid.column.language'),
      size: 90,
      render: (info: any) =>
        getCodeLabel(CODE_GROUP['pms.multilingual.LangCountryCode'], info.getValue()),
      meta: {
        cellAlign: 'center',
      },
    },
    // 사용
    {
      name: 'isUsed',
      label: () => t('LABEL.grid.column.use'),
      size: 90,
      render: (info: any) => getCodeLabel(CODE_GROUP['mock.options.use'], info.getValue()),
      meta: {
        cellAlign: 'center',
      },
    },
    // 차수
    {
      name: 'sequenceCount',
      label: () => t('LABEL.grid.column.session'),
      size: 90,
      meta: {
        cellAlign: 'right',
      },
    },
    // 조회
    {
      name: 'viewCount',
      label: () => t('LABEL.grid.column.search'),
      size: 90,
      meta: {
        cellAlign: 'right',
      },
    },
    // 좋아요
    {
      name: 'likesCount',
      label: () => t('LABEL.grid.column.like'),
      size: 90,
      meta: {
        cellAlign: 'right',
      },
    },
    // 공유
    {
      name: 'shareCount',
      label: () => t('LABEL.grid.column.share'),
      size: 90,
      meta: {
        cellAlign: 'right',
      },
    },
    // 후기
    {
      name: 'reviewCount',
      label: () => t('LABEL.grid.column.review'),
      size: 90,
      meta: {
        cellAlign: 'right',
      },
    },
    // 수강생
    {
      name: 'studentCount',
      label: () => t('LABEL.grid.column.student'),
      size: 90,
      meta: {
        cellAlign: 'right',
      },
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
      render: (info: any) => (
        <Button
          variant="text"
          size="sm"
          className="link"
          label={t('LABEL.grid.column.preview')}
          disabled={!info?.original?.isUsed}
          stopPropagation
          onClick={() => {
            alert('준비중입니다.');
          }}
        />
      ),
      meta: {
        cellAlign: 'center',
      },
    },
    // URL
    {
      name: 'url',
      label: () => t('LABEL.grid.column.url'),
      size: 90,
      render: (info: any) => (
        <ShortUrlCopyButton url={`original url`} params={{ courseId: info?.original?.courseId }} />
      ),
      meta: {
        cellAlign: 'center',
      },
    },
  ];

  return {
    title: t('LABEL.grid.title.courseList'),
    query: queryOptions.all<CoursesQueryParams>,
    columns,
  };
};

/**
 * row와 pathname을 받아 해당 row의 상세 페이지 URL을 반환합니다.
 *
 * @param {any} row - 그리드의 행 데이터 객체
 * @param {string} pathname - 현재 페이지의 경로
 * @returns {string} - 상세 페이지로 이동할 URL
 *
 * - 수강관리 화면이면 '/learning/learning-sequence/enrollment-application' 반환
 * - wizardStep이 'FULL_UPDATE'이면 '/learning/course/detail' 반환 (5단계 저장 이후)
 * - 그 외에는 '/learning/course/create' 반환 (5단계 저장 이전)
 */
const getDetailUrl = (row: any, pathname: string): string => {
  const { wizardStep } = row.original || {};

  // 수강관리 화면
  if (pathname === '/learning/course/management') {
    return '/learning/learning-sequence/enrollment-application'; // 수강관리 > 수강신청 관리 페이지
  }

  // 과정 등록 완료 (5단계 저장 이후)ㄴ
  if (wizardStep === 'FULL_UPDATE') {
    return '/learning/course/detail'; // 과정관리 > 상세 페이지
  }

  return '/learning/course/create'; // 과정관리 > 등록 페이지
};
