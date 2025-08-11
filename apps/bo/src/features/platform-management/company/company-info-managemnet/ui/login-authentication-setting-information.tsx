import { t } from 'i18next';
import { FC } from 'react';

import { CODE_GROUP } from '@learnway/hooks';
import { cn } from '@learnway/shared';
import { FormGuideText, FormRow2 } from '@learnway/ui/base-form';
import { ContentsRow, ContentsRowItem } from '@learnway/ui/contents-row';
import { CheckboxGroupFormField, RadioGroupFormField } from '@learnway/ui/form-field';

import { FormDisplay, SwitchFormField } from '@shared/ui/form';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

const LoginAuthenticationSettingInformationComponent: FC<any> = ({
  provider,
}: {
  provider: any;
}) => {
  return (
    <>
      <ContentsRow>
        <ContentsRowItem>
          <FormRow2
            provider={provider}
            name="isUseSso"
            label={t('SSO 로그인 사용 및 SSO 로그인 유형')}
            value={true}
            className={dynamicFormStyles.form_item_horizontal}
            element={
              <SwitchFormField
                switchConfig={{ label: (value: boolean) => (value ? t('사용') : t('미사용')) }}
              />
            }
          />
          <FormDisplay provider={provider} dependencies={[{ name: 'isUseSso', value: true }]}>
            <FormRow2
              provider={provider}
              name="ssoTypeList"
              value={['AES_Link']}
              element={
                <CheckboxGroupFormField
                  optionsConfig={{ codeGroup: CODE_GROUP['pms.company.SsoType'] }}
                />
              }
            />
          </FormDisplay>
          <div className={cn(formStyles.form_item)}>
            <FormGuideText>{t('SSO 로그인 사용 여부를 설정합니다.')}</FormGuideText>
          </div>
        </ContentsRowItem>
        <ContentsRowItem>
          <FormRow2
            provider={provider}
            name="passwordAuthType"
            label={t('비밀번호 인증 유형')}
            value={'PLATFORM'}
            guideText={t(
              '플랫폼은 플랫폼에서 비밀번호를 관리하고, 그외의 유형은 각 시스템에서 비밀번호를 관리합니다.',
            )}
            element={
              <RadioGroupFormField
                optionsConfig={{ codeGroup: CODE_GROUP['pms.company.PasswordAuthType'] }}
              />
            }
          />
        </ContentsRowItem>
      </ContentsRow>

      <ContentsRow>
        <ContentsRowItem>
          <FormRow2
            provider={provider}
            name="isUseTwoFactorAuth"
            label={t('로그인 2차 인증 사용')}
            value={true}
            className={dynamicFormStyles.form_item_horizontal}
            element={
              <SwitchFormField
                switchConfig={{ label: (value: boolean) => (value ? t('사용') : t('미사용')) }}
              />
            }
          />
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isUseTwoFactorAuth', value: true }]}
          >
            <FormRow2
              provider={provider}
              name="twoFactorAuthPlatformTypeList"
              value={['FO_PLATFORM', 'BO_PLATFORM']}
              element={
                <CheckboxGroupFormField
                  optionsConfig={{ codeGroup: CODE_GROUP['pms.company.TwoFactorAuthPlatformType'] }}
                />
              }
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
              <FormRow2
                provider={provider}
                name="twoFactorAuthType"
                label={t('2차 인증 유형')}
                value={'GOOGLE_OTP'}
                guideText={t('로그인 2차 인증 사용하는 경우 2차 인증 유형을 선택할 수 있습니다.')}
                element={
                  <RadioGroupFormField
                    optionsConfig={{ codeGroup: CODE_GROUP['pms.company.TwoFactorAuthType'] }}
                  />
                }
              />
            </ContentsRow>
          </FormDisplay>
        </ContentsRowItem>
      </ContentsRow>
    </>
  );
};

export const LoginAuthenticationSettingInformation = LoginAuthenticationSettingInformationComponent;
