import React, { useState } from 'react';
import { createFileRoute, Outlet, Link } from '@tanstack/react-router';
import styles from './_guide.module.css';

export const Route = createFileRoute('/_guide')({
  component: RouteComponent,
});

function RouteComponent() {
  const menuItems = [
    {
      title: 'Guide',
      subItems: [
        { label: '소개', path: '/guide/info' },
        { label: '타이포그래픽', path: '/guide/Typography' },
        { label: '컬러', path: '/guide/color' },
        { label: '반응형', path: '/guide/respond' },
      ],
    },
    {
      title: 'Component',
      subItems: [
        { label: '레이아웃', path: '/guide/layout' },
        { label: '버튼', path: '/guide/button' },
        { label: '텍스트필드', path: '/guide/textfield' },
        { label: '이미지', path: '/guide/image' },
        { label: '아이콘', path: '/guide/icon' },
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
  return (
    <div>
      <div>
        <div className={styles.guide_wrap}>
          <div className={styles.aside}>
            <h1>
              <Link to={'/guide'}>Publish Guide</Link>
            </h1>
            <div className="menu">
              <ul>
                {menuItems.map(({ title, subItems, subTitles }) => (
                  <li key={title}>
                    <span className="tit" onClick={() => toggleVisibility(title)}>
                      {title}
                      <span className={`arrow ${visibleList[title] ? 'down' : 'up'}`}>▼</span>
                    </span>
                    {subItems && visibleList[title] && (
                      <ul>
                        {subItems.map(({ label, path }) => (
                          <li key={path} className={location.pathname === path ? 'active' : ''}>
                            <Link to={path}>{label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {subTitles && visibleList[title] && (
                      <ul>
                        {subTitles.map(({ label, subItems }) => (
                          <li key={label} className="sub-title-item">
                            <span className="sub-title" onClick={() => toggleVisibility(label)}>
                              {label}
                              <span className="count">({subItems.length})</span>
                            </span>

                            {!visibleList[label] && (
                              <ul>
                                {subItems.map(({ label, path }) => (
                                  <li
                                    key={path}
                                    className={location.pathname === path ? 'active' : ''}>
                                    <Link to={path}>{label}</Link>
                                  </li>
                                ))}
                              </ul>
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

          <div className={styles.preview}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
