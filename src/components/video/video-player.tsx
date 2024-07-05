import ReactPlayer from 'react-player/youtube';

const VideoPlayer = () => {
  return (
    <div className='video-wrapper'>
      <ReactPlayer
        url='https://www.youtube.com/watch?v=wm5gMKuwSYk&t=19s'
        width='100%'
        height='100%'
        className='react-player'
        controls={true}
      />
    </div>
  );
};

export default VideoPlayer;
