import React, { FC, useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { t } from 'i18next';

import {
  ContentsRow,
  RadioGroupFormField,
  ContentsRowItem,
  CheckboxGroupFormField,
} from '@learnway/ui';

import { FormRow } from '@shared/ui';
import { FormDisplay } from '@features/form/ui/form-display';

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
