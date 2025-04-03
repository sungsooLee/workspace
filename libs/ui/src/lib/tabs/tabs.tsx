import React, { forwardRef, useEffect } from 'react';
import { isFunction } from 'lodash';
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
  content?: React.ReactNode;
}

interface TabsComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  items: Array<TabItemProps>;
  className?: string;
  type?: 'line' | 'fill' | 'round' | 'progress' | 'segment';
  variant?: 'primary' | 'secondary' | 'gray'; // gray는 line형
  size?: 'sm' | 'md';
  ariaLabel?: string;
  selectedTabKey?: string; // 최초 렌더링 이후 tab 조작 필요시 사용
  onActiveTab?: (value: string) => void;
  // selectedTabIndex?: number; // 최초 렌더링 이후 tab 조작 필요시 사용
  // defaultSelectedTabIndex?: number; // 최초 렌더링 할때 선택할 tab index
}

export const TabsComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  TabsComponentProps
>(
  (
    {
      className,
      items,
      variant,
      size = 'md',
      type,
      ariaLabel,
      selectedTabKey,
      onActiveTab,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = React.useState(selectedTabKey || items?.at(0)?.key);

    // changed selectedTabKey
    useEffect(() => {
      selectedTabKey && setValue(selectedTabKey);
    }, [selectedTabKey]);

    const handleActiveTab = (value: string) => {
      if (isFunction(onActiveTab)) {
        onActiveTab(value);
      }
      setValue(value);
    };

    return (
      <Primitive.Root
        className={cn(
          styles.start,
          styles.tabs,
          className,
          'nlp--tabs',
          size && styles[size],
          type && styles[type],
          variant && styles[variant],
        )}
        value={value}
        onValueChange={(value) => handleActiveTab(value)}
      >
        {/* Tab Buttons */}
        <Primitive.List className={styles.list} aria-label={ariaLabel}>
          {items.map((d: TabItemProps, index) => (
            <Primitive.Trigger
              className={cn(styles.trigger, d.alarm ? styles.alarm : '')}
              value={d.key}
              key={d.key}
            >
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
  },
);

TabsComponent.displayName = 'Tabs';

export const Tabs = TabsComponent;
