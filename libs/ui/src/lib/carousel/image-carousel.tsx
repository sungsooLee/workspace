import { forwardRef } from 'react';

import * as Primitive from '../shadcn/carousel';
import * as CardPrimitive from '../shadcn/card';
import { Carousel, CarouselComponentProps } from './carousel';

interface ImageCarouselComponentProps extends CarouselComponentProps {
  imageUrls: Array<string>;
  items?: Array<JSX.Element>;
}

const ImageCarouselComponent = forwardRef<
  React.ElementRef<typeof Primitive.Carousel>,
  ImageCarouselComponentProps
>(({ ...props }) => {
  const items = ImageItems(props.imageUrls);
  return (
    <Carousel
      {...props}
      items={items}
    />
  )
})

const ImageItems = (imageUrls: Array<string>) => {
  return imageUrls.map((_: string, index: number) => (
    <Primitive.CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
        <CardPrimitive.Card>
          <CardPrimitive.CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-3xl font-semibold">{_}</span>
          </CardPrimitive.CardContent>
        </CardPrimitive.Card>
      </div>
    </Primitive.CarouselItem>
  ))
}

export const ImageCarousel = ImageCarouselComponent
