<template lang="pug">
    .b-spinner
        svg(
            v-bind="svgAttrs"
        )
            defs
                linearGradient(
                    :id="gradientsId.a"
                )
                    stop(offset="0%" stop-opacity="0" stop-color="currentColor")
                    stop(offset="100%" stop-opacity=".5" stop-color="currentColor")
                linearGradient(
                    :id="gradientsId.b"
                )
                    stop(offset="0%" stop-color="currentColor")
                    stop(offset="100%" stop-opacity=".5" stop-color="currentColor")
            g(stroke-width="15")
                path(
                    :stroke="`url(#${gradientsId.a})`"
                    d="M15 100a85 85 0 0 1 170 0"
                )
                path(
                    :stroke="`url(#${gradientsId.b})`"
                    d="M185 100a85 85 0 0 1-170 0"
                )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {ViewPropsType} from '@/shared/types/helpers'

export type SpinnerProps = {
    view?: Extract<ViewPropsType, 'brand' | 'secondary'>
}

@Component
export default class Spinner extends Vue {
    @Prop({default: 'brand'}) readonly view!: SpinnerProps['view']

    get svgAttrs() {
        const mapColors = {
            brand: 'rgba(84,85,246,1)',
            secondary: 'rgba(255,255,255,1)',
        }

        return {
            color: mapColors[this.view ?? 'brand'],
            xmlns: 'http://www.w3.org/2000/svg',
            fill: 'none',
            viewBox: `0 0 200 200`,
            width: '200',
            height: '200',
        }
    }

    get gradientsId() {
        return {
            a: `spinner-base-a`,
            b: `spinner-base-b`,
        }
    }
}
</script>