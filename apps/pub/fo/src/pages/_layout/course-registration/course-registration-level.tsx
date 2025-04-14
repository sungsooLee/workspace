import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  ContentsRow,
  Input,
  PhoneNumber,
  OptionCard,
  DatePicker,
  useModal,
} from '@learnway/ui';
import { cn } from '@learnway/shared';
import { getRandomId } from '@learnway/shared';
import { IcoCaution } from '@learnway/icons';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';
import { isMobile } from 'react-device-detect';
import { EducationPlacePopup } from '../../../features/layout';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import definitionListStyles from '../course-introduction/definition-list.module.css';
import lectureStyles from '../course-introduction/lecture.module.css';
import styles from './course-registration-level.module.css';
export const Route = createFileRoute('/_layout/course-registration/course-registration-level')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();

  const gender = [
    { label: '상관없음', value: getRandomId() },
    { label: '남자', value: getRandomId() },
    { label: '여자', value: getRandomId() },
  ];
  const [date, setDate] = useState(new Date());
  const handleDate = (value: any) => {
    setDate(value);
  };

  const { alert: openAlert } = useModal();
  const alert = () => {
    openAlert({
      title: <>날짜를 선택해주세요</>,
      content: (
        <>
          사전 레벨테스트는 전화로 진행됩니다
          <br />
          전화통화 가능한 날짜를 선택해주세요
        </>
      ),
    });
  };

  return (
    <div className={`${styles.start} ${styles.course}`}>
      <h2>수강신청</h2>

      {/* 수간신청 정보 */}
      <div className={`${lectureStyles.start} ${lectureStyles.course_information}`}>
        <div className={lectureStyles.box}>
          <p className={lectureStyles.date}>
            <span>1차교육</span>
            <span>2026-01-01 ~ 2026-01-31 </span>
          </p>
          <strong className={lectureStyles.tit}>
            스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축
          </strong>
        </div>
        {isMobile ? (
          ''
        ) : (
          <div className={lectureStyles.box}>
            {/* definition list */}
            <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
              <dl>
                <dt>신청기간</dt>
                <dd>26-01-15 10:00 ~ 26-01-14 23:59</dd>
              </dl>
              <dl>
                <dt>수강인원</dt>
                <dd>
                  494 / 500명 (잔여석 <em>6</em>명)
                </dd>
              </dl>
              <dl>
                <dt>교육장소</dt>
                <dd>
                  마북캠퍼스 (경기도 용인시 기흥구 마북로240번길 17-4)
                  <Button
                    variant="gray2"
                    size="xs"
                    onClick={() =>
                      openModal({
                        width: 'md',
                        content: <EducationPlacePopup />,
                      })
                    }
                  >
                    약도보기
                  </Button>
                </dd>
              </dl>
            </div>
          </div>
        )}
      </div>

      {/* 입력정보 */}
      <div className={styles.input_wrap}>
        {/* 사전 레벨테스트 */}
        <div className={styles.input_area}>
          <div className={styles.tit_box}>
            <strong>사전 레벨테스트</strong>
          </div>
          <div className={styles.box}>
            {/* 영문성명 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name1" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>영문성명</span>
                </label>
                <div className={cn(formStyles.input_box, styles.input_box)}>
                  <div>
                    <Input
                      id="name1"
                      type="text"
                      value="text"
                      placeholder="Frist name"
                      className="lg"
                      error
                    />
                    {/* error message */}
                    <p className={cn(formStyles.guide_text, formStyles.error)}>
                      영문 이름을 입력해주세요
                    </p>
                  </div>
                  <div>
                    <Input
                      id="name2"
                      type="text"
                      value="text"
                      placeholder="Family name"
                      className="lg"
                    />
                    {/* error message */}
                    {/* <p className={cn(formStyles.guide_text, formStyles.error)}>영문 성을 입력해주세요</p> */}
                  </div>
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
                {/* error message */}
                {/* <p className={cn(formStyles.guide_text, formStyles.error)}>휴대폰 번호를 입력해주세요</p> */}
              </div>
            </ContentsRow>
            {/* 강사 선호 성별 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>강사 선호 성별</span>
                </div>
                <div className={formStyles.input_box}>
                  <OptionCard className={styles.option_card} cols={3} options={gender} />
                </div>
              </div>
            </ContentsRow>
            {/* 사전 레벨테스트 가능일 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>사전 레벨테스트 가능일</span>
                </div>
                <div className={formStyles.input_box}>
                  <DatePicker onChange={handleDate} value={date} size="lg" />
                </div>
              </div>
            </ContentsRow>
            {/* 퍼블수정 20250409 : 추가 s */}
            {/* 사전 레벨테스트 시간(2개 선택) */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>사전 레벨테스트 시간(2개 선택)</span>
                </div>
                <div className={formStyles.input_box}>
                  <div className={styles.input_date}>
                    <DatePicker displayType="time" onChange={handleDate} value={date} size="lg" />
                    <DatePicker displayType="time" onChange={handleDate} value={date} size="lg" />
                  </div>
                </div>
              </div>
            </ContentsRow>
            {/* 희망 교육 시간(2개 선택) */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>희망 교육 시간(2개 선택)</span>
                </div>
                <div className={formStyles.input_box}>
                  <div className={styles.input_date}>
                    <DatePicker displayType="time" onChange={handleDate} value={date} size="lg" />
                    <DatePicker displayType="time" onChange={handleDate} value={date} size="lg" />
                  </div>
                </div>
              </div>
            </ContentsRow>
            {/* 퍼블수정 20250409 : 추가 e */}
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
          <dd>강사배정은 상황에 따라 변동될 수 있습니다.</dd>
          <dd>동일과정을 연속 신청하실 경우 레벨테스트가 없습니다.</dd>
        </dl>
      </div>

      {/* button */}
      <BrowserView>
        <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl" className="min">
            취소
          </Button>
          <Button variant="primary" size="xl" onClick={() => alert()}>
            신청
          </Button>
        </div>
      </BrowserView>

      <MobileView>
        <MobileContainerFooter>
          <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" className="min">
              취소
            </Button>
            <Button variant="primary" size="xl" onClick={() => alert()}>
              신청
            </Button>
          </div>
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}
