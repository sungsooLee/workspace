import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  ContentsRow,
  Input,
  PhoneNumber,
  OptionCard,
  OptionCardItem,
  DatePicker,
  useModal,
} from '@learnway/ui';
import { cn } from '@learnway/shared';
import { IcoCaution } from '@learnway/icons';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';
import { isMobile } from 'react-device-detect';
import {
  AddressPopup,
  EducationPlacePopup,
  AddressConfirmationPopup,
  AcceptingPopup,
} from '../../../features/layout';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';
import definitionListStyles from '../course-introduction/definition-list.module.css';
import lectureStyles from '../course-introduction/lecture.module.css';
import styles from './course-registration-all.module.css';
export const Route = createFileRoute('/_layout/course-registration/course-registration-all')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const { confirm: openConfirm } = useModal();
  const { alert: openAlert } = useModal();

  const gender = [
    { label: '상관없음', value: 'value1' },
    { label: '남자', value: 'value2' },
    { label: '여자', value: 'value3' },
  ];

  const lodgment = [
    { label: '네, 신청합니다', value: 'value1' },
    { label: '아니오, 신청하지 않습니다', value: 'value2' },
  ];

  const car = [
    { label: '차량을 제공하겠습니다', value: 'value1' },
    { label: '카풀을 신청합니다', value: 'value2' },
    { label: '카풀을 신청하지 않겠습니다', value: 'value3' },
  ];

  const [date, setDate] = useState(new Date());
  const handleDate = (value: any) => {
    setDate(value);
  };

  const [optionCardValue, setOptionCardValue] = useState<string[]>();
  const [optionCardValue2, setOptionCardValue2] = useState<string[]>();
  const [optionCardValue3, setOptionCardValue3] = useState<string[]>();

  // 상세주소 입력 전 [신청] 클릭 시
  const AddressAlert = () => {
    openAlert({
      title: <>상세 주소를 입력해주세요</>,
      content: (
        <>
          교재 배송이 원할하게 될 수 있도록
          <br />
          상세주소를 정확하게 입력해주세요
        </>
      ),
    });
  };

  // 주소 입력 전 [신청] 클릭 시
  const AddressAlert2 = () => {
    openAlert({
      title: <>배송지 주소를 입력해주세요</>,
      content: (
        <>
          교재 배송이 원할하게 될 수 있도록
          <br />
          상세주소를 정확하게 입력해주세요
        </>
      ),
    });
  };

  // [취소] 클릭 시
  const CourseCancelConfirm = () => {
    openConfirm({
      title: <>수강 신청을 취소하시겠습니까?</>,
      content: (
        <>
          지금 취소하실 경우
          <br />
          입력한 내용은 저장되지 않습니다
        </>
      ),
      okButtonLabel: '취소하기',
      cancelButtonLabel: '아니요',
    });
  };

  return (
    <div className={`${styles.start} ${styles.course}`}>
      <h2>수강신청</h2>

      {/* 수간신청 정보 */}
      <div className={`${lectureStyles.start} ${lectureStyles.course_information}`}>
        <div className={lectureStyles.box}>
          <p className={lectureStyles.date}>
            <span>2026-01-01 ~ 2026-01-31</span>
            <span>1차교육</span>
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
                    {/* pc */}
                    <BrowserView>
                      <div className={dynamicFormStyles.flex_plus}>
                        <Input id="addr" type="text" placeholder="주소를 입력해주세요" value="" />
                        <Button
                          variant="gray"
                          size="lg"
                          onClick={() =>
                            openModal({
                              width: 's',
                              content: <AddressPopup />,
                            })
                          }
                        >
                          주소 찾기
                        </Button>
                      </div>
                      <Input
                        id="addr2"
                        type="text"
                        placeholder="상세주소를 입력해주세요"
                        value=""
                      />
                      <Input
                        id="addr3"
                        type="text"
                        placeholder="상세주소를 입력해주세요"
                        value=""
                      />
                    </BrowserView>
                    {/* mo */}
                    <MobileView>
                      <Input id="addr4" type="text" placeholder="주소를 입력해주세요" value="" />
                      <Input id="addr5" type="text" placeholder="주소를 입력해주세요" value="" />
                      <Button
                        variant="gray"
                        size="lg"
                        onClick={() =>
                          openModal({
                            width: 'm_full',
                            content: <AddressPopup />,
                          })
                        }
                      >
                        주소 찾기
                      </Button>
                    </MobileView>
                  </div>
                </div>
              </div>
            </ContentsRow>
          </div>
        </div>

        {/* 추가 입력 */}
        <div className={styles.input_area}>
          <div className={styles.tit_box}>
            <strong>추가 입력</strong>
          </div>
          <div className={styles.box}>
            {/* 숙박 신청 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>숙박 신청</span>
                </div>
                <div className={formStyles.input_box}>
                  <OptionCard
                    value={optionCardValue2}
                    className={styles.option_card}
                    cols={isMobile ? 1 : 2}
                    options={lodgment}
                    onOptionSelect={(option: OptionCardItem) => setOptionCardValue2(option.value)}
                  />
                </div>
              </div>
            </ContentsRow>
            {/* 카풀 신청 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>카풀 신청</span>
                </div>
                <div className={formStyles.input_box}>
                  <OptionCard
                    value={optionCardValue3}
                    className={styles.option_card}
                    cols={isMobile ? 1 : 3}
                    options={car}
                    onOptionSelect={(option: OptionCardItem) => setOptionCardValue3(option.value)}
                  />
                </div>
              </div>
            </ContentsRow>
          </div>
        </div>

        {/* 결재자 확인 */}
        <div className={styles.input_area}>
          <div className={styles.tit_box}>
            <strong>결재자 확인</strong>
          </div>
          <div className={styles.box}>
            {/* 조직장 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name3" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>조직장</span>
                </label>
                <div className={cn(formStyles.input_box, styles.input_box)}>
                  <Input
                    id="name3"
                    type="text"
                    value="전기차구동설계팀 김원 책임연구원"
                    className="lg"
                    readOnly
                  />
                  <Button variant="gray" size="lg">
                    결재자 변경
                  </Button>
                </div>
              </div>
            </ContentsRow>
            {/* 교육 담당자 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name4" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>교육 담당자</span>
                </label>
                <div className={cn(formStyles.input_box, styles.input_box)}>
                  <Input id="name4" type="text" value="오창영" className="lg" readOnly />
                </div>
              </div>
            </ContentsRow>
            {/* 교육팀장 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name5" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>교육팀장</span>
                </label>
                <div className={cn(formStyles.input_box, styles.input_box)}>
                  <Input
                    id="name5"
                    type="text"
                    value="시트연구기획팀 박희찬 책임연구원"
                    className="lg"
                    readOnly
                  />
                  <Button variant="gray" size="lg">
                    결재자 변경
                  </Button>
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
          <dd>강사배정은 상황에 따라 변동될 수 있습니다.</dd>
          <dd>동일과정을 연속 신청하실 경우 레벨테스트가 없습니다.</dd>
          <dd>
            교재 배송은 강의시작 1주일 전까지 수강 신청 내역에서 변경 할 수 있습니다.
            <Button className={noticeBoxStyles.link}>수강 신청 내역</Button>
          </dd>
          <dd>강의 시작 전 주소지가 변경 된 경우, 교육담당자에게 문의해주세요.</dd>
          <dd>결재자가 부재이거나, 없는경우 결재자변경을 통해 결재자를 지정해주세요.</dd>
        </dl>
      </div>

      {/* button */}
      <BrowserView>
        <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl" className="min" onClick={() => CourseCancelConfirm()}>
            취소
          </Button>
          <Button
            variant="primary"
            size="xl"
            onClick={() =>
              openModal({
                width: 's',
                content: <AddressConfirmationPopup />,
                hideCloseButton: true,
              })
            }
          >
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
            <Button
              variant="primary"
              size="xl"
              onClick={() =>
                openModal({
                  width: 's',
                  content: <AddressConfirmationPopup />,
                  hideCloseButton: true,
                })
              }
            >
              신청
            </Button>
          </div>
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}
