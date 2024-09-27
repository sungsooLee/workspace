import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
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
  | { type: 'SET_LAST_PLAYED_TIME'; payload: number }
  | { type: 'SET_INITIAL_STATE'; payload: any }
  | { type: 'CLEAR_STATE' };

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
      return { ...state, played: action.payload };
    case 'SEEK_MOUSE_DOWN':
      return { ...state, seeking: true };
    case 'SEEK_MOUSE_UP':
      return { ...state, seeking: false };
    case 'CHANGE_SUBTITLE':
      return { ...state, subtitle: action.payload };
    case 'CHANGE_PLAYBACK':
      return { ...state, playbackRate: action.payload };
    case 'SET_LAST_PLAYED_TIME':
      return { ...state, lastPlayedTime: action.payload };
    case 'SET_INITIAL_STATE':
      return {
        ...state,
        ...action.payload,
      };
    // case 'CLEAR_STATE':
    //     return {};

    default:
      return state;
  }
}

export function useVideoPlayer(initialState: VideoState) {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  const lastProgressRef = useRef<number>(state.lastPlayedTime);
  const playerRef = useRef<ReactPlayer>(null);
  const currentPlayingRef = useRef(state.playing);
  const startTime = useRef(0);
  const elapsedTime = useRef(0);
  const [progressInterval, setProgressInterval] =
    useState<NodeJS.Timeout | null>(null);
  // const { sendProgress, sendRecord } = useVideoAPI(refetch);

  useEffect(() => {
    dispatch({
      type: 'SET_INITIAL_STATE',
      payload: initialState,
    });
  }, [initialState]);

  useEffect(() => {
    playerRef.current?.seekTo(state.lastPlayedTime);
  }, [state.duration, initialState.url]);

  useEffect(() => {
    let playerInstance = playerRef.current;
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
      if (playerInstance) {
        playerInstance = null;
      }
    };
  }, [progressInterval]);

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

  const handlePlayPause = useCallback(() => {
    currentPlayingRef.current = !currentPlayingRef.current;
    dispatch({ type: 'PLAY_PAUSE' });
  }, []);
  const handleVolumeChange = useCallback(
    (volume: number) => dispatch({ type: 'SET_VOLUME', payload: volume }),
    []
  );

  const handleProgress = useCallback((videoState: Progress) => {
    if (!state.seeking) {
      dispatch({ type: 'SET_PROGRESS', payload: videoState });
    }
    const player = playerRef.current;
    if (player) {
      const readyState = player.getInternalPlayer().readyState;
      if (readyState === 4 && state.played >= state.loaded) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    }
  }, []);

  const handleDuration = (duration: number) => {
    dispatch({ type: 'SET_DURATION', payload: duration });
  };

  const toggleMute = useCallback(() => dispatch({ type: 'TOGGLE_MUTE' }), []);

  const handleSeekChange = useCallback(
    (played: number) => {
      lastProgressRef.current = state.duration * played;
      playerRef.current?.seekTo(played);
      dispatch({ type: 'SEEK_CHANGE', payload: played });
    },
    [state.duration]
  );

  const seekMouseDown = useCallback(() => {
    dispatch({ type: 'SEEK_MOUSE_DOWN' });
  }, []);

  const seekMouseUp = useCallback(() => {
    dispatch({ type: 'SEEK_MOUSE_UP' });
  }, []);

  const handlePlaybackChange = useCallback((rate: number) => {
    dispatch({ type: 'CHANGE_PLAYBACK', payload: rate });
  }, []);

  const handleRewind = useCallback(() => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    const newTime = Math.max(currentTime - 10, 0);
    playerRef.current?.seekTo(newTime);
  }, []);

  const handleForward = useCallback(() => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    const newTime = Math.max(currentTime + 10, 0);
    playerRef.current?.seekTo(newTime);
  }, []);

  const handleBuffer = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleBufferEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleReady = useCallback(() => {
    setIsLoading(false);
  }, []);

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
    handleSubtitleChange,
    seekMouseUp,
    handlePlaybackChange,
    // handleError,
    handleBuffer,
    handleBufferEnd,
    handleRewind,
    handleForward,
    isLoading,
    handleReady,
    startTime: startTime.current,
    elapsedTime: elapsedTime.current,
  };
}
