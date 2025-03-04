import { createFileRoute, Link } from '@tanstack/react-router';
import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Select, Button } from '@learnway/ui';
import { Navigation } from 'swiper/modules';
import { Arrays } from '../../../features/layout/ui/arrays';
import {
  IcoArray,
  IcoPlay,
  IcoRating,
  IcoHeart,
  IcoEye,
  IcoPhone02,
  IcoMonitor01,
  IcoArrowBackward,
  IcoArrowForward,
} from '@learnway/icons';
import styles from './detail.module.css';
import imgHeart from '../../../assets/images/common/img_heart.png';

// 예시 이미지
import bnrCImage1 from '../../../assets/images/banner/banner_category_01.png';
import bnrCImage2 from '../../../assets/images/banner/banner_category_02.png';
import listImage1 from '../../../assets/images/temp/category_product_01.png';
import listImage2 from '../../../assets/images/temp/category_product_02.png';
import listImage3 from '../../../assets/images/temp/category_product_03.png';

export const Route = createFileRoute('/_layout/category/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  // 상단 배너 스와이퍼
  const items = [
    { url: bnrCImage1 },
    { url: bnrCImage2 },
    { url: bnrCImage1 },
    { url: bnrCImage2 },
  ];

  // 강의
  const lists = [
    {
      label: [
        { text: 'New', color: '#00afd5' },
        { text: '접수중', color: '#06226a' },
        { text: 'D-7', color: '#ff4646' },
      ],
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
      label: [
        { text: 'New', color: '#00afd5' },
        { text: '접수중', color: '#06226a' },
        { text: 'D-7', color: '#ff4646' },
      ],
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
      label: [
        { text: 'New', color: '#00afd5' },
        { text: '접수중', color: '#06226a' },
        { text: 'D-7', color: '#ff4646' },
      ],
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
      label: [
        { text: 'New', color: '#00afd5' },
        { text: '접수중', color: '#06226a' },
        { text: 'D-7', color: '#ff4646' },
      ],
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
      label: [
        { text: 'New', color: '#00afd5' },
        { text: '접수중', color: '#06226a' },
        { text: 'D-7', color: '#ff4646' },
      ],
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
      label: [
        { text: 'New', color: '#00afd5' },
        { text: '접수중', color: '#06226a' },
        { text: 'D-7', color: '#ff4646' },
      ],
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
      label: [
        { text: 'New', color: '#00afd5' },
        { text: '접수중', color: '#06226a' },
        { text: 'D-7', color: '#ff4646' },
      ],
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
      label: [
        { text: 'New', color: '#00afd5' },
        { text: '접수중', color: '#06226a' },
        { text: 'D-7', color: '#ff4646' },
      ],
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

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);

  return (
    <div className={styles.start}>
      <div className={styles.swiper}>
        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          slidesPerView={2.2}
          loop={false}
          modules={[Navigation]}
          className={styles.recent_swiper}>
          <div>
            {items.map((item, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                <Link to="">
                  <img src={item.url} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        <div ref={prevRef} className={styles.recent_button_prev}>
          <div className={styles.btn}>
            <IcoArrowBackward width={24} height={24} stroke="#6F798B" />
          </div>
        </div>
        <div ref={nextRef} className={styles.recent_button_next}>
          <div className={styles.btn}>
            <IcoArrowForward width={24} height={24} stroke="#6F798B" />
          </div>
        </div>
      </div>

      <div className={styles.gray_box}>
        <ul className={styles.division}>
          <li>과정명 검색</li>
          <li>선택</li>
        </ul>
      </div>

      <div className={styles.lists_wrap}>
        <div className={styles.align}>
          <div className={styles.left}>
            <span className={styles.txt}>
              <em>32</em>개
            </span>
          </div>
          <div className={styles.right}>
            <div className={styles.box}>
              <Arrays></Arrays>
            </div>
            <div className={styles.box}>
              <Select
                options={[
                  { value: '20', label: '20개씩' },
                  { value: '50', label: '50개씩' },
                  { value: '80', label: '80개씩' },
                ]}
              />
            </div>
            <div className={styles.box}>
              <Button>
                <IcoArray width={24} height={24} stroke="#a9afb8" fill="none" />
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.list}>
          {lists.map((list, index) => (
            <div key={index} className={styles.listBox}>
              <Link to="">
                <div className={styles.img_box}>
                  <ul className={styles.label_box}>
                    {list.label.map((labels, index) => (
                      <li key={index} style={{ backgroundColor: labels.color }}>
                        {labels.text}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.img}>
                    <img src={list.imgSrc} alt="" />
                  </div>
                  <div className={styles.heart}>
                    <img src={imgHeart} />
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
                    <span className={styles.rating}>
                      <IcoRating className={styles.ico}></IcoRating>
                      {/* rating */}
                      <span className={styles.txt}>{list.rating}</span>
                    </span>
                    <span className={styles.heart}>
                      <IcoHeart className={styles.ico} fill="none" stroke="#a9afb8"></IcoHeart>
                      {/* heart */}
                      <span className={styles.txt}>{list.heart}</span>
                    </span>
                    <span className={styles.eye}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
