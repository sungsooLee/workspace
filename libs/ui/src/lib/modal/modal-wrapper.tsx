import { useModalStore } from '../stores/useModalStore';
import { ModalContainer } from './modal-container';

const ModalWrapperComponent = () => {
  const modals = useModalStore((state) => state.modals);

  return (
    <>
      {Array.from(modals.entries()).map(([idx, modalData]) => (
        <ModalContainer index={idx} key={idx} data={modalData} />
      ))}
    </>
  );
};
export const ModalWrapper = ModalWrapperComponent;
