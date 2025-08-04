import { MutateOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getQuerySkipToken } from '@learnway/shared';
import { learningResourceApi } from '../api/learning-resource';
import { BlogResource, Content, EtcContentDownloadReq } from '../types/learning-resource.types';
import {
  CmsEtcResource,
  CmsImageResource,
  CmsScormRteScoInfo,
  CmsScormRteScoInfoReq,
  CmsVideoResource,
  CmsVideoWatchInitializeReq,
  CmsVideoWatchLogReq,
  CmsVideoWatchLogStatisticsReq,
} from '@learnway/types';

export const learningResourceQueryKeys = {
  all: ['learning-resource'] as const,
  content: (contentUuid: string) =>
    [...learningResourceQueryKeys.all, 'content', contentUuid] as const,
  progressMulti: (payload: any) => [
    ...learningResourceQueryKeys.all,
    'progress',
    ...Object.values(payload),
  ],
  blogResource: (contentUuid: string) =>
    [...learningResourceQueryKeys.all, 'blog', contentUuid] as const,
  etcResource: (contentUuid: string) =>
    [...learningResourceQueryKeys.all, 'etc', contentUuid] as const,
  html5Resource: (contentUuid: string) =>
    [...learningResourceQueryKeys.all, 'html5', contentUuid] as const,
  imageResource: (contentUuid: string) =>
    [...learningResourceQueryKeys.all, 'image', contentUuid] as const,
  videoWatchInitialize: (payload: any) =>
    [...learningResourceQueryKeys.all, 'video', ...Object.values(payload)] as const,

  scormScoInfo: (param?: any) => [
    ...learningResourceQueryKeys.all,
    'scorm',
    ...Object.values(param),
  ],
};

export const learningResourceQueryOptions = {
  content: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: learningResourceQueryKeys.content(contentUuid),
          queryFn: () => learningResourceApi.getContent(contentUuid),
        }
      : getQuerySkipToken<Content>(),

  blogResource: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: learningResourceQueryKeys.blogResource(contentUuid),
          queryFn: () => learningResourceApi.getBlogResource(contentUuid),
        }
      : getQuerySkipToken<BlogResource>(),

  etcResource: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: learningResourceQueryKeys.etcResource(contentUuid),
          queryFn: () => learningResourceApi.getEtcResource(contentUuid),
        }
      : getQuerySkipToken<CmsEtcResource>(),

  html5Resource: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: learningResourceQueryKeys.html5Resource(contentUuid),
          queryFn: () => learningResourceApi.getHtml5Resource(contentUuid),
        }
      : getQuerySkipToken<any>(),

  imageResource: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: learningResourceQueryKeys.imageResource(contentUuid),
          queryFn: () => learningResourceApi.getImageResource(contentUuid),
        }
      : getQuerySkipToken<CmsImageResource>(),

  videoWatchInitialize: (param?: CmsVideoWatchInitializeReq) =>
    param
      ? {
          queryKey: learningResourceQueryKeys.videoWatchInitialize(param),
          queryFn: () => learningResourceApi.videoWatchInitialize(param),
        }
      : getQuerySkipToken<CmsVideoResource>(),

  scormScoInfo: (param?: CmsScormRteScoInfoReq) =>
    param
      ? {
          queryKey: learningResourceQueryKeys.scormScoInfo(param),
          queryFn: () => learningResourceApi.getScormScoInfo(param),
        }
      : getQuerySkipToken<CmsScormRteScoInfo>(),
};

export const learningReousrceMutateOptions = {
  videoWatchLog: () => ({
    mutationFn: (payload: CmsVideoWatchLogReq) => learningResourceApi.videoWatchLog(payload),
  }),

  videoWatchLogStatistics: () => ({
    mutationFn: (payload: CmsVideoWatchLogStatisticsReq) =>
      learningResourceApi.videoWatchLogStatistics(payload),
  }),
};

export function useGetBlogResource(contentUuid?: string) {
  return useQuery(learningResourceQueryOptions.blogResource(contentUuid));
}

export function useGetContent(contentUuid?: string) {
  return useQuery(learningResourceQueryOptions.content(contentUuid));
}

/**
 * Etc content Download용
 * @returns
 */
export const useEtcContentManager = () => {
  const download = (param: EtcContentDownloadReq) => learningResourceApi.download(param);
  return {
    download,
  };
};

export function useGetEtcResource(contentUuid?: string) {
  return useQuery(learningResourceQueryOptions.etcResource(contentUuid));
}

export function useGetHtml5Resource(contentUuid?: string) {
  return useQuery(learningResourceQueryOptions.html5Resource(contentUuid));
}

export function useGetImageResource(contentUuid?: string) {
  return useQuery(learningResourceQueryOptions.imageResource(contentUuid));
}

export function useGetVideoWatchInitialize(payload?: any) {
  return useQuery(learningResourceQueryOptions.videoWatchInitialize(payload));
}

export function useGetScormScoInfo(param?: any) {
  return useQuery(learningResourceQueryOptions.scormScoInfo(param));
}

export function useVideoWatchLog(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const watch = useMutation({
    ...learningReousrceMutateOptions.videoWatchLog(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      // queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
    ...mutationOptions,
  });

  const statics = useMutation({
    ...learningReousrceMutateOptions.videoWatchLogStatistics(),
    ...mutationOptions,
  });

  return {
    watch,
    statics,
    videoWatchLog: (payload: any, options?: MutateOptions<unknown, unknown, any>) => {
      watch.mutate(payload, options);
    },
    videoWatchLogStatistics: (payload: any, options?: MutateOptions<unknown, unknown, any>) => {
      statics.mutate(payload, options);
    },
  };
}
