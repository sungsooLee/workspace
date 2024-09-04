import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export const QUERY_KEY = ['kitProgress'];

const mutationFn = (param: any) =>
  axios.get(`/cms-module/api/v1/kits/progress`, {
    params: {
      // courseId: param.courseId,
      // sequenceId: param.sequenceId,
      courseId: 1,
      sequenceId: 1,
      kitId: param.kitId,
    },
  });

const useKitProgressQuery = (param: any) => {
  return useMutation({
    mutationFn: () => mutationFn(param),
  });
};

export default useKitProgressQuery;
