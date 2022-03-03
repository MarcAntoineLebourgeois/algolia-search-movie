export const stringToArray = (string: string): string[] =>
  string.replace(/\[|\]/g, "").replaceAll("'", "").split(",");
