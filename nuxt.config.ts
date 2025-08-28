// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },

    runtimeConfig: {
        public: {
            origin: process.env.VUE_APP_ORIGIN,
            apiBase: process.env.VUE_APP_API_URL || "http://localhost:8567",
        },
    },

    devServer: {
        host: "0.0.0.0",
        port: 3000,
    },

    app: {
        head: {
            title: "ArtRoad",
            meta: [{ name: "description", content: "전시회 정보 아트로드" }],
            script: [
                {
                    src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY}&autoload=false`,
                    defer: true,
                },
            ],
        },
    },

    build: {
        transpile: ["vuetify"],
    },

    modules: [
        "@pinia/nuxt",
        (_options, nuxt) => {
            nuxt.hooks.hook("vite:extendConfig", (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }));
            });
        },
    ],

    css: ["~/assets/css/main.css", "~/assets/css/theme.css"],

    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
});
