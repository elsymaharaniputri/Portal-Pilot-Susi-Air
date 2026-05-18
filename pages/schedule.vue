<!-- eslint-disable @stylistic/max-statements-per-line -->
<!-- pages/schedule.vue -->
<template>
  <div class="schedule">
    <!-- Header -->
    <div class="schedule__header">
      <div class="schedule__month-nav">
        <button
          class="schedule__nav-btn"
          @click="changeMonth(-1)"
        >
          <svg viewBox="0 0 18 18"><polyline points="11 4 6 9 11 14" /></svg>
        </button>
        <span class="schedule__month-name">{{ MONTHS_ID[calMonth] }} {{ calYear }}</span>
        <button
          class="schedule__nav-btn"
          @click="changeMonth(1)"
        >
          <svg viewBox="0 0 18 18"><polyline points="7 4 12 9 7 14" /></svg>
        </button>
      </div>
      <div class="schedule__dow-header">
        <div
          v-for="d in ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']"
          :key="d"
          class="schedule__dow-label"
        >
          {{ d }}
        </div>
      </div>
    </div>

    <!-- Calendar grid -->
    <div class="schedule__content">
      <div class="schedule__grid">
        <!-- Empty cells -->
        <div
          v-for="i in firstDay"
          :key="'e'+i"
          class="cal-day cal-day--empty"
        />
        <!-- Day cells -->
        <div
          v-for="d in daysInMonth"
          :key="d"
          class="cal-day"
          :class="{ 'cal-day--today': isToday(d) }"
          :style="{ background: getSchedule(d)?.base_color || 'rgba(14,33,56,0.07)' }"
          @click="openModal(d)"
        >
          <span class="cal-day__num">{{ d }}</span>
          <span
            v-if="getSchedule(d)"
            class="cal-day__base"
          >{{ getSchedule(d)?.base_name }}</span>
          <div
            v-if="getSchedule(d)"
            class="cal-day__badge"
          >
            {{ getSchedule(d)?.count_logbooks === getSchedule(d)?.count_schedules ? '✓' : getSchedule(d)?.count_schedules }}
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="schedule__legend">
        <div
          v-for="item in store.LEGEND"
          :key="item.code"
          class="legend-item"
        >
          <div
            class="legend-item__dot"
            :style="{ background: item.color }"
          />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div
        v-if="selectedDay"
        class="modal-overlay"
        @click.self="selectedDay = null"
      >
        <div class="modal-sheet">
          <div class="modal-sheet__pill" />
          <button
            class="modal-sheet__close"
            @click="selectedDay = null"
          >
            ✕
          </button>
          <div class="modal-sheet__title">
            {{ modalTitle }}
          </div>
          <div class="modal-sheet__sub">
            {{ modalSub }}
          </div>
          <div class="modal-sheet__placeholder">
            <p>Detail page coming soon</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFlightStore } from '../stores/flight'

definePageMeta({ layout: 'default' })

const store = useFlightStore()
const MONTHS_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const DAYS_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

const calYear = ref(2026)
const calMonth = ref(4) // Mei = index 4

const selectedDay = ref<number | null>(null)

const firstDay = computed(() => new Date(calYear.value, calMonth.value, 1).getDay())
const daysInMonth = computed(() => new Date(calYear.value, calMonth.value + 1, 0).getDate())

function dateStr(d: number) {
  const mm = String(calMonth.value + 1).padStart(2, '0')
  const dd = String(d).padStart(2, '0')
  return `${calYear.value}-${mm}-${dd}`
}

function getSchedule(d: number) {
  return store.scheduleMap[dateStr(d)]
}

function isToday(d: number) {
  return dateStr(d) === store.TODAY
}
function changeMonth(dir: number) {
  calMonth.value += dir
  // eslint-disable-next-line @stylistic/max-statements-per-line
  if (calMonth.value < 0) { calMonth.value = 11; calYear.value-- }
  // eslint-disable-next-line @stylistic/max-statements-per-line
  if (calMonth.value > 11) { calMonth.value = 0; calYear.value++ }
}
function openModal(d: number) {
  if (!getSchedule(d)) return
  selectedDay.value = d
}

const modalTitle = computed(() => {
  if (!selectedDay.value) return ''
  const dt = new Date(dateStr(selectedDay.value) + 'T00:00:00')
  return `${DAYS_ID[dt.getDay()]}, ${dt.getDate()} ${MONTHS_ID[dt.getMonth()]} ${dt.getFullYear()}`
})

const modalSub = computed(() => {
  if (!selectedDay.value) return ''
  const s = getSchedule(selectedDay.value)
  if (!s) return ''
  const leg = store.LEGEND.find(l => l.code === s.duty_type)
  return `${leg?.label || s.duty_type} • ${s.base_name} • ${s.count_schedules} penerbangan`
})
</script>

<style lang="scss">
.schedule {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;

  &__header {
    background: $navy;
    padding: 16px 20px;
    flex-shrink: 0;
  }

  &__month-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__month-name { color: #fff; font-size: 18px; font-weight: 800; }

  &__nav-btn {
    width: 36px; height: 36px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    border: none;
    cursor: pointer;
    @include flex-center;

    svg {
      width: 18px; height: 18px;
      stroke: #fff; fill: none;
      stroke-width: 2;
      stroke-linecap: round; stroke-linejoin: round;
    }
  }

  &__dow-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  &__dow-label {
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    color: rgba(255,255,255,0.5);
    padding: 4px 0;
  }

  &__content { padding: 8px 12px 16px; flex: 1; overflow-y: auto; }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
  }

  &__legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
  }
}

.cal-day {
  aspect-ratio: 1;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: opacity 0.15s;

  &--empty  { background: transparent !important; cursor: default; }
  &--today  { box-shadow: inset 0 0 0 2px rgba(255,255,255,0.7); }
  &:active  { opacity: 0.7; }

  &__num  { font-size: 12px; font-weight: 700; color: #fff; line-height: 1; }
  &__base { font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.75); margin-top: 2px; }

  &__badge {
    position: absolute;
    top: 4px; right: 4px;
    min-width: 14px; height: 14px;
    background: rgba(0,0,0,0.25);
    border-radius: 7px;
    font-size: 8px; font-weight: 700;
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    padding: 0 2px;
  }
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;

  &__dot { width: 8px; height: 8px; border-radius: 2px; }
  span { font-size: 10px; color: $text-secondary; font-weight: 500; }
}

// Modal
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(14,33,56,0.5);
  display: flex;
  align-items: flex-end;
  z-index: 50;
}

.modal-sheet {
  background: white;
  border-radius: 24px 24px 0 0;
  padding: 20px;
  width: 100%;
  position: relative;

  &__pill {
    width: 36px; height: 4px;
    background: $border;
    border-radius: 2px;
    margin: 0 auto 16px;
  }

  &__close {
    position: absolute;
    top: 16px; right: 16px;
    width: 32px; height: 32px;
    background: $bg;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    @include flex-center;
    font-size: 16px;
    color: $text-secondary;
  }

  &__title { font-size: 18px; font-weight: 800; color: $text-primary; margin-bottom: 4px; }
  &__sub   { font-size: 13px; color: $text-muted; }

  &__placeholder {
    margin-top: 20px;
    padding: 16px;
    background: $bg;
    border-radius: 12px;
    text-align: center;

    p { color: $text-secondary; font-size: 14px; }
  }
}

// Modal animation
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s; .modal-sheet { transition: transform 0.3s ease; } }
.modal-enter-from, .modal-leave-to      { opacity: 0; .modal-sheet { transform: translateY(100%); } }
</style>
