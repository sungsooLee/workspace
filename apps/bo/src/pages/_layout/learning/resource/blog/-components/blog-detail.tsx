import React, { Dispatch, forwardRef, SetStateAction, useEffect, useMemo } from 'react';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import dayjs from 'dayjs';
import { cloneDeepWith } from 'lodash-es';
import {
  ChipListModalSelectorFormField,
  ContentsRow,
  EditorFormField,
  InputModalSelectorFormField,
  useModal,
} from '@learnway/ui';
import { Company, User } from '@learnway/types';
import { cn, isEmptyData } from '@learnway/shared';
import {
  DynamicFormConfig,
  DynamicFormValues,
  useDynamicForm,
  useFileManager,
} from '@learnway/hooks';
import { useFetchAuthUser } from '@learnway/auth/entities';
import defaultImage from '@assets/images/thumb/img_thumb_default.jpg';
import type { BlogDetailRes, BlogPostRes, BlogUpdateReq, Tag } from '@types';
import {
  ChannelListChoiceModal,
  CompanyChoiceModal,
  FormGroup,
  FormRow,
  FormRow2,
  ThumbnailListFormField,
  UserChoiceModal,
} from '@shared/ui';
import { FormDisplay } from '@features/form';
import { DateRangePickerFormField, DurationTimeFormField } from '@features/form/ui';
import { useCreateBlogContent, useUpdateBlogContent } from '@entities/learning-resource';
import { getHourValueFromTime, useRoleInfo } from '../../-common/common';
import { mediaContentFormConfig } from '../../-common/content-form-config';
import { getPayloadFromBlogSubmit } from '../-common/form-submit';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { ContentsHistoryInfo } from '@features/learning-resource/learning-resource-management/ui/contents-history-info';

type BlogDetailProps = {
  tenantId: number;
  mode: 'create' | 'update';
  blogInfo?: Partial<BlogDetailRes>;
  setThumbnailImage?: Dispatch<SetStateAction<string>>;
  hasMapping?: boolean;
};

