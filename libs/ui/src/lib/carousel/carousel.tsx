import { forwardRef, memo } from 'react';

import * as Primitive from './carousel.shadcn';

export interface CarouselComponentProps extends Primitive.CarouselProps {
  items?: Array<JSX.Element>;
}

const CarouselComponent = forwardRef<
  React.ElementRef<typeof Primitive.Carousel>,
  CarouselComponentProps
>(({ items, ...props }) => {
  return (
    <>
      <Primitive.Carousel {...props}>
        <Primitive.CarouselContent>
          {items}
        </Primitive.CarouselContent>
        <Primitive.CarouselPrevious />
        <Primitive.CarouselNext />
      </Primitive.Carousel>
    </>
  )
})

export const Carousel = memo(CarouselComponent)
