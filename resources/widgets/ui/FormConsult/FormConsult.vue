<template lang="pug">
    article.b-form-consult(
        ref="form"
        :style="{height: height}"
    )
        .__decoration(
            v-if="$device.size.tabletLate"
        )
            image-component.__image.-line(
                :src="`/images/decoration/form/${decoration}.svg`"
                alt="Decoration"
            )
        transition-fade-component
            response-component.__response(
                v-if="isSend"
                direction="row"
                view="surface"
            )
            .__content(
                v-else
            )
                title-component(
                    view="surface"
                    size="m"
                ) {{content.title}}
                .__description
                    p(
                        v-for="(point, index) in content.pointsList"
                        :key="index"
                    ) - {{point}}
                free-consultation-component.__form(
                    @isSuccess="setIsSend(true)"
                )
                .__privacy(
                    v-html="privacyText"
                )
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import Response from '@/shared/ui/Response/Response.vue'
import {FreeConsultation} from '@/features/free-consultation/FreeConsultation'
import FormMixin from '@/shared/lib/mixins/form/form-mixin'
import {LanguageContent, StaticContent} from "@/shared/api/types";

export type FormConsultProps = {}
@Component({
    components: {
        'free-consultation-component': FreeConsultation,
        'response-component': Response,
    },
})
export default class FormConsult extends Mixins(FormMixin) {
    get content(): LanguageContent['formConsultation'] {
        return this.$content.formConsultation
    }

    get privacyText(): LanguageContent['privacy'] {
        return this.$content.privacy
    }

    get decoration() {
        return this.$device.size.desktop ? 'line2' : 'line1'
    }
}
</script>
