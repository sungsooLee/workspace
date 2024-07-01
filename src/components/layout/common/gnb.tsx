import { Button } from '@/components/ui/button';
import { MenuItem } from '../types';
import { useContext } from 'react';
import { AuthContext } from '@/auth/context/jwt/auth-context';

interface GNBProps {
  items: MenuItem[];
  onMenuClick: (menuId: number) => void;
}

const GNB: React.FC<GNBProps> = ({ items, onMenuClick }) => {
  const authContext = useContext(AuthContext);
  const logout = () => {
    authContext.logout();
  };
  return (
    <nav className='bg-gnb text-gnb-foreground flex items-center justify-between h-[84px] p-[24px]'>
      <div className='flex items-center'>
        <img src='/assets/icons/HAE_Logo.svg' alt='Logo' className='' />
      </div>
      <ul className='flex justify-center items-center space-x-4 py-4'>
        {items &&
          items.map((item) => (
            <li key={item.id}>
              <Button
                onClick={() => onMenuClick(item.id)}
                className='text-white hover:text-white hover:bg-gray-600 transition-colors duration-300 px-4 py-2 rounded'
                style={{ color: 'hsla(0, 0%, 100%, 0.6)' }}
              >
                {item.name}
              </Button>
            </li>
          ))}
        {/*임시 로그아웃 */}
        <li key='logout'>
          <Button
            onClick={() => logout()}
            className='text-white hover:text-white hover:bg-gray-600 transition-colors duration-300 px-4 py-2 rounded'
            style={{ color: 'hsla(0, 0%, 100%, 0.6)' }}
          >
            로그아웃
          </Button>
        </li>
      </ul>
      <div className='flex items-center space-x-4'>
        <img src='/assets/icons/ic_bell.svg' alt='Notifications' />
        <img src='/assets/icons/ic_globe.svg' alt='Globe' />
        <img
          src='/assets/icons/ic_settings.svg'
          alt='Settings'
          className='animate-spin duration-5000'
        />
      </div>
    </nav>
  );
};

export default GNB;
