import { memo, useState } from 'react';
import { Carousel, Button } from '@learnway/ui';

import styles from '@learnway/styles/fo/widgets/layout/ui/container/related-search.module.css';
import { Navigation } from 'swiper/modules';

function RelatedSearchComponent() {
  const items = [
    <Button variant="search" size="sm">
      파이썬 기초
    </Button>,
    <Button variant="search" size="sm">
      파이썬 문법
    </Button>,
    <Button variant="search" size="sm">
      파이썬 딕셔너리
    </Button>,
    <Button variant="search" size="sm">
      파이썬 머싱러닝
    </Button>,
    <Button variant="search" size="sm">
      파이썬 인공지능
    </Button>,
    <Button variant="search" size="sm">
      인터프리터
    </Button>,
    <Button variant="search" size="sm">
      파일썬 개발 환경
    </Button>,
    <Button variant="search" size="sm">
      최신 트랜드
    </Button>,
    <Button variant="search" size="sm">
      객체지향프래그래밍객체지향프래그래밍
    </Button>,
    <Button variant="search" size="sm">
      동적 프로퍼티
    </Button>,
    <Button variant="search" size="sm">
      동적 프로퍼티
    </Button>,
    <Button variant="search" size="sm">
      동적 프로퍼티
    </Button>,
  ];

  return (
    <div className={`${styles.start} ${styles.related}`}>
      <div className={styles.tit_box}>
        <strong>연관 검색어</strong>
      </div>
      <div className={styles.swiper}>
        <Carousel
          items={items}
          className={`${styles.related_swiper}`}
          spaceBetween={8}
          slidesPerView={'auto'}
          modules={[Navigation]}
          navigation={true}
        />
      </div>
    </div>
  );
}

export const RelatedSearch = memo(RelatedSearchComponent);
