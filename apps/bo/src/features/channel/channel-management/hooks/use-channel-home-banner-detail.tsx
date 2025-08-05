import {
  useChannelBanner,
  useCreateChannelBanner,
  useUpdateChannelBanner,
} from '@entities/channel';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { useToast } from '@learnway/ui/toast';
import { CourseChoiceModal, PackageChoiceModal } from '@shared/ui';
import { useRouterState } from '@tanstack/react-router';
import { EnFormMode, EnGlobalConst } from '@types';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { ChannelHomeBannerDetailProps } from '../types/type';

export const useChannelHomeBannerDetail = (props: ChannelHomeBannerDetailProps) => {
  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;

  const { mode, bannerId, onCompleted } = props;
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

  const bannerTypeRef = useRef<string>('');

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

  return {
    provider,
    getValues,
    onSubmit: onSubmit(handleOnSubmit),
    onFormChange,
    onInquiryLinkUrl,
    linkUrlInquiryDisabled,
  };
};
