import { FormDisplay } from '@features/form';
import { ChipListModalSelectorFormField, ContentsRow, FormSubTitle, Input } from '@learnway/ui';
import { FormItem, FormRow } from '@shared/ui';
import { t } from 'i18next';
import { EnFormMode } from '@types';

/**
 * 회사 유저 상세 - 계정 정보
 * @param param0
 * @returns
 */
const CompanyUserDetailAccountComponent = ({
  provider,
  formMode,
}: {
  provider: any;
  formMode: EnFormMode;
}) => {
  return (
    <>
      <FormSubTitle label={t('계정 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={provider} name={'hrInfoManageType'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'hrInfoManageType', value: 'MANUAL_MANAGE' }]}
      >
        <ContentsRow>
          <FormRow provider={provider} name={'companyMemberJoinTypeList'} />
        </ContentsRow>
      </FormDisplay>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'hrInfoManageType', value: 'AUTO_MANAGE' }]}
      >
        <ContentsRow>
          <FormRow provider={provider} name={'linkageSystem'} />
        </ContentsRow>
      </FormDisplay>
      <ContentsRow>
        <FormRow provider={provider} name={'accountStatus'} />
        <FormRow
          provider={provider}
          name={'lastAccountStatusUpdateDate'}
          element={<Input readOnly={true} />}
        />
        <FormRow provider={provider} name={'dormantDate'} element={<Input readOnly={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'approvalStatus'} element={<Input readOnly={true} />} />
        <FormRow
          provider={provider}
          name={'lastApprovalStatusUpdateDate'}
          element={<Input readOnly={true} />}
        />
        <FormItem />
      </ContentsRow>
      {
        formMode !== EnFormMode.ADD && (
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'tenantList'}
              element={
                <ChipListModalSelectorFormField
                  chipList={{
                    labelField: 'tenantName',
                    valueField: 'tenantId',
                    hideBorder: true,
                  }}
                  disabled={true}
                />
              }
            />
          </ContentsRow>
        )
      }
    </>
  );
};

export const CompanyUserDetailAccount = CompanyUserDetailAccountComponent;
