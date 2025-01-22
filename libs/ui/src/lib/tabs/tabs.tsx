import React, { forwardRef, memo, ReactNode, useEffect } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from "@radix-ui/react-tabs";

import styles from './tabs.module.scss';

interface TabItemProps {
  title: string;
  key: string;
  content: React.ReactNode;
}

interface TabsComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  items: Array<TabItemProps>;
  className?: string;
  selectedTabKey?: string; // 최초 렌더링 이후 tab 조작 필요시 사용
  selectedTabIndex?: number; // 최초 렌더링 이후 tab 조작 필요시 사용
  defaultSelectedTabIndex?: number; // 최초 렌더링 할때 선택할 tab index
}

const TabsComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, TabsComponentProps>(
  ({ className, items, defaultSelectedTabIndex = 0, ...props }, ref) => {
    // const [progress, setProgress] = React.useState(value);
    //
    // useEffect(() => {
    //   const timer = setTimeout(() => setProgress(value), 500);
    //   return () => clearTimeout(timer);
    // }, [value])

    return (
      <Primitive.Root className={styles.Root} defaultValue={items?.at(defaultSelectedTabIndex)?.key}>

        {/* Tab Buttons */}
        <Primitive.List className={styles.List} aria-label="Manage your account">
          {items.map((d: TabItemProps, index) => (
            <Primitive.Trigger className={styles.Trigger} value={d.key}>
              {d.title}
            </Primitive.Trigger>
          ))}
        </Primitive.List>

        {/* Tab Contents */}
        {items.map((d: TabItemProps, index) => (
          <Primitive.Content className={styles.Content} value={d.key}>
            {d.content}
          </Primitive.Content>
        ))}

      </Primitive.Root>

    );
  },
);

export const Tabs = memo(TabsComponent);
