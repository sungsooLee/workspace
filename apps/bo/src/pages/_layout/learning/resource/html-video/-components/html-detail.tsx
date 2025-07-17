import { forwardRef, useEffect, useMemo } from 'react';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import dayjs from 'dayjs';
import { cloneDeepWith } from 'lodash-es';
import { Company, User } from '@learnway/types';
import { DynamicFormConfig, DynamicFormValues, useDynamicForm } from '@learnway/hooks';
import { cn, isEmptyData } from '@learnway/shared';
import { ContentsRow, InputModalSelectorFormField, useModal } from '@learnway/ui';
import {
  ChannelByRoleId,
  HtmlVideoDetailRes,
  HtmlVideoMetadataRes,
  ProcessingStatus,
  Tag,
} from '@types';
import { useUpdateHTML5Metadata } from '@entities/learning-resource';
import {
  ChannelChoiceModal,
  CompanyChoiceModal,
  FormRow,
  FormRow2,
  UserChoiceModal,
} from '@shared/ui';
import { FormDisplay } from '@features/form';
import {
  DateRangePickerFormField,
  DurationTimeFormField,
  MediaContentRequiredCheckFormField,
} from '@features/form/ui';
import { getHourValueFromTime, useRoleInfo } from '@pages/_layout/learning/resource/-common/common';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { ContentsHistoryInfo } from '@features/learning-resource/learning-resource-management/ui/contents-history-info';
import { mediaContentFormConfig } from '../../-common/content-form-config';
import { getPayloadFromHtmlMetadataSubmit } from '../-common/form-submit';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

type HtmlDetailProps = {
  mode: 'draft' | 'complete';
  tenantId: number;
  data?: Partial<HtmlVideoDetailRes>;
  hasMapping?: boolean;
};

