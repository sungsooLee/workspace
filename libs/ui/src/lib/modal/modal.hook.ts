import { createElement, useCallback } from 'react';
import { isMobile } from 'react-device-detect';

import { useModalStore } from '../stores/useModalStore';
import { Alert, AlertComponentProps } from '../alert/alert';
import { ModalConfig, useModalReturnValue } from './type';
import { getRandomId } from '@learnway/shared';

const useModal = (): useModalReturnValue => {
  const { modals, open: openModal, close: closeModal, closeAll: closeAllModal } = useModalStore();

  /**
   * 일반 모달을 엽니다.
   *
   * @param config - 모달 설정 객체 (ModalConfig)
   * @returns Promise<any> - 모달 닫힘 시 전달된 데이터로 resolve됩니다.
   *
   * 기본적으로 모바일 환경에선 전체 너비(m_full), 그 외엔 'md' 너비를 사용합니다.
   * config.onClose가 있다면 해당 콜백도 함께 호출됩니다.
   */
  const open = useCallback(
    (config: ModalConfig): Promise<any> => {
      return new Promise((resolve, reject) => {
        const newConfig: ModalConfig = {
          ...config,
          id: getRandomId(),
          width: isMobile ? 'm_full' : config.width || 'md', // modal 은 기본 width 'md'
          onClose: (data?: any) => {
            config?.onClose?.(data);
            resolve(data);
          },
        };
        openModal(newConfig);
      });
    },
    [openModal],
  );

  /**
   * 현재 활성화된 모달을 닫습니다.
   *
   * @param data - 모달 종료 시 전달할 데이터 (optional)
   */
  const close = useCallback((data?: any) => closeModal(data), [closeModal]);

  /**
   * 현재 열린 모든 모달을 닫습니다.
   */
  const closeAll = useCallback(() => closeAllModal(), [closeAllModal]);

  /**
   * 알림(Alert) 모달을 띄웁니다.
   *
   * @param props - 알림 설정 객체 또는 문자열
   *                문자열일 경우 title로 사용됩니다.
   * @returns Promise<any> - 알림이 닫힌 후 resolve됩니다.
   *
   * 사용 예:
   * await alert('저장이 완료되었습니다');
   * await alert({ title: '에러', description: '처리에 실패했습니다', type: 'error' });
   */
  const alert = useCallback(
    (props: AlertComponentProps | string): Promise<any> => {
      return new Promise((resolve, reject) => {
        const defaultProps =
          typeof props === 'string'
            ? {
                title: props,
                onClose: () => null,
              }
            : {
                ...props,
              };
        const config: ModalConfig = {
          id: getRandomId(),
          content: createElement(Alert, {
            ...defaultProps,
          }),
          hideCloseButton: true,
          onClose: (value: any) => {
            defaultProps?.onClose?.(value);
            resolve(value);
          },
        };
        openModal(config);
      });
    },
    [openModal],
  );

  /**
   * 확인(Confirm) 모달을 띄웁니다.
   *
   * @param props - 확인창 설정 객체 또는 문자열
   *                문자열일 경우 title로 사용됩니다.
   * @returns Promise<any> - 확인 또는 취소 시 resolve됩니다.
   *
   * 사용 예:
   * const confirmed = await confirm('삭제하시겠습니까?');
   * if (confirmed) { ... }
   */
  const confirm = useCallback(
    (props: AlertComponentProps | string): Promise<any> => {
      return new Promise((resolve, reject) => {
        const defaultProps =
          typeof props === 'string'
            ? {
                title: props,
                isConfirm: true,
                onClose: () => null,
              }
            : {
                ...props,
                isConfirm: true,
              };
        const config = {
          id: getRandomId(),
          content: createElement(Alert, defaultProps),
          hideCloseButton: true,
          onClose: (value: any) => {
            defaultProps?.onClose?.(value);
            resolve(value);
          },
        };
        openModal(config);
      });
    },
    [openModal],
  );

  /**
   * 서버 저장 완료 후 호출하여 사용자에게 성공 알림을 표시하는 함수입니다.
   *
   * @param props - AlertComponentProps 타입의 선택적 알림 설정 값
   * @returns Promise<boolean> - 알림 표시 이후의 처리를 위한 Promise 객체 반환
   *
   * 사용 예:
   * await showSaveComplete(); // 기본 메시지 표시
   */
  const showSaveComplete = useCallback(
    (props?: AlertComponentProps): Promise<boolean> =>
      alert({
        ...props,
        content: '정상적으로 저장되었습니다.',
        type: 'complete',
      }),
    [openModal],
  );

  /**
   * 서버 수정 완료 후 호출하여 사용자에게 성공 알림을 표시하는 함수입니다.
   *
   * @param props - AlertComponentProps 타입의 선택적 알림 설정 값
   * @returns Promise<boolean> - 알림 표시 이후의 처리를 위한 Promise 객체 반환
   *
   * 사용 예:
   * await showUpdateComplete(); // 기본 메시지 표시
   */
  const showUpdateComplete = useCallback(
    (props?: AlertComponentProps): Promise<boolean> =>
      alert({
        ...props,
        content: '정상적으로 수정되었습니다.',
        type: 'complete',
      }),
    [openModal],
  );

  /**
   * 서버 삭제 완료 후 호출하여 사용자에게 성공 알림을 표시하는 함수입니다.
   *
   * @param props - AlertComponentProps 타입의 선택적 알림 설정 값
   * @returns Promise<boolean> - 알림 표시 이후의 처리를 위한 Promise 객체 반환
   *
   * 사용 예:
   * await showDeleteComplete(); // 기본 메시지 표시
   */
  const showDeleteComplete = useCallback(
    (props?: AlertComponentProps): Promise<boolean> =>
      alert({
        ...props,
        content: '정상적으로 삭제되었습니다.',
        type: 'complete',
      }),
    [openModal],
  );

  return {
    open,
    close,
    closeAll,
    alert,
    confirm,
    modals,
    showSaveComplete,
    showUpdateComplete,
    showDeleteComplete,
  };
};

export { useModal };
