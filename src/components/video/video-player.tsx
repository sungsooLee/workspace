import { setStorage } from '@/hooks/use-local-storage';
import { useState } from 'react';
// import ReactPlayer from 'react-player/youtube';
import ReactPlayer from 'react-player';
// import VideoControls from './video-controls';

interface PlayerInfo {
  played: number;
  playing: boolean;
}

const VideoPlayer = () => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    played: 0,
    playing: false,
  });
  const handleProgress = (state: { played: number }) => {
    setPlayerInfo({ ...playerInfo, played: state.played });
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
          url='http://localhost:5173/videos/test.mp4'
          // url='https://www.youtube.com/watch?v=3e-higRXoaM'
          width='100%'
          height='100%'
          className='react-player'
          controls={true}
          onProgress={handleProgress}
          playing={playerInfo.playing}
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
