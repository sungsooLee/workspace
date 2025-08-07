// ToggleButton.tsx
import React, { useState } from 'react';
import styles from './toggle-button.module.css';
import { Button } from '@learnway/ui/button';
import { cn } from '@learnway/shared';
import { IcoHeart } from '@learnway/icons';

type VariantType = 'heart' | undefined; // 아이콘 케이스 추가

interface ToggleButtonProps {
  label?: string;
  variant?: VariantType;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
  className?: string;
}

const getIconByVariant = (variant: VariantType): React.ReactNode => {
  switch (variant) {
    case 'heart':
      return <IcoHeart width={28} height={28} fill={'none'} stroke="#fff" />;
    default:
      return null;
  }
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  variant,
  defaultChecked = false,
  onToggle,
  className,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = () => {
    const next = !checked;
    setChecked(next);
    onToggle?.(next);
  };

  const icon = getIconByVariant(variant);

  return (
    <Button
      label={label}
      aria-checked={checked}
      className={cn(
        styles.toggle_btn,
        variant && styles[variant],
        checked ? styles.checked : null,
        className,
      )}
      onClick={handleClick}
      icon={icon}
    />
  );
};

export default ToggleButton;
