import { forwardRef } from 'react';

import * as Primitive from '../shadcn/carousel';
import * as CardPrimitive from '../shadcn/card';
import { Carousel, CarouselComponentProps } from './carousel';

interface ImageCarouselComponentProps extends CarouselComponentProps {
  imageUrls: Array<string>;
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
  return imageUrls.map((imagePath: string, index: number) => (
    <div key={imagePath}>
      <img src={imagePath} />
    </div>
  ))
}

ImageCarouselComponent.displayName = 'ImageCarousel';

export const ImageCarousel = ImageCarouselComponent
