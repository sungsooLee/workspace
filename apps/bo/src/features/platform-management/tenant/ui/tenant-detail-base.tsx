import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useRouterState } from '@tanstack/react-router';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import {
  Button,
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  ContentsRow, FormSubTitle,
  Switch,
  TextareaFormField,
  Tooltip,
  useModal,
} from '@learnway/ui';
import {
  CODE_GROUP,
  DynamicFormConfig,
  S3_PATH,
  useCodeStore,
  useDynamicForm,
} from '@learnway/hooks';

import { FormRow, FormRow2, ThumbnailListFormField, FormItem } from '@shared/ui';

import { isEqual } from 'lodash';
import { CompanyChoiceModal, UserChoiceModal } from '@shared/ui';
import { DuplicateCheckInputFormField, DuplicateState, FormDisplay } from '@features/form';
import { useFetchTenant, useUpdateTenant } from '@entities/tenant';
import TenantService from '@entities/tenant/api/tenant';
import { EnDeviceType, EnUseCategory } from '@types';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { IcoAlertCircle } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { cn } from '@learnway/shared';

/**
 * 화면번호: NLP_BO_TMS_1002 (테넌트기본 정보)
 * @param props
 * @param ref
 * @returns
 */
const TenantDetailBaseComponent = (props: any, ref: any) => {
  const routerState = useRouterState();
  const { open: openModal, confirm: openConfirm } = useModal();

  const [languageTypeList, setLanguageTypeList] = useState<any[]>([]);
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });
  const tenantId = routerState.location.state?.tenantId;

  const { t } = useTranslation();
  const { getCode } = useCodeStore();
  const { data: tenantData, refetch } = useFetchTenant(tenantId);
  const { update } = useUpdateTenant({
    onSuccess: () => {
      refetch();
    },
  });
  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    getValues,
    clearFormError,
    setFormError,
  } = useDynamicForm(formConfig);

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    saveData() {
      const form = formRef.current;
      if (form) {
        console.log('formValue');
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
  }));

  const duplicateCheck = async (tenantName: string) => {
    const result: boolean = await TenantService.existTenant(tenantName, tenantId);

    if (result) return DuplicateState.duplicated;
    else return DuplicateState.ok;
  };

  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
    const tagStringList = data.tenantTagList.split(',');
    const payload = {
      ...data,
      tenantName: data.tenantName.fieldValue,
      logoImageUrl: data.logoImageUrl?.length > 0 ? data.logoImageUrl[0] : '',
      isPc: data.device.includes(EnDeviceType.isPc),
      isMobile: data.device.includes(EnDeviceType.isMobile),
      isApp: data.device.includes(EnDeviceType.isApp),
      isCommonCategory: data.useCategory.includes(EnUseCategory.isCommonCategory),
      isTenantCategory: data.useCategory.includes(EnUseCategory.isTenantCategory),
      tenantId,
      tenantTagList: tagStringList.map((item: string) => ({ tagName: item })),
      tenantUserList: data.tenantUserList.map((item: any) => ({
        tenantId,
        userUuid: item.uuid,
      })),
      companyTenantList: data.companyTenantList.map((v: any) => ({
        tenantId,
        companyId: v.companyId,
      })),
    };
    console.log('payload {} => ', payload);
    if (await openConfirm('저장 하시겠습니까?')) {
      update(payload);
    }
  };
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  useEffect(() => {
    if (tenantData) {
      console.log('#### tenantData {} => ', tenantData);
      const device = [];
      const useCategory = [];
      const logoImageUrl = [`${window.location.hostname}/${tenantData.logoImageUrl}`];
      if( tenantData.logoImageUrl.includes('/upload/content/image') ) {
        const imageUrl = tenantData.logoImageUrl.substring(
          tenantData.logoImageUrl.indexOf('/upload/content/image') + 1
        );
        logoImageUrl.push(imageUrl);
      }
      tenantData.isPc && device.push(EnDeviceType.isPc);
      tenantData.isMobile && device.push(EnDeviceType.isMobile);
      tenantData.isApp && device.push(EnDeviceType.isApp);
      tenantData.isCommonCategory && useCategory.push(EnUseCategory.isCommonCategory);
      tenantData.isTenantCategory && useCategory.push(EnUseCategory.isTenantCategory);
      let tag = '';
      if (tenantData.tenantTagList && tenantData.tenantTagList.length > 0) {
        tag = tenantData.tenantTagList.map((item) => item.tagName).join(',');
      }

      const platformAttributeProperties = tenantData.flatformProperties;
      updateFormData({
        ...tenantData,
        tenantName: { fieldValue: tenantData.tenantName, checkState: DuplicateState.okStart },
        logoImageUrl,
        device,
        useCategory,
        tenantDesc: tenantData.tenantDesc ?? '',
        tenantTagList: tag,
        companyTenantList: tenantData.companyTenantList.map((item) => ({
          companyId: item.companyId,
          name: item.companyName,
        })),
        tenantUserList: tenantData.tenantUserList.map((item) => ({
          uuid: item.userUuid,
          name: item.userName ?? '이름 없음',
        })),
        isEnrollOption: platformAttributeProperties.isUseEnrollOption,
        isTextBookOption: platformAttributeProperties.isUseTextBookOption,
        isInstructorOption: platformAttributeProperties.isUseInstructorOption,
        isPassOption: platformAttributeProperties.isUsePassOption,
        isCommunicationOption: platformAttributeProperties.isUseCommunicationOption,
        isLearningEnvOption: platformAttributeProperties.isUseLearningEnvOption,
        isLearningControlOption: platformAttributeProperties.isUseLearningControlOption,
        isRelatedCourseOption: platformAttributeProperties.isUseRelatedCourseOption,
        isAdminDataOption: platformAttributeProperties.isUseAdminDataOption,
        isCarTenantCustomOption: platformAttributeProperties.isUseCarTenantCustomOption,
        isRotemTenantCustomOption: platformAttributeProperties.isUseRotemTenantCustomOption,
        isOutsourcingTenantCustomOption:
        platformAttributeProperties.isUseOutsourcingTenantCustomOption,
        isWiaTenantCustomOption: platformAttributeProperties.isUseWiaTenantCustomOption,
        isAutoeverTenantCustomOption: platformAttributeProperties.isUseAutoeverTenantCustomOption,
      });
    }
  }, [tenantData]);

  useEffect(() => {
    const init = async () => {
      const data = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      const defaultOption = data
        .filter((i) => i.value === 'KO' || i.value === 'EN')
        .map((item) => {
          return { label: item.cdContent, value: item.value, disabled: true };
        });
      const newOptions = data
        .filter((i) => {
          return i.value !== 'KO' && i.value !== 'EN';
        })
        .map((item) => {
          return { label: item.cdContent, value: item.value };
        });
      const newValues = [...defaultOption, ...newOptions];
      if (!isEqual(newValues, languageTypeList)) {
        setLanguageTypeList([...defaultOption, ...newOptions]);
      }
    };
    init();
  }, []);
  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('기본 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow
          provider={provider}
          name="tenantName"
          element={<DuplicateCheckInputFormField onDuplicationCheck={duplicateCheck} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="logoImageUrl" />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="tenantUserList"
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
        <FormRow provider={provider} name="tenantTagList" />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="companyTenantList"
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
        <FormRow
          provider={provider}
          name="isUsed"
          className={dynamicFormStyles.form_item_horizontal}
        />
        <FormRow provider={provider} name="fileStorageTypeChannelList" />
        <FormRow provider={provider} name="fileStorageTypeBase" />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="tenantDesc"
          element={<TextareaFormField resize="none" />}
        />
      </ContentsRow>
      <FormSubTitle label={t('시스템 설정')} lineType="dark" />
      <ContentsRow>
        <FormRow
          provider={provider}
          name="device"
          element={<CheckboxGroupFormField disabled={true} />}
        />
        <FormRow provider={provider} name="useCategory" />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="langCountryCodeTypeList"
          element={<CheckboxGroupFormField options={languageTypeList} />}
        />
      </ContentsRow>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow
          provider={provider}
          name={'isEnrollOption'}
          element={
            <>
              {t('허용')}
              <Switch disabled={true} checked={true} />
            </>
          }
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isEnrollOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('승인')} guideText={t('수강신청 결재라인을 설정합니다.')}/>
          <FormItem label={t('정원')} guideText={t('수강 신청 정원 사용 여부를 설정합니다.')}/>
          <FormItem label={t('수강신청 대기')} guideText={t('수강 신청 대기 자동 모드, 수동 모드를 설정합니다.')}/>
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('차수 중복 수강')} guideText={t('동일 차수 종북 학습 여부를 설정합니다.')}/>
          <FormItem label={t('사전 레벨 테스트')} guideText={t('수강신청 학습 전 레벨 테스트 진행 여부를 설정합니다.')}/>
          <FormItem label={t('교재 배송지 수집')} guideText={t('교재 배송지 주소 수집 여부를 설정합니다.')}/>
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isTextBookOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isTextBookOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('교재명')} guideText={t('교재명을 설정합니다.')} />
          <FormItem label={t('교재비')} guideText={t('교재 비용을  설정합니다.')} />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isInstructorOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isInstructorOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('강사')} guideText={t('강사가 과정을 진행 시 강사를 설정합니다.')} />
          <FormItem label={t('튜터')} guideText={t('튜터가 과정을 진행 시 튜터를 설정합니다.')} />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow
          provider={provider}
          name={'isPassOption'}
          element={
            <>
              {t('허용')}
              <Switch disabled={true} checked={true} />
            </>
          }
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isPassOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('이수 처리 설정')} guideText={t('과정 학습 이수 처리 여부를 설정합니다.')} />
          <FormItem label={t('인정 학습시간')} guideText={t('과정 학습 시 학습 시간 인정 시간을 설정합니다.')} />
          <FormItem label={t('학습 포인트')} guideText={t('과정 학습 시 자급하는 포인트를 설정합니다.')} />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('수료증 제공')} guideText={t('과정 학습 이수 완료 시 수료증 제공 여부를 설정합니다.')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isCommunicationOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isCommunicationOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('커뮤니티 및 공유 설정')} guideText={t('과정 상세의 공지사항, 커뮤니티 등을 설정합니다.')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isLearningEnvOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isLearningEnvOption', value: true }]}
      >
        <ContentsRow>
          <FormItem label={t('기기 제한')} guideText={t('PC, 모바일 등 학습 가능한 기기를 설정합니다.')} />
          <FormItem label={t('네트워크 제한')} guideText={t('과정 학습 시 사내망, 사외망 접속 제한을 설정합니다.')} />
          <FormItem label={t('학습시간 제한')} guideText={t('근무시간 기준 학습시간 제한을 설정합니다.')} />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('복습 제한')} guideText={t('과정 복습에 제한을 설정합니다.')} />
          <FormItem label={t('화면 캡쳐 방지')} guideText={t('학습창 화면 캡쳐 방지 여부를 설정합니다.')} />
          <FormItem label={t('학습전 보안 서약')} guideText={t('학습전 보안 서약 여부를 설정합니다.')} />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isLearningControlOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isLearningControlOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('1일 진도제한')} guideText={t('1일 진도제한 여부를 설정합니다.')} />
          <FormItem label={t('진도 초기화')} guideText={t('학습한 과정의 진도 초기화 여부를 설정합니다.')} />
          <FormItem label={t('순차 학습')} guideText={t('과정 기준 순서로 학습 진행 여부를 설정합니다.')} />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('동영상 탐색바 제한')} guideText={t('동영상 탐색바의 기능 제한을 설정합니다.')} />
          <FormItem label={t('동영상 배속 제한')} guideText={t('동영상 학습 시 재생 배속 제한을 설정합니다.')} />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isRelatedCourseOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isRelatedCourseOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('사전 필수 과정')} guideText={t('과정 학습 전 필수 학습 과정을 설정합니다.')} />
          <FormItem label={t('연관 학습')} guideText={t('등록 과정과 연관된 학습 과정을 설정합니다.')} />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isAdminDataOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isAdminDataOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('HMG 과정 데이터 표준 분류')} guideText={t('과정 표준 분류를 설정합니다.')} />
          <FormItem label={t('1인당 교육비')} guideText={t('1인당 교육비 사용 금액을 설정합니다.')} />
          <FormItem label={t('고용보험 환급')} guideText={t('고용보험 환급 대상 과정 여부를 설정합니다.')} />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('과정 플래그')} guideText={t('과정 플래그 기능을 설정합니다.')} />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isCarTenantCustomOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isCarTenantCustomOption', value: true }]}>
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
        <FormRow provider={provider} name={'isRotemTenantCustomOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isRotemTenantCustomOption', value: true }]}>
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
        <FormRow provider={provider} name={'isOutsourcingTenantCustomOption'} />
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
        <FormRow provider={provider} name={'isWiaTenantCustomOption'} />
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
        <FormRow provider={provider} name={'isAutoeverTenantCustomOption'} />
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
    </form>
  );
};

