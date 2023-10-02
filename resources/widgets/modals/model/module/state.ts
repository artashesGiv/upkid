import {Maybe} from "@/shared/types/helpers";

export enum modals {
    FREE_LESSON = 'free-lesson',
    REVIEW = 'review',
    VIDEO_REVIEW = 'video-review',
    INTRODUCTORY_LESSON = 'introductory-lesson',
    SUCCESS_STORY = 'success-story'
}

const state: () => StateModals = () => ({
    active: null,
    payload: {},
    callbackOnClose: {},
})


export type StateModals = {
    active: Maybe<modals>
    payload: PartialRecord<modals, unknown>
    callbackOnClose: PartialRecord<modals, (args?) => void>
}

export default state
