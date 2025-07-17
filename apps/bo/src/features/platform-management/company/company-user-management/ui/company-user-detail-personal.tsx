import { t } from 'i18next';
import { ContentsRow, FormSubTitle, Input, DatePicker } from '@learnway/ui';
import { FormRow } from '@shared/ui';
import { DuplicateCheckInputFormField, DuplicateState } from '@features/form';
import UsersService from '@entities/users/api/users';

/**
 * 회사 유저 상세 - 개인 정보
 * @param param0
 * @returns
 */
const CompanyUserDetailPersonalComponent = ({ provider }: { provider: any }) => {
  const duplicateEmailCheck = async (email: string) => {
    const payload = { email };
    const result = await UsersService.existsEmail(payload);
    console.log('### duplicateEmailCheck', result);
    if (result.isEmailExists === true) return DuplicateState.duplicated;
    else return DuplicateState.ok;
  };

  return (
    <>
      <FormSubTitle label={t('개인 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={provider} name={'name'} />
        <FormRow provider={provider} name={'engName'} />
        <FormRow provider={provider} name={'employeeNumber'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'email'}
          element={<DuplicateCheckInputFormField onDuplicationCheck={duplicateEmailCheck} />}
        />
        <FormRow provider={provider} name={'birthday'} element={<DatePicker displayType="day" />} />
        <FormRow provider={provider} name={'gender'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'area'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'phoneNumber'} />
        <FormRow provider={provider} name={'companyPhoneNumber'} />
      </ContentsRow>
    </>
  );
};

export const CompanyUserDetailPersonal = CompanyUserDetailPersonalComponent;
