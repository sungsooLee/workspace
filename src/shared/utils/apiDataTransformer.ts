// utils/apiDataTransformer.ts
export const transformApiData = <T>(
  data: any,
  transformRules: Partial<Record<keyof T, (value: any) => any>>
): T => {
  const transformedData: Partial<T> = {};

  for (const key in data) {
    if (transformRules.hasOwnProperty(key)) {
      transformedData[key as keyof T] = transformRules[key as keyof T]!(
        data[key]
      );
    } else {
      transformedData[key as keyof T] = data[key];
    }
  }

  return transformedData as T;
};
