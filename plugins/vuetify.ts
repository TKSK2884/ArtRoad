import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

// Pinia 스토어
import { useThemeStore } from "~/stores/theme";

export default defineNuxtPlugin((app) => {
    const themeStore = useThemeStore();

    const vuetify = createVuetify({
        theme: {
            defaultTheme: themeStore.isDark ? "dark" : "light",
            themes: {
                light: {
                    dark: false,
                    colors: {
                        background: "rgb(var(--v-theme-background))",
                    },
                },
                dark: {
                    dark: true,
                    colors: {
                        background: "rgb(var(--v-theme-background))",
                    },
                },
            },
        },
    });
    app.vueApp.use(vuetify);
});
