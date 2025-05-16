export const queryKeys = {
  list: ['system-code-list'] as const,
  detail: (enumName: string) => [...queryKeys.list, 'detail', enumName] as const,
};

export const apiKeys = {
  list: 'systemCode.list',
  detail: 'systemCode.detail',
} as const;
