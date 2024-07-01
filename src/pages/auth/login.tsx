import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useContext, useState } from 'react';
import { AuthContext } from '@/auth/context/jwt/auth-context';
import axiosInstance from '@/lib/utils/axios';



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    const res  = await axiosInstance.post('/user', { email, password });
    const { token, ...user } = res.data;
    if (token) authContext.login(token, user);
  };
  return (
    <>
      <div className='p-[50px]'>
        <Input placeholder='email' value={email} onChange={handleEmailChange} />
        <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <Button onClick={login}>로그인</Button>
      </div>
    </>
  );
}
