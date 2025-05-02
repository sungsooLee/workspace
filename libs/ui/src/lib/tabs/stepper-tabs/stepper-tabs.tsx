import React, { forwardRef, useState } from 'react';

import * as Primitive from '@radix-ui/react-tabs';
import { Tabs, TabsComponentProps } from '../tabs';
import { Button } from '../../button/button';

import styles from './stepper-tabs.module.css';
import { cn } from '@learnway/shared';
import { useStepperTabs } from './use-stepper-tabs';

interface StepperTabsComponentProps extends TabsComponentProps {
  dummy?: React.ReactNode;
}

export const StepperTabsComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  StepperTabsComponentProps
>(({ items, onTabChange, ...props }, ref) => {
  /**
   * 내부적으로 관리되는 현재 선택된 탭의 키 상태입니다.
   */
  const [internalKey, setInternalKey] = useState<string>(items?.[0]?.key || '');

  /**
   * 현재 탭 정보 및 이동 기능을 제공하는 커스텀 훅을 사용합니다.
   */
  const {
    currentIndex,
    currentKey,
    isFirst,
    isLast,
    totalTabSize = items?.length || 0, // totalTabSize 추가 및 기본값 설정
    goToPrevious,
    goToNext,
  } = useStepperTabs({
    items,
    currentValue: internalKey,
  });

  /**
   * 탭이 변경될 때 호출되는 핸들러입니다. 내부 상태를 업데이트하고 외부 콜백 함수를 실행합니다.
   * @param {string} activeKey - 새로 활성화된 탭의 키
   */
  const handleTabChange = (activeKey: string) => {
    setInternalKey(activeKey);
    onTabChange?.(activeKey);
  };

  return (
    <div className={cn('nlp--sub-progress-tabs', styles.start, 'flex')}>
      <div className={'flex-1'}>
        <Tabs
          {...props}
          items={items}
          selectedTabKey={currentKey}
          clickDisabled
          onTabChange={handleTabChange}
        />
      </div>
      <div className={'flex w-48 items-center justify-between'}>
        <Button
          variant={'gray'}
          size={'sm'}
          label={'이전'}
          disabled={isFirst}
          onClick={goToPrevious}
        />
        <p>
          {currentIndex + 1} / {totalTabSize}
        </p>
        <Button variant={'gray'} size={'sm'} label={'다음'} disabled={isLast} onClick={goToNext} />
      </div>
    </div>
  );
});

StepperTabsComponent.displayName = 'StepperTabs';

export const StepperTabs = StepperTabsComponent;
