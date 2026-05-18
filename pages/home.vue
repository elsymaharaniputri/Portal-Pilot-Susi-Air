<!-- pages/home.vue -->
<template>
  <div class="home">
    <!-- Header -->
    <div class="home__header">
      <div class="home__header-top">
        <div class="home__pilot">
          <div class="home__avatar">
            {{ pilotInitials }}
          </div>
          <div>
            <div class="home__pilot-label">Welcome Back!</div>
            <div class="home__pilot-name">
              {{ pilotName }}
            </div>
          </div>
        </div>
        <BellDot :size="24" :stroke-width="1.5" color="#fff" />
      </div>
      <div class="home__hours-bar">
        <div>
          <div class="home__hours-label">Total Flight Hours</div>
          <div class="home__hours-value">{{ totalHours }} <span>hrs</span></div>
        </div>
        <div class="home__hours-date">
          <div>Updated</div>
          <div>15 May 2026</div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="home__content">
      <!-- Next Flight -->
      <div class="card">
        <div class="card__header">
          <span class="card__title">
            <Plane :size="18" :stroke-width="2" /> Upcoming Flights
          </span>
          <span class="card__link">See all →</span>
        </div>
        <div class="flight-card">
          <div class="flight-card__route">
            <div class="flight-card__airport">
              <span class="flight-card__code">PDG</span>
              <span class="flight-card__city">Padang</span>
              <span class="flight-card__time">07:00</span>
            </div>
            <div class="flight-card__arrow">
              <!-- <PlaneTakeoff :size="32" :stroke-width="1.5" color="white" /> -->
              <img src="/public/logo/iconTakeOff.png" alt="plane route" />
            </div>
            <div class="flight-card__airport flight-card__airport--right">
              <span class="flight-card__code">DJB</span>
              <span class="flight-card__city">Jambi</span>
              <span class="flight-card__time">08:30</span>
            </div>
          </div>

          <div class="flight-card__meta">
            <div>
              <div class="meta-label">DATE</div>
              <div class="meta-value">19 May 2026</div>
            </div>
            <div>
              <div class="meta-label">DUTY TYPE</div>
              <div class="meta-value">On Duty</div>
            </div>
            <div>
              <div class="meta-label">FLIGHTS</div>
              <div class="meta-value">2 flights</div>
            </div>
          </div>

          <div class="flight-card__status">
            <div class="flight-card__status-dot" />
            <span>Scheduled</span>
          </div>
        </div>
      </div>

      <!-- Flight Chart -->
      <LatestNews />

      <!-- Hours to Limit -->
      <HoursCard />

      <!-- Chart -->
      <FlightChart />

      <!-- Documents -->
      <DocsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFlightStore } from "../stores/flight";
import { BellDot, Plane, PlaneTakeoff } from "lucide-vue-next";

definePageMeta({ layout: "default" });
const store = useFlightStore();
// Panggil fetchDashboard saat halaman dimuat
onMounted(async () => {
  await store.fetchDashboard();
});

// Guard against null pilot and map store fields to the template names used below
const pilotName = computed(() => store.pilot?.name ?? "");
const pilotInitials = computed(() => {
  const name = store.pilot?.name ?? "";
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("") || "-"
  );
});
const totalHours = computed(() => store.pilot?.totalFlightHours ?? 0);
</script>

<style lang="scss">
.home {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &__header {
    background: $navy;
    padding: 16px 20px 24px;
    flex-shrink: 0;
  }

  &__header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__pilot {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: $red;
    @include flex-center;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    flex-shrink: 0;
  }

  &__pilot-label {
    color: rgba(255, 255, 255, 0.65);
    font-size: 12px;
    margin-bottom: 2px;
  }
  &__pilot-name {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }

  &__hours-bar {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__hours-label {
    color: rgba(255, 255, 255, 0.5);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }
  &__hours-value {
    color: #fff;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.5px;
    span {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.6;
    }
  }
  &__hours-date {
    text-align: right;
    div:first-child {
      color: rgba(255, 255, 255, 0.4);
      font-size: 11px;
    }
    div:last-child {
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      font-weight: 600;
    }
  }

  &__content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    padding-bottom: 24px;
  }
}

// Flight card
.flight-card {
  background: linear-gradient(135deg, $navy 0%, #1a3a5c 100%);
  border-radius: 12px;
  padding: 16px;

  &__route {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__airport {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    &--right {
      align-items: center;
    }
  }

  &__code {
    font-size: 26px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 1px;
  }

  &__city {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }

  &__time {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 2px;
  }

  &__arrow {
    display: flex;
    align-items: center;
    img {
      width: 150px;
      height: 90px;
      object-fit: contain;
      filter: invert(1);
    }
  }

  &__meta {
    display: flex;
    gap: 16px;

    .meta-label {
      color: rgba(255, 255, 255, 0.45);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.4px;
      margin-bottom: 2px;
    }
    .meta-value {
      color: #fff;
      font-size: 13px;
      font-weight: 600;
    }
  }

  &__status {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba($success, 0.2);
    border-radius: 20px;
    padding: 4px 10px;
    margin-top: 10px;

    span {
      color: $success;
      font-size: 11px;
      font-weight: 700;
    }
  }

  &__status-dot {
    width: 6px;
    height: 6px;
    background: $success;
    border-radius: 50%;
  }
}
</style>
