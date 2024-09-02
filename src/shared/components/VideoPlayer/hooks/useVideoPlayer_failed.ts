import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Progress, VideoState } from '../model/model';
import ReactPlayer from 'react-player/lazy';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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

  const lastProgressRef = useRef<number>(state.lastPlayedTime);
  const playerRef = useRef<ReactPlayer>(null);
  const currentPlayingRef = useRef(state.playing);
  const startTime = useRef(0);
  const elapsedTime = useRef(0);
  const isLoading = useRef(false);
  const [progressInterval, setProgressInterval] =
    useState<NodeJS.Timeout | null>(null);

  //진도 체크 API 전송 없을 수 있으니 빼야될거 같음.
  const sendVideoDataMutation = useMutation({
    mutationFn: (data: {
      contentId: number;
      chapterId: number;
      kitId: number;
      courseId: number;
      videoStartTime: number;
      videoEndTime: number;
      speed: number;
      sequenceId: number;
    }) => axios.post('/cms-module/api/v1/video/record', data),
  });

  useEffect(() => {
    addVideoChangeEvent();
    dispatch({
      type: 'SET_INITIAL_STATE',
      payload: initialState,
    });
  }, [initialState]);

  useEffect(() => {
    playerRef.current?.seekTo(state.lastPlayedTime);
    isLoading.current = false;
  }, [state.duration, initialState.url]);

  const addVideoChangeEvent = () => {
    if (playerRef.current) {
      const handleReadyStateChange = (player: any) => {
        const readyState = player.readyState;
        console.log(readyState);
        if (readyState < 2) {
          isLoading.current = true;
        } else {
          isLoading.current = false;
        }
        if (readyState === 2 || readyState === 3) {
          isLoading.current = true;
        } else {
          isLoading.current = false;
        }
      };
      const player = playerRef.current.getInternalPlayer();
      if (player) {
        player.addEventListener(
          'readystatechange',
          handleReadyStateChange(player)
        );
        return () => {
          player.removeEventListener(
            'readystatechange',
            handleReadyStateChange
          );
        };
      }
    }
  };

  useEffect(() => {
    if (state.playing && !progressInterval && !isLoading.current) {
      console.log(state.playing);
      const interval = setInterval(() => {
        updateProgress();
      }, 1000);
      setProgressInterval(interval);
    } else if (!state.playing && progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }
  }, [state.playing, progressInterval]);

  useEffect(() => {
    let playerInstance = playerRef.current;
    // addVideoChangeEvent();
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
      if (playerInstance) {
        playerInstance = null;
      }
    };
  }, []);
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

  const updateProgress = () => {
    const currentTime = Math.ceil(playerRef.current?.getCurrentTime() || 0);
    const playbackRate = playerRef.current?.getInternalPlayer().playbackRate;
    if (state.playing && !progressInterval && !isLoading.current) {
      elapsedTime.current += 1;
      if (elapsedTime.current >= 10) {
        const { contentId, chapterId, kitId, sequenceId } = state;
        sendVideoDataMutation.mutate({
          contentId: contentId || 0,
          chapterId: chapterId || 0,
          kitId: kitId || 0,
          courseId: 1,
          sequenceId: sequenceId || 0,
          videoStartTime: startTime.current,
          videoEndTime: currentTime,
          speed: playbackRate,
        });
        elapsedTime.current = 0;
        startTime.current = currentTime;
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
    handleLoadingState();
  }, []);
  const handleLoadingState = useCallback(() => {
    if (currentPlayingRef.current) {
      dispatch({ type: 'PLAY' });
    }
  }, []);

  const handleDuration = (duration: number) => {
    console.log(duration);
    dispatch({ type: 'SET_DURATION', payload: duration });
  };

  const toggleMute = useCallback(() => dispatch({ type: 'TOGGLE_MUTE' }), []);

  const handleSeekChange = (played: number) => {
    //클릭한 구간을 저장
    lastProgressRef.current = state.duration * played;
    playerRef.current?.seekTo(played);
    dispatch({ type: 'SEEK_CHANGE', payload: played });
  };

  const seekMouseDown = () => {
    console.log('seekMouseDown isLoading = ' + isLoading.current);
    dispatch({ type: 'SEEK_MOUSE_DOWN' });
  };
  const seekMouseUp = () => {
    dispatch({ type: 'SEEK_MOUSE_UP' });
  };

  const handlePlaybackChange = (rate: number) => {
    dispatch({ type: 'CHANGE_PLAYBACK', payload: rate });
  };

  // const handleError = (error: any, data: any) => {
  //   setIsLoading(false);
  // };

  const handleRewind = () => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    const newTime = Math.max(currentTime - 10, 0);
    playerRef.current?.seekTo(newTime);
  };

  const handleForward = () => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    const newTime = Math.max(currentTime + 10, 0);
    playerRef.current?.seekTo(newTime);
  };

  const handleBuffer = useCallback(() => {
    isLoading.current = true;
  }, []);

  const handleBufferEnd = useCallback(() => {
    isLoading.current = false;
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
  };
}
