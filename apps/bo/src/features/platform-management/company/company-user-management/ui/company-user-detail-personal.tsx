import { t } from 'i18next';

import { CODE_GROUP } from '@learnway/hooks';
import { FormRow2, FormSubTitle } from '@learnway/ui/base-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import { DatePicker } from '@learnway/ui/date-picker';
import { Input } from '@learnway/ui/input';

import UsersService from '@entities/users/api/users';
import { DropdownFormField, DuplicateCheckInputFormField, DuplicateState } from '@shared/ui/form';

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
        <FormRow2
          provider={provider}
          name={'name'}
          label={t('이름')}
          placeholder={''}
          element={<Input />}
          validation={{ required: true, format: 'string' }}
        />
        <FormRow2
          provider={provider}
          name={'engName'}
          label={t('영문 이름')}
          placeholder={''}
          element={<Input />}
        />
        <FormRow2
          provider={provider}
          name={'employeeNumber'}
          label={t('사번')}
          placeholder={''}
          element={<Input />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'email'}
          label={t('아이디 (이메일)')}
          value={{ fieldValue: '', checkState: DuplicateState.needInput }}
          format={'object'}
          placeholder={''}
          element={
            <DuplicateCheckInputFormField
              onDuplicationCheck={duplicateEmailCheck}
              readOnly={true}
            />
          }
          validation={{
            format: 'object',
            required: true,
            conditions: [
              {
                fn: (values: Record<string, any>) => {
                  const fieldValue = values.email.fieldValue;
                  if (fieldValue === '') return true;
                  return false;
                },
                message: t('LABEL.form.validation.needInput', { code: t('이메일') }),
              },
              {
                fn: (values: Record<string, any>) =>
                  values.email.checkState === DuplicateState.check ||
                  values.email.checkState === DuplicateState.needInput,
                message: t('LABEL.form.validation.check', { code: t('이메일') }),
              },
              {
                fn: (values: Record<string, any>) =>
                  values.email.checkState === DuplicateState.duplicated,
                message: t('LABEL.form.validation.duplicated', { code: t('이메일') }),
              },
            ],
          }}
        />
        <FormRow2
          provider={provider}
          name={'birthday'}
          label={t('생년월일')}
          format={'object'}
          value={undefined}
          element={<DatePicker displayType="day" />}
        />
        <FormRow2
          provider={provider}
          name={'gender'}
          label={t('성별')}
          element={
            <DropdownFormField
              optionsConfig={{
                codeGroup: CODE_GROUP['pms.user.Gender'],
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'area'}
          label={t('지역')}
          placeholder={''}
          element={<Input readOnly={true} />}
        />
        <FormRow2
          provider={provider}
          name={'phoneNumber'}
          label={t('휴대폰 번호')}
          format={'number'}
          element={<Input readOnly={true} />}
        />
        <FormRow2
          provider={provider}
          name={'companyPhoneNumber'}
          label={t('연락처 (사무실)')}
          format={'number'}
          element={<Input />}
        />
      </ContentsRow>
    </>
  );
};

export const CompanyUserDetailPersonal = CompanyUserDetailPersonalComponent;
