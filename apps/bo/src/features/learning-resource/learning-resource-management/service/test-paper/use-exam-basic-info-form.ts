import { t } from 'i18next';
import { useDynamicForm2 } from '@learnway/hooks';
import { TestPaperBasicInfoSaveRes } from '@types';
import { useCreateExamPaperContent, useUpdateExamPaperContent } from '@entities/learning-resource';
import { getExamSaveRequestDataFromFormData } from './common';
import { TestPaperBasicInfoFormData } from './type';
import { useModal } from '@learnway/ui/modal';

export const useExamBasicInfoForm = (options: {
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

  const saveBasicInfo = async (data: Record<string, any>, isOnGenTypeChange?: boolean) => {
    const requestData = getExamSaveRequestDataFromFormData({
      values: data as TestPaperBasicInfoFormData,
      contentUuid: options.contentUuid,
    });

    const result = isOnGenTypeChange
      ? true
      : await confirm({
          title: t('LABEL.confirm.save.title'),
          content: t('LABEL.confirm.save.message'),
        });

    if (result) {
      if (!options.contentUuid) {
        createExamBasicInfo(requestData);
      } else {
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
  };
};
