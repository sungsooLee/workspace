import { createFileRoute } from '@tanstack/react-router';
import { memo, useState, useRef, useEffect } from 'react';
import { IcoArrowForward } from '@learnway/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Chips, SelectOption } from '@learnway/ui';
import { Navigation } from 'swiper/modules';

export const Route = createFileRoute('/_guide/guide/carousel')({
  component: RouteComponent,
});

function RouteComponent() {
  const items: SelectOption[] = [
    { label: '현대자동차 현대자동차현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
    { label: '현대자동차 g', value: 'g' },
    { label: '현대자동차 h', value: 'h' },
    { label: '현대자동차 i', value: 'i' },
    { label: '현대자동차 j', value: 'j' },
    { label: '현대자동차 k', value: 'k' },
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
    <div>
      <h2 className="guide_tit2">Carousel Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/carousel/carousel.tsx</p>
      <p className="info">영역이 넘어가면 자동으로 화살표 생성 : 디자인에 맞게 커스텀 필요</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { memo, useState, useRef, useEffect } from 'react'; // useState, useRef, useEffect
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// 실행함수
const prevRef = useRef<HTMLDivElement | null>(null);
const nextRef = useRef<HTMLDivElement | null>(null);
const swiperRef = useRef<any>(null);

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

// 적용방법(예시)
<Swiper
    ref={swiperRef}
    spaceBetween={8}
    slidesPerView="auto"
    loop={false}
    modules={[Navigation]}
    className="recent_swiper">
    <div className="lists">
    {items.map((item, index) => (
        <SwiperSlide key={index} className="slide">
        <Chips
            className="item"
            option={{ label: item.label, value: item.value }}
        />
        </SwiperSlide>
    ))}
    </div>
</Swiper>`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Swiper</h3>
        <div className="flex_box">
          <div className="desc">
            <Swiper
              ref={swiperRef}
              spaceBetween={8}
              slidesPerView="auto"
              loop={false}
              modules={[Navigation]}
              className="recent_swiper flex w-full justify-start">
              <div className="lists">
                {items.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="slide flex w-auto items-center justify-start gap-[8px] overflow-hidden whitespace-nowrap">
                    <Chips className="item" option={{ label: item.label, value: item.value }} />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>

            <div ref={prevRef} className="recent_button_prev">
              <div className="btn">
                <IcoArrowForward width={16} height={16} stroke="#6F798B" />
              </div>
            </div>
            <div ref={nextRef} className="recent_button_next">
              <div className="btn">
                <IcoArrowForward width={16} height={16} stroke="#6F798B" />
              </div>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Swiper
    ref={swiperRef}
    spaceBetween={8}
    slidesPerView="auto"
    loop={false}
    modules={[Navigation]}
    className="recent_swiper">
    <div className="lists">
    {items.map((item, index) => (
        <SwiperSlide key={index} className="slide">
        <Chips
            className="item"
            option={{ label: item.label, value: item.value }}
        />
        </SwiperSlide>
    ))}
    </div>
</Swiper>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
