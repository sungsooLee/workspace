import { createFileRoute } from '@tanstack/react-router';
import { Avatar, ContentsRow, Input, Button, Textarea, PhoneNumber } from '@learnway/ui';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import { IcoCaution } from '@learnway/icons';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/pages/_layout/my/information-change.module.css';

export const Route = createFileRoute('/_layout/my/information-change')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.information_change}`}>
      <h2>개인정보변경</h2>
      <div className={styles.box}>
        <div className={styles.avata_img}>
          <div className={styles.avata_box}>
            <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
          </div>
          {/* 첨부 보류 */}
          <div className={styles.change}></div>
        </div>

        <div className={styles.information}>
          {/* 아이디(이메일) */}
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="id" className={formStyles.form_label}>
                <span className={formStyles.form_text}>아이디(이메일)</span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="id" type="text" value="0000@000.co.kr" readOnly />
                <Button variant="gray" size="lg">
                  아이디 변경
                </Button>
              </div>
            </div>
          </ContentsRow>

          {/* 성명 / 사번 */}
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name" className={formStyles.form_label}>
                <span className={formStyles.form_text}>성명 / 사번</span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="name" type="text" value="홍길동 / 94802750" readOnly />
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
                <Input id="password" type="password" value="12345" readOnly />
                <Button variant="gray" size="lg">
                  비밀번호 변경
                </Button>
              </div>
            </div>
          </ContentsRow>

          {/* 회사 / 사업자등록번호 */}
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="business" className={formStyles.form_label}>
                <span className={formStyles.form_text}>회사 / 사업자등록번호</span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="business" type="text" value="오토애버 / 123-45-67890" readOnly />
              </div>
            </div>
          </ContentsRow>

          {/* 부서 */}
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="department" className={formStyles.form_label}>
                <span className={formStyles.form_text}>부서</span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="department" type="text" value="인재개발전략팀" readOnly />
              </div>
            </div>
          </ContentsRow>

          {/* 직무 */}
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="job" className={formStyles.form_label}>
                <span className={formStyles.form_text}>직무</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id="job"
                  rows={3}
                  cols={33}
                  value="인재개발전략팀<br/>aa"
                  resize="none"
                  size="sm"
                  readOnly
                />
              </div>
            </div>
          </ContentsRow>

          {/* 상위결재자 */}
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>상위결재자</span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="name2" type="text" value="김길동" readOnly />
              </div>
            </div>
          </ContentsRow>

          {/* 휴대폰 번호 */}
          <ContentsRow>
            <div className={formStyles.form_item}>
              <div className={formStyles.form_label}>
                <span className={formStyles.form_text}>휴대폰 번호</span>
              </div>
              <div className={formStyles.input_box}>
                <PhoneNumber
                  options={[
                    { value: 'type1', label: '010' },
                    { value: 'type2', label: '011' },
                  ]}
                  size="lg"
                  placeholder="-없이 휴대폰 번호입력(01023459876)"
                />
                <Button variant="gray" size="lg">
                  휴대폰 번호 변경
                </Button>
              </div>
            </div>
          </ContentsRow>
        </div>
      </div>

      {/* 안내사항 */}
      <div className={`${noticeBoxStyles.start} ${styles.notice}`}>
        <dl className={noticeBoxStyles.check_point}>
          <dt>
            <IcoCaution width={16} height={16} stroke="#6F798B" />
            안내사항
          </dt>
          <dd>개인정보가 다를 경우 HSW에서 변경해주세요. 변경된 정보는 다음날 적용됩니다.</dd>
        </dl>
      </div>

      {/* 안내사항 */}
      <div className={`${noticeBoxStyles.start} ${styles.notice}`}>
        <dl className={noticeBoxStyles.check_point}>
          <dt>
            <IcoCaution width={16} height={16} stroke="#6F798B" />
            안내사항
          </dt>
          <dd>개인정보가 다를 경우 DDMS에서 변경해주세요.</dd>
        </dl>
      </div>
    </div>
  );
}
