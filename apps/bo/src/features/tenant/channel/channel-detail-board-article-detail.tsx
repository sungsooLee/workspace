import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import {
  ContentsRow,
  ChipListModalSelectorFormField,
  Input,
  Button,
  DndFileProgress,
} from '@learnway/ui';
import { FormRow, FormSubTitle } from '@shared/ui';
import {
  DynamicFormConfig,
  useDynamicForm,
  useS3Uploader,
  useSearchBox,
  SearchBoxConfig,
} from '@learnway/hooks';
import { FormDisplay } from '@features/form/ui/form-display';
import { formUtils } from '@entities/form-utils';
import { t } from 'i18next';
import { IcoPaperClip } from '@learnway/icons';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

const ChannelDetailBoardArticleDetailComponent = () => {
  const maxFileCount = 5;
  const maxFileSize = 1024 * 1024 * 50;

  const { provider, fetchData, onSubmit, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);

  const { stats, files, addFiles, onPause, onRetry, onResume, onRemove } = useS3Uploader({
    s3Path: 'upload/learning/resource/video',
    maxFileCount,
  });

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

      <ContentsRow type={'horizontal'}>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name" className={formStyles.form_label}>
            <span className={formStyles.form_text}>파일 올리기</span>
            <span className={formStyles.file_info}>
              <IcoPaperClip
                width={'16'}
                height={'17'}
                stroke={'#131C30'}
                className={formStyles.icon_clip}
              />
              <span className={formStyles.file_length}>
                <strong className={formStyles.num}>0</strong>
                {'개'}
              </span>
              <span className={formStyles.file_volume}>
                <em className={formStyles.volume}>0</em>
                {'KB'}
              </span>
            </span>
          </label>
          <div className={formStyles.input_box}>
            <span className={formStyles.sub_text}>{'최대 5개, 최대 파일 사이즈 50MB'}</span>
            <Button variant={'line'} size={'sm'} className={formStyles.btn_add}>
              {'추가'}
            </Button>
            <Button variant={'line'} size={'sm'} className={formStyles.btn_save}>
              {'저장'}
            </Button>
            <Button variant={'line'} size={'sm'} disabled className={formStyles.btn_delete}>
              {'삭제'}
            </Button>
          </div>
        </div>
      </ContentsRow>
      <div className={dynamicFormStyles.dnd_wrap}>
        <DndFileProgress
          files={[]}
          maxFileCount={maxFileCount}
          maxFileSize={maxFileSize}
          acceptFiles={[]}
          addFiles={addFiles}
          onRemove={onRemove}
          onPause={onPause}
          onResume={onResume}
          onRetry={onRetry}
        />
      </div>

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
      guideText: '고정 게시물은 게재 기간을 선택해야 합니다.',
      options: [
        { value: true, label: '고정' },
        { value: false, label: '미고정' },
      ],
    },
    {
      name: 'duration',
      type: 'date-range',
      label: t('게재 기간'),
      value: {
        from: formUtils.now({ unit: 'day', offset: -30 }),
        to: formUtils.now(),
      },
    },
    {
      name: 'isActive',
      type: 'radio-group',
      label: t('노출 여부'),
      value: true,
      options: [
        { value: true, label: '노출' },
        { value: false, label: '비노출' },
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
      name: 'isSecret',
      type: 'radio-group',
      label: t('비밀글 여부'),
      value: true,
      options: [
        { value: true, label: '공개' },
        { value: false, label: '비밀' },
      ],
    },
    {
      name: 'useCommentLike',
      type: 'radio-group',
      label: t('댓글 좋아요 여부'),
      value: true,
      options: [
        { value: true, label: '사용' },
        { value: false, label: '미사용' },
      ],
    },
    {
      name: 'useAnswer',
      type: 'switch',
      label: t('답글 등록 여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'useComment',
      type: 'switch',
      label: t('댓글 등록 여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
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
        { value: 'EMAIL', label: '이메일' },
        { value: 'SMS', label: 'SMS' },
        { value: 'KAKAO', label: '카카오톡' },
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
        { value: 'EMAIL', label: '이메일' },
        { value: 'SMS', label: 'SMS' },
        { value: 'KAKAO', label: '카카오톡' },
      ],
    },
  ],
  validator: { duration: true, title: true, content: true },
};
