import { useCreateCoursePackage } from '@entities/course-package';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TriggerKey, useCoursePackageLastTriggered } from '../store/use-course-package-store';

export function useCoursePackageDetailPackageInfo() {
  const { provider, getValues, updateFormData, formValues, onSubmit, onFormChange } =
    useDynamicForm2();
  const lastTriggered = useCoursePackageLastTriggered();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSaveComplete, alert, saveConfirm, confirm } = useModal();
  const [treeData, setTreeData] = useState([]);

  const { createCoursePackage } = useCreateCoursePackage({
    onSuccess: async (response: any) => {
      await showSaveComplete();
      navigate({ to: '/learning/course-package' });
    },
  });

  const handleSave = () => {
    const run = onSubmit(async (data) => {
      console.log('data=>', data);
    });
    // 가짜 이벤트 객체를 생성해서 수동으로 호출
    run({ preventDefault: () => null } as any);
  };

  useUpdateEffect(() => {
    switch (lastTriggered?.key) {
      case TriggerKey.LIST:
        navigate({ to: '/learning/course-package' });
        break;
      case TriggerKey.SAVE:
        console.log('## 저장');
        handleSave();
        break;
      case TriggerKey.DELETE:
        // handleDeleteAction(lastTriggered.payload);
        break;
    }
  }, [lastTriggered]);

  return {
    provider,
    getValues,
    updateFormData,
    formValues,
    onSubmit,
    onFormChange,
    treeData,
  };
}
