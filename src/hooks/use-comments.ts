import { CommentProps } from '@/components/video/comments';
import { useCallback, useEffect, useReducer, useRef } from 'react';

interface CommentsState {
  comments: CommentProps[];
  loading: boolean;
  page: number;
  isLastPage: boolean;
  testMode: boolean;
}

type Action =
  | { type: 'RESET' }
  | { type: 'FETCH_START' }
  | {
      type: 'FETCH_SUCCESS';
      payload: { comments: CommentProps[]; isLastPage: boolean };
    }
  | { type: 'FETCH_FAILURE' }
  | { type: 'ADD_COMMENT'; payload: CommentProps }
  | { type: 'SET_TEST_MODE'; payload: boolean }
  | { type: 'INCREMENT_PAGE' };

const initialState: CommentsState = {
  comments: [],
  loading: false,
  page: 0,
  isLastPage: false,
  testMode: false,
};

const commentsReducer = (
  state: CommentsState,
  action: Action
): CommentsState => {
  switch (action.type) {
    case 'RESET':
      return {
        ...state,
        ...initialState,
      };
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        comments: [...state.comments, ...action.payload.comments],
        isLastPage: action.payload.isLastPage,
        loading: false,
      };
    case 'FETCH_FAILURE':
      return { ...state, loading: false };
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] };
    case 'SET_TEST_MODE':
      return { ...state, testMode: action.payload };
    case 'INCREMENT_PAGE':
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

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
  const [state, dispatch] = useReducer(commentsReducer, initialState);
  const currentId = useRef(id);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const fetchComments = useCallback(
    async (page: number) => {
      if (!state.testMode && (!id || state.isLastPage || state.loading)) return;
      dispatch({ type: 'FETCH_START' });
      const fetchId = id;
      try {
        // const delay = (ms: number) =>
        //   new Promise((resolve) => setTimeout(resolve, ms));
        // await delay(500); // 0.5초 지연 시간 추가 - 로딩화면 보이기 위해서
        const response = state.testMode
          ? await testFetchCommentsApi(page, pageSize)
          : await fetchCommentsApi(id!, page, pageSize);
        if (currentId.current === fetchId) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: {
              comments: response.comments,
              isLastPage: response.isLastPage,
            },
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: 'FETCH_FAILURE' });
      }
    },
    [id, pageSize, state.testMode, state.isLastPage]
  );

  const addComment = async (newComment: Omit<CommentProps, 'regDt'>) => {
    try {
      const savedComment = await saveCommentsApi(newComment);
      dispatch({ type: 'ADD_COMMENT', payload: savedComment });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset();
  }, [id, reset]);

  useEffect(() => {
    fetchComments(state.page);
  }, [fetchComments, id, state.page]);

  useEffect(() => {
    currentId.current = id;
  }, [id]);

  return {
    comments: state.comments,
    fetchComments,
    loading: state.loading,
    incrementPage: () => dispatch({ type: 'INCREMENT_PAGE' }),
    isLastPage: state.isLastPage,
    addComment,
    setTestMode: (testMode: boolean) =>
      dispatch({ type: 'SET_TEST_MODE', payload: testMode }),
    testMode: state.testMode,
    reset,
  };
};

export default useComments;
