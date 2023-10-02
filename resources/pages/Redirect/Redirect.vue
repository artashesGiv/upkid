<template lang="pug">
    span
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RedirectPage extends Vue {
    @Prop() readonly isToNotFound!: boolean

    created() {
        const lang = this.$store.getters['content/active']

        this.$router.replace({ name: this.isToNotFound ? 'not-found' : 'main', params: { lang } })
    }
}
</script>
