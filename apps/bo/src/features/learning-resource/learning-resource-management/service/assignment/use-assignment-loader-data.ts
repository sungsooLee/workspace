import { useQuery } from '@tanstack/react-query';
import { useCurrentRoute } from '@learnway/hooks';
import { learningResourceQueryOptions } from '@entities/learning-resource';

export const useAssignmentLoaderData = () => {
  const {
    state: { contentUuid = '', listParam },
  } = useCurrentRoute();

  const { data, refetch: refetchContentDetail } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );

  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(contentUuid),
  );

  return { contentUuid, listParam, data, refetchContentDetail, hasMapping };
};
