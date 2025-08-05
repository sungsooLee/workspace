import { useMutation, useQuery } from '@tanstack/react-query';
import { channelBannerMutateOptions, channelBannerQueryOptions } from './channel-banner.queries';

export function useChannelBanners(params: any) {
  return useQuery(channelBannerQueryOptions.list(params));
}

export function useChannelBanner(params: any) {
  return useQuery({
    ...channelBannerQueryOptions.detail(params),
    enabled: !!(params.channelUuid && params.bannerId),
  });
}

export function useCreateChannelBanner(options: any) {
  const mutation = useMutation({
    ...channelBannerMutateOptions.create(),
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}

export function useUpdateChannelBanner(options: any) {
  const mutation = useMutation({
    ...channelBannerMutateOptions.update(),
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}

export function useDeleteChannelBanners(options: any) {
  const mutation = useMutation({
    ...channelBannerMutateOptions.delete(),
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    delete: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}

export function useToggleDisplayChannelBanner(options: any) {
  const mutation = useMutation({
    ...channelBannerMutateOptions.toggleDisplay(),
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    toggleDisplay: (params: any, callback?: any) => {
      mutation.mutate(params, callback);
    },
    ...mutation,
  };
}

export function useUpdateChannelBannerDnd(options: any) {
  const mutation = useMutation({
    ...channelBannerMutateOptions.dnd(),
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    dnd: (params: any, callback?: any) => {
      mutation.mutate(params, callback);
    },
    ...mutation,
  };
}
