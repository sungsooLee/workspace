import { fetchCommnetApi, saveCommentApi } from '@/features/commentList';
// import VideoList from '@/features/video/ui/video-list';
import Spinner from '@/shared/components/Spinner/spinner';
import fetchData from '@/shared/utils/fetchData';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useComments from '@/features/commentList/hooks/useComments';
import VideoList from '@/features/videoList/ui/VideoList';
import CommentList from '@/features/commentList/ui/CommentList';
import VideoPlayerContainer from '@/shared/components/VideoPlayer/ui/VideoPlayerContainer';

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
          <VideoPlayerContainer
            getAllowSeek={true}
            lastPlayed={0}
            // videoUrl='https://d1lfq3h9g82ibj.cloudfront.net/test.mp4' //mp4
            // videoUrl='https://vimeo.com/90509568' //vimeo
            // videoUrl='	https://test-videos.co.uk/vids/bigbuckbunny/webm/vp8/360/Big_Buck_Bunny_360_10s_1MB.webm' //webm
            // videoUrl='https://filesamples.com/samples/video/ogv/sample_640x360.ogv' //ogv
            videoUrl='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
            // videoUrl='https://www.youtube.com/watch?v=ZCae_LPuzBU'
            // videoUrl={'https://www.youtube.com/watch?v=ZCae_LPuzBU#t=240'}
          />
          {/* <VideoPlayer videoId={id || ''} /> */}
        </div>
        <div>
          {videos.length && (
            <VideoList videos={videos} onClick={handleVideoClick} size={240} />
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
