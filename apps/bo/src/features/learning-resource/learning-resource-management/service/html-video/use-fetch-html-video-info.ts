import { useQuery } from '@tanstack/react-query';
import { useCurrentRoute } from '@learnway/hooks';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { learningResourceQueryOptions } from '@entities/learning-resource';

export const useFetchHtmlVideoInfo = () => {
  const { state } = useCurrentRoute();
  const { data: loginUser } = useFetchAuthUser();

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(state?.contentUuid),
  );

  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(state?.contentUuid),
  );

  const { data: htmlStatus } = useQuery(
    learningResourceQueryOptions.getHTML5Status(state?.contentUuid),
  );

  return {
    loginUser,
    contentUuid: state?.contentUuid,
    data,
    hasMapping,
    htmlStatus,
    listParam: state?.listParam,
  };
};
