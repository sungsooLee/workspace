import { useCurrentRoute } from '@learnway/hooks';
import { useQuery } from '@tanstack/react-query';
import { learningResourceQueryOptions } from '@entities/learning-resource';

export const useFetchBlogInfo = () => {
  const { state } = useCurrentRoute();

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(state?.contentUuid),
  );

  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(state?.contentUuid),
  );

  return {
    mode: state?.mode,
    contentUuid: state?.contentUuid,
    data,
    hasMapping,
    listParam: state?.listParam };
};
