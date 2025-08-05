import { useRouter } from '@tanstack/react-router';
import { ContentBaseInfo } from '@types';
import { useCreateAssignment, useUpdateAssignment } from '@entities/learning-resource';

export const useAssignmentBasicInfoForm = (options: { contentUuid: string | undefined }) => {
  const router = useRouter();

  const { create: createAssignment } = useCreateAssignment({
    onSuccess: (result: string) => {
      console.log(result);
      router.navigate({
        to: '/learning/learning-resource/view',
        state: { contentUuid: result },
        replace: true,
      });
    },
  });

  const { update: updateAssignment } = useUpdateAssignment({
    onSuccess: (result: string) => {
      console.log(result);
    },
  });

  const saveBasicInfo = (data: ContentBaseInfo) => {
    if (!options.contentUuid) {
      createAssignment(data);
    } else {
      updateAssignment(data);
    }
  };

  return { saveBasicInfo };
};
