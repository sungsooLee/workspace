import { useMutation, useQuery } from '@tanstack/react-query';
import { learningResourceQueryOptions, mutateOptions } from './learning-resource.queries';
import {
  BlogCreateReq,
  BlogUpdateReq,
  PostDraftHtmlVideoParams,
  PostDraftVideosParams,
} from '@types';

export function usePostDraftVideos(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.postDraftVideos(),
    ...options,
  });

  return {
    create: (payload: PostDraftVideosParams) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function usePostDraftHTMLVideo(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.postDraftHTML5(),
    ...options,
  });

  return {
    upload: (payload: PostDraftHtmlVideoParams) => mutation.mutate(payload as any),
  };
}

export function useFetchBlogContent(contentUuid: string, options?: any) {
  return useQuery({ ...learningResourceQueryOptions.getBlogContent(contentUuid), ...options });
}

export function useCreateBlogContent(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.createBlogContent(),
    ...options,
  });

  return {
    create: (payload: BlogCreateReq) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateBlogContent(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.updateBlogContent(),
    ...options,
  });

  return {
    update: (payload: BlogUpdateReq) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useDeleteContent(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.deleteContent(),
    onSuccess: (data) => {
      console.log('on success', data);
      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
    ...options,
  });

  return {
    ...mutation,
    delete: (contentUuid: string) => mutation.mutate(contentUuid as any),
  };
}
