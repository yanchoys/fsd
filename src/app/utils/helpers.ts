export const truncateText = (text: string, includedLetters: number) => {
  return text.substring(0, includedLetters) + (text.length > 50 ? "..." : "");
};

export const capitalize = (word: string) => {
  return `${word.at(0)?.toUpperCase()}${word.substring(1).toLowerCase()}`;
};
