import {
  ContentBaseInfo,
  useCreateAssignment,
  useUpdateAssignment,
} from '@entities/learning-resource';
import { useRouter } from '@tanstack/react-router';

export const useAssignmentBasicInfoForm = (options: { contentUuid: string | undefined }) => {
  const router = useRouter();

  const { create: createAssignment } = useCreateAssignment({
    onSuccess: (result: unknown) => {
      console.log(result);
      // router.navigate({
      //   to:
      // })
    },
  });

  const { update: updateAssignment } = useUpdateAssignment({
    onSuccess: (result: unknown) => {
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
