export function countTags(arr: string[]): { tag: string; length: number }[] {
  const counts: { [key: string]: number } = {};

  console.log(arr);
  // Conta as ocorrências de cada string no array
  arr.forEach((item) => {
    counts[item] = (counts[item] || 0) + 1;
  });

  // Converte os resultados em objetos no formato desejado
  const result: { tag: string; length: number }[] = [];
  for (const key in counts) {
    if (counts.hasOwnProperty(key)) {
      result.push({ tag: key, length: counts[key] });
    }
  }

  return result;
}
