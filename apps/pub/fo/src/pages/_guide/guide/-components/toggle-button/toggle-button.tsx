// ToggleButton.tsx
import React, { useState } from 'react';
import styles from './toggle-button.module.css';
import { Button } from '@learnway/ui';

interface ToggleButtonProps {
  label?: string;
  icon?: React.ReactNode;
  variant?: 'heart';
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  icon,
  defaultChecked = false,
  onToggle,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = () => {
    const next = !checked;
    setChecked(next);
    onToggle?.(next);
  };

  return (
    <Button
      label={label}
      aria-checked={checked}
      className={styles.toggle_btn}
      onClick={handleClick}
      icon={icon}
    />
  );
};

export default ToggleButton;
