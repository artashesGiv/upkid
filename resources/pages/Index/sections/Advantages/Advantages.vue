<template lang="pug">
    section-layout-component.b-advantages(
        :title="$content.advantages.title"
        :is-title-decoration="true"
        id="about"
    )
        .__grid(
            v-if="!showSwiper"
        )
            card-info-component.__item(
                :icon="firstCard.icon"
                :title="firstCard.title"
                :description="firstCard.description"
            )
            .__item
                picture-component(
                    src="/images/advantages/1"
                    fallbackExt="jpg"
                    alt="decoration"
                )
            .__item
                picture-component(
                    src="/images/advantages/2"
                    fallbackExt="jpg"
                    alt="decoration"
                )
            card-info-component.__item(
                v-for="(card, index) in otherCards"
                :key="index"
                :icon="card.icon"
                :title="card.title"
                :description="card.description"
            )
            .__item
                picture-component(
                    src="/images/advantages/3"
                    fallbackExt="jpg"
                    alt="decoration"
                )
        snap-scroll-component(
            v-else
        )
            card-info-component.__item(
                v-for="(card, index) in sectionContent.list"
                :key="index"
                :image="card.image"
                :icon="card.icon"
                :title="card.title"
                :description="card.description"
            )
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator'

import {CardInfo} from '@/shared/ui/cards/CardInfo'
import {CardInfoProps} from '@/shared/ui/cards/CardInfo/CardInfo.vue'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import {SpanScroll} from "@/shared/ui/SpanScroll";
import {LanguageContent} from "@/shared/api/types";

@Component({
    components: {
        'card-info-component': CardInfo,
        'snap-scroll-component': SpanScroll,
    },
})
export default class Advantages extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    get sectionContent(): LanguageContent['advantages'] {
        return this.$content.advantages
    }

    get firstCard(): CardInfoProps {
        return this.sectionContent.list[0]
    }

    get otherCards(): CardInfoProps[] {
        return this.sectionContent.list.slice(1, 4)
    }

    get showSwiper(): boolean {
        return this.$device.size.maxMobileLate
    }
}
</script>
