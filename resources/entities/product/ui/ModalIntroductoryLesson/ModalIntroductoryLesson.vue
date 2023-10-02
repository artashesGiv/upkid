<template lang="pug">

modal-component
    .b-modal-introductory-lesson
        .__view
            .__tags
                tag-component.__tag(
                    icon="mood-happy"
                ) {{modalPayload.years}}
                //tag-component.__tag {{modalPayload.classText}}
            title-component.__title {{modalPayload.title}}
            p.__sub-title.-goal {{modalPayload.goal}}
            p.__sub-title {{modalContent.programsPointsTitle}}:
            ul.__program
                li.__sub-title.-point(
                    v-for="(point, index) in modalPayload.programPoints"
                    :key="index"
                ) {{point}}
        .__form(
            ref="form"
            :style="{height: height}"
        )
            transition-fade-component
                response-component.__response(
                    v-if="isSend"
                    view="surface"
                )
                .__inner(
                    v-else
                )
                    title-component.__title.-form(
                        view="surface"
                    ) {{modalContent.title}}
                    free-introductory-lesson-order-component(
                        :program="modalPayload.title"

                        @isSuccess="setIsSend(true)"
                    )
                    p.__policy(
                        v-html="privacyText"
                    )
</template>

<script lang="ts">
import {Component, Mixins, Vue} from 'vue-property-decorator'
import FreeIntroductoryLessonOrder
    from "@/features/free-introductory-lesson-order/FreeIntroductoryLessonOrder/FreeIntroductoryLessonOrder.vue";
import Modal from "@/shared/lib/ui/Modal/Modal.vue";
import {Getter} from "@/shared/lib/utils/other/decorators";
import {ModalsPayloadGetter} from "@/widgets/modals/model/module/getters";
import {
    ModalIntroductoryLessonPayload
} from "@/shared/lib/mixins/utility/modalDefault";
import {modals} from "@/widgets/modals/model/module/state";
import FormMixin from "@/shared/lib/mixins/form/form-mixin";
import {Response} from "@/shared/ui/Response";
import {Maybe} from "@/shared/types/helpers";
import {LanguageContent} from "@/shared/api/types";

export type ModalIntroductoryLessonProps = {

}

@Component({
    components: {
        'response-component': Response,
        'free-introductory-lesson-order-component': FreeIntroductoryLessonOrder
    }
})
export default class ModalIntroductoryLesson extends Mixins(FormMixin) {
    @Getter('modals/payload') payload!: ModalsPayloadGetter

    get modalContent(): LanguageContent['modalIntroductionLesson'] {
        return this.$content.modalIntroductionLesson
    }

    get privacyText(): LanguageContent['privacy'] {
        return this.$content.privacy
    }

    get modalPayload(): ModalIntroductoryLessonPayload {
        return this.payload(modals.INTRODUCTORY_LESSON)
    }
}
</script>
