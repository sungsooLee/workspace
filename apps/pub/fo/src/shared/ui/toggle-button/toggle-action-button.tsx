import { cn } from '@learnway/shared';
import React, { useState } from 'react';
import styles from './toggle-action-button.module.css';

import { IcoClose02 } from '@learnway/icons';
import { Button } from '@learnway/ui/button';

interface ToggleActionButtonProps {
  label: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  disabled?: boolean;
  iconNode?: React.ReactNode;
  showCloseButton?: boolean;
}

export const ToggleActionButton: React.FC<ToggleActionButtonProps> = ({
  label,
  size = 'md',
  rounded = false,
  disabled = false,
  iconNode,
  showCloseButton = false,
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
      )}
    >
      <Button
        className={styles.btn}
        icon={iconNode}
        onClick={handleToggle}
        label={label}
        disabled={disabled}
      />
      {showCloseButton && !disabled && (
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
