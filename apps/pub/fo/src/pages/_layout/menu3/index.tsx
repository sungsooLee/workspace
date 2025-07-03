import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Carousel } from '@learnway/ui';
import bnrCImage1 from '@learnway/styles/fo/assets/images/banner/banner_category_01.png';
import bnrCImage2 from '@learnway/styles/fo/assets/images/banner/banner_category_02.png';

export const Route = createFileRoute('/_layout/menu3/')({
  component: RouteComponent,
});

function RouteComponent() {
  // 상단 배너 스와이퍼
  const items = [
    <Link to="">
      <img src={bnrCImage1} alt="" />
    </Link>,
    <Link to="">
      <img src={bnrCImage2} alt="" />
    </Link>,
    <Link to="">
      <img src={bnrCImage1} alt="" />
    </Link>,
  ];
  return (
    <div>
      <Carousel
        items={items}
        loop={true}
        spaceBetween={20}
        slidesPerView={2.2}
        navigation={true}
        pagination={true}
        autoplay={{ delay: 4000 }}
      />
    </div>
  );
}
