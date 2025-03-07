import react, { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Heart, Label } from '../../../features/layout';

import styles from './thumnail-list.module.css';

import { IcoPlay, IcoRating, IcoHeart, IcoEye, IcoPhone02, IcoMonitor01 } from '@learnway/icons';

// 예시이미지
import listImage1 from '../../../assets/images/temp/category_product_01.png';
import listImage2 from '../../../assets/images/temp/category_product_02.png';
import listImage3 from '../../../assets/images/temp/category_product_03.png';

interface ThumnailListProps {
  className?: string;
  listUi?: string;
}

const ThumnailListCompoment = ({ className, listUi }: ThumnailListProps) => {
  // 강의
  const lists = [
    {
      imgSrc: listImage1,
      type: '동영상',
      time: '04:59',
      text: '필수개발과정',
      rating: '4.2',
      heart: '33',
      eye: '55',
      related: [
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
      ],
    },
    {
      imgSrc: listImage2,
      type: '동영상',
      time: '04:59',
      text: '필수개발과정',
      rating: '4.2',
      heart: '33',
      eye: '55',
      related: [
        { txt: '모바일전용', icon: IcoPhone02 },
        { txt: '사내IP전용', icon: IcoMonitor01 },
        { txt: '#AI기술', icon: 'none' },
        { txt: '#C', icon: 'none' },
      ],
    },
    {
      imgSrc: listImage3,
      type: '동영상',
      time: '04:59',
      text: '필수개발과정',
      rating: '4.2',
      heart: '33',
      eye: '55',
      related: [
        { txt: '모바일전용', icon: IcoPhone02 },
        { txt: '사내IP전용', icon: IcoMonitor01 },
        { txt: '#AI기술', icon: 'none' },
        { txt: '#C', icon: 'none' },
      ],
    },
    {
      imgSrc: listImage1,
      type: '동영상',
      time: '04:59',
      text: '필수개발과정',
      rating: '4.2',
      heart: '33',
      eye: '55',
      related: [
        { txt: '모바일전용', icon: IcoPhone02 },
        { txt: '사내IP전용', icon: IcoMonitor01 },
        { txt: '#AI기술', icon: 'none' },
        { txt: '#C', icon: 'none' },
      ],
    },
    {
      imgSrc: listImage2,
      type: '동영상',
      time: '04:59',
      text: '필수개발과정',
      rating: '4.2',
      heart: '33',
      eye: '55',
      related: [
        { txt: '모바일전용', icon: IcoPhone02 },
        { txt: '사내IP전용', icon: IcoMonitor01 },
        { txt: '#AI기술', icon: 'none' },
        { txt: '#C', icon: 'none' },
      ],
    },
    {
      imgSrc: listImage3,
      type: '동영상',
      time: '04:59',
      text: '필수개발과정',
      rating: '4.2',
      heart: '33',
      eye: '55',
      related: [
        { txt: '모바일전용', icon: IcoPhone02 },
        { txt: '사내IP전용', icon: IcoMonitor01 },
        { txt: '#AI기술', icon: 'none' },
        { txt: '#C', icon: 'none' },
      ],
    },
    {
      imgSrc: listImage1,
      type: '동영상',
      time: '04:59',
      text: '필수개발과정',
      rating: '4.2',
      heart: '33',
      eye: '55',
      related: [
        { txt: '모바일전용', icon: IcoPhone02 },
        { txt: '사내IP전용', icon: IcoMonitor01 },
        { txt: '#AI기술', icon: 'none' },
        { txt: '#C', icon: 'none' },
      ],
    },
    {
      imgSrc: listImage2,
      type: '동영상',
      time: '04:59',
      text: '필수개발과정',
      rating: '4.2',
      heart: '33',
      eye: '55',
      related: [
        { txt: '모바일전용', icon: IcoPhone02 },
        { txt: '사내IP전용', icon: IcoMonitor01 },
        { txt: '#AI기술', icon: 'none' },
        { txt: '#C', icon: 'none' },
      ],
    },
  ];

  return (
    <div className={cn(styles.list, className, listUi === 'type2' ? styles.tpye2 : 'type')}>
      {lists.map((list, index) => (
        <div key={index} className={styles.listBox}>
          <Link to="" className={styles.link}>
            <div className={styles.img_box}>
              <Label className={styles.label}></Label>
              <div className={styles.img}>
                <img src={list.imgSrc} alt="" />
              </div>
            </div>

            <div className={styles.text_box}>
              <div className={styles.type}>
                {/* type */}
                <span className={styles.txt}>{list.type}</span>
                <span className={styles.time}>
                  <IcoPlay width={12} height={12} fill="#6f798b" />
                  {/* 시간 */}
                  {list.time}
                </span>
              </div>
              <p className={styles.text}>{list.text}</p>
              <div className={styles.ico_box}>
                <span className={styles.ico_rating}>
                  <IcoRating className={styles.ico}></IcoRating>
                  {/* rating */}
                  <span className={styles.txt}>{list.rating}</span>
                </span>
                <span className={styles.ico_heart}>
                  <IcoHeart className={styles.ico} fill="none" stroke="#a9afb8"></IcoHeart>
                  {/* heart */}
                  <span className={styles.txt}>{list.heart}</span>
                </span>
                <span className={styles.ico_eye}>
                  <IcoEye className={styles.ico} fill="none" stroke="#a9afb8" />
                  {/* eye */}
                  <span className={styles.txt}>{list.eye}</span>
                </span>
              </div>

              <div className={styles.related_box}>
                {list.related.map((relateds, index) => (
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

          <Heart className={styles.heart}></Heart>
        </div>
      ))}
    </div>
  );
};

export const ThumnailList = memo(ThumnailListCompoment);
