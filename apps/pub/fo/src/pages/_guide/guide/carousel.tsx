import { createFileRoute } from '@tanstack/react-router';
import { Carousel } from '@learnway/ui/carousel';

export const Route = createFileRoute('/_guide/guide/carousel')({
  component: RouteComponent,
});

function RouteComponent() {
  const carouselItems = [<h3>item A</h3>, <h3>item B</h3>, <h3>item C</h3>];
  return (
    <div>
      <h2 className="guide_tit2">Carousel Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/carousel/carousel.tsx</p>
      <p className="info">
        디자인에 맞게 커스텀 필요 (className는 제약없음)
        <br />
        옵션은 필요시 추가 <br />
        {`items={[...]}`} // 배열
        <br />
        {`spaceBetween={10}`}
        <br />
        {`slidesPerView='auto'`}
        <br />
        {`loop={true}`}
        <br />
        {`showNavigation={true}`}
        <br />
        {`pagination={{ clickable: true }}`}
        <br />
        {`autoplay={{ delay: 3000, disableOnInteraction: false }}`}
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { createFileRoute } from '@tanstack/react-router';
import { Carousel } from '@learnway/ui/carousel';

const carouselItems = [<h3>item A</h3>, <h3>item B</h3>, <h3>item C</h3>];

// 적용방법(예시)
<Carousel
  spaceBetween={8}
  slidesPerView='auto'
  items={carouselItems}
  loop={true}
  showNavigation={true} // 필요에 따라
/>`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Swiper</h3>
        <div className="flex_box">
          <div className="desc">
            <Carousel
              spaceBetween={8}
              slidesPerView={'auto'}
              items={carouselItems}
              loop={true}
              showNavigation={true} // 필요에 따라
              pagination={{ clickable: true }}
            />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Carousel
  spaceBetween={8}
  slidesPerView='auto'
  items={carouselItems}
  loop={true}
  showNavigation={true}
  pagination={{ clickable: true }}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
