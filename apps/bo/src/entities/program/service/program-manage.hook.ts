import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  mutateOptions,
  queryKeys,
  programManageQueryOptions as queryOptions,
} from './program-manage.queries';
import { useModal } from '@learnway/ui';

export function useFetchPrograms(apiScopeCode: string) {
  return useQuery(queryOptions.all(apiScopeCode));
}

export function useFetchProgram(apiUuid: string) {
  return useQuery({ ...queryOptions.getProgram(apiUuid), enabled: !!apiUuid });
}

interface ProgramHookOptions {
  apiScope?: string;
  apiId?: string;
  onCreateSuccess?: (data: any, variables: any, context: any) => void;
  // onDeleteSuccess?: ()
}

export const useProgramHook = (options: ProgramHookOptions = {}) => {
  const queryClient = useQueryClient();
  const { showSaveComplete, showDeleteComplete, showUpdateComplete } = useModal();
  const { apiScope, apiId } = options;

  const { mutate: createMutate } = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data, variables, context) => {
      showSaveComplete();
      if (apiScope) {
        await queryClient.invalidateQueries({
          queryKey: [...queryKeys.all, apiScope],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }
      if (options.onCreateSuccess) {
        options.onCreateSuccess(data, variables, context);
      }
    },
  });

  const { mutate: deleteMutate } = useMutation({
    ...mutateOptions.delete(),
    onSuccess: async (data, variables, context) => {
      showDeleteComplete();
      if (apiScope) {
        await queryClient.invalidateQueries({
          queryKey: [...queryKeys.all, apiScope],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }
    },
  });

  const { mutate: updateMutate } = useMutation({
    ...mutateOptions.update(),
    onSuccess: async (data, variables, context) => {
      showUpdateComplete();
      if (apiScope) {
        await queryClient.invalidateQueries({
          queryKey: [...queryKeys.all, apiScope],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }
    },
  });

  const { mutate: dndMutate } = useMutation({
    ...mutateOptions.dnd(),
    onSuccess: async (data, variables, context) => {
      if (apiScope) {
        await queryClient.invalidateQueries({
          queryKey: [...queryKeys.all, apiScope],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }
    },
  });

  const handleSave = (saveData: any, callbacks?: any) => {
    createMutate(saveData, callbacks);
  };

  const handleDelete = (deleteData: any, callbacks?: any) => {
    deleteMutate(deleteData, callbacks);
  };

  const handleUpdate = (updateData: any, callbacks?: any) => {
    updateMutate(updateData, callbacks);
  };

  const handleDnd = (updateData: any, callbacks?: any) => {
    dndMutate(updateData, callbacks);
  };

  return {
    create: handleSave,
    delete: handleDelete,
    update: handleUpdate,
    dnd: handleDnd,
  };
};
