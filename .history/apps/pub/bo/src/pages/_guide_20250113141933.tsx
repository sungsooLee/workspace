import { createFileRoute, Outlet, Link } from '@tanstack/react-router';
import styles from './_guide.module.css';

export const Route = createFileRoute('/_guide')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>
        <div className={styles.guide_wrap}>
          <div className={styles.aside}>
            <h1>
              <Link to={'/guide'}>Publish Guide</Link>
            </h1>
            <div className={styles.menu}>
              <ul>
                <li>
                  <span className={styles.sub_title}>
                    Guide
                    <span className={styles.count}>(11)</span>
                  </span>
                  <ul>
                    <li className="">소개</li>
                    <li className="">타이포그래픽</li>
                    <li className="">컬러</li>
                    <li className="">반응형</li>
                  </ul>
                </li>
                <li>
                  <span className={styles.sub_title}>
                    Component
                    <span className={styles.count}>(11)</span>
                  </span>
                  <ul>
                    <li className="">레이아웃</li>
                    <li className="">버튼</li>
                    <li className="">텍스트필드</li>
                    <li className="">이미지</li>
                    <li className="">아이콘</li>
                  </ul>
                </li>
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
