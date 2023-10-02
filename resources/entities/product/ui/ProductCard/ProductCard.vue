<template lang="pug">
    article.b-product-card
        .__decoration(
            :class="`product-card__decoration--${type}`"
        )
            image-component.__image.-line(
                :src="`/images/decoration/product/${type}/line.svg`"
                alt="Декорация"
            )
        picture-component.__image.-main(
            :src="`/images/decoration/product/${type}/main`"
            fallbackExt="png"
            alt="Декорация"
        )
        .__wrapper
            .__tags
                tag-component.__tag(
                    icon="mood-happy"
                ) {{ years }}
                //tag-component.__tag {{ classText }}
            .__text
                title-component(
                    tag="h3"
                    size="m"
                ) {{ title }}
                p {{ description }}
            .__buttons
                button-component.__button(
                    :size="buttonSize"
                    :ariaLabel="buttonLeftText"
                    view="outline"
                    @click="clickButtonLeftEmit"
                ) {{ buttonLeftText }}
                button-component.__button(
                    :size="buttonSize"
                    :ariaLabel="buttonRightText"
                    view="secondary-brand"
                    @click="clickButtonRightEmit"
                ) {{ buttonRightText }}
</template>

<script lang="ts">
import {Component, Inject, Prop, Vue, Emit} from 'vue-property-decorator'
import {ButtonProps} from '@/shared/lib/ui/Button'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import PictureLazy from '@/shared/lib/ui/PictureLazy/PictureLazy.vue'

export type ProductCardProps = {
    title: string
    description: string
    buttonLeftText: string
    buttonRightText: string
    years: string
    classText: string
    type: 1 | 2 | 3
}
@Component({
    components: {PictureLazy},
})
export default class ProductCard extends Vue {
    @Prop() readonly title!: ProductCardProps['title']
    @Prop() readonly description!: ProductCardProps['description']
    @Prop() readonly buttonLeftText!: ProductCardProps['buttonLeftText']
    @Prop() readonly buttonRightText!: ProductCardProps['buttonRightText']
    @Prop() readonly years!: ProductCardProps['years']
    @Prop() readonly classText!: ProductCardProps['classText']
    @Prop() readonly type!: ProductCardProps['type']

    @Inject('$device') $device!: DeviceProviderValue

    @Emit('clickButtonLeft') clickButtonLeftEmit(e: Event) {
        return e
    }

    @Emit('clickButtonRight') clickButtonRightEmit(e: Event) {
        return e
    }

    get buttonSize(): ButtonProps['size'] {
        return this.$device.size.maxMobileLate ? 's' : 'l'
    }
}
</script>
