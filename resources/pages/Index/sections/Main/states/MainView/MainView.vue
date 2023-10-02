<template lang="pug">

section-layout-component.b-main-view(
    spacing="none"
)
    .__content(
        v-if="!isGame"
    )
        title-component.__title(
            size="l"
            view="surface"
            :highlightLeft="!$device.size.maxMobile"
            :highlightRight="!$device.size.maxMobile"
            highlightSize="l"
        ) {{ sectionContent.title }}
        p.__description(
            v-html="sectionContent.description"
        )
        transition(
            name="fade"
            duration="300"
            appear
        )
            template(
                v-if="isNotDesktop"
            )
                picture-component.__image(
                    src="/images/decoration/main/boy"
                    fallbackExt="png"
                    alt="child"
                )
            template(
                v-else-if="$device.size.desktop"
            )
                .__dino(
                    @click="onClick"
                )
                    title-component.__dino-title(
                        tag="h4"
                        size="xs"
                        view="surface"
                        :highlightLeft="true"
                        :highlightRight="true"
                    ) {{sectionContent.game.buttonStart}}
                    .__dino-image
                        .__dino-main
                            picture-component(
                                src="/images/decoration/main/dino-main"
                                fallbackExt="png"
                                alt="decoration"
                            )
                        .__dino-hover
                            picture-component(
                                src="/images/decoration/main/dino-hover"
                                fallbackExt="png"
                                alt="decoration"
                            )
        button-component.__button(
            ariaLabel="Попробовать бесплатно"
            view="secondary-brand"
            size="l"
            @click="openFreeLesson"
        ) {{ sectionContent.button }}


</template>

<script lang="ts">
import { Component, Emit, Inject, Mixins } from 'vue-property-decorator'
import { DeviceProviderValue } from '@/shared/lib/providers/device'
import { SectionLayout } from '../../../SectionLayout'
import { Banner } from '@/shared/ui/Banner'
import { Button } from '@/shared/lib/ui/Button'
import ModalDefaultMixin from '@/shared/lib/mixins/utility/modalDefault'
import { LanguageContent } from '@/shared/api/types'

@Component({
    components: {
        'section-layout-component': SectionLayout,
        'banner-component': Banner,
        'button-component': Button,
    },
})
export default class MainView extends Mixins(ModalDefaultMixin) {
    @Inject('$device') $device!: DeviceProviderValue

    get sectionContent(): LanguageContent['main'] {
        return this.$content.main
    }

    @Emit('click') clickEmit() {
        /**/
    }

    isGame = false

    get isNotDesktop() {
        return (
            (this.$device.size.maxMobile || this.$device.size.maxMobileLate || this.$device.size.maxTablet) &&
            !this.$device.size.desktop
        )
    }

    onClick() {
        this.isGame = true
        this.clickEmit()
    }

    mounted() {
        // console.log(this.$device)
    }
}
</script>
