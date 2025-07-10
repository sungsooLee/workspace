export function convertToThumbnailObject({
  data,
  objectName,
  groupUuidName,
  selectedFileUuidName,
  isLoading,
}: {
  data: Record<string, any>;
  objectName: string;
  groupUuidName: string;
  selectedFileUuidName?: string;
  isLoading?: boolean;
}) {
  return {
    ...data,
    ...(data[groupUuidName]
      ? {
          [objectName]: {
            groupUuid: data[groupUuidName],
            ...(selectedFileUuidName && data[selectedFileUuidName]
              ? { selectedFileUuid: data[selectedFileUuidName] }
              : {}),
            ...(isLoading ? { isLoading } : {}),
          },
        }
      : {}),
  };
}
