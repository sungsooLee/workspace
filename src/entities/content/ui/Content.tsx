import { Content } from '../model/types';
import { getContent } from '../api';
import useContentStore from '@/shared/stores/useContentStore';
import { useSuspenseQuery } from '@tanstack/react-query';
const getContentFunc = (contentId: number) => getContent(contentId);

export const ContentRender = (props: Content) => {
  const fetchContent = useContentStore((state: any) => state.setContent);

  const { data } = useSuspenseQuery({
    queryKey: ['getContent', props.contentId],
    queryFn: () => getContentFunc(props.contentId),
  });
  // 컨텐츠 안에 챕터 정보도 들고있어야됨.
  const contentClickEvent = async () => {
    const contentData = data.data.children[0];
    if (contentData) {
      fetchContent({
        duration: contentData.duration,
        url: contentData.filePath,
        contentId: contentData.contentId,
        chapterId: props?.chapterId,
        kitId: props?.kitId,
        sequenceId: props?.seq,
        lastPlayedTime: props?.playRateByEndTime,
      });
    }
  };

  return (
    <>
      <div
        className='cursor-pointer bg-slate-100'
        onClick={() => {
          contentClickEvent();
        }}
      >
        {props.contentName}
        <p>{props?.videoProgressStatus}</p>
        <p>{props.status ? '- 컨텐츠 상태 : ' + props.status : ''}</p>
      </div>
    </>
  );
};
