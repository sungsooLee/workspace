import { fetchCommnetApi, saveCommentApi } from '@/features/comment-list';
import useComments from '@/features/comment-list/hooks/use-comments';
import CommentList from '@/features/comment-list/ui/commen-list';
import VideoList from '@/features/video/ui/video-list';
import VideoPlayer from '@/features/video/ui/video-player';
import Spinner from '@/shared/components/Spinner/spinner';
import fetchData from '@/shared/utils/fetchData';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const videoResource = fetchData('/api/channel/test/videos');
const VideoDetail = () => {
  const navigate = useNavigate();
  const res = videoResource.read();
  const videos = res?.data?.items;
  const [videoInfo, setVideoInfo] = useState<Video | null>(null);
  const { id } = useParams<{ id: string }>();
  const userEmail = sessionStorage.getItem('user') || '';
  const {
    comments,
    incrementPage,
    loading,
    isLastPage,
    addComment,
    deleteComment,
    isFetchingNextPage,
    reset,
  } = useComments(id, 10, fetchCommnetApi, saveCommentApi);

  // 무한 스크롤을 위한 설정
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || isLastPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            incrementPage();
          }
        },
        { threshold: 0.1 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, isLastPage]
  );

  const handleCommentSubmit = async (comment: string) => {
    const email = sessionStorage.getItem('user') || '';
    const newComment = { email, comment, id: id };
    return addComment(newComment);
  };

  useEffect(() => {
    const video = videos.filter(
      (tmp: { id: number }) => tmp.id === parseInt(id!)
    );
    setVideoInfo(video[0]);
    reset();
  }, [id]);
  const handleVideoClick = (videoId: number) => {
    navigate(`/my/video/${videoId}`);
  };

  return (
    <div key={id} className='flex flex-col overflow-hidden md:flex-row'>
      <div className='w-full flex-[6_6_0%] p-4 md:flex md:flex-col'>
        <div className='relative mb-4 min-w-200pxr'>
          <VideoPlayer videoId={id || ''} userId={userEmail} />
        </div>
        <div>
          {videos.length && (
            <VideoList videos={videos} onClick={handleVideoClick} />
          )}
        </div>
      </div>

      <div className='flex-[4_4_0%] p-4 md:flex md:flex-col md:pl-4'>
        <div className='mb-4'>
          <h1 className='text-xl font-bold'>{videoInfo?.course?.title}</h1>
        </div>
        <div className='flex-1 p-4'>
          <CommentList
            comments={comments}
            onSubmit={handleCommentSubmit}
            onDelete={deleteComment}
          />
          {(loading || isFetchingNextPage) && (
            <div className='py-4'>
              <Spinner />
            </div>
          )}
          <div ref={lastElementRef}></div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
