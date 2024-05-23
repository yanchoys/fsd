export const truncateText = (text: string, includedLetters: number) => {
  return text.substring(0, includedLetters) + (text.length > 50 ? "..." : "");
};
