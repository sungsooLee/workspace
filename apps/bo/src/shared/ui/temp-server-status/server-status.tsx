import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from '@tanstack/react-router';
import { Popover } from '@learnway/ui';

interface ServerStatus {
  status: 'healthy' | 'deploying' | 'error';
  message: string;
}

const PopoverContent = ({ serverStatus }: { serverStatus: ServerStatus }) => {
  const getStatusColor = (status: ServerStatus['status']) => {
    switch (status) {
      case 'healthy':
        return '#10b981';
      case 'deploying':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="min-w-48 p-3">
      <div className="mb-2 flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: getStatusColor(serverStatus.status) }}
        />
        <span className="text-sm font-semibold">서버 상태</span>
      </div>
      <p className="text-sm text-gray-600">{serverStatus.message}</p>
      <p className="mt-1 text-xs text-gray-400">마지막 확인: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

const ServerStatusComponent = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    status: 'error',
    message: '상태 확인 중...',
  });

  const checkServerStatus = async () => {
    try {
      const response = await fetch('/pms-module/spec/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.status === 502) {
        setServerStatus({
          status: 'deploying',
          message: '서버 배포 중입니다',
        });
      } else {
        setServerStatus({
          status: 'healthy',
          message: '서버 상태 정상',
        });
      }
    } catch (error) {
      setServerStatus({
        status: 'error',
        message: '서버 상태 확인 실패',
      });
    }
  };

  useEffect(() => {
    checkServerStatus();
  }, [location.pathname]);

  const getStatusIcon = () => {
    switch (serverStatus.status) {
      case 'healthy':
        return '✅';
      case 'deploying':
        return '🔄';
      case 'error':
        return '❌';
      default:
        return '⚪';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        zIndex: 9999,
        opacity: 0.5,
      }}
    >
      <Popover popoverContent={<PopoverContent serverStatus={serverStatus} />}>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            cursor: 'pointer',
          }}
          title="서버 상태"
        >
          {getStatusIcon()}
        </div>
      </Popover>
    </div>
  );
};

export const ServerStatus = memo(ServerStatusComponent);
