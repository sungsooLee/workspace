import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { menuConfig, MenuItem } from './types';
import { useQuery } from '@tanstack/react-query';
import fetchMenus from './api/fetchMenus';
import LnbDrawer from './common/LnbDrawer';
import GNB from './common/gnb';
const Layout = () => {
  const [activeMenuId, setActiveMenuId] = useState(1);

  const [open, setOpen] = useState(false);
  const handleMenuClick = (menuId: number) => {
    if (!open) setOpen(true);
    setActiveMenuId(menuId);
  };

  const { data: menus } = useQuery<MenuItem[], Error>({
    queryKey: ['menus'],
    queryFn: fetchMenus,
  });

  return (
    <div className='flex min-h-screen flex-col bg-body text-primaryT'>
      <GNB items={menus || []} onMenuClick={handleMenuClick} />
      <LnbDrawer
        open={open}
        setOpen={setOpen}
        items={menuConfig.lnb[activeMenuId] || []}
      />
      <div className='left-0 flex w-full'></div>
      <div className='flex h-full flex-1 overflow-hidden'>
        <div className={`flex-1 overflow-y-auto bg-white`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