const HtmlDetailComponent = forwardRef<HTMLFormElement, HtmlDetailProps>(
  ({ mode, tenantId, data = {}, hasMapping = false }, ref) => {
    const {
      provider,
      onSubmit,
      getValues,
      updateFormData,
      onFormChange: handleFormChange,
      watch,
    } = useDynamicForm(formConfig(hasMapping));

    const { data: loginUser } = useFetchAuthUser();

    const { initRoleInfo } = useRoleInfo({
      loginUser,
      onChannelMemberCallback: () => {
        updateFormData({
          ...getValues(),
          coordinatorUuid: loginUser?.uuid,
          coordinatorName: loginUser?.name,
          coordinatorTelCountryCode: loginUser?.phoneNumberNationCode,
          coordinatorTelNo: loginUser?.phoneNumber,
        });
      },
    });

    useEffect(() => {
      (async () => {
        await initRoleInfo();
      })();
    }, [loginUser]);

    useEffect(() => {
      if (!isEmptyData(data)) {
        updateFormData({
          ...getValues(),
          contentName: data.contentName,
          languageCountryCode: data.langCountryCode,
          channelUuid: data.channelUuid,
          channelName: data.channelName,
          description: data.description,
          coordinatorUuid: data.coordinatorUuid,
          coordinatorName: (data.coordinatorName ?? '').split('/')[0],
          coordinatorTelNo: data.coordinatorTelNo,
          contentUseDate: {
            from: data.contentUseStartDate ? dayjs(data.contentUseStartDate).toDate() : undefined,
            to: data.contentUseEndDate ? dayjs(data.contentUseEndDate).toDate() : undefined,
          },
          isLimitExist: !data.isUnlimited,
          contentDuration: { ...getHourValueFromTime(data.contentAddInfo) },
          isVendored: data.isVendored,
          vendorName: data.vendorName ?? '',
          vendorCoordinatorName: data.vendorCoordinatorName ?? '',
          vendorTelNo: data.vendorTelNo ?? '',
          isCourseUsed: data.isCourseUsed,
          isContentSecured: data.isSecured,
          isInspected: data.isInspected,
          isCopyrighted: data.isCopyrighted,
          tags: data.tags?.map((tag: string | Tag) =>
            typeof tag === 'string' ? tag : tag.tagName,
          ),
          aiSummary: data.aiSummary ?? '',
          aiKeyword: data.aiKeyword ?? '',
          resource: data.resource ?? {},
        });
      }
    }, [data]);

    const router = useRouter();
    const { confirm: openConfirm } = useModal();

    const { update: updateMetadata } = useUpdateHTML5Metadata({
      onSuccess: (result: HtmlVideoMetadataRes) => {
        if (result?.contentUuid && result.processingStatus === ProcessingStatus.COMPLETE) {
          return router.navigate({
            to: '/learning/resource/html-video/view',
            state: {
              contentUuid: result.contentUuid,
            },
            replace: true,
          });
        }
      },
    });

    const dynamicFormConfig = useMemo(() => formConfig(hasMapping), [hasMapping]);

    const handleSubmit = async (
      formData: DynamicFormValues<typeof dynamicFormConfig>,
    ): Promise<void> => {
      const { payload } = getPayloadFromHtmlMetadataSubmit({
        data: formData,
        tenantId,
        contentUuid: data?.contentUuid ?? '',
      });

      if (
        await openConfirm({
          title: t('LABEL.confirm.save.title'),
          content: t('입력한 정보로 저장합니다.'),
        })
      ) {
        updateMetadata(payload);
      }
    };

    return (
      <form ref={ref} method="post" onSubmit={onSubmit(handleSubmit)}>
        <ContentsRow>
          {/* 채널 */}
          <FormRow
            provider={provider}
            name="channelName"
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  content: <ChannelChoiceModal />,
                }}
                transformModalData={(data: ChannelByRoleId) => ({
                  channelUuid: data.channelUuid,
                  channelName: data.channelName,
                })}
                onFormChange={(
                  values: Record<
                    string,
                    {
                      channelUuid: string;
                      channelName: string;
                    }
                  >,
                ) => {
                  updateFormData({ ...getValues(), ...values });
                }}
                disabled={hasMapping}
              />
            }
          />
          {/* 언어 */}
          <FormRow provider={provider} name="languageCountryCode" />
        </ContentsRow>

        {/* 학습자원명 */}
        <ContentsRow>
          <FormRow provider={provider} name="contentName" />
        </ContentsRow>

        {/* 학습자원 설명 */}
        <ContentsRow>
          <FormRow provider={provider} name="description" />
        </ContentsRow>

        {/* 담당자 */}
        <ContentsRow>
          <FormRow
            provider={provider}
            name="coordinatorName"
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  title: '',
                  width: 'md',
                  content: <UserChoiceModal title="담당자" />,
                }}
                transformModalData={(data: User) => ({
                  coordinatorUuid: data.uuid,
                  coordinatorName: `${data.name}/${data?.dept?.deptName}/${data?.company?.name}`,
                  coordinatorTelNo: data.phoneNumber,
                })}
                onFormChange={(
                  values: Record<
                    string,
                    {
                      coordinatorUuid: string;
                      coordinatorName: string;
                      coordinatorTelNo: string;
                    }
                  >,
                ) => {
                  handleFormChange(values);
                }}
              />
            }
          />
          <FormRow2 provider={provider} type="hidden" name="coordinatorUuid" />
          {/* 담당자 연락처 */}
          <FormRow provider={provider} name="coordinatorTelNo" />
        </ContentsRow>

        {/* 사용기한 */}
        <ContentsRow type="horizontal" className="inactive">
          <FormRow provider={provider} name="isLimitExist" />
        </ContentsRow>
        {/* 사용기한 상세 */}
        <FormDisplay provider={provider} dependencies={[{ name: 'isLimitExist', value: true }]}>
          <ContentsRow className="pt-0">
            <FormRow
              provider={provider}
              name="contentUseDate"
              element={<DateRangePickerFormField />}
            />
          </ContentsRow>
        </FormDisplay>

        {/* 외주개발업체 정보 */}
        <ContentsRow type="horizontal" className="inactive">
          <FormRow provider={provider} name="isVendored" />
        </ContentsRow>
        {/* 외주개발업체 정보 입력 상세 */}
        <FormDisplay provider={provider} dependencies={[{ name: 'isVendored', value: true }]}>
          <ContentsRow className="pt-0">
            <FormRow
              provider={provider}
              name="vendorName"
              element={
                <InputModalSelectorFormField
                  modalConfig={{
                    title: '',
                    width: 'md',
                    content: <CompanyChoiceModal />,
                  }}
                  transformModalData={(data: Company) => ({
                    vendorCode: data.companyId,
                    vendorName: data.name,
                  })}
                  onFormChange={(
                    values: Record<string, { vendorCode: number; vendorName: string }>,
                  ) => {
                    handleFormChange(values);
                  }}
                />
              }
            />
            <FormRow2 provider={provider} type="hidden" name="vendorCode" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="vendorCoordinatorName" />
            {/*<FormRow2 provider={provider} type="hidden" name="vendorCoordinatorUuid" />*/}
            <FormRow provider={provider} name="vendorTelNo" />
          </ContentsRow>
        </FormDisplay>

        {/* 학습 시간 */}
        <ContentsRow>
          <FormRow provider={provider} name="contentDuration" element={<DurationTimeFormField />} />
        </ContentsRow>

        {/* 태그 */}
        <ContentsRow>
          <FormRow provider={provider} name="tags" />
        </ContentsRow>

        {/* 학습자원 개요 */}
        <ContentsRow>
          <FormRow provider={provider} name="aiSummary" />
        </ContentsRow>

        {/* 키워드 개요 */}
        <ContentsRow>
          <FormRow provider={provider} name="aiKeyword" />
        </ContentsRow>

        {/* 교육자원활용 여부 */}
        <ContentsRow type="horizontal" className="inactive">
          <FormRow provider={provider} name="isCourseUsed" />
        </ContentsRow>

        {/* 필수 확인 영역 */}
        <MediaContentRequiredCheckFormField provider={provider} />

        {/* 이력정보 */}
        <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
          <ContentsHistoryInfo detail={data ?? {}} />
        </ContentsRow>
      </form>
    );
  },
);

HtmlDetailComponent.displayName = 'HtmlDetail';

export const HtmlDetail = HtmlDetailComponent;

const formConfig = (hasMapping: boolean): DynamicFormConfig =>
  cloneDeepWith(mediaContentFormConfig({ hasMapping }));
