import { IcoAvatar02, IcoCalendar01, IcoCaution, IcoLocation, IcoTime } from '@learnway/icons';
import { cn } from '@learnway/shared';
import {
  Button,
  ContentsRow,
  DatePicker,
  Input,
  OptionCard,
  OptionCardItem,
  PhoneNumber,
  useModal,
} from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import { EducationPlacePopup } from '../../../features/layout';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import educationStyles from '../../../features/layout/ui/education.module.css';
import styles from './course-registration-level.module.css';
export const Route = createFileRoute('/_layout/course-registration/course-registration-level')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();

  const gender = [
    { label: '상관없음', value: 'value1' },
    { label: '남자', value: 'value2' },
    { label: '여자', value: 'value3' },
  ];
  const [date, setDate] = useState(new Date());
  const handleDate = (value: any) => {
    setDate(value);
  };

  const [optionCardValue, setOptionCardValue] = useState<string[]>();

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
      <div className={`${educationStyles.start} ${educationStyles.education} ${styles.education}`}>
        <div className={educationStyles.info_box}>
          <div className={educationStyles.txt_box}>
            <div className={educationStyles.box}>
              <span className={educationStyles.date}>2026-01-01 ~ 2026-01-31</span>
            </div>
            <div className={educationStyles.box}>
              <p>스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축</p>
            </div>
          </div>
        </div>
        {isMobile || (
          <div className={educationStyles.info_box}>
            <div className={educationStyles.list}>
              <ul>
                <li>
                  <IcoCalendar01 width={20} height={20} stroke="#4d525c" />
                  <span>26-01-15 10:00 ~ 26-01-14 23:59</span>
                </li>
                <li>
                  <IcoAvatar02 width={20} height={20} viewBox="0 0 24 24" fill="#4d525c" />
                  <span>
                    493 / 500 (잔여 <em>7</em>)
                  </span>
                </li>
                {/* 시간이 없을 시 클래스 educationStyles.full 추가 */}
                <li>
                  <IcoLocation width={20} height={20} stroke="#4d525c" />
                  <span>온라인 비대면</span>
                  <Button
                    onClick={() =>
                      openModal({
                        width: isMobile ? 'm_full' : 'md',
                        content: <EducationPlacePopup />,
                      })
                    }
                  >
                    약도보기
                  </Button>
                </li>
                <li>
                  <IcoTime width={20} height={20} fill="#4d525c" />
                  <span>2시간 33분</span>
                </li>
              </ul>
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
                      inputSize={'lg'}
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
                      inputSize={'lg'}
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
                  <OptionCard
                    value={optionCardValue}
                    className={styles.option_card}
                    cols={3}
                    options={gender}
                    onOptionSelect={(option: OptionCardItem) => setOptionCardValue(option.value)}
                  />
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
            {/* 사전 레벨테스트 가능 시간(2개 선택) */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>사전 레벨테스트 가능 시간(2개 선택)</span>
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
            <IcoCaution />
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
