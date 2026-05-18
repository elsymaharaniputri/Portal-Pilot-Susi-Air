<!-- components/BottomNav.vue -->
<script setup>
import { Home, CalendarCheck2, BookOpen, Settings } from "lucide-vue-next";
</script>

<template>
  <nav class="bottom-nav">
    <NuxtLink to="/home" class="nav-item" active-class="nav-item--active">
      <Home :size="24" :stroke-width="1.5" />
      <span>Home</span>
    </NuxtLink>
    <NuxtLink to="/schedule" class="nav-item" active-class="nav-item--active">
      <CalendarCheck2 :size="24" :stroke-width="1.5" />
      <span>Schedule</span>
    </NuxtLink>
    <NuxtLink to="/logbook" class="nav-item" active-class="nav-item--active">
      <BookOpen :size="24" :stroke-width="1.5" />
      <span>Logbook</span>
    </NuxtLink>
    <NuxtLink to="/" class="nav-item" active-class="nav-item--active">
      <Settings :size="24" :stroke-width="1.5" />
      <span>More</span>
    </NuxtLink>
  </nav>
</template>

<style lang="scss">
.bottom-nav {
  height: 72px;
  background: $white;
  border-top: 1px solid $border;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-shrink: 0;
  padding: 0 8px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 12px;
  text-decoration: none;
  min-width: 60px;

  svg {
    width: 22px;
    height: 22px;
    stroke: $text-muted;
    fill: none;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 0.2s;
  }

  span {
    font-size: 10px;
    font-weight: 500;
    color: $text-muted;
    transition: color 0.2s;
  }

  &--active {
    svg {
      stroke: $red;
    }
    span {
      color: $red;
    }
  }
}
</style>
