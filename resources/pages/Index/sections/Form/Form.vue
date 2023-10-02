<template lang="pug">

section.b-form
    .__wrapper
        .__decoration
            image-component.__image(
                src="/images/decoration/form/line3.svg"
            )
        .__container.container
            .__main
                title-component.__title(
                    view="surface"
                    :highlightRight="showTitleHighlight"
                )
                    h2(
                        v-html="sectionContent.title"
                    )
                p.__text.-description {{sectionContent.description}}
                p.__text.-sub-title {{sectionContent.bulletsTitle}}:
                .__bullet(
                    v-for="(bullet, index) in sectionContent.bullets"
                    :key="index"
                )
                    icon-base-component.__icon(
                        :name="bulletIcon(index)"
                    )
                    p.__text {{bullet}}
            .__form
                .__cursor(
                    v-if="showCursorDecoration"
                )
                    image-component.__cursor-image(
                        src="/images/decoration/form/cursor.png"
                    )
                form-lesson-component
                p.__privacy(
                    v-if="!showCursorDecoration"

                    v-html="privacyText"
                )

</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator'
import {FormLesson} from '@/widgets/ui/FormLesson'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import {IconName} from "@/shared/types/helpers";
import {LanguageContent} from "@/shared/api/types";

@Component({
    components: {
        'form-lesson-component': FormLesson,
    },
})
export default class Form extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    icons = {
        0: 'users',
        1: 'teach',
        2: 'message'
    }

    bulletIcon(index: number): IconName {
        return this.icons[index]
    }

    get sectionContent(): LanguageContent['formFreeLesson'] {
        return this.$content.formFreeLesson
    }

    get privacyText(): LanguageContent['privacy'] {
        return this.$content.privacy
    }

    get showCursorDecoration() {
        return this.$device.size.tabletLate
    }

    get showTitleHighlight() {
        return this.$device.size.desktop
    }
}
</script>

<!-- <style lang="scss" src="./Form.critical.scss" /> -->
<!-- <style lang="scss" src="./Form.main.scss" /> -->
