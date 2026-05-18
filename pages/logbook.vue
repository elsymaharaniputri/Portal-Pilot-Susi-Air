<template>
  <div class="logbook">
    <!-- Header -->
    <div class="logbook__header">
      <div class="logbook__header-top">
        <button class="logbook__back" @click="router.back()">
          <ChevronLeft :size="20" :stroke-width="2" />
        </button>
        <h1 class="logbook__title">Flight Logbook</h1>
        <div style="width: 20px" />
      </div>

      <!-- Summary -->
      <div class="logbook__summary">
        <div class="logbook__summary-item">
          <div class="logbook__summary-label">TOTAL HOURS</div>
          <div class="logbook__summary-value">
            {{ totalHours }}<span>hrs</span>
          </div>
        </div>
        <div class="logbook__summary-divider" />
        <div class="logbook__summary-item">
          <div class="logbook__summary-label">THIS MONTH</div>
          <div class="logbook__summary-value">
            {{ thisMonthHours }}<span>hrs</span>
          </div>
        </div>
        <div class="logbook__summary-divider" />
        <div class="logbook__summary-item">
          <div class="logbook__summary-label">FLIGHT DAYS</div>
          <div class="logbook__summary-value">
            {{ totalFlightDays }}<span>days</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter -->
    <div class="logbook__filter">
      <select v-model="selectedYear" class="logbook__select">
        <option v-for="year in availableYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <select v-model="selectedMonth" class="logbook__select">
        <option value="">All Months</option>
        <option v-for="m in availableMonths" :key="m.value" :value="m.value">
          {{ m.label }}
        </option>
      </select>
    </div>

    <!-- List -->
    <div class="logbook__content">
      <div
        v-for="(group, monthKey) in filteredGrouped"
        :key="monthKey"
        class="logbook__group"
      >
        <div class="logbook__group-header">
          <span class="logbook__group-title">{{ monthKey }}</span>
          <span class="logbook__group-total">{{ groupTotal(group) }} hrs</span>
        </div>

        <div v-for="entry in group" :key="entry.date" class="logbook__entry">
          <div class="logbook__entry-left">
            <div class="logbook__entry-day">{{ formatDay(entry.date) }}</div>
            <div class="logbook__entry-weekday">
              {{ formatWeekday(entry.date) }}
            </div>
          </div>
          <div class="logbook__entry-bar-wrap">
            <div
              class="logbook__entry-bar"
              :style="{ width: barWidth(entry.hours) + '%' }"
            />
          </div>
          <div class="logbook__entry-hours">
            {{ entry.hours > 0 ? entry.hours.toFixed(1) : "-" }}
            <span v-if="entry.hours > 0">hrs</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { ChevronLeft } from "lucide-vue-next";
import flightData from "../mocks/mock-flight-hours.json";

definePageMeta({ layout: "default" });

const router = useRouter();

const entries = flightData.flightHours;

// Filter state
const selectedYear = ref(new Date().getFullYear());
const selectedMonth = ref("");

// Available years & months
const availableYears = computed(() => {
  const years = [
    ...new Set(entries.map((e) => new Date(e.date).getFullYear())),
  ];
  return years.sort((a, b) => b - a);
});

const availableMonths = computed(() => {
  const months = [
    ...new Set(
      entries
        .filter((e) => new Date(e.date).getFullYear() === selectedYear.value)
        .map((e) => new Date(e.date).getMonth()),
    ),
  ].sort((a, b) => b - a);

  return months.map((m) => ({
    value: String(m),
    label: new Date(2000, m).toLocaleString("en", { month: "long" }),
  }));
});

// Group by month
const filteredGrouped = computed(() => {
  const filtered = entries.filter((e) => {
    const d = new Date(e.date);
    const yearMatch = d.getFullYear() === selectedYear.value;
    const monthMatch =
      selectedMonth.value === "" ||
      d.getMonth() === Number(selectedMonth.value);
    return yearMatch && monthMatch && e.hours > 0;
  });

  const grouped: Record<string, typeof entries> = {};
  filtered.forEach((e) => {
    const d = new Date(e.date);
    const key = d.toLocaleString("en", { month: "long", year: "numeric" });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });

  return grouped;
});

// Computed stats
const totalHours = computed(() =>
  entries.reduce((sum, e) => sum + e.hours, 0).toFixed(1),
);

const thisMonthHours = computed(() => {
  const now = new Date();
  return entries
    .filter((e) => {
      const d = new Date(e.date);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, e) => sum + e.hours, 0)
    .toFixed(1);
});

const totalFlightDays = computed(
  () => entries.filter((e) => e.hours > 0).length,
);

// Helpers
const groupTotal = (group: typeof entries) =>
  group.reduce((sum, e) => sum + e.hours, 0).toFixed(1);

const barWidth = (hours: number) => Math.min((hours / 8) * 100, 100);

const formatDay = (date: string) => new Date(date).getDate();

const formatWeekday = (date: string) =>
  new Date(date).toLocaleString("en", { weekday: "short" });
</script>

<style lang="scss">
.logbook {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &__header {
    background: $navy;
    padding: 16px 20px 20px;
    flex-shrink: 0;
  }

  &__header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__back {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }

  &__title {
    color: #fff;
    font-size: 17px;
    font-weight: 700;
  }

  &__summary {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__summary-item {
    flex: 1;
    text-align: center;
  }

  &__summary-label {
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.4px;
    margin-bottom: 4px;
  }

  &__summary-value {
    color: #fff;
    font-size: 20px;
    font-weight: 800;
    span {
      font-size: 11px;
      font-weight: 500;
      opacity: 0.6;
      margin-left: 2px;
    }
  }

  &__summary-divider {
    width: 1px;
    height: 32px;
    background: rgba(255, 255, 255, 0.15);
  }

  &__filter {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
  }

  &__select {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 13px;
    font-family: inherit;
    background: #f8f8f8;
    color: #333;
    outline: none;
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &__group-title {
    font-size: 13px;
    font-weight: 700;
    color: #333;
  }

  &__group-total {
    font-size: 12px;
    font-weight: 600;
    color: $red;
  }

  &__entry {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #f5f5f5;
  }

  &__entry-left {
    width: 36px;
    flex-shrink: 0;
    text-align: center;
  }

  &__entry-day {
    font-size: 15px;
    font-weight: 700;
    color: #222;
    line-height: 1;
  }

  &__entry-weekday {
    font-size: 10px;
    color: #aaa;
    font-weight: 500;
    margin-top: 2px;
  }

  &__entry-bar-wrap {
    flex: 1;
    height: 6px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
  }

  &__entry-bar {
    height: 100%;
    background: $red;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  &__entry-hours {
    width: 48px;
    text-align: right;
    font-size: 13px;
    font-weight: 600;
    color: #333;
    flex-shrink: 0;
    span {
      font-size: 10px;
      color: #aaa;
      margin-left: 2px;
    }
  }
}
</style>
