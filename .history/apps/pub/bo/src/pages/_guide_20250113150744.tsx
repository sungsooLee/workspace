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
                    <span className={styles.sub_title}>
                      {title}
                      <span className={styles.count}>(11)</span>
                    </span>
                    <ul>
                      <li className="">소개</li>
                      <li className="">타이포그래픽</li>
                      <li className="">컬러</li>
                      <li className="">반응형</li>
                    </ul>
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
