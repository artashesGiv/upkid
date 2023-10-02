<template lang="pug">

section-slider-component.b-success-story-section(
    :title="sectionContent.title"
    keyId="successStory"
    id="successStory"
)
    swiper-slide.__slide(
        v-for="(card, index) in sectionContent.list"
        :key="index"
    )
        success-story-card-component.__card(
            v-bind="card"
            @click="openSuccessStory({payload: card})"
        )

</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import type { LanguageContent } from "@/shared/api/types";
import { SuccessStoryCard } from '@/entities/successStory'
import ModalDefaultMixin from "@/shared/lib/mixins/utility/modalDefault";

@Component({
    components: {
        'success-story-card-component': SuccessStoryCard
    }
})
export default class SuccessStory extends Mixins(ModalDefaultMixin) {
    get sectionContent(): LanguageContent['successStory'] {
        return this.$content.successStory
    }


}
</script>
