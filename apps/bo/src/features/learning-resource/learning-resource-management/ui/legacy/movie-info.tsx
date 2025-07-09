import styles from './movie-info.module.scss';
import { FC } from 'react';
import { Button, Spinner } from '@learnway/ui';
import { IcoStatusFail } from '@learnway/icons';
import style from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';

interface MovieInfoProps {
  status: 'loading' | 'fail' | 'success';
}

const MovieInfoComponent: FC<any> = ({ status }) => {
  // media info_list
  const infoList = [
    { title: '파일명', text: '파일명이 들어갑니다' },
    { title: '재생시간', text: '1시간' },
    { title: '원본용량', text: '2GB' },
    { title: '720P  용량', text: '1.6GB' },
    { title: '480P 용량', text: '900MB' },
    { title: '해상도', text: '1902 X 968' },
    { title: '파일형식', text: 'MOV' },
    { title: '비디오 코덱', text: 'H264' },
    { title: '비디오 프레임레이트', text: '' },
    { title: '오디오 코덱', text: '' },
    { title: '오디오 샘플레이트', text: '' },
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
      onClick: () => console.log('btn 4'),
    },
  ];

  return (
    <>
      <strong className={style.title}>업로드 파일</strong>
      {(status === 'loading' || status === 'fail') && (
        <div className={style.status_wrap}>
          {/* 인코딩 진행 중 */}
          {status === 'loading' && (
            <>
              <Spinner isLoading={true} showBackdrop className={style.loading} />
              <p className={style.text}>
                <strong>인코딩 진행 중입니다.</strong>
                인코딩 대기 및 영상 길이에 따라 인코딩 시간이 오래 걸릴수도 있습니다.
              </p>
            </>
          )}
          {/* 인코딩 실패 */}
          {status === 'fail' && (
            <>
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
            </>
          )}
        </div>
      )}

      {status === 'success' && (
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
          <div className={style.media}>
            <img src={'https://picsum.photos/200'} width="100%" alt="" />
          </div>
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
