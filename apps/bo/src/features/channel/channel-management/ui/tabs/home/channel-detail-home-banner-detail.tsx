import { useChannelHomeBannerDetail } from '@features/channel/channel-management/hooks/use-channel-home-banner-detail';
import { CODE_GROUP, S3_PATH } from '@learnway/hooks';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import {
  DateRangePickerFormField,
  DropdownFormField,
  FormItem,
  FormRow2,
  SwitchFormField,
  ThumbnailListFormField,
} from '@shared/ui/form';
import { t } from 'i18next';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ChannelHomeBannerDetailProps } from '../../../types/type';

const ChannelDetailHomeBannerDetailComponent = (props: ChannelHomeBannerDetailProps, ref: any) => {
  const { provider, onSubmit, onFormChange, getValues, onInquiryLinkUrl, linkUrlInquiryDisabled } =
    useChannelHomeBannerDetail(props);

  const formRef = useRef<HTMLFormElement>(null);
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

  return (
    <form ref={formRef} onSubmit={onSubmit}>
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
