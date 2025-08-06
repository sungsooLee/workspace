import { IcoLock, IcoPdf } from '@learnway/icons';
import styles from '@learnway/styles/fo/features/layout/ui/course-introduction/dashboard.module.css';
import pdsStyles from '@learnway/styles/fo/features/layout/ui/course-introduction/pds.module.css';
import { Button } from '@learnway/ui/button';
import { Panel } from '@learnway/ui/panel';
import { createFileRoute, Link } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';

export const Route = createFileRoute('/_guide/guide/download')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">다운로드(자료실) Page Component</h2>
      <p className="loc css">
        @learnway/styles/fo/features/layout/ui/course-introduction/pds.module.css
      </p>
      <p className="loc react">
        <Link to="/course-introduction/detail">예제링크</Link>
      </p>
      <div className="info">위아래 여백은 각 모듈 css에서 정의</div>
      <div className="group">
        <h3 className="guide_tit3">다운로드</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <div className={pdsStyles.start}>
              <Panel hideHeaderUnderline actions="" className="w_full" type="rounded">
                <div className={pdsStyles.pds_box}>
                  <span className={pdsStyles.txt}>
                    <IcoPdf className={styles.ico_pds} /> 비즈니스 영어 단어&숙어집.pdf
                    <IcoLock className={styles.ico_lock} />
                  </span>
                  <div className={pdsStyles.info}>
                    <span className={pdsStyles.size}>200MB</span>
                    <Button variant="line" size={isMobile ? 'ts' : 'lg'} className={pdsStyles.btn}>
                      다운로드
                    </Button>
                  </div>
                </div>
              </Panel>

              <Panel hideHeaderUnderline actions="" className="w_full" type="rounded">
                <div className={pdsStyles.pds_box}>
                  <span className={pdsStyles.txt}>
                    <IcoPdf className={styles.ico_pds} /> 비즈니스 영어 단어&숙어집.pdf
                    <IcoLock className={styles.ico_lock} />
                  </span>
                  <div className={pdsStyles.info}>
                    <span className={pdsStyles.size}>200MB</span>
                    <Button variant="line" size={isMobile ? 'ts' : 'lg'} className={pdsStyles.btn}>
                      다운로드
                    </Button>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`import { Panel } from '@learnway/ui/panel';

<div className={pdsStyles.start}>
  <Panel hideHeaderUnderline actions="" className="w_full" type="rounded">
    <div className={pdsStyles.pds_box}>
      <span className={pdsStyles.txt}>
        <IcoPdf className={styles.ico_pds} /> 비즈니스 영어 단어&숙어집.pdf
        <IcoLock className={styles.ico_lock} />
      </span>
      <div className={pdsStyles.info}>
        <span className={pdsStyles.size}>200MB</span>
        <Button variant="line" size={isMobile ? 'ts' : 'lg'} className={pdsStyles.btn}>
          다운로드
        </Button>
      </div>
    </div>
  </Panel>

  <Panel hideHeaderUnderline actions="" className="w_full" type="rounded">
    <div className={pdsStyles.pds_box}>
      <span className={pdsStyles.txt}>
        <IcoPdf className={styles.ico_pds} /> 비즈니스 영어 단어&숙어집.pdf
        <IcoLock className={styles.ico_lock} />
      </span>
      <div className={pdsStyles.info}>
        <span className={pdsStyles.size}>200MB</span>
        <Button variant="line" size={isMobile ? 'ts' : 'lg'} className={pdsStyles.btn}>
          다운로드
        </Button>
      </div>
    </div>
  </Panel>
</div>
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
