export const getEnumKeyByValue = <T extends object, V extends T[keyof T]>(
  enumObj: T,
  value: V
): keyof T | undefined => {
  return (Object.keys(enumObj) as Array<keyof T>).find(
    (key) => enumObj[key] === value
  );
};

export const getEnumValueByKey = <T extends object>(
  enumObj: T,
  value: string
) => {
  return Object.entries(enumObj).find(([key, val]) => key === value)?.[1];
};
