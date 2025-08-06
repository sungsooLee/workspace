import { cn } from '@learnway/shared';
import { FormGuideText } from '@learnway/ui/base-form';
import { CheckboxGroupFormField, RadioGroupFormField } from '@learnway/ui/form-field';
import { t } from 'i18next';
import { FC } from 'react';

import { FormDisplay, FormRow } from '@shared/ui/form';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { ContentsRow, ContentsRowItem } from '@learnway/ui/contents-row';

const LoginAuthenticationSettingInformationComponent: FC<any> = ({
  provider,
}: {
  provider: any;
}) => {
  return (
    <>
      <ContentsRow>
        <ContentsRowItem>
          <FormRow
            provider={provider}
            name="isUseSso"
            className={dynamicFormStyles.form_item_horizontal}
          />
          <FormDisplay provider={provider} dependencies={[{ name: 'isUseSso', value: true }]}>
            <FormRow provider={provider} name="ssoTypeList" element={<CheckboxGroupFormField />} />
          </FormDisplay>
          <div className={cn(formStyles.form_item)}>
            <FormGuideText>{t('SSO 로그인 사용 여부를 설정합니다.')}</FormGuideText>
          </div>
        </ContentsRowItem>
        <ContentsRowItem>
          <FormRow provider={provider} name="passwordAuthType" />
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
          <div className={cn(formStyles.form_item)}>
            <FormGuideText>{t('2차 로그인 인증 여부를 설정할 수 있습니다.')}</FormGuideText>
          </div>
        </ContentsRowItem>
        <ContentsRowItem>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isUseTwoFactorAuth', value: true }]}
          >
            <ContentsRow>
              <FormRow
                className={dynamicFormStyles.w_half}
                provider={provider}
                name="twoFactorAuthType"
                element={<RadioGroupFormField />}
              />
            </ContentsRow>
          </FormDisplay>
        </ContentsRowItem>
      </ContentsRow>
    </>
  );
};

export const LoginAuthenticationSettingInformation = LoginAuthenticationSettingInformationComponent;
