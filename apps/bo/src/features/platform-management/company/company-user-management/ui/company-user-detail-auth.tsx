import { t } from 'i18next';

import { CODE_GROUP } from '@learnway/hooks';
import { FormRow2, FormSubTitle } from '@learnway/ui/base-form';
import { ContentsRow, ContentsRowItem } from '@learnway/ui/contents-row';
import { CheckboxGroupFormField, RadioGroupFormField } from '@learnway/ui/form-field';

import { FormDisplay, FormItem, SwitchFormField } from '@shared/ui/form';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

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
          <FormRow2
            provider={provider}
            name="isUseSso"
            label={t('SSO 로그인 사용 및 SSO 로그인 유형')}
            format={'boolean'}
            value={true}
            className={dynamicFormStyles.form_item_horizontal}
            element={
              <SwitchFormField
                switchConfig={{
                  label: (value: boolean) => (value ? t('사용') : t('미사용')),
                }}
              />
            }
          />
          <FormDisplay provider={provider} dependencies={[{ name: 'isUseSso', value: true }]}>
            <FormRow2
              provider={provider}
              name="ssoTypeList"
              element={
                <RadioGroupFormField
                  optionsConfig={{
                    codeGroup: CODE_GROUP['pms.company.SsoType'],
                  }}
                />
              }
            />
          </FormDisplay>
          <FormItem guideText={t('SSO 로그인 사용 여부를 설정합니다.')} />
        </ContentsRowItem>
        <ContentsRowItem>
          <FormRow2
            provider={provider}
            name={'authType'}
            label={t('비밀번호 인증 유형')}
            guideText={t(
              '플랫폼은 플랫폼에서 비밀번호를 관리하고, 그외의 유형은 각 시스템에서 비밀번호를 관리합니다.',
            )}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['pms.company.PasswordAuthType'],
                }}
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
                switchConfig={{
                  label: (value: boolean) => (value ? t('사용') : t('미사용')),
                }}
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
                  optionsConfig={{
                    codeGroup: CODE_GROUP['pms.company.TwoFactorAuthPlatformType'],
                  }}
                />
              }
            />
          </FormDisplay>
          <FormItem guideText={t('2차 로그인 인증 여부를 설정할 수 있습니다.')} />
        </ContentsRowItem>
        <ContentsRowItem>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isUseTwoFactorAuth', value: true }]}
          >
            <FormRow2
              provider={provider}
              name={'2FAType'}
              label={t('2차 인증 유형')}
              value={'GOOGLE_OTP'}
              guideText={t('로그인 2차 인증 사용하는 경우 2차 인증 유형을 선택할 수 있습니다.')}
              element={
                <RadioGroupFormField
                  optionsConfig={{
                    codeGroup: CODE_GROUP['pms.company.TwoFactorAuthType'],
                  }}
                />
              }
            />
          </FormDisplay>
        </ContentsRowItem>
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'limitLogin'}
          label={t('로그인 제한')}
          value={['opt2']}
          guideText={t('로그인 시간 제한 선택 시 회사관리 제한 시간에는 로그인할 수 없습니다.')}
          element={
            <RadioGroupFormField
              disabled={true}
              options={[
                { label: t('로그인 제한 시간 설정'), value: 'opt1' },
                { label: t('근태 연동 로그인 제한'), value: 'opt2' },
                { label: t('제한 없음'), value: 'opt3' },
              ]}
            />
          }
        />
      </ContentsRow>
    </>
  );
};

export const CompanyUserDetailAuthentication = CompanyUserDetailAuthenticationComponent;
