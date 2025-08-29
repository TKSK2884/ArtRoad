export function convertKoreaTime(date = new Date(), type = "full") {
    const koreaDate = new Date(
        date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );

    if (type === "day") {
        koreaDate.setHours(0, 0, 0, 0);
    }

    return koreaDate;
}

export function isOngoing(start: string, end: string) {
    const now = convertKoreaTime(new Date(), "day");

    const startDate = new Date(start);
    const endDate = new Date(end);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return startDate <= now && now <= endDate;
}
