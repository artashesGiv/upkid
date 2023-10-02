<template lang="pug">

header.b-header(
    :class="classes"
)
    .__container.container
        .__section.-left
            logo-component.__logo(
                v-bind="logoProps"
            )
            transition-fade-component
                .__menu.-desktop(
                    v-if="isDesktop"
                    :key="language"
                )
                    link-component.__link.-desktop(
                        v-for="link in sectionContent.menu"
                        :key="link.id"
                        tag="button"
                        @click="onClickLink(link.id)"
                    ) {{ link.text }}
        .__section.-right
            link-component.__phone.-tablet(
                v-if="isTablet && sectionContent.phone"
                tag="a"
                :href="`tel:${sectionContent.phone}`"
            ) {{ sectionContent.phone }}
            socials-component.__socials.-desktop(
                v-if="isDesktop"
                v-bind="socialProps"
            )
            change-language-tabs-component.__select
            transition-fade-component
                button-component.__button.-action(
                    v-if="isDesktop"
                    :key="language"
                    v-bind="buttonFreeLessonProps"

                    @click="openFreeLesson"
                ) {{ sectionContent.buttonAction }}
            button-hamburger-component.__hamburger(
                v-model="isOpenModal"
                v-if="!isDesktop"
            )
    transition-fade-component
        .__modal(
            v-if="isShowModal"
            v-on:click="setIsOpenModal(false)"
        )
            transition(
                :name="transitionName"
                mode="out-in"
                appear
            )
                .__wrapper(
                    v-if="isShowModal"
                    v-move="{onClose: () => setIsOpenModal(false), init: isInitMove}"
                )
                    button-component.__button.-close(
                        :ariaLabel="sectionContent.buttonClose"
                        view="flat"
                        icon="close"
                        @click="setIsOpenModal(false)"
                    )
                    .__scroller(
                        data-scroll-lock-scrollable
                        data-v-move-scrollable
                    )
                        .__menu.-mobile
                            button-component.__link.-mobile(
                                v-for="link in sectionContent.menu"
                                :key="link.id"
                                :ariaLabel="link.text"
                                tag="button"
                                size="m"
                                view="secondary-brand"
                                @click="onClickLink(link.id)"
                            ) {{ link.text }}
                        button-component.__phone.-mobile(
                            v-if="sectionContent.phone"
                            tag="a"
                            :href="`tel:${sectionContent.phone}`"
                            :ariaLabel="sectionContent.phone"
                            size="m"
                            view="secondary-outline"
                        ) {{ sectionContent.phone }}
                        .__socials.-mobile
                            button-component.__social.-mobile(
                                v-for="(social, index) in sectionContent.socials"
                                :key="index"
                                :ariaLabel="social.name"
                                :icon="social.name"
                                :href="social.href"
                                tag="a"
                                size="m"
                                view="secondary-outline"
                            )
</template>

<script lang="ts">
import {Component, Inject, Mixins, Prop, Watch} from 'vue-property-decorator'
import {DeviceProviderValue} from "@/shared/lib/providers/device"
import {ButtonHamburger} from "@/shared/ui/ButtonHamburger"
import Resize from "@/shared/lib/mixins/utility/resize"
import {Getter} from '@/shared/lib/utils/other/decorators'
import {LanguageContent} from '@/shared/api/types'
import {Languages} from "@/entities/content"
import {
    ChangeLanguageSelect,
    ChangeLanguageTabs
} from '@/features/change-language'
import scrollToSection from "@/shared/lib/mixins/utility/scrollToSection";
import ModalDefaultMixin from "@/shared/lib/mixins/utility/modalDefault";
import {SocialsProps} from "@/shared/ui/Socials/Socials.vue";
import {LogoProps} from "@/shared/ui/Logo/Logo.vue";
import {ButtonProps} from "@/shared/lib/ui/Button";

export type HeaderProps = {
    view: 'base' | 'dark'
}

@Component({
    components: {
        // 'change-language-select-component': ChangeLanguageSelect,
        'change-language-tabs-component': ChangeLanguageTabs,
        'button-hamburger-component': ButtonHamburger
    }
})
export default class Header extends Mixins(Resize, scrollToSection, ModalDefaultMixin) {
    @Prop() readonly view!: HeaderProps['view']

    @Inject('$device') $device!: DeviceProviderValue

    @Getter('content/values') content!: LanguageContent
    @Getter('content/active') language!: Languages

    get sectionContent() {
        return {
            socials: this.$staticContent.socials,
            phone: this.$staticContent.phone,
            buttonAction: this.$content.header.lessonButton,
            buttonClose: this.$content.header.closeButton,
            menu: Object.entries(this.$content.header.links).map(
                ([key, value]) => ({ id: key, text: value })
            )
        }
    }

    get socialProps(): SocialsProps {
        return {
            view: this.view === 'base' ? 'surface' : 'base'
        }
    }

    get logoProps(): LogoProps {
        return {
            view: this.view === 'base' ? 'inverse' : 'base'
        }
    }

    get buttonFreeLessonProps(): ButtonProps {
        return {
        ariaLabel: this.sectionContent.buttonAction,
        size: 's',
        view: this.view === 'base' ? 'secondary-brand' : 'brand'
        }
    }

    get classes() {
        return [
            `header--view-${this.view}`
        ]
    }

    isOpenModal = false

    onClickLink(id: string){
        this.scrollToSection({
            target: id
        })
    }

    setIsOpenModal(value: boolean){
        this.isOpenModal = value
    }

    onResize(){
        if(this.$device.size.desktop){
            this.setIsOpenModal(false)
        }
    }

    addScrollEvent(){
        this.addResizeWidthEvent(this.onResize)
    }

    removeScrollEvent(){
        this.removeResizeWidthEvent()
    }

    get isDesktop() {
        return this.$device.size.desktop
    }

    get isTablet(){
        return this.$device.size.tabletLate
    }

    get isInitMove(){
        return this.$device.size.maxMobileLate
    }

    get isShowModal(){
        return !this.isDesktop && this.isOpenModal
    }

    get transitionName(){
        return this.isInitMove ? 'transform-down' : 'transform-right'
    }

    @Watch('isOpenModal')
    onChangeIsOpenModal(newValue){
        if(newValue) {
            this.$scrollLock.disablePageScroll()
            this.addScrollEvent()
        } else {
            this.$scrollLock.enablePageScroll()
            this.removeScrollEvent()
        }
    }

    beforeDestroy() {
        this.removeScrollEvent()
    }
}
</script>
