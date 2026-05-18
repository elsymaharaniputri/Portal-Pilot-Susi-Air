import type { Pilot, FlightLimits, ChartBound } from '~/types/flight'

export async function fetchFlightHours(): Promise<{
  pilot: Pilot
  limits: FlightLimits
  chartBounds: Record<string, ChartBound>
  hoursMap: Record<string, number>
}> {
  const raw = await import('../mocks/mock-flight-hours.json')

  return {
    pilot:       raw.pilot,
    limits:      raw.limits,
    chartBounds: raw.chartBounds,
    hoursMap:    Object.fromEntries(
      raw.flightHours.map((e: { date: string; hours: number }) => [e.date, e.hours])
    )
  }
}