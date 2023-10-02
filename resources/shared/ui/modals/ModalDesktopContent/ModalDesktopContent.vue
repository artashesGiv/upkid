<template lang="pug">
    .b-modal-desktop-content(
        data-scroll-lock-scrollable
        data-v-move-scrollable
    )
        .__wrapper
            button-component.__close(
                ariaLabel="close"
                view="flat"
                icon="close"
                @click="onClose"
            )
            .__slot
                slot
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

export type ModalDesktopContentProps = {}

@Component
export default class ModalDesktopContent extends Vue {
    onClose() {
        this.$emit('close')
    }
}
</script>
