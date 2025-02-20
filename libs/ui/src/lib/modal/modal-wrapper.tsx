import { useModalStore } from '../stores/useModalStore';
import { ModalContainer } from './modal-container';

const ModalWrapperComponent = () => {
  const modals = useModalStore((state) => state.modals);

  return (
    <>
      {Array.from(modals.entries()).map(([idx, config]) => (
        <ModalContainer index={idx} key={idx} config={config} />
      ))}
    </>
  );
};
export const ModalWrapper = ModalWrapperComponent;
