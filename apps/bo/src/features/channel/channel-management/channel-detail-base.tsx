import { DuplicateCheckInputFormField, DuplicateState, FormDisplay } from '@features/form';
import { CODE_GROUP, DynamicFormConfig, S3_PATH, useDynamicForm } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { FormSubTitle } from '@learnway/ui/base-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import {
  ChipListModalSelectorFormField,
  RadioGroupFormField,
  TextareaFormField,
} from '@learnway/ui/form-field';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { useToast } from '@learnway/ui/toast';
import {
  ChipListFormField,
  FormItem,
  FormRow,
  TenantShuttleModal,
  UserShuttleModal,
} from '@shared/ui';
import { EnFormMode } from '@types';
import { t } from 'i18next';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChannelService from '@entities/channel/api/channel';
import RequestChannelService from '@entities/channel/api/request-channel';
import { useCreateChannel, useUpdateChannel } from '@entities/channel/service/channel.hook';
import { useFetchAuthUser } from '@learnway/auth/entities';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { EnButtonLayout } from '@pages/_layout/tenant/channel/management/detail.lazy';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { useWatch } from 'react-hook-form';
import { getChannelUrl } from '../channel-application/service/channel-application.service';

export enum EnChannelRegisterMethod {
  REQUEST = 'REQUEST',
  MANUAL = 'MANUAL',
}

interface ChannelDetailBaseProps {
  mode: EnFormMode;
  method?: EnChannelRegisterMethod;
  requestId?: string;
  onButtonLayoutChange?: (layout: EnButtonLayout) => void;
}

