const toCamelCase = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+(\w)?/gi, (_match, letter) => letter.toUpperCase());

export default toCamelCase;
