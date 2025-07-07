import { FC } from 'react';
import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import { useVideoPlayer } from '../../../video-player/hooks/video-player.hook';
import { VideoPlayer } from '../../../video-player/video-player';
import { VideoPlayerContainer } from '../../../video-player/video-player-container';

const styles = isMobile ? stylesMobile : stylesWeb;

const LearningWindowVideoPlayerComponent: FC<any> = ({ videoInfo }) => {
  const player = useVideoPlayer();
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
          onProgress={player.onProgress}
          onDuration={player.onDuration}
          url={
            'http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/upload/content/video/2025/2/2/master.m3u8'
          }
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
