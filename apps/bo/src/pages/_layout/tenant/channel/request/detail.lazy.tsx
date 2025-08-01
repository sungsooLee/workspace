import { useGetRequestChannelDetail, useUpdateRequestChannel } from '@entities/channel';
import { getChannelUrl, useChannelApplication } from '@features/channel';
import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { RadioGroupFormField, TextareaFormField } from '@learnway/ui/form-field';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import {
  ContentsButtons,
  FormItem,
  FormRow,
  LinkBox,
  MainContents,
  PageContainer,
} from '@shared/ui';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { EnGlobalConst } from '@types';
import { t } from 'i18next';
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/_layout/tenant/channel/request/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const channelRequestUuid = routerState.location.state?.channelRequestUuid;

  const { openModal, confirm: openConfirm, alert: openAlert } = useModal();
  const { data, refetch } = useGetRequestChannelDetail(channelRequestUuid);
  const { accept: acceptRequestChannel, reject: rejectRequestChannel } = useChannelApplication();
  const { update } = useUpdateRequestChannel({
    onSuccess: () => {
      openAlert({
        title: t('저장되었습니다.'),
        onClose: () => {
          refetch();
        },
      });
    },
  });

  const { provider, updateFormData, onSubmit, getValues, onFormChange } =
    useDynamicForm(formConfig);

  useEffect(() => {
    if (data) {
      const initialData = {
        channelRequestId: data.channelRequestId,
        tenantName: data.tenantName,
        channelName: data.channelName,
        channelMainId: data.channelMainId,
        channelTenatMappingType: data.channelTenatMappingType,
        channelSecretType: data.channelSecretType,
        channelUrl: getChannelUrl(data.channelMainId),
        channelLearningContent: data.channelLearningContent ?? ' ',
        channelPurposeContent: data.channelPurposeContent ?? ' ',
        companyName: data.companyName,
        departmentName: data.departmentName,
        reqeusterEmployeeNumber: data.reqeusterEmployeeNumber,
        reqeusterName: data.reqeusterName,
        createdDate: getDateToString(new Date(data.createdDate), DATE_TIME_FORMAT.DATETIME_SEC),
        approvalStatusType: t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelApprovalStatusType.${data.approvalStatusType}`,
        ),
        approverName: data.approverName ?? ' ',
        approvalDate:
          data.approvalDate !== null
            ? getDateToString(new Date(data.approvalDate), DATE_TIME_FORMAT.DATETIME_SEC)
            : ' ',
        rejectedReasonContent: data.rejectedReasonContent ?? ' ',
        channelInfo: data.approvalStatusType === 'APPROVED' ? t('개설 완료') : t('개설 전'),
        channelInfoCreatedDate:
          data.channelInfoCreatedDate !== null
            ? getDateToString(new Date(data.channelInfoCreatedDate), DATE_TIME_FORMAT.DATETIME_SEC)
            : ' ',
        channelInfoIsDisplay:
          data.approvalStatusType === 'APPROVED'
            ? data.channelInfoIsDisplay
              ? t('노출')
              : t('비노출')
            : ' ',
        channelInfoIsUsedChannel:
          data.approvalStatusType === 'APPROVED'
            ? data.channelInfoIsUsedChannel
              ? t('사용')
              : t('미사용')
            : ' ',
      };
      updateFormData(initialData);
    }
  }, [data]);

  const handleListButtonClick = () => {
    const listParam = routerState.location.state?.listParam;
    router.navigate({ to: '/tenant/channel/request', state: { listParam } });
  };

  const handleAcceptClick = (e: any) => {
    acceptRequestChannel([channelRequestUuid], () => {
      refetch();
    });
  };

  const handleRejectClick = (e: any) => {
    rejectRequestChannel([channelRequestUuid], () => {
      refetch();
    });
  };

  const handleOpenChannelClick = () => {
    router.navigate({
      to: '/tenant/channel/management/regist',
      state: {
        requestUuid: channelRequestUuid,
      },
    });
  };

  const handleChannelDetailClick = () => {
    router.navigate({
      to: '/tenant/channel/management/detail',
      state: {
        channelUuid: data.channelInfoChannelUuid,
      },
    });
  };

  const handleOnSave = () => {
    const values = getValues();
    const payload = {
      channelRequestUuid,
      channelSecretType: values.channelSecretType,
    };
    update(payload);
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            variant="point"
            size="sm"
            onClick={handleListButtonClick}
            stopPropagation
            label={t('LABEL.button.list')}
          />
        </LinkBox>
        {data && data.approvalStatusType === 'PENDING' && (
          <>
            <Button
              variant="point"
              size="sm"
              onClick={handleAcceptClick}
              stopPropagation
              label={t('접수')}
            />
            <Button
              variant="point"
              size="sm"
              onClick={handleRejectClick}
              stopPropagation
              label={t('반려')}
            />
          </>
        )}
        {data && data.approvalStatusType === 'ACCEPTED' && (
          <Button
            variant="point"
            size="sm"
            onClick={handleOpenChannelClick}
            label={t('채널 개설')}
            stopPropagation
          />
        )}
        {data && data.approvalStatusType === 'APPROVED' && (
          <Button
            variant="point"
            size="sm"
            onClick={handleChannelDetailClick}
            label={t('채널 상세')}
            stopPropagation
          />
        )}
        {data && data.approvalStatusType !== 'PENDING' && (
          <Button
            variant="primary"
            size="sm"
            stopPropagation
            label={t('저장')}
            onClick={handleOnSave}
          />
        )}
      </ContentsButtons>
      <MainContents>
        <FormSubTitle label={t('채널 신청 정보')} />
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'channelRequestId'}
            element={<Input readOnly={true} />}
          />
          <FormRow provider={provider} name={'tenantName'} element={<Input readOnly={true} />} />
          <FormRow provider={provider} name={'channelName'} element={<Input readOnly={true} />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'channelMainId'} element={<Input readOnly={true} />} />
          <FormRow
            provider={provider}
            name={'channelTenatMappingType'}
            element={<RadioGroupFormField disabled={true} />}
          />
          <FormRow
            provider={provider}
            name={'channelSecretType'}
            element={
              <RadioGroupFormField disabled={data && data.approvalStatusType === 'PENDING'} />
            }
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'channelUrl'} element={<Input readOnly={true} />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'channelLearningContent'}
            element={<TextareaFormField readOnly={true} resize={'none'} />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'channelPurposeContent'}
            element={<TextareaFormField readOnly={true} resize={'none'} />}
          />
        </ContentsRow>
        <FormSubTitle label={t('채널 신청자 정보')} />
        <ContentsRow>
          <FormRow provider={provider} name={'companyName'} element={<Input readOnly={true} />} />
          <FormRow
            provider={provider}
            name={'departmentName'}
            element={<Input readOnly={true} />}
          />
          <FormRow
            provider={provider}
            name={'reqeusterEmployeeNumber'}
            element={<Input readOnly={true} />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'reqeusterName'} element={<Input readOnly={true} />} />
          <FormRow provider={provider} name={'createdDate'} element={<Input readOnly={true} />} />
          <FormRow
            provider={provider}
            name={'approvalStatusType'}
            element={<Input readOnly={true} />}
          />
        </ContentsRow>
        <FormSubTitle label={t('결재 정보')} />
        <ContentsRow>
          <FormRow provider={provider} name={'approverName'} element={<Input readOnly={true} />} />
          <FormRow provider={provider} name={'approvalDate'} element={<Input readOnly={true} />} />
          <FormItem />
        </ContentsRow>
        {data && data.approvalStatusType === 'REJECTED' && (
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'rejectedReasonContent'}
              element={<TextareaFormField readOnly={true} resize={'none'} />}
            />
          </ContentsRow>
        )}
        <FormSubTitle label={t('채널 개설 정보')} />
        <ContentsRow>
          <FormRow provider={provider} name={'channelInfo'} element={<Input readOnly={true} />} />
          <FormRow
            provider={provider}
            name={'channelInfoCreatedDate'}
            element={<Input readOnly={true} />}
          />
          <FormRow
            provider={provider}
            name={'channelInfoIsUsedChannel'}
            element={<Input readOnly={true} />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'channelInfoIsDisplay'}
            element={<Input readOnly={true} />}
          />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </MainContents>
    </PageContainer>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channelRequestId',
      type: 'text',
      label: t('신청 ID'),
      value: '',
      placeholder: '',
    },
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelName',
      type: 'text',
      label: t('채널명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelMainId',
      type: 'text',
      label: t('채널 핸들'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelTenatMappingType',
      type: 'radio-group',
      label: t('채널 유형'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.channel.ChannelTenatMappingType'],
      },
    },
    {
      name: 'channelSecretType',
      type: 'radio-group',
      label: t('채널 구분'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.channel.ChannelSecretType'],
      },
    },
    {
      name: 'channelUrl',
      type: 'text',
      label: t('채널 URL'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelLearningContent',
      type: 'textarea',
      label: t('채널 학습 대상'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
    {
      name: 'channelPurposeContent',
      type: 'textarea',
      label: t('채널 목적'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
    {
      name: 'companyName',
      type: 'text',
      label: t('회사'),
      value: '',
      placeholder: '',
    },
    {
      name: 'departmentName',
      type: 'text',
      label: t('소속'),
      value: '',
      placeholder: '',
    },
    {
      name: 'reqeusterEmployeeNumber',
      type: 'text',
      label: t('사번'),
      value: '',
      placeholder: '',
    },
    {
      name: 'reqeusterName',
      type: 'text',
      label: t('이름'),
      value: '',
      placeholder: '',
    },
    {
      name: 'createdDate',
      type: 'text',
      label: t('신청일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'approvalStatusType',
      type: 'text',
      label: t('신청 상태'),
      value: '',
      placeholder: '',
    },
    {
      name: 'approverName',
      type: 'text',
      label: t('결재자'),
      value: '',
      placeholder: '',
    },
    {
      name: 'approvalDate',
      type: 'text',
      label: t('접수/반려일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'rejectedReasonContent',
      type: 'textarea',
      label: t('반려 사유'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },

    {
      name: 'channelInfo',
      type: 'text',
      label: t('채널 개설 여부'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelInfoCreatedDate',
      type: 'text',
      label: t('채널 개설일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelInfoIsDisplay',
      type: 'text',
      label: t('노출 여부'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelInfoIsUsedChannel',
      type: 'text',
      label: t('사용 여부'),
      value: '',
      placeholder: '',
    },
  ],
};
