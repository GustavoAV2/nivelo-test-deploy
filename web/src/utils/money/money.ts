export const numberToMoney = (value: number, prefix: string): string => {
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const numberFormat = new Intl.NumberFormat("pt-BR", options);
    const result = numberFormat.format(value / 100);
    const separator = prefix ? " " : "";

    if (value == null || isNaN(value)) {
        throw new Error("The provided value is not a convertible number");
    }

    return `${prefix}${separator}${result}`;
};

export const moneyToNumber = (value: string): number => {
    const digits = value.replace(/\D/g, "");
    const result = Number(digits);

    if (value == "" || value == null || digits == "" || digits == null || isNaN(result)) {
        throw new Error("The provided value is not a convertible number");
    }

    return result;
};
