<template>
  <Transition name="splash-fade">
    <div v-if="visible" class="splash-screen">
      <!-- Background decoration -->
      <div class="splash-screen__circles" />

      <!-- Content -->
      <div class="splash-card">
        <div class="splash-card__logo">
          <img src="/logo/susiair-logo.png" alt="Susi Air" />
        </div>

        <h1 class="splash-card__title">Welcome Back</h1>

        <p class="splash-card__subtitle">
          Monitor your flight schedules, operational hours, and aviation
          activities in one place.
        </p>

        <!-- Loading -->
        <div class="splash-card__loading">
          <span />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits(["done"]);

const visible = ref(true);

onMounted(() => {
  setTimeout(() => {
    visible.value = false;

    setTimeout(() => {
      emit("done");
      navigateTo("/");
    }, 500);
  }, 3000);
});
</script>

<style lang="scss">
.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  background: #ffffff;

  padding: 24px;

  &__circles {
    position: absolute;
    inset: 0;

    background:
      radial-gradient(
        circle at top left,
        rgba(24, 59, 99, 0.06),
        transparent 28%
      ),
      radial-gradient(
        circle at bottom right,
        rgba(24, 59, 99, 0.05),
        transparent 24%
      );
  }
}

.splash-card {
  position: relative;
  z-index: 2;

  width: 100%;
  max-width: 360px;
  min-height: 640px;

  border-radius: 34px;

  padding: 56px 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  background: linear-gradient(180deg, #183b63 0%, #0e2138 100%);

  border: 1px solid rgba(255, 255, 255, 0.05);

  box-shadow:
    0 30px 70px rgba(14, 33, 56, 0.2),
    0 12px 30px rgba(14, 33, 56, 0.1);

  overflow: hidden;

  @media (max-width: 480px) {
    min-height: 100vh;
    max-width: 100%;
    border-radius: 0;

    padding: 48px 24px;
  }

  /* Decorative glow */
  &::before {
    content: "";

    position: absolute;
    top: -120px;
    right: -80px;

    width: 240px;
    height: 240px;

    border-radius: 50%;

    background: radial-gradient(rgba(255, 255, 255, 0.1), transparent 70%);

    pointer-events: none;
  }

  &__logo {
    width: 112px;
    height: 112px;

    border-radius: 24px;

    background: white;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 18px;

    margin-bottom: 36px;

    box-shadow: 0 14px 30px rgba(255, 255, 255, 0.12);

    animation: float 3s ease-in-out infinite;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__title {
    margin: 0 0 14px;

    color: white;

    font-size: 32px;
    font-weight: 800;

    line-height: 1.15;

    letter-spacing: -0.8px;

    @media (max-width: 480px) {
      font-size: 28px;
    }
  }

  &__subtitle {
    margin: 0;

    color: rgba(255, 255, 255, 0.72);

    font-size: 14px;
    line-height: 1.8;

    max-width: 280px;

    font-weight: 400;
  }

  &__loading {
    width: 120px;
    height: 4px;

    margin-top: 42px;

    border-radius: 999px;

    overflow: hidden;

    background: rgba(255, 255, 255, 0.12);

    span {
      display: block;

      width: 42%;
      height: 100%;

      border-radius: inherit;

      background: white;

      animation: loading 1.5s infinite ease-in-out;
    }
  }
}

/* Fade Animation */
.splash-fade-enter-active,
.splash-fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.splash-fade-enter-from,
.splash-fade-leave-to {
  opacity: 0;
  transform: scale(1.03);
}

/* Floating logo */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* Loading bar */
@keyframes loading {
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(320%);
  }
}
</style>
