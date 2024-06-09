export const getNumericEnumValues = <T>(enumType: T): string[] => {
  return Object.values(enumType).filter((value) => typeof value === 'number');
};
