<template>
    <div :class="$style.index">
        <div :class="$style.title">근처 전시를 탐색해보세요</div>
        <div :class="$style.subtitle">
            지도를 통해 가까운 전시회 정보를 확인할 수 있어요.
        </div>

        <KakaoMap :class="$style.map" />
    </div>
</template>

<script lang="ts" setup>
useHead({
    title: "아트로드 - 전시 탐색",
    meta: [
        {
            name: "description",
            content: "전시회 정보를 지도로 탐색하세요.",
        },
    ],
});
</script>

<style lang="scss" module>
.index {
    padding: 16px;

    > .title {
        font-size: 30px;
        font-weight: bold;

        color: var(--title-color);

        margin-bottom: 16px;
    }

    > .subtitle {
        color: var(--subtitle-color);

        margin-bottom: 24px;
    }
}
</style>
