/* eslint-disable @nx/enforce-module-boundaries */
import React, { useState, useEffect } from 'react';
import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router';
import '../../../../../libs/styles/src/lib/bo/assets/styles/global.css';
import '../../../../../libs/styles/src/lib/bo/assets/styles/guide.css';
// import styles from './_guide.module.css';
export const Route = createFileRoute('/_guide')({
  component: RouteComponent,
});

function RouteComponent() {
  const menuItems = [
    {
      title: 'Guide',
      subItems: [
        { label: '소개', path: '/guide/info' },
        { label: '컬러', path: '/guide/color' },
        { label: '타이포그래픽', path: '/guide/typography' },
        { label: 'CSS', path: '/guide/css' },
        { label: 'Form', path: '/guide/form' },
      ],
    },
    {
      title: 'Component',
      subItems: [
        { label: 'Buttons', path: '/guide/buttons' },
        { label: 'Alert, Confirm', path: '/guide/alert' },
        { label: 'Modal', path: '/guide/modal' },
        { label: 'Grid, Table', path: '/guide/grid' },
        { label: 'Checkbox', path: '/guide/checkbox' },
        { label: 'Radio', path: '/guide/radio' },
        { label: 'Select', path: '/guide/select' },
        { label: 'Tootip', path: '/guide/tooltip' },
        { label: 'Chips', path: '/guide/chips' },
        { label: 'Switch', path: '/guide/switch' },
        { label: 'Carousel', path: '/guide/carousel' },
        { label: 'Pagination', path: '/guide/pagination' },
        { label: 'Stepper', path: '/guide/stepper' },
        { label: 'Tabs', path: '/guide/tabs' },
        { label: 'Progress', path: '/guide/progress' },
        { label: 'Badge', path: '/guide/badge' },
        { label: 'Spinner', path: '/guide/spinner' },
        { label: 'OptionCard', path: '/guide/optionCard' },
        { label: 'Panel', path: '/guide/panel' },
        // { label: '텍스트필드', path: '/guide/textfield' },
        // { label: '이미지', path: '/guide/image' },
        { label: 'Icon', path: '/guide/icon' },
      ],
    },
  ];
  const [visibleList, setVisibleList] = useState({});

  type VisibleList = {
    [key: string]: boolean;
  };

  const toggleVisibility = (key: string): void => {
    setVisibleList((prevState: VisibleList) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);
  return (
    <div>
      <div>
        <div className="guide_wrap">
          <div className="aside">
            <h1>
              <Link to={'/guide'}>Publish Guide(BO)</Link>
            </h1>
            <div className="menu">
              <ul>
                {menuItems.map(({ title, subItems }) => (
                  <li key={title}>
                    <span className="tit" onClick={() => toggleVisibility(title)}>
                      {title}
                      <span className="arrow">▼</span>
                    </span>
                    {subItems && !visibleList[title] && (
                      <ul>
                        {subItems.map(({ label, path }) => (
                          <li key={path} className={currentPath === path ? 'active' : ''}>
                            <Link to={path}>{label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="preview">
            <div className="guide_box">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