const ChannelDetailBaseComponent = (props: ChannelDetailBaseProps, ref: any) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: loginUser } = useFetchAuthUser();
  const { confirm: openConfirm } = useModal();
  const { open: openToast } = useToast();

  const { provider, control, updateFormData, onSubmit, onFormChange, getValues, setValue } =
    useDynamicForm(formConfig());

  const formRef = useRef<HTMLFormElement>(null);

  const routerState = useRouterState();

  const [channelUuid, setChannelUuid] = useState(routerState.location.state?.channelUuid);
  const [channelData, setChannelData] = useState<any>({});
  const [requestChannelData, setRequestChannelData] = useState<any>({});

  const { update: updateChannel } = useUpdateChannel({
    onSuccess: (data: any) => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      setChannelUuid(data.channelUuid);
    },
  });

  const { create: createChannel } = useCreateChannel({
    onSuccess: (data: any) => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      router.navigate({
        to: '/tenant/channel/management/detail',
        state: { channelUuid: data.channelUuid },
      });
    },
  });

  const watchedChannelTenatMappingType = useWatch({
    control,
    name: 'channelTenatMappingType',
  });

  useEffect(() => {
    if (props.mode === EnFormMode.ADD && props.method === EnChannelRegisterMethod.REQUEST) {
      (async () => {
        if (props.requestId)
          setRequestChannelData(
            await RequestChannelService.getRequestChannelDetail(props.requestId),
          );
      })();
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (channelUuid) setChannelData(await ChannelService.getChannelDetail(channelUuid));
    })();
  }, [channelUuid]);

  useEffect(() => {
    console.log('### props.method', props.method);
    props.onButtonLayoutChange && props.onButtonLayoutChange(EnButtonLayout.RESET_AND_SAVE);

    if (!loginUser) return;
    console.log('### loginUser', loginUser);

    const tenantList: any[] = [];
    if (loginUser.activeTenant) {
      tenantList.push({
        ...loginUser.activeTenant,
        isMainTenant: true,
        tenantName: t('{{name}} (대표)', { name: loginUser.activeTenant.tenantName }),
      });
    } else {
      if (loginUser.tenants && loginUser.tenants.length > 0) {
        const tenant = loginUser.tenants[0];
        tenantList.push({
          tenant,
          isMainTenant: true,
          tenantName: t('{{name}} (대표)', { name: tenant.tenantName }),
        });
      }
    }

    if (props.mode === EnFormMode.ADD) {
      console.log('### getValues', getValues());
      const initialData = {
        channelRequestId: '',
        tenantName: '',
        requestDate: '',
        channelLearningContent: '',
        channelPurposeContent: '',
        channelCreationType:
          props.method === EnChannelRegisterMethod.REQUEST ? 'REQUEST_CREATE' : 'MANUAL_CREATE',
        channelName: '',
        channelMainId: {
          fieldValue: '',
          checkState: 'needInput',
        },
        channelUrl: '',
        channelTenatMappingType: 'MAPPING_TENANT',
        tenantList,
        channelSecretType: 'NOT_SECRET',
        channelSubscriptionType: 'MANUAL',
        channelOwnerUserList: [],
        fileStorageType: 'AWS_INTERNAL',
        isUsed: false,
        isDisplay: false,
        channelProfileImageFileGroupUuid: '',
        channelHomeImageFileGroupUuid: '',
        channelDesc: '',
        channelTagList: [],
        isEnrollOption: false,
        isTextBookOption: true,
        isInstructorOption: true,
        isPassOption: false,
        isCommunicationOption: true,
        isLearningEnvOption: true,
        isLearningControlOption: true,
        isRelatedCourseOption: true,
        isAdminDataOption: true,
        isCarTenantCustomOption: false,
        isRotemTenantCustomOption: false,
        isOutsourcingTenantCustomOption: false,
        isWiaTenantCustomOption: false,
        isAutoeverTenantCustomOption: false,
      };
      if (
        props.method === EnChannelRegisterMethod.REQUEST &&
        Object.keys(requestChannelData).length > 0
      ) {
        console.log('####>>>> requestChannelData', requestChannelData);
        const requestedData = {
          ...initialData,
          ...requestChannelData,
          channelRequestId: String(requestChannelData.channelRequestId),
          requestDate: getDateToString(
            new Date(requestChannelData.createdDate),
            DATE_TIME_FORMAT.DATETIME_SEC,
          ),
          channelMainId: {
            fieldValue: requestChannelData.channelMainId,
            checkState: 'needInput',
          },
          channelUrl: getChannelUrl(requestChannelData.channelMainId),
        };
        updateFormData(requestedData);
      } else updateFormData(initialData);
    } else if (
      props.mode === EnFormMode.VIEW &&
      channelData &&
      Object.keys(channelData).length > 0
    ) {
      console.log('#### channelData', channelData);
      const initialData = {
        ...channelData,
        channelRequestId: '',
        tenantName: '',
        requestDate: '',
        channelLearningContent: '',
        channelPurposeContent: '',
        channelMainId: {
          fieldValue: channelData.channelMainId,
          checkState: DuplicateState.okStart,
        },
        channelUrl: getChannelUrl(channelData.channelMainId),
        tenantList: channelData.tenantList.map((tenant: any) => ({
          ...tenant,
          isMainTenant: tenant.isMainTenant,
          tenantName: tenant.isMainTenant
            ? t('{{name}} (대표)', { name: tenant.tenantName })
            : tenant.tenantName,
        })),
        channelOwnerUserList: channelData.channelOwnerUserList.map((user: any) => ({
          uuid: user.userUuid,
          name: user.userName,
        })),
        isEnrollOption: false,
        isTextBookOption: false,
        isInstructorOption: false,
        isPassOption: false,
        isCommunicationOption: false,
        isLearningEnvOption: false,
        isLearningControlOption: false,
        isRelatedCourseOption: false,
        isAdminDataOption: false,
        isCarTenantCustomOption: false,
        isRotemTenantCustomOption: false,
        isOutsourcingTenantCustomOption: false,
        isWiaTenantCustomOption: false,
        isAutoeverTenantCustomOption: false,
      };
      Object.keys(channelData.channelProperties).forEach((key) => {
        initialData[key] = channelData.channelProperties[key] ?? false;
      });
      updateFormData(initialData);
    }
  }, [props, channelData, requestChannelData]);

  useImperativeHandle(ref, () => ({
    saveData() {
      const form = formRef.current;
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
  }));

  const duplicateCheck = async (channelMainId: string) => {
    const result: boolean = await ChannelService.existsChannelMainId(channelMainId);
    if (result) return DuplicateState.duplicated;
    else {
      setValue('channelUrl', getChannelUrl(channelMainId));
      return DuplicateState.ok;
    }
  };

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);
    const commonPayload = {
      ...data,
      channelMainId: data.channelMainId.fieldValue,
      tenantList: data.tenantList.map((tenant: any) => ({
        tenantId: tenant.tenantId,
        tenantName: tenant.tenantName,
        isMainTenant: tenant.isMainTenant ?? false,
      })),
      channelOwnerUserList: data.channelOwnerUserList.map((user: any) => ({
        userUuid: user.uuid,
        userName: user.name,
      })),
      channelTagList: data.channelTagList.map((tag: any) =>
        typeof tag === 'string' ? { tagName: tag } : tag,
      ),
      channelProperties: {
        isEnrollOption: data.isEnrollOption,
        isTextBookOption: data.isTextBookOption,
        isInstructorOption: data.isInstructorOption,
        isPassOption: data.isPassOption,
        isCommunicationOption: data.isCommunicationOption,
        isLearningEnvOption: data.isLearningEnvOption,
        isLearningControlOption: data.isLearningControlOption,
        isRelatedCourseOption: data.isRelatedCourseOption,
        isAdminDataOption: data.isAdminDataOption,
        isCarTenantCustomOption: data.isCarTenantCustomOption,
        isRotemTenantCustomOption: data.isRotemTenantCustomOption,
        isOutsourcingTenantCustomOption: data.isOutsourcingTenantCustomOption,
        isWiaTenantCustomOption: data.isWiaTenantCustomOption,
        isAutoeverTenantCustomOption: data.isAutoeverTenantCustomOption,
      },
    };

    let payload = {};
    if (props.mode === EnFormMode.ADD) {
      if (props.method === EnChannelRegisterMethod.MANUAL) payload = { ...commonPayload };
      else if (props.method === EnChannelRegisterMethod.REQUEST)
        payload = { ...commonPayload, channelRequestUuid: props.requestId };
    } else if (props.mode === EnFormMode.VIEW) payload = { ...commonPayload, channelUuid };
    console.log('#### payload', payload);

    if (
      await openConfirm({
        title: t('저장 하시겠습니까?'),
        content: t('입력한 정보로 저장합니다.'),
      })
    ) {
      if (props.mode === EnFormMode.ADD) createChannel(payload);
      else if (props.mode === EnFormMode.VIEW) updateChannel(payload);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      {props.mode === EnFormMode.ADD && props.method === EnChannelRegisterMethod.REQUEST && (
        <>
          <FormSubTitle label={t('채널 신청 정보')} lineType={'light'} />
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'channelRequestId'}
              element={<Input readOnly={true} />}
            >
              {/* <Button className={dynamicFormStyles.btn_find} variant={'gray'} size={'sm'}>
                {t('조회')}
              </Button> */}
            </FormRow>
            <FormRow provider={provider} name={'tenantName'} element={<Input readOnly={true} />} />
            <FormRow provider={provider} name={'requestDate'} element={<Input readOnly={true} />} />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'channelLearningContent'}
              element={<TextareaFormField readOnly={true} resize={'none'} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'channelPurposeContent'}
              element={<TextareaFormField readOnly={true} resize={'none'} />}
            />
          </ContentsRow>
        </>
      )}
      <FormSubTitle label={t('채널 기본 정보')} lineType={'light'} />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'channelCreationType'}
          element={<RadioGroupFormField disabled={true} />}
        />
        <FormRow provider={provider} name={'channelName'} />
        <FormRow
          provider={provider}
          name={'channelMainId'}
          element={
            <DuplicateCheckInputFormField
              type={'alphanumeric'}
              onDuplicationCheck={duplicateCheck}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'channelUrl'} element={<Input readOnly={true} />} />
        <FormRow
          provider={provider}
          name={'channelTenatMappingType'}
          element={
            <RadioGroupFormField
              disabled={
                props.method === EnChannelRegisterMethod.REQUEST ||
                loginUser?.activeRole?.roleType !== 'PLATFORM_MANAGER'
              }
            />
          }
        />
        <FormRow provider={provider} name={'channelSecretType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'channelSubscriptionType'} />
      </ContentsRow>
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
                isOptionHideCloseButton: (option: any) => option.isMainTenant === true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                content: <TenantShuttleModal />,
              }}
              disabled={watchedChannelTenatMappingType === 'MAPPING_TENANT'}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="channelOwnerUserList"
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
                content: <UserShuttleModal />,
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'fileStorageType'} />
        <FormRow
          provider={provider}
          name={'isUsed'}
          className={dynamicFormStyles.form_item_horizontal}
        />
        <FormRow
          provider={provider}
          name={'isDisplay'}
          className={dynamicFormStyles.form_item_horizontal}
        />
      </ContentsRow>

      <FormSubTitle label={t('채널 홈 정보')} />
      <ContentsRow>
        <FormRow provider={provider} name="channelProfileImageFileGroupUuid" />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="channelHomeImageFileGroupUuid" />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'channelDesc'}
          element={<TextareaFormField resize={'none'} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'channelTagList'}
          element={
            <ChipListFormField
              chipListConfig={{
                showInput: true,
                labelField: 'tagName',
                valueField: 'tagName',
                wordwrap: true,
              }}
              limitSize={20}
              limitPlaceholder={t('태그는 최대 20개까지 등록할 수 있습니다')}
            />
          }
        />
      </ContentsRow>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isEnrollOption'} />
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
            label={t('교재 배송지 수집 ')}
            guideText={t('교재 배송지 주소 수집 여부를 설정합니다.')}
          />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isTextBookOption'} />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isTextBookOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('교재명')} guideText={t('교재명을 설정합니다.')} />
          <FormItem label={t('교재비')} guideText={t('교재 비용을  설정합니다.')} />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isInstructorOption'} />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isInstructorOption', value: true }]}>
        <ContentsRow>
          <FormItem label={t('강사')} guideText={t('강사가 과정을 진행 시 강사를 설정합니다.')} />
          <FormItem label={t('튜터')} guideText={t('튜터가 과정을 진행 시 튜터를 설정합니다.')} />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isPassOption'} />
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
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isCommunicationOption'} />
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
        <FormRow provider={provider} name={'isLearningControlOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isLearningControlOption', value: true }]}
      >
        <ContentsRow>
          <FormItem label={t('1일 진도제한')} guideText={t('1일 진도제한 여부를 설정합니다.')} />
          <FormItem
            label={t('진도 초기화 ')}
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
        <FormRow provider={provider} name={'isRelatedCourseOption'} />
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
        <FormRow provider={provider} name={'isAdminDataOption'} />
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
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isCarTenantCustomOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isCarTenantCustomOption', value: true }]}
      >
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow type={'horizontal'} titleMode>
        <FormRow provider={provider} name={'isRotemTenantCustomOption'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'isRotemTenantCustomOption', value: true }]}
      >
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
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
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
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
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
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
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
        </ContentsRow>
        <ContentsRow>
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem label={t('테넌트 전용항목')} guideText={t('테넌트 전용 항목을 설정합니다.')} />
          <FormItem />
        </ContentsRow>
      </FormDisplay>

      {/* {props.mode === EnFormMode.VIEW && <ContentsHistoryInfoFormField />} */}
    </form>
  );
};

