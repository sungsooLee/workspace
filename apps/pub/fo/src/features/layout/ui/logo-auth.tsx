import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './logo-auth.module.css';
import logoImage from '../../../assets/images/logo_auth.png';

const LogoAuthCompoment = () => {
  return (
    <div className={`${styles.start} nlp--logo`}>
      <Link to={'/'}>
        <img src={logoImage} alt="Logo" />
      </Link>
    </div>
  );
};

export const LogoAuth = memo(LogoAuthCompoment);
