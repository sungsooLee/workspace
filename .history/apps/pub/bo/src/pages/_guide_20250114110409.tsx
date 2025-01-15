import React, { useState } from 'react';
import { createFileRoute, Outlet, Link } from '@tanstack/react-router';
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
        { label: '타이포그래픽', path: '/guide/Typography' },
        { label: '반응형', path: '/guide/respond' },
      ],
    },
    {
      title: 'Component',
      subItems: [
        { label: '레이아웃', path: '/guide/components/layout' },
        { label: '버튼', path: '/guide/components/button' },
        // { label: '텍스트필드', path: '/guide/components/textfield' },
        // { label: '이미지', path: '/guide/components/image' },
        // { label: '아이콘', path: '/guide/components/icon' },
      ],
    },
    {
      title: 'Pages',
      subItems: [{ label: '메뉴1', path: '/menu1' }],
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
        <div className="guide_wrap">
          <div className="aside">
            <h1>
              <Link to={'/guide'}>Publish Guide</Link>
            </h1>
            <div className="menu">
              <ul>
                {menuItems.map(({ title, subItems, subTitles }) => (
                  <li key={title}>
                    <span className="tit" onClick={() => toggleVisibility(title)}>
                      {title}
                      <span className="arrow">▼</span>
                    </span>
                    {subItems && !visibleList[title] && (
                      <ul>
                        {subItems.map(({ label, path }) => (
                          <li key={path}>
                            <Link to={path}>{label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {subTitles && visibleList[title] && (
                      <ul>
                        {subTitles.map(({ label, subItems }) => (
                          <li key={label} className="sub_title_item">
                            <span className="sub_title" onClick={() => toggleVisibility(label)}>
                              {label}
                              <span className="count">({subItems.length})</span>
                            </span>

                            {visibleList[label] && (
                              <ul>
                                {subItems.map(({ label, path }) => (
                                  <li key={path} className="active">
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
