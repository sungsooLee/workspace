import { Button } from '@/libs/ui/src';
import { Modal } from '@learnway/ui';
import TestForm from './test-form';
import { useModal } from '@learnway/ui';

const TestModal = () => {
  const testModal = useModal(false);
  const tmpModal = useModal(false);

  return (
    <div className="flex flex-col space-y-10 items-center ">
      <Button onClick={testModal.onOpen}>form-modal </Button>
      <Button onClick={tmpModal.onOpen}>tmp-modal </Button>

      <Modal
        isOpen={testModal.isOpen}
        onClose={testModal.onClose}
        title="모달 테스트"
        description="modal">
        <TestForm />
      </Modal>

      <Modal
        isOpen={tmpModal.isOpen}
        onClose={tmpModal.onClose}
        title="TMP"
        description="modal"
        footer="FOOTER">
        <p>children</p>
      </Modal>
    </div>
  );
};

export default TestModal;
