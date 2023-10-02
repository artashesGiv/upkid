<template lang="pug">
    transition-fade-component
        .b-modal(
            v-if="isMount"
            :class="{'is-active': isMount}"
            data-scroll-lock-scrollable
        )
            .__overlay(
                v-on:mousedown="close"
            )
            transition(
                appear
                name="transform-down"
                mode="out-in"
            )
                component.__content(
                    :is="componentName"
                    @close="close"
                )
                    slot
</template>

<script lang="ts">
import {Component, Inject, Prop, Vue} from 'vue-property-decorator'
import {onKeydown} from "@/shared/lib/utils/other/keydown";
import {ModalDesktopContent} from "@/shared/ui/modals/ModalDesktopContent";
import {DeviceProviderValue} from "@/shared/lib/providers/device";
import {ModalMobileContent} from "@/shared/ui/modals/ModalMobileContent";
import {Action} from "@/shared/lib/utils/other/decorators";
import {ModalsRemoveActiveAction} from "@/widgets/modals/model/module/actions";

export type ModalProps = {
    maxWidth?: number
}

@Component({
    components: {
        'modal-desktop-content-component': ModalDesktopContent,
        'modal-mobile-content-component': ModalMobileContent
    },
})
export default class Modal extends Vue {
    @Prop() readonly maxWidth: ModalProps['maxWidth'];

    @Inject('$device') $device!: DeviceProviderValue

    @Action('modals/removeActive') closeModal!: ModalsRemoveActiveAction

    isMount = false
    animationTimeout
    readonly animationDelay = 300

    onKeydown(e) {
        onKeydown(e, [
            {
                key: 'esc',
                callback: this.close,
            },
        ])
    }

    close() {
        this.isMount = false
        this.animationTimeout = setTimeout(() => {
            this.closeModal({})
        }, this.animationDelay)
    }

    addEvents() {
        document.addEventListener('keydown', this.onKeydown, { passive: true })
    }

    removeEvents() {
        document.removeEventListener('keydown', this.onKeydown)
    }

    get componentName() {
        return this.$device.size.maxMobileLate
            ? 'modal-mobile-content-component'
            : 'modal-desktop-content-component'
    }

    mounted() {
        this.addEvents()
        this.animationTimeout = setTimeout(() => {
            this.isMount = true
        }, this.animationDelay)
    }

    beforeDestroy() {
        this.removeEvents()
        clearTimeout(this.animationTimeout)
    }
}
</script>
