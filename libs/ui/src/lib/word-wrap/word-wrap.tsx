import { memo, useRef, useLayoutEffect, useState, ReactNode } from 'react';
import { cn } from '@learnway/shared';
import styles from './word-wrap.module.css';
import { Tooltip } from '../tooltip/tooltip';

interface WordWrapComponentProps {
  text?: ReactNode | string;
  className?: string;
}

function WordWrapComponent({ text, className }: WordWrapComponentProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isEllipsed, setIsEllipsed] = useState<boolean>(false);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (el) {
      const checkEllipsis = el.scrollWidth > el.clientWidth;
      setIsEllipsed(checkEllipsis);
    }
  });

  return (
    <div className={cn(styles.start, styles.word_wrap, className)}>
      <div className={styles.word_area}>
        {isEllipsed ? (
          <Tooltip side="bottom" align="start" content={text}>
            <p ref={textRef} className={styles.text}>{text}</p>
          </Tooltip>
        ) : (
          <p ref={textRef} className={styles.text}>{text}</p>
        )}
      </div>
    </div>
  );
}

export const WordWrap = memo(WordWrapComponent);
