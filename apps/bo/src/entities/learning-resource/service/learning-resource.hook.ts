import { useMutation, useQuery } from '@tanstack/react-query';
import { learningResourceQueryOptions, mutateOptions } from './learning-resource.queries';
import {
  BlogCreateReq,
  BlogUpdateReq,
  ContentBaseInfo,
  HtmlVideoFileChangeReq,
  HtmlVideoMetadataReq,
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

export function useUpdateHTML5Metadata(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.updateHTML5Metadata(),
    ...options,
  });

  return {
    update: (payload: HtmlVideoMetadataReq) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useChangeHTML5VideoFile(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.updateHTML5FileChange(),
    ...options,
  });

  return {
    change: (payload: HtmlVideoFileChangeReq) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
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

export function useCreateQuestionBankContent(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.createQuestionBankContent(),
    ...options,
  });

  return {
    create: (payload: ContentBaseInfo, options?: any) => mutation.mutate(payload as any, options),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
