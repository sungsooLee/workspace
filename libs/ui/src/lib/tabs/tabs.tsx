import React, { forwardRef, useEffect } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from '@radix-ui/react-tabs';

import styles from './tabs.module.css';

interface TabItemProps {
  title: string;
  key: string;
  content: React.ReactNode;
}

interface TabsComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  items: Array<TabItemProps>;
  className?: string;
  selectedTabKey?: string; // 최초 렌더링 이후 tab 조작 필요시 사용
  // selectedTabIndex?: number; // 최초 렌더링 이후 tab 조작 필요시 사용
  // defaultSelectedTabIndex?: number; // 최초 렌더링 할때 선택할 tab index
}

export const TabsComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  TabsComponentProps
>(({ className, items, selectedTabKey, ...props }, ref) => {
  const [value, setValue] = React.useState(selectedTabKey || items?.at(0)?.key);

  // changed selectedTabKey
  useEffect(() => {
    selectedTabKey && setValue(selectedTabKey);
  }, [selectedTabKey]);

  return (
    <Primitive.Root
      className={cn(styles.Root, className, 'nlp--tabs')}
      value={value}
      onValueChange={(value) => setValue(value)}>
      {/* Tab Buttons */}
      <Primitive.List className={styles.List} aria-label="Manage your account">
        {items.map((d: TabItemProps, index) => (
          <Primitive.Trigger className={styles.Trigger} value={d.key} key={d.key}>
            {d.title}
          </Primitive.Trigger>
        ))}
      </Primitive.List>

      {/* Tab Contents */}
      {items.map((d: TabItemProps, index) => (
        <Primitive.Content className={styles.Content} value={d.key} key={d.key}>
          {d.content}
        </Primitive.Content>
      ))}
    </Primitive.Root>
  );
});

TabsComponent.displayName = 'Tabs';

export const Tabs = TabsComponent;
