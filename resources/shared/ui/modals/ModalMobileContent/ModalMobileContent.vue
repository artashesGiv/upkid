<template lang="pug">
    .b-modal-mobile-content(
        v-on:click="onClose"
    )
        .__wrapper(
            v-move="{onClose}"
            v-on:click.stop
        )
            button-component.__close(
                ariaLabel="close"
                size="s"
                view="flat"
                icon="close"
                @click="onClose"
            )
            .__slot(
                data-scroll-lock-scrollable
                data-v-move-scrollable
            )
                slot
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

export type ModalMobileContentProps = {}

@Component
export default class ModalMobileContent extends Vue {
    onClose() {
        this.$emit('close')
    }
}
</script>
