// types/flight.ts

// ===== INTERFACES =====
export interface Pilot {
  name: string
  totalFlightHours: number
}

export interface FlightLimits {
  daily: number
  weekly: number
  monthly: number
  annual: number
}

// Interface sesuai struktur JSON
export interface ChartBound {
  limit: number
  windowDays: number  // ← sesuai JSON
}

// Interface untuk UI toggle (tambah label)
export interface ToggleConfig {
  windowDays: number  // ← samakan dengan ChartBound
  limit: number
  label: string       // ← hanya untuk UI
}

export interface Schedule {
  id: string
  duty_date: string
  base_name: string
  base_color: string
  duty_type: string
  count_schedules: number
  count_logbooks: number
}

export interface Document {
  id: string
  label: string
  expiryDate: string
}

export interface LegendItem {
  code: string
  label: string
  color: string
}

// ===== CONSTANTS =====
export const LIMITS: FlightLimits = {
  daily:   8,
  weekly:  40,
  monthly: 100,
  annual:  1050
}

// TOGGLE_CONFIG sebagai fallback UI — akan dioverride dari JSON
export const TOGGLE_CONFIG: Record<string, ToggleConfig> = {
  '1w': { windowDays: 7,   limit: 40,   label: '7 Hari'   },
  '1m': { windowDays: 30,  limit: 100,  label: '30 Hari'  },
  '3m': { windowDays: 90,  limit: 300,  label: '90 Hari'  },
  '6m': { windowDays: 180, limit: 600,  label: '180 Hari' },
  '1y': { windowDays: 365, limit: 1050, label: '365 Hari' }
}

export const LEGEND: LegendItem[] = [
  { code: 'DTY', label: 'On Duty',      color: '#10B981' },
  { code: 'RLV', label: 'Req. Leave',   color: '#475569' },
  { code: 'SCK', label: 'Sick',         color: '#EF4444' },
  { code: 'TRX', label: 'Training',     color: '#F59E0B' },
  { code: 'ADM', label: 'Admin',        color: '#9CA3AF' },
  { code: 'FER', label: 'Ferry',        color: '#7C2D12' },
  { code: 'MED', label: 'Medical',      color: '#7C3AED' },
  { code: 'REC', label: 'Recurrent',    color: '#0EA5E9' },
  { code: 'ULV', label: 'Unpaid Leave', color: '#111827' }
]