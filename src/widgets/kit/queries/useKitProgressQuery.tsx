import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { KitProps } from '../ui/KitContainer';

export const QUERY_KEY = ['kitProgress'];

const mutationFn = (param: KitProps) =>
  axios.get(`/cms-module/api/v1/kits/progress`, {
    params: {
      courseId: 1,
      sequenceId: 1,
      kitId: param.kitId,
    },
  });

const useKitProgressQuery = (param: KitProps) => {
  return useMutation({
    mutationFn: () => mutationFn(param),
  });
};

export default useKitProgressQuery;
