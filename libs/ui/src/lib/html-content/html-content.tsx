import { ReactNode, useMemo } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { cn } from '@learnway/shared';
import styles from './html-content.module.css';

export interface HtmlContentComponentProps {
  className?: string;
  children?: ReactNode | string;
}

/**
 * @description HtmlContentComponent
 * @param children ReactNode | string
 * @returns
 */
const HtmlContentComponent = function ({ children, className }: HtmlContentComponentProps) {
  const content = useMemo(() => {
    // string => html data
    if (typeof children === 'string') {
      const html = DOMPurify.sanitize(children);
      return parse(html);
    }
    return children;
  }, [children]);

  return <div className={cn(styles.start, className)}>{content}</div>;
};

export const HtmlContent = HtmlContentComponent;
