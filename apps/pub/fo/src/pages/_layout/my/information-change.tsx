import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { isMobile } from 'react-device-detect';
import { Avatar, ContentsRow, Input, Button, Textarea, PhoneNumber, useModal } from '@learnway/ui';
import { PasswordChangePopup, IdChangePopup, PhoneChangePopup } from '../../../features/layout';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import { IcoCaution, IcoImage01, IcoFormRequired } from '@learnway/icons';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './information-change.module.css';
import myContainerStyles from './my-container.module.css';

export const Route = createFileRoute('/_layout/my/information-change')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();

  return (
    <div className={myContainerStyles.start}>
      <h2 className={myContainerStyles.start}>개인정보변경</h2>
      <div className={`${styles.start} ${styles.information_change}`}>
        <div className={styles.box}>
          <div className={styles.avata_img}>
            {/* 사진 */}
            <div className={styles.avata_box}>
              <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
              <div className={styles.file}>
                <label htmlFor="file">
                  <IcoImage01 width={24} height={24} stroke="#06226a" fill="none"></IcoImage01>
                </label>
                <input type="file" id="file" />
              </div>
            </div>
            {/* 이름 성 */}
            {/* <div className={styles.avata_box}> */}
            {/* <span className={styles.info_avata}>김</span> */}
            {/* </div> */}
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
                  <Button
                    variant="gray"
                    size="lg"
                    onClick={() =>
                      openModal({
                        width: isMobile ? 'm_full' : 'sm',
                        content: <IdChangePopup />,
                      })
                    }
                  >
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
                  <Button
                    variant="gray"
                    size="lg"
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
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={10} height={10} />
                  </span>
                </div>
                <div className={`${formStyles.input_box} ${styles.phone_box}`}>
                  <PhoneNumber
                    options={[
                      { value: 'type1', label: '010' },
                      { value: 'type2', label: '011' },
                    ]}
                    size="lg"
                    placeholder="-없이 휴대폰 번호입력(01023459876)"
                  />
                  <Button
                    variant="gray"
                    size="lg"
                    onClick={() =>
                      openModal({
                        width: isMobile ? 'm_full' : 'sm',
                        content: <PhoneChangePopup />,
                      })
                    }
                  >
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
            <dd>
              개인정보가 다를 경우 DDMS에서 변경해주세요.
              <Link to={''}>DDMD 바로 가기 &#62;</Link>
            </dd>
          </dl>
        </div>

        {/* 회원탈퇴 */}
        <div className={styles.bullet_notice}>
          <dl>
            <dt>회원탈퇴</dt>
            <dd>사용하고 계신 아이디는 탈퇴할 경우 재사용 및 복구가 불가능합니다.</dd>
            <dd>탈퇴 후에도 게시판형 서비스에 등록한 게시물은 그대로 남아 있습니다.</dd>
            <dd>
              삭제를 원하는 게시글이 있다면 반드시 탈퇴 전 비공개 처리하거나 삭제하시기 바랍니다.
              <Button variant="gray" size="sm">
                회원탈퇴
              </Button>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
