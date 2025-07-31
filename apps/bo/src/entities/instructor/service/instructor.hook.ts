import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryOptions, mutateOptions as instructorMutateOptions } from './instructor.queries';
import { roleMutateOptions } from '@entities/role';
export function useFetchInstructors(param: any) {
  return useQuery(queryOptions.all(param));
}

export function useCreateTutor(options: any) {
  const { mutateAsync, isSuccess, isError, data } = useMutation({
    ...instructorMutateOptions.createTutor(),
    ...options });

  return {
    create: async (payload: any, callback?: any) => {
      await mutateAsync(payload, callback);
    },
    isSuccess,
    isError,
    data };
}

export function useCreateUser(options: any) {
  const { mutateAsync, isSuccess, isError, data } = useMutation({
    ...roleMutateOptions.modifyUserToRole(),
    ...options });

  return {
    create: async (payload: any, callback?: any) => {
      await mutateAsync(payload, callback);
    },
    isSuccess,
    isError,
    data };
}

export function useCreateInstructor(options: any) {
  const { mutateAsync, isSuccess, isError, data } = useMutation({
    ...instructorMutateOptions.createInstructor(),
    ...options });

  return {
    create: async (payload: any, callback?: any) => {
      await mutateAsync(payload, callback);
    },
    isSuccess,
    isError,
    data };
}

export function useUpdateInstructor(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...instructorMutateOptions.updateInstructor(),
    ...options });

  return {
    update: (payload: any, callback?: any) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
    data };
}

export function useDeleteInstructor(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...instructorMutateOptions.deleteInstructor(),
    ...options });

  return {
    delete: (payload: any, callback?: any) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
    data };
}
