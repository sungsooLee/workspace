import { createFileRoute } from '@tanstack/react-router';
import { Player, PlayerContainer, usePlayer } from '@learnway/ui';

export const Route = createFileRoute('/_unauth/player-demo')({
  component: RouteComponent,
});

function RouteComponent() {
  const player = usePlayer();

  return (
    <PlayerContainer ref={player.playerContainerRef} {...player}>
      <Player
        ref={player.playerRef}
        playing={player.playing}
        onProgress={player.onProgress}
        onDuration={player.onDuration}
        url={'/SampleVideo_1280x720_30mb.mp4'}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous', // 자막 로드할 때 필요할 수 있음
            },
            tracks: [
              {
                kind: 'subtitles',
                src: '/subtitles-en.vtt',
                srcLang: 'en',
                default: true,
                label: 'en',
              },
            ],
          },
        }}
      />
    </PlayerContainer>
  );
}
