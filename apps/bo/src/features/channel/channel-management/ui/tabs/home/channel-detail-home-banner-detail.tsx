import {
  useChannelBanner,
  useCreateChannelBanner,
  useUpdateChannelBanner,
} from '@entities/channel';
import { DateRangePickerFormField, DropdownFormField } from '@features/form';
import { CODE_GROUP, S3_PATH, useDynamicForm2 } from '@learnway/hooks';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { useToast } from '@learnway/ui/toast';
import {
  CourseChoiceModal,
  FormItem,
  FormRow2,
  PackageChoiceModal,
  SwitchFormField,
  ThumbnailListFormField,
} from '@shared/ui';
import { useRouterState } from '@tanstack/react-router';
import { EnFormMode, EnGlobalConst } from '@types';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

interface ChannelDetailHomeBannerDetailProps {
  mode: EnFormMode;
  bannerId: number | undefined;
  onCompleted: () => void;
}

const ChannelDetailHomeBannerDetailComponent = (
  { mode, bannerId, onCompleted }: ChannelDetailHomeBannerDetailProps,
  ref: any,
) => {
  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;

  const { openModal } = useModal();
  const { open: openToast } = useToast();
  const { data: channelData } = useChannelBanner({ channelUuid, bannerId });

  const { create } = useCreateChannelBanner({
    onSucess: () => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      onCompleted();
    },
  });
  const { update } = useUpdateChannelBanner({
    onSucess: () => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      onCompleted();
    },
  });

  const { provider, onSubmit, onFormChange, getValues, updateFormData, watch, setValue } =
    useDynamicForm2();

  const [linkUrlInquiryDisabled, setLinkUrlInquiryDisabled] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);
  const bannerTypeRef = useRef<string>('');

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

  const watchBannerType = watch('channelBannerType');

  useEffect(() => {
    console.log('### getValues', getValues());
    if (mode === EnFormMode.ADD) {
      const initialData = {
        bannerButtonLinkUrl: '',
        bannerButtonText: '',
        bannerImageFileGroupUuid: '',
        bannerName: '',
        bannerSubTitle1: '',
        bannerSubTitle2: '',
        bannerTitle: '',
        channelBannerPositionType: 'CHANNEL_HOME',
        channelBannerType: '',
        isDisplayed: true,
        publicationPeriod: {
          from: undefined,
          to: undefined,
        },
        channelBannerDisplayState: '',
      };
      updateFormData(initialData);
    } else if (mode === EnFormMode.VIEW && channelData) {
      const initialData = {
        ...channelData,
        publicationPeriod: {
          from: dayjs(channelData.startDate).format('YYYY-MM-DD'),
          to: dayjs(channelData.endDate).format('YYYY-MM-DD'),
        },
        channelBannerDisplayState: t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelBannerDisplayStateType.${channelData.channelBannerDisplayStateType}`,
        ),
      };
      console.log('### initialData', initialData);
      updateFormData(initialData);
    }
  }, [channelData]);

  useEffect(() => {
    if (watchBannerType && watchBannerType.length > 0) {
      setLinkUrlInquiryDisabled(false);
      if (bannerTypeRef.current && bannerTypeRef.current !== watchBannerType)
        setValue('bannerButtonLinkUrl', '');
    } else {
      setLinkUrlInquiryDisabled(true);
    }
    bannerTypeRef.current = watchBannerType;
  }, [watchBannerType]);

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);
    const payload = {
      ...data,
      startDate: dayjs(new Date(data.publicationPeriod.from)).format('YYYY-MM-DD'),
      endDate: dayjs(new Date(data.publicationPeriod.to)).format('YYYY-MM-DD'),
      channelUuid,
    };
    if (mode === EnFormMode.ADD) {
      create(payload);
    } else if (mode === EnFormMode.VIEW) {
      console.log('#### channelData', channelData);
      update({ ...payload, bannerId: channelData.channelBannerId });
    }
  };

  const onInquiryLinkUrl = async () => {
    const result = await openModal({
      width: 'xl',
      content: currentModalComponent(),
    });
    console.log('#### result', result);
  };

  const currentModalComponent = () => {
    if (watchBannerType === 'COURSE') {
      return <CourseChoiceModal channelUuid={channelUuid} />;
    } else if (watchBannerType === 'PACKAGE') {
      return <PackageChoiceModal channelUuid={channelUuid} />;
    }
    return undefined;
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('기본 정보')} />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'channelBannerPositionType'}
          label={t('게재 위치')}
          element={
            <DropdownFormField
              readOnly={true}
              optionsConfig={{
                codeGroup: CODE_GROUP['pms.channel.ChannelBannerPositionType'],
              }}
            />
          }
        />
        <FormRow2
          provider={provider}
          name={'bannerName'}
          label={t('배너명')}
          validation={{ required: true }}
          element={<Input />}
        />
        <FormRow2
          provider={provider}
          name={'publicationPeriod'}
          label={t('게재 기간')}
          format={'object'}
          validation={{
            required: true,
            format: 'object',
          }}
          element={<DateRangePickerFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'channelBannerDisplayState'}
          label={t('상태')}
          element={<Input readOnly={true} placeholder={t('등록 후 자동생성')} />}
        />
        <FormRow2
          provider={provider}
          name={'isDisplayed'}
          label={t('노출 여부')}
          format="boolean"
          className={dynamicFormStyles.form_item_horizontal}
          guideText={t('게재중 상태만 배너가 노출됩니다.')}
          element={
            <SwitchFormField
              switchConfig={{
                label: (value: boolean) => (value ? t('노출') : t('비노출')),
              }}
            />
          }
        />
        <FormItem />
      </ContentsRow>

      <FormSubTitle label={t('배너 정보')} />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'bannerImageFileGroupUuid'}
          label={t('이미지')}
          validation={{
            required: true,
          }}
          guideText={t(
            '파일 사이즈 000 x 000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50 MB',
          )}
          element={
            <ThumbnailListFormField
              uuidType={'group'}
              uploadConfig={{
                affairsType: 'PMS',
                s3Path: S3_PATH['public/image/channel/banner'],
                acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
                maxFileSize: 50 * 1024 * 1024,
              }}
              max={1}
              selected={getValues()?.bannerImageFileGroupUuid}
              onSelected={(selectedThumbnail: string) =>
                onFormChange({ bannerImageFileGroupUuid: selectedThumbnail })
              }
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'bannerTitle'}
          label={t('타이틀')}
          element={<Input maxLength={15} />}
        />
        <FormRow2
          provider={provider}
          name={'bannerButtonText'}
          label={t('버튼 텍스트')}
          element={<Input maxLength={6} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'bannerSubTitle1'}
          label={t('서브 타이틀 1')}
          element={<Input maxLength={20} />}
        />
        <FormRow2
          provider={provider}
          name={'bannerSubTitle2'}
          label={t('서브 타이틀 2')}
          element={<Input maxLength={20} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'channelBannerType'}
          label={t('배너 유형')}
          validation={{ required: true }}
          element={
            <DropdownFormField
              optionsConfig={{
                codeGroup: CODE_GROUP['pms.channel.ChannelBannerType'],
              }}
              presetOptionLabel={t('선택')}
            />
          }
        />
        <FormRow2
          provider={provider}
          name={'bannerButtonLinkUrl'}
          label={t('랜딩 URL')}
          validation={{ required: true }}
          guideText={t('배너 유형에 따라 랜딩 URL을 조회합니다.')}
          element={<Input readOnly={true} placeholder={t('조회')} />}
        >
          <Button
            className={dynamicFormStyles.btn_find}
            variant={'gray'}
            size={'sm'}
            disabled={linkUrlInquiryDisabled}
            onClick={onInquiryLinkUrl}
          >
            {t('조회')}
          </Button>
        </FormRow2>
      </ContentsRow>

      <FormSubTitle
        label={t('배너 미리보기')}
        titleNode={
          <p className={formStyles.guide_text}>
            {t('배너정보를 입력하고, 우축 버튼을 클릭하면 미리보기 할 수 있습니다.')}
          </p>
        }
        actionNode={<Button variant="gray" size="sm" label={t('미리보기')} />}
      />
    </form>
  );
};

export const ChannelDetailHomeBannerDetail = forwardRef(ChannelDetailHomeBannerDetailComponent);
