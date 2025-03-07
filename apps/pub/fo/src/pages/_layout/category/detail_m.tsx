import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useRef, useEffect, useState } from 'react';

import styles from './detail_m.module.css';

// 예시 이미지

export const Route = createFileRoute('/_layout/category/detail_m')({
  component: RouteComponent,
});

function RouteComponent() {
  // 상단 배너 스와이퍼
  const items = [1, 3, 2];
  // 배너 스와이퍼 옵션
  const carouselOption = {
    spaceBetween: 20,
    slidesPerView: 2.2,
  };

  return <div className={styles.start}></div>;
}
