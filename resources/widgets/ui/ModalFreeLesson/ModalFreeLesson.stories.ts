import {ModalFreeLesson, ModalFreeLessonProps} from "./index";

export default {
    title: 'ModalFreeLesson',
    component: ModalFreeLesson,
    argTypes: {},
}

const Template = (args: ModalFreeLessonProps) => ({
    props: Object.keys(args),
    components: {ModalFreeLesson},
    methods: {},
    template: '<ModalFreeLesson v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
