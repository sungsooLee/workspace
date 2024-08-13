import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export default function ZustandAuthGuard({ children }: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const check = async () => {
      await checkAuth();
      setChecked(true);
    };
    check();
  }, [checkAuth, location]);

  useEffect(() => {
    if (checked && !isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString;
      const href = `/auth/login?${searchParams}`;
      navigate(href, { replace: true });
    }
  }, [checked, isAuthenticated, navigate]);

  if (!checked) {
    return <>SplashScreen</>;
  }

  return <>{children}</>;
}
