import { forwardRef, memo, HTMLAttributes } from 'react';

import * as Primitive from '../shadcn/card';

export interface CardComponentProps extends HTMLAttributes<HTMLDivElement> {
  items?: Array<never>;
}

const CardComponent = forwardRef<
  React.ElementRef<typeof Primitive.Card>,
  CardComponentProps
>(({ items, ...props }) => {
  return (
    <Primitive.Card>
      <Primitive.CardHeader>
        <Primitive.CardTitle>Card Title</Primitive.CardTitle>
        <Primitive.CardDescription>Card Description</Primitive.CardDescription>
      </Primitive.CardHeader>
      <Primitive.CardContent>
        <p>Card Content</p>
      </Primitive.CardContent>
      <Primitive.CardFooter>
        <p>Card Footer</p>
      </Primitive.CardFooter>
    </Primitive.Card>
  )
})

export const Card = memo(CardComponent)
