import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Avatar, ContentsRow, DynamicFormField, PhoneNumber } from '@learnway/ui';
import { IcoImage01 } from '@learnway/icons';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import {
  ChangeUserIdFormField,
  ChangePhoneNumberFormField,
  useFetchAuthUser,
} from '@learnway/auth';

import { MAIN_CONTAINERS } from '../../../../widgets/layout';
import { pageRouteConfig } from '../../../../features/auth';

import { FormRow, NoticeBox } from '../../../../shared/ui';

import styles from './information-change.module.css';

export const Route = createFileRoute('/_layout/my-page/privacy/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '개인정보변경',
      mobile: { showHeader: false, showFooter: false, showMainFooter: false },
      container: MAIN_CONTAINERS.MY_PAGE,
    },
  }),
});

function RouteComponent() {
  const { provider, onSubmit, onFormChange, control, getValues, setFormError, fetchData } =
    useDynamicForm(authFormConfig);

  const { data: authUser } = useFetchAuthUser();

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
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'userIdEmail'}>
                <ChangeUserIdFormField />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'nameEmployeeNumber'}></DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'password'}>
                <ChangeUserIdFormField />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'company'}></DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'company1'}></DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'company2'}></DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'company3'}></DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'phoneNumber'}>
                <ChangePhoneNumberFormField />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
        </div>
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
