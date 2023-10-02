<template lang="pug">

article.b-success-story-card(
    :class="classes"
    v-on:click="onReadFull"
)
    .__student
        image-component.__decoration(
            src="/images/decoration/cards/successStory/line.svg"
            alt="decoration"
        )
        picture-component.__image(
            v-if="isInit"
            v-bind="pictureProps"
        )
    .__main
        tag-component.__name(
            view="brand"
        ) {{ name }}
        title-component.__title(
            tag="h3"
            size="s"
        ) {{ title }}
        p.__text(
            ref="reviewText"
        ) {{ text }}
        transition-fade-component
            p.__read-full(
                v-if="isReviewLong"
            ) {{ buttonReadFullText }}

</template>

<script lang="ts">
import {Component, Inject, Prop, Ref, Emit, Vue} from "vue-property-decorator";
import pxToRem from "@/shared/lib/utils/other/pxToRem";
import type {DeviceProviderValue} from "@/shared/lib/providers/device";

export type SuccessStoryCardProps = {
    image: string
    imageMobile?: string
    name: string
    title: string
    text: string
    buttonReadFullText: string
}

@Component
export default class SuccessStoryCard extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    @Prop() readonly image!: SuccessStoryCardProps['image']
    @Prop() readonly imageMobile!: SuccessStoryCardProps['imageMobile']
    @Prop() readonly name!: SuccessStoryCardProps['name']
    @Prop() readonly title!: SuccessStoryCardProps['title']
    @Prop() readonly text!: SuccessStoryCardProps['text']
    @Prop() readonly buttonReadFullText!: SuccessStoryCardProps['buttonReadFullText']

    @Ref('reviewText') reviewTextRef!: HTMLElement

    isInit = false

    @Emit('click')
    clickEmit() {
        return null
    }

    isReviewLong = false
    maxHeight = this.$device.size.maxMobile ? 100 : 120

    get classes() {
        const classes: string[] = []

        if (this.isReviewLong) {
            classes.push('success-story-card--cut')
        }

        return classes
    }

    pictureProps = {
        src: '',
        fallbackExt: '',
        alt: 'student'
    }

    // get pictureProps() {
    //     const isMobile = Boolean(this.$device?.size?.maxMobile)
    //
    //     const image = isMobile
    //         ? (this.imageMobile ?? this.image)
    //         : this.image
    //
    //     const dotIndex = image.indexOf('.')
    //
    //     return {
    //         src: image.slice(0, dotIndex),
    //         fallbackExt: image.slice(dotIndex + 1),
    //         alt: 'student'
    //     }
    // }

    onReadFull() {
        this.clickEmit()
    }

    setPicture() {
        const isMobile = Boolean(this.$device?.size?.maxMobile)

        const image = isMobile
            ? (this.imageMobile ?? this.image)
            : this.image

        const dotIndex = image.indexOf('.')


        this.pictureProps = {
            src: image.slice(0, dotIndex),
            fallbackExt: image.slice(dotIndex + 1),
            alt: 'student'
        }
    }

    mounted(): void {
        this.isReviewLong = pxToRem(this.reviewTextRef.getBoundingClientRect().height) >= this.maxHeight

        const timeout = setTimeout(() => {
            this.isInit = true

            this.setPicture()
            clearTimeout(timeout)
        }, 100)
    }
}
</script>
