<template lang="pug">
    section-layout-component.b-questions(
        :title="sectionContent.title"
        :icon="titleIcon"
        id="faq"
    )
        .__list
            collapse-component.__item(
                v-for="(question, index) in sectionContent.list"
                :key="index"
                :title="question.title"
            ) {{question.answer}}
</template>

<script lang="ts">
import {Component, Inject, Ref, Vue} from 'vue-property-decorator'
import {Collapse} from '@/shared/ui/Collapse'
import {IconName, Maybe} from '@/shared/types/helpers'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import {LanguageContent} from "@/shared/api/types";

let timeout

@Component
export default class Questions extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    get sectionContent(): LanguageContent['questions'] {
        return this.$content.questions
    }

    get titleIcon(): Maybe<IconName> {
        return this.$device.size.maxMobileLate ? null : 'message'
    }
}
</script>
