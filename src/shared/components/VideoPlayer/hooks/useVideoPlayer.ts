import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Progress, VideoState } from '../model/model';
import ReactPlayer from 'react-player';

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
    case 'UPDATE_WATCH_TIME':
      return { ...state, watchTime: action.payload };
    case 'SET_LAST_PLAYED_TIME':
      return { ...state, lastPlayedTime: action.payload };
    default:
      return state;
  }
}

export function useVideoPlayer(initialState: VideoState) {
  // console.log(initialState);
  const [state, dispatch] = useReducer(videoReducer, {
    ...initialState,
    watchTime: initialState.watchTime || 0,
    lastPlayedTime: initialState.lastPlayedTime || 0,
  });
  // const lastPlayedLocation = useRef(initialState.played);

  const lastProgressRef = useRef<number>(state.lastPlayedTime);
  const playerRef = useRef<ReactPlayer>(null);
  const currentPlayingRef = useRef(state.playing);
  const seekpendingRef = useRef(true);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    if (
      isReady &&
      !isBuffering &&
      seekpendingRef.current &&
      state.lastPlayedTime > 0 &&
      state.duration > 0
    ) {
      console.log(state.lastPlayedTime);
      playerRef.current?.seekTo(state.lastPlayedTime);
      initSubtitle();
      seekpendingRef.current = false;
      setIsLoading(false);
    }
  }, [isReady, isBuffering, state.lastPlayedTime, state.duration]);

  const handleReady = () => {
    setIsReady(true);
    setIsLoading(false);
    // initSubtitle();
  };

  const handleBuffer = () => {
    setIsBuffering(true);
  };

  const handleBufferEnd = () => {
    console.log('버퍼 끝');
    setIsBuffering(false);
  };

  const handlePlayPause = () => {
    currentPlayingRef.current = !currentPlayingRef.current;
    dispatch({ type: 'PLAY_PAUSE' });
  };
  const handleVolumeChange = (volume: number) =>
    dispatch({ type: 'SET_VOLUME', payload: volume });

  const handleProgress = (videoState: Progress) => {
    if (!state.seeking && !seekpendingRef.current) {
      const currentTime = videoState.playedSeconds;
      const elapsedTime = currentTime - lastProgressRef.current;
      const newWatchTime = state.watchTime + elapsedTime;
      console.log('🚀 ~ handleProgress ~ newWatchTime:', newWatchTime);
      dispatch({ type: 'UPDATE_WATCH_TIME', payload: newWatchTime });
      dispatch({ type: 'SET_LAST_PLAYED_TIME', payload: currentTime });
      dispatch({ type: 'SET_PROGRESS', payload: videoState });

      lastProgressRef.current = currentTime;
    }
    if (isLoading) {
      setIsLoading(false);
      if (currentPlayingRef.current) {
        dispatch({ type: 'PLAY' });
      }
    }
  };
  const handleDuration = (duration: number) => {
    dispatch({ type: 'SET_DURATION', payload: duration });
    // console.log(duration);
  };

  const toggleMute = () => dispatch({ type: 'TOGGLE_MUTE' });

  const handleSeekChange = (played: number) => {
    //클릭한 구간을 저장
    lastProgressRef.current = state.duration * played;
    playerRef.current?.seekTo(played);
    dispatch({ type: 'SEEK_CHANGE', payload: played });
  };

  const seekMouseDown = () => {
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
      for (let i = 0; i < textTracks.length; i++) {
        if (textTracks[i].label === label) {
          textTracks[i].mode = 'showing';
        } else {
          textTracks[i].mode = 'hidden';
        }
      }
      dispatch({ type: 'CHANGE_SUBTITLE', payload: label });
    }
  };
  const initSubtitle = () => {
    if (
      playerRef.current &&
      playerRef.current.getInternalPlayer() &&
      playerRef.current.getInternalPlayer().textTracks
    ) {
      const textTracks = playerRef.current.getInternalPlayer().textTracks;
      textTracks[0].mode = 'showing';
    }
  };

  const handlePlaybackChange = (rate: number) => {
    dispatch({ type: 'CHANGE_PLAYBACK', payload: rate });
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
    isLoading,
  };
}
