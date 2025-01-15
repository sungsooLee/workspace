import Modal from '../components/modal';
import { ReactNode, useCallback, useMemo, useState } from 'react';
const useModal = () => {
  const [modalContent, setModalContent] = useState<null | {
    closeOnClickOutside: boolean;
    content: ReactNode;
    title: string;
  }>(null);

  /**
   * setModalContent(null)을 호출해 모달 내용을 초기화하고 모달을 닫음.
   * useCallback을 사용해 함수 재생성을 방지.
   */
  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  /**
   * useMemo를 통해 modalContent가 존재할 경우에만 모달을 생성.
   * Modal 컴포넌트에 title, content, closeOnClickOutside 속성을 전달.
   * modalContent가 null일 경우, 모달을 렌더링하지 않음.
   */
  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content, closeOnClickOutside } = modalContent;
    return (
      <Modal onClose={onClose} title={title} closeOnClickOutside={closeOnClickOutside}>
        {content}
      </Modal>
    );
  }, [modalContent, onClose]);

  /**
   * 호출 시 setModalContent를 사용해 모달의 내용을 설정.
   * title, content(함수를 통해 React 노드 생성), 그리고 closeOnClickOutside 여부를 전달.
   * onClose 콜백을 제공해 모달이 닫힐 때 실행할 작업을 설정 가능.
   */
  const showModal = useCallback(
    (
      title: string,
      getContent: (onClose: () => void) => ReactNode,
      closeOnClickOutside = false,
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title,
      });
    },
    [onClose],
  );

  return [modal, showModal];
};

export default useModal;
