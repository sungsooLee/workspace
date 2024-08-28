import { Chapter } from '@/features/chapter';
import { ChapterList } from '@/features/chapterList/ui/ChapterList';
import VideoPlayerContainer from '@/shared/components/VideoPlayer/ui/VideoPlayerContainer';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import useContentStore from '@/shared/stores/useContentStore';
import { FetchBoundary } from '@/shared/components/error/FetchErrorBoundary';
export type KitProps = {
  kitId: number;
};

export type KitInfo = {
  kitName: string;
  imageUrl: string;
  kitId: number;
  chapterList: Chapter[];
};

const getKit = async (props: KitProps) => {
  const { kitId } = props;
  const response = await axios.get(`/cms-module/admin/api/v1/kits/${kitId}`);
  return response.data;
};

export const KitContainer = (props: KitProps) => {
  const { kitId } = props;

  const [kit, setKit] = useState<KitInfo>();
  const [, updateState] = useState({});

  // const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const { setInitContent, fetchChapterList, chapterList } =
    useContentStore.getState();
  const videoState = useContentStore((state: any) => state.content);

  // useEffect(() => {
  //   setInitContent();
  //   const unsubscribe = useContentStore.subscribe(
  //     (state)=> state.chapterList,
  //     // (newChapterList)=>{
  //     //   updateState({});
  //     // }
  //   );

  //     return () => {
  //       unsubscribe();
  //       setInitContent();

  //     }
  // },[]);
  useEffect(() => {
    const unsubscribe = useContentStore.subscribe((state) => {
      console.log(state);
      updateState({}); // 빈 객체를 전달하여 상태 업데이트 트리거
    });
    setInitContent();

    return () => {
      unsubscribe();
      setInitContent();
    };
  }, []);

  // useEffect(()=>{

  // },[state])

  useEffect(() => {
    const fetchKit = async () => {
      const kitInfo = await getKit(props);
      const kit = kitInfo.data;
      setKit(kit);
      fetchChapterList(kit.chapterList);
    };
    fetchKit();
    // setInitContent();
  }, [kitId]);

  const memoizedVideoState = useMemo(() => videoState, [videoState]);

  // const sortedChapterList: Chapter[] = useMemo(() => {
  //   if (kit && kit.chapterList) {
  //     fetchChapterList(kit.chapterList); //z
  //     console.log(kit.kitId);
  //     return kit.chapterList
  //       .map((chapter) => ({
  //         ...chapter,
  //         kitId: kit.kitId,
  //       }))
  //       .sort((a, b) => a.seq - b.seq);
  //   }
  //   return [];
  // }, [kit]);
  // useEffect(() => {
  //   if (kit && kit.chapterList) {
  //     console.log(kit.chapterList);
  //     fetchChapterList(kit.chapterList); //z
  //   }
  // }, [kit]);

  const testChapterList: Chapter[] = useMemo(() => {
    console.log(chapterList);
    if (kit && chapterList && chapterList.length > 0) {
      return chapterList
        .map((chapter) => ({
          ...chapter,
          kitId: kit.kitId,
        }))
        .sort((a, b) => a.seq - b.seq);
    }
    return [];
  }, [chapterList]);

  // 강의 옮겼을때 비동기 응답으로 받은 콜백 함수 실행?

  return (
    <>
      <div>{kit?.kitName}</div>
      <div className='flex flex-row items-center'>
        <div className='w-full'>
          동영상 영역
          {videoState && videoState.url && (
            <FetchBoundary>
              <VideoPlayerContainer {...memoizedVideoState} />
            </FetchBoundary>
          )}
        </div>
        <div className='w-full'>
          {testChapterList && (
            <FetchBoundary>
              <ChapterList {...testChapterList} />
            </FetchBoundary>
          )}
        </div>
      </div>
    </>
  );
};
