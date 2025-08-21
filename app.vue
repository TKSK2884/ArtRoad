<template>
    <div>
        <NuxtLayout>
            <v-app>
                <NuxtPage />
            </v-app>
        </NuxtLayout>
    </div>
</template>

<script setup>
const themeStore = useThemeStore();

useHead(() => ({
    htmlAttrs: {
        "data-theme": themeStore.isDark ? "dark" : "light",
        class: themeStore.isDark ? "dark" : undefined,
    },
}));
</script>
