import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", () => {
    const isDark = ref(false);

    const toggleDark = () => {
        isDark.value = !isDark.value;
    };

    return {
        isDark,
        toggleDark,
    };
});
