import { createFileRoute } from '@tanstack/react-router';
import { Button, ContentsRow, Input, PhoneNumber, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { isMobile } from 'react-device-detect';
import { IcoCaution, IcoLocation, IcoCalendar01, IcoAvatar02, IcoTime } from '@learnway/icons';
import { AddressPopup, EducationPlacePopup } from '../../../features/layout';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';
import educationStyles from '../../../features/layout/ui/education.module.css';
import styles from './course-registration-textbook.module.css';
export const Route = createFileRoute('/_layout/course-registration/course-registration-textbook')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();

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
                        <Input
                          id="addr"
                          type="text"
                          placeholder="주소를 입력해주세요"
                          className="lg"
                          value=""
                        />
                        <Button
                          variant="gray"
                          size="lx"
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
                        className="lg"
                        value=""
                      />
                      <Input
                        id="addr3"
                        type="text"
                        placeholder="상세주소를 입력해주세요"
                        className="lg"
                        value=""
                      />
                    </BrowserView>
                    {/* mo */}
                    <MobileView>
                      <Input
                        id="addr4"
                        type="text"
                        placeholder="주소를 입력해주세요"
                        className="lg"
                        value=""
                      />
                      <Input
                        id="addr5"
                        type="text"
                        placeholder="주소를 입력해주세요"
                        className="lg"
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
      </div>

      {/* 안내사항 */}
      <div className={`${noticeBoxStyles.start} ${styles.notice}`}>
        <dl className={noticeBoxStyles.check_point}>
          <dt>
            <IcoCaution width={24} height={24} stroke="#4d525c" />
            안내사항
          </dt>
          <dd>
            교재 배송은 강의시작 1주일 전까지 수강 신청 내역에서 변경 할 수 있습니다.
            <Button className={noticeBoxStyles.link}>수강 신청 내역</Button>
          </dd>
          <dd>강의 시작 전 주소지가 변경 된 경우, 교육담당자에게 문의해주세요.</dd>
        </dl>
      </div>

      {/* button */}
      <BrowserView>
        <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl" className="min">
            취소
          </Button>
          <Button variant="primary" size="xl">
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
            <Button variant="primary" size="xl">
              신청
            </Button>
          </div>
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}
