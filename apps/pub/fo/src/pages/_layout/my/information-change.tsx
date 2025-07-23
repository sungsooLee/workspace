import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { isMobile } from 'react-device-detect';
import { ContentsRow, Input, Button, useModal } from '@learnway/ui';
import { PasswordChangePopup, PhoneChangePopup } from '../../../features/layout';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import { IcoCaution } from '@learnway/icons';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
//import styles from './information-change.module.css';
import styles from '@learnway/styles/fo/pages/_layout/my-page/privacy/change-information.module.css';
import myPageContainerStyles from '@learnway/styles/fo/widgets/layout/ui/main/container/my-page-container.module.css';
import fallbackStyles from '../../../features/layout/ui/fallback.module.css';

export const Route = createFileRoute('/_layout/my/information-change')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();

  return (
    <div className={myPageContainerStyles.start}>
      <h2>개인정보 변경</h2>
      {/* 퍼블수정 20250718 전체 수정 */}
      <div className={`${styles.start} ${styles.information_change}`}>
        <div className={styles.box}>
          <div className={styles.information}>
            {/* 아이디(이메일) */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="id" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>아이디(이메일)</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="id" type="text" value="0000@000.co.kr" inputSize="lg" readOnly />
                </div>
              </div>
            </ContentsRow>

            {/* 비밀번호 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="password" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>비밀번호</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="password" type="password" value="12345" inputSize="lg" readOnly />
                  <Button
                    variant="gray"
                    size="lx"
                    onClick={() =>
                      openModal({
                        width: isMobile ? 'm_full' : 'sm',
                        content: <PasswordChangePopup />,
                      })
                    }
                  >
                    비밀번호 변경
                  </Button>
                </div>
              </div>
            </ContentsRow>

            {/* 이름 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="business" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>이름</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="business" type="text" value="현대리" inputSize="lg" readOnly />
                </div>
              </div>
            </ContentsRow>

            {/* 사번 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label className={formStyles.form_label}>
                  <span className={formStyles.form_text}>사번</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input type="text" value="657455" inputSize="lg" readOnly />
                </div>
              </div>
            </ContentsRow>

            {/* 휴대폰 번호 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="job" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>휴대폰 번호</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input type="text" value="010-3333-4444" inputSize="lg" readOnly />
                  <Button
                    variant="gray"
                    size="lx"
                    onClick={() =>
                      openModal({
                        width: isMobile ? 'm_full' : 'sm',
                        content: <PhoneChangePopup />,
                      })
                    }
                  >
                    휴대폰번호 변경
                  </Button>
                </div>
              </div>
            </ContentsRow>
          </div>

          <div className={styles.information}>
            <strong className={styles.title}>소속 정보</strong>

            {/* 회사 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label className={formStyles.form_label}>
                  <span className={formStyles.form_text}>회사</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input type="text" value="현대오토에버" inputSize="lg" readOnly />
                </div>
              </div>
            </ContentsRow>

            {/* 부서 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label className={formStyles.form_label}>
                  <span className={formStyles.form_text}>회사</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input type="text" value="뫄뫄본부 > 뫄뫄실 > 뫄뫄팀" inputSize="lg" readOnly />
                </div>
              </div>
            </ContentsRow>

            {/* 직무 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label className={formStyles.form_label}>
                  <span className={formStyles.form_text}>직무</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input type="text" value="abcde" inputSize="lg" readOnly />
                  <Input type="text" value="abcde" inputSize="lg" readOnly />
                </div>
              </div>
            </ContentsRow>
          </div>
        </div>

        {/* 안내사항 */}
        <div className={`${noticeBoxStyles.start} ${styles.notice}`}>
          <dl className={noticeBoxStyles.check_point}>
            <dt>
              <IcoCaution width={24} height={24} stroke="#4d525c" />
              안내사항
            </dt>
            <dd>개인정보 변경을 원하시면 HSW에서 진행해주세요. 변경된 정보를 다음날 적용됩니다.</dd>
          </dl>
        </div>

        {/* 안내사항 */}
        <div className={`${noticeBoxStyles.start} ${styles.notice}`}>
          <dl className={noticeBoxStyles.check_point}>
            <dt>
              <IcoCaution width={24} height={24} stroke="#4d525c" />
              안내사항
            </dt>
            <dd>
              개인정보 변경을 원하시면 DDMS에서 진행해주세요.
              <Link to={'/'}>DDMS 바로 가기</Link>
            </dd>
          </dl>
        </div>

        {/* 회원탈퇴 */}
        <div className={styles.btn_box}>
          <Button variant="primary" size="xl2">
            회원탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
}
