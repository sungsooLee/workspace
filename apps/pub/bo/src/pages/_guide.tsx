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
        { label: '반응형', path: '/guide/respond' },
      ],
    },
    {
      title: 'Component',
      subItems: [
        { label: '레이아웃', path: '/guide/layout' },
        { label: '버튼', path: '/guide/buttons' },
        { label: '알럿,컨펌', path: '/guide/alert' },
        { label: '모달', path: '/guide/modal' },
        { label: 'Grid 테이블', path: '/guide/grid' },
        { label: 'Form', path: '/guide/form' },
        { label: 'Checkbox', path: '/guide/checkbox' },
        // { label: '텍스트필드', path: '/guide/components/textfield' },
        // { label: '이미지', path: '/guide/components/image' },
        // { label: '아이콘', path: '/guide/components/icon' },
      ],
    },
    {
      title: 'Pages',
      subItems: [{ label: '메뉴1', path: '/menu3' }],
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
              <Link to={'/guide'}>Publish Guide</Link>
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
                        {subItems.map(({ label, path, index }) => (
                          <li key={path} className={currentPath === path ? 'active' : ''}>
                            {title === 'Pages' ? (
                              <a href={path} target="_blank" rel="noopener noreferrer">
                                {label}
                              </a>
                            ) : (
                              <Link to={path}>{label}</Link>
                            )}
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
