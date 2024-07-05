import { CommentProps } from '@/components/video/comments';
import axiosInstance from '@/lib/utils/axios';
import { useCallback, useEffect, useState } from 'react';

const useComments = (videoId: string | undefined, pageSize: number) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [testMode, setTestMode] = useState(false);

  const fetchComments = useCallback(
    async (page: number) => {
      if (!testMode && (!videoId || isLastPage)) return;
      setLoading(true);
      try {
        const delay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        await delay(500); // 0.5초 지연 시간 추가 - 로딩화면 보이기 위해서
        let url = `/api/video/comment/${videoId}`;
        let testUrl = `/api/video/comments`;
        const response = await axiosInstance.get(testMode ? testUrl : url, {
          params: { page, pageSize },
        });
        setComments((prevComments) => [
          ...prevComments,
          ...response.data.comments,
        ]);
        setIsLastPage(response.data.isLastPage);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [videoId, pageSize, isLastPage, testMode]
  );

  const callSaveCommentApi = () => {};

  const addComment = (newComment: CommentProps) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  useEffect(() => {
    fetchComments(page);
  }, [fetchComments, page]);

  return {
    comments,
    fetchComments,
    loading,
    setPage,
    isLastPage,
    addComment,
    setTestMode,
    testMode,
  };
};

export default useComments;
