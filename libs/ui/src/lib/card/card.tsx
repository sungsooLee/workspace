import { forwardRef, HTMLAttributes } from 'react';

export interface CardComponentProps extends HTMLAttributes<HTMLDivElement> {
  items?: Array<never>;
}

const CardComponent = forwardRef<HTMLDivElement, CardComponentProps>(({ items, ...props }, ref) => {
  return <div ref={ref}>Card</div>;
});

export const Card = CardComponent;
