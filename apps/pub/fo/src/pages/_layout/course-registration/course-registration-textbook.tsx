import { createFileRoute } from '@tanstack/react-router';
import { Button, ContentsRow, Input, PhoneNumber, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { isMobile } from 'react-device-detect';
import { IcoCaution } from '@learnway/icons';
import { AddressPopup } from '../../../features/layout';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';
import styles from '@learnway/styles/fo/pages/_layout/course-registration/course-registration-textbook.module.css';
export const Route = createFileRoute('/_layout/course-registration/course-registration-textbook')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();

  return (
    <div className={`${styles.start} ${styles.course}`}>
      <h2>수강신청</h2>

      {/* 수간신청 정보 */}
      <div className={styles.course_information}>
        <div className={styles.box}>
          <p className={styles.date}>
            <span>1차교육</span>
            <span>2026-01-01 ~ 2026-01-31 </span>
          </p>
          <strong className={styles.tit}>
            스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축
          </strong>
        </div>
        <div className={styles.box}>
          <dl className={styles.terminology}>
            <dt>신청기간</dt>
            <dd>26-01-15 10:00 ~ 26-01-14 23:59</dd>
          </dl>
          <dl className={styles.terminology}>
            <dt>수강인원</dt>
            <dd>
              494 / 500명 (잔여석 <em>6</em>명)
            </dd>
          </dl>
          <dl className={styles.terminology}>
            <dt>교육장소</dt>
            <dd>
              마북캠퍼스 (경기도 용인시 기흥구 마북로240번길 17-4)
              <Button variant="gray2" size="xs">
                약도보기
              </Button>
            </dd>
          </dl>
        </div>
      </div>

      {/* 입력정보 */}
      <div className={styles.input_wrap}>
        {/* 교재 배송지 */}
        <div className={styles.input_area}>
          <div className={styles.tit_box}>
            <strong>교재 배송지</strong>
          </div>
          <div className={styles.box}>
            {/* 이름 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name2" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>이름</span>
                </label>
                <div className={cn(formStyles.input_box, styles.input_box)}>
                  <Input
                    id="name2"
                    type="text"
                    value="text"
                    placeholder="이름을 입력해주세요"
                    className="lg"
                    readOnly
                  />
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
                </div>
              </div>
            </ContentsRow>
            {/* 주소 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="addr" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>주소</span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={`${dynamicFormStyles.item_col_full} ${styles.item_col_full}`}>
                    <div className={dynamicFormStyles.flex_plus}>
                      <Input id="addr" type="text" placeholder="주소를 입력해주세요" value="" />
                      <Button
                        variant="gray"
                        size="lg"
                        onClick={() =>
                          openModal({
                            width: isMobile ? 'm_full' : 's',
                            content: <AddressPopup />,
                          })
                        }>
                        주소 찾기
                      </Button>
                    </div>
                    <Input id="addr2" type="text" placeholder="상세주소를 입력해주세요" value="" />
                    <Input id="addr3" type="text" placeholder="상세주소를 입력해주세요" value="" />
                  </div>
                </div>
              </div>
            </ContentsRow>
          </div>
        </div>
      </div>

      {/* 안내사항 */}
      <div className={`${noticeBoxStyles.start} ${styles.notice}`}>
        <dl className={noticeBoxStyles.check_point}>
          <dt>
            <IcoCaution width={16} height={16} stroke="#6F798B" />
            안내사항
          </dt>
          <dd>
            교재 배송은 강의시작 1주일 전까지 수강 신청 내역에서 변경 할 수 있습니다.
            <Button>수강 신청 내역</Button>
          </dd>
          <dd>강의 시작 전 주소지가 변경 된 경우, 교육담당자에게 문의해주세요.</dd>
        </dl>
      </div>

      {/* button */}
      <div className={cn(authFormStyles.btn_wrap, 'auth--btn_wrap')}>
        <Button variant="gray" size="xl" className="min">
          취소
        </Button>
        <Button variant="primary" size="xl">
          신청
        </Button>
      </div>
    </div>
  );
}
