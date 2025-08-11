import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  BlogCreateReq,
  BlogUpdateReq,
  ContentBaseInfo,
  ContentExportReq,
  ExamPaperQuestionCountUpdateReq,
  HtmlVideoFileChangeReq,
  HtmlVideoMetadataReq,
  PostDraftETCParams,
  PostDraftHtmlVideoParams,
  PostDraftScormParams,
  PostDraftVideosParams,
  PostShareContentsParams,
  PutETCChangeParams,
  PutETCUpdateParams,
  PutScormChangeParams,
  PutScormUpdateParams,
  PutVideoChangeParams,
  PutVideoUpdateParams,
  QuestionItem,
  QuestionItemDeleteParam,
  QuestionsCopyReq,
  QuestionSortReq,
  QuestionStatusUpdateReq,
  TestPaperBasicInfoSaveReq,
  UpdateQuestionBankCountInfoReq,
} from '../model/learning-resource.types';
import {
  learningResourceQueryOptions,
  mutateOptions,
  queryKeys,
} from './learning-resource.queries';

export function usePostContentCopy(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.postContentCopy(),
    ...options,
  });

  return {
    create: (contentUuid: string) => mutation.mutate(contentUuid as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function usePostContentExport(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.postContentExport(),
    ...options,
  });

  return {
    exportContent: (payload: ContentExportReq) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

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

export function usePostDraftScorm(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.postDraftScorm(),
    ...options,
  });

  return {
    create: (payload: PostDraftScormParams) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function usePostDraftETC(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.postDraftETC(),
    ...options,
  });

  return {
    create: (payload: PostDraftETCParams) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function usePutVideoUpdate(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.putVideoUpdate(),
    ...options,
  });

  return {
    update: (payload: PutVideoUpdateParams) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function usePutScormUpdate(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.putScormUpdate(),
    ...options,
  });

  return {
    update: (payload: PutScormUpdateParams) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function usePutETCUpdate(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.putETCUpdate(),
    ...options,
  });

  return {
    update: (payload: PutETCUpdateParams) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function usePutVideoChange(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.putVideoChange(),
    ...options,
  });

  return {
    update: (payload: PutVideoChangeParams) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function usePutScormChange(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.putScormChange(),
    ...options,
  });

  return {
    update: (payload: PutScormChangeParams) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function usePutETCChange(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.putETCChange(),
    ...options,
  });

  return {
    update: (payload: PutETCChangeParams) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function usePostShareContents(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.postShareContents(),
    ...options,
  });

  return {
    create: (payload: PostShareContentsParams) => mutation.mutate(payload as any),
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

export function useCreateExamPaperContent(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.createExamPaperContent(),
    ...options,
  });

  return {
    create: (payload: TestPaperBasicInfoSaveReq) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateExamPaperContent(options?: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.updateExamPaperContent(),
    onSuccess: async (result: unknown) => {
      if (result) {
        await queryClient.invalidateQueries({
          queryKey: [...queryKeys.contentDetail(result as string)],
        });

        if (options.onSuccess) {
          options.onSuccess(result);
        }
      }
    },
    ...options,
  });

  return {
    update: (payload: TestPaperBasicInfoSaveReq) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
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

export function useUpdateQuestionBankContent(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.updateQuestionBankContent(),
    ...options,
  });

  return {
    update: (payload: ContentBaseInfo, options?: any) => mutation.mutate(payload as any, options),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateQuestionBankQuestionCountInfo(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.updateQuestionBankQuestionCountInfo(),
    ...options,
  });

  return {
    update: (payload: UpdateQuestionBankCountInfoReq) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

export function useCreateQuestionItem(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.createQuestionItem(),
    ...options,
  });

  return {
    create: (payload: QuestionItem, options?: any) => mutation.mutate(payload as any, options),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
export function useGetQuestionItem(examQuestionUuid?: string, options?: any) {
  return useQuery<QuestionItem, any>({
    ...learningResourceQueryOptions.getQuestionItem(examQuestionUuid),
    ...options,
  });
}
export function useGetContent(contentUuid: string, options?: any) {
  return useQuery({ ...learningResourceQueryOptions.getContent(contentUuid), ...options });
}

export function useGetQuestionItemList(examPoolUuid?: string, options?: any) {
  return useQuery<QuestionItem[], any>({
    ...learningResourceQueryOptions.getQuestionItemList(examPoolUuid),
    ...options,
  });
}

export function useDeleteQuestionItemList(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.deleteQuestionItemList(),
    ...options,
  });

  return {
    ...mutation,
    delete: (params: QuestionItemDeleteParam) => mutation.mutate(params as any),
  };
}

export function useUpdateQuestionStatus(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.updateQuestionStatus(),
    ...options,
  });

  return {
    update: (params: QuestionStatusUpdateReq) => mutation.mutate(params as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

export function useUpdateExamPaperQuestionCount(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.updateExamPaperQuestionCountInfo(),
    ...options,
  });

  return {
    update: (params: ExamPaperQuestionCountUpdateReq) => mutation.mutate(params as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

export function useCopyQuestionsToExamPaper(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.copyQuestionsToExamPaper(),
    ...options,
  });

  return {
    copy: (params: QuestionsCopyReq) => mutation.mutate(params as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

export function useChangeQuestionOrder(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.changeQuestionOrder(),
    ...options,
  });

  return {
    sort: (params: QuestionSortReq) => mutation.mutate(params as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

export function useCreateAssignment(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.createAssignment(),
    ...options,
  });

  return {
    create: (params: ContentBaseInfo) => mutation.mutate(params as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

export function useUpdateAssignment(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.updateAssignment(),
    ...options,
  });

  return {
    update: (params: ContentBaseInfo) => mutation.mutate(params as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}
