import React, { FC, useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { t } from 'i18next';
import { cn } from '@learnway/shared';
import {
  ContentsRow,
  RadioGroupFormField,
  ContentsRowItem,
  CheckboxGroupFormField,
  FormGuideText,
} from '@learnway/ui';

import { FormRow } from '@shared/ui';
import { FormDisplay } from '@features/form/ui/form-display';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

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
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isUseTwoFactorAuth', value: true }]}>
        <ContentsRow>
          <FormRow
            className={dynamicFormStyles.w_half}
            provider={provider}
            name="twoFactorAuthType"
            element={<RadioGroupFormField />}
          />
        </ContentsRow>
      </FormDisplay>
    </>
  );
};

export const LoginAuthenticationSettingInformation = LoginAuthenticationSettingInformationComponent;
