import InstructorService from '../api/instructor';

export const queryKeys = {
  rolesByTenantId: ['roles-by-tenant-id'] as const,
  list: ['instructors'] as const,
  detail: ['instructor'] as const,
  history: ['history'] as const,
  duplicateCheckEmail: ['duplicate-check-email'] as const,
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
  history: (params: any) => ({
    queryKey: queryKeys.history,
    queryFn: () => {
      const instructorId = params.instructorId;
      delete params.instructorId;
      return InstructorService.fetchHistory(instructorId, params);
    },
    cacheTime: 0,
    staleTime: 0,
  }),
  duplicateCheckEmail: (params: any) => ({
    queryKey: queryKeys.duplicateCheckEmail,
    queryFn: () => InstructorService.fetchDuplicateCheckEmail(params),
  }),
};

export const mutateOptions = {
  createInstructor: () => ({
    mutationFn: (payload: any) => InstructorService.insertInstructor(payload),
  }),
  updateInstructor: () => ({
    mutationFn: (payload: any) => {
      const instructorId = payload.instructorId;
      delete payload.instructorId;
      return InstructorService.updateInstructor(instructorId, payload);
    },
  }),
  deleteInstructor: () => ({
    mutationFn: (instructorId: number) => InstructorService.deleteInstructor(instructorId),
  }),
  createTutor: () => ({
    mutationFn: (payload: any) => InstructorService.insertTutor(payload),
  }),
};
