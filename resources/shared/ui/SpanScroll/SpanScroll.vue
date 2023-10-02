<template lang="pug">
    .b-snap-scroll
        .__main(
            ref="slider"
            :class="{'is-scrolled': touched}"
            v-on:scroll="onScroll"
            v-on:touchstart="setTouched(true)"
        )
            slot
        .__bullets(
            v-if="showBullets"
        )
            .__bullet(
                v-for="index in bulletsLength"
                :class="{'is-active': index === activeBullet}"
                v-on:click="scrollTo(index)"
            )
</template>

<script lang="ts">
import { Component, Inject, Mixins, Ref } from 'vue-property-decorator'
import isElementInViewport from '@/shared/lib/utils/other/isElementInViewport'
import {DeviceProviderValue} from "@/shared/lib/providers/device";
import scrollToSection from "@/shared/lib/mixins/utility/scrollToSection";

export type SnapScrollProps = {}

@Component
export default class SpanScroll extends Mixins(scrollToSection) {
    @Ref('slider') readonly sliderRef!: HTMLElement
    @Inject('$device') readonly $device!: DeviceProviderValue

    activeBullet = 1
    touched = false

    setTouched(value: boolean) {
        this.touched = value
    }

    onScroll() {
        requestAnimationFrame(this.onSetActiveBullet)
    }

    onSetActiveBullet() {
        const slides = this.$slots.default
        if (slides?.length && this.touched) {
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i]
                if (slide.elm && isElementInViewport(slide.elm).x) {
                    const newActiveBullet = i + 1
                    if (this.activeBullet !== newActiveBullet) {
                        this.setActiveBullet(newActiveBullet)
                    }
                    break
                }
            }
        }
    }

    scrollTo(index) {
        this.setTouched(false)
        if (this.$slots.default) {
            const slide = this.$slots.default[index - 1].elm as HTMLElement
            if (slide) {
                const offset = (this.sliderRef.clientWidth - slide.clientWidth) / -2

                this.scrollToSection({
                    elementToScroll: this.sliderRef,
                    target: slide,
                    direction: 'horizontal',
                    offset,
                })
                this.setActiveBullet(index)
            }
        }
    }

    setActiveBullet(value: number) {
        this.activeBullet = value
    }


    get bulletsLength(): number {
        if (this.$slots.default) {
            return this.$slots.default?.length
        }
        return 0
    }

    get showBullets(): boolean {
        return this.$device.size.maxMobileLate
    }
}
</script>
