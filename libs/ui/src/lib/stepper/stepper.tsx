import React, { forwardRef, useEffect, useMemo, useState } from 'react';

import { cn } from '@learnway/shared';

import styles from './stepper.module.css';
import { SelectOption } from '../select/type';

export interface StepperComponentProps {
  items: Array<SelectOption>;
  className?: string;
  selectedStep?: string;
  enableMoveStep?: boolean; // step 이동 가능 여부 (step onClick 사용 여부)
  onChange?: (item: SelectOption) => void;
}

const StepperComponent = forwardRef<HTMLElement, StepperComponentProps>(
  ({ className, items, selectedStep, onChange, enableMoveStep, ...props }, ref) => {
    const [selectedItem, setSelectedItem] = useState<SelectOption>();

    useEffect(() => {
      const findItem = items?.find((d: SelectOption) => d.value === selectedStep);
      const firstItem = items?.at(0);
      const item = selectedStep ? findItem : firstItem; // selectedStep 값이 없으면 첫번째 step 선택
      item && setSelectedItem(item);
    }, [items, selectedStep]);

    useEffect(() => {
      if (selectedItem) {
        onChange?.(selectedItem);
      }
    }, [selectedItem]);

    const stepperItems = useMemo(() => {
      const findIndex = items.findIndex((d: SelectOption) => d.value === selectedItem?.value) || 0;
      return items?.map((d: SelectOption, index: number) => ({
        ...d,
        isActive: index === findIndex, // active step 여부
        isComplete: index < findIndex, // complete step 여부
      }));
    }, [selectedItem]);

    const handleClick = (item: SelectOption) => {
      const isChanged = item.value !== selectedItem?.value;
      isChanged && setSelectedItem(item);
    };

    return (
      <div className={cn(className, 'nlp-stepper', styles.stepper, 'flex flex-row gap-5')}>
        {stepperItems?.map((d: any, index: number) => (
          <div
            key={d.value}
            className={cn(
              styles.step_item,
              d.isActive && styles.active,
              d.isComplete && styles.complete,
              'flex flex-col',
            )}
            onClick={() => enableMoveStep && handleClick(d)}>
            {/* icon or step value */}
            <div>{d.isComplete ? 'V' : index + 1}</div>
            {/*<div>{d.isComplete ? <Check /> : index + 1}</div>*/}
            {/* title */}
            <div>{d.label}</div>
            {/* help text */}
            <div>{d.subLabel}</div>
          </div>
        ))}
      </div>
    );
  },
);

export const Stepper = StepperComponent;
