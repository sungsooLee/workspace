import { useApproveRequestChannel, useRejectRequestChannel } from '@entities/channel';
import { useModal } from '@learnway/ui/modal';
import { RejectModal } from '@shared/ui';
import { t } from 'i18next';

export const getChannelUrl = (channelMainId: string) => {
  if (channelMainId) return `${import.meta.env.VITE_FO_DOMAIN}/@${channelMainId}`;
  return '';
};

/**
 * 채널 개설 신청 접수/반려 처리
 * @returns
 */
export const useChannelApplication = () => {
  const { openModal, confirm: openConfirm, alert } = useModal();

  const { approve: approveRequestChannel } = useApproveRequestChannel({});
  const { reject: rejectRequestChannel } = useRejectRequestChannel({});

  const accept = (requestUuid: string[], callback: any) => {
    if (requestUuid.length > 0) {
      openConfirm({
        title: t('접수 하시겠습니까?'),
        content: <p>{t('채널 개설 신청을 접수한 후에 채널을 개설해야 합니다.')}</p>,
        onClose: (value: boolean) => {
          if (value) {
            approveRequests(requestUuid, callback);
          }
        },
      });
    }
  };

  const reject = (requestUuid: string[], callback: any) => {
    if (requestUuid.length > 0) {
      openModal({
        width: 'sm',
        content: <RejectModal />,
        async onClose(data: any) {
          console.log('reason', data);
          if (data) {
            setTimeout(() => {
              confirmReject(requestUuid, data.rejectReason, callback);
            }, 0);
          }
        },
      });
    }
  };

  const approveRequests = (requestUuid: string[], callback: any) => {
    const payload = {
      channelRequestUuid: requestUuid,
    };
    approveRequestChannel(payload, {
      onSuccess: (data: any) => {
        if (callback) callback();
        alert({
          title: t('접수가 완료되었습니다.'),
          content: (
            <p>
              {t(
                '채널을 개설해야 채널 신청이 왼료됩니다.목록에서 접수 처리한 채널을 개설해 주세요.',
              )}
            </p>
          ),
        });
      },
    });
  };

  const confirmReject = (requestUuid: string[], rejectReason: string, callback: any) => {
    openConfirm({
      title: t('반려 하시겠습니까?'),
      content: (
        <p>
          {t(
            '채널 개설 신청을 반려하면 해당 신청 건으로 채널 개설을 할 수 없습니다. 반려 처리 시 반려 안내 메일이 발송됩니다.',
          )}
        </p>
      ),
      onClose: (value: boolean) => {
        if (value) {
          rejectRequests(requestUuid, rejectReason, callback);
        }
      },
    });
  };

  const rejectRequests = (requestUuid: string[], rejectReason: string, callback: any) => {
    const payload = {
      channelRequestUuid: requestUuid,
      rejectedReasonContent: rejectReason,
    };
    console.log('payload', payload);
    rejectRequestChannel(payload, {
      onSuccess: (data: any) => {
        if (callback) callback();
      },
    });
  };

  return { accept, reject };
};
