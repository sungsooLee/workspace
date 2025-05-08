import { memo } from 'react';

import styles from '@learnway/styles/fo/features/layout/ui/auto-complete-popover.module.css';
import { Button } from '@learnway/ui';

interface AutoCompletePopoverProps {
  className?: string;
}

const AutoCompletePopoverComponent = ({ className }: AutoCompletePopoverProps) => {
  return (
    <div className={`${styles.start} ${styles.auto_complete_popover} ${className}`}>
      <ul>
        <li>
          <Button>
            <em>파</em>이썬
          </Button>
        </li>
        <li>
          <Button>
            <em>파</em>이토치
          </Button>
        </li>
        <li>
          <Button>
            <em>파</em>이썬 입문
          </Button>
        </li>
        <li>
          <Button>
            <em>파</em>이썬 중급
          </Button>
        </li>
      </ul>
    </div>
  );
};

export const AutoCompletePopover = memo(AutoCompletePopoverComponent);
