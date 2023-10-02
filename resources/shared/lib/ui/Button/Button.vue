<template lang="pug">
    component.b-button(
        v-bind="attrs"
        :is="tag",
        ref="button"
        v-on:click="clickEmit"
    )
        transition-fade-component
            .__content(
                v-if="!loading"
            )
                .__slot(
                    v-if="isSlot"
                )
                    slot
                icon-base-component.__icon(
                    v-if="icon"
                    :name="icon"
                )
            spinner-component.__spinner(
                v-else
                :view="viewSpinner"
            )
</template>


<script lang="ts">
import {Component, Emit, Prop, Ref, Vue, Watch} from 'vue-property-decorator'
import getOptionsByTag from '@/shared/lib/utils/other/getOptionsByTag'
import {IconName, Maybe, SizePropsType, TagPropsType, ViewPropsType} from '@/shared/types/helpers'
import {SpinnerProps} from '@/shared/lib/ui/Spinner/Spinner.vue'

export type ButtonEmitClick = void

export type ButtonProps = {
    tag?: Extract<TagPropsType, 'a' | 'button' | 'router-link'>
    size?: Extract<SizePropsType, 'l' | 'm' | 's' | 'xs'>
    loading?: boolean
    disabled?: boolean
    view?: Extract<ViewPropsType, 'brand' | 'outline' | 'secondary-brand' | 'secondary-outline'> | 'secondary-brand-outline'
    icon?: IconName
    href?: string
    iconLeft?: boolean
    ariaLabel: string
}
@Component
export default class Button extends Vue {
    @Prop({default: 'button'}) readonly tag!: ButtonProps['tag']
    @Prop({default: 'm'}) readonly size!: ButtonProps['size']
    @Prop({default: 'brand'}) readonly view!: ButtonProps['view']
    @Prop() readonly icon!: ButtonProps['icon']
    @Prop() readonly iconLeft!: ButtonProps['iconLeft']
    @Prop() readonly loading!: ButtonProps['loading']
    @Prop() readonly disabled!: ButtonProps['disabled']
    @Prop() readonly href!: ButtonProps['href']
    @Prop({required: true}) readonly ariaLabel!: ButtonProps['ariaLabel']
    @Ref('button') buttonsRef!: HTMLElement

    @Emit('click') clickEmit(): ButtonEmitClick {/**/
    }

    width: Maybe<string> = null
    timeout = {} as ReturnType<typeof setTimeout>
    timeoutDelay = 300

    get attrs(): Record<string, unknown> {
        return {
            ...this.tag === 'a' && getOptionsByTag('a', this.href),
            ...this.tag === 'button' && getOptionsByTag('button'),
            ...this.tag === 'router-link' && getOptionsByTag('router-link', this.href),
            ...this.tag === 'button' && {
                'aria-label': this.ariaLabel,
            },

            class: this.classes,
            disabled: this.disabled,
            style: {
                width: this.width,
            },
        }
    }

    get viewSpinner(): SpinnerProps['view'] {
        const mapView: Record<NonNullable<ButtonProps['view']>,
            SpinnerProps['view']> = {
            'brand': 'secondary',
            'outline': 'brand',
            'secondary-brand': 'brand',
            'secondary-outline': 'brand',
            'secondary-brand-outline': 'brand'
        }
        return mapView[this.view ?? 'brand']
    }

    get isSlot() {
        return this.$slots.default
    }

    get sizeButton() {
        const mapView: Record<NonNullable<ButtonProps['size']>,
            'm' | 's'> = {
            'l': 'm',
            'm': 'm',
            's': 's',
        }

        if (this.isSlot) {
            return this.size
        }

        return mapView[this.size ?? 'm']
    }

    get classes(): string[] {
        const classes = [
            `button--view-${this.view}`,
            `button--size-${this.sizeButton}`,
        ]

        if (this.icon) {
            classes.push(`button--icon-${this.icon}`)

            const buttonIconPosition = this.iconLeft ? 'left' : 'right'

            classes.push(`button--icon-${buttonIconPosition}`)
        }

        if (this.icon && !this.$slots.default) {
            classes.push('is-only-icon')
        }

        if (this.disabled) {
            classes.push('is-disabled')
        }

        if (this.loading) {
            classes.push('is-loading')
        }

        return classes
    }

    beforeDestroy(): void {
        clearTimeout(this.timeout)
    }

    @Watch('loading')
    onChangeLoading(newValue: ButtonProps['loading']): void {
        clearTimeout(this.timeout)

        if (newValue) {
            this.width = `${this.buttonsRef.getBoundingClientRect().width}px`
        } else {
            this.timeout = setTimeout(() => {
                this.width = null
            }, this.timeoutDelay)
        }
    }
}
</script>