const BlogDetailComponent = forwardRef<HTMLFormElement, BlogDetailProps>(
  ({ tenantId, mode, blogInfo = {}, setThumbnailImage, hasMapping = false }, ref) => {
    const router = useRouter();
    const { confirm: openConfirm } = useModal();

    const {
      provider,
      onSubmit,
      getValues,
      updateFormData,
      onFormChange: handleFormChange,
      watch,
    } = useDynamicForm(formConfig(hasMapping));

    const { create: createBlogContent } = useCreateBlogContent({
      onSuccess: (result: BlogPostRes) => {
        if (result?.contentUuid) {
          return router.navigate({
            to: '/learning/resource/blog/view',
            state: {
              contentUuid: result.contentUuid,
            },
            replace: true,
          });
        }
      },
    });

    const { update: updateBlogContent } = useUpdateBlogContent({
      onSuccess: (result: BlogPostRes) => {
        if (result?.contentUuid) {
          return router.navigate({
            to: '/learning/resource/blog/view',
            state: {
              contentUuid: result.contentUuid,
            },
            replace: true,
          });
        }
      },
    });

    const dynamicFormConfig = useMemo(() => formConfig(hasMapping), [hasMapping]);

    const handleOnSubmit = async (
      data: DynamicFormValues<typeof dynamicFormConfig>,
    ): Promise<void> => {
      const { payload } = getPayloadFromBlogSubmit({
        data,
        tenantId,
        mode,
        contentUuid: mode === 'update' ? blogInfo?.contentUuid : '',
      });

      if (
        await openConfirm({
          title: t('LABEL.confirm.save.title'),
          content: t('입력한 정보로 저장합니다.'),
        })
      ) {
        if (mode === 'create') {
          createBlogContent(payload);
        } else {
          updateBlogContent(payload as BlogUpdateReq);
        }
      }
    };

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
      if (mode === 'update' && !isEmptyData(blogInfo)) {
        updateFormData({
          ...getValues(),
          contentName: blogInfo.contentName,
          langCountryCode: blogInfo.langCountryCode,
          channelUuid: [{ channelUuid: blogInfo.channelUuid, channelName: blogInfo.channelName }],
          description: blogInfo.description,
          coordinatorUuid: blogInfo.coordinatorUuid,
          coordinatorName: (blogInfo.coordinatorName ?? '').split('/')[0],
          coordinatorTelNo: blogInfo.coordinatorTelNo,
          contentUseDate: {
            from: blogInfo.contentUseStartDate
              ? dayjs(blogInfo.contentUseStartDate).toDate()
              : undefined,
            to: blogInfo.contentUseEndDate ? dayjs(blogInfo.contentUseEndDate).toDate() : undefined,
          },
          isLimitExist: !blogInfo.isUnlimited,
          contentDuration: { ...getHourValueFromTime(blogInfo.contentAddInfo) },
          isVendored: blogInfo.isVendored,
          // vendorCode: blogInfo.vendorCode,
          vendorName: blogInfo.vendorName ?? '',
          vendorCoordinatorName: blogInfo.vendorCoordinatorName ?? '',
          vendorTelNo: blogInfo.vendorTelNo ?? '',
          contentThumbnailFileGroupUuid: blogInfo.contentThumbnailFileGroupUuid,
          isCourseUsed: blogInfo.isCourseUsed,
          isContentSecured: blogInfo.isSecured,
          isInspected: blogInfo.isInspected,
          isCopyrighted: blogInfo.isCopyrighted,
          tags: blogInfo.tags?.map((tag: string | Tag) =>
            typeof tag === 'string' ? tag : tag.tagName,
          ),
          blogContent: JSON.stringify(blogInfo.blogContent ?? {}),
          aiSummary: blogInfo.aiSummary ?? '',
          aiKeyword: blogInfo.aiKeyword ?? '',
        });
      }
    }, [blogInfo]);

    const selectedContentThumbnailFileUuid = watch('selectedContentThumbnailFileUuid');
    const contentThumbnailFileGroupUuid = watch('contentThumbnailFileGroupUuid');
    const { getGroupInfo } = useFileManager();

    const handleThumbnailSelected = async (selectedContentThumbnailFileUuid: string) => {
      handleFormChange({ selectedContentThumbnailFileUuid });

      const groupInfo = await getGroupInfo(contentThumbnailFileGroupUuid);

      const files = groupInfo?.files ?? [];
      if (setThumbnailImage) {
        if (files.length > 0) {
          setThumbnailImage(files[0]?.fileUrl ?? '');
        } else {
          setThumbnailImage(defaultImage);
        }
      }
    };

    return (
      <form ref={ref} onSubmit={onSubmit(handleOnSubmit)}>
        {/* 채널 */}
        <ContentsRow>
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

        {/* 블로그 내용 (에디터 팝업 호출) */}
        <ContentsRow>
          <FormRow provider={provider} name="blogContent" element={<EditorFormField />} />
        </ContentsRow>

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
        {mode === 'update' && (
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfo detail={blogInfo ?? {}} />
          </ContentsRow>
        )}
      </form>
    );
  },
);

BlogDetailComponent.displayName = 'BlogDetail';

export const BlogDetail = BlogDetailComponent;

const formConfig = (hasMapping: boolean): DynamicFormConfig => {
  const commonMediaContentFormConfig = cloneDeepWith(mediaContentFormConfig({ hasMapping }));

  return {
    builders: [
      ...commonMediaContentFormConfig.builders,
      {
        label: t('블로그 내용'),
        name: 'blogContent',
        type: 'custom',
        format: 'string',
        value: '',
      },
    ],
    validator: {
      ...commonMediaContentFormConfig.validator,
      blogContent: true,
    },
  };
};
