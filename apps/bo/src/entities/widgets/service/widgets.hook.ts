import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import { useModal } from '@learnway/ui';
import { useCurrentRoute } from '@learnway/hooks';

import { widgetsQueryOptions } from './widgets.queries';

const useWidgetsHook = () => {
  const { state } = useCurrentRoute();
  const [processType, setProcessType] = useState('LOADING');
  const queryClient = useQueryClient();
  const [messageId, setMessageId] = useState();
  const { alert: openAlert } = useModal();

  const handleGetWidget = async (widgetCode: string) => {
    setProcessType('LOADING');
    return await queryClient.fetchQuery(widgetsQueryOptions.get(widgetCode)).then(() => {
      setProcessType('VIEW');
    });
  };

  useEffect(() => {
    const query = state.widgetCode;
  }, []);

  return {
    widgetCode: state.widgetCode,
    getWidget: handleGetWidget,
    processType,
  };
};

export const useWidgets = useWidgetsHook;
