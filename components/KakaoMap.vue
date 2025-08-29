<template>
    <div :class="$style.mapwrap">
        <div :class="$style.map" ref="mapEl" />
        <div :class="$style.control">
            <span @click="zoomIn()"
                ><img
                    src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
                    alt="확대"
            /></span>
            <span @click="zoomOut()"
                ><img
                    src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
                    alt="축소"
            /></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { loadKakaoMap } from "@/utils/loadKakaoMap";
import { format } from "date-fns";
import type { Exhibition } from "~/structure/type";

const props = defineProps<{
    exhibitions: Exhibition[];
    selected?: Exhibition | null;
    center?: { lat: number; lng: number } | null;
}>();

const emit = defineEmits<{
    (e: "select", item: Exhibition): void;
}>();

const mapEl: Ref<HTMLDivElement | null> = ref(null);

let map: any = null;
let activeInfoWindow: { close: () => void } | null = null;

onMounted(async () => {
    await loadKakaoMap();

    map = new window.kakao.maps.Map(mapEl.value, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 5,
    });

    props.exhibitions.forEach((item: Exhibition) => {
        if (item.start_date && item.end_date) {
            const now = convertKoreaTime(new Date(), "day");

            const start = new Date(item.start_date);
            const end = new Date(item.end_date);

            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            const isOngoing = now >= start && now <= end;

            if (!isOngoing) {
                return;
            }
        }

        const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(
                Number(item.latitude),
                Number(item.longitude)
            ),
        });

        const infowindow = new window.kakao.maps.InfoWindow({
            content: `
            <div class="infowindow">
                <button onclick="window.closeInfowindow()"
                    style="
                    position: absolute;
                    top: 6px;
                    right: 8px;
                    background: #eee;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    padding: 2px 6px;
                    cursor: pointer;
                    "
                >X</button>
            <div class="title" style="margin-right:24px;">
                ${item.title}
            </div>
            <img src="${
                item.image_url
            }" style="width:100%; border-radius:6px; margin-bottom:8px;" />
            <div style="margin-bottom:4px;">
                <span>
                    🗓 ${format(
                        new Date(item.start_date),
                        "yyyy-MM-dd"
                    )} ~ ${format(new Date(item.end_date), "yyyy-MM-dd")}
                </span>
            </div>
            <div style="color:#666;">📍 ${item.place}</div>
            </div>
            `,
        });

        window.closeInfowindow = () => {
            if (activeInfoWindow) {
                activeInfoWindow.close();
                activeInfoWindow = null;
            }
        };

        window.kakao.maps.event.addListener(marker, "click", () => {
            if (activeInfoWindow) {
                activeInfoWindow.close();
            }

            infowindow.open(map, marker);
            activeInfoWindow = infowindow;

            emit("select", item);
        });
    });
});

const zoomIn = () => {
    if (!map) return;

    map.setLevel(map.getLevel() - 1);
};

const zoomOut = () => {
    if (!map) return;

    map.setLevel(map.getLevel() + 1);
};

watch(
    () => props.center,
    (n) => {
        if (n == null) return;

        map.setCenter(new window.kakao.maps.LatLng(n.lat, n.lng));
    }
);
</script>

<style lang="scss" module>
.mapwrap {
    position: relative;

    > .map {
        width: 100%;
        height: 500px;
        background: var(--map-bg);
        border-radius: 12px;

        :global(.infowindow) {
            width: 240px;
            font-size: 14px;
            padding: 6px;
            border-radius: 8px;
            color: var(--infowindow-text);

            :global(.title) {
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 6px;
            }
        }
    }

    > .control {
        width: 36px;
        height: 80px;
        background-color: var(--control-bg);
        position: absolute;
        top: 50px;
        right: 10px;
        z-index: 1;
        overflow: hidden;
        border-radius: 8px;

        > span {
            width: 36px;
            height: 40px;
            text-align: center;
            display: block;
            cursor: pointer;

            > img {
                width: 15px;
                height: 15px;
                margin-block: 12px;
                border: none;
            }
        }

        > span:first-child {
            border-bottom: 1px solid var(--control-border);
        }
    }
}
</style>
