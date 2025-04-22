import { createFileRoute } from '@tanstack/react-router';

import { Avatar, ContentsRow, DynamicFormField } from '@learnway/ui';
import { IcoImage01 } from '@learnway/icons';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import { ChangeUserIdFormField } from '@learnway/auth';

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
  const { provider, onSubmit, onFormChange, control, getValues, setFormError, onFormValid } =
    useDynamicForm(authFormConfig);

  return (
    <div className={styles.start}>
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
            <DynamicFormField name={'email'}>
              <ChangeUserIdFormField />
            </DynamicFormField>
          </FormRow>
        </ContentsRow>
      </div>
    </div>
  );
}

const authFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'userId',
      type: 'custom',
      value: '',
    },
    {
      name: 'authToolType',
      type: 'custom',
      label: '',
      value: 'PHONE',
      placeholder: '',
      description: '',
    },
    {
      name: 'name',
      type: 'text',
      label: '이름',
      value: '',
      placeholder: '이름을 입력하세요',
      description: '',
    },
    {
      name: 'birthday',
      type: 'text',
      label: '생년월일',
      maxLength: 10,
      value: '',
      placeholder: '생년월일(19991229)',
    },
    {
      name: 'phoneNumber',
      type: 'phone-number',
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
    {
      name: 'email',
      type: 'custom',
      label: '이메일',
      value: '',
      placeholder: '이메일(hyunidai.kim@hyundai.com)',
    },
    {
      name: 'verificationCode',
      type: 'custom',
      label: '인증번호',
      value: '',
      placeholder: '인증번호 입력',
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
