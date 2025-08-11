import { useQuery } from '@tanstack/react-query';
import { learningResourceQueryOptions } from '@entities/learning-resource';

export const useAssignmentSubmissionInputForm = (contentUuid: string) => {
  const { data: submissionList = [], refetch } = useQuery(
    learningResourceQueryOptions.getAssignmentSubmissionList(contentUuid),
  );

  return { submissionList };
};
