//  IA105 / NLP_BO_CMS_1016, NLP_BO_CMS_1002

import { Button, Spinner, useModal } from '@learnway/ui';
import { IcoStatusFail } from '@learnway/icons';
import style from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import { DynamicFormProvider } from '@learnway/hooks';
import {
  isProcessing,
  isProcessingCompleted,
  isProcessingFailed,
  isProcessingNone,
  useVideoResource,
} from '@entities/learning-resource';
import { formatBytes } from '@learnway/shared';
import { useMemo } from 'react';
import { max } from 'lodash';
import { PreviewLearningWindow } from '../preview-learning-window';
import ReactPlayer from 'react-player';

interface MovieInfoProps {
  provider: DynamicFormProvider;
}

const MovieInfoComponent = ({ provider }: MovieInfoProps) => {
  const { open: openModal } = useModal();
  const {
    contentUuid,
    isDrafted,
    processingStatus: status,
    playTime,
    videoResource,
  } = useVideoResource(provider);

  const url = useMemo(() => videoResource?.masterVideo, [videoResource]);
  const height = useMemo(
    () => max(videoResource?.encodedVideos?.map((_) => _.height)) || 0,
    [videoResource],
  );
  const width = useMemo(
    () => max(videoResource?.encodedVideos?.map((_) => _.width)) || 0,
    [videoResource],
  );

  // media info_list
  const infoList = [
    { title: '파일명', text: videoResource?.fileInfo.fileName },
    { title: '재생시간', text: playTime },
    { title: '원본용량', text: formatBytes(videoResource?.fileInfo.fileSize || 0) },
    // { title: '720P  용량', text: '1.6GB' },
    // { title: '480P 용량', text: '900MB' },
    { title: '해상도', text: `${width} X ${height}` },
    { title: '파일형식', text: videoResource?.fileInfo.extType?.toLocaleUpperCase() },
    // { title: '비디오 코덱', text: 'H264' },
    // { title: '비디오 프레임레이트', text: '' },
    // { title: '오디오 코덱', text: '' },
    // { title: '오디오 샘플레이트', text: '' },
  ];

  // media btn list
  const buttons = [
    {
      label: '원본 다운로드',
      onClick: () => console.log('btn 1'),
    },
    {
      label: '동영상 변경',
      onClick: () => console.log('btn 2'),
    },
    {
      label: '콘텐츠 URL보기',
      onClick: () => console.log('btn 3'),
    },
    {
      label: '미리보기',
      onClick: () => {
        openModal({
          width: 'full',
          content: <PreviewLearningWindow contentUuid={contentUuid} />,
        });
      },
    },
  ];

  if (isProcessingNone(status)) return null;

  return (
    <>
      <strong className={style.title}>업로드 파일</strong>
      {/* 인코딩 진행 중 */}
      {isProcessing(status) && (
        <div className={style.status_wrap}>
          <Spinner isLoading={true} showBackdrop className={style.loading} />
          <p className={style.text}>
            <strong>인코딩 진행 중입니다.</strong>
            인코딩 대기 및 영상 길이에 따라 인코딩 시간이 오래 걸릴수도 있습니다.
          </p>
        </div>
      )}
      {/* 인코딩 실패 */}
      {isProcessingFailed(status) && (
        <div className={style.status_wrap}>
          <IcoStatusFail className={style.fail} />
          <p className={style.text}>
            <strong>인코딩이 실패되었습니다.</strong>
            다시 시도해 주세요.
          </p>
          <div className={style.btn_box}>
            <Button className={style.btn} variant="gray" size="sm">
              재시도
            </Button>
            <Button className={style.btn} variant="primary" size="sm">
              동영상 변경
            </Button>
          </div>
        </div>
      )}
      {isProcessingCompleted(status) && (
        <>
          <ul className={style.btn_list}>
            {buttons.map((btn, index) => (
              <li>
                <Button key={index} onClick={btn.onClick} className={style.btn_text}>
                  {btn.label}
                </Button>
              </li>
            ))}
          </ul>
          {/* media(비디오 영역) */}
          {url && (
            <div className={style.media}>
              <ReactPlayer url={url} playing controls width={416} />
              {/* <img src={'https://picsum.photos/200'} width="100%" alt="" /> */}
            </div>
          )}
          {/* info_list */}
          <ul className={style.info_list}>
            {infoList.map((item, index) => (
              <li key={index}>
                <span className={style.title}>{item.title}</span>
                <span className={style.text}>{item.text}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export const MovieInfo = MovieInfoComponent;
