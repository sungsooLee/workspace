import react, { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { isMobile } from 'react-device-detect';

import styles from './thumnail-list.module.css';

import { IcoPlay, IcoRating, IcoHeart, IcoEye, IcoPhone02, IcoMonitor01 } from '@learnway/icons';

import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';

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
  const imgPlay = true; // 이미지 play

  // 찜
  const [icoHeart, setIcoHeart] = useState(true);
  const eventClick = () => {
    if (icoHeart === true) {
      setIcoHeart(false);
    } else {
      setIcoHeart(true);
    }
  };

  return (
    <div className={cn(styles.start, styles.thumbnail, direction && styles[direction])}>
      {/* link (찜 기능과 겹침으로 따로 빠짐) */}
      <Link to="" className={styles.link}></Link>

      <div className={styles.thumnail_box}>
        {/* img */}
        <div className={styles.img_box}>
          <ul className={styles.label}>
            {label.map((labels, index) => (
              <li key={index} style={{ backgroundColor: labels.color }}>
                {labels.text}
              </li>
            ))}
          </ul>
          <div className={styles.img}>
            <img src={listImage1} alt="" />
            {/* play img */}
            {imgPlay ? (
              <div className={styles.img_play}>
                <img src={playImg} alt="" />
              </div>
            ) : (
              ''
            )}
          </div>
          {/* haert (mobile에서 찜 노출 x) */}
          {isMobile ? (
            ''
          ) : (
            <div className={styles.heart}>
              <Button
                className={cn(styles.btn_heart, icoHeart === true ? styles.active : '')}
                onClick={eventClick}
              >
                <IcoHeart
                  width={24}
                  height={24}
                  fill={icoHeart === true ? '#fff' : 'none'}
                  stroke="#fff"
                ></IcoHeart>
              </Button>
            </div>
          )}
        </div>
        {/* txt */}
        <div className={styles.text_box}>
          <div className={styles.type}>
            {/* type */}
            <span className={styles.txt}>동영상</span>
            <span className={styles.time}>
              {/* time icon */}
              <IcoPlay width={12} height={12} fill="#6f798b" />
              {/* time */}
              04:59
            </span>
          </div>
          <p className={styles.text}>필수개발과정</p>
          {/* (mobile에서 노출 x) */}
          {isMobile ? (
            ''
          ) : (
            <>
              <div className={styles.ico_box}>
                <span className={styles.ico_rating}>
                  <IcoRating className={styles.ico}></IcoRating>
                  {/* rating */}
                  <span className={styles.txt}>4.2</span>
                </span>
                <span className={styles.ico_heart}>
                  <IcoHeart className={styles.ico} fill="none" stroke="#a9afb8"></IcoHeart>
                  {/* heart */}
                  <span className={styles.txt}>33</span>
                </span>
                <span className={styles.ico_eye}>
                  <IcoEye className={styles.ico} fill="none" stroke="#a9afb8" />
                  {/* eye */}
                  <span className={styles.txt}>55</span>
                </span>
              </div>

              <div className={styles.related_box}>
                <span className={styles.related}>
                  <IcoPhone02 className={styles.ico} fill="none" stroke="#4c515e" />
                  <span className={styles.txt}>모바일전용</span>
                </span>
                <span className={styles.related}>
                  <IcoMonitor01 className={styles.ico} fill="none" stroke="#4c515e" />
                  <span className={styles.txt}>사내IP전용</span>
                </span>
                <span className={styles.related}>
                  <span className={styles.txt}>#AI기술</span>
                </span>
                <span className={styles.related}>
                  <span className={styles.txt}>#AI기술</span>
                </span>
                <span className={styles.related}>
                  <span className={styles.txt}>#AI기술</span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ThumnailList = memo(ThumnailListCompoment);
