import { memo } from 'react';

import logoImage from '../../../../../assets/images/logo_footer.png';

import { TermsButton } from '../../../../../features/main';

import styles from '@learnway/styles/fo/widgets/layout/ui/main/footer/footer.module.css';

function FooterComponent() {
  return (
    <div className={`${styles.start} ${styles.footer}`}>
      <div className={styles.footer_area}>
        {/* <div className={styles.footer_menu}>
          <h4 className="">교육제도</h4>
          <ul className={styles.menu_list}>
            <li>
              <Link to={'/'}>금융자격지원제도</Link>
            </li>
            <li>
              <Link to={'/'}>SPA 승진제도</Link>
            </li>
          </ul>
        </div> */}

        <div className={styles.footer_info}>
          <span className={styles.logo}>
            <img src={logoImage} alt="Logo" />
          </span>

          <div className={styles.info_area}>
            <div className={styles.info_menu}>
              <ul>
                <li>
                  <TermsButton termsType="TERMS_OF_SERVICE" />
                </li>
                <li>
                  <TermsButton termsType="PRIVACY_POLICY" />
                </li>
                {/* <li>
                  <Link to={'/license'}>오픈소스 라이선스</Link>
                </li> */}
              </ul>
            </div>

            <div className={styles.info_box}>
              <div className={styles.info}>
                <span className={styles.space}>문의 전화번호 : 080-224-9696</span>
                <span className={styles.space}>문의 이메일 : 7023688@hyundai-autoever.com</span>
                <span className={styles.space}>
                  평일 09:00 ~18:00 (점심시간 12:00 ~ 13:00 제외)
                </span>
              </div>
              <div className={styles.address}>
                <span className={styles.space}>주소 : 서울시 강남구 테헤란로 510</span>
                <span className={styles.space}>호스팅 서비스 제공 : 현대오토에버(주)</span>
                <span className={styles.space}>사업자등록번호 : 123-33-55345</span>
                <span className={styles.space}>통신판매업신고번호 : 제 1233-서울강남</span>
                <span className={styles.space}>대표이사 : 현오토</span>
              </div>
              <div className={styles.copyright}>
                COPYRIGHT 2025 HYUNDAI AUTOEVER. ALL RIGHTS RESERVED
              </div>
            </div>
          </div>
          {/* <div className={styles.family_site_info}>
            <Dropdown
              // onChange={() => {}}
              options={[
                {
                  label: 'Family site',
                  value: 'value0',
                },
                {
                  label: 'site1',
                  value: 'value1',
                },
                {
                  label: 'site2',
                  value: 'value2',
                },
              ]}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export const Footer = memo(FooterComponent);
