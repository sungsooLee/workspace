//  IA105 / NLP_BO_CMS_1016 / 학습자원조회_나의 학습자원_등록_동영상(자체)

import { createLazyFileRoute, Link, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { Button, ContentsRow, InputModalSelectorFormField } from '@learnway/ui';
import {
  PageContainer,
  ContentsButtons,
  LinkBox,
  MainContents,
  SubContents,
} from '@widgets/layout';
import { ChannelChoiceModal, ManagerChoiceModal } from '@features/shared';
import { DateRangePickerFormField } from '@features/form/ui';
import {
  CODE_GROUP,
  DynamicFormConfig,
  DynamicFormValues,
  useCurrentRoute,
  useDynamicForm,
} from '@learnway/hooks';
import { FormDisplay, SubTitlesFormField } from '@features/form';
import { ContentsHistoryInfoFormField, FormGroup, FormRow } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { NotFound } from '@features/layout';
import { useEffect } from 'react';
import { MovieInfo } from '@features/learning-resource';

export const Route = createLazyFileRoute('/_layout/learning/learning-resource/video/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    state: { contentUuid },
  } = useCurrentRoute();
  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );

  const router = useRouter();
  const { provider, onSubmit, onFormChange } = useDynamicForm<typeof formConfig>(formConfig);

  useEffect(() => {
    if (data) onFormChange(data);
  }, [data]);

  const handleFormSubmit = (data: DynamicFormValues<typeof formConfig>) => {
    console.log(data);
  };

  const permission = 'READ' as string; //user permission 정보 가져와야 함

  if (fetchError) {
    console.log('🚀 ~ RouteComponent ~ fetchError:', fetchError);
    return <NotFound />;
  }

  if (!data) {
    return <PageContainer />;
  }
  console.log('🚀 ~ RouteComponent ~ data:', data);

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
              onClick={() => router.navigate({ to: '/learning/learning-resource' })}
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
          <Button type="submit" variant="primary" size="sm">
            {permission === 'WRITE' ? '저장' : '수정'}
          </Button>
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            {/*채널*/}
            <FormRow
              provider={provider}
              name="channelName"
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
            <FormRow provider={provider} name="langCountryCode" />
          </ContentsRow>
          <ContentsRow>
            {/*학습자원명*/}
            <FormRow provider={provider} name="contentName" />
          </ContentsRow>
          <ContentsRow>
            {/*학습자원 설명*/}
            <FormRow provider={provider} name="description" />
          </ContentsRow>
          <ContentsRow>
            {/*담당자*/}
            <FormRow
              provider={provider}
              name="coordinatorName"
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
            <FormRow provider={provider} name="coordinatorTelNo" />
          </ContentsRow>
          <ContentsRow type="horizontal">
            {/*사용기한*/}
            <FormRow provider={provider} name="isUnlimited" />
          </ContentsRow>
          <FormDisplay provider={provider} dependencies={[{ name: 'isUnlimited', value: false }]}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="contentUseDate"
                element={<DateRangePickerFormField />}
              />
            </ContentsRow>
          </FormDisplay>
          {/*외주개발업체 정보*/}
          <ContentsRow type="horizontal" className="inactive">
            <FormRow provider={provider} name="isVendored" />
          </ContentsRow>
          {/*외주개발업체 상세*/}
          <FormDisplay provider={provider} dependencies={[{ name: 'isVendored', value: true }]}>
            <ContentsRow>
              {/*외부개발업체*/}
              <FormRow
                provider={provider}
                name="vendorName"
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
              <FormRow provider={provider} name="vendorCoordinatorName" />
              {/*외주개발업체 연락처*/}
              <FormRow provider={provider} name="vendorTelNo" />
            </ContentsRow>
          </FormDisplay>
          <ContentsRow>
            {/*썸네일*/}
            <FormRow provider={provider} name="contentThumbnailFileGroupUuid" />
          </ContentsRow>
          <ContentsRow>
            {/*태그*/}
            <FormRow provider={provider} name="tags" />
          </ContentsRow>
          <ContentsRow>
            {/*학습자원개요*/}
            <FormRow provider={provider} name="aiSummary" />
          </ContentsRow>
          <ContentsRow>
            {/* 키워드 */}
            <FormRow provider={provider} name="aiKeyword" />
          </ContentsRow>
          <ContentsRow type="horizontal" className="inactive">
            {/* 교육지원활용 여부 */}
            <FormRow provider={provider} name="isCourseUsed" />
          </ContentsRow>
          <ContentsRow type="horizontal" className="inactive">
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
              <FormRow provider={provider} name={'isInspected'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'isCopyrighted'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'isSecured'} />
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
      label: '언어',
      name: 'langCountryCode',
      type: 'dropdown',
      format: 'string',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
      },
      value: '',
    },
    {
      label: '학습자원명',
      name: 'contentName',
      type: 'text',
      format: 'string',
      value: '',
      placeholder: '학습자원명을 입력하세요.',
      maxLength: 150,
    },
    {
      label: '학습자원설명',
      name: 'description',
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
      name: 'coordinatorName',
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
      name: 'coordinatorTelNo',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'nationCode',
        number: 'coordinatorTelNo',
      },
    },
    {
      label: '사용기한',
      name: 'isUnlimited',
      type: 'switch',
      format: 'boolean',
      value: false,
      invert: true, // true일 때 switch를 끄고 false일 때 키는 옵션
      switchConfig: {
        label: (value: boolean) => (value ? '무기한' : '기간설정'),
      },
      tooltip: '사용기한 내 콘텐츠 공유/교육자원활용이  가능합니다.',
    },
    {
      name: 'contentUseDate',
      type: 'custom',
      value: {
        from: undefined, //'contentUseStartDate',
        to: undefined, //'contentUseEndDate',
      },
      fields: {
        from: undefined, //'contentUseStartDate',
        to: undefined, //'contentUseEndDate',
      },
    },
    {
      name: 'contentUseStartDate',
      type: 'hidden',
      value: '',
    },
    {
      name: 'contentUseEndDate',
      type: 'hidden',
      value: '',
    },
    {
      label: '외주개발업체정보',
      name: 'isVendored',
      type: 'switch',
      format: 'boolean',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? '있음' : '없음'),
      },
    },
    {
      name: 'vendorCoordinatorUuid',
      type: 'hidden',
      value: '',
    },
    {
      label: t('외주개발업체'),
      name: 'vendorName',
      type: 'custom',
      value: '',
    },
    {
      name: 'vendorCoordinatorUuid',
      type: 'hidden',
      value: '',
    },
    {
      label: t('외주개발업체 담당자'),
      name: 'vendorCoordinatorName',
      type: 'text',
      value: '',
    },
    {
      name: 'vendorNationCode',
      type: 'hidden',
      value: 'KR',
    },
    {
      label: t('외주개발업체 연락처'),
      name: 'vendorTelNo',
      type: 'phone-number',
      value: '',
      fields: {
        nationCode: 'vendorNationCode',
        number: 'vendorTelNo',
      },
    },
    {
      label: t('썸네일'),
      name: 'contentThumbnailFileGroupUuid',
      type: 'thumbnail-list',
      format: 'array',
      value: '',
    },
    {
      label: t('태그'),
      name: 'tags',
      format: 'array',
      type: 'chip-list',
      placeholder: '한글, 영문, 숫자 포함 9자 이하 태그를 입력하세요.',
      limitPlaceholder: '여러개의 태그는 쉼표로 구분',
      tooltip: '태그는 학습자원 검색 시 활용되고, 학습자에게는 10개까지만 보여집니다.',
      chipListConfig: {
        showInput: true,
      },
      value: [],
    },
    {
      label: t('학습자원개요 (AI 자동 추출)'),
      name: 'aiSummary',
      type: 'textarea',
      readOnly: true,
      placeholder: '키워드는 AI 자동 추출되어 표기 됩니다.',
      maxLength: 2000,
      value: '',
    },
    {
      label: t('키워드 (AI 자동 추출)'),
      name: 'aiKeyword',
      type: 'textarea',
      readOnly: true,
      placeholder: '키워드는 AI 자동 추출되어 표기 됩니다.',
      maxLength: 2000,
      value: '',
    },
    {
      label: t('교육지원활용 여부'),
      name: 'isCourseUsed',
      type: 'switch',
      format: 'boolean',
      switchConfig: {
        label: (value: boolean) => (value ? '활용가능' : '활용불가'),
      },
      guideText: '해당 학습자원으로 교육 과정을 개설할 수 없습니다.',
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
      name: 'isInspected',
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
      name: 'isCopyrighted',
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
      name: 'isSecured',
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
