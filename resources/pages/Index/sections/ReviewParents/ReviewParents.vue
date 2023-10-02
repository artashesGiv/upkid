<template lang="pug">
    section-slider-component.b-review-parents(
        :title="sectionContent.title"
    )
        swiper-slide.__slide(
            v-for="(card, index) in sectionContent.list"
            :key="index"
        )
            review-card-component.__card(
                v-bind="card"
                :buttonReadFullText="sectionContent.buttonReadFull"
                @click="openReview({payload: card})"
            )
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import ReviewCard from '@/entities/review/ui/ReviewCard/ReviewCard.vue'
import ModalDefaultMixin from '@/shared/lib/mixins/utility/modalDefault'
import { LanguageContent } from '@/shared/api/types'

export type ReviewParentsProps = {}

@Component({
    components: {
        'review-card-component': ReviewCard,
    },
})
export default class ReviewParents extends Mixins(ModalDefaultMixin) {
    get sectionContent(): LanguageContent['reviewParents'] {
        return this.$content.reviewParents
    }
}
</script>
