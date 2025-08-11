import { CODE_GROUP, DynamicFormProvider } from '@learnway/hooks';
import { ContentsRow } from '@learnway/ui/contents-row';
import {
  EditorFormField,
  InputModalSelectorFormField,
  TextareaFormField,
} from '@learnway/ui/form-field';
import { Input } from '@learnway/ui/input';

import {
  ChipListFormField,
  DateRangePickerFormField,
  DropdownFormField,
  FormDisplay,
  FormRow2,
  SecondDurationTimeFormField,
  SwitchFormField,
} from '@shared/ui/form';
import { ChannelChoiceModal, ManagerChoiceModal, UserChoiceModal } from '@shared/ui/modal';

import { ContentCreateType, EnFormMode } from '@shared/types/enums';

import { useFetchAuthUser } from '@learnway/auth/entities';
import { User } from '@learnway/types';
import { useTranslation } from 'react-i18next';

const LearningResourceBaseFormComponent = ({
  provider,
  formMode = EnFormMode.NONE,
  hasMapping = false,
  showAiInfo = false,
  showLessonTime = false,
  readOnlyLessonTime = false,
  showBlogEditor = false,
  contentNameMaxLength = 150,
  createType = ContentCreateType.MANUAL,
}: {
  provider: DynamicFormProvider;
  formMode?: EnFormMode;
  /** 과정 매핑 여부 */
  hasMapping?: boolean;
  /** AI 관련 필드 노출 여부  */
  showAiInfo?: boolean;
  /** 학습 시간 노출 여부 */
  showLessonTime?: boolean;
  readOnlyLessonTime?: boolean;
  /** 블로그 에디터 노출 여부 */
  showBlogEditor?: boolean;
  /** 교육자원명 입력 가능한 글자수 (기본 최대 150자이나 다른 경우 존재함) */
  contentNameMaxLength?: number;
  /** 교육자원 생성 타입 (수기/번역/공유) */
  createType?: ContentCreateType;
}) => {
  const { data: authUser } = useFetchAuthUser();
  const { t } = useTranslation();

  const { watch } = provider;
  const isCourseUsed = watch('isCourseUsed');

  const editDisabled = hasMapping || createType !== ContentCreateType.MANUAL;

  return (
    <>
      <ContentsRow>
        <FormRow2 provider={provider} name="contentUuid" type="hidden" format="string" />
        {/* 테넌트 ID */}
        <FormRow2 provider={provider} name="tenantId" type="hidden" format="string" />
        {/*채널 */}
        <FormRow2 provider={provider} name="channelUuid" type="hidden" format="string" />
        <FormRow2
          provider={provider}
          name="channelName"
          label={t('채널')}
          validation={{ required: true }}
          format="object"
          element={
            <InputModalSelectorFormField
              modalConfig={{
                title: '',
                width: 'md',
                content: <ChannelChoiceModal />,
              }}
              transformModalData={(modalData: any) => {
                return {
                  channelName: modalData.channelName,
                  channelUuid: modalData.channelUuid,
                  tenantId: modalData.tenantId,
                };
              }}
            />
          }
          readOnly={
            hasMapping ||
            [
              'CHANNEL_OWNER',
              'CHANNEL_MEMBER',
              'CHANNEL_GUEST_OPERATION',
              'CHANNEL_GUEST_COURSE',
            ].includes(authUser?.activeRole?.roleType ?? '')
          }
        />
        {/*언어*/}
        <FormRow2
          provider={provider}
          name="languageCountryCode"
          label={t('언어')}
          format="object"
          validation={{ required: true }}
          element={
            <DropdownFormField
              optionsConfig={{
                codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
              }}
            />
          }
        />
      </ContentsRow>
      {/*교육자원명*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="contentName"
          label={t('교육자원명')}
          value=""
          validation={{ required: true }}
          element={<Input type="text" maxLength={contentNameMaxLength} readOnly={hasMapping} />}
        />
      </ContentsRow>
      {/*교육자원 설명*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="description"
          label={t('교육자원 설명')}
          value=""
          element={<TextareaFormField maxLength={2000} />}
        />
      </ContentsRow>
      {/*담당자*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          label={t('담당자')}
          name="coordinatorName"
          validation={{ required: true }}
          element={
            <InputModalSelectorFormField
              modalConfig={{
                title: '',
                width: 'md',
                content: <UserChoiceModal title={t('담당자')} />,
              }}
              transformModalData={(data: User) => ({
                coordinatorUuid: data.uuid,
                coordinatorName: data.name, // `${data.name}/${data?.dept?.deptName}/${data?.company?.name}`,
                coordinatorTelNo: data.phoneNumber,
              })}
            />
          }
        />
        <FormRow2 provider={provider} type="hidden" name="coordinatorUuid" />
        {/*연락처*/}
        <FormRow2
          provider={provider}
          name="coordinatorTelNo"
          label={t('연락처')}
          format="text"
          validation={{ required: true }}
          value=""
          element={<Input />}
        />
      </ContentsRow>
      {/* 사용기한 */}
      <ContentsRow type="horizontal" className="inactive">
        <FormRow2
          provider={provider}
          label={t('사용기한')}
          name="isUnlimited"
          tooltip={t('사용기한 내 콘텐츠 공유/교육자원활용이 가능합니다.')}
          format="boolean"
          value={true}
          switchConfig={{
            label: (value: boolean) => (value ? '무기한' : '기간설정'),
          }}
          element={<SwitchFormField invert disabled={editDisabled} />}
        />
      </ContentsRow>
      {/* 사용기한 상세 */}
      <FormDisplay provider={provider} dependencies={[{ name: 'isUnlimited', value: false }]}>
        <ContentsRow className="pt-0">
          <FormRow2
            provider={provider}
            name="contentUseDate"
            format="object"
            element={<DateRangePickerFormField disabled={editDisabled} />}
          />
        </ContentsRow>
      </FormDisplay>
      {/*외주개발업체 정보*/}
      <ContentsRow type="horizontal" className="inactive">
        <FormRow2
          provider={provider}
          label={t('외주개발업체정보')}
          name="isVendored"
          element={<SwitchFormField disabled={editDisabled} />}
          value={false}
          format="boolean"
          switchConfig={{
            label: (value: boolean) => (value ? t('있음') : t('없음')),
          }}
        />
      </ContentsRow>
      {/*외주개발업체 상세*/}
      <FormDisplay provider={provider} dependencies={[{ name: 'isVendored', value: true }]}>
        <ContentsRow>
          {/*외부개발업체*/}
          <FormRow2
            provider={provider}
            name="vendorName"
            label={t('외주개발업체')}
            format="object"
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  title: '',
                  width: 'md',
                  content: <ManagerChoiceModal />,
                }}
                disabled={formMode === EnFormMode.VIEW || editDisabled}
              />
            }
          />
        </ContentsRow>
        <ContentsRow>
          {/*외주개발업체 담당자*/}
          <FormRow2
            provider={provider}
            label={t('외주개발업체 담당자')}
            name="vendorCoordinatorName"
            value=""
            element={<Input readOnly={editDisabled} />}
          />
          {/*외주개발업체 연락처*/}
          <FormRow2
            provider={provider}
            label={t('외주개발업체 연락처')}
            name="vendorTelNo"
            format="text"
            value=""
            element={<Input readOnly={editDisabled} />}
          />
        </ContentsRow>
      </FormDisplay>

      {/* 블로그 에디터 */}
      {showBlogEditor && (
        <ContentsRow>
          <FormRow2
            provider={provider}
            name="blogContent"
            label={t('블로그 내용')}
            format="object"
            value={{}}
            validation={{ required: true }}
            element={<EditorFormField />}
          />
        </ContentsRow>
      )}

      {/*학습 시간*/}
      {showLessonTime && (
        <ContentsRow>
          <FormRow2
            provider={provider}
            name="contentAddInfo"
            label={t('학습 시간')}
            format="number"
            value={0}
            validation={{ required: true }}
            element={<SecondDurationTimeFormField readOnly={readOnlyLessonTime || editDisabled} />}
          />
        </ContentsRow>
      )}
      {/*태그*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          label="태그"
          name="tags"
          value={[]}
          validation={{ required: true }}
          element={<ChipListFormField />}
          placeholder={t('한글, 영문, 숫자 포함 9자 이하 태그를 입력하세요.')}
          limitPlaceholder={t('여러개의 태그는 쉼표로 구분')}
          tooltip={t('태그는 교육자원 검색 시 활용되고, 학습자에게는 10개까지만 보여집니다.')}
          chipListConfig={{
            showInput: true,
            labelField: 'tagName',
            valueField: 'tagId',
          }}
        />
      </ContentsRow>
      {/*교육자원 개요 (AI 자동추출), 키워드 (AI 자동 추출)*/}
      {showAiInfo && (
        <>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="aiSummary"
              label={t('교육자원 개요 (AI 자동 추출)')}
              value=""
              element={<TextareaFormField maxLength={2000} readOnly />}
              placeholder={t('키워드는 AI 자동 추출되어 표기됩니다.')}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="aiKeyword"
              label={t('키워드 (AI 자동 추출)')}
              value=""
              element={<TextareaFormField maxLength={2000} readOnly />}
              placeholder={t('키워드는 AI 자동 추출되어 표기됩니다.')}
            />
          </ContentsRow>
        </>
      )}

      {/* 교육자원활용 여부 */}
      <ContentsRow type="horizontal" className="inactive">
        <FormRow2
          provider={provider}
          label={t('교육자원활용')}
          name="isCourseUsed"
          format="boolean"
          element={<SwitchFormField disabled={hasMapping} />}
          switchConfig={{
            label: (value: boolean) => (value ? t('활용가능') : t('활용불가')),
          }}
          guideText={t(
            `해당 교육자원으로 교육 과정을 개설할 수 ${isCourseUsed ? '있습니다' : '없습니다'}.`,
          )}
          value={true}
        />
      </ContentsRow>

      {/* 삭제여부, 공개여부 (고정값) */}
      <FormRow2 provider={provider} name="isDeleted" type="hidden" format="boolean" value={false} />
      <FormRow2 provider={provider} name="isOpened" type="hidden" format="boolean" value={true} />
    </>
  );
};

export const LearningResourceBaseForm = LearningResourceBaseFormComponent;
