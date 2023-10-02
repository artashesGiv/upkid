<template lang="pug">
    modal-component
        .b-modal-video-review
            .__project
                image-component.__gif(
                    :src="modalPayload.gif"
                    alt="gif"
                )
            .__card
                .__video
                    youtube-lazy-component.__video-main(
                        v-if="modalPayload.video"
                        :src="modalPayload.video"
                        :canPlay="true"
                    )
                .__name {{modalPayload.name}}
                .__description {{modalPayload.description}}
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator'
import {Getter} from '@/shared/lib/utils/other/decorators'
import {ModalsPayloadGetter} from '@/widgets/modals/model/module/getters'
import {modals} from '@/widgets/modals/model/module/state'
import {
    VideoReviewCardProps,
} from '@/entities/review/ui/VideoReviewCard/VideoReviewCard.vue'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import YoutubeLazy from '@/shared/ui/YoutubeLazy/YoutubeLazy.vue'

export type ModalVideoReviewProps = {}
@Component({
    components: {
        'youtube-lazy-component': YoutubeLazy,
    },
})
export default class ModalVideoReview extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    @Getter('modals/payload') payload!: ModalsPayloadGetter

    get modalPayload(): VideoReviewCardProps {
        return {
            ...this.payload(modals.VIDEO_REVIEW),
        }
    }
}
</script>
