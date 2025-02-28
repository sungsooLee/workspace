import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-accordion';
import { IcoArrowDown } from '@learnway/icons';
import { isArray, map } from 'lodash';
import { useCreation } from 'ahooks';

import { cn } from '@learnway/shared';

import styles from './accordion.module.css';

export type accordionType = 'single' | 'multiple';
export interface AccordionItem {
  value: string;
  title: string | React.ReactNode;
  children?: React.ReactNode;
}

export interface AccordionComponentProps {
  type?: accordionType;
  items: AccordionItem[];
  className?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

const AccordionComponent = forwardRef<
  React.ElementRef<typeof Primitive.Accordion>,
  AccordionComponentProps
>(
  (
    {
      items,
      className,
      onValueChange,
      value,
      type = 'single',
      defaultValue,
    }: AccordionComponentProps,
    ref,
  ) => {
    //Prop exception value
    const editionValue: string | string[] = useCreation(() => {
      if (!value) {
        return type === 'single' ? '' : [];
      }
      return type === 'single'
        ? ((isArray(value) && value?.length ? value[0] : value) as string)
        : ((isArray(value) ? value : [value]) as string[]);
    }, [type, value]);

    //Prop exception default value
    const editionDefaultValue: string | string[] = useCreation(() => {
      if (!defaultValue) {
        return type === 'single' ? '' : [];
      }
      return type === 'single'
        ? ((isArray(defaultValue) && defaultValue?.length
            ? defaultValue[0]
            : defaultValue) as string)
        : ((isArray(defaultValue) ? defaultValue : [defaultValue]) as string[]);
    }, [type, defaultValue]);

    return (
      <Primitive.Root
        type={type}
        className={cn(styles.start, className, 'nlp--accordion', 'w-full')}
        value={editionValue as any}
        defaultValue={editionDefaultValue as any}
        onValueChange={onValueChange}
        ref={ref}>
        {items.map((item: AccordionItem) => {
          return (
            <Primitive.Item
              value={item.value}
              className={cn(styles.accordion_item)}
              key={item.value}>
              <Primitive.Trigger className={cn(styles.accordion_btn)}>
                <span className="accordion_title">{item.title}</span>
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
  },
);

export const Accordion = AccordionComponent;
