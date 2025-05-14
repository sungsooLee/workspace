import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { mutateOptions, queryOptions } from './course.queries';
import { Course, CourseQueryParams, MutationHookOptions } from '../../../types';
import { useModal } from '@learnway/ui';

/**
 * 모든 코스 목록을 가져오는 쿼리 훅.
 * @param params - 코스 목록 조회 쿼리 파라미터.
 */
export function useFetchCourses(params: CourseQueryParams): UseQueryResult<Course[], Error> {
  return useQuery(queryOptions.all(params));
}

/**
 * 특정 ID의 코스 정보를 가져오는 쿼리 훅.
 * @param id - 조회할 코스의 ID.
 */
export function useFetchCourse(id: number): UseQueryResult<Course, Error> {
  return useQuery(queryOptions.get(id));
}

/**
 * 새로운 코스를 생성하는 뮤테이션 훅.
 * 성공 시 'showSaveComplete' 모달을 표시합니다.
 * @param [options] - 추가 뮤테이션 설정 옵션.
 */
export const useCreateCourse = (
  options?: MutationHookOptions<Course, Error, Course, unknown>,
): UseMutationResult<Course, Error, Course, unknown> => {
  const { showSaveComplete } = useModal();
  return useMutation({
    ...mutateOptions.create(),
    ...options,
    onSuccess: async (data, variables, context) => {
      await showSaveComplete();
      // 추가적인 성공 처리 로직이 있다면 실행
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

/**
 * 기존 코스 정보를 업데이트하는 뮤테이션 훅.
 * 성공 시 'showUpdateComplete' 모달을 표시합니다.
 * @param [options] - 추가 뮤테이션 설정 옵션.
 */
export const useUpdateCourse = (
  options?: MutationHookOptions<Course, Error, Course, unknown>,
): UseMutationResult<Course, Error, Course, unknown> => {
  const { showUpdateComplete } = useModal();
  return useMutation({
    ...mutateOptions.update(),
    ...options,
    onSuccess: async (data, variables, context) => {
      await showUpdateComplete();
      // 추가적인 성공 처리 로직이 있다면 실행
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

/**
 * 기존 코스를 삭제하는 뮤테이션 훅.
 * 성공 시 'showDeleteComplete' 모달을 표시합니다.
 * @param [options] - 추가 뮤테이션 설정 옵션.
 */
export const useDeleteCourse = (
  options?: MutationHookOptions<any, Error, number, unknown>,
): UseMutationResult<any, Error, number, unknown> => {
  // 반환 타입 any는 실제 API 응답 타입으로 명시 권장
  const { showDeleteComplete } = useModal();
  return useMutation({
    ...mutateOptions.delete(),
    ...options,
    onSuccess: async (data, variables, context) => {
      await showDeleteComplete();
      // 추가적인 성공 처리 로직이 있다면 실행
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
