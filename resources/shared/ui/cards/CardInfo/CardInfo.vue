<template lang="pug">
    article.b-card-info(
        :class="classes"
    )
        .__header
            picture-component.__image(
                v-if="isWithImage"
                :src="image"
                fallbackExt="jpg"
                alt="background"
            )
        bullet-component.__icon(
            :icon="icon"
        )
        .__content
            title-component.__title(
                size="s"
             ) {{title}}
            .__description {{description}}
</template>

<script lang="ts">
import {Component, Inject, Prop, Vue} from 'vue-property-decorator'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import {DirectionPropsType, IconName} from '@/shared/types/helpers'

export type CardInfoProps = {
    icon: IconName
    title: string
    description: string
    image?: string
    direction?: DirectionPropsType
}
@Component
export default class CardInfo extends Vue {
    @Prop() icon!: CardInfoProps['icon']
    @Prop() title!: CardInfoProps['title']
    @Prop() description!: CardInfoProps['description']
    @Prop({default: 'column'}) direction!: CardInfoProps['direction']
    @Prop() image?: CardInfoProps['image']

    @Inject('$device') $device!: DeviceProviderValue

    get isMobile() {
        return this.$device.size.maxMobileLate
    }

    get isWithImage() {
        return this.image && this.isMobile && this.direction === 'column'
    }

    get classes() {
        const classes: string[] = []

        if (this.isWithImage) {
            classes.push('with-image')
        }

        if (this.direction === 'row') {
            classes.push('is-row')
        }

        return classes
    }

}
</script>
