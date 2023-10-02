<template lang="pug">
    section-layout-component.b-video-review(
        :title="sectionContent.title"
        :isTitleDecoration="isTitleDecoration"
    )
        .__wrapper
            swiper.__swiper(
                ref="swiper"
                :options="sliderOptions"
                @slideChangeTransitionStart="onSlide"
                @slideChangeTransitionEnd="setActiveSlide"
            )
                swiper-slide.__slide(
                    v-for="(video, index) in sectionContent.list"
                    ref="slide"
                    :key="index"
                )
                    youtube-lazy-component.__video(
                        :src="video"
                        :canPlay="activeSlide === index"
                    )
            .__pagination
</template>

<script lang="ts">
import {Swiper, SwiperOptions} from 'swiper'
import {Component, Inject, Ref, Vue} from 'vue-property-decorator'
import YoutubeLazy from '@/shared/ui/YoutubeLazy/YoutubeLazy.vue'
import {LanguageContent} from "@/shared/api/types";
import {DeviceProviderValue} from "@/shared/lib/providers/device";
import {Maybe} from "@/shared/types/helpers";

@Component({
    components: {
        'youtube-lazy-component': YoutubeLazy,
    },
})
export default class VideoReview extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    @Ref('slide') slideRef!: Vue[]
    @Ref('swiper') swiperRef!: Swiper

    activeSlide = 1;

    get sectionContent(): LanguageContent['videoReview'] {
        return this.$content.videoReview
    }

    get isTitleDecoration() {
        return !this.$device.size.maxMobile
    }

    get sliderOptions(): SwiperOptions {
        return {
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            centeredSlides: true,
            watchOverflow: true,
            initialSlide: 1,
            pagination: {
                el: `.video-review .video-review__pagination`,
                type: 'bullets',
                clickable: true,
            },
            zoom: {
                maxRatio: 2,
                minRatio: 1
            },
        }
    }

    updateSlidesClassList(active: number) {
        let next: Maybe<number> = null
        let prev: Maybe<number> = null

        if (active !== this.slideRef.length - 1) {
            next = active + 1
        }

        if (active !== 0) {
            prev = active - 1
        }

        this.slideRef[active].$el.classList.remove('slide-before-prev', 'slide-after-next')

        if (next) {
            this.slideRef[next].$el.classList.add('swiper-slide-next')
            this.slideRef[next].$el.classList.remove('slide-before-prev', 'slide-after-next')
            this.slideRef.slice(next + 1).forEach(elem => {
                elem.$el.classList.add('slide-after-next')
                elem.$el.classList.remove('slide-before-prev')
            })
        }

        if (prev) {
            this.slideRef[prev].$el.classList.add('swiper-slide-prev')
            this.slideRef[prev].$el.classList.remove('slide-before-prev', 'slide-after-next')
            this.slideRef.slice(0, prev).forEach(elem => {
                elem.$el.classList.add('slide-before-prev')
                elem.$el.classList.remove('slide-after-next')
            })
        }
    }

    setActiveSlide(swiper) {
        this.activeSlide = swiper.activeIndex
    }

    onSlide(swiper) {
        this.updateSlidesClassList(swiper.activeIndex)
    }

    mounted() {
        this.updateSlidesClassList(1)
    }
}
</script>
