<template lang="pug">
    .b-youtube-lazy
        transition-fade-component
            .__preview(
                v-if="!isShowVideo"
                v-on:click="onClick"
            )
                image-component.__background(
                    :src="previewSrc"
                    alt="banner"
                )
                image-component.__decoration.-play(
                    src="/images/decoration/youtube/youtube-play.svg"
                    alt="play"
                )
                image-component.__decoration.-logo(
                    src="/images/decoration/youtube/youtube-logo.svg"
                    alt="logo"
                )
            youtube.__video(
                v-else
                ref="youtube"
                :video-id="videoId"
                @ready="videoInit"
            )
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import getYouTubeID from 'get-youtube-id'

export type YoutubeLazyProps = {
    src: string
    canPlay: boolean
}

@Component
export default class YoutubeLazy extends Vue {
    @Prop() src!: YoutubeLazyProps['src']
    @Prop() canPlay!: YoutubeLazyProps['canPlay']

    @Ref('youtube') youtubeRef!: Vue

    isShowVideo = false

    onClick() {
        if (this.canPlay) {
            this.setIsShowVideo(true)
        }
    }

    setIsShowVideo(value: boolean) {
        this.isShowVideo = value
    }

    videoInit() {
        this.youtubeRef.player.playVideo()
    }

    onPause() {
        if (this.isShowVideo && !this.canPlay) {
            // console.log('redraw')
            this.youtubeRef.player.pauseVideo()
            this.setIsShowVideo(false)
        }
    }

    get previewSrc() {
        return `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`
    }

    get videoId() {
        return getYouTubeID(this.src)
    }

    @Watch('canPlay')
    onChangeCanPlay(newValue, prevValue) {
        if (newValue !== prevValue) {
            this.onPause()
        }
    }
}
</script>
