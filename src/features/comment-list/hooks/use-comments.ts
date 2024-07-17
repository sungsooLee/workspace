import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useToast } from '../../../shared/hooks/use-toast';
import { Comment } from '@/entities/comment/model/comment';
import commentKeys from '../api/queries';
import { CommentListProps } from '../model/comment-list';
import { deleteCommentApi } from '../api/comment-list-api';
// import './../styles/channel-detail.scss';

const useComments = (
  id: string | undefined,
  pageSize: number,
  fetchCommentsApi: (
    id: string,
    page: number,
    pageSize: number
  ) => Promise<any>,
  saveCommentsApi: (
    newComment: Omit<Comment, 'regDt'>
  ) => Promise<CommentListProps>
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
      toast({ description: '댓글이 등록되었습니다.', duration: 1000 });
    },
  });
  const addComment = async (newComment: Omit<Comment, 'regDt'>) => {
    return addCommentMutation.mutateAsync(newComment);
  };

  const deleteCommentMutation = useMutation({
    mutationFn: deleteCommentApi,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.all(id!),
      });
      toast({
        description: '댓글을 삭제하였습니다.',
        variant: 'destructive',
        duration: 1000,
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
