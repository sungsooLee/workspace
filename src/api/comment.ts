import { CommentProps } from '@/components/video/comments';
import axiosInstance from '@/lib/utils/axios';

export const fetchCommnetApi = async (
  videoId: string,
  page: number,
  pageSize: number
) => {
  const response = await axiosInstance.get(`/api/video/comment/${videoId}`, {
    params: { page, pageSize },
  });
  return response.data;
};

export const testFetchCommentApi = async (page: number, pageSize: number) => {
  const response = await axiosInstance.get(`/api/video/comments`, {
    params: { page, pageSize },
  });
  return response.data;
};

export const deleteCommentApi = async (commentId: string) => {
  const response = await axiosInstance.delete(
    `/api/video/comment/${commentId}`
  );
  return response.data;
};
export const saveCommentApi = async (
  newComment: Omit<CommentProps, 'regDt'>
) => {
  const response = await axiosInstance.post('/api/video/comment', newComment);
  return response.data;
};

export const fetchChannelVideos = async () => {
  const response = await axiosInstance.get('/api/channel/test/videos');
  return response.data;
};

export const fetchProfileDetail = async () => {
  const response = await axiosInstance.get('/api/channel/testId/profile');
  return response.data;
};

export default {
  fetchCommnetApi,
  testFetchCommentApi,
  saveCommentApi,
  fetchChannelVideos,
  fetchProfileDetail,
  deleteCommentApi,
};
