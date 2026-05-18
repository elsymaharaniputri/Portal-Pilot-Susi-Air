<!-- components/HoursCard.vue -->
<template>
  <div class="card">
    <div class="card__header">
      <span class="card__title"
        ><Timer :size="18" :stroke-width="2" /> Hours to Limit</span
      >
    </div>
    <div class="hours-grid">
      <div v-for="card in hoursCards" :key="card.label" class="hour-card">
        <div class="hour-card__label">
          {{ card.label }}
        </div>
        <div class="hour-card__value">
          {{ card.value.toFixed(1) }} <span>hrs</span>
        </div>
        <div class="hour-card__limit">Limit: {{ card.limit }} hrs</div>
        <div class="hour-card__bar">
          <div
            class="hour-card__fill"
            :class="fillClass(card.value, card.limit)"
            :style="{
              width: Math.min(100, (card.value / card.limit) * 100) + '%',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFlightStore } from "../stores/flight";
import { Timer } from "lucide-vue-next";

const store = useFlightStore();

const hoursCards = computed(() => [
  { label: "DAILY", value: store.hoursDaily, limit: store.LIMITS.daily },
  { label: "WEEKLY", value: store.hoursWeekly, limit: store.LIMITS.weekly },
  { label: "MONTHLY", value: store.hoursMonthly, limit: store.LIMITS.monthly },
  { label: "ANNUAL", value: store.hoursAnnual, limit: store.LIMITS.annual },
]);

function fillClass(value: number, limit: number) {
  const pct = (value / limit) * 100;
  if (pct >= 100) return "hour-card__fill--over";
  if (pct >= 80) return "hour-card__fill--warn";
  return "hour-card__fill--ok";
}
</script>

<style lang="scss">
.hours-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 14px;
}

.hour-card {
  background: $bg;
  border-radius: 12px;
  padding: 12px 14px;

  &__label {
    font-size: 10px;
    font-weight: 700;
    color: $text-muted;
    letter-spacing: 0.3px;
    margin-bottom: 6px;
    text-transform: uppercase;
  }
  &__value {
    font-size: 18px;
    font-weight: 800;
    color: $text-primary;
    margin-bottom: 6px;
    span {
      font-size: 12px;
      color: $text-muted;
    }
  }
  &__limit {
    font-size: 11px;
    color: $text-muted;
    margin-bottom: 6px;
  }

  &__bar {
    height: 5px;
    background: rgba($text-primary, 0.08);
    border-radius: 3px;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.6s ease;
    &--ok {
      background: $success;
    }
    &--warn {
      background: $warning;
    }
    &--over {
      background: $danger;
    }
  }
}
</style>
