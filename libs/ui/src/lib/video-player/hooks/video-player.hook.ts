import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import ReactPlayer from 'react-player';
import { EnLibGlobalConst } from '@learnway/types';
import { VideoPlayerContainerProps } from '../types/video-player-container.type';
import { useTranslation } from 'react-i18next';
import { useLanguageMap } from '@learnway/hooks';
type UseVideoPlayer = {
  onProgressCallback?: (state: { played: number; playedSeconds: number; speed: number }) => void;
  gotoBeforeLesson?: () => void;
  gotoNextLesson?: () => void;
  langCode?: string;
};

export const VideoQualities = {
  auto: { label: 'Auto', height: 0 },
  high: { label: '1080P', height: 1080 },
  middle: { label: '720P', height: 720 },
  low: { label: '360P', height: 360 },
};
export const VideoSpeed = [
  { label: '0.25x', value: 0.25 },
  { label: '0.5x', value: 0.5 },
  { label: '0.75x', value: 0.75 },
  { label: '1x', value: 1 },
  { label: '1.25x', value: 1.25 },
  { label: '1.5x', value: 1.5 },
  { label: '1.75x', value: 1.75 },
  { label: '2x', value: 2 },
];
const qualitesAutoStep = [VideoQualities.high, VideoQualities.middle, VideoQualities.low];

const rightHeight = (item: any) => {
  switch (item.height) {
    case VideoQualities.high.height:
    case VideoQualities.middle.height:
    case VideoQualities.low.height:
      return true;
  }
  return false;
};

/**
 * height 값을 가지고 있는 list를
 * @param data
 * @param height
 * @returns
 */
export const getHeightValueEncodedVideo = (data: any[], height: number) => {
  return data.find((item) => {
    return item.height === height;
  });
};

