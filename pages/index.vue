<template>
    <div :class="$style.index">
        <div :class="$style.title">근처 전시를 탐색해보세요</div>
        <div :class="$style.subtitle">
            지도를 통해 가까운 전시회 정보를 확인할 수 있어요.
        </div>

        <KakaoMap :class="$style.map" :center="myCenter" />
        <v-btn @click="centerToMe" variant="elevated"> 📍 내 위치 </v-btn>

        <!-- Snackbar -->
        <v-snackbar v-model="showSnackbar" color="warning" timeout="4000">
            위치 정보를 가져올 수 없어 서울시청 좌표로 이동했습니다.
            <template #actions>
                <v-btn
                    color="white"
                    variant="text"
                    @click="showSnackbar = false"
                >
                    닫기
                </v-btn>
            </template>
        </v-snackbar>
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
    navigator.geolocation.getCurrentPosition(
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
