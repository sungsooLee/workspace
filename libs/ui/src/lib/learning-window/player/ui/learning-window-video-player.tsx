import { FC, useCallback } from 'react';
import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import { useVideoPlayer } from '../../../video-player/hooks/video-player.hook';
import { VideoPlayer } from '../../../video-player/video-player';
import { VideoPlayerContainer } from '../../../video-player/video-player-container';

const styles = isMobile ? stylesMobile : stylesWeb;

const LearningWindowVideoPlayerComponent: FC<any> = ({ videoInfo, onProgress }) => {
  const player = useVideoPlayer({ onProgressCallback: onProgress });
  return (
    <div className={styles.start}>
      <VideoPlayerContainer
        ref={player.playerContainerRef}
        {...player}
        showCurriculumSection={false}
      >
        <VideoPlayer
          ref={player.playerRef}
          playing={player.playing}
          progressInterval={1000 * 10}
          onProgress={player.onProgress}
          onDuration={player.onDuration}
          url={videoInfo.masterVideo}
          // config={{
          //   file: {
          //     // attributes: {
          //     //   crossOrigin: 'anonymous', // 자막 로드할 때 필요할 수 있음
          //     // },
          //     tracks: [
          //       {
          //         kind: 'subtitles',
          //         src: 'https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679957b8083e061177/raw/sample.vtt',
          //         srcLang: 'en',
          //         default: true,
          //         label: 'en',
          //       },
          //     ],
          //   },
          // }}
        />
      </VideoPlayerContainer>
    </div>
  );
};

export const LearningWindowVideoPlayer = LearningWindowVideoPlayerComponent;
