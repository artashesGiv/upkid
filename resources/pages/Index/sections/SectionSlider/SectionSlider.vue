<template lang="pug">
    section.b-section-slider(
        :class="classes"
    )
        .__container.container(
            v-if="$slots.default"
        )
            .__header(
                v-if="title || isShowButtons"
            )
                title-component.__title(
                    v-if="title"
                    size="l"
                ) {{ title }}
                .__buttons(
                    v-if="isShowButtons"
                )
                    button-component.__button.-prev(
                        view="secondary-brand"
                        size="m"
                        icon="chevron-left"
                        ariaLabel="Предыдущий слайд"
                        @click="prev"
                    )
                    button-component.__button.-next(
                        view="secondary-brand"
                        size="m"
                        icon="chevron-right"
                        ariaLabel="Следующий слайд"
                        @click="next"
                    )
            .__wrapper(
                ref="wrapper"
            )
                transition-fade-component
                    swiper(
                        ref="swiper"
                        :key="keyId"
                        :options="swiperOptions"
                        @progress="onProgress"
                        @init="onInit"
                    )
                        slot
            .__pagination(
                v-show="isShowPagination"
            )
</template>

<script lang="ts">
import {Component, Inject, Prop, Ref, Vue} from 'vue-property-decorator'
import {Swiper, SwiperOptions} from 'swiper'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import isAnyElementInViewport
    from '@/shared/lib/utils/other/isAnyElementInViewport'

let timeout: ReturnType<typeof setTimeout>

export type SectionSliderProps = {
    title: string
    spacing?: 'top' | 'bottom' | 'both'
    options?: SwiperOptions
    keyId?: string
}

@Component
export default class SectionSlider extends Vue {
    @Prop() readonly options!: SectionSliderProps['options']
    @Prop() readonly title!: SectionSliderProps['title']
    @Prop({default: 'both'}) readonly spacing!: SectionSliderProps['spacing']
    @Prop() readonly keyId?: SectionSliderProps['keyId']

    @Ref('swiper') readonly swiperRef!: Vue & { $swiper: Swiper }
    @Ref('wrapper') readonly wrapperRef!: HTMLElement

    @Inject('$device') $device!: DeviceProviderValue

    swipeable = true

    prev() {
        this.swiperRef.$swiper.slidePrev()
    }

    next() {
        this.swiperRef.$swiper.slideNext()
    }

    setSwipeable(value: boolean): void {
        this.swipeable = value
    }

    onProgress(swiper: Swiper): void {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            if (swiper.slides && isAnyElementInViewport(swiper.slides[swiper.slides.length - 3])) {
                this.$emit('almostReachEnd')
            }
        }, 300)
    }

    onInit(): void {
        const lastSlide = this.swiperRef.$swiper.slides[this.swiperRef.$swiper.slides.length - 1]

        if (lastSlide) {
            const swipeable = lastSlide.getBoundingClientRect().right > this.wrapperRef.getBoundingClientRect().right
            if (this.swipeable !== swipeable) {
                this.$emit('init', swipeable)
                this.setSwipeable(swipeable)
            }
        }
    }

    get classes(): string[] {
        return [`section-slider--${this.sliderId}`, `section-slider--spacing-${this.spacing}`]
    }

    get swiperOptions(): SwiperOptions {
        const defaultOptions: SwiperOptions = {
            slidesPerView: 'auto',
            pagination: {
                el: `.section-slider--${this.sliderId} .section-slider__pagination`,
                type: 'bullets',
                clickable: true,
            },
        }

        return {
            ...defaultOptions,
            ...this.options,
        }
    }

    get sliderId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2)
    }

    get isShowButtons(): boolean {
        return Boolean(this.$device.size.tabletLate && this.swipeable)
    }

    get isShowPagination() {
        return this.$device.size.maxMobileLate
    }

    mounted(): void {
        this.onInit()
    }
}
</script>
