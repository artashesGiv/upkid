<template lang="pug">
    section-layout-component.b-teachers(
        :title="sectionContent.title"
        :is-title-decoration="true"
    )
        component(
            :is="component"
            :class="componentClasses"
        )
            card-teacher-component.__item(
                v-for="(teacher, index) in sectionContent.list"
                :key="index"
                v-bind="teacher"
            )
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator'
import {SpanScroll} from '@/shared/ui/SpanScroll'
import {CardTeacher} from '@/shared/ui/cards/CardTeacher'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import {LanguageContent} from "@/shared/api/types";

@Component({
    components: {
        'snap-scroll-component': SpanScroll,
        'card-teacher-component': CardTeacher,
    },
})
export default class Teachers extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    get sectionContent(): LanguageContent['teacher'] {
        return this.$content.teacher
    }

    get component() {
        return this.$device.size.maxMobileLate ? 'snap-scroll-component' : 'div'
    }

    get componentClasses(): string[] {
        return this.$device.size.maxMobileLate ? [] : ['teachers__list']
    }
}
</script>
