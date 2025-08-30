<template>
    <div :class="$style.list">
        <div
            v-for="item in exhibitions"
            :key="item.id"
            :class="[
                $style.card,
                { [$style.active]: selected?.id === item.id },
            ]"
            @click="$emit('click', item)"
        >
            <img
                :src="item.image_url"
                :alt="item.title"
                :class="$style.thumb"
            />
            <div :class="$style.info">
                <div :class="$style.title">{{ item.title }}</div>
                <div :class="$style.place">{{ item.place }}</div>
                <div :class="$style.date">
                    {{ format(new Date(item.start_date), "yyyy-MM-dd") }} ~
                    {{ format(new Date(item.end_date), "yyyy-MM-dd") }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import type { Exhibition } from "~/structure/type";

const props = defineProps<{
    exhibitions: Exhibition[];
    selected?: Exhibition | null;
}>();

const emit = defineEmits<{
    (e: "click", item: Exhibition): void;
}>();
</script>

<style lang="scss" module>
.list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 500px;
    overflow-y: auto;
    padding: 8px;

    > .card {
        display: flex;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 8px;
        cursor: pointer;
        background: #fff;
        transition: box-shadow 0.2s ease;

        &:hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        &.active {
            background-color: #f6faff;
            border-color: var(--primary-color);
        }

        > .thumb {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 6px;
            margin-right: 12px;
        }

        .info {
            flex: 1;
            display: flex;
            flex-direction: column;

            > .title {
                font-size: 16px;

                margin-inline: 4px;
            }

            > .place,
            > .date {
                font-size: 14px;
                color: #666;

                margin-block: 2px;
            }
        }
    }
}
</style>
