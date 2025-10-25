export const currencyFormatter = (number: number) => {
  let formattedValue: string;

  return {
    toIDR(options?: Intl.NumberFormatOptions) {
      formattedValue = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        ...options,
      }).format(number);
      return formattedValue.replace(/\s(?=\d)/, "");
    },
  };
};
