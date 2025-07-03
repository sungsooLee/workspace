import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  Divider,
  InputModalSelectorFormField,
  useModal,
} from '@learnway/ui';
import { DateRangePickerFormField } from '@features/learning/ui/resource/date-range-picker-form-field';
import { Company } from '@learnway/types';
import { FormRow, FormRow2 } from '@shared/ui';
import { FormDisplay } from '@features/form';
import { ContentsButtons, MainContents, PageContainer, SubContents } from '@widgets/layout';
import { ChannelListChoiceModal, CompanyChoiceModal, ManagerChoiceModal } from '@features/shared';

import styles from './blog-detail.module.css';
// import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/blog/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const formConfig: DynamicFormConfig = {
    builders: [
      {
        label: t('LABEL.form.label.channel'),
        name: 'channelUuid',
        type: 'text',
        format: 'array',
        value: [],
        placeholder: t('LABEL.form.input.placeholder3', {
          field: t('채널명'),
          inputType: t('LABEL.form.input.select'),
        }),
        description: '',
      },
      {
        label: t('학습자원명'),
        name: 'contentName',
        type: 'text',
        format: 'string',
        value: '',
        placeholder: t('LABEL.form.input.placeholder1', { type: t('학습자원명') }),
        maxLength: 150,
      },
      {
        label: t('학습자원설명'),
        name: 'description',
        type: 'textarea',
        format: 'string',
        value: '',
        maxLength: 2000,
      },
      {
        label: t('LABEL.form.label.coordinator'),
        name: 'coordinatorName',
        type: 'custom',
        format: 'string',
        value: '',
        placeholder: t('LABEL.form.input.placeholder1', { type: t('담당자명') }),
      },
      {
        label: '',
        name: 'coordinatorUuid',
        type: 'hidden',
        format: 'string',
        value: '',
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
        label: t('사용기한'),
        name: 'isLimitExist',
        type: 'switch',
        format: 'boolean',
        value: false,
        switchConfig: {
          label: (value: boolean) => (value ? '기간설정' : '무기한'),
        },
        tooltip: t('사용기한 내 콘텐츠 공유/교육자원활용이 가능합니다.'),
      },
      {
        name: 'contentUseStartDate',
        type: 'custom',
        format: 'object',
        value: '',
        fields: {
          from: 'contentUseStartDate',
          to: 'contentUseEndDate',
        },
      },
      {
        name: 'contentUseEndDate',
        type: 'hidden',
        value: '',
      },
      {
        label: t('외주개발업체 정보'),
        name: 'isVendored',
        type: 'switch',
        format: 'boolean',
        value: false,
        switchConfig: {
          label: (value: boolean) => (value ? '있음' : '없음'),
        },
      },
      {
        label: t('개발업체'),
        name: 'vendorName',
        type: 'text',
        format: 'string',
        value: '',
        placeholder: t('LABEL.form.input.placeholder1', { type: t('개발업체명') }),
      },
      {
        label: '',
        name: 'vendorCode',
        type: 'hidden',
        format: 'string',
        value: '',
      },
      {
        label: t('외주개발업체 담당자'),
        name: 'vendorCoordinatorName',
        type: 'text',
        format: 'string',
        value: '',
        placeholder: t('LABEL.form.input.placeholder1', { type: t('개발업체 담당자명') }),
      },
      {
        label: '',
        name: 'vendorCoordinatorUuid',
        type: 'hidden',
        format: 'string',
        value: '',
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
        name: 'contentDuration', // contentTime
        type: 'custom',
        // value: '',
        format: 'object',
        value: {
          hour: 0,
          minute: 0,
          second: 0,
        },
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
        placeholder: t('키워드는 AI 자동 추출되어 표기됩니다.'),
        maxLength: 2000,
        value: '',
      },
      {
        label: t('키워드 (AI 자동 추출)'),
        name: 'keywords',
        type: 'textarea',
        readOnly: true,
        placeholder: t('키워드는 AI 자동 추출되어 표기됩니다.'),
        maxLength: 2000,
        value: '',
      },
      {
        label: t('교육자원활용 여부'),
        name: 'isCourseUsed',
        type: 'switch',
        format: 'boolean',
        value: false,
        switchConfig: {
          label: (value: boolean) => (value ? '사용' : '미사용'),
        },
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
      {
        label: t('검수 확인'),
        name: 'isInspected',
        type: 'checkbox',
        format: 'boolean',
        value: false,
        guideText: '등록하고자 한 학습자원이며, 정상적으로 보여짐이 확인되었습니다.',
        checkConfig: {
          reverse: true,
        },
      },
      {
        label: t('저작권 확인'),
        name: 'isCopyrighted',
        type: 'checkbox',
        format: 'boolean',
        value: false,
        guideText:
          '저작권법(제25조2항)에 따라 학습자원(동영상,이미지 등)은 해당 학습플랫폼에서만 이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법 위반에 해당될 수 있음에  동의합니다.',
        checkConfig: {
          reverse: true,
        },
      },
      {
        label: t('보안 확인'),
        name: 'isContentSecured',
        type: 'checkbox',
        format: 'boolean',
        value: false,
        guideText:
          '캡쳐방지기능 사용 미 설정 시, 불법복제, 무단사용, 저작권 침해 위험에 노출되고, 이에 따른 피해를 입을 수 있음에 인지합니다.',
        checkConfig: {
          reverse: true,
        },
      },
    ],
    validator: {
      channelUuid: true,
      contentName: true,
      coordinatorName: true,
      coordinatorUuid: true,
      coordinatorTelNo: true,
      isLimitExist: true, // isUnlimited 값을 반대로 설정해야 함
      contentUseStartDate: {
        required: {
          fn: (values: Record<string, any>) => {
            console.log('fn', values);
            return !!values.isLimitExist;
          },
        },
      },
      contentUseEndDate: {
        required: {
          fn: (values: Record<string, any>) => {
            return !!values.isLimitExist && values.contentUseStartDate <= values.contentUseEndDate;
          },
        },
      },
      blogContent: true,
      contentDuration: {
        required: {
          fn: (values: Record<string, { hour: number; minute: number; second: number }>) => {
            console.log(values);
            // return (
            //   values.contentDuration.hour === 0 &&
            //   values.contentDuration.minute === 0 &&
            //   values.contentDuration.second === 0
            // );
            return values.contentDuration.second > 0;
          },
          message: t('학습시간을 입력해 주세요.'),
        },
      },
      contentThumbnailFileGroupUuid: true,
      tags: true,
      isCourseUsed: true,
      isInspected: true,
      isCopyrighted: true,
      isContentSecured: true,
    },
  };

  const { data: loginUser } = useFetchAuthUser();
  const tenantId = loginUser?.activeTenant?.tenantId;

  const { open: openModal, confirm: openConfirm } = useModal();
  const router = useRouter();

  const { provider, onSubmit, control, getValues, updateFormData, onFormChange } =
    useDynamicForm(formConfig);

  const handleOnSubmit = async (data: any): Promise<void> => {
    console.log(data);
    // TODO: isUnlimited = !data.isLimitExist

    if (
      await openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('입력한 정보로 등록 후 상세화면으로 이동합니다.'),
      })
    ) {
      // TODO: 저장 로직 수행 후 상세화면 이동
      router.navigate({ to: '/learning/resource/blog/view' });
    }
  };

  const handleClickGoListButton = () => {
    openConfirm({
      title: t('LABEL.confirm.goList.title'),
      content: t('LABEL.confirm.goList.message'),
      onClose: (result: boolean) => {
        result && router.navigate({ to: '/learning/learning-resource' });
      },
    });
  };

  const handleClickCancelButton = () => {
    openConfirm({
      title: t('LABEL.confirm.cancel.title'),
      content: t('LABEL.confirm.cancel.message', { type: t('학습자원') }),
      onClose: (result: boolean) => {
        result && router.navigate({ to: '/learning/learning-resource' });
      },
    });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button
            type="button"
            variant="point"
            size="sm"
            label={t('LABEL.button.list')}
            onClick={handleClickGoListButton}
          />
          <Divider orientation="vertical" />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={t('LABEL.button.cancel')}
            onClick={handleClickCancelButton}
          />
          <Button type="submit" variant="primary" size="sm" label={t('LABEL.button.save')} />
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

          <ContentsRow>
            <FormRow provider={provider} name="description" />
          </ContentsRow>

          <ContentsRow>
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
                  transformModalData={(data: any) => ({
                    coordinatorUuid: data.managerId,
                    coordinatorName: data.managerName,
                  })}
                  onFormChange={(
                    values: Record<string, { coordinatorUuid: string; coordinatorName: string }>,
                  ) => {
                    onFormChange(values);
                  }}
                />
              }
            />
            <FormRow2 provider={provider} type="hidden" name="coordinatorUuid" />
            <FormRow provider={provider} name="coordinatorTelNo" />
          </ContentsRow>

          <ContentsRow type="horizontal" className="inactive">
            <FormRow provider={provider} name="isLimitExist" />
          </ContentsRow>
          {/* 사용기한 상세 */}
          <FormDisplay provider={provider} dependencies={[{ name: 'isLimitExist', value: true }]}>
            <ContentsRow className="pt-0">
              <FormRow
                provider={provider}
                name="contentUseStartDate"
                element={<DateRangePickerFormField />}
              />
            </ContentsRow>
          </FormDisplay>

          <ContentsRow type="horizontal" className="inactive">
            <FormRow provider={provider} name="isVendored" />
          </ContentsRow>
          {/* 외주개발업체 정보 입력 상세 */}
          <FormDisplay provider={provider} dependencies={[{ name: 'isVendored', value: true }]}>
            <ContentsRow className="pt-0">
              <FormRow
                provider={provider}
                name="vendorName"
                element={
                  <InputModalSelectorFormField
                    modalConfig={{
                      title: '',
                      width: 'md',
                      content: <CompanyChoiceModal />,
                    }}
                    transformModalData={(data: Company) => ({
                      vendorCode: data.companyCode,
                      vendorName: data.name,
                    })}
                    onFormChange={(
                      values: Record<string, { vendorCode: string; vendorName: string }>,
                    ) => {
                      onFormChange(values);
                    }}
                  />
                }
              />
              <FormRow2 provider={provider} type="hidden" name="vendorCode" />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name="vendorCoordinatorName" />
              <FormRow2 provider={provider} type="hidden" name="vendorCoordinatorUuid" />
              <FormRow provider={provider} name="vendorTelNo" />
            </ContentsRow>
          </FormDisplay>
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
