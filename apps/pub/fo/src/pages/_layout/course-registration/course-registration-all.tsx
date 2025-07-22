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
import { IcoCaution, IcoLocation, IcoCalendar01, IcoAvatar02, IcoTime } from '@learnway/icons';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';
import { isMobile } from 'react-device-detect';
import {
  AddressPopup, // 주소찾기
  EducationPlacePopup, // 약도보기
  AddressConfirmationPopup, // 배송지 확인
  AcceptingPopup, // 접수중
} from '../../../features/layout';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';
import educationStyles from '../../../features/layout/ui/education.module.css';
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
      title: '상세 주소를 입력해주세요',
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
      title: '배송지 주소를 입력해주세요',
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
      title: '수강 신청을 취소하시겠습니까?',
      content: (
        <>
          지금 취소하실 경우
          <br />
          입력한 내용은 저장되지 않습니다
        </>
      ),
      okButtonLabel: '확인',
      cancelButtonLabel: '아니요',
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
                    <Input id="name1" type="text" value="Hun" inputSize={'lg'} error />
                    {/* error message */}
                    <p className={cn(formStyles.guide_text, formStyles.error)}>
                      영문 이름을 입력해주세요
                    </p>
                  </div>
                  <div>
                    <Input id="name2" type="text" value="Kim" inputSize={'lg'} />
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
                    inputSize={'lg'}
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
                        <Input
                          id="addr"
                          type="text"
                          placeholder="주소를 입력해주세요"
                          inputSize={'lg'}
                          value=""
                        />
                        <Button
                          variant="gray"
                          size="lx"
                          onClick={() =>
                            openModal({
                              width: 'sm',
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
                        inputSize={'lg'}
                        value=""
                      />
                      <Input
                        id="addr3"
                        type="text"
                        placeholder="상세주소를 입력해주세요"
                        inputSize={'lg'}
                        value=""
                      />
                    </BrowserView>
                    {/* mo */}
                    <MobileView>
                      <Input
                        id="addr4"
                        type="text"
                        placeholder="주소를 입력해주세요"
                        inputSize={'lg'}
                        value=""
                      />
                      <Input
                        id="addr5"
                        type="text"
                        placeholder="주소를 입력해주세요"
                        inputSize={'lg'}
                        value=""
                      />
                      <Button
                        variant="gray"
                        size="lx"
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
                    inputSize={'lg'}
                    readOnly
                  />
                  <Button variant="gray" size="lx">
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
                  <Input id="name4" type="text" value="오창영" inputSize={'lg'} readOnly />
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
            <IcoCaution width={24} height={24} stroke="#4d525c" />
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
                content: <AcceptingPopup />,
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
            {/* 퍼블수정 20250722 주소확인 popup mobile에서 m_bottom_sheet, pc에서 sm 사이즈로 수정 */}
            <Button
              variant="primary"
              size="xl"
              onClick={() =>
                openModal({
                  width: 'm_bottom_sheet',
                  content: <AddressConfirmationPopup />,
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
