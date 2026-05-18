/* eslint-disable @stylistic/max-statements-per-line */
// stores/flight.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

import type {
  Pilot,
  Schedule,
  Document,
  FlightLimits,
  ToggleConfig,
} from "../types/flight";
import { LIMITS, TOGGLE_CONFIG, LEGEND } from "../types/flight";
import { addDays, rollingSum, getFlightAlert } from "../utils/dateHelper";
import { fetchFlightHours } from "../services/flightHourService";
import { fetchSchedules, filterByMonth } from "../services/scheduleService";
import { fetchDocuments } from "../services/documentService";

export const useFlightStore = defineStore("flight", () => {
  // ----- STATE -----
  const pilot = ref<Pilot | null>(null);
  const flightHours = ref<Record<string, number>>({});
  const schedules = ref<Schedule[]>([]);
  const documents = ref<Document[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const limits = ref<FlightLimits>(LIMITS);
  const chartBounds = ref<Record<string, ToggleConfig>>(TOGGLE_CONFIG);

  const TODAY = "2026-05-31";
  const currentYear = ref(new Date().getFullYear());
  const currentMonth = ref(new Date().getMonth() + 1);

  // ----- ACTIONS -----
  async function fetchDashboard() {
    isLoading.value = true;
    error.value = null;
    try {
      const [flightData, schedulesData, documentsData] = await Promise.all([
        fetchFlightHours(),
        fetchSchedules(),
        fetchDocuments(),
      ]);

      // pilot.value = {
      //   ...flightData.pilot,
      //   name: localStorage.getItem("pilot_username") ?? flightData.pilot.name,
      // };
      pilot.value = flightData.pilot;
      flightHours.value = flightData.hoursMap;
      limits.value = flightData.limits;

      // Merge chartBounds dari JSON dengan label dari TOGGLE_CONFIG
      const merged: Record<string, ToggleConfig> = {};
      Object.entries(flightData.chartBounds).forEach(([key, bound]) => {
        merged[key] = {
          windowDays: bound.windowDays,
          limit: bound.limit,
          label: TOGGLE_CONFIG[key]?.label ?? key, // ambil label dari konstanta
        };
      });
      chartBounds.value = merged;

      schedules.value = schedulesData;
      documents.value = documentsData;
    } catch (err) {
      error.value = "Gagal memuat data.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  function fetchSchedulesByMonth(year: number, month: number) {
    currentYear.value = year;
    currentMonth.value = month;
  }

  // ----- COMPUTED -----
  const hoursDaily = computed(() => rollingSum(flightHours.value, TODAY, 1));
  const hoursWeekly = computed(() => rollingSum(flightHours.value, TODAY, 7));
  const hoursMonthly = computed(() => rollingSum(flightHours.value, TODAY, 30));
  const hoursAnnual = computed(() => rollingSum(flightHours.value, TODAY, 365));

  const flightAlerts = computed(() => ({
    daily: getFlightAlert(hoursDaily.value, limits.value.daily, 1),

    weekly: getFlightAlert(hoursWeekly.value, limits.value.weekly, 7),

    monthly: getFlightAlert(hoursMonthly.value, limits.value.monthly, 30),

    annual: getFlightAlert(hoursAnnual.value, limits.value.annual, 365),
  }));

  const scheduleMap = computed(() => {
    const map: Record<string, Schedule> = {};
    schedules.value.forEach((s) => {
      map[s.duty_date] = s;
    });
    return map;
  });

  const schedulesByMonth = computed(() =>
    filterByMonth(schedules.value, currentYear.value, currentMonth.value),
  );

  function getChartData(toggleKey: string) {
    const cfg = chartBounds.value[toggleKey];
    if (!cfg) return { labels: [], values: [], limit: 0 };

    const labels: string[] = [];
    const values: number[] = [];

    for (let i = -7; i <= 7; i++) {
      const d = addDays(TODAY, i);
      const dt = new Date(d + "T00:00:00");
      labels.push(`${dt.getDate()}/${dt.getMonth() + 1}`);
      values.push(rollingSum(flightHours.value, d, cfg.windowDays)); // ← windowDays
    }

    return { labels, values, limit: cfg.limit };
  }

  // ----- EXPOSE -----
  return {
    pilot,
    flightHours,
    schedules,
    documents,
    isLoading,
    error,
    TODAY,
    LIMITS,
    TOGGLE_CONFIG,
    LEGEND,
    hoursDaily,
    hoursWeekly,
    hoursMonthly,
    hoursAnnual,
    scheduleMap,
    schedulesByMonth,
    fetchDashboard,
    fetchSchedulesByMonth,
    getChartData,
    flightAlerts,
  };
});
