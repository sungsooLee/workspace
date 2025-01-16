import React, { forwardRef, useEffect } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from "@radix-ui/react-select";
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

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <Primitive.Item
        className={cn(styles.SelectItem, className)}
        {...props}
        ref={forwardedRef}
      >
        <Primitive.ItemText>{children}</Primitive.ItemText>
        <Primitive.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Primitive.ItemIndicator>
      </Primitive.Item>
    );
  },
);

const SelectComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, SelectComponentProps>(
  (
    { options, labelKey = 'label', valueKey = 'value', disabled, onChange, placeholder, ...props },
    ref,
  ) => {
    const selectClassName = cn(
      'nlp--select-trigger',
      'w-full',
      'focus:border-blue-500 focus:outline-none',
      'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500',
    );

    // const { selectedItem, setCurrentSelectedItem } = useSelect({ options, onChange });

    useEffect(() => {
      if (props.value) {
        console.log('change parent value', props.value)
        setValue(props.value);
      }
    }, [props.value])


    const [value, setValue] = React.useState(props.value);

    return (
      <div className={styles.start}>
        <Primitive.Root value={value} onValueChange={setValue}>
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
                  <SelectItem value={value}>{label}</SelectItem>
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

export const Select = SelectComponent;
