import { useState } from 'react';
import { Button } from '@learnway/ui';
import { cn } from '@learnway/shared';

import styles from './heart.module.css';

import { IcoHeart } from '@learnway/icons';

interface HeartProps {
  className?: string;
}

const HeartButton = ({ className }: HeartProps) => {
  const [heart, setHeart] = useState(false);

  const eventClick = () => {
    if (heart === true) {
      setHeart(false);
    } else {
      setHeart(true);
    }
  };

  return (
    <div className={cn(styles.start, styles.heart, className)}>
      <Button
        className={cn(styles.btn_heart, heart === true ? styles.active : '')}
        onClick={eventClick}>
        <IcoHeart
          width={24}
          height={24}
          fill={heart === true ? '#fff' : 'none'}
          stroke="#fff"></IcoHeart>
      </Button>
    </div>
  );
};

export const Heart = HeartButton;
