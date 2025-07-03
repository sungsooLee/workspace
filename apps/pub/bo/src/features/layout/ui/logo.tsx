import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './logo.module.css';
import logoImage from '../../../assets/images/logo.png';
import logoImage2 from '../../../assets/images/logo_auth.png'; // 로그인 auth 호출

interface LogoProps {
  headerType?: 'common' | 'login'; // 'common' 또는 'login' 값으로 구분
}

const LogoCompoment = ({ headerType }: LogoProps) => {
  const logoImagePath =
    headerType === 'login'
      ? logoImage2 // 로그인 로고 이미지
      : logoImage; // 공통 헤더 로고 이미지
  return (
    <div className={`${styles.start} nlp--logo`}>
      <Link to={'/'}>
        <img src={logoImagePath} alt="Logo" />
      </Link>
    </div>
  );
};

export const Logo = memo(LogoCompoment);
