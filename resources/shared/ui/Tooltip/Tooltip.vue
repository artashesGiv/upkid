<template lang="pug">

.b-tooltip(
    v-click-outside="closeTooltip"
    ref="tooltip"
    v-on="listeners"
)
    slot
    .__wrapper(
        ref="wrapper"
        :class="classesWrapper"
        v-on="listenersWrapper"
    )
        .__content
            slot(
                name="content"
            )

</template>

<script lang="ts">
import { Component, Mixins, Prop, Ref } from 'vue-property-decorator'
import Resize from "@/shared/lib/mixins/utility/resize";
import {Maybe} from "@/shared/types/helpers";
import {
    Position
} from "@/shared/lib/vue-utils/computed-coordinates";

export type TooltipProps = {
    title?: string
    position?: Position
    actionType?: 'click' | 'hover'
    scrollableParent?: string
}

@Component
export default class Tooltip extends Mixins(Resize) {
    @Prop({ default: 'bottom-center' })
    readonly position?: TooltipProps['position']
    @Prop() readonly title?: TooltipProps['title']
    @Prop({ default: 'click' })
    readonly actionType?: TooltipProps['actionType']
    @Prop() readonly scrollableParent?: TooltipProps['scrollableParent']

    @Ref('tooltip') tooltipRef!: HTMLElement
    @Ref('wrapper') wrapperRef!: HTMLElement

    isPortalDisabled = true

    timeout = {} as ReturnType<typeof setTimeout>

    timeoutTooltip = {} as ReturnType<typeof setTimeout>
    animationDuration = 300

    isOpen = false
    isActive = false

    actualPosition = this.position

    clearTime() {
        clearTimeout(this.timeoutTooltip)
    }

    closeLeaveTooltip(e) {
        this.clearTime()

        this.timeoutTooltip = setTimeout(() => this.closeTooltip(e), 1000)
    }

    mounted() {
        this.addEvents()
    }

    addEvents() {
        if (this.scrollableArea) {
            requestAnimationFrame(() =>
                this.scrollableArea!.addEventListener(
                    'scroll',
                    this.closeTooltip
                )
            )
        }
        this.addResizeWidthEvent(this.closeTooltip)
    }

    closest(el: HTMLElement, selector: string) {
        let parent: Maybe<HTMLElement> = null
        let elem: Maybe<HTMLElement> = el
        while (elem) {
            if (elem.webkitMatchesSelector(selector)) {
                parent = elem
                break
            }
            elem = elem.parentElement
        }
        return parent
    }

    beforeDestroy() {
        this.removeEvents()
    }

    removeEvents() {
        if (this.scrollableArea) {
            this.scrollableArea.removeEventListener('scroll', this.closeTooltip)
        }
        clearTimeout(this.timeout)
        clearTimeout(this.timeoutTooltip)
        this.removeResizeWidthEvent()
    }

    toggleBox(e) {
        e.stopPropagation()
        if (this.isOpen) {
            this.closeTooltip(e)
        } else {
            this.openTooltip(e)
        }
    }

    openTooltip(e) {
        clearTimeout(this.timeout)
        this.clearTime()
        e.stopPropagation()
        this.isPortalDisabled = true
        this.isOpen = true

        this.$nextTick(() => {
            requestAnimationFrame(() => {
                this.isActive = true
            })
        })
    }

    closeTooltip(e?) {
        clearTimeout(this.timeout)
        e?.stopPropagation()
        this.isActive = false
        this.timeout = setTimeout(() => {
            this.isOpen = false
        }, this.animationDuration)
    }

    get listeners() {
        return {
            click: e => this.toggleBox(e),
            ...(this.actionType === 'hover' && {
                mouseenter: e => this.openTooltip(e),
                mouseleave: e => this.closeLeaveTooltip(e),
            }),
        }
    }

    get listenersWrapper() {
        return {
            ...(this.actionType === 'hover' && {
                click: e => {
                    e.stopPropagation()
                },
                mouseenter: e => {
                    e.stopPropagation()
                    this.clearTime()
                },
                mouseleave: e => {
                    e.stopPropagation()
                    this.closeLeaveTooltip(e)
                },
            }),
        }
    }

    get scrollableArea(): Maybe<HTMLElement | Document> {
        if (this.scrollableParent) {
            return this.closest(this.tooltipRef, this.scrollableParent)
        }

        return document
    }

    get classesWrapper() {
        const classes: string[] = [
            `tooltip__wrapper--position-${this.actualPosition}`,
        ]

        if (this.isActive) classes.push(`is-active`)

        return classes
    }
}
</script>
