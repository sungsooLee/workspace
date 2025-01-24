import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './footer.module.css';

function FooterComponent() {
  return (
    <div className={`${styles.start} nlp--footer`}>
      <div className={styles.footer}>
        <div className={styles.footer_menu}>
          <h4 className="">교육제도</h4>
          <ul className={styles.menu_list}>
            <li>
              <Link to={'/'}>금융자격지원제도</Link>
            </li>
            <li>
              <Link to={'/'}>SPA 승진제도</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footer_info}></div>
      </div>
    </div>
  );
}

export const Footer = memo(FooterComponent);
