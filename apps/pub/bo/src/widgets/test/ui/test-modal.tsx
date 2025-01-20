import { Button, useModalControl } from '@learnway/ui';
import TestForm from './test-form';

const TestModal = () => {
  const { open, openAsync } = useModalControl();

  const handleOpenModal = () => {
    const config = {
      title: 'Example Modal',
    };
    const onClose = (data: any) => {
      console.log(data);
    };

    open(<TestForm />, config, onClose);
  };

  const handleOpenAsyncModal = async () => {
    try {
      const result = await openAsync(<TestForm />, { title: 'Async Modal' });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <Button onClick={handleOpenModal}>Modal</Button>
      <Button onClick={handleOpenAsyncModal}>Async Modal</Button>
    </div>
  );
};

export default TestModal;