export const TenantDetailBase = forwardRef(TenantDetailBaseComponent);

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantName',
      type: 'custom',
      label: t('테넌트명'),
      value: { fieldValue: '', checkState: DuplicateState.needInput },
      format: 'object',
      placeholder: '',
      maxLength: 150,
    },
    {
      name: 'logoImageUrl',
      label: t('테넌트 로고'),
      type: 'thumbnail-public',
      s3Path: S3_PATH['public/image/thumbnail'],
      value: [],
      tooltip: t('테넌트에 사용할 로고로 파일 1개만 등록할 수 있습니다.'),
      description:
        '파일 사이즈 92x32 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50MB',
    },
    {
      name: 'tenantUserList',
      label: t('테넌트 담당자'),
      type: 'custom',
      format: 'array',
      value: [],
      placeholder: t('담당자를 선택해주세요.'),
    },
    {
      name: 'tenantTagList',
      type: 'text',
      label: t('테넌트 정산 태그'),
      value: '',
      placeholder: '',
      maxLength: 150,
    },
    {
      name: 'companyTenantList',
      label: t('회사 선택'),
      type: 'custom',
      format: 'array',
      value: [],
      tooltip: t(
        '테넌트 소속 회사를 여러개 선택할 수 있습니다. 회사가 여러 개인 경우 회사별로 개별 설정이 필요합니다.',
      ),
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('테넌트 사용'),
      value: true,
      format: 'boolean',
      tooltip: t(
        '테넌트 사용이 ON이면 학습자 사이트에 로그인 할 수 있으며, OFF이면 로그인 할 수 없습니다.',
      ),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
      guideText: t('테넌트 사용 여부를 설정할 수 있습니다.'),
    },
    {
      name: 'isSecurityPledge',
      type: 'switch',
      label: t('보안 서약 사용'),
      value: true,
      format: 'boolean',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
      guideText: t('보안 서약  사용 여부를 설정할 수 있습니다.'),
    },
    {
      name: 'fileStorageTypeChannelList',
      type: 'checkbox-group',
      label: t('파일 저장 설정(채널)'),
      format: 'array',
      value: [],
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.FileStorageType'],
      },
    },
    {
      name: 'fileStorageTypeBase',
      type: 'radio-group',
      label: t('파일 저장 설정(채널 외)'),
      value: 'AWS_INTERNAL',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.FileStorageType'],
      },
    },
    {
      name: 'tenantDesc',
      type: 'textarea',
      label: t('설명'),
      value: '',
      maxLength: 2000,
      placeholder: '설명을 입력해 주세요.',
    },
    {
      name: 'device',
      type: 'checkbox-group',
      label: t('디바이스'),
      format: 'array',
      tooltip: t(
        'PC, 모바일, APP 모두 사용가능하며 과정 등록 시 PC, 모바일 학습 여부를 설정할 수 있습니다.',
      ),
      value: [],
      options: [
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
      ],
      showSelectAll: true,
    },
    {
      name: 'langCountryCodeTypeList',
      type: 'checkbox-group',
      label: t('언어'),
      format: 'array',
      tooltip: t(
        '테넌트에서 사용할 언어를 선택하고, 선택한 언어에서 다국어 설정을 할 수 있습니다.',
      ),
      value: [],
      showSelectAll: true,
      cols: 6,
    },
    {
      name: 'useCategory',
      type: 'checkbox-group',
      label: t('카테고리 사용 여부'),
      format: 'array',
      tooltip: '테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다',
      value: [],
      options: [
        {
          value: EnUseCategory.isCommonCategory,
          label: '공통 카테고리',
        },
        {
          value: EnUseCategory.isTenantCategory,
          label: '테넌트 카테고리',
        },
      ],
      showSelectAll: true,
    },
    {
      name: 'isEnrollOption', // 수강신청
      type: 'switch',
      label: '수강신청',
      tooltip: t('과정 등록 필수 값으로 사용 여부 수정이 불가합니다.'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미사용')),
      },
    },
    {
      name: 'isTextBookOption', // 교재
      type: 'switch',
      label: '교재',
      tooltip: t('교재 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isInstructorOption', // 강사
      type: 'switch',
      label: '강사',
      tooltip: t('강사 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isPassOption', // 이수 기준
      type: 'switch',
      label: '이수 기준',
      tooltip: t('과정 등록 필수 값으로 사용 여부 수정이 불가합니다.'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isCommunicationOption', // 커뮤니티
      type: 'switch',
      label: '커뮤니티',
      tooltip: t('커뮤니티 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isLearningEnvOption', // 학습환경
      type: 'switch',
      label: '학습환경',
      tooltip: t('학습환경 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isLearningControlOption', // 학습제어
      type: 'switch',
      label: '학습제어',
      tooltip: t('학습제어 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isRelatedCourseOption', // 사전/연관학습
      type: 'switch',
      label: '사전/연관학습',
      tooltip: t('사전/연관학습 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isAdminDataOption', // 행정 항묵
      type: 'switch',
      label: '행정 항목',
      tooltip: t('행정항목 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isCarTenantCustomOption', // 완성차 테넌트 전용 항목
      type: 'switch',
      label: '완성차 테넌트 전용 항목',
      tooltip: t('완성차 테넌트 전용 항목의 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isRotemTenantCustomOption', // 로템 테넌트 전용 항목
      type: 'switch',
      label: '로템 테넌트 전용 항목',
      tooltip: t('로템 테넌트 전용 항목의 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isOutsourcingTenantCustomOption', // 위탁 테넌트 전용 항목
      type: 'switch',
      label: '위탁 테넌트 전용 힝목',
      tooltip: t('위탁 테넌트 전용 힝목의 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isWiaTenantCustomOption', // 위아 테넌트 전용 항목
      type: 'switch',
      label: '위아 테넌트 전용 항목',
      tooltip: t('위아 테넌트 전용 항목의 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
    {
      name: 'isAutoeverTenantCustomOption', // 오토에버 테넌트 전용 항목
      type: 'switch',
      label: '오토에버 테넌트 전용 항목',
      tooltip: t('오토에버 테넌트 전용 항목의 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('허용') : t('미허용')),
      },
    },
  ],
  validator: {
    tenantName: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
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
    },

    logoImageUrl: {
      required: true,
      conditions: [
        {
          fn: (values) => {
            console.log('### logoImageUrl => ', values)
            if (values.logoImageUrl.length == 0) return true;
            return false;
          },
          message: t('테넌트 로고 이미지를 등록 해주세요.'),
        },
      ],
    },
    tenantUserList: { required: true },
    tenantTagList: { required: true },
    companyTenantList: { required: true },
    isUsed: { required: true },
    fileStorageTypeChannelList: { required: true },
    device: {
      required: {
        fn: (values) => {
          return (
            !values[EnDeviceType.isApp] &&
            !values[EnDeviceType.isMobile] &&
            !values[EnDeviceType.isPc]
          );
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
    useCategory: {
      required: {
        fn: (values) => {
          return !values[EnUseCategory.isCommonCategory] && !values[EnUseCategory.isTenantCategory];
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
    langCountryCodeTypeList: {
      required: {
        fn: (values) => {
          return values.langCountryCodeTypeList.length === 0;
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
  },
};
