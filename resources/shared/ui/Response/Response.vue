<template lang="pug">
    .b-response(
        :class="classes"
    )
        icon-base-component.__icon(
            name="clock"
        )
        .__content
            title-component.__title(
                :view="view"
                :size="titleSize"
            ) {{responseContent.title}}
            .__description {{responseContent.description}}
</template>

<script lang="ts">
import {Component, Inject, Prop, Vue} from 'vue-property-decorator'
import {DirectionPropsType, ViewPropsType} from '@/shared/types/helpers'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import {LanguageContent} from "@/shared/api/types";

export type ResponseProps = {
    view?: Extract<ViewPropsType, 'surface' | 'base'>
    direction?: DirectionPropsType
}

@Component
export default class Response extends Vue {
    @Prop({default: 'base'}) view!: ResponseProps['view']
    @Prop({default: 'column'}) direction!: ResponseProps['direction']

    @Inject('$device') $device!: DeviceProviderValue

    get classes() {
        return [`response--view-${this.view} response--direction-${this.direction}`]
    }

    get titleSize() {
        if (this.direction === 'column') {
            return 's'
        }

        return this.$device.size.maxMobile ? 's' : 'm'
    }

    get responseContent(): LanguageContent['response'] {
        return this.$content.response
    }
}
</script>
