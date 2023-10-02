<template lang="pug">

.b-not-found
    .__wrapper
        .__image
            image-component(
                src="/images/decoration/not-found/404.svg"
                alt="404"
            )
        .__text
            p {{ content.notFound.text }}
        button-component.__button(
            :size="buttonProps.size"
            :ariaLabel="content.notFound.button"
            tag="button"
            @click="onClick"
        ) {{ content.notFound.button }}
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator'
import { DeviceProviderValue } from '@/shared/lib/providers/device'

@Component
export default class NotFoundPage extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    get buttonProps() {
        return {
            size: this.$device.size.maxMobile ? 'm' : 'l',
        }
    }

    get content() {
        return this.$store.getters['content/values']
    }

    created() {
        // console.log('notFoundPage')
    }

    onClick() {
        this.$router.push({ name: 'main' })
    }
}
</script>
