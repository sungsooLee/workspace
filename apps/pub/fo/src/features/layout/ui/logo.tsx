import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './logo.module.css';
import logoImage from '../../../assets/images/logo.png';

const LogoCompoment = () => {
  return (
    <div className={`${styles.start} ${styles.logo}`}>
      <Link to={'/'}>
        <img src={logoImage} alt="Logo" />
      </Link>
    </div>
  );
};

export const Logo = memo(LogoCompoment);
