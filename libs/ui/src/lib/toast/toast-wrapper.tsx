import { useToastStore } from '../stores/useToastStore';
import { ToastContainer } from './toast-container';

const ToastWrapperComponent = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <>
      {Array.from(toasts.entries()).map(([index, toastConfig]) => (
        <ToastContainer index={index} key={index} config={toastConfig} />
      ))}
    </>
  );
};
export const ToastWrapper = ToastWrapperComponent;
