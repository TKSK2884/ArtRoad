<template>
    <div :class="$style.index">
        <div :class="$style.title">근처 전시를 탐색해보세요</div>
        <div :class="$style.subtitle">
            지도를 통해 가까운 전시회 정보를 확인할 수 있어요.
        </div>

        <div :class="$style.layout">
            <KakaoMap
                :class="$style.map"
                :exhibitions="ongoingExhibitions"
                :selected="selectedExhibition"
                :center="myCenter"
                @bounds="onBounds"
                @select="selectedExhibition = $event"
            />

            <ExhibitionList
                :class="$style.list"
                :exhibitions="visibleExhibitions"
                :selected="selectedExhibition"
                @click="handleClickItem"
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

<script setup lang="ts">
import type { Bounds, Exhibition } from "~/structure/type";

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
const selectedExhibition: Ref<Exhibition | null> = ref(null);

const mapBounds: Ref<Bounds | null> = ref(null);
const ignoreBoundsOnce: Ref<boolean> = ref(false);

const onBounds = (b: Bounds) => {
    if (ignoreBoundsOnce.value) {
        ignoreBoundsOnce.value = false;
        return;
    }

    mapBounds.value = b;
};

const inBounds = (ex: Exhibition, b: NonNullable<typeof mapBounds.value>) => {
    if (ex.latitude == null || ex.longitude == null) return false;

    console.log(b);

    return (
        ex.latitude >= b.sw.lat &&
        ex.latitude <= b.ne.lat &&
        ex.longitude >= b.sw.lng &&
        ex.longitude <= b.ne.lng
    );
};

// 필터링된 전시회 목록
const ongoingExhibitions = computed(() =>
    exhibitions.value.filter((exhibition) =>
        isOngoing(exhibition.start_date, exhibition.end_date)
    )
);

const visibleExhibitions = computed(() => {
    const list = ongoingExhibitions.value;

    const b = mapBounds.value;
    if (!b) return list;

    const base: Exhibition[] = list.filter((ex) => inBounds(ex, b));
    const select: Exhibition | null = selectedExhibition.value;

    if (select && !base.some((x) => x.id === select.id)) {
        return [select, ...base];
    }

    return base;
});

const handleClickItem = (item: Exhibition | null) => {
    if (selectedExhibition.value == item) {
        selectedExhibition.value = null;
        return;
    }

    // 다음 bounds 이벤트 1회는 무시하도록 설정
    ignoreBoundsOnce.value = true;

    selectedExhibition.value = item;
};

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

            @include mobile {
                max-height: 300px;
            }
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

        :global(.v-btn__overlay),
        :global(.v-btn__underlay) {
            opacity: 0 !important;
        }

        @include mobile {
            position: fixed;
            bottom: 20px;
            right: 20px;

            z-index: 5;
        }
    }
}
</style>
