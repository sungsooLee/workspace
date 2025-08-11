import {
  TestPaperBasicInfoSaveRes,
  useCreateExamPaperContent,
  useUpdateExamPaperContent,
} from '@entities/learning-resource';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { t } from 'i18next';
import { getExamSaveRequestDataFromFormData } from './common';
import { TestPaperBasicInfoFormData } from './type';

export const useExamBasicInfoForm = (options: {
  contentUuid: string;
  onSaveSuccess?: (result?: TestPaperBasicInfoSaveRes) => void;
  onUpdateSuccess?: (result?: string) => void | Promise<void>;
}) => {
  const { confirm } = useModal();

  const basicInfoForm = useDynamicForm2();

  // const updateFormDataByKey = (key: string, value: any) => {
  //   updateBasicInfoFormData({
  //     ...getBasicInfoValues(),
  //     [key]: value,
  //   });
  // };

  const { create: createExamBasicInfo } = useCreateExamPaperContent({
    onSuccess: (result: TestPaperBasicInfoSaveRes) => {
      console.log(result);

      const isSuccess = !!result?.examUuid;

      if (isSuccess) {
        options.onSaveSuccess?.(result);
      }
    },
  });

  const { update: updateExamBasicInfo } = useUpdateExamPaperContent();

  const saveBasicInfo = async (data: Record<string, any>) => {
    const requestData = getExamSaveRequestDataFromFormData({
      values: data as TestPaperBasicInfoFormData,
      contentUuid: options.contentUuid,
    });

    const result = await confirm({
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
    basicInfoForm,
    saveBasicInfo,
  };
};
