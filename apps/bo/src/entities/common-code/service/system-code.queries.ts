export const queryKeys = {
  list: ['system-code-list'] as const,
  detail: (enumName: string) => [...queryKeys.list, 'detail', enumName] as const,
};
