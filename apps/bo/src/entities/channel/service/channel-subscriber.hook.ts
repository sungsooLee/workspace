import { useQuery } from '@tanstack/react-query';
import { channelSubscriberQueryOptions } from './channel-subscriber.queries';

export function useChannelSubscribers(params: any) {
  return useQuery(channelSubscriberQueryOptions.list(params));
}
