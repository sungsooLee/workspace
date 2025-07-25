import { forwardRef, ReactNode, useState } from 'react';

import * as Primitive from '@radix-ui/react-popover';

import { List } from '../list/list';

interface PopoverListProps extends Primitive.PopoverContentProps {
  children: ReactNode;
  options: Array<any>;
  onOptionSelect: (option: any) => void;
}

const Component = forwardRef<React.ElementRef<typeof Primitive.Popover>, PopoverListProps>(
  ({ children, options, onOptionSelect, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOptionSelect = (option: any) => {
      setIsOpen(false);
      onOptionSelect(option);
    };

    return (
      <Primitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <Primitive.Trigger asChild>{children}</Primitive.Trigger>
        <Primitive.Content>
          <List options={options} onOptionSelect={handleOptionSelect} />
        </Primitive.Content>
      </Primitive.Root>
    );
  },
);

export const PopoverList = Component;
