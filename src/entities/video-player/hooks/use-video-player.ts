import { useCallback, useReducer, useRef } from 'react';
import { VideoState } from '../model/model';
import ReactPlayer from 'react-player';

const initialState: VideoState = {
  playing: false,
  volume: 0.5,
  progress: 0,
  duration: 0,
  played: 0,
  muted: false,
  fullscreen: false,
  showSubtitles: false,
};

type Action =
  | { type: 'PLAY_PAUSE' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'TOGGLE_MUTE' };

function videoReducer(state: VideoState, action: Action): VideoState {
  switch (action.type) {
    case 'PLAY_PAUSE':
      return { ...state, playing: !state.playing };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_PROGRESS':
      return { ...state, played: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'TOGGLE_MUTE':
      return { ...state, muted: !state.muted };
    default:
      return state;
  }
}

export function useVideoPlayer() {
  // TODO: 추후 State 값을 갖고와서 세팅?
  const [state, dispatch] = useReducer(videoReducer, initialState);
  const playerRef = useRef<ReactPlayer>(null);
  const handlePlayPause = () => dispatch({ type: 'PLAY_PAUSE' });
  const handleVolumeChange = (volume: number) =>
    dispatch({ type: 'SET_VOLUME', payload: volume });

  const handleProgress = (played: number) =>
    dispatch({ type: 'SET_PROGRESS', payload: played });

  const handleDuration = (duration: number) =>
    dispatch({ type: 'SET_DURATION', payload: duration });

  const toggleMute = () => dispatch({ type: 'TOGGLE_MUTE' });

  return {
    playerRef,
    state,
    handlePlayPause,
    handleVolumeChange,
    handleProgress,
    handleDuration,
    toggleMute,
  };
}
