import { axiosInstance } from '@/app/api/instance';
import { Button } from '@/shared/components/Button/button';
import { HTTPError } from '@/shared/components/error/errorBoundary';
import { Input } from '@/shared/components/Input/input';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const authContext = useContext(AuthContext);
  const signIn = useAuthStore((state) => state.signIn);
  const navigate = useNavigate();

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
      await signIn(email, password);
      navigate('/');
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        throw new HTTPError(401, 'Invalid email or password');
      } else {
        throw error;
      }
    }
  };
  return (
    <>
      <div className='p-50pxr'>
        <Input placeholder='email' value={email} onChange={handleEmailChange} />
        <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <Button onClick={login}>로그인</Button>
      </div>
    </>
  );
}
