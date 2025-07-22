import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import ReactPlayer from 'react-player';
import { EnLibGlobalConst } from '@learnway/types';
import { VideoPlayerContainerProps } from '../types/video-player-container.type';
type UseVideoPlayer = {
  onProgressCallback?: (state: { played: number; playedSeconds: number; speed: number }) => void;
  gotoBeforeLesson?: () => void;
  gotoNextLesson?: () => void;
};

export const VideoQuerites = {
  auto: { label: 'Auto', height: 0 },
  high: { label: '1080P', height: 1080 },
  middle: { label: '720P', height: 720 },
  low: { label: '360P', height: 360 },
};

const rightHeight = (item: any) => {
  switch (item.height) {
    case VideoQuerites.high.height:
    case VideoQuerites.middle.height:
    case VideoQuerites.low.height:
      return true;
  }
  return false;
};

export const useVideoPlayer = ({
  onProgressCallback,
  gotoBeforeLesson,
  gotoNextLesson,
}: UseVideoPlayer = {}): VideoPlayerContainerProps => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const [videoConfig, setVideoConfig] = useState<any>();
  const [videoSubtitles, setVideoSubtitles] = useState<any[] | undefined>();
  const [encodedVideos, setEncodedVideos] = useState<any[] | undefined>();
  const [videoInfo, setVideoInfo] = useState<any>();
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0); // 0.0 ~ 1.0
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8); // 기본 볼륨 80%
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0); // 재생 속도 상태
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [subtitlesVisible, setSubtitlesVisible] = useState(false);
  const [playUrl, setPlayUrl] = useState<string>();
  const [videoQuerity, setVideoQuerity] = useState<any>(VideoQuerites.auto);

  //player 정보 전달을 위한 값
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [videoStart, setVideoStart] = useState<number>(0);

  useEffect(() => {
    if (videoInfo) {
      setVideoSubtitles(videoInfo.videoSubtitles);

      if (videoInfo.encodedVideos && videoInfo.encodedVideos.length > 0) {
        const videoMap = new Map();
        videoInfo.encodedVideos.forEach((item: any) => {
          if (!videoMap.has(item.height)) {
            if (rightHeight(item)) videoMap.set(item.height, item);
          }
        });
        setEncodedVideos([...videoMap.values()]);
      }
      // subtitle 설정
      const config = {
        attributes: {
          crossOrigin: 'anonymous',
        },
        file: {
          tracks: [] as any[],
        },
      };

      videoInfo.videoSubtitles.forEach((item: any) => {
        config.file.tracks.push({
          kind: 'subtitles',
          src: item.subtitleUrl,
          srcLang: item.languageCountryCode,
          default: true,
          label: t(
            `${EnLibGlobalConst.SYSTEM_COMMON_CODE}.pms.multilingual.LangCountryCode.${item.languageCountryCode}`,
          ),
        });
      });
      if (videoInfo.videoSubtitles && videoInfo.videoSubtitles.length > 0) {
        setVideoConfig(config);
      }
      setPlayUrl(videoInfo.masterVideo);
    } else {
      setVideoSubtitles(undefined);
      setEncodedVideos(undefined);
    }
    setIsFirstLoad(true);
  }, [videoInfo]);

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

  const setSeconds = (progress: number) => {
    const current = playerRef.current;
    if (current) {
      current.seekTo(progress, 'seconds');
    }
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
    //updateSubtitles(state.playedSeconds);
    onProgressCallback &&
      onProgressCallback({
        ...state,
        playedSeconds: Math.floor(state.playedSeconds),
        speed: playbackRate,
      });
  };
  const onBuffer = () => {
    console.log('onBuffer event');
  };

  // 🧭 총 재생시간 설정
  const onDuration = (d: number) => {
    setDuration(d);
  };

  const onReady = (param: any) => {
    console.log('onReady', param);

    if (!isFirstLoad) {
      setSeconds(currentTime);
      return;
    }
    if (videoInfo) {
      setCurrentTime(videoInfo.lastVideoEndTime);
      setSeconds(videoInfo.lastVideoEndTime);
      setVideoStart(videoInfo.lastVideoEndTime);
    }
    setIsFirstLoad(false);
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setMuted(false);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;

    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();

    // 클릭 좌표에서 bar 기준 상대 위치 계산
    const clickX = e.clientX - rect.left;
    const percentage = Math.min(Math.max(clickX / rect.width, 0), 1); // 0~1로 클램프

    // react-player의 seekTo (fraction 단위로 이동)
    playerRef.current.seekTo(percentage, 'fraction');
  };

  const changeQuality = (v: any) => {
    const selectedHeight = v.height;
    const data = encodedVideos?.find((item: any) => {
      return item.height === selectedHeight;
    });

    if (data) {
      setPlayUrl(data.m3u8Url);
      setVideoQuerity(v);
    } else if (v.label === VideoQuerites.auto.label) {
      setPlayUrl(videoInfo.masterVideo);
      setVideoQuerity(v);
    }
    console.log('changeQuality', data);
  };
  const handleGoBeforeLesson = () => {
    gotoBeforeLesson?.();
  };
  const handleGoNextLesson = () => {
    gotoNextLesson?.();
  };

  return {
    playUrl,
    setPlayUrl,
    videoStart,
    setVideoStart,
    videoConfig,
    videoSubtitles,
    encodedVideos,
    videoQuerity,
    playerContainerRef,
    playerRef,
    playing,
    played,
    duration,
    currentTime,
    volume,
    muted,
    isFullscreen,
    subtitlesVisible,
    setVideoInfo,
    setSeconds,
    toggleFullscreen,
    toggleSubtitles,
    formatTime,
    handleRewind,
    handleForward,
    onDuration,
    toggleMute,
    handleVolumeChange,
    handleSeek,
    togglePlay,
    onProgress,
    changePlaybackRate,
    onBuffer,
    onReady,
    changeQuality,
    goBeforeLesson: handleGoBeforeLesson,
    goNextLesson: handleGoNextLesson,
  };
};
