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

  // 컨텐츠 내보내기(번역/공유) 가능 여부
  // const { data: sharingInfo } = useQuery(
  //   learningResourceQueryOptions.getContentSharingInfo({
  //     contentUuid: state?.contentUuid,
  //     tenantId: state?.listParam?.tenantId,
  //     channelUuid: state?.listParam?.channelUuid,
  //   }),
  // );

  return {
    loginUser,
    contentUuid: state?.contentUuid,
    data,
    hasMapping,
    htmlStatus,
    listParam: state?.listParam,
  };
};
