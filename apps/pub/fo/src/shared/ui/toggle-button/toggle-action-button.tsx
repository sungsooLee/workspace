import { cn } from '@learnway/shared';
import React, { useState } from 'react';
import styles from './toggle-action-button.module.css';

import { IcoClose02 } from '@learnway/icons';
import { Avatar } from '@learnway/ui/avatar';
import { Button } from '@learnway/ui/button';

interface ToggleActionButtonProps {
  label: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  disabled?: boolean;
  imageUrl?: string;
  iconNode?: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

export const ToggleActionButton: React.FC<ToggleActionButtonProps> = ({
  label,
  size = 'md',
  rounded = false,
  disabled = false,
  imageUrl,
  iconNode,
  showCloseButton = false,
  className,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        styles.start,
        styles.wrap,
        size && styles[size],
        rounded && styles.rounded,
        disabled && styles.disabled,
        isActive ? styles.active : null,
        'nlp--toggle-action-btn',
        className,
      )}
    >
      <Button
        className={styles.btn}
        icon={iconNode}
        iconAlign={'left'}
        onClick={handleToggle}
        disabled={disabled}
      >
        {imageUrl && <Avatar imageUrl={imageUrl} className={styles.image_wrap} size={'sm'} />}
        <span className={styles.label}>{label}</span>
      </Button>
      {showCloseButton && (
        <Button
          className={styles.close}
          onClick={handleClose}
          onlyIcon={true}
          icon={<IcoClose02 className={styles.icon_close} />}
          disabled={disabled}
        />
      )}
    </div>
  );
};
