<template lang="pug">
.b-rating(
    :class="classes"
)
    .__marks
        .__mark(
            v-for="index in 5"
            v-on = "listeners(index)"
        )
            transition(
                name="fade"
            )
                image-component.__image(
                    v-if="valueModel >= index"
                    src="/images/decoration/star/filled.svg"
                )
</template>

<script lang="ts">
import {Component, Prop, VModel, Vue} from 'vue-property-decorator'
import {Maybe, SizePropsType} from '@/shared/types/helpers'

export type RatingProps = {
    value: number,
    disabled?: boolean
}

@Component
export default class Rating extends Vue {
    @Prop({default: true}) readonly disabled?: RatingProps['disabled']

    @VModel() valueModel!: RatingProps['value']

    changeRating(rating: number): void {
        this.valueModel = this.valueModel === rating ? 0 : rating
    }

    listeners(rating: number): Maybe<object> {
        if (!this.disabled) {
            return {
                click: () => this.changeRating(rating),
            }
        }

        return null
    }


    get classes(): string[] {
        const classes: string[] = []

        if (!this.disabled) {
            classes.push('is-active')
        }

        return classes
    }
}
</script>
