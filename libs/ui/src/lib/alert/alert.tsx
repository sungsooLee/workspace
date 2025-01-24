import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import { Button } from '../button/button';

import styles from './alert.module.css';

export interface AlertComponentProps {
  className?: string;
  title?: string;
  description?: string;
  content?: React.ReactNode | string;
  footer?: React.ReactNode;
  onClose?: () => void;
}

const AlertComponent = forwardRef<HTMLDivElement, AlertComponentProps>(
  ({ className, title, description, content, footer, ...otherProps }, ref) => {

    const defaultFooter = (
      <></>
    )

    return (
      <div className={cn(styles.root, className, 'nlp--alert')}>

        {/* title */}
        <div className={styles.title}>
          {title}
        </div>

        {/* description */}
        <div className={styles.description}>
          {description}
        </div>

        {/* content */}
        <div className={styles.content}>
          {content}
        </div>

        {/* footer */}
        <div className={styles.footer}>
          <Button>OK</Button>
        </div>


      </div>
    )
  },
);

export const Alert = AlertComponent;
