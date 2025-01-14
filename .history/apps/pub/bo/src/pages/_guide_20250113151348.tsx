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
  // 타입 정의
  type MenuItem = {
    label: string;
    path: string;
  };

  type MenuGroup = {
    title: string;
    subItems?: MenuItem[];
    subTitles?: SubTitle[];
  };

  type SubTitle = {
    label: string;
    subItems: MenuItem[];
  };

  type RouteConfig = {
    path: string;
    element: JSX.Element;
    className?: string;
  };

  return (
    <div>
      <div>
        <div className={styles.guide_wrap}>
          <div className={styles.aside}>
            <h1>
              <Link to={'/guide'}>Publish Guide</Link>
            </h1>
            <div className={styles.menu}>
              {menuItems.map(({ title, subItems, subTitles }) => (
                <ul>
                  <li key={title}>
                    <span className={styles.sub_title}>{title}</span>
                    {subItems && visibleList[title] && (
                      <ul>
                        <li key={path}>
                          <Link to={path}>{label}</Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              ))}
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
