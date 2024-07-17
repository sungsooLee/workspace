import { setStorage } from '@/shared/hooks/use-local-storage';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
// import ReactPlayer from 'react-player/youtube';
import ReactPlayer from 'react-player';
import { fetchVideoDetail, saveVideoProgress } from '../api/video-api';
// import VideoControls from './video-controls';

interface PlayerInfo {
  played: number;
  playing: boolean;
}

const VideoPlayer: React.FC<{ videoId: string; userId: string }> = ({
  videoId,
  userId,
}) => {
  const playRef = useRef<ReactPlayer>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const { data: videoDetail, isLoading: isDetailLoading } = useQuery({
    queryKey: ['videoDetail', videoId, userId],
    queryFn: () => fetchVideoDetail(videoId, userId),
  });

  useEffect(() => {
    if (videoDetail) {
      console.log(videoDetail);
      setCurrentTime(videoDetail.progress);

      if (playRef.current) {
        console.log(videoDetail.progress);
        playRef.current.seekTo(videoDetail.progress, 'seconds');
      }
    }
  }, [videoDetail]);

  // 진도율 저장을 위한 useMutation
  const {
    mutate: saveProgress,
    isError: isSaveError,
    isSuccess: isSaveSuccess,
  } = useMutation({
    mutationFn: (progress: number) =>
      saveVideoProgress(videoId, progress, userId),
    onError: (error) => {
      console.error('Error saving progress:', error);
    },
    onSuccess: () => {
      console.log('Progress saved successfully');
    },
  });

  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    played: 0,
    playing: false,
  });

  const handleProgress = (state: { played: number }) => {
    setPlayerInfo({ ...playerInfo, played: state.played });
    if (state.played > 0) {
      console.log(state.played);
      saveProgress(state.played);
    }
    // console.log(state.played);
  };

  const handlePlay = () => {
    setPlayerInfo((prevInfo) => ({ ...prevInfo, playing: true }));
  };

  const handlePause = () => {
    setPlayerInfo((prevInfo) => ({ ...prevInfo, playing: false }));
  };

  return (
    <>
      <div className='video-wrapper'>
        <ReactPlayer
          ref={playRef}
          url='http://localhost:5173/videos/test.mp4'
          // url='https://www.youtube.com/watch?v=3e-higRXoaM'
          width='100%'
          height='100%'
          className='react-player'
          controls={true}
          onProgress={handleProgress}
          playing={playerInfo.playing}
          // onDuration={testDuration}
        />
      </div>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Paused</button>
        <input type='range' min='0' max='1' step='0.05' />
      </div>
      <p>Progress : {Math.round(playerInfo.played * 100)}</p>
    </>
  );
};

export default VideoPlayer;
