export function formatDateTimeToString(value: Date | string): string {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    // const hours = String(date.getHours()).padStart(2, "0");
    // const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year}`;
}

export function toBrazilTime(date: Date): Date {
    const utcMillis = date.getTime() + date.getTimezoneOffset() * 60000;
    const brasiliaOffset = -3;
    return new Date(utcMillis + brasiliaOffset * 3600 * 1000);
}
