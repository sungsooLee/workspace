const commentKeys = {
  all: (id: string) => ['comments', id] as const,
};

export default commentKeys;
