import react, { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';

import styles from './thumnail-list.module.css';

import { IcoPlay, IcoRating, IcoHeart, IcoEye, IcoPhone02, IcoMonitor01 } from '@learnway/icons';

// 예시이미지
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

interface ThumnailListProps {
  direction?: string; // vertical (세로형) | horizontal (가로형), {default 세로형}
}

const ThumnailListCompoment = ({ direction }: ThumnailListProps) => {
  // 강의
  const label = [
    { text: 'New', color: '#00afd5' },
    { text: '접수중', color: '#06226a' },
    { text: 'D-7', color: '#ff4646' },
  ];

  const imgUrl = listImage1; // 이미지 Url
  const type = '동영상'; // 유형
  const time = '04:59'; // 강의 시간
  const lecture = '필수개발과정';
  const rating = '4.2';
  const heart = '33';
  const eye = '55';
  const related = [
    { txt: '모바일전용', icon: IcoPhone02 },
    { txt: '사내IP전용', icon: IcoMonitor01 },
    { txt: '#AI기술', icon: 'none' },
    { txt: '#C', icon: 'none' },
    { txt: '모바일전용', icon: IcoPhone02 },
    { txt: '사내IP전용', icon: IcoMonitor01 },
    { txt: '#AI기술', icon: 'none' },
    { txt: '#C', icon: 'none' },
    { txt: '모바일전용', icon: IcoPhone02 },
    { txt: '사내IP전용', icon: IcoMonitor01 },
    { txt: '#AI기술', icon: 'none' },
    { txt: '#C', icon: 'none' },
    { txt: '모바일전용', icon: IcoPhone02 },
    { txt: '사내IP전용', icon: IcoMonitor01 },
    { txt: '#AI기술', icon: 'none' },
    { txt: '#C', icon: 'none' },
  ];

  const [icoHeart, setIcoHeart] = useState(true);
  const eventClick = () => {
    if (icoHeart === true) {
      setIcoHeart(false);
    } else {
      setIcoHeart(true);
    }
  };

  return (
    <div className={cn(styles.start, styles.list_box, direction && styles[direction])}>
      <Link to="" className={styles.link}>
        <div className={styles.img_box}>
          <ul className={styles.label}>
            {label.map((labels, index) => (
              <li key={index} style={{ backgroundColor: labels.color }}>
                {labels.text}
              </li>
            ))}
          </ul>
          <div className={styles.img}>
            <img src={imgUrl} alt="" />
          </div>
        </div>
        <div className={styles.text_box}>
          <div className={styles.type}>
            {/* type */}
            <span className={styles.txt}>{type}</span>
            <span className={styles.time}>
              <IcoPlay width={12} height={12} fill="#6f798b" />
              {/* time */}
              {time}
            </span>
          </div>
          <p className={styles.text}>{lecture}</p>
          <div className={styles.ico_box}>
            <span className={styles.ico_rating}>
              <IcoRating className={styles.ico}></IcoRating>
              {/* rating */}
              <span className={styles.txt}>{rating}</span>
            </span>
            <span className={styles.ico_heart}>
              <IcoHeart className={styles.ico} fill="none" stroke="#a9afb8"></IcoHeart>
              {/* heart */}
              <span className={styles.txt}>{heart}</span>
            </span>
            <span className={styles.ico_eye}>
              <IcoEye className={styles.ico} fill="none" stroke="#a9afb8" />
              {/* eye */}
              <span className={styles.txt}>{eye}</span>
            </span>
          </div>
          <div className={styles.related_box}>
            {related.map((relateds, index) => (
              <span className={styles.related} key={index}>
                {relateds.icon === 'none' ? null : (
                  <relateds.icon className={styles.ico} fill="none" stroke="#4c515e" />
                )}
                <span className={styles.txt}>{relateds.txt}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
      {/* haert */}
      <div className={styles.heart}>
        <Button
          className={cn(styles.btn_heart, icoHeart === true ? styles.active : '')}
          onClick={eventClick}>
          <IcoHeart
            width={24}
            height={24}
            fill={icoHeart === true ? '#fff' : 'none'}
            stroke="#fff"></IcoHeart>
        </Button>
      </div>
    </div>
  );
};

export const ThumnailList = memo(ThumnailListCompoment);
