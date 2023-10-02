<template lang="pug">
    section-layout-component.b-programs(
        :title="sectionContent.title"
        :description="sectionContent.description"
        :is-title-decoration="true"
        id="program"
    )
        component(
            :is="component"
        )
            product-card-component.__item(
                v-for="(product, index) in sectionContent.list"
                :key="index"
                :title="product.title"
                :description="product.description"
                :type="product.type"
                :classText="product.classText"
                :years="product.years"
                :button-left-text="sectionContent.buttons.sign"
                :button-right-text="sectionContent.buttons.program"
                @clickButtonLeft="onLeftClick(product.title)"
                @clickButtonRight="onRightClick(product)"
            )
</template>

<script lang="ts">
import {Component, Inject, Mixins} from 'vue-property-decorator'
import ProductCard, {
    ProductCardProps,
} from '@/entities/product/ui/ProductCard/ProductCard.vue'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import ModalDefaultMixin from '@/shared/lib/mixins/utility/modalDefault'
import {SpanScroll} from '@/shared/ui/SpanScroll'
import {LanguageContent} from "@/shared/api/types";

@Component({
    components: {
        'product-card-component': ProductCard,
        'snap-scroll-component': SpanScroll,
    },
})
export default class Programs extends Mixins(ModalDefaultMixin) {
    @Inject('$device') $device!: DeviceProviderValue

    get sectionContent(): LanguageContent['programs'] {
        return this.$content.programs
    }

    onLeftClick(program: ProductCardProps['title']): void {
        this.openFreeLesson({
            payload: {
                program
            }
        })
    }

    onRightClick(product: LanguageContent["programs"]["list"][0]): void {
        this.openIntroductoryLesson({
            payload: {
                classText: product.classText,
                years: product.years,
                title: product.title,
                goal: product.description,
                programsPointsTitle: product.programsPointsTitle,
                programPoints: product.programPoints
            }
        })
    }

    get component() {
        return this.$device.size.maxMobileLate ? 'snap-scroll-component' : 'div'
    }
}
</script>
