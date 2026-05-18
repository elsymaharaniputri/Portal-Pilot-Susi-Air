// utils/dateHelper.ts

export function addDays(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day + days); // local time, bukan UTC
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export function rollingSum(
  hours: Record<string, number>,
  dateStr: string,
  windowDays: number,
): number {
  let total = 0;
  for (let i = 0; i < windowDays; i++) {
    const d = addDays(dateStr, -i);
    total += hours[d] ?? 0;
  }
  return Math.round(total * 10) / 10;
}

export function getWindowLabel(windowDays: number) {
  if (windowDays === 7) return "7-day";
  if (windowDays === 30) return "30-day";
  if (windowDays === 365) return "365-day";

  return `${windowDays}-day`;
}

export function getFlightAlert(
  rollingHours: number,
  limit: number,
  windowDays: number,
) {
  const periodLabel = getWindowLabel(windowDays);

  if (rollingHours > limit) {
    return {
      type: "danger",
      title: "Flight Time Limitation Exceeded",
      message:
        `The pilot has accumulated ` +
        `${rollingHours.toFixed(1)} flight hours ` +
        `within the current ${periodLabel} monitoring period. ` +
        `This exceeds the permitted operational limit ` +
        `of ${limit.toFixed(1)} hours.`,
    };
  }

  if (rollingHours >= limit * 0.8) {
    return {
      type: "warning",
      title: "Flight Time Approaching Operational Limit",
      message:
        `The pilot has accumulated ` +
        `${rollingHours.toFixed(1)} flight hours ` +
        `within the current ${periodLabel} monitoring period. ` +
        `Please monitor remaining allowable hours closely.`,
    };
  }

  return null;
}
