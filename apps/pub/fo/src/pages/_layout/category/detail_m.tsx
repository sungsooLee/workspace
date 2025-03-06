import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@learnway/shared';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Select, Button, Pagination, Input, ContentsRow, useModal } from '@learnway/ui';
import { Navigation } from 'swiper/modules';
import { Arrays, Heart, Filter } from '../../../features/layout';
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

// 예시 이미지
import bnrCImage1 from '../../../assets/images/banner/banner_category_01.png';
import bnrCImage2 from '../../../assets/images/banner/banner_category_02.png';
import listImage1 from '../../../assets/images/temp/category_product_01.png';
import listImage2 from '../../../assets/images/temp/category_product_02.png';
import listImage3 from '../../../assets/images/temp/category_product_03.png';

export const Route = createFileRoute('/_layout/category/detail_m')({
  component: RouteComponent,
});

function RouteComponent() {
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
  ];

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);

  // modal
  const { open: openModal } = useModal();

  // pagenation
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);

  const [listUi, setListUi] = useState(false);
  const list_ui = () => {
    if (listUi === true) {
      setListUi(false);
    } else {
      setListUi(true);
    }
  };

  return (
    <div className={styles.start}>
      {/* <div className={styles.gray_box}>
        <ul className={styles.divisio_box}>
          <li>
            <div className={styles.search_division}>
              <Select
                className={styles.search_select}
                size="lg"
                options={[
                  { value: 'a', label: '대분류' },
                  { value: 'b', label: 'ST1' },
                  { value: 'c', label: '아이오닉 6' },
                  { value: 'd', label: '아이오닉 5' },
                  { value: 'e', label: '코나' },
                  { value: 'f', label: '넥쏘' },
                  { value: 'g', label: '포터' },
                  { value: 'h', label: '캐스퍼' },
                ]}
              />
              <Select
                className={styles.search_select}
                size="lg"
                options={[
                  { value: 'a', label: '중분류' },
                  { value: 'b', label: 'NE PE(2024)' },
                  { value: 'c', label: 'NE(2021)' },
                ]}
              />
              <Select
                className={styles.search_select}
                size="lg"
                options={[
                  { value: 'a', label: '중분류' },
                  { value: 'b', label: '상품정보' },
                  { value: 'c', label: '기술정보' },
                ]}
              />
              <ContentsRow className={styles.search}>
                <Input id="" type="text" placeholder="과정명 검색" showSearchIcon={true} />
              </ContentsRow>
            </div>
          </li>
          <li>
            <Filter></Filter>
          </li>
        </ul>
      </div>

      <Pagination
        className={cn(styles.pagenation, styles.paginationItem)}
        count={3}
        page={page}
        onChange={handlePageChange}
      /> */}
    </div>
  );
}
