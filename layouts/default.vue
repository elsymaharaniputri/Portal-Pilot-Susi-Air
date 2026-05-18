<template>
  <div id="phone">
    <!-- Status Bar -->
    <div class="status-bar">
      <span>{{ currentTime }}</span>
      <div class="status-bar__icons">
        <Signal :size="16" :stroke-width="2" />

        <Wifi :size="16" :stroke-width="2" />

        <BatteryFull :size="18" :stroke-width="2" />
      </div>
    </div>

    <!-- Page Content -->
    <main class="page-content">
      <slot />
    </main>

    <!-- Bottom Navigation (hidden on sign-in) -->
    <BottomNav v-if="showNav" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useClock } from "../composables/useClock";
import { Signal, BatteryFull, Wifi } from "lucide-vue-next";
defineOptions({ name: "DefaultLayout" });

const route = useRoute();

const showNav = computed(() => route.path !== "/");

const { currentTime } = useClock();
</script>

<style lang="scss" scoped>
.status-bar {
  &__icons {
    display: flex;
    gap: 6px;
    align-items: center;
  }
}

.page-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
</style>
