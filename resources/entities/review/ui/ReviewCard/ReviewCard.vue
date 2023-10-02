<template lang="pug">

.b-review-card(
    :class="classes"
)
    .__header(
        ref="header"
    )
        .__user
            avatar-component.__avatar(
                v-bind="avatarProps"
            )
            .__information
                p.__name {{user.name}}
                p.__role {{user.role}}
        rating-component.__rating(
            :value="rating"
            :disabled="true"
        )
    .__main(
        ref="textWrapper"
    )
        p.__text(
            ref="text"
        ) {{review}}
        transition-fade-component
            p.__read-full(
                v-if="isReviewLong && cutReview"
                v-on:click="clickEmit"
            ) {{ buttonReadFullText }}
    .__bottom(
        v-if="isShowBottom"
    )
        button-component.__button(
            v-for="(href, socialName) in socials"
            :key="socialName"
            :icon="socialName"
            :href="href"
            :ariaLabel="`Ссылка на ${socialName}`"
            tag="a"
            view="outline"
        )

</template>

<script lang="ts">
import { Component, Emit, Inject, Prop, Ref, Vue } from 'vue-property-decorator'
import { Avatar } from '@/entities/user/ui/Avatar'
import { type Maybe } from '@/shared/types/helpers'
import { type AvatarProps } from '@/entities/user/ui/Avatar/Avatar.vue'
import { Rating } from '@/shared/lib/ui/Rating'
import { type DeviceProviderValue } from '@/shared/lib/providers/device'

export type ReviewCardProps = {
    user: {
        id: number
        name: string
        role: string
    }
    rating: number
    review: string
    buttonReadFullText: string
    socials?: Record<'vk' | 'facebook' | 'instagram', string>
    cutReview?: boolean
    radius?: boolean
}

@Component({
    components: {
        'avatar-component': Avatar,
        'rating-component': Rating,
    },
})
export default class ReviewCard extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    @Prop() readonly user!: ReviewCardProps['user']
    @Prop() readonly rating!: ReviewCardProps['rating']
    @Prop() readonly review!: ReviewCardProps['review']
    @Prop() readonly socials: ReviewCardProps['socials']
    @Prop() readonly buttonReadFullText!: ReviewCardProps['buttonReadFullText']
    @Prop({ default: true }) readonly cutReview: ReviewCardProps['cutReview']
    @Prop({ default: true }) readonly radius: ReviewCardProps['radius']

    @Ref('text') textRef!: HTMLElement
    @Ref('textWrapper') texWrapperRef!: HTMLElement

    @Emit('click')
    clickEmit() {
        return null
    }

    isReviewLong = false

    get isShowBottom() {
        return this.socials && Object.values(this.socials).some(social => Boolean(social))
    }

    get avatarProps(): AvatarProps {
        return {
            imagePath: `/images/parents/${this.user.id}`,
            username: this.user.name,
        }
    }

    get classes(): string[] {
        const classes: string[] = []

        if (this.cutReview) {
            classes.push('review-card--cut')
        }

        if (this.radius) {
            classes.push('review-card--radius')
        }

        return classes
    }

    countTextHeight() {
        const textHeight = this.textRef.getBoundingClientRect().height
        const textWrapperHeight = this.texWrapperRef.getBoundingClientRect().height

        if (textHeight >= textWrapperHeight) {
            this.isReviewLong = true
        }
    }

    mounted(): void {
        this.countTextHeight()
    }
}
</script>
