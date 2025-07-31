import { DateRangePickerFormField, DropdownFormField } from '@features/form';
import { DynamicFormConfig, S3_PATH, useDynamicForm } from '@learnway/hooks';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { FormSubTitle } from '@learnway/ui/base-form';
import { FormItem, FormRow } from '@shared/ui';
import { EnFormMode } from '@types';
import { t } from 'i18next';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';

interface ChannelDetailHomeBannerDetailProps {
  mode: EnFormMode;
}

const ChannelDetailHomeBannerDetailComponent = (
  props: ChannelDetailHomeBannerDetailProps,
  ref: any,
) => {
  const { provider, onSubmit, onFormChange, getValues, updateFormData } =
    useDynamicForm(formConfig());

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
    } }));

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('기본 정보')} />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'position'}
          element={<DropdownFormField readOnly={true} />}
        />
        <FormRow provider={provider} name={'bannerName'} />
        <FormRow provider={provider} name={'period'} element={<DateRangePickerFormField />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'status'} element={<Input readOnly={true} />} />
        <FormRow
          provider={provider}
          name={'isDisplay'}
          className={dynamicFormStyles.form_item_horizontal}
        />
        <FormItem />
      </ContentsRow>

      <FormSubTitle label={t('배너 정보')} />
      <ContentsRow>
        <FormRow provider={provider} name={'channelBannerImageFileGroupUuid'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'bannerTitle'} />
        <FormRow provider={provider} name={'buttonText'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'subTitle1'} />
        <FormRow provider={provider} name={'subTitle2'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'bannerType'} />
        <FormRow provider={provider} name={'landingUrl'} element={<Input readOnly={true} />}>
          <Button className={dynamicFormStyles.btn_find} variant={'gray'} size={'sm'}>
            {t('조회')}
          </Button>
        </FormRow>
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

const formConfig = (): DynamicFormConfig => ({
  builders: [
    {
      name: 'position',
      type: 'dropdown',
      label: t('게재 위치'),
      value: 'CHANNEL_HOME',
      options: [{ label: t('채널 홈 컨텐츠'), value: 'CHANNEL_HOME' }] },
    {
      name: 'bannerName',
      type: 'text',
      label: t('배너명'),
      value: '' },
    {
      name: 'period',
      type: 'date-range',
      label: t('게재 기간'),
      value: {
        from: undefined,
        to: undefined } },
    {
      name: 'status',
      type: 'text',
      label: t('상태'),
      value: '',
      placeholder: t('등록 후 자동생성') },
    {
      name: 'isDisplay',
      type: 'switch',
      label: t('노출 여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('노출') : t('비노출')) },
      guideText: t('게재중 상태만 배너가 노출됩니다.') },
    {
      label: t('이미지'),
      name: 'channelBannerImageFileGroupUuid',
      type: 'thumbnail-list',
      max: 1,
      value: '',
      uuidType: 'group',
      uploadConfig: {
        affairsType: 'PMS',
        s3Path: S3_PATH['public/image/channel/main'],
        acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
        maxFileSize: 50 * 1024 * 1024 },
      guideText: t(
        '파일 사이즈 000 x 000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50 MB',
      ) },
    {
      name: 'bannerTitle',
      type: 'text',
      label: t('타이틀'),
      value: '',
      maxLength: 15 },
    {
      name: 'buttonText',
      type: 'text',
      label: t('버튼 텍스트'),
      value: '',
      maxLength: 6 },
    {
      name: 'subTitle1',
      type: 'text',
      label: t('서브 타이틀 1'),
      value: '',
      maxLength: 20 },
    {
      name: 'subTitle2',
      type: 'text',
      label: t('서브 타이틀 2'),
      value: '',
      maxLength: 20 },
    {
      name: 'bannerType',
      type: 'dropdown',
      label: t('배너 유형'),
      value: '',
      presetOptionLabel: t('선택'),
      options: [
        { label: t('과정'), value: 'COURSE' },
        { label: t('패키지'), value: 'PACKAGE' },
      ] },
    {
      name: 'landingUrl',
      type: 'text',
      label: t('랜딩 URL'),
      value: '',
      guideText: t('배너 유형에 따라 랜딩 URL을 조회합니다.') },
  ],
  validator: {
    bannerName: true,
    period: {
      required: true,
      conditions: [
        {
          fn: (values) => {
            return !values.period.from || !values.period.to;
          },
          message: t('시작 및 종료 날짜를 선택하세요') },
        {
          fn: (values) => {
            return values.period.from > values.period.to;
          },
          message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.') },
      ] },
    channelBannerImageFileGroupUuid: true,
    bannerType: true } });
