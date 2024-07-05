import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Comments from '@/components/video/comments';
import VideoPlayer from '@/components/video/video-player';
import useComments from '@/hooks/use-comments';
import axiosInstance from '@/lib/utils/axios';
import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const VideoDetail = () => {
  const [inputComment, setInputComment] = useState('');
  const { id } = useParams<{ id: string }>();
  const {
    comments,
    setPage,
    loading,
    isLastPage,
    addComment,
    setTestMode,
    testMode,
  } = useComments(id, 10);

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      //댓글 등록하는 API
      const email = sessionStorage.getItem('user');
      const response = await axiosInstance.post('/api/video/comment', {
        email: email,
        comment: inputComment,
        id: id,
      });
      setInputComment('');
      addComment(response.data);
      console.log(response);
    }
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(e.target.value);
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || isLastPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 0.1 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, isLastPage]
  );

  return (
    <div className='flex flex-col overflow-hidden md:flex-row'>
      <div className='flex-[7_7_0%] p-4 md:flex md:flex-col'>
        <div className='relative mb-4'>
          <VideoPlayer />
        </div>
        <div>동영상 목록</div>
      </div>

      <div className='flex-[3_3_0%] p-4  md:flex md:flex-col md:pl-4'>
        <div className='mb-4'>
          <h1 className='text-xl font-bold'>제목</h1>
          <p className='text-gray-700'>설명</p>
        </div>
        <div className='flex-1 p-4'>
          <h2 className='text-lg font-bold mb-4'>댓글</h2>
          <div>
            {testMode ? (
              <Button onClick={() => setTestMode(!testMode)}>
                mock data off
              </Button>
            ) : (
              <Button onClick={() => setTestMode(!testMode)}>
                mock data on
              </Button>
            )}
          </div>
          <Input
            placeholder='댓글 추가....'
            onKeyDown={(e) => onKeyDown(e)}
            value={inputComment}
            onChange={handleCommentChange}
          />
          <Comments comments={comments} />
          {loading && <div className='text-center py-4'>Loading...</div>}
          <div ref={lastElementRef}></div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
