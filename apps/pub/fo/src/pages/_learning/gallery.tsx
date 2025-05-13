import { useState, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Pagination, Carousel, Button } from '@learnway/ui';

import styles from './gallery.module.css';

import { IcoArrowBackward } from '@learnway/icons';

// 예시 이미지
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import bnrImage2 from '@learnway/styles/fo/assets/images/temp/img_discrimination.png';
import backImage from '@learnway/styles/fo/assets/images/temp/img_gallery_back.jpg';

export const Route = createFileRoute('/_learning/gallery')({
  component: RouteComponent,
});

function RouteComponent() {
  // swiper
  const swiperRef = useRef<any>(null);

  // swiper slide 개수
  const [swiperCount, setSwiperCount] = useState<number>(0);

  // 메인 사진 이미지 넘버
  const [mainImgIndex, setMainImgIndex] = useState<number>(0);

  // 사진 순서
  const photoArray = [
    bnrImage1,
    bnrImage2,
    bnrImage1,
    bnrImage2,
    bnrImage1,
    bnrImage2,
    bnrImage1,
    bnrImage2,
    bnrImage1,
    bnrImage2,
    bnrImage1,
    bnrImage2,
    bnrImage1,
    bnrImage2,
  ];

  // 사진 스와이퍼
  const items = [
    <Button>
      <img src={bnrImage1} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage2} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage1} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage2} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage1} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage2} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage1} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage2} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage1} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage2} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage1} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage2} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage1} alt="" />
    </Button>,
    <Button>
      <img src={bnrImage2} alt="" />
    </Button>,
  ];

  // 스와이퍼 체인지 시 index 값 변경
  const handlePhothChange = (realIndex: number) => {
    setMainImgIndex(realIndex);
  };

  // 스와이퍼 사진 클릭
  const handlePhotoClick = (current: any) => {
    setMainImgIndex(current.clickedIndex);
    swiperRef.current.slideTo(current.clickedIndex);
  };

  // 스와이퍼 prev 클릭
  const handlePrevClick = () => {
    if (mainImgIndex - 1 >= 0) {
      setMainImgIndex(mainImgIndex - 1);
      swiperRef.current.slideTo(mainImgIndex - 1);
    }
  };

  // 스와이퍼 next 클릭
  const handleNextClick = () => {
    if (mainImgIndex + 1 < swiperCount) {
      setMainImgIndex(mainImgIndex + 1);
      swiperRef.current.slideTo(mainImgIndex + 1);
    }
  };

  return (
    <div className={`${styles.start} ${styles.gallery_wrap}`}>
      {/* background */}
      <div className={styles.background}>
        <img src={backImage} alt="" />
        <div className={styles.black}></div>
      </div>
      <div className={styles.photo_wrap}>
        <div className={styles.photo}>
          <Button className={styles.img}>
            <img src={photoArray[mainImgIndex]} alt="" />
          </Button>
          {/* prev, next button */}
          <Button className={styles.btn_prev} onClick={() => handlePrevClick()}>
            <IcoArrowBackward width={40} height={40} stroke="#fff" />
          </Button>
          <Button className={styles.btn_next} onClick={() => handleNextClick()}>
            <IcoArrowBackward width={40} height={40} stroke="#fff" />
          </Button>
        </div>
        {/* swiper */}
        <div className={styles.swiper}>
          <Carousel
            ref={swiperRef}
            items={items}
            className={`${styles.photo_swiper}`}
            spaceBetween={8}
            slidesPerView="auto"
            centeredSlides={true}
            onSwiper={(swiper) => {
              setSwiperCount(swiper.slides.length);
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => handlePhothChange(swiper.realIndex)}
            onClick={() => handlePhotoClick(swiperRef.current)}
          />
        </div>
      </div>
    </div>
  );
}
