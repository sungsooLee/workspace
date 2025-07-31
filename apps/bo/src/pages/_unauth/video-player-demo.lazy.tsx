import { VideoPlayer, VideoPlayerContainer, useVideoPlayer } from '@learnway/ui/video-player';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_unauth/video-player-demo')({
  component: RouteComponent,
});

function RouteComponent() {
  const player = useVideoPlayer();

  return (
    <VideoPlayerContainer ref={player.playerContainerRef} player={player}>
      <VideoPlayer
        ref={player.playerRef}
        playing={player.playing}
        onProgress={player.onProgress}
        onDuration={player.onDuration}
        // url={''}
        config={{
          file: {
            // attributes: {
            //   crossOrigin: 'anonymous', // 자막 로드할 때 필요할 수 있음
            // },
            tracks: [
              {
                kind: 'subtitles',
                src: 'https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679957b8083e061177/raw/sample.vtt',
                srcLang: 'en',
                default: true,
                label: 'en',
              },
            ],
          },
        }}
      />
    </VideoPlayerContainer>
  );
}
