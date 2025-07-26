import { cn } from '@learnway/shared';
import styles from './thumbnail.module.css';
import { useEffect, useState } from 'react';
import { Checkbox } from '../checkbox/checkbox';
import { CourseType } from '@learnway/types';

export function DefaultThumbnail({
  showDefault,
  showCheckbox,
  selected,
  onCheckedChange,
}: {
  showDefault?: boolean | CourseType;
  showCheckbox?: boolean;
  selected?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const [defaultThumbnail, setDefaultThumbnail] = useState<string | undefined>();

  useEffect(() => {
    if (typeof showDefault === 'string') {
      setDefaultThumbnail(styles[showDefault]);
    }
  }, [showDefault]);

  return (
    <div
      className={cn(
        styles.start,
        styles.thumbnail,
        styles.default_thumbnail,
        defaultThumbnail,
        'nlp--thumbnail',
        {
          [styles.selected]: selected,
        },
      )}
    >
      <div className="absolute z-10 flex h-full w-full items-center justify-center gap-3">
        {/* 체크박스 */}
        {showCheckbox && (
          <Checkbox
            className={cn(styles.checkbox)}
            variant="round"
            hideLabel
            checked={selected}
            onCheckedChange={onCheckedChange}
          />
        )}
      </div>
    </div>
  );
}
