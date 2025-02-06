import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';
import { IcoArrowDown } from '@learnway/icons';

import * as Primitive from '@radix-ui/react-select';
import { SelectOption } from './type';
import useSelect from './logic';

import styles from './select.module.css';

export interface SelectComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  options: Array<SelectOption>;
  labelKey?: string;
  valueKey?: string;
  placeholder?: string;
  className?: string;
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
      className,
      ...props
    },
    ref,
  ) => {
    const { selectedItem, setCurrentSelectedItem } = useSelect({ options, onChange });

    return (
      <div className={cn(styles.start, 'nlp--select', className)}>
        <Primitive.Root value={selectedItem?.value} onValueChange={setCurrentSelectedItem}>
          <Primitive.Trigger className={styles.select_trigger} aria-label="">
            <Primitive.Value placeholder={placeholder} className={styles.select_text} />
            <Primitive.Icon className={styles.select_icon}>
              <IcoArrowDown width={16} height={16} stroke="#131C30" />
            </Primitive.Icon>
          </Primitive.Trigger>
          <Primitive.Portal>
            <Primitive.Content
              className="w-auto min-w-[var(--radix-select-trigger-width)]"
              position="popper"
              sideOffset={4}>
              {/* <Primitive.ScrollUpButton className={styles.select_scrollbtn}>
                <IcoArrowUp width={12} height={12} stroke="#131C30" />
              </Primitive.ScrollUpButton> */}
              <Primitive.Viewport
                className={cn(styles.select_viewport, 'min-w-[var(--radix-select-trigger-width)]')}>
                {options.map(({ value, label }) => (
                  <SelectItem key={value} value={value} className={styles.select_item}>
                    {label}
                  </SelectItem>
                ))}
              </Primitive.Viewport>
              {/* <Primitive.ScrollDownButton className={styles.select_scrollbtn}>
                <IcoArrowDown width={16} height={16} stroke="#131C30" />
              </Primitive.ScrollDownButton> */}
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
      {/* <Primitive.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Primitive.ItemIndicator> */}
    </Primitive.Item>
  );
});

export const Select = SelectComponent;
