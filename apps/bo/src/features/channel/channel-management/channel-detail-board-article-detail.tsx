import { FormDisplay } from '@features/form/ui/form-display';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { cn, formUtils } from '@learnway/shared';
import { ChipListModalSelectorFormField, ContentsRow, FormSubTitle, Input } from '@learnway/ui';
import { FormRow } from '@shared/ui';
import { t } from 'i18next';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

const ChannelDetailBoardArticleDetailComponent = () => {
  const { provider, updateFormData, onSubmit, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);

  return (
    <>
      <FormSubTitle label={t('게시물 대상 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name={'visibillity'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="userGroupList"
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'value',
                hideBorder: true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                content: '',
              }}
              disabled={true}
            />
          }
        />
      </ContentsRow>

      <FormSubTitle label={t('게시물 내용')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name={'boardType'} />
        <FormRow provider={provider} name={'boardCode'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'articleDivision'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'isFixed'} />
        <FormRow provider={provider} name={'duration'} />
        <FormRow provider={provider} name={'isActive'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'title'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'content'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'attachment'} />
      </ContentsRow>
      <FormSubTitle label={t('게시물 설정 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={provider} name={'isSecret'}>
          <Input type="password" disabled={true} />
        </FormRow>
        <FormRow provider={provider} name={'useCommentLike'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'useAnswer'} />
        <FormRow provider={provider} name={'useComment'} />
      </ContentsRow>
      <ContentsRow>
        <div className={cn(formStyles.form_item)}>
          <FormDisplay provider={provider} dependencies={[{ name: 'useAnswer', value: true }]}>
            <FormRow provider={provider} name={'answerType'} />
          </FormDisplay>
        </div>
        <div className={cn(formStyles.form_item)}>
          <FormDisplay provider={provider} dependencies={[{ name: 'useComment', value: true }]}>
            <FormRow provider={provider} name={'commentType'} />
          </FormDisplay>
        </div>
      </ContentsRow>
    </>
  );
};

export const ChannelDetailBoardArticleDetail = ChannelDetailBoardArticleDetailComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'visibillity',
      type: 'radio-group',
      label: t('공개 범위'),
      value: 'opt1',
      options: [
        { value: 'opt1', label: '채널 대상자' },
        { value: 'opt2', label: '개별 설정' },
      ],
    },
    {
      name: 'userGroupList',
      type: 'custom',
      label: t('유저그룹 설정'),
      format: 'array',
      value: [],
    },
    {
      name: 'boardType',
      type: 'dropdown',
      label: t('게시판 유형'),
      value: '',
      options: [{ value: '', label: t('채널 게시판') }],
    },
    {
      name: 'boardCode',
      type: 'text',
      label: t('게시판 코드'),
      value: '',
      placeholder: '',
    },
    {
      name: 'articleDivision',
      type: 'dropdown',
      label: t('게시물 분류'),
      value: '',
      options: [{ value: '', label: t('일반') }],
    },
    {
      name: 'isFixed',
      type: 'radio-group',
      label: t('고정 여부'),
      value: true,
      guideText: t('고정 게시물은 게재 기간을 선택해야 합니다.'),
      options: [
        { value: true, label: t('고정') },
        { value: false, label: t('미고정') },
      ],
    },
    {
      name: 'duration',
      type: 'date-range',
      label: t('게재 기간'),
      value: {
        from: formUtils.nowDate({ unit: 'day', offset: -30 }),
        to: formUtils.nowDate(),
      },
    },
    {
      name: 'isActive',
      type: 'radio-group',
      label: t('노출 여부'),
      value: true,
      options: [
        { value: true, label: t('노출') },
        { value: false, label: t('비노출') },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: t('제목'),
      value: '',
      placeholder: '',
    },
    {
      name: 'content',
      type: 'textarea',
      label: t('내용'),
      value: '',
    },
    {
      name: 'attachment',
      type: 'attachment',
      uploadConfig: {
        affairsType: 'PMS',
        s3Path: 'upload/temp/attachment', // 업무에 맞는 폴더로 변경해야 합니다.
        maxFileCount: 5,
        maxFileSize: 50 * 1024 * 1024,
      },
      value: [],
    },
    {
      name: 'isSecret',
      type: 'radio-group',
      label: t('비밀글 여부'),
      value: true,
      options: [
        { value: true, label: t('공개') },
        { value: false, label: t('비밀') },
      ],
    },
    {
      name: 'useCommentLike',
      type: 'radio-group',
      label: t('댓글 좋아요 여부'),
      value: true,
      options: [
        { value: true, label: t('사용') },
        { value: false, label: t('미사용') },
      ],
    },
    {
      name: 'useAnswer',
      type: 'switch',
      label: t('답글 등록 여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'useComment',
      type: 'switch',
      label: t('댓글 등록 여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'answerType',
      type: 'checkbox-group',
      label: '',
      format: 'array',
      value: [],
      showSelectAll: true,
      options: [
        { value: 'EMAIL', label: t('이메일') },
        { value: 'SMS', label: t('SMS') },
        { value: 'KAKAO', label: t('카카오톡') },
      ],
    },
    {
      name: 'commentType',
      type: 'checkbox-group',
      label: '',
      format: 'array',
      value: [],
      showSelectAll: true,
      options: [
        { value: 'EMAIL', label: t('이메일') },
        { value: 'SMS', label: t('SMS') },
        { value: 'KAKAO', label: t('카카오톡') },
      ],
    },
  ],
  validator: { duration: true, title: true, content: true },
};
