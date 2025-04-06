import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import logoImage from '@learnway/styles/fo/assets/images/logo_footer.png';
import { Dropdown, Button, useModal } from '@learnway/ui';
import styles from '@learnway/styles/fo/widgets/layout/ui/main/footer/footer.module.css';
import { AgreementPopup, PrivacyPopup, ContactPopup } from '../../../../../features/auth';
function FooterComponent() {
  const { open: openModal } = useModal();
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

          {/* 퍼블수정 20250327 : pc,mobile 분기처리 */}
          <div className={styles.info_area}>
            <div className={styles.info_menu}>
              <ul>
                <li>
                  {isMobile ? (
                    <Button
                      onClick={() =>
                        openModal({
                          width: 'm_full',
                          content: <AgreementPopup />,
                        })
                      }
                    >
                      이용약관
                    </Button>
                  ) : (
                    <Link to="/footer-menu/agreement">이용약관</Link>
                  )}
                </li>
                <li>
                  {isMobile ? (
                    <Button
                      onClick={() =>
                        openModal({
                          width: 'm_full',
                          content: <PrivacyPopup />,
                        })
                      }
                    >
                      <strong>개인정보 처리방침</strong>
                    </Button>
                  ) : (
                    <Link to="/footer-menu/privacy">
                      <strong>개인정보 처리방침</strong>
                    </Link>
                  )}
                </li>
                <li>{isMobile ? '' : '오픈소스 라이선스'}</li>
                <li>{isMobile ? '' : '사이트맵'}</li>
              </ul>
            </div>

            <div className={styles.info_box}>
              <span className={styles.info}>
                <span className={styles.space}>사업자등록번호 : 123-12-12345</span>{' '}
                <span className={styles.space}>통신판매업신고번호 : 제1234-서울강남-1234호</span>{' '}
                <span className={styles.space}>대표이사 : 홍길동</span>
              </span>
              <address className={styles.address}>
                <span className={styles.space}>주소 : 서울시 강남구 테헤란로 510</span>{' '}
                <span className={styles.space}>호스팅 서비스 제공 : 현대오토에버(주)</span>{' '}
                <span className={styles.space}>
                  고객센터 : <span className={styles.tel}>080-600-6000, 080-200-6000</span>
                </span>
              </address>
              <div className={styles.copyright}>
                Copyright © 2023 Hyundai-Autoever. All rights reserved.
              </div>
            </div>
          </div>

          <div className={styles.family_site_info}>
            <Dropdown
              size="lg"
              onChange={() => console.log('change')}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export const Footer = memo(FooterComponent);
