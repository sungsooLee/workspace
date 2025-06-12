import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

export const usePlayer = () => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0); // 0.0 ~ 1.0
  const [duration, setDuration] = useState(0);
  const [subtitles, setSubtitles] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8); // 기본 볼륨 80%
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0); // 재생 속도 상태
  const [showCurriculumSection, setShowCurriculumSection] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [subtitlesVisible, setSubtitlesVisible] = useState(true);

  const toggleCurriculumSection = () => {
    setShowCurriculumSection((prev) => !prev);
  };

  // 재생 속도 설정 함수
  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    const internalPlayer = playerRef.current?.getInternalPlayer() as HTMLVideoElement | null;
    if (internalPlayer) {
      internalPlayer.playbackRate = rate;
    }
  };

  // 전체화면 토글 함수
  const toggleFullscreen = () => {
    const elem = playerContainerRef.current;

    if (!elem) return;

    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        (elem as any).mozRequestFullScreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };
  const toggleSubtitles = () => {
    const video = playerRef.current?.getInternalPlayer() as HTMLVideoElement | null;
    if (video && video.textTracks.length > 0) {
      for (let i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = subtitlesVisible ? 'hidden' : 'showing';
      }
      setSubtitlesVisible(!subtitlesVisible);
    }
  };

  // 🎬 시간 변환 함수
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  // ⏮ 10초 되감기
  const handleRewind = () => {
    const current = playerRef.current;
    if (current) {
      const time = current.getCurrentTime();
      current.seekTo(time - 10, 'seconds');
    }
  };

  // ⏭ 10초 앞으로
  const handleForward = () => {
    const current = playerRef.current;
    if (current) {
      const time = current.getCurrentTime();
      current.seekTo(time + 10, 'seconds');
    }
  };

  // ▶️ / ⏸️ 토글
  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };

  // 🔁 재생 위치 동기화
  const onProgress = (state: { played: number; playedSeconds: number }) => {
    setPlayed(state.played);
    setCurrentTime(state.playedSeconds);
    updateSubtitles(state.playedSeconds);
  };

  // 🧭 총 재생시간 설정
  const onDuration = (d: number) => {
    setDuration(d);
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setMuted(false);
  };

  // 📍 진행바 클릭
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    playerRef.current?.seekTo(percentage, 'fraction');
  };

  // 🎞️ 자막 불러오기 (간단한 .vtt 파싱 시뮬레이션)
  const subtitleCues = [
    { start: 2, end: 5, text: 'Welcome to the lesson!' },
    { start: 6, end: 10, text: "Let's get started with the video." },
    { start: 11, end: 15, text: 'Notice the details on this car.' },
  ];

  const updateSubtitles = (time: number) => {
    const cue = subtitleCues.find((c) => time >= c.start && time <= c.end);
    setSubtitles(cue ? cue.text : '');
  };

  return {
    showCurriculumSection,
    playerContainerRef,
    playerRef,
    playing,
    played,
    duration,
    subtitles,
    currentTime,
    volume,
    muted,
    isFullscreen,
    subtitlesVisible,
    toggleFullscreen,
    toggleSubtitles,
    formatTime,
    handleRewind,
    handleForward,
    onDuration,
    toggleMute,
    handleVolumeChange,
    handleSeek,
    updateSubtitles,
    togglePlay,
    onProgress,
    changePlaybackRate,
    toggleCurriculumSection,
  };
};
