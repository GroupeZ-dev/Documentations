import { parse, stringify } from "yaml";

export function readDocument(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return match
    ? { data: parse(match[1]) || {}, content: text.slice(match[0].length) }
    : { data: {}, content: text };
}
export function writeDocument(content, data) {
  return `---\n${stringify(data)}---\n${content}`;
}
