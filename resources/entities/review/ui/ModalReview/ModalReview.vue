<template lang="pug">
    modal-component
        .b-modal-review
            review-card-component(
                v-bind="modalPayload"
            )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {Getter} from "@/shared/lib/utils/other/decorators";
import {ModalsPayloadGetter} from "@/widgets/modals/model/module/getters";
import {ReviewCardProps} from "@/entities/review/ui/ReviewCard/ReviewCard.vue";
import {modals} from "@/widgets/modals/model/module/state";
import {ReviewCard} from "@/entities/review/ui/ReviewCard";

export type ModalReviewProps = {}

@Component({
    components: {
        'review-card-component': ReviewCard
    }
})
export default class ModalReview extends Vue {
    @Getter('modals/payload') payload!: ModalsPayloadGetter

    get modalPayload(): ReviewCardProps {
        return {
            ...this.payload(modals.REVIEW),
            cutReview: false,
            radius: false
        }
    }
}
</script>
