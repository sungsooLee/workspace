// useLoginMutation.ts
import { axiosInstance } from '@/app/api/instance';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await axiosInstance.post('/login', { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      error.message = '로그인 정보를 다시 확인해주세요. (비밀번호 1234)';
      throw error;
    },
  });
};
