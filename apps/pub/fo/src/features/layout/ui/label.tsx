import React from 'react';
import styles from './label.module.css';
import { cn } from '@learnway/shared';
interface LabelProps {
  className?: string;
}

const LabelComponent = ({ className }: LabelProps) => {
  const label = [
    { text: 'New', color: '#00afd5' },
    { text: '접수중', color: '#06226a' },
    { text: 'D-7', color: '#ff4646' },
  ];

  return (
    <ul className={cn(styles.start, styles.label, className)}>
      {label.map((labels, index) => (
        <li key={index} style={{ backgroundColor: labels.color }}>
          {labels.text}
        </li>
      ))}
    </ul>
  );
};

export const Label = LabelComponent;
