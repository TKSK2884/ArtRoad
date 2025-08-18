export function convertKoreaTime(date = new Date(), type = "full") {
    const koreaDate = new Date(
        date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );

    if (type === "day") {
        koreaDate.setHours(0, 0, 0, 0);
    }

    return koreaDate;
}
