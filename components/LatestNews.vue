<template>
  <div class="card news-section">
    <div class="card__header">
      <span class="card__title">
        <Megaphone :size="18" :stroke-width="2" /> Latest News</span
      >
    </div>

    <div class="news-scroll">
      <div v-for="item in news" :key="item.title" class="news-card">
        <span class="news-card__tag">
          {{ item.tag }}
        </span>

        <h4 class="news-card__title">
          {{ item.title }}
        </h4>

        <p class="news-card__desc">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Megaphone } from "lucide-vue-next";
const news = [
  {
    tag: "Safety",
    title: "New Flight Regulation",
    description: "Updated operational guidelines effective this month.",
  },
  {
    tag: "Weather",
    title: "Heavy Rain Alert",
    description: "Potential delays expected in western regions.",
  },
  {
    tag: "Training",
    title: "Recurrent Training",
    description: "Annual simulator training schedule updated.",
  },
];
</script>

<style scoped lang="scss">
.news-section {
  margin-top: 16px;
}

.section-header {
  margin-bottom: 12px;

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
  }
}

.news-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.news-card {
  min-width: 200px;
  padding: 14px;
  border-radius: 14px;
  background: #183b63;
  color: white;
  flex-shrink: 0;

  &__tag {
    font-size: 10px;
    opacity: 0.8;
  }

  &__title {
    margin: 8px 0 6px;
    font-size: 14px;
    font-weight: 700;
  }

  &__desc {
    margin: 0;
    font-size: 11px;
    font-weight: normal;
    opacity: 0.8;
  }
}
</style>
