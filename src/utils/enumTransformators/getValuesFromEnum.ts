export const getValuesFromEnum = <T extends object>(enumType: T): number[] => Object.values(enumType).filter((value) => typeof value === 'number');
