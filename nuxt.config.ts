// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },

    devServer: {
        host: "0.0.0.0",
        port: 3000,
    },

    app: {
        head: {
            script: [
                {
                    src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY}&autoload=false`,
                    defer: true,
                },
            ],
        },
    },

    modules: ["@pinia/nuxt"],

    css: ["~/assets/css/main.css", "~/assets/css/theme.css"],
});
