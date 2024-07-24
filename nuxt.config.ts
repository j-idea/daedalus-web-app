// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  debug: false,
  features: { devLogs: true },

  nitro: {
    experimental: {
      websocket: true,
    },
  },

  modules: [
    // https://nuxt.com/docs/getting-started/styling#font-advanced-optimization
    "@nuxtjs/fontaine",
    "@pinia/nuxt",
    // https://nuxt.com/docs/getting-started/testing#setup
    "@nuxt/test-utils/module",
    "@nuxt/eslint",
    "@nuxtjs/i18n",
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;', // Enables variables to be accessible in SFC styles. https://nuxt.com/docs/getting-started/styling#using-preprocessors
          quietDeps: true,
        },
      },
    },
  },

  eslint: {
    config: {
      standalone: false, // https://github.com/antfu/eslint-config/issues/506#issuecomment-2173283141
    },
  },

  i18n: {
    strategy: "prefix_except_default",
    locales: ["en"],
    defaultLocale: "en",
  },
});
