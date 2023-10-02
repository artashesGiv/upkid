<template lang="pug">

article.b-banner
    .__text
        title-component(
            tag="h1"
            size="l"
        ) {{ title }}
        p {{ description }}
    .__wrapper
        button-component.__button(
            size="m"
            @click="clickEmit"
            :ariaLabel="buttonText"
        ) {{ buttonText }}
        image-component.__decoration(
            v-if="$device.size.tabletLate"
            src="/images/decoration/highlight/brand.svg"
        )

</template>

<script lang="ts">
import {Component, Emit, Inject, Prop, Vue} from 'vue-property-decorator'
import {DeviceProviderValue} from "@/shared/lib/providers/device";

export type BannerProps = {
    title: string
    description: string
    buttonText: string
}

@Component
export default class Banner extends Vue {
    @Prop() readonly title!: BannerProps['title']
    @Prop() readonly description!: BannerProps['description']
    @Prop() readonly buttonText!: BannerProps['buttonText']

    @Emit('click')
    clickEmit() {
        //
    }

    @Inject('$device') $device!: DeviceProviderValue
}
</script>
