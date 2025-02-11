import { memo } from 'react';
import { useLocation } from '@tanstack/react-router';
import styles from './auth-title.module.css';

interface PageData {
  title: string;
  className: keyof typeof styles;
}

const pageData: Record<string, PageData> = {
  '/join': { title: '회원가입', className: '' },
  '/login': { title: 'LEARNING WAY (시스템명)', className: 'title_login' },
};

const AuthTitleCompoment = () => {
  const location = useLocation();
  const { title, className } = pageData[location.pathname] || {
    title: '타이틀',
    className: 'title',
  };

  return <h2 className={styles[className]}>{title}</h2>;
};

export const AuthTitle = memo(AuthTitleCompoment);
