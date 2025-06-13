import { useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Avatar, ContentsRow, DynamicFormField } from '@learnway/ui';
import { IcoImage01 } from '@learnway/icons';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import {
  // ChangeUserIdFormField,
  // ChangePhoneNumberFormField,
  // ChangePasswordFormField,
  // WithdrawMembershipButton,
  useFetchAuthUser,
  useUserDetail,
} from '@learnway/auth/entities';
import {
  ChangeUserIdFormField,
  ChangePhoneNumberFormField,
  ChangePasswordFormField,
  WithdrawMembershipButton,
} from '@learnway/auth/features';

import { MAIN_CONTAINERS } from '../../../../widgets/layout';
import { pageRouteConfig } from '../../../../features/auth';
import { AvataFallback } from '../../../../features/layout';

import { FormRow, NoticeBox } from '../../../../shared/ui';

import styles from '@learnway/styles/fo/pages/_layout/my-page/privacy/change-information.module.css';

import { useCurrentRoute } from '@learnway/hooks';
export const Route = createFileRoute('/_layout/my-page/privacy/')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: {
      confirmPassword: {
        format: 'string',
        required: true,
      },
    },
    meta: {
      title: 'LABEL.common.changeInformation',
      mobile: { showHeader: false, showFooter: false, showMainFooter: false },
      container: MAIN_CONTAINERS.MY_PAGE,
    },
  }),
});

function RouteComponent() {
  const { meta, state } = useCurrentRoute();

  console.log('meta', meta);
  console.log('state', state);

  const { t } = useTranslation();
  const { provider, onSubmit, onFormChange, control, getValues, setFormError, fetchData } =
    useDynamicForm(authFormConfig);

  const { data: authUser } = useFetchAuthUser();
  const { data: userDetail } = useUserDetail();

  console.log('userDetail :: ', userDetail);

  useEffect(() => {
    if (!authUser) {
      return;
    }

    fetchData({
      userIdEmail: authUser.email,
      nameEmployeeNumber: `${authUser.name} / ${authUser.employeeNumber}`,
      password: `********`,
      company: `/ ${authUser.companyCode}`, //회사명,사업자등록번호
      company1: ``, //부서명?
      company2: ``, //직무?
      company3: ``, //상위 결재자
      phoneNumber: authUser.phoneNumber, //phoneNumber nationCode
    });
  }, [authUser]);

  return (
    <div className={`${styles.start} ${styles.information_change}`}>
      <div className={styles.box}>
        <div className={styles.avata_img}>
          {/* 사진 */}
          <div className={styles.avata_box}>
            <Avatar
              imageUrl={authUser?.avataImage}
              className={styles.info_avata}
              fallback={<AvataFallback name={authUser?.name} />}
            />
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
          <ContentsRow>
            <FormRow provider={provider} name={'userIdEmail'} element={<ChangeUserIdFormField />} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'nameEmployeeNumber'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'password'} element={<ChangePasswordFormField />} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'company'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'company1'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'company2'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'company3'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'phoneNumber'}
              element={<ChangePhoneNumberFormField />}
            />
          </ContentsRow>
        </div>
      </div>

      <NoticeBox title={t('LABEL.common.caution')} className={styles.notice}>
        <dd>{t('LABEL.message.cautionChangeInformationHsw')}</dd>
        <dd>
          {t('LABEL.message.cautionChangeInformationDdms')}{' '}
          <Link to={'/'}>{t('LABEL.common.goToDdms')} &#62;</Link>
        </dd>
      </NoticeBox>

      <div className={styles.bullet_notice}>
        <dl>
          <dt>{t('LABEL.common.withdrawMembership')}</dt>
          <dd>{t('LABEL.message.cautionWithdrawMembership01')}</dd>
          <dd>{t('LABEL.message.cautionWithdrawMembership02')}</dd>
          <dd>
            {t('LABEL.message.cautionWithdrawMembership03')}
            <WithdrawMembershipButton />
          </dd>
        </dl>
      </div>
    </div>
  );
}

const authFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'userIdEmail',
      type: 'custom',
      value: '아이디(이메일)',
    },
    {
      name: 'nameEmployeeNumber',
      type: 'text',
      label: '성명 / 사번',
      value: 'PHONE',
      placeholder: '',
      description: '',
      disabled: true,
    },
    {
      name: 'password',
      type: 'custom',
      label: '비밀번호',
      value: '',
      disabled: true,
    },
    {
      name: 'company',
      type: 'text',
      label: '회사 / 사업자등록번호',
      value: '',
      disabled: true,
    },
    {
      name: 'company1',
      type: 'text',
      label: '부서',
      value: '',
      disabled: true,
    },
    {
      name: 'company2',
      type: 'text',
      label: '직무',
      value: '',
      disabled: true,
    },
    {
      name: 'company3',
      type: 'text',
      label: '상위 결재자',
      value: '',
      disabled: true,
    },
    {
      name: 'phoneNumber',
      type: 'custom',
      label: '휴대폰 번호',
      value: '',
      placeholder: '-없이 휴대폰 번호입력(0102345678)',
      fields: {
        nationCode: 'nationCode',
        number: 'phoneNumber',
      },
    },
    {
      name: 'nationCode',
      type: 'hidden',
      value: 'KR',
    },
  ],
  validator: {
    userId: {
      format: 'string',
      required: {
        fn: (data) => {
          console.log('userId', data);
          return data.includeUserId;
        },
      },
    },
    name: {
      format: 'string',
      required: true,
    },
    birthday: {
      format: 'number',
      required: true,
    },
    phoneNumber: {
      format: 'object',
      required: {
        fn: (data) => {
          return false;
        },
      },
    },
    email: {
      format: 'email',
      required: {
        fn: (data) => data.authToolType === 'EMAIL',
      },
    },
    verificationCode: {
      format: 'number',
      required: true,
    },
  },
};
