import { useMutation } from '@tanstack/react-query';
import { Button } from '../../ui/button';
import axios from 'axios';
import { toast } from '@/shared/hooks/useToast';

const testMutation = async () => {
  const response = await axios.post('/error/mutation', {});
  return response.data;
};

export const ErrorMutation = () => {
  const mutation = useMutation({
    mutationFn: testMutation,
    onSuccess: () => {
      toast({ description: '성공', duration: 1000 });
    },
  });
  const sendMutation = () => {
    mutation.mutate();
  };

  return (
    <>
      <Button onClick={sendMutation}>Mutation 요청</Button>
    </>
  );
};
