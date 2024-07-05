import { Outlet } from 'react-router-dom';
import GNB from './common/gnb';
import LNB from './common/lnb';
import { Suspense, useState } from 'react';
import { menuConfig } from './types';
import LoadingScreen from '../suspense/loading-screen';

const HAELayout = () => {
  const [isLNBOpen, setIsLNBOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(1);

  const handleMenuClick = (menuId: number) => {
    setActiveMenuId(menuId);
  };

  return (
    <div className='flex flex-col h-screen'>
      <GNB items={menuConfig.gnb} onMenuClick={handleMenuClick} />
      <div className='flex flex-1 overflow-hidden '>
        <LNB items={menuConfig.lnb[activeMenuId] || []} />
        <div
          className={`flex-1 pb-[80px] bg-bodybackground overflow-y-auto ${isLNBOpen ? 'ml-[264px]' : ''}`}
        >
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      {/* <div className='bg-gnb text-white p-4 fixed bottom-0 left-0 w-full'>
        Footer
      </div> */}
    </div>
  );
};

export default HAELayout;
