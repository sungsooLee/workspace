import { useQuery } from '@tanstack/react-query';
import { useCurrentRoute } from '@learnway/hooks';
import { learningResourceQueryOptions } from '@entities/learning-resource';

export const useAssignmentLoaderData = () => {
  const {
    state: { mode = 'CREATE', contentUuid = '', listParam },
  } = useCurrentRoute();

  const { data, refetch: refetchContentDetail } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );

  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(contentUuid),
  );

  return { mode, contentUuid, listParam, data, refetchContentDetail, hasMapping };
};
