export const getKeysFromEnum = <T extends object>(enumType: T): string[] => Object.values(enumType).filter((value) => typeof value !== 'number');
