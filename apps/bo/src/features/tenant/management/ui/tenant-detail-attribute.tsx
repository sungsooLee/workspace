import { FC, useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import {
  Button,
  ContentsRow,
  Input,
  DynamicFormField,
  useModal,
  CheckboxGroupFormField,
  Tooltip,
  ContentsRowItem,
  Switch,
  RadioGroupFormField,
} from '@learnway/ui';
import { CODE_GROUP, DynamicFormConfig, useCodeStore, useDynamicForm } from '@learnway/hooks';

import { FormRow, ContentsHistoryInfoFormField, FormSubTitle } from '@shared/ui';

import { EnDeviceType, EnUseCategory } from '@types';
import { TenantDetailAttributeCompany } from './tenant-detail-attribute-company';

/** Hook 정의 */
import {
  useTenantAttributeCompany,
  useUpdateTenantAttributeCompany,
} from '@entities/tenant/service/tenant-attribute.hook';
import { IcoAlertCircle } from '@learnway/icons';
import { defaultOptions } from '@uppy/core/lib/Restricter';
import { useFetchTenant } from '@entities/tenant';
import { FormDisplay } from '@features/form';

/**
 * 화면번호: NLP_BO_TMS_1003_00_04 (과정등록 연관 설정 figma: NLP_BO_TMS_1003_00-04)
 * @param props
 * @param ref
 * @returns
 */
const TenantDetailAttributeComponent = (props: any, ref: any) => {
  const routerState = useRouterState();
  const tenantId = routerState.location.state?.tenantId;
  const tenantName = routerState.location.state?.tenantName;

  const [langCountryCodeTypeListOptions, setLangCountryCodeTypeListOptions] = useState<any[]>();
  const [langOptions, setLangOptions] = useState<any[]>();
  const [workTenantId, setWorkTenantId] = useState<number>();

  const { data: attributeData, refetch } = useTenantAttributeCompany(workTenantId);

  const formRef = useRef<HTMLFormElement>(null);

  const { open: openModal, confirm: openConfirm } = useModal();

  const { getCode } = useCodeStore();
  const { provider, fetchData, onSubmit, onFormChange, getValues } = useDynamicForm(formConfig);
  const { provider: pBase, fetchData: fetchBaseData } = useDynamicForm(formBaseConfig);
  const { provider: pTerms, fetchData: fetchTermsData } = useDynamicForm(formTermsConfig);

  const { update } = useUpdateTenantAttributeCompany(tenantId, {
    onSuccess: (data: any) => {
      refetch();
    },
  });

  useImperativeHandle(ref, () => ({
    saveData() {
      const form: any = formRef.current;
      if (form) {
        console.log('formValue');
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
  }));

  const handleOnSubmit = async (payload: any) => {
    console.log('payload {} => ', payload);
    if (await openConfirm('저장 하시겠습니까?')) {
      update(payload);
    }
  };

  useEffect(() => {
    if (attributeData) {
      console.log('attributeData ', attributeData);
      // tenantBase 정보 설정
      const tenantInfo = attributeData.tenantInfo;
      const device = [];
      const useCategory = [];
      tenantInfo.isPc && device.push(EnDeviceType.isPc);
      tenantInfo.isMobile && device.push(EnDeviceType.isMobile);
      tenantInfo.isApp && device.push(EnDeviceType.isApp);
      tenantInfo.isCommonCategory && useCategory.push(EnUseCategory.isCommonCategory);
      tenantInfo.isTenantCategory && useCategory.push(EnUseCategory.isTenantCategory);

      fetchBaseData({ ...tenantInfo, device: device, useCategory: useCategory });

      const langValues = tenantInfo?.langCountryCodeTypeList ?? [];
      const options = langCountryCodeTypeListOptions?.filter((item: any) =>
        langValues.includes(item.value),
      );
      setLangOptions(options);

      // properties 변경 설정
      fetchData({ ...attributeData });
    }
  }, [attributeData]);

  useEffect(() => {
    (async () => {
      const data = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      const defaultOptions = data.map((item: any) => {
        return { label: item.cdContent, value: item.value, disabled: true };
      });
      setLangCountryCodeTypeListOptions(defaultOptions);
      setWorkTenantId(tenantId);
    })();
  }, []);

  useEffect(() => {
    const langValue = getValues('langCountryCodeTypeList');
  }, [langCountryCodeTypeListOptions]);

  return (
    <>
      <FormSubTitle label={t('테넌트 기본 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={pBase} name="tenantName" element={<Input disabled={true} />} />
        <FormRow
          provider={pBase}
          name="isUsed"
          className={dynamicFormStyles.form_item_horizontal}
          element={<Switch disabled={true} />}
        />
        <FormRow
          provider={pBase}
          name="fileStorageTypeChannelList"
          element={<CheckboxGroupFormField disabled={true} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={pBase}
          name="fileStorageTypeBase"
          element={<RadioGroupFormField disabled={true} />}
        />
        <div className={formStyles.form_item}></div>
        <div className={formStyles.form_item}></div>
      </ContentsRow>
      <FormSubTitle label={t('시스템 설정')} lineType={'dark'} />
      <ContentsRow>
        <FormRow
          provider={pBase}
          name="device"
          element={<CheckboxGroupFormField disabled={true} />}
        />
        <FormRow
          provider={pBase}
          name="useCategory"
          element={<CheckboxGroupFormField disabled={true} />}
        />
        <div className={formStyles.form_item}></div>
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={pBase}
          name="langCountryCodeTypeList"
          element={<CheckboxGroupFormField options={langOptions} disabled={true} />}
        />
      </ContentsRow>
      <FormSubTitle label={t('약관 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow
          provider={pTerms}
          name="terms"
          element={<CheckboxGroupFormField disabled={true} />}
        />
      </ContentsRow>

      <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
        <FormSubTitle
          label={t('수강신청')}
          lineType={'dark'}
          titleNode={
            <Tooltip
              className={styles.tooltip}
              content={t('과정 등록 필수 값으로 사용 여부 수정이 불가합니다. ')}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          }
          actionNode={<FormRow provider={provider} name={'isEnrollOption'} />}
        />
        <FormDisplay provider={provider} dependencies={[{ name: 'isEnrollOption', value: true }]}>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('승인')}</span>
              </label>
              <p className={formStyles.guide_text}>{t('수강신청 결재라인을 설정합니다.')}</p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('정원')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('수강 신청 정원 사용 여부를 설정합니다. ')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('수강신청 대기')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('수강 신청 대기 자동 모드, 수동 모드를 설정합니다. ')}
              </p>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('차수 중복 수강')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('동일 차수 종북 학습 여부를 설정합니다. ')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('사전 레벨 테스트')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('수강신청 학습 전 레벨 테스트 진행 여부를 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('교재 배송지 수집 ')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('교재 배송지 주소 수집 여부를 설정합니다.')}
              </p>
            </div>
          </ContentsRow>
        </FormDisplay>

        <FormSubTitle
          label={t('교재')}
          lineType={'dark'}
          titleNode={
            <Tooltip
              className={styles.tooltip}
              content={t(
                '테넌트 상세 설정이 채널 개설 시 기본 출력되며, 채널에서 최종 사용 여부를 설정할 수 있습니다. ',
              )}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          }
          actionNode={<FormRow provider={provider} name={'isTextBookOption'} />}
        />
        <FormDisplay provider={provider} dependencies={[{ name: 'isTextBookOption', value: true }]}>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('교재명')}</span>
              </label>
              <p className={formStyles.guide_text}>{t('교재명을 설정합니다.')}</p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('교재비')}</span>
              </label>
              <p className={formStyles.guide_text}>{t('교재 비용을  설정합니다.')}</p>
            </div>
            <div className={formStyles.form_item}></div>
          </ContentsRow>
        </FormDisplay>
        <FormSubTitle
          label={t('강사')}
          lineType={'dark'}
          titleNode={
            <Tooltip
              className={styles.tooltip}
              content={
                <pre>
                  {t(
                    '테넌트 상세 설정이 채널 개설 시 기본 출력되며, 채널에서 최종 사용 여부를 설정할 수 있습니다. ',
                  )}
                </pre>
              }
            >
              <Button onlyIcon>
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          }
          actionNode={<FormRow provider={provider} name={'isInstructorOption'} />}
        />
        <FormDisplay
          provider={provider}
          dependencies={[{ name: 'isInstructorOption', value: true }]}
        >
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('강사')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('강사가 과정을 진행 시 강사를 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('튜터')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('튜터가 과정을 진행 시 튜터를 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}></div>
          </ContentsRow>
        </FormDisplay>

        <FormSubTitle
          label={t('이수 기준')}
          lineType={'dark'}
          titleNode={
            <Tooltip
              className={styles.tooltip}
              content={<pre>{t('과정 등록 필수 값으로 사용 여부 수정이 불가합니다.')}</pre>}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          }
          actionNode={<FormRow provider={provider} name={'isPassOption'} />}
        />
        <FormDisplay provider={provider} dependencies={[{ name: 'isPassOption', value: true }]}>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('이수 처리 설정')}</span>
              </label>
              <p className={formStyles.guide_text}>{t('과정 학습 이수 처리 여부를 설정합니다.')}</p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('인정 학습시간')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('과정 학습 시 학습 시간 인정 시간을 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('학습 포인트')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('과정 학습 시 자급하는 포인트를 설정합니다.')}
              </p>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('수료증 제공')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('과정 학습 이수 완료 시 수료증 제공 여부를 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}></div>
            <div className={formStyles.form_item}></div>
          </ContentsRow>
        </FormDisplay>

        <FormSubTitle
          label={t('커뮤니티')}
          lineType={'dark'}
          titleNode={
            <Tooltip
              className={styles.tooltip}
              content={
                <pre>
                  {t(
                    '테넌트 상세 설정이 채널 개설 시 기본 출력되며, 채널에서 최종 사용 여부를 설정할 수 있습니다. ',
                  )}
                </pre>
              }
            >
              <Button onlyIcon>
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          }
          actionNode={<FormRow provider={provider} name={'isCommunicationOption'} />}
        />
        <FormDisplay
          provider={provider}
          dependencies={[{ name: 'isCommunicationOption', value: true }]}
        >
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('커뮤니티 및 공유 설정')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('과정 상세의 공지사항, 커뮤니티 등을 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}></div>
            <div className={formStyles.form_item}></div>
          </ContentsRow>
        </FormDisplay>

        <FormSubTitle
          label={t('학습환경')}
          lineType={'dark'}
          titleNode={
            <Tooltip
              className={styles.tooltip}
              content={
                <pre>
                  {t(
                    '테넌트 상세 설정이 채널 개설 시 기본 출력되며, 채널에서 최종 사용 여부를 설정할 수 있습니다.',
                  )}
                </pre>
              }
            >
              <Button onlyIcon>
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          }
          actionNode={<FormRow provider={provider} name={'isLearningEnvOption'} />}
        />
        <FormDisplay
          provider={provider}
          dependencies={[{ name: 'isLearningEnvOption', value: true }]}
        >
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('기기 제한')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('PC, 모바일 등 학습 가능한 기기를 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('네트워크 제한')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('과정 학습 시 사내망, 사외망 접속 제한을 설정합니다. ')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('학습시간 제한')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('근무시간 기준 학습시간 제한을 설정합니다.')}
              </p>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('복습 제한')}</span>
              </label>
              <p className={formStyles.guide_text}>{t('과정 복습에 제한을 설정합니다.')}</p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('화면 캡쳐 방지')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('학습창 화면 캡쳐 방지 여부를 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('학습전 보안 서약')}</span>
              </label>
              <p className={formStyles.guide_text}>{t('학습전 보안 서약 여부를 설정합니다 ')}</p>
            </div>
          </ContentsRow>
        </FormDisplay>

        <FormSubTitle
          label={t('학습제어')}
          lineType={'dark'}
          titleNode={
            <Tooltip
              className={styles.tooltip}
              content={
                <pre>
                  {t(
                    '테넌트 상세 설정이 채널 개설 시 기본 출력되며,\n 채널에서 최종 사용 여부를 설정할 수 있습니다.',
                  )}
                </pre>
              }
            >
              <Button onlyIcon>
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          }
          actionNode={<FormRow provider={provider} name={'isLearningControlOption'} />}
        />
        <FormDisplay
          provider={provider}
          dependencies={[{ name: 'isLearningControlOption', value: true }]}
        >
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('1일 진도제한')}</span>
              </label>
              <p className={formStyles.guide_text}>{t('1일 진도제한 여부를 설정합니다.')}</p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('진도 초기화')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('학습한 과정의 진도 초기화 여부를 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('순차 학습')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('과정 기준 순서로 학습 진행 여부를 설정합니다.')}
              </p>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('동영상 탐색바 제한')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('동영상 탐색바의 기능 제한을 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('동영상 배속 제한')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('동영상 학습 시 재생 배속 제한을 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}></div>
          </ContentsRow>
        </FormDisplay>

        <FormSubTitle
          label={t('사전/연관학습')}
          lineType={'dark'}
          titleNode={
            <Tooltip
              className={styles.tooltip}
              content={
                <pre>
                  {t(
                    '테넌트 상세 설정이 채널 개설 시 기본 출력되며, 채널에서 최종 사용 여부를 설정할 수 있습니다.',
                  )}
                </pre>
              }
            >
              <Button onlyIcon>
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          }
          actionNode={<FormRow provider={provider} name={'isRelatedCourseOption'} />}
        />
        <FormDisplay
          provider={provider}
          dependencies={[{ name: 'isRelatedCourseOption', value: true }]}
        >
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('사전 필수 과정')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('과정 학습 전 필수 학습 과정을 설정합니다.')}
              </p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('연관 학습')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('등록 과정과 연관된 학습 과정을 설정합니다. ')}
              </p>
            </div>
            <div className={formStyles.form_item}></div>
          </ContentsRow>
        </FormDisplay>

        <FormSubTitle
          label={t('행정 항목')}
          lineType={'dark'}
          titleNode={
            <Tooltip
              className={styles.tooltip}
              content={
                <pre>
                  {t(
                    '테넌트 상세 설정이 채널 개설 시 기본 출력되며, 채널에서 최종 사용 여부를 설정할 수 있습니다.',
                  )}
                </pre>
              }
            >
              <Button onlyIcon>
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          }
          actionNode={<FormRow provider={provider} name={'isAdminDataOption'} />}
        />
        <FormDisplay
          provider={provider}
          dependencies={[{ name: 'isAdminDataOption', value: true }]}
        >
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('HMG 과정 데이터 표준 분류')}</span>
              </label>
              <p className={formStyles.guide_text}>{t('과정 표준 분류를 설정합니다.')}</p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('1인당 교육비 ')}</span>
              </label>
              <p className={formStyles.guide_text}>{t('1인당 교육비 사용 금액을 설정합니다.')}</p>
            </div>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('고용보험 환급')}</span>
              </label>
              <p className={formStyles.guide_text}>
                {t('고용보험 환급 대상 과정 여부를 설정합니다.')}
              </p>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
                <span className={styles.form_text}> {t('과정 플래그')}</span>
              </label>
              <p className={formStyles.guide_text}>{t('과정 플래그 기능을 설정합니다.')}</p>
            </div>
            <div className={formStyles.form_item}></div>
            <div className={formStyles.form_item}></div>
          </ContentsRow>
        </FormDisplay>
      </form>
    </>
  );
};

export const TenantDetailAttribute = forwardRef(TenantDetailAttributeComponent);

const formBaseConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트명'),
      value: '',
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('테넌트 사용'),
      tooltip: t(
        '테넌트 사용이 ON이면 학습자 사이트에 로그인 할 수 있으며, OFF이면 로그인 할 수 없습니다.',
      ),
      value: true,
      guideText: t('테넌트 사용 여부는 플랫폼 담당자가 변경할 수 있습니다.'),
    },
    {
      name: 'fileStorageTypeChannelList',
      type: 'checkbox-group',
      label: t('파일 저장 설정(채널)'),
      tooltip: t(
        '채널 관련 파일 저장할 경로를 선택합니다. 최종 설정은 채널에서 선택하며 체크박스 선택한 값에서 1개를 채널 개설 시 선택합니다.',
      ),
      value: [],
      format: 'array',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.FileStorageType'],
      },
    },
    {
      name: 'fileStorageTypeBase',
      type: 'checkbox-group',
      label: t('파일 저장 설정(채널 외)'),
      tooltip: t('채널 외 커뮤니티, 소모임 등 파일 업로드 할 저장 경로를 선택합니다. '),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.FileStorageType'],
      },
    },
    {
      name: 'device',
      type: 'checkbox-group',
      label: t('디바이스'),
      format: 'array',
      tooltip: t('테넌트 등록 시 설정한 디바이스 선택 값입니다.'),
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
      name: 'langCountryCodeTypeList',
      type: 'checkbox-group',
      label: t('언어'),
      format: 'array',
      tooltip: t(
        '테넌트에서 사용할 언어를 선택하고, 선택한 언어에서 다국어 설정을 할 수 있습니다.',
      ),
      value: [],
    },
  ],
  validator: {
    isUsed: true,
    device: true,
    useCategory: true,
    langCountryCodeTypeList: true,
    fileStorageTypeChannelList: true,
    fileStorageTypeBase: true,
  },
};

const formTermsConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'terms',
      type: 'checkbox-group',
      label: t('약관 정보'),
      value: '',
      options: [
        { label: '이용약관_v1.25', value: '0' },
        { label: '개인정보 처리방침(국내)_v1.25', value: '1' },
        { label: '개인정보 처리방침(글로벌)_v1.00', value: '2' },
        { label: '고유식별 정보처리 동의_v1.25', value: '3' },
      ],
    },
  ],
};

const formConfig: DynamicFormConfig = {
  builders: [
    { name: 'tenantId', type: 'hidden', format: 'number', value: 0 },
    {
      name: 'isEnrollOption', // 수강신청
      type: 'switch',
      label: '',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isTextBookOption', // 교재
      type: 'switch',
      label: '',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isInstructorOption', // 강사
      type: 'switch',
      label: '',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isPassOption', // 이수 기준
      type: 'switch',
      label: '',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isCommunicationOption', // 커뮤니티
      type: 'switch',
      label: '',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isLearningEnvOption', // 학습환경
      type: 'switch',
      label: '',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isLearningControlOption', // 학습제어
      type: 'switch',
      label: '',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isRelatedCourseOption', // 사전/연관학습
      type: 'switch',
      label: '',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isAdminDataOption', // 행정 항묵
      type: 'switch',
      label: '',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
  ],
};
