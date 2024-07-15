import { Outlet } from 'react-router-dom';
import GNB from './common/gnb';
import LNB from './common/lnb';
import { Suspense, useState } from 'react';
import { menuConfig } from './types';
import LoadingScreen from '../suspense/loading-screen';
import Footer from './common/footer';

const Layout = () => {
  const [isLNBOpen, setIsLNBOpen] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(1);

  const handleMenuClick = (menuId: number) => {
    setActiveMenuId(menuId);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <GNB items={menuConfig.gnb} onMenuClick={handleMenuClick} />
      <div className='flex flex-1 overflow-hidden h-full'>
        <LNB
          items={menuConfig.lnb[activeMenuId] || []}
          isOpen={isLNBOpen}
          toggleOpen={() => setIsLNBOpen(!isLNBOpen)}
        />
        <div className={`flex-1 overflow-y-auto `}>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
