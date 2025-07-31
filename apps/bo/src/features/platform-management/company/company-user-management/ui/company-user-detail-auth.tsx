import { FormDisplay } from '@features/form';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { FormSubTitle } from '@learnway/ui/base-form';
import { ContentsRow, ContentsRowItem } from '@learnway/ui/contents-row';
import { CheckboxGroupFormField, RadioGroupFormField } from '@learnway/ui/form-field';
import { FormItem, FormRow } from '@shared/ui';
import { t } from 'i18next';

/**
 * 회사 유저 상세 - 로그인 및 인증 설정 정보
 * @param param0
 * @returns
 */
const CompanyUserDetailAuthenticationComponent = ({ provider }: { provider: any }) => {
  return (
    <>
      <FormSubTitle label={t('로그인 및 인증 설정 정보')} lineType={'dark'} />
      <ContentsRow>
        <ContentsRowItem>
          <FormRow
            provider={provider}
            name="isUseSso"
            className={dynamicFormStyles.form_item_horizontal}
          />
          <FormDisplay provider={provider} dependencies={[{ name: 'isUseSso', value: true }]}>
            <FormRow provider={provider} name="ssoTypeList" element={<RadioGroupFormField />} />
          </FormDisplay>
          <FormItem guideText={t('SSO 로그인 사용 여부를 설정합니다.')} />
        </ContentsRowItem>
        <ContentsRowItem>
          <FormRow provider={provider} name={'authType'} />
        </ContentsRowItem>
      </ContentsRow>
      <ContentsRow>
        <ContentsRowItem>
          <FormRow
            provider={provider}
            name="isUseTwoFactorAuth"
            className={dynamicFormStyles.form_item_horizontal}
          ></FormRow>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isUseTwoFactorAuth', value: true }]}
          >
            <FormRow
              provider={provider}
              name="twoFactorAuthPlatformTypeList"
              element={<CheckboxGroupFormField />}
            />
          </FormDisplay>
          <FormItem guideText={t('2차 로그인 인증 여부를 설정할 수 있습니다.')} />
        </ContentsRowItem>
        <ContentsRowItem>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isUseTwoFactorAuth', value: true }]}
          >
            <FormRow provider={provider} name={'2FAType'} />
          </FormDisplay>
        </ContentsRowItem>
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'limitLogin'}
          element={<RadioGroupFormField disabled={true} />}
        />
      </ContentsRow>
    </>
  );
};

export const CompanyUserDetailAuthentication = CompanyUserDetailAuthenticationComponent;
