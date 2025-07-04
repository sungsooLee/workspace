import { LEARNING_TYPE } from '@learnway/config';
import { useMutation } from '@tanstack/react-query';
import { mutateOptions } from './learning-resource.queries';
import { PostDraftVideosParams } from '@types';

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
