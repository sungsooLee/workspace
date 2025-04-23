/* eslint-disable react/jsx-no-useless-fragment */
import { memo, useRef, useLayoutEffect, useState, ReactNode } from 'react';
import { cn } from '@learnway/shared';
import { Tooltip } from '@learnway/ui';
import styles from './word-wrap.module.css';

interface WordWrapComponentProps {
  text?: ReactNode | string;
  className?: string;
}

function WordWrapComponent({ text, className }: WordWrapComponentProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isEllipsed, setIsEllipsed] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsEllipsed(el.scrollWidth > el.clientWidth);
    }
  }, [text]);

  return (
    <div className={cn(styles.start, styles.word_wrap, className)}>
      <div ref={textRef} className={styles.word_area}>
        {isEllipsed ? (
          <Tooltip side="right" align="start" content={text}>
            {text}
          </Tooltip>
        ) : (
          <p className={styles.text}>{text}</p>
        )}
      </div>
    </div>
  );
}

export const WordWrap = memo(WordWrapComponent);
