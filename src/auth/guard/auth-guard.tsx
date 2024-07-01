import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../hooks';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { loading } = useAuthContext();

  return <>{loading ? <>SplashScreen</> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  //   const router = useRouter();
  const navigate = useNavigate();

  const { authenticated, method } = useAuthContext();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!authenticated) {
        const searchParams = new URLSearchParams({
          returnTo: window.location.pathname,
        }).toString();

        const href = `/auth/login?${searchParams}`;
        console.log('Navigating to:', href);
        navigate(href, { replace: true });
      } else {
        setChecked(true);
      }
    };
    check();
  }, [authenticated, method]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
