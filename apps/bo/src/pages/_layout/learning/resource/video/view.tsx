import React from 'react';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { Button, ContentsRow, DynamicFormField, InputModalSelectorFormField } from '@learnway/ui';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { SubContents } from '../../../../../widgets/layout/ui/container/slot/sub-contents';
import { MovieInfo } from '../../../../../features/learning';
import { ChannelChoiceModal, ManagerChoiceModal } from '../../../../../features/shared';
import { DateRangePickerFormField } from '../../../../../features/learning/ui/resource/date-range-picker-form-field';
import {
  DynamicFormConfig,
  DynamicFormValues,
  useCurrentRoute,
  useDynamicForm,
} from '@learnway/hooks';
import { FormDisplay } from '../../../../../features/form/ui/form-display';
import { ContentsHistoryInfoFormField, FormGroup, FormRow } from '../../../../../shared/ui/form';
import { SubTitlesFormField } from '../../../../../features/form/ui';
import { LinkBox } from '../../../../../widgets/layout/ui/container/slot/link-box';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_layout/learning/resource/video/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const {
    state: { permission },
  } = useCurrentRoute();
  const { t } = useTranslation();
  const { provider, onSubmit } = useDynamicForm<typeof formConfig>(formConfig);

  const handleFormSubmit = (data: DynamicFormValues<typeof formConfig>) => {
    console.log(data);
  };

  const openModal = () => {
    // 모달 다으면 oncofmr(value)
  };
  return (
    <form onSubmit={onSubmit(handleFormSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <LinkBox>
            {permission === 'READ' && (
              <>
                <Link to={'/'}>상시 학습 개설</Link>
                <Link to={'/'}>이러닝 개설</Link>
                <Link to={'/'}>라이브개설</Link>
              </>
            )}
            <Button
              variant="point"
              size="sm"
              onClick={() => router.navigate({ to: '/learning/resource' })}
            >
              목록
            </Button>
          </LinkBox>
          {permission === 'READ' && (
            <>
              <Button variant="point" size="sm">
                매핑과정 보기
              </Button>
              <Button variant="point" size="sm">
                공유이력 보기
              </Button>
            </>
          )}
          <Button variant="point" size="sm">
            삭제
          </Button>
          <Button type={'submit'} variant="primary" size="sm">
            {permission === 'WRITE' ? '저장' : '수정'}
          </Button>
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            {/*채널*/}
            <FormRow
              provider={provider}
              name={'channelName'}
              element={
                <InputModalSelectorFormField
                  modalConfig={{
                    title: '',
                    width: 'md',
                    content: <ChannelChoiceModal />,
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            {/*학습자원명*/}
            <FormRow provider={provider} name={'learningResourceName'} />
          </ContentsRow>
          <ContentsRow>
            {/*학습자원 설명*/}
            <FormRow provider={provider} name={'learningResourceDescription'} />
          </ContentsRow>
          <ContentsRow>
            {/*담당자*/}
            <FormRow
              provider={provider}
              name={'managerName'}
              element={
                <InputModalSelectorFormField
                  modalConfig={{
                    title: '',
                    width: 'md',
                    content: <ManagerChoiceModal />,
                  }}
                />
              }
            />
            {/*연락처*/}
            <FormRow provider={provider} name={'contact'} />
          </ContentsRow>
          <ContentsRow type={'horizontal'}>
            {/*사용기한*/}
            <FormRow provider={provider} name={'expirationDate'} />
          </ContentsRow>
          <FormDisplay provider={provider} dependencies={[{ name: 'expirationDate', value: true }]}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'expirationDateFrom'}
                element={<DateRangePickerFormField />}
              />
            </ContentsRow>
          </FormDisplay>
          {/*외주개발업체 정보*/}
          <ContentsRow type={'horizontal'} className={'inactive'}>
            <FormRow provider={provider} name={'isExternalDevelopmentCompany'} />
          </ContentsRow>
          {/*외주개발업체 상세*/}
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isExternalDevelopmentCompany', value: true }]}
          >
            <ContentsRow>
              {/*외부개발업체*/}
              <FormRow
                provider={provider}
                name={'externalDevelopmentCompany'}
                element={
                  <InputModalSelectorFormField
                    modalConfig={{
                      title: '',
                      width: 'md',
                      content: <ManagerChoiceModal />,
                    }}
                  />
                }
              />
            </ContentsRow>
            <ContentsRow>
              {/*외주개발업체 담당자*/}
              <FormRow provider={provider} name={'externalDevelopmentCompanyManager'} />
              {/*외주개발업체 연락처*/}
              <FormRow provider={provider} name={'externalDevelopmentCompanyContact'} />
            </ContentsRow>
          </FormDisplay>

          <ContentsRow>
            {/*썸네일*/}
            <FormRow provider={provider} name="thumbnails" />
          </ContentsRow>
          <ContentsRow>
            {/*태그*/}
            <FormRow provider={provider} name="tags" />
          </ContentsRow>
          <ContentsRow>
            {/*학습자원개요*/}
            <FormRow provider={provider} name="learningResourceOverview" />
          </ContentsRow>

          <ContentsRow>
            {/* 키워드 */}
            <FormRow provider={provider} name="keywords" />
          </ContentsRow>
          <ContentsRow type={'horizontal'} className={'inactive'}>
            {/* 교육지원활용 여부 */}
            <FormRow provider={provider} name="isTrainingSupport" />
          </ContentsRow>
          <ContentsRow type={'horizontal'} className={'inactive'}>
            {/* 보안컨텐츠 여부 */}
            <FormRow provider={provider} name="isSecurityContent" />
          </ContentsRow>
          <ContentsRow type={'horizontal'} className={'inactive'}>
            {/* 자막 여부 */}
            <FormRow provider={provider} name={'isSubtitles'} />
          </ContentsRow>
          <FormDisplay provider={provider} dependencies={[{ name: 'isSubtitles', value: true }]}>
            <ContentsRow>
              {/*자막 목록*/}
              <FormRow provider={provider} name={'subtitles'} element={<SubTitlesFormField />} />
            </ContentsRow>
          </FormDisplay>
          <FormGroup title={'최종확인'} required={true}>
            <ContentsRow>
              <FormRow provider={provider} name={'isInspectionConfirmed'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'isCopyrightConfirmed'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'isSecurityConfirmed'} />
            </ContentsRow>
          </FormGroup>
          <ContentsHistoryInfoFormField />
        </MainContents>
        <SubContents>
          <MovieInfo status={'loading'} />
          <MovieInfo status={'fail'} />
          <MovieInfo status={'success'} />
        </SubContents>
      </PageContainer>
    </form>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channelId',
      type: 'hidden',
      format: 'string',
      value: '',
    },
    {
      label: '채널',
      name: 'channelName',
      type: 'custom',
      format: 'string',
      value: '',
    },
    {
      label: '학습자원명',
      name: 'learningResourceName',
      type: 'text',
      format: 'string',
      value: '',
      placeholder: '학습자원명을 입력하세요.',
      maxLength: 150,
    },
    {
      label: '학습자원설명',
      name: 'learningResourceDescription',
      type: 'textarea',
      format: 'string',
      value: '',
      placeholder: '콘텐츠에 대한 설명을 입력해주세요.',
      maxLength: 2000,
    },
    {
      name: 'managerId',
      type: 'text',
      format: 'string',
      value: '',
    },
    {
      label: '담당자',
      name: 'managerName',
      type: 'custom',
      format: 'string',
      value: '',
    },
    {
      label: '연락처국가코드',
      name: 'nationCode',
      type: 'hidden',
      format: 'string',
      value: 'KR',
    },
    {
      label: '연락처',
      name: 'contact',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'nationCode',
        number: 'contact',
      },
    },
    {
      label: '사용기한',
      name: 'expirationDate',
      type: 'switch',
      format: 'boolean',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? '기간설정' : '무기한'),
      },
      tooltip: '사용기한 내 콘텐츠 공유/교육자원활용이  가능합니다.',
    },
    {
      name: 'expirationDateFrom',
      type: 'custom',
      value: '',
      fields: {
        from: 'expirationDateFrom',
        to: 'expirationDateTo',
      },
    },
    {
      name: 'expirationDateTo',
      type: 'hidden',
      value: '',
    },
    {
      label: '외주개발업체정보',
      name: 'isExternalDevelopmentCompany',
      type: 'switch',
      format: 'boolean',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? '있음' : '없음'),
      },
    },
    {
      label: t('외주개발업체'),
      name: 'externalDevelopmentCompany',
      type: 'custom',
      value: '',
    },
    {
      label: t('외주개발업체 담당자'),
      name: 'externalDevelopmentCompanyManager',
      type: 'text',
      value: '',
    },
    {
      name: 'externalDevelopmentCompanyNationCode',
      type: 'hidden',
      value: 'KR',
    },
    {
      label: t('외주개발업체 연락처'),
      name: 'externalDevelopmentCompanyContact',
      type: 'phone-number',
      value: '',
      fields: {
        nationCode: 'externalDevelopmentCompanyNationCode',
        number: 'externalDevelopmentCompanyContact',
      },
    },
    {
      label: t('썸네일'),
      name: 'thumbnails',
      type: 'thumbnail-list',
      format: 'array',
      value: [],
    },
    {
      label: t('태그'),
      name: 'tags',
      format: 'array',
      type: 'chip-list',
      placeholder: '한글, 영문, 숫자 포함 9자 이하 태그를 입력하세요.(9자 초과할 경우 얼럿)',
      limitPlaceholder: '여러개의 태그는 쉼표로 구분',
      tooltip: '태그는 학습자원 검색 시 활용되고, 학습자에게는 10개까지만 보여집니다.',
      value: [],
    },
    {
      label: t('학습자원개요 (AI 자동 추출)'),
      name: 'learningResourceOverview',
      type: 'textarea',
      readOnly: true,
      placeholder: '키워드는 AI 자동 추출되어 표기 됩니다.',
      maxLength: 2000,
      value: '',
    },
    {
      label: t('키워드 (AI 자동 추출)'),
      name: 'keywords',
      type: 'textarea',
      readOnly: true,
      placeholder: '키워드는 AI 자동 추출되어 표기 됩니다.',
      maxLength: 2000,
      value: '',
    },
    {
      label: t('교육지원활용 여부'),
      name: 'isTrainingSupport',
      type: 'switch',
      format: 'boolean',
      switchConfig: {
        label: (value: boolean) => (value ? '활용가능' : '활용불가'),
      },
      guideText: '해당 학습자원으로 교육 과정을 개설할 수 없습니다.',
      value: true,
    },
    {
      label: t('보안컨텐츠여부'),
      name: 'isSecurityContent',
      type: 'switch',
      format: 'boolean',
      switchConfig: {
        label: (value: boolean) => (value ? '보안 적용' : '보안 미적용'),
      },
      guideText:
        '동영상에 워터마크가 제공되고, DRM 솔루션 적용 및 화면캡쳐 방지 기능이 적용되어 동영상 보안을 강화할수 없습니다.',
      value: true,
    },
    {
      label: t('자막여부'),
      name: 'isSubtitles',
      type: 'switch',
      format: 'boolean',
      switchConfig: {
        label: (value: boolean, getValues) =>
          value ? `자막 ${getValues().subtitles.length}개` : '자막 없음',
        labelTarget: 'subtitles',
      },
      value: true,
    },
    {
      name: 'subtitles',
      type: 'custom',
      format: 'array',
      value: [],
    },
    {
      label: t('검수확인'),
      name: 'isInspectionConfirmed',
      type: 'checkbox',
      format: 'boolean',
      guideText: '등록하고자 한 동영상이며, 처음부터 끝까지 정상적으로 재생됨이 확인되었습니다.',
      checkConfig: {
        reverse: true,
      },
      value: false,
    },
    {
      label: t('저작권확인'),
      name: 'isCopyrightConfirmed',
      format: 'boolean',
      guideText:
        '저작권법(제25조2항)에 따라 학습자원(동영상,이미지등)은 해당 학습플랫폼에서만 이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법 위반에 해당될 수 있음에 동의합니다.',
      type: 'checkbox',
      checkConfig: {
        reverse: true,
      },
      value: false,
    },
    {
      label: t('보안확인'),
      name: 'isSecurityConfirmed',
      format: 'boolean',
      guideText:
        '보안콘텐츠 미 설정 시, 불법복제, 무단사용,저작권 침해 위험에 노출되고, 이에 따른 피해를 입을 수 있음에 인지합니다',
      type: 'checkbox',
      checkConfig: {
        reverse: true,
      },
      value: false,
    },
  ],
  validator: {
    channelName: true,
    learningResourceName: true,
    managerName: true,
    contact: {
      required: {
        fn: (values) => values.contact || values.nationCode,
      },
    },
  },
};
