<template lang="pug">
    section-slider-component.b-review-students(
        :title="sectionContent.title"
        id="feedback"
    )
        swiper-slide.__slide(
            v-for="(card, index) in sectionContent.list"
            :key="index"
        )
            video-review-card-component.__card(
                :time="card.time"
                :name="card.name"
                :description="card.description"
                :image-path="card.imagePath"
                @click="() => openVideoReview({payload: card})"
            )
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import VideoReviewCard
    from '@/entities/review/ui/VideoReviewCard/VideoReviewCard.vue'
import ModalVideoReview
    from '@/entities/review/ui/ModalVideoReview/ModalVideoReview.vue'
import ModalDefaultMixin from '@/shared/lib/mixins/utility/modalDefault'
import {LanguageContent} from "@/shared/api/types";

export type ReviewStudentsProps = {}

@Component({
    components: {
        'modal-video-review-component': ModalVideoReview,
        'video-review-card-component': VideoReviewCard,
    },
})
export default class ReviewStudents extends Mixins(ModalDefaultMixin) {
    get sectionContent(): LanguageContent['reviewStudents'] {
        return this.$content.reviewStudents
    }
}
</script>
