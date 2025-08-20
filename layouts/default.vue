<template>
    <div :class="$style.index">
        <div :class="$style.header">
            <div :class="$style.inner">
                <NuxtLink :class="$style.logo" to="/">
                    <div>🎨 ArtRoad</div>
                </NuxtLink>
                <!-- 상단 네비게이션 or 로그인 버튼 -->
                <div :class="$style.nav">
                    <div
                        :class="$style.themebutton"
                        @click="themeStore.toggleDark()"
                    >
                        {{ themeStore.isDark ? "☀️" : "🌙" }}
                    </div>
                </div>
            </div>
        </div>

        <div :class="$style.main">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore();
</script>

<style lang="scss" module>
.index {
    min-height: 100vh;
    background-color: var(--bg);
    color: var(--fg);

    > .header {
        position: sticky;
        top: 0;
        z-index: 50;

        background-color: var(--header-bg);
        border-bottom: 1px solid var(--header-border);
        box-shadow: var(--shadow-1);

        > .inner {
            max-width: var(--container-w);
            margin-inline: auto;
            padding: var(--space-1) var(--space-2);
            display: flex;
            justify-content: space-between;
            align-items: center;

            > .logo {
                font-size: var(--logo-size);
                font-weight: var(--logo-weight);
                color: var(--fg);
                text-decoration: none;

                user-select: none; /* 텍스트 하이라이트/드래그 금지 */
                -webkit-user-select: none; /* Safari */
            }

            > .nav > .themebutton {
                cursor: pointer;

                user-select: none;
                -webkit-user-select: none;
            }
        }
    }

    .main {
        max-width: var(--container-w);
        margin-inline: auto;
        padding: var(--space-3) var(--space-2);
    }
}
</style>
