import { useDynamicForm2 } from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import { getCurrentAuthUser } from '@shared/lib';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { queryOptions as companysQueryOptions } from '@entities/companies';
import {
  useCreateHoliday,
  useDeleteHoliday,
  useFetchHoliday,
  useUpdateHoliday,
} from '@entities/holiday';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { ContentsRow } from '@learnway/ui/contents-row';
import { RadioGroupFormField } from '@learnway/ui/form-field';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { Textarea } from '@learnway/ui/textarea';
import { useToast } from '@learnway/ui/toast';
import { EnFormMode } from '@shared/types/enums';
import {
  DateRangePickerFormField,
  DropdownFormField,
  FormItem,
  FormRow2,
  InputFormField,
  SwitchFormField,
} from '@shared/ui/form';
import { useQueryClient } from '@tanstack/react-query';

const TenantHolidayDetailComponent = (props: any, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();
  const queryClient = useQueryClient();
  const loginUser = getCurrentAuthUser();
  const formRef = useRef<HTMLFormElement>(null);
  const { confirm: openConfirm } = useModal();
  const { open: openToast } = useToast();

  const { data: holidayInfo, refetch: holidayRefetch } = useFetchHoliday(
    routerState.location.state?.holidayId,
  );
  const { create } = useCreateHoliday({
    onSuccess: async () => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      router.navigate({ to: '/tenant/holiday' });
    },
  });
  const { update } = useUpdateHoliday({
    onSuccess: async () => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      holidayRefetch();
    },
  });
  const { delete: deleteHoliday } = useDeleteHoliday({
    onSuccess: async () => {
      openToast({ title: t('삭제 되었습니다.'), type: 'success' });
      router.navigate({ to: '/tenant/holiday' });
    },
  });

  const [companyOptions, setCompanyOptions] = useState<any[]>([]);
  const [tenantId, setTenantId] = useState<number>(0);

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
      deleteHoliday(routerState.location.state?.holidayId);
    },
  }));

  const handleOnSubmit = async (formData: any) => {
    console.log('data {} => ', formData);
    const payload = {
      ...formData,
      holidayId: routerState.location.state?.holidayId,
      tenantId,
      startDate: getDateToString(new Date(formData.dateRange.from), DATE_TIME_FORMAT.DATE),
      endDate: getDateToString(new Date(formData.dateRange.to), DATE_TIME_FORMAT.DATE),

      dateRange: null,
      tenantName: null,
    };
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== null && value !== undefined && value !== '',
      ),
    );
    console.log('payload', filteredPayload);
    if (await openConfirm(t('저장 하시겠습니까?'))) {
      if (props.mode === EnFormMode.VIEW) update(payload);
      else create(payload);
    }
  };

  useEffect(() => {
    if (props.mode === EnFormMode.VIEW && holidayInfo) {
      const initialData = {
        ...holidayInfo,
        dateRange: {
          from: holidayInfo.startDate,
          to: holidayInfo.endDate,
        },
      };
      updateFormData(initialData);
    }
  }, [holidayInfo]);

  useEffect(() => {
    if (loginUser) {
      if (loginUser.activeTenant) setTenantId(loginUser.activeTenant.tenantId);
      setValue('tenantName', loginUser.activeTenant?.tenantName);
      (async () => {
        const companys = await queryClient.fetchQuery(
          companysQueryOptions.tenantCompany(loginUser.activeTenant?.tenantId),
        );

        const companyIdOptions = companys.map((item: any) => ({
          label: item.name,
          value: item.companyCode,
        }));
        setCompanyOptions([
          { value: '', label: t('LABEL.form.label.select') },
          ...companyIdOptions,
        ]);
      })();
    }
  }, [loginUser]);

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('기본 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="holidayType"
          label={t('휴일 유형')}
          format="string"
          value={'LEGAL_HOLIDAY'}
          element={
            <RadioGroupFormField
              optionsConfig={{
                codeGroup: 'pms.holiday.HolidayType',
              }}
            />
          }
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
          name="companyCode"
          label={t('회사')}
          format="string"
          value=""
          element={<DropdownFormField options={companyOptions} />}
        />
        <FormRow2
          provider={provider}
          name="holidayName"
          label={t('휴일명')}
          format="string"
          type="text"
          value=""
          validation={{ required: true }}
          element={<Input />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="dateRange"
          label={t('휴일 기간')}
          format="object"
          validation={{ required: true }}
          element={<DateRangePickerFormField />}
        />
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
          guideText={t('사용 상태인 경우에 휴일이 적용됩니다.')}
          element={<SwitchFormField />}
        />
        <FormItem />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="holidayDesc"
          label={t('내용')}
          value=""
          placeholder={t('고객 관리 및 상담 기록 유지')}
          element={<Textarea maxLength={500} resize={'none'} />}
        />
      </ContentsRow>
    </form>
  );
};

export const TenantHolidayDetail = forwardRef(TenantHolidayDetailComponent);
