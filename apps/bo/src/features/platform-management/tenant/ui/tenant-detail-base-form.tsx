import { t } from 'i18next';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import { CODE_GROUP, S3_PATH, SelectOption } from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import {
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  RadioGroupFormField,
  TextareaFormField,
} from '@learnway/ui/form-field';

import { ContentsRow } from '@learnway/ui/contents-row';

import {
  DuplicateCheckInputFormField,
  DuplicateState,
  FormDisplay,
  FormItem,
  FormRow2,
  InputFormField,
  SwitchFormField,
  ThumbnailPublicFormField,
} from '@shared/ui/form';
import { CompanyChoiceModal, UserChoiceModal } from '@shared/ui/modal';

import { EnDeviceType, EnFormMode, EnUseCategory } from '@shared/types/enums';

/**
 * 화면번호: NLP_BO_TMS_1002 (테넌트기본 정보)
 * @param props
 * @param ref
 * @returns
 */
const TenantDetailBaseFormComponent = ({
  formMode,
  provider,
  languageOptions,
  duplicateCheck,
  termsOptions,
}: {
  formMode: EnFormMode;
  provider: any;
  /**언어 옵션 */
  languageOptions: SelectOption[];
  /** 약관 옵션 */
  termsOptions?: SelectOption[];
  duplicateCheck: (value: string) => Promise<DuplicateState>;
}) => {
  return (
    <>
      <FormSubTitle label={t('기본 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="tenantName"
          label={t('테넌트명')}
          maxLength={150}
          format="object"
          value={{ fieldValue: '', checkState: DuplicateState.needInput }}
          validation={{
            format: 'object',
            required: true,
            conditions: [
              {
                fn: (values: any) => {
                  const fieldValue = values.tenantName.fieldValue;
                  if (fieldValue === '') return true;
                  return false;
                },
                message: t('LABEL.form.validation.needInput', { code: t('테넌트명') }),
              },
              {
                fn: (values: Record<string, any>) =>
                  values.tenantName.checkState === DuplicateState.check ||
                  values.tenantName.checkState === DuplicateState.needInput,
                message: t('LABEL.form.validation.check', { code: t('테넌트명') }),
              },
              {
                fn: (values: Record<string, any>) =>
                  values.tenantName.checkState === DuplicateState.duplicated,
                message: t('LABEL.form.validation.duplicated', { code: t('테넌트명') }),
              },
            ],
          }}
          element={<DuplicateCheckInputFormField onDuplicationCheck={duplicateCheck} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="logoImageUrl"
          label={t('테넌트 로고')}
          format="array"
          tooltip={t('테넌트에 사용할 로고로 파일 1개만 등록할 수 있습니다.')}
          description={t(
            '파일 사이즈 92x32 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50MB',
          )}
          value={[]}
          validation={{
            required: true,
            conditions: [
              {
                fn: (values: any) => {
                  console.log('### logoImageUrl => ', values);
                  if (values.logoImageUrl.length == 0) return true;
                  return false;
                },
                message: t('테넌트 로고 이미지를 등록 해주세요.'),
              },
            ],
          }}
          element={<ThumbnailPublicFormField max={1} s3Path={S3_PATH['public/image/thumbnail']} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="tenantUserList"
          label={t('테넌트 담당자')}
          type="custom"
          format="array"
          value={[]}
          placeholder={t('담당자를 선택해주세요.')}
          validation={{ required: true }}
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'uuid',
                hideBorder: true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                content: <UserChoiceModal />,
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          maxLength={150}
          name="tenantTagList"
          label={t('테넌트 정산 태그')}
          format="string"
          type="text"
          value=""
          placeholder=""
          validation={{
            format: 'string',
            required: true,
          }}
          element={<InputFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="companyTenantList"
          label={t('회사 선택')}
          validation={{ required: true }}
          value={[]}
          format="array"
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'companyId',
                hideBorder: true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                content: <CompanyChoiceModal />,
              }}
            />
          }
        />
      </ContentsRow>

      <ContentsRow>
        <FormRow2
          provider={provider}
          name="isUsed"
          label={t('테넌트 사용')}
          format="boolean"
          value={true}
          className={dynamicFormStyles.form_item_horizontal}
          tooltip={t(
            '테넌트 사용이 ON이면 학습자 사이트에 로그인 할 수 있으며, OFF이면 로그인 할 수 없습니다.',
          )}
          switchConfig={{
            label: (value: boolean) => (value ? t('사용') : t('미사용')),
          }}
          guideText={t('테넌트 사용 여부를 설정할 수 있습니다.')}
          element={<SwitchFormField />}
        />
        <FormRow2
          provider={provider}
          name="fileStorageTypeChannelList"
          label={t('파일 저장 설정(채널)')}
          format="array"
          value={['AWS_INTERNAL', 'HMG_CLOUD']}
          validation={{ required: true }}
          optionsConfig={{
            codeGroup: CODE_GROUP['pms.company.FileStorageType'],
          }}
          element={<CheckboxGroupFormField />}
        />
        <FormRow2
          provider={provider}
          name="fileStorageTypeBase"
          label={t('파일 저장 설정(채널 외)')}
          value="AWS_INTERNAL"
          optionsConfig={{
            codeGroup: CODE_GROUP['pms.company.FileStorageType'],
          }}
          element={<RadioGroupFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="tenantDesc"
          label={t('설명')}
          value=""
          maxLength={2000}
          placeholder={t('설명을 입력해 주세요.')}
          element={<TextareaFormField resize="none" />}
        />
      </ContentsRow>
      <FormSubTitle label={t('시스템 설정')} lineType="dark" />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="device"
          label={t('디바이스')}
          format="array"
          tooltip={t(
            'PC, 모바일, APP 모두 사용가능하며 과정 등록 시 PC, 모바일 학습 여부를 설정할 수 있습니다.',
          )}
          validation={{
            required: {
              fn: (values: any) => {
                return (
                  !values[EnDeviceType.isApp] &&
                  !values[EnDeviceType.isMobile] &&
                  !values[EnDeviceType.isPc]
                );
              },
              message: t('1개 이상 선택하세요.'),
            },
          }}
          value={[EnDeviceType.isPc, EnDeviceType.isMobile, EnDeviceType.isApp]}
          options={[
            {
              label: 'PC',
              value: EnDeviceType.isPc,
            },
            {
              label: 'Mobile',
              value: EnDeviceType.isMobile,
            },
            {
              label: 'App',
              value: EnDeviceType.isApp,
            },
          ]}
          showSelectAll={true}
          element={<CheckboxGroupFormField disabled={true} />}
        />
        <FormRow2
          provider={provider}
          name="useCategory"
          label={t('카테고리 사용 여부')}
          format="array"
          tooltip={t('테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다')}
          value={[EnUseCategory.isCommonCategory, EnUseCategory.isTenantCategory]}
          validation={{
            required: {
              fn: (values: any) => {
                return (
                  !values[EnUseCategory.isCommonCategory] && !values[EnUseCategory.isTenantCategory]
                );
              },
              message: t('1개 이상 선택하세요.'),
            },
          }}
          options={[
            {
              value: EnUseCategory.isCommonCategory,
              label: t('공통 카테고리'),
            },
            {
              value: EnUseCategory.isTenantCategory,
              label: t('테넌트 카테고리'),
            },
          ]}
          showSelectAll={true}
          element={<CheckboxGroupFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="langCountryCodeTypeList"
          label={t('언어')}
          format="array"
          tooltip={t(
            '테넌트에서 사용할 언어를 선택하고, 선택한 언어에서 다국어 설정을 할 수 있습니다.',
          )}
          validation={{
            required: {
              fn: (values: any) => {
                return values.langCountryCodeTypeList.length === 0;
              },
              message: t('1개 이상 선택하세요.'),
            },
          }}
          value={['KO', 'EN']}
          element={
            <CheckboxGroupFormField showSelectAll={true} cols={6} options={languageOptions} />
          }
        />
      </ContentsRow>
      {formMode === EnFormMode.VIEW && termsOptions && (
        <>
          <FormSubTitle label={t('약관 정보')} lineType="dark" />
          <ContentsRow type={'horizontal'} titleMode>
            <FormRow2
              provider={provider}
              name={'isEnrollOption'}
              label={t('수강신청')}
              tooltip={t('과정 등록 필수 값으로 사용 여부 수정이 불가합니다.')}
              value={true}
              switchConfig={{
                label: (value: boolean) => (value ? t('허용') : t('미사용')),
              }}
              element={<CheckboxGroupFormField disabled={true} options={termsOptions} />}
            />
          </ContentsRow>
        </>
      )}

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isEnrollOption'}
          label={t('수강신청')}
          tooltip={t('과정 등록 필수 값으로 사용 여부 수정이 불가합니다.')}
          value={true}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미사용')),
          }}
          element={<SwitchFormField disabled={true} />}
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isEnrollOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('승인')} guideText={t('수강신청 결재라인을 설정합니다.')} />
          <FormItem label={t('정원')} guideText={t('수강 신청 정원 사용 여부를 설정합니다.')} />
          <FormItem
            label={t('수강신청 대기')}
            guideText={t('수강 신청 대기 자동 모드, 수동 모드를 설정합니다.')}
          />
        </ContentsRow>
        <ContentsRow>
          <FormItem
            label={t('차수 중복 수강')}
            guideText={t('동일 차수 종북 학습 여부를 설정합니다.')}
          />
          <FormItem
            label={t('사전 레벨 테스트')}
            guideText={t('수강신청 학습 전 레벨 테스트 진행 여부를 설정합니다.')}
          />
          <FormItem
            label={t('교재 배송지 수집')}
            guideText={t('교재 배송지 주소 수집 여부를 설정합니다.')}
          />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isTextBookOption'}
          label={t('교재')}
          tooltip={t('교재 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.')}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isTextBookOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('교재명')} guideText={t('교재명을 설정합니다.')} />
          <FormItem label={t('교재비')} guideText={t('교재 비용을  설정합니다.')} />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isInstructorOption'}
          label={t('강사')}
          tooltip={t('강사 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.')}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isInstructorOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('강사')} guideText={t('강사가 과정을 진행 시 강사를 설정합니다.')} />
          <FormItem label={t('튜터')} guideText={t('튜터가 과정을 진행 시 튜터를 설정합니다.')} />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          label={t('이수 기준')}
          tooltip={t('과정 등록 필수 값으로 사용 여부 수정이 불가합니다.')}
          value={true}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          name={'isPassOption'}
          element={<SwitchFormField disabled={true} />}
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isPassOption', value: true }]}>
        <ContentsRow>
          <FormItem
            label={t('이수 처리 설정')}
            guideText={t('과정 학습 이수 처리 여부를 설정합니다.')}
          />
          <FormItem
            label={t('인정 학습시간')}
            guideText={t('과정 학습 시 학습 시간 인정 시간을 설정합니다.')}
          />
          <FormItem
            label={t('학습 포인트')}
            guideText={t('과정 학습 시 자급하는 포인트를 설정합니다.')}
          />
        </ContentsRow>
        <ContentsRow>
          <FormItem
            label={t('수료증 제공')}
            guideText={t('과정 학습 이수 완료 시 수료증 제공 여부를 설정합니다.')}
          />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isCommunicationOption'}
          label={t('커뮤니티')}
          tooltip={t(
            '커뮤니티 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
          )}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isCommunicationOption', value: true }]}
      >
        <ContentsRow>
          <FormItem
            label={t('커뮤니티 및 공유 설정')}
            guideText={t('과정 상세의 공지사항, 커뮤니티 등을 설정합니다.')}
          />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isLearningEnvOption'}
          label={t('학습환경')}
          tooltip={t(
            '학습환경 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
          )}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isLearningEnvOption', value: true }]}
      >
        <ContentsRow>
          <FormItem
            label={t('기기 제한')}
            guideText={t('PC, 모바일 등 학습 가능한 기기를 설정합니다.')}
          />
          <FormItem
            label={t('네트워크 제한')}
            guideText={t('과정 학습 시 사내망, 사외망 접속 제한을 설정합니다.')}
          />
          <FormItem
            label={t('학습시간 제한')}
            guideText={t('근무시간 기준 학습시간 제한을 설정합니다.')}
          />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('복습 제한')} guideText={t('과정 복습에 제한을 설정합니다.')} />
          <FormItem
            label={t('화면 캡쳐 방지')}
            guideText={t('학습창 화면 캡쳐 방지 여부를 설정합니다.')}
          />
          <FormItem
            label={t('학습전 보안 서약')}
            guideText={t('학습전 보안 서약 여부를 설정합니다.')}
          />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isLearningControlOption'}
          label={t('학습제어')}
          tooltip={t(
            '학습제어 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
          )}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isLearningControlOption', value: true }]}
      >
        <ContentsRow>
          <FormItem label={t('1일 진도제한')} guideText={t('1일 진도제한 여부를 설정합니다.')} />
          <FormItem
            label={t('진도 초기화')}
            guideText={t('학습한 과정의 진도 초기화 여부를 설정합니다.')}
          />
          <FormItem
            label={t('순차 학습')}
            guideText={t('과정 기준 순서로 학습 진행 여부를 설정합니다.')}
          />
        </ContentsRow>
        <ContentsRow>
          <FormItem
            label={t('동영상 탐색바 제한')}
            guideText={t('동영상 탐색바의 기능 제한을 설정합니다.')}
          />
          <FormItem
            label={t('동영상 배속 제한')}
            guideText={t('동영상 학습 시 재생 배속 제한을 설정합니다.')}
          />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isRelatedCourseOption'}
          label={t('사전/연관학습')}
          tooltip={t(
            '사전/연관학습 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
          )}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isRelatedCourseOption', value: true }]}
      >
        <ContentsRow>
          <FormItem
            label={t('사전 필수 과정')}
            guideText={t('과정 학습 전 필수 학습 과정을 설정합니다.')}
          />
          <FormItem
            label={t('연관 학습')}
            guideText={t('등록 과정과 연관된 학습 과정을 설정합니다.')}
          />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isAdminDataOption'}
          label={t('행정 항목')}
          tooltip={t(
            '행정항목 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
          )}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isAdminDataOption', value: true }]}>
        <ContentsRow>
          <FormItem
            label={t('HMG 과정 데이터 표준 분류')}
            guideText={t('과정 표준 분류를 설정합니다.')}
          />
          <FormItem
            label={t('1인당 교육비')}
            guideText={t('1인당 교육비 사용 금액을 설정합니다.')}
          />
          <FormItem
            label={t('고용보험 환급')}
            guideText={t('고용보험 환급 대상 과정 여부를 설정합니다.')}
          />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('과정 플래그')} guideText={t('과정 플래그 기능을 설정합니다.')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isCarTenantCustomOption'}
          label={t('완성차 테넌트 전용 항목')}
          tooltip={t(
            '완성차 테넌트 전용 항목의 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
          )}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isCarTenantCustomOption', value: true }]}
      >
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용항목')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용항목')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isRotemTenantCustomOption'}
          label={t('로템 테넌트 전용 항목')}
          tooltip={t(
            '로템 테넌트 전용 항목의 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
          )}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isRotemTenantCustomOption', value: true }]}
      >
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용항목')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용항목')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isOutsourcingTenantCustomOption'}
          label={t('위탁 테넌트 전용 힝목')}
          tooltip={t(
            '위탁 테넌트 전용 힝목의 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
          )}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isOutsourcingTenantCustomOption', value: true }]}
      >
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용항목')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용항목')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isWiaTenantCustomOption'}
          label={t('위아 테넌트 전용 항목')}
          tooltip={t(
            '위아 테넌트 전용 항목의 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
          )}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isWiaTenantCustomOption', value: true }]}
      >
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용항목')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용항목')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow2
          provider={provider}
          name={'isAutoeverTenantCustomOption'}
          label={t('오토에버 테넌트 전용 항목')}
          tooltip={t(
            '오토에버 테넌트 전용 항목의 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
          )}
          value={false}
          switchConfig={{
            label: (value: boolean) => (value ? t('허용') : t('미허용')),
          }}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isAutoeverTenantCustomOption', value: true }]}
      >
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용항목')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용항목')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>
    </>
  );
};

export const TenantDetailBaseForm = TenantDetailBaseFormComponent;
