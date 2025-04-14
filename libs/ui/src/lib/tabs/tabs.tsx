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
  /**
   * 탭 변경 시도 시 호출됩니다.
   * false 또는 false로 resolve되는 Promise를 반환하면 탭 변경이 취소됩니다.
   * @param {string} nextValue - 이동하려는 대상 탭의 key (value)
   * @param {string} currentValue - 현재 활성화된 탭의 key (value)
   * @returns {boolean | Promise<boolean>} - true면 변경 허용, false면 변경 취소
   */
  onBeforeTabChange?: (currentTabKey: string, nextTabKey: string) => boolean | Promise<boolean>;
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
      onBeforeTabChange,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = React.useState(selectedTabKey || items?.at(0)?.key || '');

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

    // Radix onValueChange에 전달될 핸들러 (탭 변경 시도 시 호출됨)
    const handleValueChange = async (nextValue: string) => {
      // 선택된 탭이 없고 || 현재 탭과 다음 탭이 동일한 경우
      if (!value || value === nextValue) {
        return;
      }
      let proceed = true; // 탭 변경 진행 여부 플래그

      // onBeforeTabChange 콜백이 있으면 실행하고 결과를 기다림
      if (isFunction(onBeforeTabChange)) {
        // 현재 값(value)과 다음 값(nextValue) 전달
        proceed = await onBeforeTabChange(value, nextValue);
      }

      // onBeforeTabChange 결과가 true일 때만 실제 변경 진행
      if (proceed) {
        // 비제어 컴포넌트일 경우에만 내부 상태 업데이트
        // if (selectedTabKey === undefined) {
        //   setInternalValue(nextValue);
        // }
        //
        // setValue(nextValue);
        // 탭 변경이 최종 결정된 후 onActiveTab 콜백 호출 (존재하는 경우)
        if (isFunction(onActiveTab)) {
          onActiveTab(nextValue);
        }
      }
    };

    return (
      <Primitive.Root
        className={cn(
          'nlp--tabs',
          styles.start,
          styles.tabs,
          className,
          size && styles[size],
          type && styles[type],
          variant && styles[variant],
        )}
        value={value}
        // onValueChange={(value) => handleActiveTab(value)}
        onValueChange={handleValueChange}
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
