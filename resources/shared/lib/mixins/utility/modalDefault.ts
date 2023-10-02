import {Component, Vue} from 'vue-property-decorator'
import {
    ModalsRemoveActiveAction,
    ModalsSetActiveAction
} from '@/widgets/modals/model/module/actions'
import {Action, Getter} from '@/shared/lib/utils/other/decorators'
import {ModalsPayloadGetter} from '@/widgets/modals/model/module/getters'
import {modals} from '@/widgets/modals/model/module/state'
import {ReviewCardProps} from '@/entities/review/ui/ReviewCard/ReviewCard.vue'
import {
    VideoReviewCardProps
} from '@/entities/review/ui/VideoReviewCard/VideoReviewCard.vue'
import {SuccessStoryCardProps} from "@/entities/successStory";

export type ModalIntroductoryLessonPayload = {
    classText: string
    years: string
    title: string
    goal: string
    programsPointsTitle: string
    programPoints: string[]
}

export type ModalFreeLessonPayload = {
    program?: string
}

// eslint-disable-next-line
export type CallbackOnClose = (args?: any) => void

@Component
export default class ModalDefaultMixin extends Vue {
    @Action('modals/setActive') openModal!: ModalsSetActiveAction
    @Action('modals/removeActive') closeModal!: ModalsRemoveActiveAction

    @Getter('modals/payload') payload!: ModalsPayloadGetter

    async openIntroductoryLesson({
        payload,
        callbackOnClose,
    }: {
        payload: ModalIntroductoryLessonPayload
        callbackOnClose?: CallbackOnClose
    }) {
        await this.openModal({
            name: modals.INTRODUCTORY_LESSON,
            payload,
            callbackOnClose,
        })
    }

    async openReview({ payload, callbackOnClose }: { payload: ReviewCardProps, callbackOnClose?: CallbackOnClose }) {
        await this.openModal({
            name: modals.REVIEW,
            payload,
            callbackOnClose,
        })
    }

    async openFreeLesson(
        {
            payload,
            callbackOnClose
        }: {
            payload?: ModalFreeLessonPayload,
            callbackOnClose?: CallbackOnClose
        }) {
        await this.openModal({
            payload,
            name: modals.FREE_LESSON,
            callbackOnClose,
        })
    }

    async openVideoReview({ payload, callbackOnClose }: { payload: VideoReviewCardProps; callbackOnClose?: CallbackOnClose }) {
        await this.openModal({
            name: modals.VIDEO_REVIEW,
            payload,
            callbackOnClose,
        })
    }

    async openSuccessStory({ payload }: {payload: SuccessStoryCardProps}) {
        await this.openModal({
            name: modals.SUCCESS_STORY,
            payload
        })
    }
}
