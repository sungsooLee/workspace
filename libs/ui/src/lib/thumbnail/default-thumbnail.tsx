import { cn } from '@learnway/shared';
import styles from './thumbnail.module.css';
import { useState } from 'react';
import { Checkbox } from '../checkbox/checkbox';

export function DefaultThumbnail({
  showCheckbox,
  selected,
  onCheckedChange,
}: {
  showCheckbox?: boolean;
  selected?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const handleHover = (state: boolean) => setIsHovered(state);

  return (
    <div
      className={cn(styles.start, styles.thumbnail, styles.default_thumbnail, 'nlp--thumbnail', {
        [styles.active]: isHovered,
        [styles.selected]: selected,
      })}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
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
