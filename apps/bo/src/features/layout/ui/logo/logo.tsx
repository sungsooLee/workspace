import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import logoImage from '../../../../assets/images/logo.png';
import logoAuthImage from '../../../../assets/images/logo_auth.png';
import styles from './logo.module.css';

interface LogoComponentProp {
  className?: string;
  theme?: 'login' | 'main';
}

const LogoComponent = ({ theme = 'main', className }: LogoComponentProp) => {
  return (
    <div className={cn(styles.start, 'nlp--logo', className)}>
      <Link to={'/'}>
        <img src={theme === 'main' ? logoImage : logoAuthImage} alt="Logo" />
      </Link>
    </div>
  );
};

export const Logo = memo(LogoComponent);
