import { Button } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import mediaImg from '../../assets/images/temp/img_temp_media.jpg';
import { forwardRef } from 'react';

const MovieInfoComponent = forwardRef<HTMLUListElement, any>(({ name, value, onChange }, ref) => {
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
  return (
    <>
      <ul ref={ref} className={styles.btn_list}>
        {buttons.map((btn, index) => (
          <li key={index}>
            <Button onClick={btn.onClick} className={styles.btn_text}>
              {btn.label}
            </Button>
          </li>
        ))}
      </ul>
      <div className={styles.media}>
        <img src={mediaImg} width="100%" alt="" />
      </div>
      {/* info_list */}
      <ul className={styles.info_list}>
        {infoList.map((item, index) => (
          <li key={index}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.text}>{item.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
});

export const MovieInfo = MovieInfoComponent;
