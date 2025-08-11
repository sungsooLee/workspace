import {
  useCreateStaticFile,
  useDeleteStaticFile,
  useFetchStaticFile,
  useUpdateStaticFile,
} from '@entities/static-file';
import { useDynamicForm2 } from '@learnway/hooks';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { FormRow2, FormSubTitle } from '@learnway/ui/base-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { Textarea } from '@learnway/ui/textarea';
import { useToast } from '@learnway/ui/toast';
import { EnFormMode } from '@shared/types/enums';
import {
  DateRangePickerFormField,
  DropdownFormField,
  FormItem,
  InputFormField,
  SwitchFormField,
} from '@shared/ui/form';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { FileInput } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const TenantStaticFileDetailComponent = (props: any, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const { confirm: openConfirm } = useModal();
  const { open: openToast } = useToast();

  const { data: staticFileInfo, refetch: staticFileRefetch } = useFetchStaticFile(
    routerState.location.state?.fileUuid,
  );
  const { create } = useCreateStaticFile({
    onSuccess: async () => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      router.navigate({ to: '/tenant/static-file' });
    },
  });
  const { update } = useUpdateStaticFile({
    onSuccess: async () => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
    },
  });
  const { delete: deleteStaticFile } = useDeleteStaticFile({
    onSuccess: async () => {
      openToast({ title: t('삭제 되었습니다.'), type: 'success' });
      router.navigate({ to: '/tenant/static-file' });
    },
  });

  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    setFormError,
    clearFormError,
    getValues,
    setValue,
    formState,
    formValues,
  } = useDynamicForm2();

  useImperativeHandle(ref, () => ({
    saveData() {
      const form = formRef.current;
      if (form) {
        console.log('formValue', getValues());
        console.log('formValue', provider.control);
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
    removeData() {
      deleteStaticFile(routerState.location.state?.fileUuid);
    },
  }));

  const handleOnSubmit = async (formData: any) => {
    console.log('data {} => ', formData);
  };

  useEffect(() => {
    if (props.mode === EnFormMode.VIEW && staticFileInfo) {
      const initialData = {
        ...staticFileInfo,
        dateRange: {
          from: staticFileInfo.expiryStartDate,
          to: staticFileInfo.expiryEndDate,
        },
      };
      updateFormData(initialData);
    }
  }, [staticFileInfo]);

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('기본 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="selectedFile"
          label={t('파일 올리기')}
          format="object"
          type={'custom'}
          element={<FileInput />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="tenantName"
          label={t('테넌트')}
          format="string"
          type="text"
          value=""
          element={<InputFormField disabled={true} />}
        />
        <FormRow2
          provider={provider}
          name="originalFileName"
          label={t('파일명')}
          format="string"
          type="text"
          value=""
          element={<InputFormField disabled={true} />}
        />
        <FormRow2
          provider={provider}
          name="fileType"
          label={t('파일 유형')}
          format="string"
          value={''}
          presetOptionLabel={t('LABEL.form.label.select')}
          element={
            <DropdownFormField
              optionsConfig={{
                codeGroup: 'pms.file.FileType',
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="acceptFileUrl"
          label={t('파일 접속 URL')}
          format="string"
          type="text"
          value=""
          element={<Input disabled={true} />}
        />
        <FormRow2
          provider={provider}
          name="dateRange"
          label={t('파일 접속 URL 유효기간')}
          format="object"
          element={<DateRangePickerFormField disabled={true} />}
        />
        <FormRow2
          provider={provider}
          name="isLoginRequired"
          label={t('로그인 체크 여부')}
          format="boolean"
          value={true}
          className={dynamicFormStyles.form_item_horizontal}
          switchConfig={{
            label: (value: boolean) => (value ? t('로그민') : t('미로그인')),
          }}
          guideText={t('파일 다운로드 시 로그인 여부를 설정합니다.')}
          element={<SwitchFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="isUsed"
          label={t('사용 여부')}
          format="boolean"
          value={true}
          className={dynamicFormStyles.form_item_horizontal}
          switchConfig={{
            label: (value: boolean) => (value ? t('사용') : t('미사용')),
          }}
          guideText={t('미사용인 경우 다운로드 불가설정합니다.')}
          element={<SwitchFormField />}
        />
        <FormItem />
        <FormItem />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="description"
          label={t('설명')}
          value=""
          element={<Textarea maxLength={500} resize={'none'} />}
        />
      </ContentsRow>
    </form>
  );
};

export const TenantStaticFileDetail = forwardRef(TenantStaticFileDetailComponent);
