import React, { forwardRef, useEffect } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from '@radix-ui/react-tabs';

import styles from './tabs.module.css';
import { Badge } from '../badge/badge';

interface TabItemProps {
  title: string;
  key: string;
  count?: boolean;
  number?: string;
  alarm?: boolean;
  content: React.ReactNode;
}

interface TabsComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  items: Array<TabItemProps>;
  className?: string;
  variant?: 'line' | 'fill' | 'round' | 'progress';
  size?: 'sm' | 'md';
  color?: 'primary' | 'secondary' | 'gray'; // gray는 line형
  ariaLabel?: string;
  selectedTabKey?: string; // 최초 렌더링 이후 tab 조작 필요시 사용
  // selectedTabIndex?: number; // 최초 렌더링 이후 tab 조작 필요시 사용
  // defaultSelectedTabIndex?: number; // 최초 렌더링 할때 선택할 tab index
}

export const TabsComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  TabsComponentProps
>(({ className, items, variant, size, color, ariaLabel, selectedTabKey, ...props }, ref) => {
  const [value, setValue] = React.useState(selectedTabKey || items?.at(0)?.key);

  // changed selectedTabKey
  useEffect(() => {
    selectedTabKey && setValue(selectedTabKey);
  }, [selectedTabKey]);

  return (
    <Primitive.Root
      className={cn(
        styles.start,
        styles.tabs,
        className,
        'nlp--tabs',
        size && styles[size],
        color && styles[color],
        variant && styles[variant],
      )}
      value={value}
      onValueChange={(value) => setValue(value)}>
      {/* Tab Buttons */}
      <Primitive.List className={styles.list} aria-label={ariaLabel}>
        {items.map((d: TabItemProps, index) => (
          <Primitive.Trigger
            className={cn(styles.trigger, d.alarm ? styles.alarm : '')}
            value={d.key}
            key={d.key}>
            {d.title}
            {d.count && <span className={styles.count}>{d.number}</span>}
            {d.alarm && (
              <Badge
                className={styles.alarm_view}
                option={{ label: '', value: '' }}
                variant="dot"
                status="primary"
              />
            )}
          </Primitive.Trigger>
        ))}
      </Primitive.List>

      {/* Tab Contents */}
      {items.map((d: TabItemProps, index) => (
        <Primitive.Content className={styles.content} value={d.key} key={d.key}>
          {d.content}
        </Primitive.Content>
      ))}
    </Primitive.Root>
  );
});

TabsComponent.displayName = 'Tabs';

export const Tabs = TabsComponent;
