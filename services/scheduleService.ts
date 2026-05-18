// services/scheduleService.ts
import type { Schedule } from '../types/flight'

interface ScheduleRaw {
  schedules: Schedule[]
}

export async function fetchSchedules(): Promise<Schedule[]> {
  const raw: ScheduleRaw = await import('../mocks/mock-schedules.json')
  return raw.schedules
}

export function filterByMonth(
  schedules: Schedule[],
  year: number,
  month: number
): Schedule[] {
  return schedules.filter((s) => {
    const d = new Date(s.duty_date)
    return d.getFullYear() === year && d.getMonth() + 1 === month
  })
}
