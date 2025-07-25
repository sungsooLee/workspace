import { t } from 'i18next';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui';
import { TestPaperBasicInfoSaveRes } from '@types';
import { useCreateExamPaperContent, useUpdateExamPaperContent } from '@entities/learning-resource';
import { getExamSaveRequestDataFromFormData } from './common';
import { PageMode, TestPaperBasicInfoFormData } from './type';

export const useExamBasicInfoForm = (options: {
  mode: PageMode;
  contentUuid: string;
  onSaveSuccess?: (result?: TestPaperBasicInfoSaveRes) => void;
  onUpdateSuccess?: (result?: unknown) => void | Promise<void>;
}) => {
  const { confirm } = useModal();

  const {
    provider: basicInfoProvider,
    getValues: getBasicInfoValues,
    updateFormData: updateBasicInfoFormData,
    onFormChange: onBasicInfoFormChange,
    onFormValid,
    formState,
    onSubmit,
  } = useDynamicForm2();

  const updateFormDataByKey = (key: string, value: any) => {
    updateBasicInfoFormData({
      ...getBasicInfoValues(),
      [key]: value,
    });
  };

  const { create: createExamBasicInfo } = useCreateExamPaperContent({
    onSuccess: (result: TestPaperBasicInfoSaveRes) => {
      console.log(result);

      const isSuccess = !!result?.examUuid;

      if (isSuccess) {
        options.onSaveSuccess?.(result);
      }
    },
  });

  const { update: updateExamBasicInfo } = useUpdateExamPaperContent({
    onSuccess: (result: unknown) => {
      console.log(result);

      options.onUpdateSuccess?.(options.contentUuid);
    },
  });

  const saveBasicInfo = async (data?: any, isOnGenTypeChange?: boolean) => {
    const requestData = getExamSaveRequestDataFromFormData({
      values: getBasicInfoValues() as TestPaperBasicInfoFormData,
      mode: options.mode,
      contentUuid: options.contentUuid,
    });

    console.log('submit', options.mode, requestData);

    const result = isOnGenTypeChange
      ? true
      : await confirm({
          title: t('LABEL.confirm.save.title'),
          content: t('LABEL.confirm.save.message'),
        });

    if (result) {
      if (options.mode === PageMode.CREATE) {
        createExamBasicInfo(requestData);
      } else if (options.mode === PageMode.UPDATE) {
        updateExamBasicInfo(requestData);
      }
    }
  };

  return {
    basicInfoProvider,
    getBasicInfoValues,
    updateBasicInfoFormData,
    updateFormDataByKey,
    onBasicInfoFormChange,
    saveBasicInfo,
    onSubmit,
    onFormValid,
    formState,
  };
};
