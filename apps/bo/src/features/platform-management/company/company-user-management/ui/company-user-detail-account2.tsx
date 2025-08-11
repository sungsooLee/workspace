import { t } from 'i18next';

import { CODE_GROUP } from '@learnway/hooks';
import { FormRow2, FormSubTitle } from '@learnway/ui/base-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import {
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  RadioGroupFormField,
} from '@learnway/ui/form-field';
import { Input } from '@learnway/ui/input';

import { EnFormMode } from '@shared/types/enums';
import { FormDisplay, FormItem } from '@shared/ui/form';

/**
 * 회사 유저 상세 - 계정 정보
 * (FormRow2 적용을 위한 임시 컴포넌트)
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
        <FormRow2
          provider={provider}
          label={t('인사 데이터 관리 방식')}
          name={'hrInfoManageType'}
          value={'MANUAL_MANAGE'}
          element={
            <RadioGroupFormField
              optionsConfig={{
                codeGroup: CODE_GROUP['pms.company.HrInfoManageType'],
              }}
            />
          }
        />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'hrInfoManageType', value: 'MANUAL_MANAGE' }]}
      >
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'companyMemberJoinTypeList'}
            label={t('회원 가입 유형')}
            value={['FO_PLATFORM', 'BO_PLATFORM']}
            guideText={t(
              '수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다.',
            )}
            element={
              <CheckboxGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['pms.company.CompanyMemberJoinType'],
                }}
              />
            }
          />
        </ContentsRow>
      </FormDisplay>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'hrInfoManageType', value: 'AUTO_MANAGE' }]}
      >
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'linkageSystem'}
            label={t('회원 가입 유형')}
            value={''}
            guideText={t(
              '수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다.',
            )}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['pms.company.LinkageSystem'],
                }}
              />
            }
          />
        </ContentsRow>
      </FormDisplay>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'accountStatus'}
          label={t('계정상태')}
          element={
            <RadioGroupFormField
              options={[
                { value: 'NORMAL', label: t('정상') },
                { value: 'LOCK', label: t('잠김') },
                { value: 'INACTIVE', label: t('휴면(정상)') },
                { value: 'INACTIVE_LOCK', label: t('휴면(잠김)') },
              ]}
            />
          }
        />
        <FormRow2
          provider={provider}
          name={'lastAccountStatusUpdateDate'}
          label={t('계정 상태 최종 변경일')}
          placeholder={''}
          element={<Input readOnly={true} />}
        />
        <FormRow2
          provider={provider}
          name={'dormantDate'}
          label={t('휴면 상태 변경일')}
          placeholder={''}
          element={<Input readOnly={true} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'approvalStatus'}
          label={t('승인상태')}
          placeholder={''}
          element={<Input readOnly={true} />}
        />
        <FormRow2
          provider={provider}
          name={'lastApprovalStatusUpdateDate'}
          label={t('승인상태 최종 변경일')}
          placeholder={''}
          element={<Input readOnly={true} />}
        />
        <FormItem />
      </ContentsRow>
      {formMode !== EnFormMode.ADD && (
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'tenantList'}
            label={t('테넌트')}
            format={'array'}
            element={
              <ChipListModalSelectorFormField
                chipList={{
                  labelField: 'tenantName',
                  valueField: 'tenantId',
                  hideBorder: true,
                  wordwrap: true,
                  isOptionHideCloseButton: (option: any) => option,
                }}
                disabled={true}
              />
            }
          />
        </ContentsRow>
      )}
    </>
  );
};

export const CompanyUserDetailAccount2 = CompanyUserDetailAccountComponent;
