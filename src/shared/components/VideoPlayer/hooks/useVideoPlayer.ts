import { useEffect, useReducer, useRef, useState } from 'react';
import { Progress, VideoState } from '../model/model';
import ReactPlayer from 'react-player/lazy';

type Action =
  | { type: 'PLAY' }
  | { type: 'STOP' }
  | { type: 'PLAY_PAUSE' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PROGRESS'; payload: Progress }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SEEK_CHANGE'; payload: any }
  | { type: 'SEEK_MOUSE_DOWN' }
  | { type: 'SEEK_MOUSE_UP' }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'CHANGE_SUBTITLE'; payload: string }
  | { type: 'CHANGE_PLAYBACK'; payload: number }
  | { type: 'UPDATE_WATCH_TIME'; payload: number }
  | { type: 'SET_LAST_PLAYED_TIME'; payload: number };

function videoReducer(state: VideoState, action: Action): VideoState {
  switch (action.type) {
    case 'PLAY':
      return { ...state, playing: true };
    case 'STOP':
      return { ...state, playing: false };
    case 'PLAY_PAUSE':
      return { ...state, playing: !state.playing };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_PROGRESS':
      return {
        ...state,
        played: action.payload.played,
        loaded: action.payload.loaded,
      };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'TOGGLE_MUTE':
      return { ...state, muted: !state.muted };
    case 'SEEK_CHANGE':
      // if(playerRef)
      return { ...state, played: action.payload };
    case 'SEEK_MOUSE_DOWN':
      return { ...state, seeking: true };
    case 'SEEK_MOUSE_UP':
      return { ...state, seeking: false };
    case 'CHANGE_SUBTITLE':
      return { ...state, subtitle: action.payload };
    case 'CHANGE_PLAYBACK':
      return { ...state, playbackRate: action.payload };
    // case 'UPDATE_WATCH_TIME':
    //   return { ...state, watchTime: action.payload };
    case 'SET_LAST_PLAYED_TIME':
      return { ...state, lastPlayedTime: action.payload };
    // case 'CHANGE_URL':
    //   return {...state, }
    default:
      return state;
  }
}

