import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import LoadingScreen from '@/shared/components/ui/loading-screen';
import { useLoginMutation } from '@/shared/hooks/useLoginMutation';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLoginMutation();
  const singIn = useAuthStore((state) => state.signIn);
  const navigate = useNavigate();
  const { isPending, isError, error } = loginMutation;
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && password.trim() !== '') {
      login();
    }
  };

  const login = async () => {
    try {
      loginMutation.mutateAsync({ email, password }).then((data) => {
        if (data && data.accessToken && data.refreshToken && email) {
          singIn(data.accessToken, data.refreshToken, email);
          // navigate('/');
          const searchParams = new URLSearchParams(window.location.search);
          // console.log(searchParams);
          const returnTo = searchParams.get('returnTo');
          // Console.log()
          if (returnTo) {
            navigate(returnTo);
          } else {
            navigate('/');
          }
        } else throw Error('failed login');
      });
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <>
      <div className='p-50pxr'>
        {!isPending ? (
          <>
            <Input
              placeholder='email'
              value={email}
              onChange={handleEmailChange}
            />
            <Input
              type='password'
              placeholder='password'
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <LoadingScreen />
        )}
      </div>
      <div>
        {isError && <p className='text-red-600'>{error?.message}</p>}
        <Button onClick={login}>로그인</Button>
      </div>
    </>
  );
}
