import { t } from 'i18next';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui';
import { TestPaperBasicInfoSaveRes } from '@types';
import { useCreateExamPaperContent, useUpdateExamPaperContent } from '@entities/learning-resource';
import { PageMode, TestPaperBasicInfoFormData } from '../-common/type';
import { getExamSaveRequestDataFromFormData } from '../-common/common';

export const useExamBasicInfoForm = (options: {
  mode: PageMode;
  contentUuid: string;
  onSaveSuccess?: (result?: TestPaperBasicInfoSaveRes) => void;
  onUpdateSuccess?: (result?: unknown) => void;
}) => {
  const { confirm } = useModal();

  const {
    provider: basicInfoProvider,
    getValues: getBasicInfoValues,
    updateFormData: updateBasicInfoFormData,
    onFormValid,
    formState,
    watch,
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

  const saveBasicInfo = async (data?: any) => {
    const requestData = getExamSaveRequestDataFromFormData({
      values: getBasicInfoValues() as TestPaperBasicInfoFormData,
      mode: options.mode,
      contentUuid: options.contentUuid,
    });

    console.log('submit', options.mode, requestData);

    if (
      await confirm({
        title: t('LABEL.confirm.save.title'),
        content: t('입력한 정보로 저장합니다.'),
      })
    ) {
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
    saveBasicInfo,
    onSubmit,
    onFormValid,
  };
};
