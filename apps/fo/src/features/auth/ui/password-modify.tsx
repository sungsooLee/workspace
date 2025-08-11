import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

// import { GoogleCertGuidePopup } from '../../features/auth';
// import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';
import {
  useFetchAuthUser,
  useLogoutUser,
  useUpdatePassword,
  useUpdatePasswordExpireDate,
} from '@learnway/auth/entities';
import { MobileContainerFooter } from '@learnway/auth/shared';
import { useDynamicForm2 } from '@learnway/hooks';
import { IcoCaution } from '@learnway/icons';
import { cn, DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import { FormRow2 } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';

import styles from '@learnway/styles/fo/pages/_auth/change-password.module.css';
import hightlightMessageBoxStyles from '@learnway/styles/fo/shared/ui/highlight-message-box/highlight-message-box.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';

/**
 * @description 패스워드 변경, (임시패스워드, 180일 경과)
 *  PC : NLP_FO_LOG_2010, NLP_FO_LOG_2020
 *  MO : NLP_FO_LOG_MR_2010, NLP_FO_LOG_MR_2020
 */
function PasswordModifyComponent() {
  const { t } = useTranslation();

  const { data: authUser } = useFetchAuthUser();
  const { logout } = useLogoutUser();

  const { alert } = useModal();
  const { update } = useUpdatePassword();
  const { update: updateExpireDate } = useUpdatePasswordExpireDate();

  const { provider, onSubmit, setFormError } = useDynamicForm2();

  const handleCancel = () => {
    logout();
  };

  const handleSuccess = async () => {
    await alert({
      title: t('LABEL.messages.changePasswordSuccess'),
      content: t('LABEL.messages.changePasswordSuccessGuide'),
    });
    logout();
  };

  const handleError = async (error: any) => {
    if (error && error.code === 'B004') {
      setFormError('oldPassword', t('LABEL.form.validation.password.00'));
    }
  };

  const handleOnSubmit = async (data: any) => {
    if (!authUser?.email) return;

    console.log('@@@ data', data);
    update(
      {
        username: authUser?.email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    );
  };

  return (
    <form className="form_row" onSubmit={onSubmit(handleOnSubmit)}>
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.password_modify}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.success_info}>
            {/* 퍼블수정 20250312 : 모듈화로 인한 className변경 */}
            <div className={`${hightlightMessageBoxStyles.start} ${styles.noti_box}`}>
              {t('마지막 변경일 ')}
              {` : `}
              <strong>
                {formatDate(
                  authUser?.passwordChangeDate as string,
                  DATE_TIME_FORMAT.DATETIME_WEEK_SEC,
                )}
              </strong>
            </div>
          </div>
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'oldPassword'}
                label={t('현재 비밀번호')}
                validation={{ required: true, format: 'password' }}
                element={<Input placeholder={t('비밀번호')} type="password" />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'newPassword'}
                label={t('새로운 비밀번호')}
                validation={{ required: true, format: 'password' }}
                element={
                  <Input
                    placeholder={t('비밀번호(영문자, 숫자, 특수문자 3가지 조합 8자리 이상)')}
                    type="password"
                  />
                }
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'newPasswordConfirm'}
                label={t('새로운 비밀번호 확인')}
                validation={{
                  required: true,
                  format: 'password',
                  conditions: [
                    {
                      fn: (values: Record<string, any>) =>
                        values.newPassword !== values.newPasswordConfirm,
                      message: t('LABEL.messages.validationConfirmPassword'),
                      path: 'newPasswordConfirm',
                    },
                  ],
                }}
                element={<Input placeholder={t('새로운 비밀번호 재입력')} type="password" />}
              />
            </ContentsRow>
          </div>

          {/* TODO 1개월 후 변경 기획 제외됨 */}
          {/* <div className={styles.noti_info_txt}>
            <Button className={styles.btn_txt}>{t('1개월 후 변경')}</Button>
          </div> */}

          <div
            className={`${noticeBoxStyles.start} ${noticeBoxStyles.signup_noti} ${styles.signup_noti}`}
          >
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution />
                {t('유의사항')}
              </dt>
              <dd>
                {t(
                  '영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 8-20자리로 입력해 주세요.',
                )}
              </dd>
              <dd>{t('직전에 사용한 비밀번호는 사용하실 수 없습니다.')}</dd>

              <dd>{t('아이디와 동일한 비밀번호는 사용하실 수 없습니다.')}</dd>
              <dd>
                {t(
                  '생년월일, 전화번호와 동일하거나 일부를 포함한 비밀번호는 사용하실 수 없습니다.',
                )}
              </dd>
              <dd>
                {t(
                  '3글자 이상의 동일한 숫자/문자 또는 연속된 숫자/문자, 키보드 상 연속된 배열의 문자는 입력하실 수 없습니다.',
                )}
              </dd>
              {/* TODO OTP 안내 추후 */}
              {/* <dd>
                법인명의 휴대전화(법인폰)는 통신사에서 본인인증 서비스 신청 후 휴대폰 인증을 하실 수
                있습니다.
                <Button
                  className={`${googleOtpGuideButtonStyles.start} ${noticeBoxStyles.link}`}
                  onClick={() =>
                    openModal({
                      width: 'sm',
                      content: <GoogleCertGuidePopup />,
                    })
                  }
                >
                  구글 OTP 인증 가이드
                </Button>
              </dd> */}
            </dl>
          </div>

          {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
          <BrowserView>
            <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
              <Button variant="gray" size="xl" onClick={handleCancel}>
                {t('취소')}
              </Button>
              <Button variant="primary" size="xl" type="submit">
                {t('확인')}
              </Button>
            </div>
          </BrowserView>

          <MobileView>
            <MobileContainerFooter>
              <Button variant="primary" size="xl" type="submit">
                {t('확인')}
              </Button>
            </MobileContainerFooter>
          </MobileView>
        </div>
      </div>
    </form>
  );
}

export const PasswordModify = PasswordModifyComponent;
