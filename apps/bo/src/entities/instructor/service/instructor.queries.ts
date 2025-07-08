import InstructorService from '../api/instructor';

export const queryKeys = {
  rolesByTenantId: ['roles-by-tenant-id'] as const,
  list: ['instructors'] as const,
  detail: ['instructor'] as const,
};

export const queryOptions = {
  rolesByTenantId: (tenantId: number) => ({
    queryKey: queryKeys.rolesByTenantId,
    queryFn: () => InstructorService.fetchRolesByTenantId(tenantId),
  }),
  all: (params: any) => ({
    queryKey: queryKeys.list,
    queryFn: () => InstructorService.fetchList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (params: number) => ({
    queryKey: queryKeys.detail,
    queryFn: () => InstructorService.fetchOne(params),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => InstructorService.insertInstructor(payload),
  }),
  update: () => ({
    mutationFn: (payload: any) => {
      const instructorId = payload.instructorId;
      delete payload.instructorId;
      InstructorService.updateInstructor(instructorId, payload);
    },
  }),
  delete: () => ({
    mutationFn: (instructorId: number) => InstructorService.deleteInstructor(instructorId),
  }),
};
