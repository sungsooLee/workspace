import { useState, useEffect } from 'react';
import { Button } from '@learnway/ui';
import { cn } from '@learnway/shared';

import styles from './arrays.module.css';

// 퍼블수정 20250313 : 값 받아서 뿌려주게 전체수정
interface ArraysProps {
  arraysData: { items: string[]; initialSelectedItem: number | null };
  className?: string;
}

const ArraysButton = ({ className, arraysData }: ArraysProps) => {
  const { items, initialSelectedItem } = arraysData;
  const [selectedItem, setSelectedItem] = useState<number | null>(initialSelectedItem);

  const handleOnChange = (index: number) => {
    setSelectedItem((prev) => (prev === index ? null : index));
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
          onClick={() => handleOnChange(index)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export const Arrays = ArraysButton;
