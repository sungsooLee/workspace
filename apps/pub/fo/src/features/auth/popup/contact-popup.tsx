import { memo } from 'react';
import { cn } from '@learnway/shared';
import styles from './contact-popup.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css'; // 폼모듈
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css'; // 유의사항
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Button,
  useModal,
  ContentsRow,
  Input,
  Select,
  Textarea,
  UppyUpload,
} from '@learnway/ui';
import { IcoFormRequired, IcoCaution } from '@learnway/icons';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

const ContactPopupCompoment = () => {
  const { close: closeModal } = useModal();
  return (
    <form className="form_row">
      <ModalContainer>
        <ModalTitle>{'문의하기'}</ModalTitle>
        <ModalBody>
          <div className={`${styles.start} ${styles.contact_popup}`}>
            <div className={cn(styles.auth_form, 'no_line', 'col')}>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>문의유형</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Select
                      size="lg"
                      options={[{ value: 'type1', label: '선택' }]}
                      className={formStyles.select_option}
                    />
                  </div>
                </div>
              </ContentsRow>

              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>이름</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input id="name" type="text" placeholder="이름(김현대)" value="" />
                  </div>
                </div>
              </ContentsRow>

              {/* 이메일 인증일때 */}
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-1-6" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>이메일</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input id="name-1-6" type="text" placeholder="생년월일(19991229)" />
                  </div>
                </div>
              </ContentsRow>

              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>제목</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input
                      id="name"
                      type="text"
                      placeholder="제목을 입력하세요.(최대 50자)"
                      value=""
                    />
                  </div>
                </div>
              </ContentsRow>

              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>내용</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Textarea
                      id="name-1-4"
                      rows={5}
                      cols={33}
                      resize="none"
                      placeholder="한글,영문,숫자 포함 2500자 이하"
                      maxLength={2500}
                      className={formStyles.textarea}
                    />
                  </div>
                </div>
              </ContentsRow>

              <UppyUpload />
            </div>

            {/* 유의사항 모듈 */}
            <div className={`${noticeBoxStyles.start} ${styles.signup_noti}`}>
              <dl className={noticeBoxStyles.check_point}>
                <dt>
                  <IcoCaution width={16} height={16} stroke="#6F798B" />
                  유의사항
                </dt>
                <dd>
                  문의하신 내용에 대한 답변이 등록될 경우 입력하신 이메일로 답변이 전송됩니다.
                </dd>
                <dd>
                  연락 받으실 이메일 정보가 잘못 입력하실 경우 문의내용에 대한 안내를 받으실 수
                  없으니 정확안 정보를 입력해 주세요.
                </dd>
                <dd>상문담의가 급증 시 답변처리가 다소 지연될 수 있으니 이 점 양해부탁드립니다.</dd>
              </dl>
            </div>
            {/* 유의사항 모듈 */}
          </div>
        </ModalBody>

        <ModalFooter>
          {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
          <BrowserView>
            <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
              <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
              <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
            </div>
          </BrowserView>

          <MobileView>
            <MobileContainerFooter>
              <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
            </MobileContainerFooter>
          </MobileView>
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const ContactPopup = memo(ContactPopupCompoment);
