<template lang="pug">

modal-component
    .b-modal-success-story
        .__student
            image-component.__decoration(
                src="/images/decoration/cards/successStory/line.svg"
                alt="decoration"
            )
            picture-component.__image(
                v-bind="pictureProps"
            )
        .__main
            tag-component.__name(
                view="brand"
            ) {{ modalPayload.name }}
            title-component.__title(
                tag="h3"
                size="s"
            ) {{ modalPayload.title }}
            p.__text {{ modalPayload.text }}
</template>

<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import {DeviceProviderValue} from "@/shared/lib/providers/device";
import {Getter} from "@/shared/lib/utils/other/decorators";
import {ModalsPayloadGetter} from "@/widgets/modals/model/module/getters";
import {modals} from "@/widgets/modals/model/module/state";
import { SuccessStoryCardProps } from '../SuccessStoryCard'

@Component
export default class ModalSuccessStory extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    @Getter('modals/payload') payload!: ModalsPayloadGetter

    get modalPayload(): SuccessStoryCardProps {
        return {
            ...this.payload(modals.SUCCESS_STORY)
        }
    }

    get pictureProps() {
        const dotIndex = this.modalPayload.image.indexOf('.')

        return {
            src: this.modalPayload.image.slice(0, dotIndex),
            fallbackExt: this.modalPayload.image.slice(dotIndex + 1),
            alt: 'student'
        }
    }
}
</script>
