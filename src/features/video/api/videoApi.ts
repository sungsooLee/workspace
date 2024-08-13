import { axiosInstance } from '@/app/api/instance';

//채널 아이디로 동영상 목록 조회
export const fetchChannelVideos = async () => {
  const response = await axiosInstance.get('/api/channel/test/videos');
  return response.data;
};

// 진도율 저장 API
// 비디오 아이디, 현재 동영상 시간? 정보 보내야할지
export const saveVideoProgress = async (
  videoId: string,
  progress: number,
  userId: string
) => {
  const response = await axiosInstance.post('/api/video/progress', {
    videoId,
    progress,
    userId,
  });
  return response.data;
};

// 비디오 조회
// 비디오 아이디로 상세 조회 -> 현재 접속한 유저가 해당 비디오를 어디까지 봤는지 정보?
export const fetchVideoDetail = async (videoId: string, userId: string) => {
  const response = await axiosInstance.post(`/api/video`, {
    videoId,
    userId,
  });
  return response.data;
};
