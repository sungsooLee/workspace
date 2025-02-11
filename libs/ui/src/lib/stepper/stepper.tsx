import React, { forwardRef, useEffect, useState } from 'react';

import { cn } from '@learnway/shared';

import styles from './stepper.module.css';
import { SelectOption } from '../select/type';

export interface StepperComponentProps {
  items: Array<SelectOption>;
  className?: string;
  selectedStep?: string;
  isVisible?: boolean;
  onChange?: (item: SelectOption) => void;
}

const StepperComponent = forwardRef<HTMLElement, StepperComponentProps>(
  ({ className, items, selectedStep, isVisible, onChange, ...props }, ref) => {
    const [selectedItem, setSelectedItem] = useState<SelectOption>();

    useEffect(() => {
      const findItem = items?.find((d: SelectOption) => d.value === selectedStep);
      const firstItem = items?.at(0);
      const item = selectedStep ? findItem : firstItem; // selectedStep 값이 없으면 첫번째 step 선택
      item && setSelectedItem(item);
    }, [selectedStep]);

    useEffect(() => {
      if (selectedItem) {
        onChange?.(selectedItem);
      }
    }, [selectedItem]);

    const handleClick = (item: SelectOption) => {
      const isChanged = item.value !== selectedItem?.value;
      isChanged && setSelectedItem(item);
    };

    return (
      <div className={cn(className, 'nlp-stepper', 'flex flex-row', styles.stepper)}>
        {items?.map((d: SelectOption) => (
          <div
            className={cn(
              selectedItem?.value === d.value && styles.selected_step,
              styles.step_item,
            )}
            onClick={() => handleClick(d)}>
            {isVisible && (
              <>
                <strong className={styles.title}>{d.label}</strong>
                <p className={styles.text}>{'서브타이틀'}</p>
              </>
            )}
          </div>
        ))}
      </div>
    );
  },
);

export const Stepper = StepperComponent;
