import { MenuItem } from '../types';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '@/shared/stores/useThemeStore';
import { applyThemePrefernce } from '@/shared/utils/themeUtils';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { GnbInput } from '@/shared/components/Input/GnbInput';
import { useAuthStore } from '@/shared/stores/useAuthStore';

interface GNBProps {
  items: MenuItem[];
  onMenuClick: (menuId: number) => void;
}

const GNB: React.FC<GNBProps> = ({ items, onMenuClick }) => {
  const { t } = useTranslation();
  // const authContext = useContext(AuthContext);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.signOut);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    applyThemePrefernce(theme);
  }, [theme]);

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

  const logout = async () => {
    await signOut();
    // authContext.logout();
  };

  return (
    <nav className='text-gnb-foreground relative flex h-72pxr flex-col items-center bg-grayScale-0 px-24pxr py-12pxr dark:bg-point-blue'>
      <div className='flex w-full items-center justify-between whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='flex flex-row'>
            <img
              src='/logo/logo_hiway.png'
              alt='Light Mode Logo'
              className='block h-auto min-w-[112px] cursor-pointer dark:hidden'
              onClick={() => goHome()}
            />
            <img
              src='/logo/dark_logo_hiway.png'
              alt='Dark Mode Logo'
              className='hidden h-auto min-w-[112px] cursor-pointer dark:block'
              onClick={() => goHome()}
            />
          </div>
        </div>
        <div className='flex w-full justify-between px-32pxr'>
          <div>
            <ul className='flex flex-nowrap items-center justify-center space-x-60pxr overflow-x-auto'>
              {/* <img
                src='/assets/icons/ic_align-justify.svg'
                alt='Logo'
                className='h-8 w-auto'
              ></img> */}
              {items &&
                items.map((item) => (
                  <li key={item.id} className='shrink-0'>
                    <p
                      onClick={() => handleMenuClick(item.id)}
                      className={`${
                        selectedMenuId === item.id
                          ? 'text-grayScale-9'
                          : 'text-grayScale-7'
                      } cursor-pointer rounded px-4 py-2 transition-colors duration-300`}
                    >
                      {t(item.name)}
                    </p>
                  </li>
                ))}
              {/*임시 로그아웃 */}
              <li key='logout' className='shrink-0'>
                <p
                  onClick={() => logout()}
                  className='cursor-pointer rounded px-4 py-2 text-black transition-colors duration-300 hover:text-white dark:text-white'
                >
                  {t('logout')}
                </p>
              </li>
            </ul>
          </div>

          <div className='flex items-center space-x-20pxr'>
            <GnbInput placeholder='나에게 맞는 과정을 찾아보세요.' />
            <div className='flex items-center space-x-20pxr'>
              {/* <img
                src='/assets/icons/navbar/ic_gnb_search.svg'
                alt='Notifications'
                className='h-6 w-6'
              />
               */}
              <button onClick={toggleTheme}>{t('DarkMode')}</button>
              {/* <img
                src='/assets/icons/navbar/ic_gnb_search.png'
                alt='Light Mode Logo'
                className='block h-auto dark:hidden'
              />
              <img
                src='/assets/icons/navbar/ic_gnb_search_dark.svg'
                alt='Dark Mode Logo'
                className='hidden h-auto dark:block'
              /> */}
              <LanguageSwitcher />
              {/* <img
                src='/assets/icons/navbar/ic_heart_line.svg'
                alt='Light Mode Logo'
                className='block h-auto dark:hidden'
              />
              <img
                src='/assets/icons/navbar/ic_heart_line_dark.svg'
                alt='Dark Mode Logo'
                className='hidden h-auto dark:block'
              /> */}
              <img
                src='/assets/icons/navbar/ic_bell.svg'
                alt='Light Mode Logo'
                className='block h-auto dark:hidden'
              />{' '}
              <img
                src='/assets/icons/navbar/ic_bell_dark.svg'
                alt='Dark Mode Logo'
                className='hidden h-auto dark:block'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 h-[1px] w-full bg-primary-3'></div>
    </nav>
  );
};

export default GNB;
