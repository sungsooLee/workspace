import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './logo.module.css';
import logoImage from '../../../assets/images/logo.png';
import logoImage2 from '../../../assets/images/logo_auth.png'; // 로그인 auth 호출

const LogoCompoment = () => {
  return (
    <div className={`${styles.start} nlp--logo`}>
      <Link to={'/'}>
        <img src={logoImage} alt="Logo" />
      </Link>
    </div>
  );
};

export const Logo = memo(LogoCompoment);
