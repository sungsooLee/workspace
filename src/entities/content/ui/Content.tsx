import { Content } from '../model/types';
import { getContent } from '../api';
import useContentStore from '@/shared/stores/useContentStore';
// import { useCallApi } from '@/shared/hooks/useCallApi';
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

//   // addVideoChangeEvent();
//   if (
//     isReady &&
//     !isBuffering &&
//     seekPendingRef.current &&
//     state.duration > 0
//   ) {
//     initSubtitle();
//     if (videoType === 'youtube') {
//       const startTime = state.lastPlayedTime * state.duration;
//       playerRef.current?.getInternalPlayer()?.cueVideoById({
//         videoId: getYouTubeVideoId(initialState.url as string),
//         startSeconds: startTime,
//       });
//     } else {
//       // console.log(playerRef.current.getInternalPlayer());
//       playerRef.current?.seekTo(state.lastPlayedTime);
//     }
//     seekPendingRef.current = false;
//     setIsLoading(false);
//   }
// },
// ]);
