import { useEffect } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { Company, User } from '@learnway/types';
import { DynamicFormConfig, S3_PATH, useDynamicForm } from '@learnway/hooks';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  Divider,
  EditorFormField,
  InputModalSelectorFormField,
  useModal,
} from '@learnway/ui';
import { RoleInfo } from '@learnway/auth/types';
import { cn, getParsedDataFromString, isEmptyData } from '@learnway/shared';
import { IcoFormRequired } from '@learnway/icons';
import { BlogCreateReq, BlogPostRes, ContentAddInfoType, EnChannelScope } from '@types';
import { FormRow, FormRow2 } from '@shared/ui';
import { ChannelListChoiceModal, CompanyChoiceModal, UserChoiceModal } from '@features/shared';
import { SharedChannelGridFormField } from '@features/learning';
import { DateRangePickerFormField } from '@features/learning/ui/resource/date-range-picker-form-field';
import { DurationTimeFormField } from '@features/learning/ui/resource/duration-time-form-field';
import { FormDisplay } from '@features/form';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@widgets/layout';
import { useCreateBlogContent } from '@entities/learning-resource';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import styles from './blog-detail.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/blog/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const formConfig: DynamicFormConfig = {
    builders: [
      {
        label: t('LABEL.form.label.channel'),
        name: 'channelUuid',
        type: 'text',
        format: 'array',
        value: [],
        placeholder: t('LABEL.form.input.placeholder3', {
          field: t('채널명'),
          inputType: t('LABEL.form.input.select'),
        }),
        description: '',
      },
      {
        label: t('학습자원명'),
        name: 'contentName',
        type: 'text',
        format: 'string',
        value: '',
        placeholder: t('LABEL.form.input.placeholder1', { type: t('학습자원명') }),
        maxLength: 150,
      },
      {
        label: t('학습자원설명'),
        name: 'description',
        type: 'textarea',
        format: 'string',
        value: '',
        maxLength: 2000,
      },
      {
        label: t('LABEL.form.label.coordinator'),
        name: 'coordinatorName',
        type: 'custom',
        format: 'string',
        value: '',
        placeholder: t('LABEL.form.input.placeholder1', { type: t('담당자명') }),
      },
      {
        name: 'coordinatorUuid',
        type: 'hidden',
        format: 'string',
        value: '',
      },
      {
        name: 'coordinatorTelCountryCode',
        type: 'hidden',
        format: 'string',
        value: 'KOR_82',
      },
      {
        label: t('연락처'),
        name: 'coordinatorTelNo',
        type: 'phone-number',
        value: '',
        fields: {
          nationCode: 'coordinatorTelCountryCode',
          number: 'coordinatorTelNo',
        },
      },
      {
        label: t('사용기한'),
        name: 'isLimitExist',
        type: 'switch',
        format: 'boolean',
        value: false,
        switchConfig: {
          label: (value: boolean) => (value ? '기간설정' : '무기한'),
        },
        tooltip: t('사용기한 내 콘텐츠 공유/교육자원활용이 가능합니다.'),
      },
      {
        name: 'contentUseDate',
        type: 'custom',
        value: {
          from: undefined,
          to: undefined,
        },
        fields: {
          from: undefined,
          to: undefined,
        },
      },
      {
        label: t('외주개발업체 정보'),
        name: 'isVendored',
        type: 'switch',
        format: 'boolean',
        value: false,
        switchConfig: {
          label: (value: boolean) => (value ? '있음' : '없음'),
        },
      },
      {
        label: t('개발업체'),
        name: 'vendorName',
        type: 'text',
        format: 'string',
        value: '',
        placeholder: t('LABEL.form.input.placeholder1', { type: t('개발업체명') }),
      },
      {
        name: 'vendorCode',
        type: 'hidden',
        format: 'number',
        value: '',
      },
      {
        label: t('외주개발업체 담당자'),
        name: 'vendorCoordinatorName',
        type: 'text',
        format: 'string',
        value: '',
        placeholder: t('LABEL.form.input.placeholder1', { type: t('개발업체 담당자명') }),
      },
      // {
      //   name: 'vendorCoordinatorUuid',
      //   type: 'hidden',
      //   format: 'string',
      //   value: '',
      // },
      {
        name: 'vendorTelCountryCode',
        type: 'hidden',
        format: 'string',
        value: 'KOR_82',
      },
      {
        label: t('외주개발업체 연락처'),
        name: 'vendorTelNo',
        type: 'phone-number',
        value: '',
        fields: {
          nationCode: 'vendorTelCountryCode',
          number: 'vendorTelNo',
        },
      },
      {
        label: t('블로그 내용'),
        name: 'blogContent',
        type: 'custom',
        format: 'string',
        value: '',
      },
      {
        label: t('학습 시간'),
        name: 'contentDuration', // contentTime
        type: 'custom',
        format: 'object',
        value: {
          hour: 0,
          minute: 0,
          second: 0,
        },
        tooltip: '해당 학습자원으로 학습 시 걸리는 시간(참고용)',
      },
      {
        label: t('썸네일'),
        name: 'contentThumbnailFileGroupUuid',
        type: 'thumbnail-list',
        format: 'array',
        value: [],
        max: 1,
        imageStorageType: 'db-manage',
        uploadConfig: {
          affairsType: 'CMS',
          s3Path: S3_PATH['upload/content/image'], // BE에 확인 필요
          acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
          maxFileCount: 1,
        },
        description: '학습자원을 표현하는 썸네일을 선택하거나 업로드 하세요. (미선택 시 자동 선택)',
      },
      {
        name: 'selectedContentThumbnailFileUuid',
        type: 'hidden',
        format: 'string',
        value: '',
      },
      {
        label: t('태그'),
        name: 'tags',
        format: 'array',
        type: 'chip-list',
        chipListConfig: {
          showInput: true,
          labelField: 'label',
          valueField: 'value',
          wordwrap: true,
        },
        value: [],
        placeHolder: '한글, 영문, 숫자 포함 9자 이하 태그를 입력하세요.(9자 초과할 경우 얼럿)',
        limitPlaceholder: '여러개의 태그는 쉼표로 구분',
        tooltip: '태그는 학습자원 검색 시 활용되고, 학습자에게는 10개까지만 보여집니다.',
      },
      {
        label: t('학습자원개요 (AI 자동 추출)'),
        name: 'learningResourceOverview',
        type: 'textarea',
        readOnly: true,
        placeholder: t('키워드는 AI 자동 추출되어 표기됩니다.'),
        maxLength: 2000,
        value: '',
      },
      {
        label: t('키워드 (AI 자동 추출)'),
        name: 'keywords',
        type: 'textarea',
        readOnly: true,
        placeholder: t('키워드는 AI 자동 추출되어 표기됩니다.'),
        maxLength: 2000,
        value: '',
      },
      {
        label: t('교육자원활용 여부'),
        name: 'isCourseUsed',
        type: 'switch',
        format: 'boolean',
        value: false,
        switchConfig: {
          label: (value: boolean) => (value ? '활용' : '활용 불가'),
        },
      },
      {
        label: t('공유채널 설정'),
        name: 'sharedChannels',
        type: 'custom',
        format: 'array',
        tooltip: '공유채널 설정',
        value: [
          // {
          //   tenantId: 'tenantId1',
          //   tenantName: 'tenantName1',
          //   channelId: 'Channel Id1',
          //   channelName: 'Channel Name1',
          //   checked: true,
          // },
        ],
      },
      {
        label: t('검수 확인'),
        name: 'isInspected',
        type: 'checkbox',
        format: 'boolean',
        value: false,
        guideText: t('등록하고자 한 학습자원이며, 정상적으로 보여짐이 확인되었습니다.'),
        checkConfig: {
          reverse: true,
        },
      },
      {
        label: t('저작권 확인'),
        name: 'isCopyrighted',
        type: 'checkbox',
        format: 'boolean',
        value: false,
        guideText: t(
          '저작권법(제25조2항)에 따라 학습자원(동영상,이미지 등)은 해당 학습플랫폼에서만 이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법 위반에 해당될 수 있음에  동의합니다.',
        ),
        checkConfig: {
          reverse: true,
        },
      },
      {
        label: t('보안 확인'),
        name: 'isContentSecured',
        type: 'checkbox',
        format: 'boolean',
        value: false,
        guideText: t(
          '캡쳐방지기능 사용 미 설정 시, 불법복제, 무단사용, 저작권 침해 위험에 노출되고, 이에 따른 피해를 입을 수 있음에 인지합니다.',
        ),
        checkConfig: {
          reverse: true,
        },
      },
    ],
    validator: {
      channelUuid: true,
      contentName: true,
      coordinatorName: true,
      coordinatorUuid: true,
      coordinatorTelCountryCode: true,
      coordinatorTelNo: {
        format: 'phone-number',
        required: true,
      },
      isLimitExist: true, // isUnlimited 값을 반대로 설정해야 함
      contentUseDate: {
        required: true,
        conditions: [
          {
            fn: (values: Record<string, any>) => {
              if (values.isLimitExist) {
                return !values.contentUseDate.from || !values.contentUseDate.to;
              }
              return false;
            },
            message: t('LABEL.form.input.placeholder3', {
              field: t('시작일 및 종료일'),
              inputType: t('LABEL.form.input.select'),
            }),
          },
          {
            fn: (values: Record<string, any>) => {
              console.log(values);
              if (!!values.contentUseDate.from && !!values.contentUseDate.to) {
                return !(values.contentUseDate.from < values.contentUseDate.to);
              }
              return false;
            },
            message: t('시작일은 종료일보다 이전이어야 합니다.'),
          },
        ],
      },
      blogContent: true,
      vendorName: {
        required: {
          fn: (values: Record<string, any>) => {
            if (values.isVendored) {
              return !values.vendorCode && !values.vendorName;
            }
            return false;
          },
        },
      },
      vendorCoordinatorName: {
        required: {
          fn: (values: Record<string, any>) => {
            if (values.isVendored) {
              return !values.vendorCoordinatorName;
            }
            return false;
          },
        },
      },
      vendorTelNo: {
        required: {
          fn: (values: Record<string, any>) => {
            if (values.isVendored) {
              return !values.vendorTelNo;
            }
            return false;
          },
        },
      },
      contentDuration: {
        required: true,
        conditions: [
          {
            fn: (values: Record<string, { hour: number; minute: number; second: number }>) => {
              const { hour, minute, second } = values.contentDuration;
              return !(hour > 0 || minute > 0 || second > 0);
            },
            message: t('학습시간은 1초 이상으로 설정하여야 합니다.'),
          },
        ],
      },
      contentThumbnailFileGroupUuid: true,
      tags: true,
      isCourseUsed: true,
      isInspected: {
        required: true,
        conditions: [
          {
            fn: (values: Record<string, any>) => !values.isInspected,
            message: t("'검수 확인' 체크하세요."),
          },
        ],
      },
      isCopyrighted: {
        required: true,
        conditions: [
          {
            fn: (values: Record<string, any>) => !values.isCopyrighted,
            message: t("'저작권 확인' 체크하세요."),
          },
        ],
      },
      isContentSecured: {
        required: true,
        conditions: [
          {
            fn: (values: Record<string, any>) => !values.isContentSecured,
            message: t("'보안 확인' 체크하세요."),
          },
        ],
      },
    },
  };

  const {
    provider,
    onSubmit,
    // control,
    getValues,
    updateFormData,
    onFormChange: handleFormChange,
  } = useDynamicForm(formConfig);

  const { data: loginUser } = useFetchAuthUser();

  useEffect(() => {
    const myChannelAuths = loginUser?.myRoles?.map((item: RoleInfo) => item.channelScope) || [];

    // 등록자가 채널소유자 or 채널구성원일 경우 default로 등록자 정보 입력
    // coordinatorName: `${data.name}/${data?.dept?.deptName}/${data?.company?.name}`,
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

  const { open: openModal, confirm: openConfirm } = useModal();
  const router = useRouter();

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
    const tenantId = loginUser?.activeTenant?.tenantId as number;

    const { hour, minute, second } = data.contentDuration;
    const contentTime = hour * 60 * 60 + minute * 60 + second;

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
      contentThumbnailFileGroupUuid: data.contentThumbnailFileGroupUuid?.[0], // '17312669-0032-4d94-9ecd-5891a44e407c'
      selectedContentThumbnailFileUuid: data.selectedContentThumbnailFileUuid, // '3a68f885-880f-4507-aac6-56d30bef328a'
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

  const handleClickGoListButton = async () => {
    if (
      await openConfirm({
        title: t('LABEL.confirm.goList.title'),
        content: t('LABEL.confirm.goList.message'),
      })
    ) {
      router.navigate({ to: '/learning/learning-resource' });
    }
  };

  const handleClickCancelButton = async () => {
    if (
      await openConfirm({
        title: t('LABEL.confirm.cancel.title'),
        content: t('LABEL.confirm.cancel.message', { type: t('학습자원') }),
      })
    ) {
      router.navigate({ to: '/learning/learning-resource' });
    }
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button
            type="button"
            variant="point"
            size="sm"
            label={t('LABEL.button.list')}
            onClick={handleClickGoListButton}
          />
          <Divider orientation="vertical" />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={t('LABEL.button.cancel')}
            onClick={handleClickCancelButton}
          />
          <Button type="submit" variant="primary" size="sm" label={t('LABEL.button.save')} />
        </ContentsButtons>

        <MainContents>
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
                      { coordinatorUuid: string; coordinatorName: string; coordinatorTelNo: string }
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
            <FormRow
              provider={provider}
              name="contentDuration"
              element={<DurationTimeFormField />}
            />
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

          {/* 공유채널 설정 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name="sharedChannels"
              element={<SharedChannelGridFormField />}
            />
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
        </MainContents>

        {/* 썸네일 영역 */}
        <SubContents>
          <div className={styles.sub_container}>
            <strong className={styles.title}>{t('블로그')}</strong>
          </div>
        </SubContents>
      </PageContainer>
    </form>
  );
}
