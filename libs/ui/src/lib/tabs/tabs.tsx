import React, { forwardRef, useEffect } from 'react';
import { cn } from '@learnway/shared';

import * as Primitive from '@radix-ui/react-tabs';

import styles from './tabs.module.css';
import { Badge } from '../badge/badge';

export interface TabItemProps {
  /** 탭에 표시될 제목 */
  title: string;
  /** 탭의 고유 키 (value) */
  key: string;
  /** 카운트 표시 여부 */
  count?: boolean;
  /** 표시할 숫자 카운트 */
  number?: string;
  /** 알림 표시 여부 */
  alarm?: boolean;
  /** 탭 내용 */
  content?: React.ReactNode;
}

export interface TabsComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  /** 탭 아이템 배열 */
  items: Array<TabItemProps>;
  /** 추가적인 CSS 클래스 이름 */
  className?: string;
  /** 탭의 스타일 유형 */
  type?: 'line' | 'fill' | 'round' | 'segment' | 'progress' | 'sub-progress';
  /** 탭의 색상 테마 */
  variant?: 'primary' | 'secondary' | 'gray'; // gray는 line형
  /** 탭의 크기 */
  size?: 'sm' | 'md';
  /** 접근성을 위한 ARIA 레이블 */
  ariaLabel?: string;
  /** 외부에서 탭을 제어하기 위한 초기 선택된 탭 키 */
  selectedTabKey?: string;
  /** 탭 클릭 비활성화 여부 (true 설정시 클릭 기능만 작동하지 않음, 스타일은 disabled 처리 안함)  */
  clickDisabled?: boolean;
  /** 탭 변경 시 호출되는 콜백 함수 (새로운 탭의 key를 인자로 받음) */
  onTabChange?: (value: string) => void;
  /**
   * 탭 변경 시도 시 호출됩니다.
   * false 또는 false로 resolve되는 Promise를 반환하면 탭 변경이 취소됩니다.
   * @param {string} currentValue - 현재 활성화된 탭의 key (value)
   * @param {string} nextValue - 이동하려는 대상 탭의 key (value)
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
      clickDisabled,
      onTabChange,
      onBeforeTabChange,
      ...props
    },
    ref,
  ) => {
    // 현재 선택된 탭 상태 (초기값은 외부에서 주어진 selectedTabKey 또는 첫 번째 탭)
    const [value, setValue] = React.useState(selectedTabKey || items?.at(0)?.key || '');

    // 외부에서 selectedTabKey 변경되면 내부 상태도 동기화
    useEffect(() => {
      if (selectedTabKey) {
        setValue(selectedTabKey);
      }
    }, [selectedTabKey]);

    /**
     * 탭 변경을 처리하는 핸들러
     * Radix의 onValueChange에 바인딩됨
     */
    const handleValueChange = async (nextValue: string) => {
      // 현재 탭이 없거나 동일한 탭 클릭 시 무시
      if (!value || value === nextValue) return;

      // 탭 클릭 비활성화 여부 true 설정시 click, 결과가 ture면 탭 작동 안함
      if (clickDisabled) {
        return;
      }

      // 탭 변경 가능 여부 확인 (비동기 가능) 설정 안하면 무조건 true, 결과가 false면 탭 작동 안함
      if (!(await (onBeforeTabChange?.(value, nextValue) ?? true))) {
        return;
      }

      // 탭 상태 변경 및 콜백 실행
      setValue(nextValue);
      onTabChange?.(nextValue);
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
        ref={ref}
        onValueChange={handleValueChange}
      >
        {/* 탭 버튼 목록 */}
        <Primitive.List className={styles.list} aria-label={ariaLabel}>
          {items.map((d: TabItemProps) => (
            <Primitive.Trigger
              className={cn(
                styles.trigger,
                d.alarm ? styles.alarm : '',
                clickDisabled && styles.cursor_none,
              )}
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

        {/* 탭 콘텐츠 영역 */}
        {items.map((d: TabItemProps) => (
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
