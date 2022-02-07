const toCamelCase = (text) =>
  text
    .toLowerCase()
    .replace(/\s+(\w)?/gi, (_match, letter) => letter.toUpperCase());

export default toCamelCase;
