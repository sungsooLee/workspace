import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_unauth')({
  component: RouteComponent,
});

function RouteComponent() {
  const isScrolled = useBodyScroll();
  // console.log('isScrolled', isScrolled);
  return (
    <main>
      <Outlet />
    </main>
  );
}

const useBodyScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
};
