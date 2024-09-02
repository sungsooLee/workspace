import { Chapter } from '@/features/chapter';
import { ChapterList } from '@/features/chapterList/ui/ChapterList';
import VideoPlayerContainer from '@/shared/components/VideoPlayer/ui/VideoPlayerContainer';
import { useEffect, useMemo } from 'react';
import useContentStore from '@/shared/stores/useContentStore';
import { FetchBoundary } from '@/shared/components/error/FetchErrorBoundary';
import useGetKitQuery from '../queries/useGetKitQuery';
export type KitProps = {
  kitId: number;
};

export type KitInfo = {
  kitName: string;
  imageUrl: string;
  kitId: number;
  chapterList: Chapter[];
};

export const KitContainer = (props: KitProps) => {
  const { kitId } = props;
  const { data } = useGetKitQuery(props.kitId);
  const videoState = useContentStore((state: any) => state.content);
  const { setInitContent } = useContentStore();
  const memoizedVideoState = useMemo(() => videoState, [videoState]);
  const memoizedChapterList: Chapter[] = useMemo(() => {
    const kitInfo = data.data.data;
    const chapterList: Chapter[] = kitInfo.chapterList;
    if (chapterList && chapterList.length > 0) {
      return chapterList
        .map((chapter) => ({
          ...chapter,
          kitId: kitId,
        }))
        .sort((a, b) => a.seq - b.seq);
    }
    return [];
  }, [data]);

  useEffect(() => {
    return () => {
      setInitContent();
    };
  }, []);

  return (
    <>
      <div>{data.data.data?.kitName}</div>
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
          {memoizedChapterList && (
            <FetchBoundary>
              <ChapterList {...memoizedChapterList} />
            </FetchBoundary>
          )}
        </div>
      </div>
    </>
  );
};
