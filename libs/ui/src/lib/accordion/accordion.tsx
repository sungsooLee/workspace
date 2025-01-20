import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-accordion';
import { IcoArrowDown } from '@learnway/icons';

import { cn } from '@learnway/shared';

import styles from './accordion.module.scss';

export interface AccordionItem {
  key: string;
  title: string | React.ReactNode;
  children?: React.ReactNode;
}

export interface AccordionComponentProps {
  items: AccordionItem[];
  className?: string;
  value?: string;
  onValueChange?: (value: string | string[]) => void;
}

const AccordionComponent = forwardRef<
  React.ElementRef<typeof Primitive.Accordion>,
  AccordionComponentProps
>(({ items, className, value, onValueChange }: AccordionComponentProps, ref) => {
  return (
    <Primitive.Root
      type="single"
      collapsible
      className={cn(styles.start, className, 'nlp--accordion', 'w-full')}
      value={value}
      onValueChange={onValueChange}
      ref={ref}>
      {items.map((item: AccordionItem) => {
        return (
          <Primitive.Item value={item.key} className={cn(styles.accordion_item)} key={item.key}>
            <Primitive.Trigger className={cn(styles.accordion_btn)}>
              <span>{item.title}</span>
              {item.children && <IcoArrowDown width={16} height={16} stroke="#131C30" />}
            </Primitive.Trigger>
            <Primitive.Content className={cn(styles.accordion_content)}>
              {item.children}
            </Primitive.Content>
          </Primitive.Item>
        );
      })}
    </Primitive.Root>
  );
});

export const Accordion = AccordionComponent;
