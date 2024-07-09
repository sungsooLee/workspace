import { deleteCommentApi } from '@/api/comment';
import { CommentProps, CommentsProps } from '@/components/video/comments';
import commentKeys from '@/constants/queryKeys/comment-query';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

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
  ) => Promise<CommentsProps>
) => {
  const queryClient = useQueryClient();

  // 댓글 데이터 패칭 함수
  const fetchComments = async ({ pageParam = 0 }) => {
    // const delay = (ms: number) =>
    //   new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(1000); // 로딩 화면 확인을 위해서 0.5초 지연
    return fetchCommentsApi(id!, pageParam, pageSize);
  };

  // useInfiniteQuery 훅을 사용하여 무한 스크롤 처리
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: commentKeys.all(id!), // 쿼리 키
    queryFn: fetchComments, // 쿼리 함수
    initialPageParam: 0, // 초기 페이지 파라미터
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLastPage) {
        return lastPage.nextCursor;
      }
      return false;
    },
    enabled: !!id, // id값이 존재할 때만 쿼리 활성화
  });

  // useMutation 훅을 사용해서 새로운 댓글을 추가하는 뮤테이션
  const addCommentMutation = useMutation({
    mutationFn: saveCommentsApi,
    onSuccess: () => {
      //성공하면 쿼리 무효화해서 리페칭 -> 최신 데이터 유지.
      queryClient.invalidateQueries({
        queryKey: commentKeys.all(id!),
      });
    },
  });
  const addComment = async (newComment: Omit<CommentProps, 'regDt'>) => {
    return addCommentMutation.mutateAsync(newComment);
  };

  const deleteCommentMutation = useMutation({
    mutationFn: deleteCommentApi,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.all(id!),
      });
    },
  });

  const deleteComment = async (commentId: string) => {
    return deleteCommentMutation.mutateAsync(commentId);
  };

  return {
    comments: data?.pages.flatMap((page) => page.comments) || [],
    loading: isLoading,
    isLastPage: !hasNextPage,
    incrementPage: fetchNextPage,
    addComment,
    deleteComment,
    isFetchingNextPage,
    reset: () => {
      queryClient.resetQueries({ queryKey: commentKeys.all(id!) });
    },
  };
};

export default useComments;
