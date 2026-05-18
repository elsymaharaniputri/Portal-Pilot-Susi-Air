// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/styles/main.scss"],

  experimental: {
    appManifest: false,
  },

  compatibilityDate: "2024-01-01",

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '~/assets/styles/_variables.scss' as *;`,
        },
      },
    },
  },

  app: {
    head: {
      title: "Portal Pilot",
      meta: [{ name: "description", content: "Portal Pilot Apps Susi Air" }],
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/logo/icon2.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/logo/apple-touch-icon.png",
        },
      ],
    },
  },
});
