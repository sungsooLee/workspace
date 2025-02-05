import { forwardRef, HTMLAttributes } from 'react';

export interface CardComponentProps extends HTMLAttributes<HTMLDivElement> {
  items?: Array<never>;
}

const CardComponent = forwardRef<HTMLDivElement, CardComponentProps>(({ items, ...props }) => {
  return <>Card</>;
});

export const Card = CardComponent;