export function useVideoPlayer(initialState: VideoState) {
  // console.log(initialState);
  const [state, dispatch] = useReducer(videoReducer, {
    ...initialState,
    // watchTime: initialState.watchTime || 0,
    lastPlayedTime: initialState.lastPlayedTime || 0,
  });
  // const lastPlayedLocation = useRef(initialState.played);

  const lastProgressRef = useRef<number>(state.lastPlayedTime);
  const playerRef = useRef<ReactPlayer>(null);
  const currentPlayingRef = useRef(state.playing);
  const seekPendingRef = useRef(true);
  const startTime = useRef(0);
  const elapsedTime = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isSubtitleInitialized, setIsSubtitleInitialized] = useState(false);
  const [progressInterval, setProgressInterval] =
    useState<NodeJS.Timeout | null>(null);

  const getVideoType = (url: string) => {
    if (url.includes('youtube.com')) {
      return 'youtube';
    } else if (url.endsWith('.mp4')) {
      return 'mp4';
    } else if (url.endsWith('.m3u8')) {
      return 'm3u8';
    } else {
      return 'unknown';
    }
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&#]*)/);
    return match ? match[1] : '';
  };

  useEffect(() => {
    if (!playerRef.current) return;
    const videoType = getVideoType(initialState.url as string);

    if (
      isReady &&
      !isBuffering &&
      seekPendingRef.current &&
      state.duration > 0
    ) {
      initSubtitle();
      if (videoType === 'youtube') {
        const startTime = state.lastPlayedTime * state.duration;
        playerRef.current?.getInternalPlayer()?.cueVideoById({
          videoId: getYouTubeVideoId(initialState.url as string),
          startSeconds: startTime,
        });
      } else {
        playerRef.current?.seekTo(state.lastPlayedTime);
      }
      seekPendingRef.current = false;
      setIsLoading(false);
    }
  }, [
    isReady,
    isBuffering,
    state.duration,
    isSubtitleInitialized,
    initialState.url,
  ]);

  useEffect(() => {
    if (state.playing && !progressInterval) {
      if (startTime.current == null)
        startTime.current = Math.ceil(playerRef.current?.getCurrentTime() || 0);
      const interval = setInterval(() => {
        updateProgress();
      }, 1000);
      setProgressInterval(interval);
    } else if (!state.playing && progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }
  }, [state.playing, progressInterval]);

  const updateProgress = () => {
    const currentTime = Math.ceil(playerRef.current?.getCurrentTime() || 0);
    const playbackRate = playerRef.current?.getInternalPlayer().playbackRate;

    elapsedTime.current += 1;

    if (elapsedTime.current >= 10) {
      console.log('10초 경과');
      console.log('start time = ' + startTime.current);
      console.log('end time = ' + currentTime);
      console.log('현재 배속 = ' + playbackRate);

      elapsedTime.current = 0;
      startTime.current = currentTime;

      //API 전송
    }
  };

  const handleReady = () => {
    setIsReady(true);
    // setIsLoading(false);
    // initSubtitle();
  };

  const handleBuffer = () => {
    console.log('버퍼 시작');
    setIsBuffering(true);
    setIsLoading(true);
  };

  const handleBufferEnd = () => {
    console.log('버퍼 끝');
    setIsBuffering(false);
    if (isLoading) setIsLoading(false);
  };

  const handlePlayPause = () => {
    currentPlayingRef.current = !currentPlayingRef.current;
    dispatch({ type: 'PLAY_PAUSE' });
  };
  const handleVolumeChange = (volume: number) =>
    dispatch({ type: 'SET_VOLUME', payload: volume });

  const handleProgress = (videoState: Progress) => {
    // console.log('Buffer=' + playerRef?.current?.buffered);
    if (!state.seeking && !seekPendingRef.current) {
      // const currentTime = videoState.playedSeconds;
      // const elapsedTime = currentTime - lastProgressRef.current;
      // const newWatchTime = state.watchTime + elapsedTime;
      // dispatch({ type: 'UPDATE_WATCH_TIME', payload: newWatchTime });
      // dispatch({ type: 'SET_LAST_PLAYED_TIME', payload: currentTime });
      dispatch({ type: 'SET_PROGRESS', payload: videoState });

      // lastProgressRef.current = currentTime;
    }
    handleLoadingState();
  };
  const handleLoadingState = () => {
    if (isLoading) {
      setIsLoading(false);
      if (currentPlayingRef.current) {
        dispatch({ type: 'PLAY' });
      }
    }
  };

  const handleDuration = (duration: number) => {
    dispatch({ type: 'SET_DURATION', payload: duration });
  };

  const toggleMute = () => dispatch({ type: 'TOGGLE_MUTE' });

  const handleSeekChange = (played: number) => {
    //클릭한 구간을 저장
    lastProgressRef.current = state.duration * played;
    playerRef.current?.seekTo(played);
    dispatch({ type: 'SEEK_CHANGE', payload: played });
  };

  const seekMouseDown = () => {
    console.log('seekMouseDown isLoading = ' + isLoading);
    if (!isLoading && !isBuffering) {
      setIsLoading(true);
      dispatch({ type: 'STOP' });
    }
    dispatch({ type: 'SEEK_MOUSE_DOWN' });
  };
  const seekMouseUp = () => {
    dispatch({ type: 'SEEK_MOUSE_UP' });
  };

  const handleSubtitleChange = (label: string) => {
    if (playerRef.current) {
      const textTracks = playerRef.current.getInternalPlayer().textTracks;
      if (textTracks && textTracks.length > 0) {
        for (let i = 0; i < textTracks.length; i++) {
          if (textTracks[i].label === label) {
            textTracks[i].mode = 'showing';
          } else {
            textTracks[i].mode = 'hidden';
          }
        }
        dispatch({ type: 'CHANGE_SUBTITLE', payload: label });
      }
    }
  };
  const initSubtitle = () => {
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();

      const checkTextTracks = () => {
        if (player.textTracks && player.textTracks.length > 0) {
          player.textTracks[0].mode = 'showing';
          setIsSubtitleInitialized(true);
        } else {
          setTimeout(checkTextTracks, 500);
        }
      };
      checkTextTracks();
    }
  };

  const handlePlaybackChange = (rate: number) => {
    dispatch({ type: 'CHANGE_PLAYBACK', payload: rate });
  };

  const handleError = (error: any, data: any) => {
    console.error(error, data);
    setIsLoading(false);
  };

  // const

  return {
    playerRef,
    state,
    handlePlayPause,
    handleVolumeChange,
    handleProgress,
    handleDuration,
    toggleMute,
    handleSeekChange,
    seekMouseDown,
    seekMouseUp,
    handleReady,
    handleSubtitleChange,
    handleBuffer,
    handleBufferEnd,
    handlePlaybackChange,
    handleError,
    isLoading,
  };
}
