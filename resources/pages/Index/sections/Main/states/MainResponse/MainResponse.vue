<template lang="pug">

.b-main-response
    .__wrapper
        title-component.__title(
            size="l"
        ) {{ sectionContent.game.textEnd.title }}
        p.__description(
            v-html="sectionContent.game.textEnd.description"
        )
        .__action
            image-component.__deco.-left(
                src="/images/decoration/highlight/brand.svg"
                alt="highlight"
            )
            button-component.__button(
                :ariaLabel="sectionContent.game.buttonPopup"
                view="brand"
                @click="openFreeLesson"
            ) {{ sectionContent.game.buttonPopup }}
            image-component.__deco.-right(
                src="/images/decoration/highlight/brand.svg"
                alt="highlight"
            )
    button-component.__repeat(
        view="flat"
        size="l"
        icon="repeat"
        :iconLeft="false"
        :ariaLabel="sectionContent.game.buttonOneMoreTime"
        @click="repeatEmit"
    ) {{ sectionContent.game.buttonOneMoreTime }}

</template>

<script lang="ts">
import {Component, Emit, Mixins} from 'vue-property-decorator'
import ModalDefaultMixin from '@/shared/lib/mixins/utility/modalDefault'
import {LanguageContent} from "@/shared/api/types";

@Component
export default class MainResponse extends Mixins(ModalDefaultMixin) {
    get sectionContent(): LanguageContent['main'] {
        return this.$content.main
    }

    @Emit('repeat') repeatEmit() {/**/}
}
</script>

<!-- <style lang="scss" src="./MainResponse.critical.scss" /> -->
<!-- <style lang="scss" src="./MainResponse.main.scss" /> -->
