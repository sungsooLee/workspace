import { useQuery } from '@tanstack/react-query';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { useCurrentRoute } from '@learnway/hooks';
import { TestPaperBasicInfoDetail } from '@types';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { PageMode } from '../-common/type';

const useExamLoaderData = () => {
  const { data: loginUser } = useFetchAuthUser();

  const tenantId = loginUser?.activeTenant?.tenantId ?? -1;

  const {
    state: { mode = PageMode.CREATE, contentUuid = '' },
  } = useCurrentRoute();
  console.log('test paper route state', mode, contentUuid);

  const { data } = useQuery(
    learningResourceQueryOptions.getContent<TestPaperBasicInfoDetail>(contentUuid),
  );

  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(contentUuid),
  );

  return { mode, tenantId, contentUuid, data, hasMapping };
};

export { useExamLoaderData };
