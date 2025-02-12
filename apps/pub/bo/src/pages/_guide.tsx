import React, { useState, useEffect } from 'react';
import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router';
import '../assets/styles/global.css';
import '../assets/styles/guide.css';
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
        { label: 'Form', path: '/guide/form' },
      ],
    },
    {
      title: 'Component',
      subItems: [
        { label: 'Buttons', path: '/guide/buttons' },
        { label: 'Alert, Confirm', path: '/guide/alert' },
        { label: 'Modal', path: '/guide/modal' },
        { label: 'Grid 테이블', path: '/guide/grid' },

        { label: 'Checkbox', path: '/guide/checkbox' },
        { label: 'Radio', path: '/guide/radio' },
        { label: 'Select', path: '/guide/select' },
        { label: 'Tootip', path: '/guide/tooltip' },
        { label: 'Chips', path: '/guide/chips' },
        { label: 'Switch', path: '/guide/switch' },
        { label: 'Pagination', path: '/guide/pagination' },
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
