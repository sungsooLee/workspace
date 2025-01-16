import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from '@radix-ui/react-select';
import { SelectOption } from './type';
import useSelect from './logic';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

import styles from './select.module.scss';

export interface SelectComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  options: Array<SelectOption>;
  labelKey?: string;
  valueKey?: string;
  placeholder?: string;
  onChange?: (value?: SelectOption) => void;
}

const SelectComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, SelectComponentProps>(
  (
    {
      options,
      value,
      labelKey = 'label',
      valueKey = 'value',
      disabled,
      onChange,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const { selectedItem, setCurrentSelectedItem } = useSelect({ options, onChange });

    return (
      <div className={cn(styles.start, 'nlp--select')}>
        <Primitive.Root value={selectedItem?.value} onValueChange={setCurrentSelectedItem}>
          <Primitive.Trigger className={styles.SelectTrigger} aria-label="Food">
            <Primitive.Value placeholder={placeholder} />
            <Primitive.Icon className={styles.SelectIcon}>
              <ChevronDownIcon />
            </Primitive.Icon>
          </Primitive.Trigger>
          <Primitive.Portal>
            <Primitive.Content className={styles.SelectContent}>
              <Primitive.ScrollUpButton className={styles.SelectScrollButton}>
                <ChevronUpIcon />
              </Primitive.ScrollUpButton>
              <Primitive.Viewport className={styles.SelectViewport}>
                {options.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </Primitive.Viewport>
              <Primitive.ScrollDownButton className={styles.SelectScrollButton}>
                <ChevronDownIcon />
              </Primitive.ScrollDownButton>
            </Primitive.Content>
          </Primitive.Portal>
        </Primitive.Root>
      </div>
    );
  },
);

const SelectItem = React.forwardRef(({ children, className, ...props }: any, forwardedRef) => {
  return (
    <Primitive.Item className={cn(styles.SelectItem, className)} {...props} ref={forwardedRef}>
      <Primitive.ItemText>{children}</Primitive.ItemText>
      <Primitive.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Primitive.ItemIndicator>
    </Primitive.Item>
  );
});

export const Select = SelectComponent;
