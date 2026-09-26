export function toCapitalCase(value: string): string {
  return getWords(value).map(capitalize).join(" ");
}

export function toKebabCase(value: string): string {
  return getWords(value)
    .map((word) => word.toLowerCase())
    .join("-");
}

export function humanizeList(list: string[]): string {
  if (list.length <= 1) return list.join("");

  return `${list.slice(0, -1).join(", ")} and ${list.at(-1)}`;
}

function getWords(value: string): string[] {
  return value
    .replace(/([\p{Ll}\d])(\p{Lu})/gu, "$1 $2")
    .replace(/(\p{Lu})(\p{Lu}\p{Ll})/gu, "$1 $2")
    .split(/[^\p{L}\d]+/u)
    .filter(Boolean);
}

function capitalize(word: string): string {
  return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
}
