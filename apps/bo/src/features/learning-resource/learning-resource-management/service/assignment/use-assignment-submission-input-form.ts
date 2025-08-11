import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useToast } from '@learnway/ui/toast';
import {
  AssignmentSubmissionItem,
  learningResourceQueryOptions,
  queryKeys,
  useCreateAssignmentSubmissionItem,
  useDeleteAssignmentSubmissionItemList,
  useUpdateAssignmentSubmissionItem,
} from '@entities/learning-resource';

export const useAssignmentSubmissionInputForm = (contentUuid: string) => {
  const { t } = useTranslation();
  const { open: openToast } = useToast();

  const queryClient = useQueryClient();

  const { data: submissionList = [] } = useQuery(
    learningResourceQueryOptions.getAssignmentSubmissionList(contentUuid),
  );

  const { create: createSubmissionItem } = useCreateAssignmentSubmissionItem();
  const { update: updateSubmissionItem } = useUpdateAssignmentSubmissionItem();
  const { delete: deleteSubmissionItemList } = useDeleteAssignmentSubmissionItemList();

  const [selectedSubmissionItems, setSelectedSubmissionItems] = useState<
    AssignmentSubmissionItem[]
  >([]);

  const handleSubmissionMutationSuccessCallback = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.assignmentSubmissionList(contentUuid),
    });
  }, []);

  const handleOnCreateSuccessCallback = useCallback(async () => {
    openToast({
      title: t('저장되었습니다.'),
      type: 'success',
    });

    await handleSubmissionMutationSuccessCallback();
  }, []);

  const handleOnUpdateSuccessCallback = useCallback(async () => {
    openToast({
      title: t('수정되었습니다.'),
      type: 'success',
    });

    await handleSubmissionMutationSuccessCallback();
  }, []);

  const handleOnDeleteSuccessCallback = useCallback(async () => {
    openToast({
      title: t('삭제되었습니다.'),
      type: 'success',
    });

    await handleSubmissionMutationSuccessCallback();
  }, []);

  return {
    submissionList,
    createSubmissionItem,
    updateSubmissionItem,
    deleteSubmissionItemList,
    selectedSubmissionItems,
    setSelectedSubmissionItems,
    handleOnCreateSuccessCallback,
    handleOnUpdateSuccessCallback,
    handleOnDeleteSuccessCallback,
  };
};
