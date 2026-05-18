<!-- components/DocsList.vue -->
<template>
  <div class="card" style="margin-bottom: 8px">
    <div class="card__header">
      <span class="card__title"
        ><FileText :size="18" :stroke-width="2" /> Document</span
      >
    </div>
    <div>
      <div v-for="doc in docsWithStatus" :key="doc.label" class="doc-row">
        <div>
          <div class="doc-row__name">
            {{ doc.label }}
          </div>
          <div class="doc-row__date">
            {{ doc.dateStr }}
          </div>
        </div>
        <div class="badge" :class="doc.badgeCls">
          {{ doc.badgeText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFlightStore } from "../stores/flight";
import { FileText } from "lucide-vue-next";

const store = useFlightStore();
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agt",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const docsWithStatus = computed(() =>
  store.documents.map((doc) => {
    const todayDate = new Date(store.TODAY + "T00:00:00");
    const expDate = new Date(doc.expiryDate + "T00:00:00");
    const days = Math.round(
      (expDate.getTime() - todayDate.getTime()) / 86400000,
    );
    const dateStr = `${expDate.getDate()} ${MONTHS[expDate.getMonth()]} ${expDate.getFullYear()}`;

    let badgeCls: string;
    let badgeText: string;

    if (days <= 0) {
      badgeCls = "badge--expired";
      badgeText = "Expired";
    } else if (days <= 30) {
      badgeCls = "badge--warn";
      badgeText = `${days} days`;
    } else {
      badgeCls = "badge--safe";
      badgeText = `${days} days`;
    }

    return { ...doc, dateStr, badgeCls, badgeText };
  }),
);
</script>

<style lang="scss">
.doc-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid $border;

  &:last-child {
    border-bottom: none;
  }
  &__name {
    font-size: 13px;
    font-weight: 600;
    color: $text-primary;
  }
  &__date {
    font-size: 11px;
    color: $text-muted;
    margin-top: 2px;
  }
}
</style>
