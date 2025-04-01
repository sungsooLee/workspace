import { createFileRoute } from '@tanstack/react-router';

import styles from './package.module.css';
import pageContentsStyles from '../../_page-contents.module.css';

// 예시 이미지
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_layout/course-introduction/package')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${pageContentsStyles.start} ${styles.start}`}>
      <div className={pageContentsStyles.main_contents}>
        <div className={styles.thumbnail_img}>
          <img src={bnrImage1} alt="" />
        </div>
        <div className={styles.package_box}>
          <div className={styles.txt_box}>
            <strong>패키지소갸</strong>
            <p>
              패키지에 대한 소개 공백포함 한글 300자 패키지에 대한 소개 공백포함 한글 300자 패키지에
              대한 소개 공백포함 한글 300자 패키지에 대한 소개 공백패키지에 대한 소개 공백포함 한글
              300자 패키지에 대한 소개 공백포
            </p>
          </div>
          <div className={styles.img_box}>
            <img src={bnrImage1} alt="" />
          </div>
        </div>
      </div>
      <div className={pageContentsStyles.sub_contents}>aa</div>
    </div>
  );
}
