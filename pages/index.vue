<template>
    <div :class="$style.index">
        <div :class="$style.title">근처 전시를 탐색해보세요</div>
        <div :class="$style.subtitle">
            지도를 통해 가까운 전시회 정보를 확인할 수 있어요.
        </div>

        <div :class="$style.layout">
            <KakaoMap
                :class="$style.map"
                :exhibitions="exhibitions"
                :selected="selectedExhibition"
                :center="myCenter"
                @select="selectedExhibition = $event"
            />

            <ExhibitionList
                :class="$style.list"
                :exhibitions="exhibitions"
                @click-item="selectedExhibition = $event"
            />
        </div>

        <v-btn :class="$style.location" @click="centerToMe" icon elevation="6">
            <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>

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
import type { Exhibition } from "~/structure/type";

useHead({
    title: "아트로드 - 전시 탐색",
    meta: [
        {
            name: "description",
            content: "전시회 정보를 지도로 탐색하세요.",
        },
    ],
});

const config = useRuntimeConfig();

const myCenter: Ref<{ lat: number; lng: number } | null> = ref(null);
const showSnackbar: Ref<boolean> = ref(false);

const {
    data: res,
    pending,
    error,
} = useFetch<{ success: boolean; data: Exhibition[] }>("/api/exhibitions", {
    baseURL: config.public.apiBase,
    default: () => ({ success: false, data: [] }),
});

const exhibitions: Ref<Exhibition[]> = computed(() => res.value?.data ?? []);
const selectedExhibition = ref<Exhibition | null>(null);

const centerToMe = () => {
    // 위치 정보 받아오기
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            myCenter.value = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            };
        },
        (err) => {
            console.error("[geo] error:", err);
            // fallback (예: 서울시청 좌표)
            myCenter.value = { lat: 37.5665, lng: 126.978 };
            showSnackbar.value = true; // 스낵바 표시
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
};
</script>

<style lang="scss" module>
@use "@/assets/scss/mixins.scss" as *;

.index {
    padding: 16px;

    > .title {
        font-size: 30px;
        font-weight: bold;

        color: var(--title-color);

        margin-bottom: 8px;
    }

    > .subtitle {
        color: var(--subtitle-color);

        margin-bottom: 12px;
    }

    > .layout {
        display: flex;
        gap: 16px;

        margin-bottom: 16px;

        @include mobile {
            flex-direction: column;
        }

        > .map {
            flex: 2;
        }

        > .list {
            flex: 1;
            max-height: 500px;
            overflow-x: auto;
        }

        > .map,
        > .list {
            @include mobile {
                width: 100%;
            }
        }
    }

    > .location {
        position: static;

        @include mobile {
            position: fixed;
            bottom: 20px;
            right: 20px;
        }
    }
}
</style>
