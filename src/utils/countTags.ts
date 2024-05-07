export function countTags(arr: string[]): { tag: string; length: number }[] {
  const counts: { [key: string]: number } = {};

  arr.forEach((item) => {
    counts[item] = (counts[item] || 0) + 1;
  });

  const result: { tag: string; length: number }[] = [];
  for (const key in counts) {
    if (counts.hasOwnProperty(key)) {
      result.push({ tag: key, length: counts[key] });
    }
  }

  return result;
}
