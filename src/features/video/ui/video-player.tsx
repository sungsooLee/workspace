import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import VideoControls from './video-controls';
import screenfull from 'screenfull';
import { debounce } from 'lodash';

type VideoPlayerProps = {
  videoId: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const playerRef2 = useRef<ReactPlayer>(null);
  const [subtitles, setSubtitles] = useState([
    { label: 'Korean', src: '/testSrt_kr.vtt', srcLang: 'kr', default: true },
    { label: 'English', src: '/testSrt_en.vtt', srcLang: 'en', default: false },
  ]);
  const [selectedSubtitle, setSelectedSubtitle] = useState(subtitles[0].label);
  const tracks = [
    // {
    //   kind: 'subtitles',
    //   src: '/subtitles/arab.vtt',
    //   srcLang: 'ar',
    //   label: 'Arabic',
    //   default: true,
    // },
    // {
    //   kind: 'subtitles',
    //   src: '/subtitles/chi.vtt',
    //   srcLang: 'zh',
    //   label: 'Chinese',
    // },
    {
      kind: 'subtitles',
      src: '/subtitles/jap.vtt',
      srcLang: 'ja',
      label: 'Japanese',
      default: true,
    },
    {
      kind: 'subtitles',
      src: '/subtitles/spa.vtt',
      srcLang: 'es',
      label: 'Spanish',
    },
    {
      kind: 'subtitles',
      src: '/subtitles/thai.vtt',
      srcLang: 'th',
      label: 'Thai',
    },
    {
      kind: 'subtitles',
      src: '/subtitles/viet.vtt',
      srcLang: 'vi',
      label: 'Vietnamese',
    },
  ];
  const previousVolume = useRef<number>(0);
  const [fullyScreen, setFullyScreen] = useState<boolean>(false);
  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 55,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
    loaded: 0,
    duration: 0,
    isReady: false,
    // isLoading: true,
  });
  const {
    playing,
    muted,
    volume,
    played,
    loaded,
    seeking,
    buffer,
    duration,
    isReady,
    playbackRate,
    // isLoading,
  } = videoState;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const savedProgress = localStorage.getItem(`video-progress-${videoId}`);
    if (savedProgress) {
      setVideoState((prevState) => ({
        ...prevState,
        played: parseFloat(savedProgress),
      }));
    }
  }, [videoId]);

  const handleProgress = (state: any) => {
    if (!seeking && state.played > 0) {
      setVideoState((prevState) => ({
        ...prevState,
        played: state.played,
        loaded: state.loaded,
      }));
      //TODO:
      //현재 재생 구간 저장하는 API 호출?
      localStorage.setItem(
        `video-progress-${videoId}`,
        state.played.toString()
      );
    }
    if (isReady && playerRef.current && !seeking && state.played === 0) {
      const savedProgress = localStorage.getItem(`video-progress-${videoId}`);
      if (savedProgress) {
        playerRef.current.seekTo(parseFloat(savedProgress));
      }
    }
  };

  const handlePlayPause = () => {
    setVideoState((prevState) => ({
      ...prevState,
      playing: !playing,
    }));
  };

  const bufferStartHandler = () => {
    setVideoState((prevState) => ({
      ...prevState,
      buffer: true,
    }));
    setIsLoading(true);
  };

  const bufferEndHandler = () => {
    setVideoState((prevState) => ({
      ...prevState,
      buffer: false,
    }));
    setIsLoading(false);
  };

  const handleDuration = (duration: number) => {
    setVideoState((prevState) => ({
      ...prevState,
      duration,
    }));
  };

  const handleOnReady = () => {
    setVideoState((prevState) => ({
      ...prevState,
      isReady: true,
    }));
    setIsLoading(false);
  };

  const handleVolumeToggle = () => {
    setVideoState((prevState) => {
      const isMuted = !muted;
      if (isMuted) {
        previousVolume.current = prevState.volume;
      }
      return {
        ...prevState,
        muted: isMuted,
        volume: isMuted ? 0 : previousVolume.current,
      };
    });
  };

  const handleVolumeChange = (value: number) => {
    setVideoState((prevState) => {
      const isMuted = muted;
      return {
        ...prevState,
        muted: isMuted && value > 0 ? false : isMuted,
        volume: value,
      };
    });

    previousVolume.current = value;
  };

  const handleFullscreenToggle = () => {
    if (fullyScreen) {
      screenfull.exit();
    } else {
      screenfull.request(document.querySelector('.video-wrapper')!);
    }
    setFullyScreen(!fullyScreen);
  };

  const handleSeekMouseDown = () => {
    setVideoState((prevState) => ({
      ...prevState,
      seeking: true,
    }));
  };

  const handleSeekChange = (played: number) => {
    setVideoState((prevState) => ({
      ...prevState,
      played: played,
    }));
    if (playerRef.current) {
      playerRef.current.seekTo(played);
    }
  };

  const handleSeekMouseUp = (played: number) => {
    setVideoState((prevState) => ({
      ...prevState,
      seeking: false,
    }));
    if (playerRef.current) {
      playerRef.current.seekTo(played);
    }
  };

  const handlePlayback = (rate: number) => {
    console.log(rate);
    setVideoState((prevState) => ({ ...prevState, playbackRate: rate }));
  };

  const handleVideoClick = (event: React.MouseEvent) => {
    if (event.detail === 1) {
      handleClick();
    } else if (event.detail === 2) {
      handleClick.cancel();
      handleVideoDoubleClick();
    }
  };
  const handleVideoDoubleClick = () => {
    handleFullscreenToggle();
  };
  const handleClick = debounce(() => {
    handlePlayPause();
  }, 250);

  const handleSubtitleChange = (label: string) => {
    setSelectedSubtitle(label);
    if (playerRef.current) {
      const textTracks = playerRef.current.getInternalPlayer().textTracks;
      for (let i = 0; i < textTracks.length; i++) {
        console.log(textTracks[i].label + '@@@' + label);
        if (textTracks[i].label === label) {
          textTracks[i].mode = 'showing';
        } else {
          textTracks[i].mode = 'hidden';
        }
      }
    }
    setSubtitles((prevSubtitles) =>
      prevSubtitles.map((subtitle) =>
        subtitle.label === label
          ? { ...subtitle, default: true }
          : { ...subtitle, default: false }
      )
    );
  };

  return (
    <>
      <div className='video-wrapper'>
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-75'>
            <div className='loading-spinner text-white'>Loading...</div>
          </div>
        )}
        <div className='react-player' onClick={handleVideoClick}>
          <ReactPlayer
            ref={playerRef}
            // url='https://d1lfq3h9g82ibj.cloudfront.net/test.mp4'
            // url='https://d1lfq3h9g82ibj.cloudfront.net/test.m3u8'
            // url='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
            url='https://htavideo-gcp.hyundai-hta.com/20240716/140046823546/hls/manifest.m3u8'
            // url='https://www.youtube.com/watch?v=1MTyCvS05V4&t=8621s'
            // url='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'
            width='100%'
            height='100%'
            playing={playing}
            onProgress={handleProgress}
            onBuffer={bufferStartHandler}
            onBufferEnd={bufferEndHandler}
            onDuration={handleDuration}
            onReady={handleOnReady}
            playbackRate={playbackRate}
            config={{
              file: {
                // attributes: {
                //   crossOrigin: 'anonymous',
                // },
                // forceHLS: true,
                // hlsOptions: {
                //   startLevel: -1,
                //   debug: true,
                // },
                tracks: subtitles.map((subtitle) => ({
                  kind: 'subtitles',
                  label: subtitle.label,
                  src: subtitle.src,
                  srcLang: subtitle.srcLang,
                  default: subtitle.default,
                })),
              },
            }}
          />
        </div>
        <VideoControls
          played={played}
          playing={playing}
          onPlayPause={handlePlayPause}
          duration={duration}
          onVolumeToggle={handleVolumeToggle}
          onVolumeChange={handleVolumeChange}
          onFullscreenToggle={handleFullscreenToggle}
          isFullscreen={fullyScreen}
          muted={muted}
          volume={volume}
          loaded={loaded}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekChange={handleSeekChange}
          onSeekMouseUp={handleSeekMouseUp}
          onPlaybackRateChange={handlePlayback}
          playbackRate={playbackRate}
          subtitles={subtitles}
          selectedSubtitle={selectedSubtitle}
          onSubtitleChange={handleSubtitleChange}
        />
      </div>

      <ReactPlayer
        url='https://htavideo-gcp.hyundai-hta.com/20240716/140046823546/hls/manifest.m3u8'
        controls
        config={{
          file: {
            attributes: {
              crossOrigin: 'true',
            },
            tracks: tracks,
          },
        }}
        width='100%'
        height='auto'
      />
    </>
  );
};

export default VideoPlayer;