export const ChannelDetailBase = forwardRef(ChannelDetailBaseComponent);

const formConfig = (): DynamicFormConfig => ({
  builders: [
    {
      name: 'channelRequestId',
      type: 'text',
      label: t('신청 ID'),
      value: '',
      placeholder: '',
    },
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트'),
      value: '',
      placeholder: '',
    },
    {
      name: 'requestDate',
      type: 'text',
      label: t('신청일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelLearningContent',
      type: 'textarea',
      label: t('채널 학습 대상'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
    {
      name: 'channelPurposeContent',
      type: 'textarea',
      label: t('채널 목적'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
    //// 채널 기본 정보
    {
      name: 'channelCreationType',
      type: 'radio-group',
      label: t('채널 개설 방식'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.channel.ChannelCreationType'],
      },
    },
    {
      name: 'channelName',
      type: 'text',
      label: t('채널명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelMainId',
      type: 'custom',
      label: t('채널 핸들'),
      value: { fieldValue: '', checkState: DuplicateState.needInput },
      format: 'object',
      placeholder: '',
    },
    {
      name: 'channelUrl',
      type: 'text',
      label: t('채널 URL'),
      value: '',
      placeholder: t('채널 핸들 입력 시 자동 생성'),
    },
    {
      name: 'channelTenatMappingType',
      type: 'radio-group',
      label: t('채널 유형'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.channel.ChannelTenatMappingType'],
      },
    },
    {
      name: 'tenantList',
      label: t('테넌트'),
      type: 'custom',
      value: [],
      format: 'array',
    },
    {
      name: 'channelSecretType',
      type: 'radio-group',
      label: t('채널 구분'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.channel.ChannelSecretType'],
      },
      guideText: t('공개 채널은 테넌트 전체, 비밀 채널은 설정한 사용자만 이용할 수 있습니다.'),
    },
    {
      name: 'channelSubscriptionType',
      type: 'radio-group',
      label: t('구독 방식'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.channel.ChannelSubscriptionType'],
      },
      guideText: t('자동 구독은 채널 대상자를 구독자로 자동 설정합니다.'),
    },
    {
      name: 'channelOwnerUserList',
      label: t('채널 소유자'),
      type: 'custom',
      format: 'array',
      value: [],
      placeholder: '',
    },
    {
      name: 'fileStorageType',
      type: 'radio-group',
      label: t('업로드 파일 저장소(채널)'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.FileStorageType'],
      },
      guideText: t('HMG Cloud 선택 시 동시접속 제한이나, 속도 저하가 있을 수 있습니다.'),
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용 여부'),
      value: false,
      placeholder: '',
      guideText: t('채널이 사용 상태인 경우 과정을 등록할 수 있습니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'isDisplay',
      type: 'switch',
      label: t('노출 여부'),
      value: false,
      placeholder: '',
      guideText: t('채널이 노출 상태인 경우 학습자가 채널에 접속할 수 있습니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('노출') : t('비노출')),
      },
    },
    //// 채널 홈 정보
    {
      label: t('프로필'),
      name: 'channelProfileImageFileGroupUuid',
      type: 'thumbnail-list',
      max: 1,
      value: '',
      uuidType: 'group',
      uploadConfig: {
        affairType: 'PMS',
        s3Path: S3_PATH['public/image/channel/profile'],
        acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
        maxFileSize: 50 * 1024 * 1024,
      },
      guideText: t(
        '파일 사이즈 000 x 000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50 MB',
      ),
    },
    {
      label: t('이미지'),
      name: 'channelHomeImageFileGroupUuid',
      type: 'thumbnail-list',
      max: 1,
      value: '',
      uuidType: 'group',
      uploadConfig: {
        affairsType: 'PMS',
        s3Path: S3_PATH['public/image/channel/main'],
        acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
        maxFileSize: 50 * 1024 * 1024,
      },
      guideText: t(
        '파일 사이즈 000 x 000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50 MB',
      ),
    },
    {
      name: 'channelDesc',
      type: 'textarea',
      label: t('채널 안내'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
    {
      label: t('태그'),
      name: 'channelTagList',
      format: 'array',
      type: 'chip-list',
      guideText: t('태그는 최대 20개까지 등록할 수 있습니다.'),
      value: [],
    },
    //// 채널 추가 설정
    {
      name: 'isEnrollOption',
      type: 'switch',
      label: t('수강 신청'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t('과정 등록 필수 값으로 사용 여부 수정이 불가합니다.'),
    },
    {
      name: 'isTextBookOption',
      type: 'switch',
      label: t('교재'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t('교재 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
    },
    {
      name: 'isInstructorOption',
      type: 'switch',
      label: t('강사'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t('강사 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
    },
    {
      name: 'isPassOption',
      type: 'switch',
      label: t('이수 기준'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t('과정 등록 필수 값으로 사용 여부 수정이 불가합니다.'),
    },
    {
      name: 'isCommunicationOption',
      type: 'switch',
      label: t('커뮤니티'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t('커뮤니티 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
    },
    {
      name: 'isLearningEnvOption',
      type: 'switch',
      label: t('학습환경'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t('학습환경 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
    },
    {
      name: 'isLearningControlOption',
      type: 'switch',
      label: t('학습제어'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t('학습제어 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
    },
    {
      name: 'isRelatedCourseOption',
      type: 'switch',
      label: t('사전/연관학습'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t(
        '사전/연관학습 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.',
      ),
    },
    {
      name: 'isAdminDataOption',
      type: 'switch',
      label: t('행정 항목'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t('행정항목 허용 여부를 설정할 수 있으며, 비허용 시 테넌트에서 사용할 수 없습니다.'),
    },
    {
      name: 'isCarTenantCustomOption',
      type: 'switch',
      label: t('완성차 테넌트 전용 항목'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t(
        '완성차 테넌트의 전용 항목의 허용 여부를 설정합니다.  비허용 시 테넌트에서 사용할 수 없습니다.',
      ),
    },
    {
      name: 'isRotemTenantCustomOption',
      type: 'switch',
      label: t('로템 테넌트 전용 항목'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t(
        '로템 테넌트의 전용 항목의 허용 여부를 설정합니다.  비허용 시 테넌트에서 사용할 수 없습니다.',
      ),
    },
    {
      name: 'isOutsourcingTenantCustomOption',
      type: 'switch',
      label: t('위탁 테넌트 전용 항목'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t(
        '위탁 테넌트의 전용 항목의 허용 여부를 설정합니다.  비허용 시 테넌트에서 사용할 수 없습니다.',
      ),
    },
    {
      name: 'isWiaTenantCustomOption',
      type: 'switch',
      label: t('위아 테넌트 전용 항목'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t(
        '위아 테넌트의 전용 항목의 허용 여부를 설정합니다.  비허용 시 테넌트에서 사용할 수 없습니다.',
      ),
    },
    {
      name: 'isAutoeverTenantCustomOption',
      type: 'switch',
      label: t('오토에버 테넌트 전용 항목'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      tooltip: t(
        '오토에버 테넌트의 전용 항목의 허용 여부를 설정합니다.  비허용 시 테넌트에서 사용할 수 없습니다.',
      ),
    },
  ],
  validator: {
    channelName: true,
    channelMainId: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.channelMainId.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('채널 핸들') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.channelMainId.checkState === DuplicateState.check ||
            values.channelMainId.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('채널 핸들') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.channelMainId.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('채널 핸들') }),
        },
      ],
    },
    tenantList: true,
    channelProfileImageFileGroupUuid: true,
    channelHomeImageFileGroupUuid: true,
    channelDesc: true,
    channelTagList: true,
  },
});
