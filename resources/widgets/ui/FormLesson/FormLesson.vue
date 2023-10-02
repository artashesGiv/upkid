<template lang="pug">
    .b-form-lesson(
        ref="form"
        :style="{height: height}"
    )
        .__header
            .__decorations
                .__decoration.-red
                .__decoration.-yellow
                .__decoration.-green
        transition-fade-component
            response-component(
                v-if="isSend"
                view="base"
            )
            .__content(
                v-else
            )
                free-lesson-component.__form(
                    @isSuccess="setIsSend(true)"
                )
                .__privacy(
                    v-if="$device.size.tabletLate"

                    v-html="formPrivacy"
                )
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import Response from '@/shared/ui/Response/Response.vue'
import FormMixin from '@/shared/lib/mixins/form/form-mixin'
import FreeLesson from '@/features/free-lesson/FreeLesson/FreeLesson.vue'
import {LanguageContent} from "@/shared/api/types";

export type FormLessonProps = {}
@Component({
    components: {
        'free-lesson-component': FreeLesson,
        'response-component': Response,
    },
})
export default class FormLesson extends Mixins(FormMixin) {
    get formPrivacy(): LanguageContent['formFreeLesson']['privacy'] {
        return this.$content.formFreeLesson.privacy
    }
}
</script>
