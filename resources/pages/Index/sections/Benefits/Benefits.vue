<template lang="pug">
    section-layout-component.b-benefits(
        :title="sectionContent.title"
    )
        .__list
            card-info-component.__card(
                v-for="card in sectionContent.list"
                :key="card.icon"
                :direction="direction"
                :icon="card.icon"
                :title="card.title"
                :description="card.description"
            )
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator'

import CardInfo from '@/shared/ui/cards/CardInfo/CardInfo.vue'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import {LanguageContent} from "@/shared/api/types";

@Component({
    components: {
        'card-info-component': CardInfo,
    },
})
export default class Benefits extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    get sectionContent(): LanguageContent['benefits'] {
        return this.$content.benefits
    }

    get direction() {
        return this.$device.size.desktop ? 'column' : 'row'
    }
}
</script>
