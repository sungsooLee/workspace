import { CommentProps } from '@/components/video/comments';
import { useCallback, useEffect, useState } from 'react';

const useComments = (
  id: string | undefined,
  pageSize: number,
  fetchCommentsApi: (
    id: string,
    page: number,
    pageSize: number
  ) => Promise<any>,
  saveCommentsApi: (
    newComment: Omit<CommentProps, 'regDt'>
  ) => Promise<CommentProps>,
  testFetchCommentsApi: (page: number, pageSize: number) => Promise<any>
) => {
  const reset = useCallback(() => {
    setIsLastPage(false);
    setPage(0);
    setLoading(true);
    setComments([]);
  }, []);

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [testMode, setTestMode] = useState(false);

  const fetchComments = useCallback(
    async (page: number) => {
      if (!testMode && (!id || isLastPage)) return;
      setLoading(true);
      try {
        const delay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        await delay(500); // 0.5초 지연 시간 추가 - 로딩화면 보이기 위해서
        const response = testMode
          ? await testFetchCommentsApi(page, pageSize)
          : await fetchCommentsApi(id!, page, pageSize);
        setComments((prevComments) => [...prevComments, ...response.comments]);
        setIsLastPage(response.isLastPage);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [id, pageSize, isLastPage, testMode, fetchCommentsApi]
  );

  const addComment = async (newComment: Omit<CommentProps, 'regDt'>) => {
    try {
      const savedComment = await saveCommentsApi(newComment);
      setComments((prevComments) => [...prevComments, savedComment]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset();
  }, [id, reset]);

  useEffect(() => {
    fetchComments(page);
  }, [fetchComments, page, id]);

  return {
    comments,
    fetchComments,
    loading,
    setPage,
    isLastPage,
    addComment,
    setTestMode,
    testMode,
    reset,
  };
};

export default useComments;
