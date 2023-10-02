<template lang="pug">

footer.b-footer
    .__container.container
        .__head
            logo-component.__logo(
                view="inverse"
            )
            .__menu
                link-component.__link.-head(
                    v-for="link in sectionContent.menu"
                    :key="link.id"
                    view="surface"
                    tag="button"
                    @click="onClickLink(link.id)"
                ) {{ link.text }}
            link-component.__phone(
                v-if="sectionContent.phone"
                :href="`tel:${sectionContent.phone}`"
                tag="a"
                view="surface"
                isBold
            ) {{ sectionContent.phone }}
            socials-component.__socials(
                view="surface"
            )
        .__bottom
            .__links
                link-component.__link.-bottom(
                    v-for="link in sectionContent.links"
                    :key="link.href"
                    :href="link.href"
                    view="secondary"
                    tag="a"
                ) {{ link.text }}
            .__privacy {{ sectionContent.privacy }}
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import scrollToSection from "@/shared/lib/mixins/utility/scrollToSection";

@Component
export default class Footer extends Mixins(scrollToSection) {
    onClickLink(id: string){
        this.scrollToSection({
            target: id
        })
    }

    get sectionContent() {
        return {
            phone: this.$staticContent.phone,
            links: this.$staticContent.footer.links,
            privacy: this.$staticContent.footer.privacy,
            menu: Object.entries(this.$content.footer.menu).map(
                ([key, value]) => ({ id: key, text: value })
            )
        }
    }
}
</script>

<!-- <style lang="scss" src="./Footer.critical.scss" /> -->
<!-- <style lang="scss" src="./Footer.main.scss" /> -->
