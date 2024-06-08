export const messageGenerators = {
  generateCommon: (field: string, dataType: string) => `Product ${field}. Accept ${dataType}`,

  generateMustHaveLengthInRange: (min: number, max: number, field: string, dataType = 'string'): string => {
    return `${messageGenerators.generateCommon(field, dataType)} which must have length between ${min} and ${max} ${dataType.includes('string') ? 'characters' : 'items'} long.`;
  },

  generateMustBeInRange: (min: number, max: number, field: string, dataType = 'number', units = ''): string => {
    return `${messageGenerators.generateCommon(field, dataType)} which must be between ${min} and ${max}. ${units}`;
  },

  generateMustHaveProps: (props: string[], field: string, dataType = 'object'): string => {
    return `${messageGenerators.generateCommon(field, dataType)} which must have props: ${props.join(', ')}`;
  },

  generateMustBeNotLess: (min: number, field: string, dataType = 'number', units = ''): string => {
    return `${messageGenerators.generateCommon(field, dataType)} which must be not less than ${min}. ${units}`;
  },

  generateMustAcceptValues: (values: string[], field: string, dataType: string): string => {
    return `${messageGenerators.generateCommon(field, dataType)} with possible values: ${values.join(', ')}.`;
  },

  generateMustBeUnique: () => `Must be unique.`
};
