import { lazy } from 'react';

export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  return lazy(importFunc);
};

export const createLazyComponentWithPreload = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  const LazyComponent = lazy(importFunc);
  
  const preload = () => {
    const componentImport = importFunc();
    return componentImport;
  };

  return Object.assign(LazyComponent, { preload });
};

export const preloadRoute = (routeImport: () => Promise<any>) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = routeImport.toString();
  document.head.appendChild(link);
};