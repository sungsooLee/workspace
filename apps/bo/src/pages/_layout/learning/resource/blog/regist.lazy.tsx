import { createLazyFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { Button, ChipListModalSelectorFormField, ContentsRow } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@widgets/layout';
import { FormRow } from '@shared/ui';
import { ChannelListChoiceModal } from '@features/shared';

import styles from './blog-detail.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/blog/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const formConfig: DynamicFormConfig = {
    builders: [
      {
        label: t('채널'),
        name: 'channelUuid',
        type: 'text',
        format: 'array',
        value: [],
        placeholder: '채널명을 입력해주세요.',
        description: '',
      },
      {
        label: t('학습자원명'),
        name: 'contentName',
        type: 'text',
        format: 'string',
        value: '',
        placeholder: '학습자원명을 입력해주세요.',
        maxLength: 150,
      },
      {
        label: t('학습자원 설명'),
        name: 'description',
        type: 'textarea',
        format: 'string',
        value: '',
        placeholder: '콘텐츠에 대한 설명을 입력해주세요.',
        maxLength: 2000,
      },
      {
        label: t('담당자'),
        name: 'coordinatorUuid',
        type: 'text',
        format: 'array',
        value: [],
        placeholder: '담당자명을 입력해주세요.',
      },
      {
        label: t('연락처'),
        name: 'coordinatorTelNo',
        type: 'phone-number',
        value: '',
        fields: {
          nationCode: 'coordinatorNationCode',
          number: 'coordinatorTelNo',
        },
      },
      {
        label: '사용기한',
        name: 'isContentUseDateExist',
        type: 'switch',
        format: 'boolean',
        value: false,
        switchConfig: {
          label: (value: boolean) => (value ? '기간설정' : '무기한'),
        },
        tooltip: '사용기한 내 콘텐츠 공유/교육자원활용이  가능합니다.',
      },
      {
        name: 'contentUseEndDate',
        type: 'custom',
        value: '',
        fields: {
          from: 'contentUseEndDate',
          to: 'contentUseStartDate',
        },
      },
      {
        name: 'contentUseStartDate',
        type: 'hidden',
        value: '',
      },
      {
        label: '외주개발업체 정보',
        name: 'isVendorExist',
        type: 'switch',
        format: 'boolean',
        value: false,
        switchConfig: {
          label: (value: boolean) => (value ? '있음' : '없음'),
        },
      },
      {
        label: t('개발업체'),
        name: 'vendorCode', // vendorName
        type: 'text',
        format: 'array',
        value: [],
        placeholder: '',
        description: '',
      },
      {
        label: t('외주개발업체 담당자'),
        name: 'vendorCoordinatorName', // vendorCoordinatorUuid
        type: 'text',
        format: 'array',
        value: [],
        placeholder: '',
        description: '',
      },
      {
        label: t('외주개발업체 연락처'),
        name: 'vendorTelNo',
        type: 'phone-number',
        value: '',
        fields: {
          nationCode: 'vendorTelNoNationCode',
          number: 'vendorTelNo',
        },
      },
      {
        label: t('블로그 내용'),
        name: 'blogContent',
        type: 'custom',
        value: '',
      },
      {
        label: t('학습 시간'),
        name: 'contentTime',
        type: 'custom',
        value: '',
        tooltip: '해당 학습자원으로 학습 시 걸리는 시간(참고용)',
      },
      {
        label: t('썸네일'),
        name: 'contentThumbnailFileGroupUuid',
        type: 'thumbnail-list',
        max: 3,
        format: 'array',
        value: [],
        description: '학습자원을 표현하는 썸네일을 선택하거나 업로드 하세요. (미선택 시 자동 선택)',
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
        label: t('공유채널 설정'),
        name: 'sharedChannels',
        type: 'custom',
        format: 'array',
        tooltip: '공유채널 설정',
        value: [
          {
            tenantId: 'tenantId1',
            tenantName: 'tenantName1',
            channelId: 'Channel Id1',
            channelName: 'Channel Name1',
            checked: true,
          },
        ],
      },
    ],
    validator: {},
  };

  const { provider, onSubmit, control, getValues, updateFormData } = useDynamicForm(formConfig);

  const handleOnSubmit = async (data: any): Promise<void> => {
    console.log(data);
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="button" variant="point" size="sm">
            목록
          </Button>
          <Button type="button" variant="point" size="sm">
            삭제
          </Button>
          <Button type="submit" variant="primary" size="sm">
            저장
          </Button>
        </ContentsButtons>
        <MainContents>
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
          <ContentsRow>
            <FormRow provider={provider} name="contentName" />
          </ContentsRow>
        </MainContents>
        <SubContents>
          <div className={styles.sub_container}>
            <strong className={styles.title}>{t('블로그')}</strong>
          </div>
        </SubContents>
      </PageContainer>
    </form>
  );
}
