import React, { forwardRef } from 'react';

import * as Primitive from '../shadcn/accordion';
// import * as React from 'react';

// interface AccordionComponentProps extends React.ComponentPropsWithoutRef<typeof Primitive.Accordion> {
//   items?: Array<JSX.Element>;
// }

const AccordionComponent = forwardRef<
  React.ElementRef<typeof Primitive.Accordion>,
  React.ComponentPropsWithoutRef<typeof Primitive.Accordion>
>(
  (props, ref) => {
    return (
      <Primitive.Accordion type="single" collapsible className="w-full">
        <Primitive.AccordionItem value="item-1">
          <Primitive.AccordionTrigger>Title A</Primitive.AccordionTrigger>
          <Primitive.AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </Primitive.AccordionContent>
        </Primitive.AccordionItem>
        <Primitive.AccordionItem value="item-2">
          <Primitive.AccordionTrigger>Title B</Primitive.AccordionTrigger>
          <Primitive.AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern2.
          </Primitive.AccordionContent>
        </Primitive.AccordionItem>
      </Primitive.Accordion>
    );
  },
);

export const Accordion = AccordionComponent;
