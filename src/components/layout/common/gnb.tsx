import { Button } from '@/components/ui/button';
import { MenuItem } from '../types';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/auth/context/jwt/auth-context';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { GnbInput } from '@/components/Input/gnb-input';

interface GNBProps {
  items: MenuItem[];
  onMenuClick: (menuId: number) => void;
}

const GNB: React.FC<GNBProps> = ({ items, onMenuClick }) => {
  const authContext = useContext(AuthContext);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length > 0) {
      setSelectedMenuId(items[0].id);
    }
  }, [items]);

  const handleMenuClick = (menuId: number) => {
    setSelectedMenuId(menuId);
    onMenuClick(menuId);
  };
  const goHome = () => {
    navigate('/');
  };

  const logout = () => {
    authContext.logout();
  };

  return (
    <nav className='text-gnb-foreground flex h-72pxr items-center bg-gnb px-24pxr py-12pxr'>
      <div className='flex items-center'>
        <div className='flex flex-row'>
          <p
            className='cursor-pointer text-24pxr font-[700pxr] leading-24pxr text-white'
            onClick={() => goHome()}
          >
            CI
          </p>
          <div className='mx-20pxr h-23pxr w-1pxr bg-white'></div>
          <p className='text-24pxr font-[700pxr] leading-24pxr text-white'>
            SYSTEM
          </p>
        </div>
      </div>
      <div className='flex w-full justify-between pl-64pxr'>
        <div>
          <ul className='flex flex-nowrap items-center space-x-60pxr overflow-x-auto'>
            <img
              src='/assets/icons/ic_align-justify.svg'
              alt='Logo'
              className='h-8 w-auto'
            ></img>
            {items &&
              items.map((item) => (
                <li key={item.id} className='shrink-0'>
                  <p
                    onClick={() => handleMenuClick(item.id)}
                    className={`${
                      selectedMenuId === item.id
                        ? 'text-white'
                        : 'text-hae-white-60'
                    } cursor-pointer rounded px-4 py-2 transition-colors duration-300 hover:text-white`}
                  >
                    {item.name}
                  </p>
                </li>
              ))}
            {/*임시 로그아웃 */}
            <li key='logout' className='shrink-0'>
              <p
                onClick={() => logout()}
                className='cursor-pointer rounded px-4 py-2 text-hae-white-60 transition-colors duration-300 hover:text-white'
              >
                로그아웃
              </p>
            </li>
          </ul>
        </div>
        <div className='flex items-center space-x-50pxr'>
          <div className='w-333pxr'>
            <GnbInput placeholder='나에게 맞는 과정을 찾아보세요.' />
          </div>
          <div className='flex items-center space-x-4'>
            <img
              src='/assets/icons/ic_bell.svg'
              alt='Notifications'
              className='h-6 w-6'
            />
            <img
              src='/assets/icons/ic_globe.svg'
              alt='Globe'
              className='h-6 w-6'
            />
            <img
              src='/assets/icons/ic_settings.svg'
              alt='Settings'
              className='h-6 w-6 animate-spin'
              style={{ animationDuration: '5s' }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GNB;
