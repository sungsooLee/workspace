import { FC, useState, useRef, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import backImage from '@learnway/styles/fo/assets/images/temp/img_gallery_back.jpg';

import { IcoArrowBackward } from '@learnway/icons';

import { CmsImageItem } from '@learnway/types';
import { useLearningWindow } from '../../learnway-learning-window.store';
import { Button } from '../../../button/button';
import { Carousel } from '../../../carousel/carousel';

const styles = isMobile ? stylesMobile : stylesWeb;

const LearningWindowGalleryPlayerComponent: FC<any> = () => {
  // swiper
  const swiperRef = useRef<any>(null);

  // swiper slide 개수
  const [swiperCount, setSwiperCount] = useState<number>(0);
  // 메인 사진 이미지 넘버
  const [mainImgIndex, setMainImgIndex] = useState<number>(0);

  const [imageList, setImageList] = useState<CmsImageItem[]>([]);

  const { playInfo, galleryInfo, funcInfo } = useLearningWindow();

  // 스와이퍼 체인지 시 index 값 변경
  const handlePhothChange = (realIndex: number) => {
    setMainImgIndex(realIndex);
    console.log('imageChange', imageList[0]);
    const payload = {
      courseSequenceId: playInfo?.sequenceId,
      courseId: playInfo?.courseId,
      curriculumId: playInfo?.curriculumId,
      moduleId: playInfo?.moduleId,
      lessonId: playInfo?.lessonId,
      contentUuid: playInfo?.contentUuid,
      resourceId: imageList[realIndex].resourceId,
      fileUuid: imageList[realIndex].fileUuid,
    };
    funcInfo?.galleryLearningHistory(payload);
  };

  // 스와이퍼 사진 클릭
  const handlePhotoClick = (current: any) => {
    setMainImgIndex(current.clickedIndex);
    swiperRef.current.slideTo(current.clickedIndex);
  };

  // 스와이퍼 prev 클릭
  const handlePrevClick = () => {
    console.log('handlePrevClick');
    if (mainImgIndex - 1 >= 0) {
      setMainImgIndex(mainImgIndex - 1);
      swiperRef.current.slideTo(mainImgIndex - 1);
    }
  };

  // 스와이퍼 next 클릭
  const handleNextClick = () => {
    console.log('handleNextClick');
    if (mainImgIndex + 1 < swiperCount) {
      setMainImgIndex(mainImgIndex + 1);
      swiperRef.current.slideTo(mainImgIndex + 1);
    }
  };
  useEffect(() => {
    if (!imageList || imageList.length == 0) return;
    handlePhothChange(0);
  }, [imageList]);

  useEffect(() => {
    if (!galleryInfo) return;
    const newImageList: CmsImageItem[] = [];
    for (const item of galleryInfo.images) {
      newImageList.push(item);
    }
    setImageList(newImageList);
    setSwiperCount(galleryInfo.images.length);
  }, [galleryInfo]);

  console.log(mainImgIndex);
  return (
    <div className={`${styles.start} ${styles.gallery_wrap}`}>
      {!isMobile && (
        <div className={styles.background}>
          <img src={backImage} alt="" />
          <div className={styles.black}></div>
        </div>
      )}

      <div className={styles.photo_wrap}>
        <div className={styles.photo}>
          <Button className={styles.img}>
            <img
              src={imageList && imageList.length > 0 ? imageList[mainImgIndex].itemUrl : ''}
              alt=""
            />
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
            items={imageList.map((item) => {
              return (
                <Button>
                  <img src={item.itemUrl} alt="" />
                </Button>
              );
            })}
            className={`${styles.photo_swiper}`}
            spaceBetween={8}
            slidesPerView="auto"
            centeredSlides={true}
            prevDisabled={true}
            nextDisabled={mainImgIndex + 1 >= swiperCount}
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
};

export const LearningWindowGalleryPlayer = LearningWindowGalleryPlayerComponent;
