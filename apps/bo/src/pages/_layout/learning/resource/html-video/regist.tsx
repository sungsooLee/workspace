import { t } from 'i18next';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  InputModalSelectorFormField,
  useModal,
} from '@learnway/ui';
import { ContentsHistoryInfoFormField, FormGroup, FormRow } from '@shared/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ContentsButtons, MainContents, PageContainer } from '@widgets/layout';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { SubContents } from '@widgets/layout/ui/container/slot/sub-contents';
import { LearningResourceFileUploadModal, SharedChannelGridFormField } from '@features/learning';
import styles from './test-detail.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { cn } from '@learnway/shared';
import style from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import { leaningResourceQueryOptions } from '@entities/leaning-resource';
import { LEARNING_TYPE } from '@learnway/config';
import { ChannelListChoiceModal, ManagerChoiceModal } from '@features/shared';
import { FormDisplay } from '@features/form/ui/form-display';
import { DateRangePickerFormField } from '@features/learning/ui/resource/date-range-picker-form-field';

export const Route = createFileRoute('/_layout/learning/resource/html-video/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const formConfig: DynamicFormConfig = {
    builders: [
      {
        name: 'channelUuids',
        type: 'text',
        label: t('채널'),
        format: 'array',
        value: [],
        placeholder: '',
        description: '',
      },
      {
        name: 'learningResourceName',
        type: 'text',
        label: t('학습자원명'),
        format: 'array',
        value: [],
        placeholder: '입력',
        description: '',
        maxLength: 150,
      },
      {
        name: 'learningResourceDescription',
        label: '학습자원설명',
        type: 'textarea',
        format: 'string',
        value: '',
        placeholder: '콘텐츠에 대한 설명을 입력해주세요.',
        maxLength: 2000,
      },
      {
        name: 'manager',
        type: 'text',
        label: t('담당자'),
        format: 'array',
        value: [],
        placeholder: '',
        description: '',
      },
      {
        label: t('연락처'),
        name: 'contact',
        type: 'phone-number',
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
        name: 'externalDevelopmentCompany',
        type: 'text',
        label: t('개발업체'),
        format: 'array',
        value: [],
        placeholder: '',
        description: '',
      },
      {
        name: 'externalDevelopmentCompanyManager',
        type: 'text',
        label: t('외주개발업체 담당자'),
        format: 'array',
        value: [],
        placeholder: '',
        description: '',
      },
      {
        name: 'externalDevelopmentCompanyContact',
        type: 'phone-number',
        label: t('외주개발업체 연락처'),
        value: '',
        fields: {
          nationCode: 'nationCode',
          number: 'contact',
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
        label: t('공유채널 설정'),
        name: 'sharedChannels',
        type: 'custom',
        format: 'array',
        value: [
          {
            tenantId: 'tenantId1',
            tenantName: 'tenantName1',
            channelId: 'Channel Id1',
            channelName: 'Channel Name1',
            checked: true,
          },
        ],
        guideText: '공유채널 설정',
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
      companyModal: true,
      language: true,
      learningResourceName: true,
      manager: true,
      contact: true,
      expirationDate: true,
      thumbnails: true,
      tags: true,
      sharedChannels: true,
    },
  };

  const infoList = [
    { title: '파일명', text: '화면 기록 2024-11-28 오후 3.00.55.zip' },
    { title: '파일용량', text: '1.97GB' },
    { title: '파일형식', text: 'ZIP' },
  ];

  const { provider, onSubmit, control, getValues, fetchData } = useDynamicForm(formConfig);
  const { open: openModal } = useModal();
  const handleOnSubmit = () => {
    //
  };
  const { confirm: openConfirm } = useModal();

  const onSave = async () => {
    const feedback = await openConfirm({
      title: t('LABEL.confirm.save.title'),
      content: t('LABEL.confirm.save.message'),
    });
    feedback && save();
  };
  const goList = async () => {
    const feedback = await openConfirm({
      title: t('LABEL.confirm.list.title'),
      content: t('LABEL.confirm.list.message'),
    });
    feedback && save();
  };
  const onDelete = async () => {
    const feedback = await openConfirm({
      title: t('LABEL.confirm.delete.title'),
      content: (
        <p>{`모든 정보가 삭제되며 복구 불가합니다.\n삭제 후 학습자원 조회화면으로 이동합니다.`}</p>
      ),
    });
    feedback && save();
  };

  const save = () => {
    console.log('save');
  };

  const onFileChange = async (params: { contentUuid: string; fileUuid: string }) => {
    await leaningResourceQueryOptions.updateHTML5FileChange(params);
  };

  const openFileUpload = async () => {
    const videoUploadResult = await openModal({
      content: (
        <LearningResourceFileUploadModal
          channel={{ channelId: '', channelName: '' }}
          type={LEARNING_TYPE.VIDEO}
        />
      ),
      width: 'lg',
    });
  };

  const downloadOriginal = () => {
    console.log('download');
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button variant="point" size="sm">
            과정개설
          </Button>
          <Button variant="point" size="sm">
            매핑과정
          </Button>
          <Button variant="point" size="sm">
            공유이력
          </Button>
          <Button type={'button'} variant="point" size="sm" onClick={goList}>
            목록
          </Button>
          <Button type={'button'} variant="point" size="sm" onClick={onDelete}>
            삭제
          </Button>
          <Button type={'button'} variant="point" size="sm" onClick={onSave}>
            저장
          </Button>
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            <FormRow
              provider={provider}
              name="channelUuids"
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
            <FormRow provider={provider} name={'learningResourceName'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'learningResourceDescription'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'manager'} />
            <FormRow provider={provider} name={'contact'} />
          </ContentsRow>

          <ContentsRow type={'horizontal'} className={'inactive'}>
            <FormRow provider={provider} name={'expirationDate'} />
          </ContentsRow>
          {/* 사용기한 상세 */}
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
            <FormRow provider={provider} name="thumbnails" />
          </ContentsRow>
          <ContentsRow>
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
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'sharedChannels'}
              element={<SharedChannelGridFormField />}
            />
          </ContentsRow>
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
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </MainContents>
        <SubContents>
          <div className={styles.sub_container}>
            <strong className={style.title}>{t('업로드 파일')}</strong>
            <ul className={style.btn_list}>
              <li>
                <Button
                  className={style.btn_text}
                  label={t('원본 다운로드')}
                  onClick={downloadOriginal}
                />
              </li>
              <li>
                <Button
                  className={style.btn_text}
                  label={t('파일 변경')}
                  onClick={openFileUpload}
                />
              </li>
            </ul>
            {/* media(비디오 영역) */}
            <div className={style.media}>
              <img src={'https://picsum.photos/200'} width="100%" alt="" />
            </div>
            {/* info_list */}
            <ul className={style.info_list}>
              {infoList.map((item, index) => (
                <li key={index}>
                  <span className={style.title}>{item.title}</span>
                  <span className={style.text}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </SubContents>
      </PageContainer>
    </form>
  );
}
