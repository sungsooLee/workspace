import { createFileRoute } from '@tanstack/react-router';
import { Carousel } from '@learnway/ui';
import { Navigation } from 'swiper/modules';

export const Route = createFileRoute('/_guide/guide/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_guide/guide/test"!
      <Carousel
        items={[<h3>item A</h3>, <h3>item B</h3>, <h3>item C</h3>]}
        modules={[Navigation]}
        navigation={true}
      />
    </div>
  );
}
