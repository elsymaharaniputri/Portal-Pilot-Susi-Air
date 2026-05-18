<template>
  <div class="error-screen">
    <!-- Background decoration -->
    <div class="error-screen__circles" />

    <!-- Content Card -->
    <div class="error-card">
      <!-- Icon/Logo Container -->
      <div class="error-card__logo">
        <!-- SVG Warning/Connection Icon -->
        <svg
          xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#183b63"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-full h-full"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      <!-- Error Badge -->
      <span class="error-card__badge"
        >Error {{ error?.statusCode || "404" }}</span
      >

      <!-- Title -->
      <h1 class="error-card__title">
        {{
          error?.statusCode === 404 ? "Page Not Found" : "Something Went Wrong"
        }}
      </h1>

      <!-- Subtitle -->
      <p class="error-card__subtitle">
        {{
          error?.statusCode === 404
            ? "We couldn't find the page you were looking for. It might have been moved or doesn't exist."
            : error?.message ||
              "An unexpected error occurred on our systems. Please try again later."
        }}
      </p>

      <!-- Action Button -->
      <button @click="handleClearError" class="error-card__button">
        Go Back Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const handleClearError = () => {
  clearError({ redirect: "/" });
};
</script>

<style scoped>
.error-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #ffffff;
  padding: 24px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
}

.error-screen__circles {
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

.error-card {
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
}

@media (max-width: 480px) {
  .error-card {
    min-height: 100vh;
    max-width: 100%;
    border-radius: 0;
    padding: 48px 24px;
  }
}

/* Decorative glow */
.error-card::before {
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

.error-card__logo {
  width: 112px;
  height: 112px;
  border-radius: 24px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 14px 30px rgba(255, 255, 255, 0.12);
  animation: float 3s ease-in-out infinite;
}

.error-card__badge {
  color: #38bdf8;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.error-card__title {
  margin: 0 0 14px;
  color: white;
  font-size: 32px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.8px;
}

@media (max-width: 480px) {
  .error-card__title {
    font-size: 28px;
  }
}

.error-card__subtitle {
  margin: 0 0 36px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
  line-height: 1.8;
  max-width: 280px;
  font-weight: 400;
}

.error-card__button {
  width: 100%;
  max-width: 200px;
  padding: 14px 28px;
  border-radius: 14px;
  border: none;
  background: #ffffff;
  color: #183b63;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.error-card__button:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.error-card__button:active {
  transform: translateY(0);
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
</style>
