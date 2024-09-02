import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { menuConfig, MenuItem } from './types';
import Footer from './common/Footer';
import { useQuery } from '@tanstack/react-query';
import fetchMenus from './api/fetchMenus';
import GNB from './common/Gnb';
import LNB from './common/Lnb';
const Layout = () => {
  const [isLNBOpen, setIsLNBOpen] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(1);

  const handleMenuClick = (menuId: number) => {
    setActiveMenuId(menuId);
  };

  const { data: menus } = useQuery<MenuItem[], Error>({
    queryKey: ['menus'],
    queryFn: fetchMenus,
  });

  return (
    <div className='flex min-h-screen flex-col bg-body text-primaryT'>
      <GNB items={menus || []} onMenuClick={handleMenuClick} />

      <div className='flex h-full flex-1 overflow-hidden'>
        <LNB
          items={menuConfig.lnb[activeMenuId] || []}
          isOpen={isLNBOpen}
          toggleOpen={() => setIsLNBOpen(!isLNBOpen)}
        />
        <div className={`flex-1 overflow-y-auto bg-white`}>
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
