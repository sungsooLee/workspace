/* eslint-disable no-redeclare */
import { cn } from '@learnway/shared';
import styles from './count-text.module.css';
import React, { FC } from 'react';

interface CountTextProps {
  label: string;
  count: number;
  labelColor?: 'primary' | 'gray';
  countColor?: 'primary' | 'gray';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CountTextComponent: FC<CountTextProps> = ({
  label,
  count,
  countColor,
  size,
}: CountTextProps) => {
  return (
    <div className={cn(styles.start)}>
      <strong className={styles.label}>{label}</strong>
      <span className={styles.count}>{count}</span>
    </div>
  );
};

export const CountText = CountTextComponent;
