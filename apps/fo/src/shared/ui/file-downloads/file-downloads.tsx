// IA285 / NLP_FO_CLA_1008_1/2 강의실_자료실_상세(파일다운로드_공통/DRM)

import { IcoLock, IcoPdf } from '@learnway/icons';
import styles from '@learnway/styles/fo/features/layout/ui/course-introduction/dashboard.module.css';
import pdsStyles from '@learnway/styles/fo/features/layout/ui/course-introduction/pds.module.css';
import { Button } from '@learnway/ui/button';
import { Panel } from '@learnway/ui/panel';
import { isMobile } from 'react-device-detect';

interface Props {
  label?: string;
  groupUuid?: string;
  fileUuids?: string[];
  fileUuid?: string;
}

export const FileDownloads = ({ label, groupUuid, fileUuids, fileUuid }: Props) => {
  return (
    <div className={styles.start}>
      <div className={`${styles.info_box} ${styles.curriculum}`}>
        <div className={`${styles.info_box} ${styles.pds}`}>
          {/* 퍼블수정 20250723 자료 개수 추가 및 버튼 수정 */}
          <div className={styles.tit_box}>
            <h3>
              {label}
              <em>2</em>
            </h3>
            {/* 퍼블수정 20250724 사이즈 수정 */}
            <Button variant="line" size={isMobile ? 'md' : 'lx'} className={styles.btn}>
              전체 다운로드
            </Button>
          </div>
          <div className={pdsStyles.start}>
            <Panel hideHeaderUnderline actions="" className="w_full" type="rounded">
              <div className={pdsStyles.pds_box}>
                <span className={pdsStyles.txt}>
                  {/* 퍼블수정 20250724 pdf 원복 */}
                  <IcoPdf className={styles.ico_pdf} />
                  <span>비즈니스 영어 단어&숙어집.pdf</span>
                  <IcoLock className={styles.ico_lock} />
                </span>
                <div className={pdsStyles.info}>
                  {/* 퍼블수정 20250724 mobile에서 hide */}
                  {isMobile || <span className={pdsStyles.size}>200MB</span>}
                  {/* 퍼블수정 20250724 버튼 사이즈 수정 */}
                  <Button variant="line" size="md" className={pdsStyles.btn}>
                    다운로드
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel hideHeaderUnderline actions="" className="w_full" type="rounded">
              <div className={pdsStyles.pds_box}>
                <span className={pdsStyles.txt}>
                  <IcoPdf className={styles.ico_pdf} />
                  <span>비즈니스 영어 단어&숙어집.pdf</span>
                  <IcoLock className={styles.ico_lock} />
                </span>
                <div className={pdsStyles.info}>
                  {isMobile || <span className={pdsStyles.size}>200MB</span>}
                  <Button variant="line" size="md" className={pdsStyles.btn}>
                    다운로드
                  </Button>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
};
