import { forwardRef, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { cloneDeepWith } from 'lodash-es';
import { Company, User } from '@learnway/types';
import { DynamicFormConfig, DynamicFormValues, useDynamicForm } from '@learnway/hooks';
import { cn } from '@learnway/shared';
import {
  ChipListModalSelectorFormField,
  ContentsRow,
  InputModalSelectorFormField,
  useModal,
} from '@learnway/ui';
import { HtmlVideoDetailRes, HtmlVideoMetadataRes, ProcessingStatus, type Tag } from '@types';
import { useUpdateHTML5Metadata } from '@entities/learning-resource';
import {
  ChannelListChoiceModal,
  CompanyChoiceModal,
  ContentsHistoryInfoFormField,
  FormGroup,
  FormRow,
  FormRow2,
  ThumbnailListFormField,
  UserChoiceModal,
} from '@shared/ui';
import { FormDisplay } from '@features/form';
import { DateRangePickerFormField, DurationTimeFormField } from '@features/form/ui';
import { mediaContentFormConfig } from '../../-common/content-form-config';
import { getPayloadFromHtmlMetadataSubmit } from '../-common/form-submit';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dayjs from 'dayjs';
import { getHourValueFromTime } from '@pages/_layout/learning/resource/-common/common';

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
    console.log(formConfig(hasMapping));

    useEffect(() => {
      updateFormData({
        ...getValues(),
        contentName: data.contentName,
        langCountryCode: data.langCountryCode,
        channelUuid: [{ channelUuid: data.channelUuid, channelName: data.channelName }],
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
        contentThumbnailFileGroupUuid: data.contentThumbnailFileGroupUuid,
        isCourseUsed: data.isCourseUsed,
        isContentSecured: data.isSecured,
        isInspected: data.isInspected,
        isCopyrighted: data.isCopyrighted,
        tags: data.tags?.map((tag: string | Tag) => (typeof tag === 'string' ? tag : tag.tagName)),
        aiSummary: data.aiSummary ?? '',
        aiKeyword: data.aiKeyword ?? '',
        // resource: ??
      });
    }, [data]);

    const selectedContentThumbnailFileUuid = watch('selectedContentThumbnailFileUuid');

    const handleThumbnailSelected = (selectedContentThumbnailFileUuid: string) =>
      handleFormChange({ selectedContentThumbnailFileUuid });

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

    const dynamicFormConfig = formConfig(hasMapping);

    const handleSubmit = async (
      formData: DynamicFormValues<typeof dynamicFormConfig>,
    ): Promise<void> => {
      console.log('formData', formData);
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
      <form ref={ref} onSubmit={onSubmit(handleSubmit)}>
        <ContentsRow>
          {/* 채널 */}
          <FormRow
            provider={provider}
            name="channelUuid"
            element={
              <ChipListModalSelectorFormField
                chipList={{
                  labelField: 'channelName',
                  valueField: 'channelUuid',
                  hideBorder: true,
                }}
                modalConfig={{
                  title: '',
                  width: 'xl',
                  content: <ChannelListChoiceModal />,
                }}
                disabled={hasMapping}
              />
            }
          />
          {/* 언어 */}
          <FormRow provider={provider} name="langCountryCode" />
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

        {/* 썸네일 */}
        <ContentsRow>
          <FormRow
            provider={provider}
            name="contentThumbnailFileGroupUuid"
            element={
              <ThumbnailListFormField
                selected={selectedContentThumbnailFileUuid}
                onSelected={handleThumbnailSelected}
              />
            }
          />
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
        <FormGroup title="최종확인" required>
          {/* 검수 확인 */}
          <ContentsRow>
            <FormRow provider={provider} name="isInspected" />
          </ContentsRow>
          {/* 저작권 확인 */}
          <ContentsRow>
            <FormRow provider={provider} name="isCopyrighted" />
          </ContentsRow>
          {/* 보안 확인 */}
          <ContentsRow>
            <FormRow provider={provider} name="isContentSecured" />
          </ContentsRow>
        </FormGroup>

        {/* 이력정보 */}
        <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
          <ContentsHistoryInfoFormField />
        </ContentsRow>
      </form>
    );
  },
);

HtmlDetailComponent.displayName = 'HtmlDetail';

export const HtmlDetail = HtmlDetailComponent;

const formConfig = (hasMapping: boolean): DynamicFormConfig =>
  cloneDeepWith(mediaContentFormConfig({ hasMapping }));
