import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/fo/features/integrated-search/integrated-search-button.module.css';

interface Item {
  title: string;
  count: string; // , 로 인하여 string 처리
}

interface TabButtonProps {
  items: Item[];
}

interface IntegratedSearchButton {
  className?: string;
  tabButton: TabButtonProps;
  activeButton: number;
  setActiveButton: React.Dispatch<React.SetStateAction<number>>;
}

const IntegratedSearchButtonComponent = ({
  className,
  tabButton,
  activeButton,
  setActiveButton,
}: IntegratedSearchButton) => {
  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <div className={cn(styles.start, styles.integrated_button, className)}>
      {tabButton.items.map((item, index) => (
        <Button
          key={index}
          className={activeButton === index ? styles.active : ''}
          onClick={() => handleButtonClick(index)}>
          {item.title}
          <span>{item.count}</span>
        </Button>
      ))}
    </div>
  );
};

export const IntegratedSearchButton = IntegratedSearchButtonComponent;
