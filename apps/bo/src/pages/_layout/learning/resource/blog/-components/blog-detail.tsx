import { Dispatch, forwardRef, SetStateAction, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import {
  ChipListModalSelectorFormField,
  ContentsRow,
  EditorFormField,
  InputModalSelectorFormField,
  useModal,
} from '@learnway/ui';
import { Company, User } from '@learnway/types';
import { cn, getParsedDataFromString, isEmptyData } from '@learnway/shared';
import { IcoFormRequired } from '@learnway/icons';
import { RoleInfo } from '@learnway/auth/types';
import { useDynamicForm } from '@learnway/hooks';
import { useFetchAuthUser } from '@learnway/auth/entities';
import defaultImage from '@assets/images/temp/img_temp_blog_default.png';
import {
  ChannelListChoiceModal,
  CompanyChoiceModal,
  FormRow,
  FormRow2,
  UserChoiceModal,
} from '@shared/ui';
import { FormDisplay } from '@features/form';
import { DateRangePickerFormField, DurationTimeFormField } from '@features/form/ui';
import {
  BlogCreateReq,
  BlogDetailRes,
  BlogPostRes,
  ContentAddInfoType,
  EnChannelScope,
} from '@types';
import { useCreateBlogContent } from '@entities/learning-resource';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

import formConfig from './form-config';

interface BlogDetailProps {
  mode: 'create' | 'update';
  contentUuid?: string;
  blogInfo?: Partial<BlogDetailRes>;
  setThumbnailImage?: Dispatch<SetStateAction<string>>;
}

const BlogDetailComponent = forwardRef<HTMLFormElement, BlogDetailProps>(
  ({ mode, blogInfo = {}, setThumbnailImage }, ref) => {
    const router = useRouter();
    const { open: openModal, confirm: openConfirm } = useModal();

    const {
      provider,
      onSubmit,
      getValues,
      updateFormData,
      onFormChange: handleFormChange,
      watch,
    } = useDynamicForm(formConfig());

    const getHourValueFromTime = (contentTime: string | number) => {
      if (typeof contentTime === 'string') {
        contentTime = isNaN(Number(contentTime)) ? 0 : Number(contentTime);
      }

      const hour = Math.floor(contentTime / (60 * 60));
      const minute = Math.floor((contentTime % (60 * 60)) / 60);
      const second = contentTime % 60;

      return { hour, minute, second };
    };

    const getTimeValueFromHour = (duration: { hour: number; minute: number; second: number }) => {
      const { hour, minute, second } = duration;
      return hour * 60 * 60 + minute * 60 + second;
    };

    const { create: createBlogContent } = useCreateBlogContent({
      onSuccess: (result: BlogPostRes) => {
        if (result?.contentUuid) {
          return router.navigate({
            to: '/learning/resource/blog/view',
            state: {
              contentUuid: result.contentUuid,
            },
          });
        }
      },
    });

    const handleOnSubmit = async (data: any): Promise<void> => {
      const contentTime = getTimeValueFromHour(data.contentDuration);

      const payload: BlogCreateReq = {
        tenantId,
        contentName: data.contentName,
        languageCountryCode: 'KO',
        channelUuid: data.channelUuid?.[0].channelUuid,
        description: data.description,
        coordinatorUuid: data.coordinatorUuid,
        coordinatorName: data.coordinatorName,
        coordinatorTelCountryCode: data.coordinatorTelCountryCode,
        coordinatorTelNo: data.coordinatorTelNo,
        contentUseStartDate: data.contentUseDate?.from,
        contentUseEndDate: data.contentUseDate?.to,
        isUnlimited: !data.isLimitExist,
        contentTime,
        isVendored: data.isVendored,
        vendorCode: data.vendorCode,
        vendorName: data.vendorName,
        vendorCoordinatorName: data.vendorCoordinatorName,
        vendorTelCountryCode: data.vendorTelCountryCode,
        vendorTelNo: data.vendorTelNo,
        contentThumbnailFileGroupUuid: '50469603-ebd7-44ed-8a0d-db9ac36fe677', // data.contentThumbnailFileGroupUuid?.[0],
        selectedContentThumbnailFileUuid: '52c53e32-9659-4d6e-b981-ccb9e4e1a7a0', //data.selectedContentThumbnailFileUuid,
        isCourseUsed: data.isCourseUsed,
        isContentSecured: data.isContentSecured,
        isInspected: data.isInspected,
        isCopyrighted: data.isCopyrighted,
        isSecured: true,
        isDeleted: false,
        isOpened: true,
        tags: data.tags,
        blogContent: getParsedDataFromString(data.blogContent),
        contentAddInfoType: ContentAddInfoType.VIDEO_ADD_INFO, // 블로그(초)
        contentAddInfo: contentTime,
      };

      console.log('payload ===>', payload);

      if (
        await openConfirm({
          title: t('LABEL.confirm.save.title'),
          content: t('입력한 정보로 저장합니다.'),
        })
      ) {
        createBlogContent(payload);
      }
    };

    const { data: loginUser } = useFetchAuthUser();
    const tenantId = loginUser?.activeTenant?.tenantId as number;

    useEffect(() => {
      const myChannelAuths = loginUser?.myRoles?.map((item: RoleInfo) => item.channelScope) || [];

      // 등록자가 채널소유자 or 채널구성원일 경우 default로 등록자 정보 입력
      if (
        !isEmptyData(loginUser) &&
        myChannelAuths.includes(EnChannelScope.CURRENT_CHANNEL_INCLUSIVE)
      ) {
        updateFormData({
          ...getValues(),
          coordinatorUuid: loginUser?.uuid,
          coordinatorName: `${loginUser?.name}/${loginUser?.dept?.deptName}/${loginUser?.company?.name}`,
          coordinatorTelCountryCode: loginUser?.phoneNumberNationCode,
          coordinatorTelNo: loginUser?.phoneNumber,
        });
      }
    }, [loginUser]);

    useEffect(() => {
      if (mode === 'update' && !isEmptyData(blogInfo)) {
        console.log(blogInfo);

        updateFormData({
          ...getValues(),
          contentName: blogInfo.contentName,
          langCountryCode: blogInfo.langCountryCode,
          channelUuid: blogInfo.channelUuid,
          description: blogInfo.description,
          coordinatorUuid: blogInfo.coordinatorUuid,
          coordinatorName: blogInfo.coordinatorName,
          coordinatorTelNo: blogInfo.coordinatorTelNo,
          contentUseDate: {
            from: blogInfo.contentUseStartDate,
            to: blogInfo.contentUseEndDate,
          },
          isLimitExist: !blogInfo.isUnlimited,
          contentDuration: getHourValueFromTime(blogInfo.contentAddInfo as number),
          isVendored: blogInfo.isVendored,
          // vendorCode: blogInfo.vendorCode,
          vendorName: blogInfo.vendorName,
          vendorCoordinatorName: blogInfo.vendorCoordinatorName,
          vendorTelNo: blogInfo.vendorTelNo,
          contentThumbnailFileGroupUuid: blogInfo.contentThumbnailFileGroupUuid,
          thumbnailFiles: blogInfo.thumbnailFiles,
          selectedContentThumbnailFileUuid: blogInfo.selectedContentThumbnailFileUuid,
          isCourseUsed: blogInfo.isCourseUsed,
          isContentSecured: blogInfo.isSecured,
          isInspected: blogInfo.isInspected,
          isCopyrighted: blogInfo.isCopyrighted,
          // isSecured: blogInfo.isSecured,
          // isDeleted: blogInfo.isDeleted,
          // isOpened: blogInfo.isOpened,
          tags: blogInfo.tags,
          blogContent: JSON.stringify(blogInfo.blogContent),
        });
      }
    }, [blogInfo]);

    const thumbnails: string[] = watch('contentThumbnailFileGroupUuid');
    useEffect(() => {
      console.log('thumbnail', thumbnails);

      if (setThumbnailImage) {
        setThumbnailImage(thumbnails?.length > 0 ? thumbnails[0] : defaultImage);
      }
    }, [thumbnails]);

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
              />
            }
          />
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
          <FormRow provider={provider} name="contentThumbnailFileGroupUuid" />
          <FormRow2 provider={provider} type="hidden" name="selectedContentThumbnailFileUuid" />
        </ContentsRow>

        {/* 태그 */}
        <ContentsRow>
          <FormRow provider={provider} name="tags" />
        </ContentsRow>

        {/* 학습자원 개요 */}
        <ContentsRow>
          <FormRow provider={provider} name="learningResourceOverview" />
        </ContentsRow>

        {/* 키워드 개요 */}
        <ContentsRow>
          <FormRow provider={provider} name="keywords" />
        </ContentsRow>

        {/* 교육자원활용 여부 */}
        <ContentsRow type="horizontal" className="inactive">
          <FormRow provider={provider} name="isCourseUsed" />
        </ContentsRow>

        {/* 필수 확인 영역 */}
        <div className={formStyles.form_contents_wrap}>
          <strong className={formStyles.tit_sub}>
            최종 확인
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={8} height={8} />
            </span>
          </strong>
          <div className={formStyles.form_contents}>
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
          </div>
        </div>
      </form>
    );
  },
);

export const BlogDetail = BlogDetailComponent;
