<template lang="pug">
    .b-video-review-card(
        v-on:click="$emit('click')"
    )
        p.__time(
            v-if="time"
        ) {{time}}
        .__overflow
        image-component.__play(
            src="/images/utility/play.svg"
            alt="play"
        )
        picture-component.__preview(
            v-if="srcPicture"
            :src="srcPicture"
            :fallbackExt="fallbackExt"
            :alt="name"
        )
        .__information
            h4.__name {{name}}
            p.__description {{description}}
</template>

<script lang="ts">
import {Component, Inject, Prop, Vue} from 'vue-property-decorator'

export type VideoReviewCardProps = {
    time: string
    imagePath: string
    name: string
    description: string
    gif: string
    video: string
}

@Component
export default class VideoReviewCard extends Vue {
    @Prop() readonly time!: VideoReviewCardProps['time']
    @Prop() readonly imagePath!: VideoReviewCardProps['imagePath']
    @Prop() readonly name!: VideoReviewCardProps['name']
    @Prop() readonly description!: VideoReviewCardProps['description']

    get srcPicture() {
        return this.imagePath?.split('.')[0]
    }

    get fallbackExt() {
        return this.imagePath?.split('.')[1]
    }
}
</script>
