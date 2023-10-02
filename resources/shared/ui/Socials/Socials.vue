
<template lang="pug">

.b-socials
    icon-social-component.__item(
        v-for="(social, index) in socials"
        :key="index"
        :name="social.name"
        :href="social.href"
        :view="view"
    )

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IconSocialProps} from "@/shared/lib/ui/IconSocial/IconSocial.vue";
import {IconSocial} from "@/shared/lib/ui/IconSocial";


export type SocialsProps = {
    view: IconSocialProps['view']
}

@Component({
    components: {
        'icon-social-component': IconSocial
    }
})
export default class Socials extends Vue {
    @Prop({default: 'base'}) readonly view!: SocialsProps['view']

    get socials() {
        return this.$staticContent.socials
    }
}
</script>

