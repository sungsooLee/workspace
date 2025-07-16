import { useQuery } from '@tanstack/react-query';
import { useCurrentRoute } from '@learnway/hooks';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { PageMode } from '../-common/type';

const useExamLoaderData = () => {
  const {
    state: { mode = PageMode.CREATE, contentUuid = '' },
  } = useCurrentRoute();
  console.log('test paper route state', mode, contentUuid);

  const { data } = useQuery(learningResourceQueryOptions.getContent(contentUuid));

  const { data: hasMapping } = useQuery(
    learningResourceQueryOptions.getCurriculumsMapping(contentUuid),
  );

  return { contentUuid, data, hasMapping };
};

export { useExamLoaderData };
