<template lang="pug">
    .b-collapse(
        :class="{'is-active': isOpen}"
    )
        .__main(
            v-on:click="toggleOpen"
        )
            .__title {{title}}
            icon-base-component.__icon(
                name="plus"
            )
        transition-expand-component
            .__dropdown(
                v-if="isOpen"
            )
                .__slot
                    slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { onKeydown } from '@/shared/lib/utils/other/keydown'

export type CollapseProps = {
    title: string
}

@Component
export default class Collapse extends Vue {
    @Prop() readonly title!: CollapseProps['title']

    isOpen = false

    toggleOpen() {
        this.isOpen = !this.isOpen
        if (this.isOpen) {
            this.addEvents()
        } else {
            this.removeEvents()
        }
    }

    closeOpen() {
        this.isOpen = false
    }

    onKeydown(e) {
        onKeydown(e, [
            {
                key: 'esc',
                callback: this.closeOpen,
            },
        ])
    }

    addEvents(): void {
        document.addEventListener('keydown', this.onKeydown, {passive: true})
    }

    removeEvents(): void {
        document.removeEventListener('keydown', this.onKeydown)
    }
}
</script>
