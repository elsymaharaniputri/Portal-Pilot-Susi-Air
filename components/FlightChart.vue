<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- components/FlightChart.vue -->
<template>
  <div class="card">
    <div class="toggle-row">
      <button
        v-for="key in toggleKeys"
        :key="key"
        class="toggle-btn"
        :class="{ 'toggle-btn--active': activeToggle === key }"
        @click="activeToggle = key"
      >
        {{ key }}
      </button>
    </div>
    <div
  v-if="activeAlert"
  class="flight-alert"
  :class="`flight-alert--${activeAlert.type}`"
>
  <h3 class="flight-alert__title">
    {{ activeAlert.title }}
  </h3>

  <p class="flight-alert__message">
    {{ activeAlert.message }}
  </p>
</div>
    <div class="chart-wrap">
      <Line
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Filler, Tooltip
} from 'chart.js'
import { useFlightStore } from '../stores/flight'

import type { ChartOptions, TooltipItem, Scale } from 'chart.js'
import { computed, ref } from 'vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const store = useFlightStore()
const toggleKeys = ['1w', '1m', '3m', '6m', '1y'] as const
type ToggleKey = typeof toggleKeys[number]
const activeToggle = ref<ToggleKey>('1w')

const activeAlert = computed(() => {
  switch (activeToggle.value) {
    case '1w':
      return store.flightAlerts.weekly

    case '1m':
      return store.flightAlerts.monthly

    case '1y':
      return store.flightAlerts.annual

    default:
      return null
  }
})

const chartData = computed(() => {
  const { labels, values, limit } = store.getChartData(activeToggle.value)
  return {
    labels,
    datasets: [
      {
        label: 'Rolling Hours',
        data: values,
        borderColor: '#22C5E8',
        backgroundColor: 'rgba(34,197,232,0.1)',
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: '#22C5E8',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Batas',
        data: Array(values.length).fill(limit),
        borderColor: '#E63757',
        borderWidth: 1.5,
        borderDash: [5, 4],
        pointRadius: 0,
        fill: false
      }
    ]
  }
})

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: TooltipItem<'line'>) => {
          const value = ctx.parsed.y ?? 0
          return ctx.dataset.label + ': ' + value.toFixed(1) + ' jam'
        }
      }
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: {
        font: { size: 9 },
        color: '#94A3B8'
      }
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: {
        font: { size: 9 },
        color: '#94A3B8',
        callback: function (this: Scale, tickValue: string | number) {
          return tickValue + 'j'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.toggle-row {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
}

.toggle-btn {
  flex: 1;
  padding: 6px 4px;
  border: 1.5px solid $border;
  border-radius: 8px;
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  color: $text-secondary;
  background: white;
  cursor: pointer;
  transition: all 0.15s;

  &--active {
    border-color: $navy;
    background: $navy;
    color: #fff;
  }
}

.flight-alert {
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 14px;

  &__title {
    margin: 0 0 4px;
    font-size: 12px;
    font-weight: 700;
  }

  &__message {
    margin: 0;
    font-size: 11px;
    line-height: 1.5;
  }

  &--warning {
    background: #FEF3C7;
    color: #92400E;
  }

  &--danger {
    background: #FEE2E2;
    color: #991B1B;
  }
}

.chart-wrap {
  position: relative;
  height: 160px;
}


</style>
