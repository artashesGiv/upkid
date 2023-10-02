<template lang="pug">
    modal-component
        .b-modal-free-lesson
            .__view
                title-component.__title(
                    size="m"
                    view="surface"
                ) {{modalContent.title}}
                ul.__list
                    li.__item(
                        v-for="(bullet, index) in modalContent.bullets"
                        :key="index"
                    )
                        icon-base-component.__icon(
                            :name="bulletIcon(index)"
                        )
                        span {{bullet}}
                .__image(
                    v-if="$device.size.tablet || $device.size.desktop"
                )
                    image-component(
                        src="/images/decoration/form/form-dino.svg"
                    )
            .__form(
                ref="form"
                :style="{height: height}"
            )
                transition-fade-component
                    response-component(
                        v-if="isSend"
                        :view="$device.size.maxMobile ? 'surface' : 'base'"
                    )
                    free-lesson-order-component(
                        v-else

                        :program="programTitle"

                        @isSuccess="setIsSend(true)"
                    )
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import {FreeLessonOrder} from '@/features/free-lesson-order/FreeLessonOrder'
import FormMixin from '@/shared/lib/mixins/form/form-mixin'
import {Response} from '@/shared/ui/Response'
import {Getter} from "@/shared/lib/utils/other/decorators";
import {ModalsPayloadGetter} from "@/widgets/modals/model/module/getters";
import {
    ModalFreeLessonPayload,
    ModalIntroductoryLessonPayload
} from "@/shared/lib/mixins/utility/modalDefault";
import {modals} from "@/widgets/modals/model/module/state";
import {IconName, Maybe} from "@/shared/types/helpers";
import {LanguageContent} from "@/shared/api/types";

export type ModalFreeLessonProps = {}

@Component({
    components: {
        'response-component': Response,
        'free-lesson-order-component': FreeLessonOrder,
    },
})
export default class ModalFreeLesson extends Mixins(FormMixin) {
    @Getter('modals/payload') payload!: ModalsPayloadGetter

    icons = {
        0: 'users',
        1: 'teach',
        2: 'message'
    }

    bulletIcon(index: number): IconName {
        return this.icons[index]
    }

    get modalContent(): LanguageContent["modalFreeLesson"] {
        return this.$content.modalFreeLesson
    }

    get modalPayload(): ModalFreeLessonPayload {
        return this.payload(modals.FREE_LESSON)
    }

    get programTitle(): Maybe<string> {
        if (this.modalPayload) {
            return this.modalPayload.program
        }

        return null
    }
}
</script>
