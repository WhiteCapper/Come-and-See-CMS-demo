export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      strapi: {
        url: process.env.STRAPI_URL || 'http://localhost:1337'
      }
    }
  }
})
