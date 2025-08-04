import { useQuery } from '@tanstack/react-query';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { useCurrentRoute } from '@learnway/hooks';
import { TestPaperBasicInfoDetail } from '@types';
import { learningResourceQueryOptions } from '@entities/learning-resource';

export const useExamLoaderData = () => {
  const { data: loginUser } = useFetchAuthUser();

  const tenantId = loginUser?.activeTenant?.tenantId ?? -1;

  const {
    state: { contentUuid = '', listParam },
  } = useCurrentRoute();

  const { data, refetch: refetchContentDetail } = useQuery(
    learningResourceQueryOptions.getContent<TestPaperBasicInfoDetail>(contentUuid),
  );

  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(contentUuid),
  );

  return { tenantId, contentUuid, data, refetchContentDetail, hasMapping, listParam };
};
