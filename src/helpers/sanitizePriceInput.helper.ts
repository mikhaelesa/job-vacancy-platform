export const sanitizePriceInput = (input: string) => {
  return (
    parseInt(
      input
        .replace(/[^\d]*(\d{1,3}(?:\.\d{3})*)[^\d]*/, "$1")
        .replace(/\./g, "")
    ) || 0
  );
};
