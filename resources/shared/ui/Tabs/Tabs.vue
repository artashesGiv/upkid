<template lang="pug">

.b-tabs(
    :class="classes"
)
    .__wrapper
        transition-fade-component
            .__box(
                v-if="isValidValue"
                :style="toggleStyles"
            )
        .__list
            .__item(
                ref="items"
                v-for="item in options"
                :key="item.id"
                :class="{'is-active': isActive(item.id)}"

                v-on:click="onClick(item.id)"
            ) {{item.text}}

</template>

<script lang="ts">
import {
    Component, Emit,
    Prop,
    Ref,
    VModel,
    Vue,
    Watch
} from "vue-property-decorator";
import {Maybe, ViewPropsType} from "@/shared/types/helpers";

export type TabsProps = {
    value: number | string
    options: {
        id: number | string
        text: string
    }[]
    view: Extract<ViewPropsType, 'brand' | 'secondary-brand'>
}

@Component
export default class Tabs extends Vue {
    @Prop() readonly options!: TabsProps['options']
    @Prop() readonly view!: TabsProps['view']
    @VModel() valueModel!: TabsProps['value']

    @Ref('items') itemsRef!: HTMLElement[]

    toggleStyles: Record<string, Maybe<string>> = {
        width: null,
        transform: null,
        transition: null,
        transitionProperty: null,
    }

    @Emit('change')
    changeEmit(id: TabsProps['value']): TabsProps['value'] {
        return id
    }

    get classes() {
        return [
            `tabs--view-${this.view}`
        ]
    }

    get isValidValue(): boolean {
        return typeof this.valueModel !== 'undefined' && this.valueModel !== null
    }

    isActive(id: TabsProps['options'][number]['id']) {
        return this.valueModel === id
    }

    setValue(id: TabsProps['value']) {
        this.valueModel = id
        this.changeEmit(id)
    }

    onClick(id: TabsProps['options'][number]['id']): void {
        if (id !== this.valueModel) {
            this.setValue(id)
        }
    }

    setToggleStyles(id: TabsProps['value'], instant = false): void {
        const index = Object.values(this.options).findIndex(option => option.id === id)

        if (~index) {
            const currentItem = this.itemsRef[index]
            const { width } = currentItem.getBoundingClientRect()
            const { offsetLeft } = currentItem

            this.toggleStyles.width = `${width}px`
            this.toggleStyles.transform = `translate(${offsetLeft}px, 0)`
            if (!instant) {
                this.toggleStyles.transition = '0.3s ease'
                this.toggleStyles.transitionProperty = 'transform, width'
            }
        }
    }

    onResize(): void {
        this.setToggleStyles(this.valueModel)
    }

    mounted(): void {
        requestAnimationFrame(() => this.setToggleStyles(this.valueModel, true))

        window.addEventListener('resize', this.onResize)
    }

    beforeDestroy(): void {
        window.removeEventListener('resize', this.onResize)
    }

    @Watch('valueModel')
    onChangeValueModel(newValue: number, oldValue: number): void {
        if (newValue !== oldValue) {
            this.setToggleStyles(newValue)
        }
    }
}
</script>
