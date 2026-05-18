pages/index.vue
<template>
  <div class="signin">
    <div class="signin__logo">
      <div class="signin__plane">
        <img src="/public/logo/susiair-logo.png" alt="logo" />
      </div>
      <h1>Pilot Portal</h1>
      <p>PT ASI Pudjiastuti Aviation</p>
    </div>

    <div class="signin__card">
      <label class="signin__label">USERNAME</label>
      <input
        v-model="username"
        class="signin__input"
        type="text"
        placeholder="Enter your username"
      />
      <label class="signin__label">PASSWORD</label>
      <input
        v-model="password"
        class="signin__input"
        type="password"
        placeholder="••••••••"
      />
      <button class="signin__btn" @click="handleSignIn">SIGN IN</button>
    </div>

    <p class="signin__help">Need help? <a href="#">Contact CRD</a></p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

definePageMeta({ layout: "default" });

const username = ref("");
const password = ref("");
const router = useRouter();

function handleSignIn() {
  if (!username.value || !password.value) {
    alert("Please enter both username and password!");
    return;
  }
  // simpan username ke store atau localStorage
  localStorage.setItem("pilot_username", username.value);
  router.push("/home");
}
</script>

<style lang="scss">
.signin {
  background: $navy;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 32px 48px;

  &__logo {
    margin-bottom: 32px;
    text-align: center;

    h1 {
      color: #fff;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    p {
      color: rgba(255, 255, 255, 0.55);
      font-size: 13px;
      margin-top: 4px;
    }
  }

  &__plane {
    width: 92px;
    height: 62px;
    margin: 0 auto 16px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #fff;
      border-radius: 5px;
      padding: 8px;
    }
  }

  &__card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 28px 24px;
    width: 100%;
  }

  &__label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
    display: block;
  }

  &__input {
    width: 100%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    padding: 14px 16px;
    color: #fff;
    font-family: inherit;
    font-size: 15px;
    outline: none;
    margin-bottom: 20px;
    transition: border-color 0.2s;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
    &:focus {
      border-color: $chart-blue;
    }
  }

  &__btn {
    width: 100%;

    background: $red;
    color: #fff;

    border: 2px solid $red;
    border-radius: 24px;

    padding: 16px;

    font-family: inherit;
    font-size: 16px;
    font-weight: 700;

    letter-spacing: 0.3px;

    cursor: pointer;

    transition:
      background 0.25s ease,
      color 0.25s ease,
      transform 0.18s ease;

    /* Hover desktop */
    &:hover {
      transform: translateY(-2px);
    }

    /* Tap mobile */
    &:active {
      transform: scale(0.97);
    }
  }

  &__help {
    text-align: center;
    margin-top: 20px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 13px;

    a {
      color: $chart-blue;
      text-decoration: none;
    }
  }
}
</style>
