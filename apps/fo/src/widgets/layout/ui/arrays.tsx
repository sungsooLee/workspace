import { useState, useEffect } from 'react';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/features/layout/ui/arrays.module.css';
import { Button } from '@learnway/ui/button';

// 퍼블수정 20250313 : 값 받아서 뿌려주게 전체수정
interface ArraysProps {
  arraysData: { items: string[]; initialSelectedItem: number | null };
  className?: string;
  onChange?: (selectedIndex: number | null) => void;
}

const ArraysButton = ({ className, arraysData, onChange }: ArraysProps) => {
  const { items, initialSelectedItem } = arraysData;
  const [selectedItem, setSelectedItem] = useState<number | null>(initialSelectedItem);

  const handleOnChange = (index: number) => {
    const newIndex = selectedItem === index ? null : index;
    setSelectedItem(newIndex);
    onChange?.(newIndex);
  };

  useEffect(() => {
    setSelectedItem(initialSelectedItem);
  }, [initialSelectedItem]);

  return (
    <div className={cn(styles.start, styles.array, className)}>
      {items.map((item, index) => (
        <Button
          key={index}
          className={`${selectedItem === index ? styles.active : ''}`}
          onClick={() => handleOnChange(index)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export const Arrays = ArraysButton;