export const useVideoPlayer = ({
  langCode = 'KO',
  onProgressCallback,
  gotoBeforeLesson,
  gotoNextLesson,
}: UseVideoPlayer = {}): VideoPlayerContainerProps => {
  const { t: transT } = useTranslation();
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
  const [videoQuality, setVideoQuality] = useState<any>(VideoQualities.auto);
  const [selectedSubtitle, setSelectedSubtitle] = useState<any>();

  //player 정보 전달을 위한 값
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [videoStart, setVideoStart] = useState<number>(0);

  const { getLanguageName } = useLanguageMap();

  const resetReactPlayerConfig = (subtitles: any[]) => {
    if (!subtitles) return;
    let nowSubtitle;
    const tracks = JSON.parse(JSON.stringify(subtitles));
    if (langCode) {
      nowSubtitle = tracks.find((item: any) => {
        return item.srcLang === langCode;
      });
    }
    if (!nowSubtitle) {
      nowSubtitle = tracks[0];
    }
    nowSubtitle.default = true;
    const config = {
      file: {
        forceHLS: true,
        attributes: {
          crossOrigin: 'anonymous',
        },
        tracks,
      },
    };
    setVideoConfig(config);
    changeSubtitle(nowSubtitle);
  };

  /**
   * 비디오 정보를 받아 자막 정보와 품질 정보 처리
   */
  useEffect(() => {
    if (videoInfo) {
      if (videoInfo.videoSubtitles && videoInfo.videoSubtitles.length > 0) {
        const tracks: any[] = [];
        videoInfo.videoSubtitles.forEach((subItem: any) => {
          tracks.push({
            kind: 'subtitles',
            src: subItem.subtitleUrl,
            srcLang: subItem.languageCountryCode,
            default: false,
            label: getLanguageName(subItem.languageCountryCode),
          });
        });

        setVideoSubtitles(tracks);
        resetReactPlayerConfig(tracks);
      } else {
        // 모바일 설정 HLS 강제 처리
        setVideoConfig({
          file: {
            forceHLS: true,
            attributes: {
              crossOrigin: 'anonymous',
            },
          },
        });
      }

      if (videoInfo.encodedVideos && videoInfo.encodedVideos.length > 0) {
        const videoMap = new Map();
        videoInfo.encodedVideos.forEach((item: any) => {
          if (!videoMap.has(item.height)) {
            if (rightHeight(item)) videoMap.set(item.height, item);
          }
        });
        setEncodedVideos([...videoMap.values()]);
      }
      setPlayUrl(videoInfo.masterVideo);
    } else {
      setVideoSubtitles(undefined);
      setEncodedVideos(undefined);
    }
    setIsFirstLoad(true);
  }, [videoInfo]);

  /**
   * 자막 언어 변경
   * @param subtitle
   */
  const changeSubtitle = (subtitle: any) => {
    //if (!videoSubtitles) return;
    // subtitle 설정

    setSelectedSubtitle(subtitle);

    const video = playerRef.current?.getInternalPlayer() as HTMLVideoElement | null;

    if (video && video.textTracks.length > 0) {
      for (let i = 0; i < video.textTracks.length; i++) {
        if (subtitlesVisible) {
          video.textTracks[i].mode =
            video.textTracks[i].language === subtitle.srcLang ? 'showing' : 'hidden';
        } else {
          video.textTracks[i].mode = 'hidden';
        }
      }
    }
  };

  /**
   *  재생 속도 설정 함수
   */
  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    const internalPlayer = playerRef.current?.getInternalPlayer() as HTMLVideoElement | null;
    if (internalPlayer) {
      internalPlayer.playbackRate = rate;
    }
  };

  /**
   * 전체화면 토글 함수
   */
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

  /**
   * 자막 토글 처리
   * 현재 선택된 언어가 노출 되도록 함.
   */
  const toggleSubtitles = () => {
    const video = playerRef.current?.getInternalPlayer() as HTMLVideoElement | null;
    if (video && video.textTracks.length > 0) {
      console.log('tracks', video.textTracks);
      for (let i = 0; i < video.textTracks.length; i++) {
        if (!subtitlesVisible) {
          video.textTracks[i].mode =
            video.textTracks[i].language === selectedSubtitle.srcLang ? 'showing' : 'hidden';
        } else {
          video.textTracks[i].mode = 'hidden';
        }
      }
      setSubtitlesVisible(!subtitlesVisible);
    }
  };

  /**
   * 화면 출력을 위한 시간 변환
   * 🎬 시간 변환 함수
   * @param seconds
   * @returns
   */
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  /**
   * 초 값으로 비디오 진행 변경
   * @param progress
   */
  const setSeconds = (progress: number) => {
    const current = playerRef.current;
    if (current) {
      current.seekTo(progress, 'seconds');
    }
  };

  /**
   * ⏮ 5초 되감기 - 키보드 좌 클릭
   * @deprecated 기획내용에서 빠짐
   */
  const handleRewind = () => {
    const current = playerRef.current;
    if (current) {
      const time = current.getCurrentTime();
      current.seekTo(time - 5, 'seconds');
    }
  };

  /**
   * ⏭ 5초 앞으로 - 키보드 우 클릭
   * @deprecated 기획내용에서 빠짐
   */
  const handleForward = () => {
    const current = playerRef.current;
    if (current) {
      const time = current.getCurrentTime();
      current.seekTo(time + 5, 'seconds');
    }
  };

  /**
   * 재생 중지 토글 (▶️ / ⏸️ 토글)
   */
  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };

  /**
   * 음소거 토글
   */
  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  /**
   * 비디오 음량 변경
   * @param e
   */
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setMuted(false);
  };

  /**
   * 비디오 출력 위치 변경
   * @param e
   * @returns
   */
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

  /**
   * 비디오 품질 변경
   * @param v
   * @returns
   */
  const changeQuality = (v: any) => {
    if (!encodedVideos) return;
    const selectedHeight = v.height;
    const data = getHeightValueEncodedVideo(encodedVideos, selectedHeight);

    if (data) {
      if (videoSubtitles) {
        resetReactPlayerConfig(videoSubtitles);
      }
      setPlayUrl(data.m3u8Url);
      setVideoQuality(v);
    } else if (v.label === VideoQualities.auto.label) {
      if (videoSubtitles) {
        resetReactPlayerConfig(videoSubtitles);
      }
      setPlayUrl(videoInfo.masterVideo);
      setVideoQuality(v);
    }
    console.log('changeQuality', data);
  };
  const handleGoBeforeLesson = () => {
    gotoBeforeLesson?.();
  };
  const handleGoNextLesson = () => {
    gotoNextLesson?.();
  };

  /**
   * 🔁 재생 위치 동기화
   * onProgress callback 함수
   * @param state
   */
  const onProgress = (state: { played: number; playedSeconds: number }) => {
    setPlayed(state.played);
    setCurrentTime(state.playedSeconds);
    onProgressCallback &&
      onProgressCallback({
        ...state,
        playedSeconds: Math.floor(state.playedSeconds),
        speed: playbackRate,
      });
  };

  /**
   * onBuffer callback 함수
   */
  const onBuffer = () => {
    console.log('on Buffer');
    // let pos = autoQualityStepPos + 1;
    // if (pos >= qualitesAutoStep.length) return;
    // do {
    //   if (!encodedVideos) return;
    //   const video = getHeightValueEncodedVideo(encodedVideos, qualitesAutoStep[pos].height);
    //   if (video) {
    //     setPlayUrl(video.m3u8Url);
    //     setAutoQualityStepPos(pos);
    //     return;
    //   }
    //   pos++;
    // } while (pos < qualitesAutoStep.length);
    // // 종료 처리
    // setAutoQualityStepPos(pos);
  };

  /**
   * 🧭 총 재생시간 설정
   * onDuration callback 함수
   * @param d
   */
  const onDuration = (d: number) => {
    setDuration(d);
  };

  /**
   * 비디오 출력 준비 완료 : url 변경시 호출 됨
   * onReady callback
   * @param param
   * @returns
   */
  const onReady = (param: any) => {
    console.log('onReady', param);
    if (!isFirstLoad) {
      setSeconds(currentTime);
      if (videoSubtitles && videoSubtitles.length > 0) resetReactPlayerConfig(videoSubtitles);
      return;
    }
    if (videoInfo) {
      if (videoInfo.lastVideoEndTime) {
        setCurrentTime(videoInfo.lastVideoEndTime);
        setSeconds(videoInfo.lastVideoEndTime);
        setVideoStart(videoInfo.lastVideoEndTime);
      }
    }
    setIsFirstLoad(false);
  };

  return {
    playUrl,
    setPlayUrl,
    videoStart,
    setVideoStart,
    selectedSubtitle,
    changeSubtitle,

    playbackRate,
    videoConfig,
    videoSubtitles,
    encodedVideos,
    videoQuality,
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
